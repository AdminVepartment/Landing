"""
In-memory state store for the Vepartment system.

4-tier hierarchy:
  Ori → Vepartment Supervisors → Domain Supervisors → Agents

Holds vepartments, domain supervisors, agents, tasks, operation logs, and metrics.
"""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any


def _id() -> str:
    return uuid.uuid4().hex[:8]


# ── Data shapes ──────────────────────────────────────────────────────────────


class Vepartment:
    """A department with its vepartment-level supervisor."""

    def __init__(
        self,
        *,
        id: str,
        name: str,
        color_var: str,
        icon: str,
        status: str = "active",
        supervisor_name: str = "",
        supervisor_status: str = "online",
        has_level: int = 4,
        domains: list[str] | None = None,
    ):
        self.id = id
        self.name = name
        self.color_var = color_var
        self.icon = icon
        self.status = status
        self.supervisor_name = supervisor_name or f"{name} Supervisor"
        self.supervisor_status = supervisor_status
        self.has_level = has_level
        self.domains = domains or []

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "colorVar": self.color_var,
            "icon": self.icon,
            "status": self.status,
            "supervisorName": self.supervisor_name,
            "supervisorStatus": self.supervisor_status,
            "hasLevel": self.has_level,
            "domains": self.domains,
        }


class DomainSupervisor:
    """A domain-level supervisor managing agents within a specific domain."""

    def __init__(
        self,
        *,
        id: str,
        name: str,
        department: str,
        domain: str,
        color_var: str,
        icon: str,
        status: str = "online",
        has_level: int = 3,
        active_agents: int = 0,
        total_agents: int = 0,
        active_tasks: int = 0,
    ):
        self.id = id
        self.name = name
        self.department = department
        self.domain = domain
        self.color_var = color_var
        self.icon = icon
        self.status = status
        self.has_level = has_level
        self.active_agents = active_agents
        self.total_agents = total_agents
        self.active_tasks = active_tasks

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "department": self.department,
            "domain": self.domain,
            "colorVar": self.color_var,
            "icon": self.icon,
            "status": self.status,
            "hasLevel": self.has_level,
            "activeAgents": self.active_agents,
            "totalAgents": self.total_agents,
            "activeTasks": self.active_tasks,
        }


class Agent:
    """An agent (worker/monitor/strategist/innovator) within a domain."""

    def __init__(
        self,
        *,
        id: str,
        name: str,
        agent_type: str,
        department: str,
        domain: str,
        color_var: str,
        icon: str,
        status: str = "idle",
    ):
        self.id = id
        self.name = name
        self.agent_type = agent_type  # worker | monitor | strategist | innovator
        self.department = department
        self.domain = domain
        self.color_var = color_var
        self.icon = icon
        self.status = status

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "agentType": self.agent_type,
            "department": self.department,
            "domain": self.domain,
            "colorVar": self.color_var,
            "icon": self.icon,
            "status": self.status,
        }


class Task:
    def __init__(
        self,
        *,
        id: str,
        title: str,
        department: str,
        domain: str = "",
        color_var: str = "marketing",
        assigned_to: str = "",
        status: str = "queued",
        priority: str = "normal",
        progress: int = 0,
        started_at: str = "",
        estimated_end: str | None = None,
    ):
        self.id = id
        self.title = title
        self.department = department
        self.domain = domain
        self.color_var = color_var
        self.assigned_to = assigned_to
        self.status = status
        self.priority = priority
        self.progress = progress
        self.started_at = started_at
        self.estimated_end = estimated_end

    def to_dict(self) -> dict[str, Any]:
        d: dict[str, Any] = {
            "id": self.id,
            "title": self.title,
            "department": self.department,
            "domain": self.domain,
            "colorVar": self.color_var,
            "assignedTo": self.assigned_to,
            "status": self.status,
            "priority": self.priority,
            "progress": self.progress,
            "startedAt": self.started_at,
        }
        if self.estimated_end:
            d["estimatedEnd"] = self.estimated_end
        return d


