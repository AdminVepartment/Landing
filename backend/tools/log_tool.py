"""
Operation log tools — read and write to the operation log.
"""

import json
from crewai.tools import tool

from state import store


@tool("get_operation_logs")
def get_operation_logs(limit: int = 10) -> str:
    """
    Get recent operation log entries.

    Args:
        limit: Maximum number of entries to return. Default 10.

    Returns:
        JSON array of log entries (most recent first).
    """
    return json.dumps(store.get_logs(limit=limit), indent=2)


@tool("add_operation_log")
def add_operation_log(
    action: str,
    department: str = "Operations",
    target: str = "",
    status: str = "info",
    color_var: str = "marketing",
) -> str:
    """
    Add an entry to the operation log.

    Args:
        action: Description of what happened.
        department: Department associated with this entry.
        target: The entity/agent this action targeted.
        status: One of "success", "warning", "error", "info".
        color_var: CSS color variable key.

    Returns:
        JSON of the created log entry.
    """
    entry = store.add_log(
        action=action,
        target=target,
        department=department,
        color_var=color_var,
        status=status,
    )
    return json.dumps(entry.to_dict(), indent=2)
