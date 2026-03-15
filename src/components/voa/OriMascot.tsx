"use client";

import { cn } from "@/lib/utils";
import {
  IconOri,
  IconOriConfident,
  IconOriFocused,
  IconOriCalm,
  IconOriThinking,
  IconOriDetermined,
  IconOriWatching,
  IconOriExcited,
  IconOriCurious,
} from "@/components/icons/vepartment";
import type { ComponentType } from "react";

type OriExpression =
  | "default"
  | "confident"
  | "focused"
  | "calm"
  | "thinking"
  | "determined"
  | "watching"
  | "excited"
  | "curious";

const EXPRESSION_ICON: Record<
  OriExpression,
  ComponentType<{ size?: number; strokeWidth?: number | string; className?: string }>
> = {
  default: IconOri,
  confident: IconOriConfident,
  focused: IconOriFocused,
  calm: IconOriCalm,
  thinking: IconOriThinking,
  determined: IconOriDetermined,
  watching: IconOriWatching,
  excited: IconOriExcited,
  curious: IconOriCurious,
};

interface OriMascotProps {
  size?: number;
  thinking?: boolean;
  expression?: OriExpression;
  className?: string;
}

export function OriMascot({
  size = 120,
  thinking = false,
  expression = "default",
  className,
}: OriMascotProps) {
  const svgSize = size * 0.8;

  // Use thinking prop as fallback expression
  const activeExpression = thinking && expression === "default" ? "thinking" : expression;
  const FaceIcon = EXPRESSION_ICON[activeExpression] ?? IconOri;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Subtle pulse glow — no frame */}
      <div
        className="absolute bg-primary/5 ori-status-ring"
        style={{ width: size * 0.6, height: size * 0.6 }}
      />

      {/* Ori face — idle float + optional thinking tilt */}
      <div className={cn("ori-idle", (thinking || activeExpression === "thinking") && "ori-thinking")}>
        <FaceIcon
          size={svgSize}
          strokeWidth={1}
          className="text-primary"
        />
      </div>

      {/* Live status dot */}
      <div className="absolute" style={{ bottom: size * 0.12, right: size * 0.18 }}>
        <div className="w-2.5 h-2.5 rounded-full bg-success" />
        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-success animate-ping opacity-30" />
      </div>
    </div>
  );
}
