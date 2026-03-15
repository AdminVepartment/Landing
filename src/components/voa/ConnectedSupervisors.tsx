"use client";

import { cn } from "@/lib/utils";
import { IconBot, IconChevronRight, IconActivity } from "@/components/icons";
import type { ConnectedSupervisor, AgentStatus } from "./types";

interface ConnectedSupervisorsProps {
  supervisors: ConnectedSupervisor[];
  className?: string;
}

const STATUS_DOT: Record<AgentStatus, string> = {
  online:  "bg-success",
  busy:    "bg-warning",
  idle:    "bg-foreground-dim",
  offline: "bg-border",
  error:   "bg-error",
};

export function ConnectedSupervisors({ supervisors, className }: ConnectedSupervisorsProps) {
  const online = supervisors.filter((s) => s.status === "online" || s.status === "busy").length;

  return (
    <div className={cn("border border-border bg-surface", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <span className="text-os-title-sm text-foreground-dim">CONNECTED SUPERVISORS</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="text-label-sm text-foreground-dim font-mono">{online}/{supervisors.length}</span>
        </div>
      </div>

      {/* Supervisor list */}
      <div className="flex flex-col">
        {supervisors.map((sup, i) => {
          const topColor = `hsl(var(--dept-${sup.colorVar}-main))`;
          return (
            <div
              key={sup.id}
              className={cn(
                "group flex items-center gap-3 px-5 py-3.5 hover:bg-surface-raised transition-colors cursor-pointer",
                i < supervisors.length - 1 && "border-b border-border-subtle"
              )}
            >
              {/* Dept color indicator */}
              <div
                className="w-0.5 h-8 shrink-0"
                style={{ backgroundColor: topColor }}
              />

              {/* Icon */}
              <div className="w-8 h-8 flex items-center justify-center border border-border shrink-0">
                <sup.Icon size={16} strokeWidth={1.5} className="text-foreground-muted" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-body-sm font-medium text-foreground truncate">{sup.name}</span>
                  <span className="text-os-title-sm text-foreground-dim">HAS-{sup.hasLevel}</span>
                </div>
                <p className="text-label-sm text-foreground-dim truncate">
                  {sup.department} · {sup.domain}
                </p>
              </div>

              {/* Agent count */}
              <div className="flex items-center gap-1.5 shrink-0">
                <IconBot size={11} className="text-foreground-dim" />
                <span className="text-label-sm text-foreground-dim font-mono">
                  {sup.activeAgents}/{sup.totalAgents}
                </span>
              </div>

              {/* Active tasks */}
              <div className="flex items-center gap-1.5 shrink-0">
                <IconActivity size={11} className="text-foreground-dim" />
                <span className="text-label-sm text-foreground-dim font-mono">
                  {sup.activeTasks}
                </span>
              </div>

              {/* Status */}
              <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", STATUS_DOT[sup.status])} />

              <IconChevronRight size={13} className="text-foreground-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
