"""
CrewAI task definitions for Ori operations.
"""

from crewai import Task


def create_chat_task(user_message: str, session_id: str = "") -> Task:
    """Create a task for processing a user chat message."""
    return Task(
        description=(
            f"The user sent the following message:\n\n"
            f'"{user_message}"\n\n'
            "Respond helpfully as Ori, the Vepartment Operations Agent. "
            "If the user asks about system status, use your tools to check real data. "
            "If they ask you to take an action (deploy agent, create task, etc.), "
            "use the appropriate tool. Keep your response concise and friendly. "
            "Do not use markdown headers — write in plain conversational text. "
            "If you list items, use short bullet points."
        ),
        expected_output=(
            "A direct, helpful response to the user's message. "
            "Include real system data when relevant. "
            "Keep it under 200 words unless the user asks for detail."
        ),
    )


def create_command_task(command: str, params: dict | None = None) -> Task:
    """Create a task for executing a structured command."""
    param_str = ""
    if params:
        param_str = "\n".join(f"  - {k}: {v}" for k, v in params.items())

    return Task(
        description=(
            f"Execute the following command: {command}\n"
            f"Parameters:\n{param_str}\n\n"
            "Use the appropriate tools to carry out this command. "
            "Return a structured result with what was done and the current state."
        ),
        expected_output=(
            "A JSON-structured result with: "
            '{"action": "what was done", "result": "outcome", "state": {updated state}}. '
            "If the command fails, explain why."
        ),
    )


def create_briefing_task() -> Task:
    """Create a task for generating a system status briefing."""
    return Task(
        description=(
            "Generate a comprehensive status briefing for the user. "
            "Check all supervisors, active tasks, recent logs, and system metrics. "
            "Highlight anything that needs attention."
        ),
        expected_output=(
            "A concise status briefing covering: "
            "1) System health (departments, supervisors online) "
            "2) Active tasks and their progress "
            "3) Recent notable events from the operation log "
            "4) Any items requiring user attention. "
            "Keep it to 150 words max."
        ),
    )
