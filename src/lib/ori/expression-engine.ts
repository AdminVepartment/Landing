/**
 * Expression Engine — maps Ori's activity state to facial expressions.
 *
 * Expression lifecycle:
 *   User sends message  → "thinking"
 *   CrewAI processing   → "focused"
 *   Delegating to Rex   → "confident"
 *   Task executing      → "determined"
 *   Monitoring results  → "watching"
 *   Success response    → "excited" (auto-decay to "calm" after 3s)
 *   Error/retry         → "curious"
 *   Idle                → "default"
 */

import type { OriExpression } from "./types";

export type ExpressionPhase =
  | "idle"
  | "sending"
  | "processing"
  | "delegating"
  | "executing"
  | "monitoring"
  | "success"
  | "error";

const PHASE_TO_EXPRESSION: Record<ExpressionPhase, OriExpression> = {
  idle: "default",
  sending: "thinking",
  processing: "focused",
  delegating: "confident",
  executing: "determined",
  monitoring: "watching",
  success: "excited",
  error: "curious",
};

/** Get expression for a given phase. */
export function expressionForPhase(phase: ExpressionPhase): OriExpression {
  return PHASE_TO_EXPRESSION[phase];
}

/** Merge a backend-provided expression with a phase (backend takes priority). */
export function resolveExpression(
  backendExpression?: string,
  phase: ExpressionPhase = "idle",
): OriExpression {
  if (backendExpression && backendExpression !== "calm") {
    return backendExpression as OriExpression;
  }
  return PHASE_TO_EXPRESSION[phase];
}

/**
 * Decay timeout — after a success/error expression, decay back to calm.
 * Returns the decay delay in ms.
 */
export function getDecayDelay(expression: OriExpression): number {
  switch (expression) {
    case "excited":
      return 3000;
    case "curious":
      return 4000;
    case "determined":
      return 2000;
    default:
      return 0; // no decay needed
  }
}
