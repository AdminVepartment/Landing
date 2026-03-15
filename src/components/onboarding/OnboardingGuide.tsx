"use client";

import { useState } from "react";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  IconCheck, IconChevronRight, IconX,
  IconBot, IconWorkflow, IconLayers, IconPlus,
  IconMarketing, IconSparkles, IconSettings,
  IconArrowUpRight, IconTarget, IconActivity,
} from "@/components/icons";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type AnyIcon = ComponentType<{ size?: number; className?: string }>;

interface OnboardingStep {
  id: string;
  number: number;
  title: string;
  description: string;
  detail: string;
  icon: AnyIcon;
  actionLabel: string;
  actionHref?: string;
  completed: boolean;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_STEPS: OnboardingStep[] = [
  {
    id: "explore-dept",
    number: 1,
    title: "Explore your vepartment",
    description: "Marketing is active and ready. Open it to see your domains, agents, and workflows.",
    detail: "A vepartment is your AI-powered department. Each one has domains (focus areas), agents (AI workers), and workflows (automated processes).",
    icon: IconMarketing,
    actionLabel: "Open Marketing",
    actionHref: "/dashboard/marketing",
    completed: false,
  },
  {
    id: "meet-agents",
    number: 2,
    title: "Meet your AI agents",
    description: "Social & Messaging has 6 agents across 6 layers. Each agent handles a specific responsibility.",
    detail: "Agents are organized in layers: Foundation, Strategy, Execution, Monitoring, Growth, and Innovation. Together they form a complete operating stack.",
    icon: IconBot,
    actionLabel: "View agents",
    actionHref: "/dashboard/marketing/social-messaging",
    completed: false,
  },
  {
    id: "configure-agent",
    number: 3,
    title: "Configure an agent",
    description: "Open the Rules & Context Manager to set policies, data sources, and quality criteria.",
    detail: "Each agent has configurable policies, input controls, data connections, and quality dimensions. This is how you teach your AI team the rules.",
    icon: IconSettings,
    actionLabel: "Configure agent",
    actionHref: "/dashboard/marketing/social-messaging/agent",
    completed: false,
  },
  {
    id: "run-workflow",
    number: 4,
    title: "Run your first workflow",
    description: "Trigger a workflow to see your agents collaborate. Start with a content draft or analysis.",
    detail: "Workflows chain agents together. A content workflow might start with Strategy Planner, pass to Content Creator, then Quality Reviewer — all automated.",
    icon: IconWorkflow,
    actionLabel: "Try a workflow",
    actionHref: "/dashboard/marketing/social-messaging",
    completed: false,
  },
  {
    id: "add-domain",
    number: 5,
    title: "Add a new domain",
    description: "Expand Marketing by activating another domain like Email Marketing or SEO & Growth.",
    detail: "Domains are focus areas within a vepartment. Adding a domain creates new agents and workflows specific to that discipline.",
    icon: IconPlus,
    actionLabel: "Add domain",
    actionHref: "/dashboard/marketing",
    completed: false,
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export function OnboardingGuide({
  onDismiss,
}: {
  onDismiss: () => void;
}) {
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [expandedStep, setExpandedStep] = useState<string | null>("explore-dept");

  const completedCount = steps.filter((s) => s.completed).length;
  const totalSteps = steps.length;
  const allDone = completedCount === totalSteps;
  const progressPct = Math.round((completedCount / totalSteps) * 100);

  function completeStep(id: string) {
    setSteps((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, completed: true } : s));
      // Auto-expand next incomplete step
      const nextIncomplete = updated.find((s) => !s.completed);
      if (nextIncomplete) {
        setExpandedStep(nextIncomplete.id);
      } else {
        setExpandedStep(null);
      }
      return updated;
    });
  }

  function toggleExpand(id: string) {
    setExpandedStep((prev) => (prev === id ? null : id));
  }

