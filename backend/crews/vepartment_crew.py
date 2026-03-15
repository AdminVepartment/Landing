"""
Vepartment Crew — department-level crew.

Vepartment supervisor is manager (no tools).
Domain supervisors are workers (with tools).
"""

from crewai import Crew, Process, Task

from agents.vepartment_supervisor_agent import create_vepartment_supervisor_agent
from agents.domain_supervisor_agent import create_domain_supervisor_agent


def create_vepartment_crew(
    task: Task,
    department: str = "Marketing",
    domains: list[str] | None = None,
) -> Crew:
    vsup = create_vepartment_supervisor_agent(department=department, as_manager=True)

    domain_list = domains or ["Social & Messaging"]
    domain_sups = [
        create_domain_supervisor_agent(department=department, domain=d, as_manager=False)
        for d in domain_list
    ]

    return Crew(
        agents=[*domain_sups],
        tasks=[task],
        process=Process.hierarchical,
        manager_agent=vsup,
        memory=True,
        verbose=True,
    )
