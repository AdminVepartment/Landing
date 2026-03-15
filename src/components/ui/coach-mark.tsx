"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ArrowPosition = "top" | "bottom" | "left" | "right";

interface CoachMarkProps {
  children: React.ReactNode;
  arrow?: ArrowPosition;
  className?: string;
  /** Auto-dismiss after N milliseconds (0 = never) */
  dismissAfter?: number;
  /** Show a pulsing dot indicator */
  pulse?: boolean;
  /** Step label e.g. "1 of 3" */
  step?: string;
  onDismiss?: () => void;
}

export function CoachMark({
  children,
  arrow = "bottom",
  className,
  dismissAfter = 0,
  pulse = false,
  step,
  onDismiss,
}: CoachMarkProps) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (dismissAfter > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, dismissAfter);
      return () => clearTimeout(timer);
    }
  }, [dismissAfter, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "relative inline-flex items-start gap-2 border border-primary/40 bg-surface px-3 py-2",
        className
      )}
      role="tooltip"
    >
      {/* Pulse dot */}
      {pulse && (
        <span className="relative mt-0.5 shrink-0">
          <span className="block h-1.5 w-1.5 bg-[#00E676]" />
          <span className="absolute inset-0 h-1.5 w-1.5 bg-[#00E676] animate-ping" />
        </span>
      )}

      <div className="flex flex-col gap-0.5">
        {step && (
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary">
            {step}
          </span>
        )}
        <span className="font-mono text-[10px] leading-relaxed text-foreground-muted">
          {children}
        </span>
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onDismiss();
          }}
          className="ml-1 mt-0.5 shrink-0 font-mono text-[9px] text-foreground-dim hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}

      {/* Arrow */}
      <Arrow position={arrow} />
    </div>
  );
}

function Arrow({ position }: { position: ArrowPosition }) {
  const base =
    "absolute w-0 h-0 border-solid border-transparent";

  switch (position) {
    case "top":
      return (
        <span
          className={cn(base, "left-1/2 -translate-x-1/2 -top-[6px]")}
          style={{
            borderWidth: "0 5px 6px 5px",
            borderBottomColor: "hsl(var(--primary) / 0.4)",
          }}
        />
      );
    case "bottom":
      return (
        <span
          className={cn(base, "left-1/2 -translate-x-1/2 -bottom-[6px]")}
          style={{
            borderWidth: "6px 5px 0 5px",
            borderTopColor: "hsl(var(--primary) / 0.4)",
          }}
        />
      );
    case "left":
      return (
        <span
          className={cn(base, "top-1/2 -translate-y-1/2 -left-[6px]")}
          style={{
            borderWidth: "5px 6px 5px 0",
            borderRightColor: "hsl(var(--primary) / 0.4)",
          }}
        />
      );
    case "right":
      return (
        <span
          className={cn(base, "top-1/2 -translate-y-1/2 -right-[6px]")}
          style={{
            borderWidth: "5px 0 5px 6px",
            borderLeftColor: "hsl(var(--primary) / 0.4)",
          }}
        />
      );
  }
}
