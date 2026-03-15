"""
Domain tools — query domain information and structure.
"""

import json
from crewai.tools import tool

from state import store


# Static domain registry — mirrors what the frontend knows about
DOMAINS: dict[str, dict] = {
    "social-messaging": {
        "id": "social-messaging",
        "name": "Social & Messaging",
        "department": "Marketing",
        "description": "Social media management, messaging, community engagement",
        "status": "active",
    },
    "content-publishing": {
        "id": "content-publishing",
        "name": "Content & Publishing",
        "department": "Marketing",
        "description": "Content creation, editorial calendar, publishing workflows",
        "status": "planned",
    },
    "performance-analytics": {
        "id": "performance-analytics",
        "name": "Performance & Analytics",
        "department": "Marketing",
        "description": "Campaign performance tracking, attribution, reporting",
        "status": "planned",
    },
    "customer-insights": {
        "id": "customer-insights",
        "name": "Customer Insights",
        "department": "Marketing",
        "description": "Audience segmentation, sentiment analysis, feedback loops",
        "status": "planned",
    },
}


@tool("list_domains")
def list_domains(department: str = "") -> str:
    """
    List all available domains, optionally filtered by department.

    Args:
        department: Optional department name to filter by.

    Returns:
        JSON array of domain objects.
    """
    domains = list(DOMAINS.values())
    if department:
        domains = [d for d in domains if d["department"].lower() == department.lower()]
    return json.dumps(domains, indent=2)


@tool("get_domain_info")
def get_domain_info(domain_id: str) -> str:
    """
    Get detailed information about a specific domain.

    Args:
        domain_id: The domain identifier (e.g. "social-messaging").

    Returns:
        JSON with domain details or error message.
    """
    domain = DOMAINS.get(domain_id)
    if not domain:
        return f"Error: Domain '{domain_id}' not found. Available: {', '.join(DOMAINS.keys())}"

    # Enrich with live supervisor data
    supervisors = [
        s.to_dict()
        for s in store.supervisors
        if s.domain.lower().replace(" & ", "-").replace(" ", "-") == domain_id
    ]
    tasks = [
        t.to_dict()
        for t in store.tasks
        if t.domain.lower().replace(" & ", "-").replace(" ", "-") == domain_id
    ]

    return json.dumps(
        {**domain, "supervisors": supervisors, "activeTasks": tasks},
        indent=2,
    )
