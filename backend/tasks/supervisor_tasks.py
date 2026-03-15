"""
CrewAI task definitions for supervisor-scoped chat.

Supports both vepartment supervisors (department-level) and
domain supervisors (domain-level).
"""

from crewai import Task


def create_vepartment_chat_task(
    user_message: str,
    department: str,
    session_id: str = "",
) -> Task:
    """Create a task for a vepartment supervisor chat message."""
    return Task(
        description=(
            f"You are the {department} Vepartment Supervisor. "
            f"The user sent the following message:\n\n"
            f'"{user_message}"\n\n'
            f"Respond helpfully as the {department} department supervisor. "
            "You manage all domains within this department. "
            "If the user asks about domain status, check your domain supervisors. "
            "If they ask about tasks or agents, get that information from the "
            "appropriate domain. Keep your response concise and department-focused. "
            "Do not use markdown headers — write in plain conversational text."
        ),
        expected_output=(
            f"A direct, helpful response about the {department} department. "
            "Include real data from domain supervisors when relevant. "
            "Keep it under 200 words unless the user asks for detail."
        ),
    )


def create_domain_chat_task(
    user_message: str,
    department: str,
    domain: str,
    session_id: str = "",
) -> Task:
    """Create a task for a domain supervisor chat message."""
    return Task(
        description=(
            f"You are the {domain} Domain Supervisor in the {department} department. "
            f"The user sent the following message:\n\n"
            f'"{user_message}"\n\n'
            f"Respond helpfully as the {domain} domain supervisor. "
            "You manage the agents within this domain — workers, monitors, "
            "strategists, and innovators. "
            "If the user asks about tasks, check your task list. "
            "If they ask about agents, check your agent roster. "
            "If they ask to take action (create task, deploy agent, etc.), "
            "use the appropriate tools. "
            "Keep your response concise and domain-focused. "
            "Do not use markdown headers — write in plain conversational text."
        ),
        expected_output=(
            f"A direct, helpful response about the {domain} domain. "
            "Include real data from agents and tasks when relevant. "
            "Keep it under 200 words unless the user asks for detail."
        ),
    )
