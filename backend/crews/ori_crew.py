"""
Ori Crew — the top-level crew.

Ori is the manager (no tools). Vepartment supervisors are workers (with tools).
"""

from crewai import Crew, Process, Task

from agents.ori_agent import create_ori_agent
from agents.vepartment_supervisor_agent import create_vepartment_supervisor_agent


def create_ori_crew(task: Task) -> Crew:
    ori = create_ori_agent()
    marketing_vsup = create_vepartment_supervisor_agent(department="Marketing", as_manager=False)

    return Crew(
        agents=[marketing_vsup],
        tasks=[task],
        process=Process.hierarchical,
        manager_agent=ori,
        memory=True,
        verbose=True,
    )
