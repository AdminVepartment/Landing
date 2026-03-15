"""
Domain supervisor tools — used by vepartment supervisors to manage domain supervisors.
"""

import json
from crewai.tools import tool

from state import store


@tool("list_domain_supervisors")
def list_domain_supervisors(department: str = "") -> str:
    """
    List all domain supervisors, optionally filtered by department.

    Args:
        department: Optional department name to filter by.

    Returns:
        JSON array of domain supervisors with agent counts and status.
    """
    return json.dumps(store.get_domain_supervisors(department=department), indent=2)


@tool("get_domain_supervisor_status")
def get_domain_supervisor_status(supervisor_id: str) -> str:
    """
    Get detailed status for a specific domain supervisor.

    Args:
        supervisor_id: The domain supervisor ID (e.g. "dsup-sm-01").

    Returns:
        JSON with the domain supervisor's full status, including its agents.
    """
    sup = store.get_domain_supervisor(supervisor_id)
    if not sup:
        return f"Error: Domain supervisor {supervisor_id} not found."

    agents = store.get_agents(department=sup.department, domain=sup.domain)
    tasks = store.get_tasks(department=sup.department, domain=sup.domain)

    result = sup.to_dict()
    result["agents"] = agents
    result["tasks"] = tasks
    return json.dumps(result, indent=2)


@tool("deploy_domain_supervisor")
def deploy_domain_supervisor(
    name: str,
    department: str,
    domain: str,
    has_level: int = 3,
    total_agents: int = 4,
) -> str:
    """
    Deploy a new domain supervisor to manage a specific domain within a vepartment.

    Args:
        name: Display name (e.g. "Content & Publishing Supervisor").
        department: Parent department (e.g. "Marketing").
        domain: The domain it manages (e.g. "Content & Publishing").
        has_level: HAS level (1-5). Default 3.
        total_agents: Initial agent capacity. Default 4.

    Returns:
        JSON of the newly created domain supervisor.
    """
    sup = store.add_domain_supervisor(
        name=name,
        department=department,
        domain=domain,
        color_var=department.lower(),
        icon=f"Icon{domain.replace(' & ', '').replace(' ', '')}",
        status="online",
        has_level=has_level,
        active_agents=0,
        total_agents=total_agents,
        active_tasks=0,
    )
    return json.dumps(sup.to_dict(), indent=2)
