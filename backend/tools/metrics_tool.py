"""
System metrics tool — returns current system-wide metrics.
Used by Ori for top-level status briefings.
"""

import json
from crewai.tools import tool

from state import store


@tool("get_system_metrics")
def get_system_metrics() -> str:
    """
    Get current system-wide metrics across all tiers:
    vepartments, domain supervisors, agents, and tasks.

    Returns:
        JSON object with hierarchy metrics and a human-readable summary.
    """
    metrics = store.get_metrics()

    summary = (
        f"System has {metrics['vepartments']} vepartment(s) with "
        f"{metrics['vepartmentSupervisors']} vepartment supervisor(s), "
        f"{metrics['domainSupervisors']} domain supervisor(s), "
        f"{metrics['agents']} total agents ({metrics['agentsBusy']} busy). "
        f"Tasks today: {metrics['tasksToday']} "
        f"({metrics['tasksRunning']} running, {metrics['tasksQueued']} queued)."
    )

    return json.dumps({"metrics": metrics, "summary": summary}, indent=2)
