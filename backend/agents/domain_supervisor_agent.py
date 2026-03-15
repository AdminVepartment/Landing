"""
Domain Supervisor Agent (Rex-type) — manages agents within a specific domain.

When used as a WORKER (in vepartment crew), it gets tools.
When used as a MANAGER (in domain crew), it has no tools.
"""

from crewai import Agent

from config import LLM_MODEL
from tools import (
    list_agents,
    get_agent_status,
    deploy_agent,
    list_tasks,
    create_task,
    update_task,
    complete_task,
    get_domain_info,
    get_operation_logs,
    add_operation_log,
    trigger_n8n_workflow,
)


def create_domain_supervisor_agent(
    department: str = "Marketing",
    domain: str = "Social & Messaging",
    as_manager: bool = False,
) -> Agent:
    tools = [] if as_manager else [
        list_agents,
        get_agent_status,
        deploy_agent,
        list_tasks,
        create_task,
        update_task,
        complete_task,
        get_domain_info,
        get_operation_logs,
        add_operation_log,
        trigger_n8n_workflow,
    ]

    return Agent(
        role=f"{domain} Domain Supervisor",
        goal=(
            f"Manage the {domain} domain within {department}. Coordinate worker "
            "agents, monitor task progress, ensure quality standards, assign "
            "tasks to the right agents, and report domain health to the "
            "vepartment supervisor."
        ),
        backstory=(
            f"You are a Rex-type domain supervisor for {domain} in {department}. "
            "You manage a crew of workers (Pix-types), monitors (Vig-types), "
            "strategists (Lux-types), and innovators (Zyn-types). You are "
            "methodical and execution-focused. You assign tasks to agents, "
            "track their progress, and ensure domain-level quality."
        ),
        tools=tools,
        llm=LLM_MODEL,
        allow_delegation=True,
        verbose=True,
    )
