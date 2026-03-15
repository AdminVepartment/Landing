"""
Configuration — loads environment variables and exposes settings.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# LLM
LLM_MODEL: str = os.getenv("LLM_MODEL", "gpt-4o-mini")
OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")

# n8n
N8N_WEBHOOK_URL: str = os.getenv(
    "N8N_WEBHOOK_URL",
    "https://vepartment.app.n8n.cloud/webhook",
)

# Server
PORT: int = int(os.getenv("PORT", "8000"))

# CORS — allow the Next.js dev server
CORS_ORIGINS: list[str] = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
