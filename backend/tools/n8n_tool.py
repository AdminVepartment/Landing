"""
n8n webhook tool — triggers n8n workflows for domain-level execution.
"""

import json
import httpx
from crewai.tools import tool

from config import N8N_WEBHOOK_URL


@tool("trigger_n8n_workflow")
def trigger_n8n_workflow(workflow_id: str, payload: str) -> str:
    """
    Trigger an n8n workflow via webhook for domain-level execution.

    Args:
        workflow_id: The n8n workflow/webhook ID to trigger.
        payload: JSON string with the data to send to n8n.

    Returns:
        The response from n8n or an error message.
    """
    try:
        data = json.loads(payload) if isinstance(payload, str) else payload
    except json.JSONDecodeError:
        data = {"input": payload}

    url = f"{N8N_WEBHOOK_URL}/{workflow_id}"

    try:
        response = httpx.post(
            url,
            json={"action": "execute", **data},
            timeout=30.0,
        )
        if response.status_code >= 400:
            return f"n8n error (HTTP {response.status_code}): {response.text[:500]}"
        return f"n8n workflow {workflow_id} triggered successfully. Response: {response.text[:500]}"
    except httpx.RequestError as e:
        return f"Failed to reach n8n: {e}"
