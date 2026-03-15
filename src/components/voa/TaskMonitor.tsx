"use client";

import { cn } from "@/lib/utils";
import {
  IconPlay, IconLoader, IconCheck, IconX, IconAlertTriangle,
  IconChevronRight, IconMoreVertical,
} from "@/components/icons";
import type { OperationTask, TaskStatus, TaskPriority } from "./types";

interface TaskMonitorProps {
  tasks: OperationTask[];
  className?: string;
}

const STATUS_CONFIG: Record<TaskStatus, { label: string; Icon: typeof IconPlay; color: string }> = {
  running:   { label: "Running",   Icon: IconLoader, color: "text-primary" },
  queued:    { label: "Queued",    Icon: IconPlay,   color: "text-foreground-dim" },
  completed: { label: "Done",      Icon: IconCheck,  color: "text-success" },
  failed:    { label: "Failed",    Icon: IconX,      color: "text-error" },
  paused:    { label: "Paused",    Icon: IconAlertTriangle, color: "text-warning" },
};

const PRIORITY_STYLE: Record<TaskPriority, string> = {
  critical: "text-error border-error/30 bg-error/5",
  high:     "text-warning border-warning/30 bg-warning/5",
  normal:   "text-foreground-dim border-border bg-transparent",
  low:      "text-foreground-dim border-border-subtle bg-transparent",
};

export function TaskMonitor({ tasks, className }: TaskMonitorProps) {
  const running = tasks.filter((t) => t.status === "running").length;
  const queued  = tasks.filter((t) => t.status === "queued").length;

  return (
    <div className={cn("border border-border bg-surface", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-os-title-sm text-foreground-dim">ACTIVE OPERATIONS</span>
          <div className="w-px h-3 bg-border" />
          <span className="text-label-sm text-foreground-dim font-mono">{running} running</span>
          {queued > 0 && (
            <>
              <div className="w-px h-3 bg-border" />
              <span className="text-label-sm text-foreground-dim font-mono">{queued} queued</span>
            </>
          )}
        </div>
        <button className="text-foreground-dim hover:text-foreground transition-colors">
          <IconMoreVertical size={14} />
        </button>
      </div>

      {/* Task list */}
      <div className="flex flex-col">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center px-5 py-10">
            <span className="text-label-sm text-foreground-dim font-mono">No active operations</span>
          </div>
        ) : (
          tasks.map((task, i) => {
            const sc = STATUS_CONFIG[task.status];
            const deptColor = `hsl(var(--dept-${task.colorVar}-main))`;

            return (
              <div
                key={task.id}
                className={cn(
                  "group flex items-start gap-3 px-5 py-4 hover:bg-surface-raised transition-colors cursor-pointer",
                  i < tasks.length - 1 && "border-b border-border-subtle"
                )}
              >
                {/* Status icon */}
                <div className={cn("w-6 h-6 flex items-center justify-center shrink-0 mt-0.5", sc.color)}>
                  <sc.Icon size={14} strokeWidth={1.5} className={task.status === "running" ? "animate-spin" : ""} />
                </div>

                {/* Task info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-body-sm font-medium text-foreground truncate">{task.title}</span>
                    <span className={cn("text-os-title-sm px-1.5 py-0.5 border", PRIORITY_STYLE[task.priority])}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: deptColor }} />
                    <span className="text-label-sm text-foreground-dim">
                      {task.department} · {task.domain}
                    </span>
                    <div className="w-px h-2.5 bg-border" />
                    <span className="text-label-sm text-foreground-dim font-mono">{task.assignedTo}</span>
                  </div>

                  {/* Progress bar */}
                  {task.status === "running" && (
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1 bg-background">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-label-sm text-foreground-dim font-mono">{task.progress}%</span>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-label-sm text-foreground-dim font-mono shrink-0">{task.startedAt}</span>

                <IconChevronRight size={13} className="text-foreground-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
