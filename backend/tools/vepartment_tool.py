"""
Vepartment-level tools — used by Ori to manage departments.
"""

import json
from crewai.tools import tool

from state import store


@tool("list_vepartments")
def list_vepartments() -> str:
    """
    List all vepartments (departments) with their supervisors and aggregated metrics.

    Returns:
        JSON array of vepartments, each including domain supervisor counts,
        total agents, active tasks, and nested domain supervisor list.
    """
    return json.dumps(store.get_vepartments(), indent=2)


@tool("get_vepartment_report")
def get_vepartment_report(department: str) -> str:
    """
    Get a full status report for a specific vepartment (department).
    Includes the vepartment supervisor status, all domain supervisors,
    agent counts, active tasks, and recent logs.

    Args:
        department: The department name (e.g. "Marketing").

    Returns:
        JSON report with vepartment health, domain supervisors, and activity.
    """
    vep = store.get_vepartment_by_name(department)
    if not vep:
        return f"Error: Vepartment '{department}' not found. Available: {', '.join(v.name for v in store.vepartments)}"

    domain_sups = store.get_domain_supervisors(department=department)
    tasks = store.get_tasks(department=department)
    logs = store.get_logs(limit=10, tier="vepartment")
    domain_logs = store.get_logs(limit=10, tier="domain")

    running = sum(1 for t in tasks if t["status"] == "running")
    queued = sum(1 for t in tasks if t["status"] == "queued")

    report = {
        "vepartment": vep.to_dict(),
        "domainSupervisors": domain_sups,
        "taskSummary": {
            "total": len(tasks),
            "running": running,
            "queued": queued,
        },
        "recentActivity": logs + domain_logs,
    }
    return json.dumps(report, indent=2)


@tool("create_vepartment")
def create_vepartment(
    name: str,
    color_var: str = "",
    has_level: int = 3,
) -> str:
    """
    Create a new vepartment (department) with its supervisor.

    Args:
        name: Department name (e.g. "Branding").
        color_var: CSS color variable key. Defaults to lowercase name.
        has_level: HAS level for the vepartment supervisor (1-5).

    Returns:
        JSON of the newly created vepartment.
    """
    vep = store.add_vepartment(
        name=name,
        color_var=color_var or name.lower(),
        icon=f"Icon{name}",
        status="active",
        supervisor_name=f"{name} Supervisor",
        supervisor_status="online",
        has_level=has_level,
        domains=[],
    )
    return json.dumps(store.get_vepartments()[-1], indent=2)
