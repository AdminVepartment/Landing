/**
 * VOA — Vepartment Operations Agent
 *
 * Type definitions for the system-level personal assistant agent.
 * The VOA sits above all department supervisors and acts as the
 * user's primary operational interface to the Vepartment system.
 */

import type { ComponentType, CSSProperties } from "react";

// ── Icon type ────────────────────────────────────────────────────────────────

export type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Agent classification ─────────────────────────────────────────────────────

export type AgentClass = "voa" | "supervisor" | "worker";
export type AgentStatus = "online" | "busy" | "idle" | "offline" | "error";
export type HASLevel = 1 | 2 | 3 | 4 | 5;
export type TaskPriority = "critical" | "high" | "normal" | "low";
export type TaskStatus = "running" | "queued" | "completed" | "failed" | "paused";

// ── Connected supervisor ─────────────────────────────────────────────────────

export interface ConnectedSupervisor {
  id: string;
  name: string;
  department: string;
  domain: string;
  colorVar: string;
  Icon: AnyIcon;
  status: AgentStatus;
  hasLevel: HASLevel;
  activeAgents: number;
  totalAgents: number;
  activeTasks: number;
}

// ── Operation task ───────────────────────────────────────────────────────────

export interface OperationTask {
  id: string;
  title: string;
  department: string;
  domain: string;
  colorVar: string;
  assignedTo: string;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  startedAt: string;
  estimatedEnd?: string;
}

// ── System metric ────────────────────────────────────────────────────────────

export interface SystemMetric {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

// ── Operation log entry ──────────────────────────────────────────────────────

export interface OperationLog {
  id: string;
  action: string;
  target: string;
  department: string;
  colorVar: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
}