  return (
    <div className="bg-surface border border-border">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="w-7 h-7 flex items-center justify-center border border-foreground shrink-0">
          <IconSparkles size={14} className="text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-module-sm font-semibold text-foreground">
            {allDone ? "You're all set" : "Get started with Vepartment"}
          </h3>
          <p className="text-label-sm text-foreground-muted font-mono mt-0.5">
            {allDone
              ? "You've completed all onboarding steps."
              : `${completedCount} of ${totalSteps} steps completed`}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="w-6 h-6 flex items-center justify-center text-foreground-dim hover:text-foreground transition-colors shrink-0"
          title="Dismiss guide"
        >
          <IconX size={12} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-border">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Steps */}
      <div className="divide-y divide-border-subtle">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isExpanded = expandedStep === step.id;
          const isDone = step.completed;

          return (
            <div key={step.id}>
              {/* Step header — clickable */}
              <button
                onClick={() => toggleExpand(step.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors",
                  isDone
                    ? "opacity-50"
                    : "hover:bg-surface-raised"
                )}
              >
                {/* Step indicator */}
                {isDone ? (
                  <div className="w-6 h-6 flex items-center justify-center border border-primary bg-primary/10 shrink-0">
                    <IconCheck size={11} className="text-primary" />
                  </div>
                ) : (
                  <div className={cn(
                    "w-6 h-6 flex items-center justify-center border shrink-0",
                    isExpanded ? "border-foreground" : "border-border"
                  )}>
                    <span className={cn(
                      "font-mono text-[10px]",
                      isExpanded ? "text-foreground" : "text-foreground-dim"
                    )}>
                      {step.number}
                    </span>
                  </div>
                )}

                {/* Title + brief */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-body-sm leading-snug",
                    isDone
                      ? "text-foreground-muted line-through"
                      : "text-foreground font-medium"
                  )}>
                    {step.title}
                  </p>
                  {!isExpanded && !isDone && (
                    <p className="text-label-sm text-foreground-dim mt-0.5 truncate">
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Expand chevron */}
                <IconChevronRight
                  size={11}
                  className={cn(
                    "text-foreground-dim shrink-0 transition-transform",
                    isExpanded && "rotate-90"
                  )}
                />
              </button>

              {/* Expanded content */}
              {isExpanded && !isDone && (
                <div className="px-5 pb-4 pl-14">
                  {/* Description */}
                  <p className="text-body-sm text-foreground-muted leading-relaxed mb-2">
                    {step.description}
                  </p>

                  {/* Detail explanation */}
                  <div className="bg-background border border-border-subtle px-4 py-3 mb-4">
                    <div className="flex items-start gap-2.5">
                      <StepIcon size={12} className="text-foreground-dim shrink-0 mt-0.5" />
                      <p className="text-label-sm text-foreground-dim leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {step.actionHref ? (
                      <Link
                        href={step.actionHref}
                        onClick={() => completeStep(step.id)}
                        className="flex items-center gap-2 h-8 px-4 border border-foreground text-foreground hover:bg-surface-raised transition-colors"
                      >
                        <span className="text-label-sm font-medium">{step.actionLabel}</span>
                        <IconArrowUpRight size={11} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => completeStep(step.id)}
                        className="flex items-center gap-2 h-8 px-4 border border-foreground text-foreground hover:bg-surface-raised transition-colors"
                      >
                        <span className="text-label-sm font-medium">{step.actionLabel}</span>
                      </button>
                    )}

                    <button
                      onClick={() => completeStep(step.id)}
                      className="text-label-sm text-foreground-dim hover:text-foreground transition-colors"
                    >
                      Skip step
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer — shows when all done */}
      {allDone && (
        <div className="px-5 py-4 border-t border-border bg-surface-raised/50">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center border border-primary bg-primary/10 shrink-0">
              <IconCheck size={14} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-body-sm text-foreground font-medium">Onboarding complete</p>
              <p className="text-label-sm text-foreground-muted mt-0.5">
                Your workspace is ready. Explore more domains and vepartments as you grow.
              </p>
            </div>
            <button
              onClick={onDismiss}
              className="h-8 px-4 border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors text-label-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
