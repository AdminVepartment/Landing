"""
Task management tools — CRUD operations on the task store.
Used across tiers (domain supervisors create tasks, agents update/complete them).
"""

import json
from crewai.tools import tool

from state import store


@tool("create_task")
def create_task(
    title: str,
    department: str,
    domain: str = "",
    assigned_to: str = "",
    priority: str = "normal",
    color_var: str = "marketing",
) -> str:
    """
    Create a new task in the system.

    Args:
        title: What the task does.
        department: Which department this belongs to (e.g. "Marketing").
        domain: The domain within the department (e.g. "Social & Messaging").
        assigned_to: Agent ID assigned (e.g. "SM-E1"). Optional.
        priority: One of "critical", "high", "normal", "low".
        color_var: CSS color variable key. Optional.

    Returns:
        JSON representation of the created task.
    """
    task = store.add_task(
        title=title,
        department=department,
        domain=domain,
        color_var=color_var,
        assigned_to=assigned_to,
        status="queued",
        priority=priority,
        progress=0,
        started_at="just now",
    )
    return json.dumps(task.to_dict(), indent=2)


@tool("list_tasks")
def list_tasks(department: str = "", domain: str = "", status_filter: str = "") -> str:
    """
    List tasks, optionally filtered by department, domain, and/or status.

    Args:
        department: Optional department filter.
        domain: Optional domain filter.
        status_filter: Optional status filter ("running", "queued", "completed", "failed", "paused").

    Returns:
        JSON array of tasks.
    """
    tasks = store.get_tasks(department=department, domain=domain, status_filter=status_filter)
    return json.dumps(tasks, indent=2)


@tool("update_task")
def update_task(task_id: str, updates: str) -> str:
    """
    Update a task's fields.

    Args:
        task_id: The ID of the task to update.
        updates: JSON string of fields to update (e.g. '{"status": "running", "progress": 50}').

    Returns:
        Updated task JSON or error message.
    """
    try:
        fields = json.loads(updates)
    except json.JSONDecodeError:
        return "Error: updates must be a valid JSON string."

    task = store.update_task(task_id, **fields)
    if not task:
        return f"Error: Task {task_id} not found."
    return json.dumps(task.to_dict(), indent=2)


@tool("complete_task")
def complete_task(task_id: str) -> str:
    """
    Mark a task as completed.

    Args:
        task_id: The ID of the task to complete.

    Returns:
        Completed task JSON or error message.
    """
    task = store.complete_task(task_id)
    if not task:
        return f"Error: Task {task_id} not found."
    return json.dumps(task.to_dict(), indent=2)
