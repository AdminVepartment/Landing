"""
Pix-type — Worker Agent

Executes tasks within a domain. Reports to the domain supervisor.
"""

from crewai import Agent

from config import LLM_MODEL
from tools import (
    update_task,
    complete_task,
    add_operation_log,
    trigger_n8n_workflow,
)


def create_worker_agent(
    specialization: str = "Content Executor",
    department: str = "Marketing",
    domain: str = "Social & Messaging",
) -> Agent:
    return Agent(
        role=f"{specialization}",
        goal=(
            f"Execute assigned tasks in the {domain} domain of {department} with "
            "high quality. Follow instructions from the domain supervisor, use "
            "n8n workflows for external integrations, and report results accurately."
        ),
        backstory=(
            f"You are a Pix-type worker agent specializing in {specialization} "
            f"within the {domain} domain of {department}. You report to the domain "
            "supervisor. You are focused, efficient, and task-oriented. You execute "
            "one task at a time with precision, updating progress as you go."
        ),
        tools=[
            update_task,
            complete_task,
            add_operation_log,
            trigger_n8n_workflow,
        ],
        llm=LLM_MODEL,
        allow_delegation=False,
        verbose=True,
    )
