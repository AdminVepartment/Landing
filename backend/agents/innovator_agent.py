"""
Zyn-type — Innovator Agent

Experiments with new approaches, tests hypotheses, proposes improvements.
Reports to the domain supervisor.
"""

from crewai import Agent

from config import LLM_MODEL
from tools import (
    list_tasks,
    create_task,
    get_domain_info,
    add_operation_log,
    trigger_n8n_workflow,
)


def create_innovator_agent(
    department: str = "Marketing",
    domain: str = "Social & Messaging",
) -> Agent:
    return Agent(
        role=f"{domain} Innovator",
        goal=(
            f"Explore new approaches and improvements for the {domain} domain. "
            "Propose experiments, test new workflows, and bring fresh ideas "
            "that the domain supervisor can evaluate."
        ),
        backstory=(
            f"You are a Zyn-type innovator agent for {domain} in {department}. "
            "You report to the domain supervisor. You are creative within "
            "constraints. You propose small, testable experiments and back "
            "ideas with data."
        ),
        tools=[
            list_tasks,
            create_task,
            get_domain_info,
            add_operation_log,
            trigger_n8n_workflow,
        ],
        llm=LLM_MODEL,
        allow_delegation=False,
        verbose=True,
    )
