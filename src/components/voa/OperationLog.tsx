"use client";

import { cn } from "@/lib/utils";
import { IconCheckCircle, IconAlertTriangle, IconXCircle, IconInfo } from "@/components/icons";
import type { OperationLog as OperationLogEntry } from "./types";

interface OperationLogProps {
  entries: OperationLogEntry[];
  className?: string;
}

const STATUS_ICON = {
  success: { Icon: IconCheckCircle,   color: "text-success" },
  warning: { Icon: IconAlertTriangle, color: "text-warning" },
  error:   { Icon: IconXCircle,       color: "text-error" },
  info:    { Icon: IconInfo,          color: "text-foreground-dim" },
} as const;

export function OperationLog({ entries, className }: OperationLogProps) {
  return (
    <div className={cn("border border-border bg-surface", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <span className="text-os-title-sm text-foreground-dim">OPERATION LOG</span>
        <span className="text-label-sm text-foreground-dim font-mono">{entries.length} entries</span>
      </div>

      {/* Log entries */}
      <div className="flex flex-col max-h-[320px] overflow-y-auto">
        {entries.length === 0 ? (
          <div className="flex items-center justify-center px-5 py-10">
            <span className="text-label-sm text-foreground-dim font-mono">No operations logged</span>
          </div>
        ) : (
          entries.map((entry, i) => {
            const si = STATUS_ICON[entry.status];
            const deptColor = `hsl(var(--dept-${entry.colorVar}-main))`;

            return (
              <div
                key={entry.id}
                className={cn(
                  "flex items-start gap-3 px-5 py-3 hover:bg-surface-raised transition-colors",
                  i < entries.length - 1 && "border-b border-border-subtle"
                )}
              >
                <si.Icon size={13} strokeWidth={1.5} className={cn("shrink-0 mt-0.5", si.color)} />

                <div className="flex-1 min-w-0">
                  <p className="text-body-sm text-foreground leading-snug">{entry.action}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: deptColor }} />
                    <span className="text-label-sm text-foreground-dim">{entry.target}</span>
                    <div className="w-px h-2.5 bg-border" />
                    <span className="text-label-sm text-foreground-dim">{entry.department}</span>
                  </div>
                </div>

                <span className="text-label-sm text-foreground-dim font-mono shrink-0">{entry.timestamp}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