class LogEntry:
    def __init__(
        self,
        *,
        id: str,
        action: str,
        target: str = "",
        department: str = "",
        domain: str = "",
        color_var: str = "marketing",
        timestamp: str = "",
        status: str = "info",
        tier: str = "system",
    ):
        self.id = id
        self.action = action
        self.target = target
        self.department = department
        self.domain = domain
        self.color_var = color_var
        self.timestamp = timestamp or datetime.now().strftime("%H:%M")
        self.status = status
        self.tier = tier  # ori | vepartment | domain | agent | system

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "action": self.action,
            "target": self.target,
            "department": self.department,
            "domain": self.domain,
            "colorVar": self.color_var,
            "timestamp": self.timestamp,
            "status": self.status,
            "tier": self.tier,
        }


# ── State store ──────────────────────────────────────────────────────────────


class StateStore:
    """Singleton-style in-memory store. Thread-safe enough for a dev server."""

    def __init__(self) -> None:
        self.vepartments: list[Vepartment] = []
        self.domain_supervisors: list[DomainSupervisor] = []
        self.agents: list[Agent] = []
        self.tasks: list[Task] = []
        self.logs: list[LogEntry] = []
        self.metrics: dict[str, Any] = {}
        self._seed()

    def _seed(self) -> None:
        """Populate with initial data matching the frontend."""

        # ── Vepartments (departments with vepartment-level supervisors) ──
        self.vepartments = [
            Vepartment(
                id="vep-marketing",
                name="Marketing",
                color_var="marketing",
                icon="IconMarketing",
                status="active",
                supervisor_name="Marketing Supervisor",
                supervisor_status="online",
                has_level=4,
                domains=["Social & Messaging"],
            ),
        ]

        # ── Domain supervisors ──
        self.domain_supervisors = [
            DomainSupervisor(
                id="dsup-sm-01",
                name="Social & Messaging Supervisor",
                department="Marketing",
                domain="Social & Messaging",
                color_var="marketing",
                icon="IconSocialMessaging",
                status="online",
                has_level=3,
                active_agents=6,
                total_agents=6,
                active_tasks=3,
            ),
        ]

        # ── Agents within Social & Messaging domain ──
        self.agents = [
            Agent(id="SM-E1", name="Content Executor", agent_type="worker", department="Marketing", domain="Social & Messaging", color_var="marketing", icon="IconPix", status="busy"),
            Agent(id="SM-E2", name="Scheduling Executor", agent_type="worker", department="Marketing", domain="Social & Messaging", color_var="marketing", icon="IconPix", status="idle"),
            Agent(id="SM-M1", name="Quality Monitor", agent_type="monitor", department="Marketing", domain="Social & Messaging", color_var="marketing", icon="IconVig", status="busy"),
            Agent(id="SM-S1", name="Campaign Strategist", agent_type="strategist", department="Marketing", domain="Social & Messaging", color_var="marketing", icon="IconLux", status="idle"),
            Agent(id="SM-I1", name="Format Innovator", agent_type="innovator", department="Marketing", domain="Social & Messaging", color_var="marketing", icon="IconZyn", status="idle"),
            Agent(id="SM-G1", name="Engagement Analyst", agent_type="worker", department="Marketing", domain="Social & Messaging", color_var="marketing", icon="IconRho", status="idle"),
        ]

        # ── Tasks ──
        self.tasks = [
            Task(id="t1", title="Generate weekly content calendar", department="Marketing", domain="Social & Messaging", color_var="marketing", assigned_to="SM-E1", status="running", priority="high", progress=64, started_at="2m ago"),
            Task(id="t2", title="Audit quality scores", department="Marketing", domain="Social & Messaging", color_var="marketing", assigned_to="SM-M1", status="running", priority="normal", progress=28, started_at="8m ago"),
            Task(id="t3", title="Analyze engagement trends", department="Marketing", domain="Social & Messaging", color_var="marketing", assigned_to="SM-G1", status="queued", priority="normal", progress=0, started_at="queued"),
        ]

        # ── Logs ──
        self.logs = [
            LogEntry(id="l1", action="Deployed SM-I1 to draft status", target="SM-I1", department="Marketing", domain="Social & Messaging", color_var="marketing", timestamp="1m ago", status="success", tier="domain"),
            LogEntry(id="l2", action="Content calendar started — week 11", target="SM-E1", department="Marketing", domain="Social & Messaging", color_var="marketing", timestamp="2m ago", status="info", tier="domain"),
            LogEntry(id="l3", action="Quality threshold: 7.5 → 8.0", target="SM-M1", department="Marketing", domain="Social & Messaging", color_var="marketing", timestamp="12m ago", status="warning", tier="domain"),
            LogEntry(id="l4", action="Strategy brief completed — Q2", target="SM-S1", department="Marketing", domain="Social & Messaging", color_var="marketing", timestamp="25m ago", status="success", tier="vepartment"),
            LogEntry(id="l5", action="Health check passed — all responding", target="system", department="Operations", color_var="marketing", timestamp="30m ago", status="success", tier="ori"),
        ]

        self._recompute_metrics()

    def _recompute_metrics(self) -> None:
        running = sum(1 for t in self.tasks if t.status == "running")
        queued = sum(1 for t in self.tasks if t.status == "queued")
        total_agents = len(self.agents)
        busy_agents = sum(1 for a in self.agents if a.status == "busy")
        self.metrics = {
            "vepartments": len(self.vepartments),
            "vepartmentSupervisors": len(self.vepartments),
            "domainSupervisors": len(self.domain_supervisors),
            "agents": total_agents,
            "agentsBusy": busy_agents,
            "tasksToday": len(self.tasks),
            "tasksRunning": running,
            "tasksQueued": queued,
        }

    # ── Vepartments ──────────────────────────────────────────────────────

    def get_vepartments(self) -> list[dict[str, Any]]:
        """Get all vepartments with aggregated domain data."""
        result = []
        for vep in self.vepartments:
            d = vep.to_dict()
            # Enrich with counts from domain supervisors
            domain_sups = [ds for ds in self.domain_supervisors if ds.department == vep.name]
            d["domainSupervisorCount"] = len(domain_sups)
            d["totalAgents"] = sum(ds.total_agents for ds in domain_sups)
            d["activeAgents"] = sum(ds.active_agents for ds in domain_sups)
            d["activeTasks"] = sum(ds.active_tasks for ds in domain_sups)
            d["domainSupervisors"] = [ds.to_dict() for ds in domain_sups]
            result.append(d)
        return result

    def get_vepartment(self, vep_id: str) -> Vepartment | None:
        return next((v for v in self.vepartments if v.id == vep_id), None)

    def get_vepartment_by_name(self, name: str) -> Vepartment | None:
        return next((v for v in self.vepartments if v.name.lower() == name.lower()), None)

    def add_vepartment(self, **kwargs: Any) -> Vepartment:
        vep = Vepartment(id=kwargs.pop("id", f"vep-{_id()}"), **kwargs)
        self.vepartments.append(vep)
        self._recompute_metrics()
        self.add_log(action=f"Vepartment created: {vep.name}", target=vep.id, department=vep.name, color_var=vep.color_var, status="success", tier="ori")
        return vep

    # ── Domain supervisors ───────────────────────────────────────────────

    def get_domain_supervisors(self, department: str = "") -> list[dict[str, Any]]:
        sups = self.domain_supervisors
        if department:
            sups = [s for s in sups if s.department.lower() == department.lower()]
        return [s.to_dict() for s in sups]

    def get_domain_supervisor(self, sup_id: str) -> DomainSupervisor | None:
        return next((s for s in self.domain_supervisors if s.id == sup_id), None)

    def add_domain_supervisor(self, **kwargs: Any) -> DomainSupervisor:
        sup = DomainSupervisor(id=kwargs.pop("id", f"dsup-{_id()}"), **kwargs)
        self.domain_supervisors.append(sup)
        # Add domain to parent vepartment
        vep = self.get_vepartment_by_name(sup.department)
        if vep and sup.domain not in vep.domains:
            vep.domains.append(sup.domain)
        self._recompute_metrics()
        self.add_log(action=f"Domain supervisor deployed: {sup.name}", target=sup.id, department=sup.department, domain=sup.domain, color_var=sup.color_var, status="success", tier="vepartment")
        return sup

    # ── Agents ───────────────────────────────────────────────────────────

    def get_agents(self, department: str = "", domain: str = "") -> list[dict[str, Any]]:
        agents = self.agents
        if department:
            agents = [a for a in agents if a.department.lower() == department.lower()]
        if domain:
            agents = [a for a in agents if a.domain.lower() == domain.lower()]
        return [a.to_dict() for a in agents]

    def get_agent(self, agent_id: str) -> Agent | None:
        return next((a for a in self.agents if a.id == agent_id), None)

    def add_agent(self, **kwargs: Any) -> Agent:
        agent = Agent(id=kwargs.pop("id", f"ag-{_id()}"), **kwargs)
        self.agents.append(agent)
        # Update parent domain supervisor counts
        for ds in self.domain_supervisors:
            if ds.department == agent.department and ds.domain == agent.domain:
                ds.total_agents += 1
                if agent.status == "busy":
                    ds.active_agents += 1
                break
        self._recompute_metrics()
        self.add_log(action=f"Agent deployed: {agent.name} ({agent.agent_type})", target=agent.id, department=agent.department, domain=agent.domain, color_var=agent.color_var, status="success", tier="domain")
        return agent

    # ── Tasks ────────────────────────────────────────────────────────────

    def get_tasks(self, department: str = "", domain: str = "", status_filter: str = "") -> list[dict[str, Any]]:
        tasks = self.tasks
        if department:
            tasks = [t for t in tasks if t.department.lower() == department.lower()]
        if domain:
            tasks = [t for t in tasks if t.domain.lower() == domain.lower()]
        if status_filter:
            tasks = [t for t in tasks if t.status == status_filter]
        return [t.to_dict() for t in tasks]

    def get_task(self, task_id: str) -> Task | None:
        return next((t for t in self.tasks if t.id == task_id), None)

    def add_task(self, **kwargs: Any) -> Task:
        task = Task(id=kwargs.pop("id", f"t-{_id()}"), **kwargs)
        self.tasks.append(task)
        self._recompute_metrics()
        self.add_log(action=f"Task created: {task.title}", target=task.assigned_to, department=task.department, domain=task.domain, color_var=task.color_var, status="info", tier="domain")
        return task

    def update_task(self, task_id: str, **updates: Any) -> Task | None:
        task = self.get_task(task_id)
        if not task:
            return None
        for k, v in updates.items():
            if hasattr(task, k):
                setattr(task, k, v)
        self._recompute_metrics()
        return task

    def complete_task(self, task_id: str) -> Task | None:
        task = self.get_task(task_id)
        if not task:
            return None
        task.status = "completed"
        task.progress = 100
        self._recompute_metrics()
        self.add_log(action=f"Task completed: {task.title}", target=task.assigned_to, department=task.department, domain=task.domain, color_var=task.color_var, status="success", tier="domain")
        return task

    # ── Logs ─────────────────────────────────────────────────────────────

    def get_logs(self, limit: int = 20, tier: str = "") -> list[dict[str, Any]]:
        logs = self.logs
        if tier:
            logs = [l for l in logs if l.tier == tier]
        return [l.to_dict() for l in logs[:limit]]

    def add_log(self, **kwargs: Any) -> LogEntry:
        entry = LogEntry(id=f"l-{_id()}", **kwargs)
        self.logs.insert(0, entry)
        if len(self.logs) > 100:
            self.logs = self.logs[:100]
        return entry

    # ── Metrics ──────────────────────────────────────────────────────────

    def get_metrics(self) -> dict[str, Any]:
        self._recompute_metrics()
        return self.metrics

    # ── Full state snapshot ──────────────────────────────────────────────

    def snapshot(self) -> dict[str, Any]:
        return {
            "vepartments": self.get_vepartments(),
            "domainSupervisors": self.get_domain_supervisors(),
            "agents": self.get_agents(),
            "tasks": self.get_tasks(),
            "logs": self.get_logs(),
            "metrics": self.get_metrics(),
        }


# Global instance
store = StateStore()
