"use client";

import { cn } from "@/lib/utils";
import type { AnyIcon } from "./types";

interface QuickAction {
  label: string;
  desc: string;
  Icon: AnyIcon;
  command?: string;
}

interface QuickOpsProps {
  actions: QuickAction[];
  onAction?: (command: string) => void;
  disabled?: boolean;
  className?: string;
}

export function QuickOps({ actions, onAction, disabled, className }: QuickOpsProps) {
  return (
    <div className={cn("border border-border bg-surface", className)}>
      <div className="px-5 py-3.5 border-b border-border">
        <span className="text-os-title-sm text-foreground-dim">QUICK OPERATIONS</span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border-subtle">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => action.command && onAction?.(action.command)}
            disabled={disabled}
            className="flex items-start gap-3 px-4 py-4 bg-surface hover:bg-surface-raised transition-colors text-left disabled:opacity-50"
          >
            <div className="w-7 h-7 flex items-center justify-center border border-border shrink-0">
              <action.Icon size={14} strokeWidth={1.5} className="text-foreground-muted" />
            </div>
            <div className="min-w-0">
              <p className="text-body-sm font-medium text-foreground mb-0.5">{action.label}</p>
              <p className="text-label-sm text-foreground-dim">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
