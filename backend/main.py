"""
Vepartment CrewAI Backend — FastAPI server.

4-tier hierarchy: Ori → Vepartment Supervisors → Domain Supervisors → Agents

Endpoints:
  POST /chat     — user message → Ori crew → response
  POST /command  — structured command → action execution → result
  GET  /state    — current system state snapshot (all tiers)
"""

import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import PORT, CORS_ORIGINS
from state import store
from tasks.ori_tasks import create_chat_task, create_command_task
from tasks.supervisor_tasks import create_vepartment_chat_task, create_domain_chat_task
from crews.ori_crew import create_ori_crew
from crews.vepartment_crew import create_vepartment_crew
from crews.domain_crew import create_domain_crew

app = FastAPI(
    title="Vepartment CrewAI Backend",
    version="0.2.0",
    description="Ori operations agent — 4-tier hierarchical agent system powered by CrewAI",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response models ────────────────────────────────────────────────


class ChatRequest(BaseModel):
    message: str
    session_id: str = ""


class SupervisorChatRequest(BaseModel):
    message: str
    department: str
    domain: str = ""          # empty = vepartment supervisor, filled = domain supervisor
    session_id: str = ""


class ChatResponse(BaseModel):
    output: str
    expression: str = "calm"


class CommandRequest(BaseModel):
    command: str
    params: dict | None = None


class CommandResponse(BaseModel):
    output: str
    success: bool = True
    expression: str = "determined"


# ── Expression mapping ───────────────────────────────────────────────────────

COMMAND_EXPRESSIONS: dict[str, str] = {
    "deploy_agent": "determined",
    "deploy_domain_supervisor": "confident",
    "create_vepartment": "confident",
    "create_task": "focused",
    "complete_task": "excited",
    "diagnostics": "watching",
    "status": "calm",
    "reports": "focused",
    "directory": "calm",
    "policies": "watching",
    "create_domain": "determined",
}


def infer_expression(message: str, is_error: bool = False) -> str:
    """Infer Ori's expression from context."""
    if is_error:
        return "curious"

    lower = message.lower()
    if any(w in lower for w in ["status", "overview", "briefing", "how", "happening"]):
        return "calm"
    if any(w in lower for w in ["deploy", "create", "add", "start", "activate"]):
        return "determined"
    if any(w in lower for w in ["check", "monitor", "health", "diagnos"]):
        return "watching"
    if any(w in lower for w in ["analyze", "think", "plan", "strateg"]):
        return "thinking"
    if any(w in lower for w in ["help", "what", "explain", "show"]):
        return "curious"
    if any(w in lower for w in ["task", "running", "active"]):
        return "focused"
    return "calm"


# ── Routes ───────────────────────────────────────────────────────────────────


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    """Process a user message through Ori's crew."""
    if not req.message.strip():
        return ChatResponse(output="I didn't catch that. Could you say more?", expression="curious")

    try:
        task = create_chat_task(req.message, req.session_id)
        crew = create_ori_crew(task)

        # Run synchronous CrewAI kickoff in a thread to avoid blocking the event loop
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, crew.kickoff)

        expression = infer_expression(req.message)
        output = str(result)

        store.add_log(
            action=f"Chat: {req.message[:50]}{'...' if len(req.message) > 50 else ''}",
            target="user",
            department="Operations",
            color_var="marketing",
            status="success",
            tier="ori",
        )

        return ChatResponse(output=output, expression=expression)

    except Exception as e:
        store.add_log(
            action=f"Chat error: {str(e)[:80]}",
            target="system",
            department="Operations",
            color_var="marketing",
            status="error",
            tier="ori",
        )
        return ChatResponse(
            output=f"I ran into an issue processing that: {str(e)[:200]}. Let me try a different approach.",
            expression="curious",
        )


@app.post("/command", response_model=CommandResponse)
async def command(req: CommandRequest) -> CommandResponse:
    """Execute a structured command through the Ori crew."""
    expression = COMMAND_EXPRESSIONS.get(req.command, "determined")

    try:
        task = create_command_task(req.command, req.params)
        crew = create_ori_crew(task)

        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, crew.kickoff)

        store.add_log(
            action=f"Command executed: {req.command}",
            target=str(req.params) if req.params else "",
            department="Operations",
            color_var="marketing",
            status="success",
            tier="ori",
        )

        return CommandResponse(output=str(result), success=True, expression=expression)

    except Exception as e:
        store.add_log(
            action=f"Command failed: {req.command} — {str(e)[:80]}",
            target="system",
            department="Operations",
            color_var="marketing",
            status="error",
            tier="ori",
        )
        return CommandResponse(
            output=f"Command '{req.command}' failed: {str(e)[:200]}",
            success=False,
            expression="curious",
        )


