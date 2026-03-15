/**
 * Ori Logic Layer — TypeScript types matching the CrewAI backend state shape.
 *
 * 4-tier hierarchy:
 *   Ori → Vepartment Supervisors → Domain Supervisors → Agents
 */

// ── Expressions ─────────────────────────────────────────────────────────────

export type OriExpression =
  | "default"
  | "confident"
  | "focused"
  | "calm"
  | "thinking"
  | "determined"
  | "watching"
  | "excited"
  | "curious";

export type OriMood = "neutral" | "positive" | "alert" | "processing";

// ── Tier 1: Vepartments (departments with vepartment supervisors) ───────────

export interface BackendVepartment {
  id: string;
  name: string;
  colorVar: string;
  icon: string;
  status: "active" | "inactive" | "setup";
  supervisorName: string;
  supervisorStatus: "online" | "busy" | "idle" | "offline" | "error";
  hasLevel: number;
  domains: string[];
  // Aggregated from domain supervisors
  domainSupervisorCount: number;
  totalAgents: number;
  activeAgents: number;
  activeTasks: number;
  domainSupervisors: BackendDomainSupervisor[];
}

// ── Tier 2: Domain Supervisors ──────────────────────────────────────────────

export interface BackendDomainSupervisor {
  id: string;
  name: string;
  department: string;
  domain: string;
  colorVar: string;
  icon: string;
  status: "online" | "busy" | "idle" | "offline" | "error";
  hasLevel: number;
  activeAgents: number;
  totalAgents: number;
  activeTasks: number;
}

// ── Tier 3: Agents ──────────────────────────────────────────────────────────

export interface BackendAgent {
  id: string;
  name: string;
  agentType: "worker" | "monitor" | "strategist" | "innovator";
  department: string;
  domain: string;
  colorVar: string;
  icon: string;
  status: "busy" | "idle" | "offline" | "error";
}

// ── Tasks & Logs ────────────────────────────────────────────────────────────

export interface BackendTask {
  id: string;
  title: string;
  department: string;
  domain: string;
  colorVar: string;
  assignedTo: string;
  status: "running" | "queued" | "completed" | "failed" | "paused";
  priority: "critical" | "high" | "normal" | "low";
  progress: number;
  startedAt: string;
  estimatedEnd?: string;
}

export interface BackendLogEntry {
  id: string;
  action: string;
  target: string;
  department: string;
  domain: string;
  colorVar: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
  tier: "ori" | "vepartment" | "domain" | "agent" | "system";
}

export interface BackendMetrics {
  vepartments: number;
  vepartmentSupervisors: number;
  domainSupervisors: number;
  agents: number;
  agentsBusy: number;
  tasksToday: number;
  tasksRunning: number;
  tasksQueued: number;
}

export interface BackendState {
  vepartments: BackendVepartment[];
  domainSupervisors: BackendDomainSupervisor[];
  agents: BackendAgent[];
  tasks: BackendTask[];
  logs: BackendLogEntry[];
  metrics: BackendMetrics;
}

// ── Chat ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  expression?: OriExpression;
}

export interface ChatResponse {
  output: string;
  expression: OriExpression;
}

export interface CommandResponse {
  output: string;
  success: boolean;
  expression: OriExpression;
}
