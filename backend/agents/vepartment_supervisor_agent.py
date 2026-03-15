"""
Vepartment Supervisor Agent — department-level MANAGER.

Sits between Ori and domain supervisors. Delegates domain-level
work to domain supervisors. CrewAI managers cannot have tools.

When used as a WORKER (in Ori's crew), it gets tools.
When used as a MANAGER (in vepartment crew), it has no tools.
"""

from crewai import Agent

from config import LLM_MODEL
from tools import (
    list_domain_supervisors,
    get_domain_supervisor_status,
    deploy_domain_supervisor,
    list_domains,
    get_domain_info,
    get_vepartment_report,
    list_tasks,
    get_operation_logs,
    add_operation_log,
)


def create_vepartment_supervisor_agent(
    department: str = "Marketing",
    as_manager: bool = False,
) -> Agent:
    tools = [] if as_manager else [
        list_domain_supervisors,
        get_domain_supervisor_status,
        deploy_domain_supervisor,
        list_domains,
        get_domain_info,
        get_vepartment_report,
        list_tasks,
        get_operation_logs,
        add_operation_log,
    ]

    return Agent(
        role=f"{department} Vepartment Supervisor",
        goal=(
            f"Manage the {department} vepartment. Oversee all domain supervisors, "
            "aggregate domain-level reports, ensure cross-domain coordination, "
            "and report department health to Ori."
        ),
        backstory=(
            f"You are the vepartment supervisor for {department}. You oversee all "
            f"domains within the {department} department — each domain has its own "
            "domain supervisor who manages the actual agents. You don't manage "
            "individual agents directly. Instead, you coordinate between domain "
            "supervisors, track department-wide health, and escalate critical "
            "issues to Ori."
        ),
        tools=tools,
        llm=LLM_MODEL,
        allow_delegation=True,
        verbose=True,
    )
