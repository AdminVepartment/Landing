"use client";

import { cn } from "@/lib/utils";
import { IconTrendingUp, IconTrendingDown, IconMinus } from "@/components/icons";
import type { SystemMetric } from "./types";

interface SystemMetricsProps {
  metrics: SystemMetric[];
  className?: string;
}

const TREND_ICON = {
  up:      { Icon: IconTrendingUp,   color: "text-success" },
  down:    { Icon: IconTrendingDown, color: "text-error" },
  neutral: { Icon: IconMinus,        color: "text-foreground-dim" },
} as const;

export function SystemMetrics({ metrics, className }: SystemMetricsProps) {
  return (
    <div className={cn("border border-border bg-surface", className)}>
      <div className="px-5 py-3.5 border-b border-border">
        <span className="text-os-title-sm text-foreground-dim">SYSTEM OVERVIEW</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border-subtle">
        {metrics.map((m) => {
          const trend = m.trend ? TREND_ICON[m.trend] : null;
          return (
            <div key={m.label} className="bg-surface px-4 py-4">
              <p className="text-label-sm text-foreground-dim mb-1.5">{m.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-data-lg text-foreground font-medium">{m.value}</span>
                {m.change && trend && (
                  <div className="flex items-center gap-0.5 mb-0.5">
                    <trend.Icon size={11} strokeWidth={1.5} className={trend.color} />
                    <span className={cn("text-label-sm font-mono", trend.color)}>{m.change}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
