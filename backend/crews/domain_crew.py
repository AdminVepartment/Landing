"""
Domain Crew — domain-level crew.

Domain supervisor is manager (no tools).
Workers, monitors, strategists, innovators are workers (with tools).
"""

from crewai import Crew, Process, Task

from agents.domain_supervisor_agent import create_domain_supervisor_agent
from agents.worker_agent import create_worker_agent
from agents.monitor_agent import create_monitor_agent
from agents.strategist_agent import create_strategist_agent
from agents.innovator_agent import create_innovator_agent


def create_domain_crew(
    task: Task,
    department: str = "Marketing",
    domain: str = "Social & Messaging",
) -> Crew:
    dsup = create_domain_supervisor_agent(department=department, domain=domain, as_manager=True)
    worker = create_worker_agent(specialization="Content Executor", department=department, domain=domain)
    monitor = create_monitor_agent(department=department, domain=domain)
    strategist = create_strategist_agent(department=department, domain=domain)
    innovator = create_innovator_agent(department=department, domain=domain)

    return Crew(
        agents=[worker, monitor, strategist, innovator],
        tasks=[task],
        process=Process.hierarchical,
        manager_agent=dsup,
        memory=True,
        verbose=True,
    )
