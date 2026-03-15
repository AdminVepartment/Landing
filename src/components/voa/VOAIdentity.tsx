"use client";

import { cn } from "@/lib/utils";
import { IconOri } from "@/components/icons/vepartment";
import { IconActivity, IconClock, IconShieldCheck } from "@/components/icons";
import type { AgentStatus, HASLevel } from "./types";

interface VOAIdentityProps {
  status: AgentStatus;
  hasLevel: HASLevel;
  uptime: string;
  tasksCompleted: number;
  className?: string;
}

const STATUS_MAP: Record<AgentStatus, { label: string; color: string }> = {
  online:  { label: "ONLINE",  color: "bg-success" },
  busy:    { label: "BUSY",    color: "bg-warning" },
  idle:    { label: "IDLE",    color: "bg-foreground-dim" },
  offline: { label: "OFFLINE", color: "bg-border" },
  error:   { label: "ERROR",   color: "bg-error" },
};

export function VOAIdentity({ status, hasLevel, uptime, tasksCompleted, className }: VOAIdentityProps) {
  const s = STATUS_MAP[status];

  return (
    <div className={cn("border border-border bg-surface", className)}>
      {/* Identity header — double top border for system-level distinction */}
      <div
        className="px-5 py-5 border-b border-border"
        style={{ borderTop: "2px solid hsl(var(--primary))" }}
      >
        <div className="flex items-center gap-4">
          {/* VOA icon — primary accent treatment */}
          <div className="w-11 h-11 flex items-center justify-center border-2 border-primary bg-primary/5 shrink-0">
            <IconOri size={22} strokeWidth={1.5} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-module-sm font-semibold text-foreground">Ori</span>
              <span className="text-os-title-sm px-1.5 py-0.5 border border-primary/30 text-primary bg-primary/5">
                VOA
              </span>
            </div>
            <p className="text-body-sm text-foreground-muted">
              Your operations agent
            </p>
          </div>
        </div>
      </div>

      {/* Status strip */}
      <div className="flex items-center gap-3 px-5 py-3 bg-surface-raised border-b border-border-subtle">
        <div className="flex items-center gap-1.5">
          <div className={cn("w-1.5 h-1.5 rounded-full", s.color)} />
          <span className="text-os-title-sm text-foreground-dim">{s.label}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-1.5">
          <IconShieldCheck size={11} className="text-foreground-dim" />
          <span className="text-label-sm text-foreground-dim">HAS-{hasLevel}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <span className="text-label-sm text-primary font-mono">SYSTEM CLASS</span>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 divide-x divide-border-subtle">
        <div className="flex items-center gap-2.5 px-5 py-3.5">
          <IconClock size={12} className="text-foreground-dim" />
          <div>
            <p className="text-label-sm text-foreground-dim">UPTIME</p>
            <p className="text-data-md text-foreground">{uptime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-5 py-3.5">
          <IconActivity size={12} className="text-foreground-dim" />
          <div>
            <p className="text-label-sm text-foreground-dim">COMPLETED</p>
            <p className="text-data-md text-foreground">{tasksCompleted}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