@app.post("/supervisor/chat", response_model=ChatResponse)
async def supervisor_chat(req: SupervisorChatRequest) -> ChatResponse:
    """Process a user message through a supervisor's crew.

    If domain is empty, routes to the vepartment supervisor.
    If domain is provided, routes to that specific domain supervisor.
    """
    if not req.message.strip():
        return ChatResponse(output="I didn't catch that. Could you say more?", expression="curious")

    tier = "domain" if req.domain else "vepartment"
    label = f"{req.domain} in {req.department}" if req.domain else req.department

    try:
        if req.domain:
            # Domain supervisor chat
            task = create_domain_chat_task(req.message, req.department, req.domain, req.session_id)
            crew = create_domain_crew(task, department=req.department, domain=req.domain)
        else:
            # Vepartment supervisor chat
            task = create_vepartment_chat_task(req.message, req.department, req.session_id)
            # Get active domains for this vepartment
            vep = store.get_vepartment_by_name(req.department)
            domains = vep.domains if vep else []
            crew = create_vepartment_crew(task, department=req.department, domains=domains or None)

        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(None, crew.kickoff)

        expression = infer_expression(req.message)

        store.add_log(
            action=f"Supervisor chat ({label}): {req.message[:40]}{'...' if len(req.message) > 40 else ''}",
            target="user",
            department=req.department,
            domain=req.domain,
            color_var=req.department.lower(),
            status="success",
            tier=tier,
        )

        return ChatResponse(output=str(result), expression=expression)

    except Exception as e:
        store.add_log(
            action=f"Supervisor chat error ({label}): {str(e)[:60]}",
            target="system",
            department=req.department,
            domain=req.domain,
            color_var=req.department.lower(),
            status="error",
            tier=tier,
        )
        return ChatResponse(
            output=f"I ran into an issue: {str(e)[:200]}. Please try again.",
            expression="curious",
        )


@app.get("/state")
async def get_state() -> dict:
    """Return the full system state snapshot across all 4 tiers."""
    return store.snapshot()


@app.get("/config")
async def get_config() -> dict:
    """Return current configuration (redacted keys)."""
    from config import LLM_MODEL, OPENAI_API_KEY, ANTHROPIC_API_KEY, N8N_WEBHOOK_URL

    def redact(key: str) -> str:
        if not key:
            return ""
        if len(key) <= 8:
            return "••••"
        return key[:4] + "••••" + key[-4:]

    return {
        "llmModel": LLM_MODEL,
        "openaiKey": redact(OPENAI_API_KEY),
        "openaiConnected": bool(OPENAI_API_KEY),
        "anthropicKey": redact(ANTHROPIC_API_KEY),
        "anthropicConnected": bool(ANTHROPIC_API_KEY),
        "n8nWebhookUrl": N8N_WEBHOOK_URL,
        "n8nConnected": bool(N8N_WEBHOOK_URL),
    }


class ConfigUpdate(BaseModel):
    openai_api_key: str | None = None
    anthropic_api_key: str | None = None
    llm_model: str | None = None
    n8n_webhook_url: str | None = None


@app.post("/config")
async def update_config(req: ConfigUpdate) -> dict:
    """Update configuration at runtime and persist to .env file."""
    import config as cfg
    import pathlib

    env_path = pathlib.Path(__file__).parent / ".env"
    env_lines: list[str] = []
    if env_path.exists():
        env_lines = env_path.read_text().splitlines()

    def set_env(key: str, value: str) -> None:
        nonlocal env_lines
        found = False
        for i, line in enumerate(env_lines):
            stripped = line.lstrip("# ").split("=")[0].strip()
            if stripped == key:
                env_lines[i] = f"{key}={value}"
                found = True
                break
        if not found:
            env_lines.append(f"{key}={value}")

    updated: list[str] = []

    if req.openai_api_key is not None:
        cfg.OPENAI_API_KEY = req.openai_api_key
        import os; os.environ["OPENAI_API_KEY"] = req.openai_api_key
        set_env("OPENAI_API_KEY", req.openai_api_key)
        updated.append("openaiKey")

    if req.anthropic_api_key is not None:
        cfg.ANTHROPIC_API_KEY = req.anthropic_api_key
        import os; os.environ["ANTHROPIC_API_KEY"] = req.anthropic_api_key
        set_env("ANTHROPIC_API_KEY", req.anthropic_api_key)
        updated.append("anthropicKey")

    if req.llm_model is not None:
        cfg.LLM_MODEL = req.llm_model
        set_env("LLM_MODEL", req.llm_model)
        updated.append("llmModel")

    if req.n8n_webhook_url is not None:
        cfg.N8N_WEBHOOK_URL = req.n8n_webhook_url
        set_env("N8N_WEBHOOK_URL", req.n8n_webhook_url)
        updated.append("n8nWebhookUrl")

    env_path.write_text("\n".join(env_lines) + "\n")

    store.add_log(
        action=f"Config updated: {', '.join(updated)}",
        target="system",
        department="Operations",
        color_var="marketing",
        status="success",
        tier="ori",
    )

    return {"success": True, "updated": updated}


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "agent": "ori", "version": "0.2.0", "hierarchy": "4-tier"}


# ── Run ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)
