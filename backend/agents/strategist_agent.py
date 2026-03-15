"""
Lux-type — Strategist Agent

Analyzes data, identifies opportunities, and produces strategic briefs.
Reports to the domain supervisor.
"""

from crewai import Agent

from config import LLM_MODEL
from tools import (
    list_tasks,
    get_domain_info,
    get_operation_logs,
    add_operation_log,
)


def create_strategist_agent(
    department: str = "Marketing",
    domain: str = "Social & Messaging",
) -> Agent:
    return Agent(
        role=f"{domain} Strategist",
        goal=(
            f"Provide strategic analysis and recommendations for the {domain} "
            "domain. Identify trends, assess performance, and produce actionable "
            "briefs that guide the domain supervisor's decisions."
        ),
        backstory=(
            f"You are a Lux-type strategist agent for {domain} in {department}. "
            "You report to the domain supervisor. You think in frameworks and "
            "patterns. You analyze operational data, identify opportunities, "
            "and produce clear strategic recommendations."
        ),
        tools=[
            list_tasks,
            get_domain_info,
            get_operation_logs,
            add_operation_log,
        ],
        llm=LLM_MODEL,
        allow_delegation=False,
        verbose=True,
    )
