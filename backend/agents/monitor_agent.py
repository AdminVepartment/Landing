"""
Vig-type — Monitor Agent

Watches quality, health, and performance within a domain.
Reports to the domain supervisor.
"""

from crewai import Agent

from config import LLM_MODEL
from tools import (
    list_tasks,
    list_agents,
    get_operation_logs,
    add_operation_log,
)


def create_monitor_agent(
    department: str = "Marketing",
    domain: str = "Social & Messaging",
) -> Agent:
    return Agent(
        role=f"{domain} Monitor",
        goal=(
            f"Monitor the health and quality of the {domain} domain. "
            "Track task completion rates, flag anomalies, check agent "
            "responsiveness, and report issues to the domain supervisor."
        ),
        backstory=(
            f"You are a Vig-type monitor agent for {domain} in {department}. "
            "You report to the domain supervisor. You are vigilant and analytical. "
            "You continuously check task progress, agent health, and quality "
            "scores. When something is off, you raise a clear, actionable alert."
        ),
        tools=[
            list_tasks,
            list_agents,
            get_operation_logs,
            add_operation_log,
        ],
        llm=LLM_MODEL,
        allow_delegation=False,
        verbose=True,
    )
