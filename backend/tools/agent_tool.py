"""
Agent-level tools — used by domain supervisors to manage agents.
"""

import json
from crewai.tools import tool

from state import store


@tool("list_agents")
def list_agents(department: str = "", domain: str = "") -> str:
    """
    List agents, optionally filtered by department and/or domain.

    Args:
        department: Optional department filter.
        domain: Optional domain filter.

    Returns:
        JSON array of agents with type, status, and assignment info.
    """
    return json.dumps(store.get_agents(department=department, domain=domain), indent=2)


@tool("get_agent_status")
def get_agent_status(agent_id: str) -> str:
    """
    Get detailed status for a specific agent.

    Args:
        agent_id: The agent ID (e.g. "SM-E1").

    Returns:
        JSON with agent details and current assigned tasks.
    """
    agent = store.get_agent(agent_id)
    if not agent:
        return f"Error: Agent {agent_id} not found."

    # Find tasks assigned to this agent
    tasks = [t.to_dict() for t in store.tasks if t.assigned_to == agent_id]

    result = agent.to_dict()
    result["assignedTasks"] = tasks
    return json.dumps(result, indent=2)


@tool("deploy_agent")
def deploy_agent(
    name: str,
    agent_type: str,
    department: str,
    domain: str,
    agent_id: str = "",
) -> str:
    """
    Deploy a new agent into a domain.

    Args:
        name: Agent display name (e.g. "Content Executor").
        agent_type: One of "worker", "monitor", "strategist", "innovator".
        department: Parent department.
        domain: Domain to deploy into.
        agent_id: Optional custom ID. Auto-generated if empty.

    Returns:
        JSON of the newly deployed agent.
    """
    valid_types = ("worker", "monitor", "strategist", "innovator")
    if agent_type not in valid_types:
        return f"Error: agent_type must be one of {valid_types}, got '{agent_type}'."

    icon_map = {
        "worker": "IconPix",
        "monitor": "IconVig",
        "strategist": "IconLux",
        "innovator": "IconZyn",
    }

    agent = store.add_agent(
        id=agent_id or None,
        name=name,
        agent_type=agent_type,
        department=department,
        domain=domain,
        color_var=department.lower(),
        icon=icon_map.get(agent_type, "IconPix"),
        status="idle",
    )
    return json.dumps(agent.to_dict(), indent=2)
