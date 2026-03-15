"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IconArrowRight,
  IconLoader,
  IconAlertCircle,
  IconTarget,
  IconPencil,
  IconBarChart3,
  IconUsers,
  IconTrendingUp,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import { DomainGuide } from "./guide";
import { useActivity } from "@/lib/activity-store";
import { useDomainProgress } from "@/lib/domain-progress-store";

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 border border-primary flex items-center justify-center shrink-0">
        <div className="w-2 h-2 bg-primary" />
      </div>
      <span className="font-mono text-xs font-medium tracking-[0.18em] uppercase text-foreground">
        Vepartment
      </span>
    </div>
  );
}

interface DomainItem {
  name: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>;
}

const DEPARTMENT = "Marketing";
const DEPT_COLOR_VAR = "marketing";

const domains: DomainItem[] = [
  { name: "Social & Messaging",    icon: IconSocialMessaging },
  { name: "Campaign Planning",     icon: IconTarget },
  { name: "Content Creation",      icon: IconPencil },
  { name: "Performance Analytics", icon: IconBarChart3 },
  { name: "Customer Insights",     icon: IconUsers },
  { name: "Trend Analysis",        icon: IconTrendingUp },
];

const TOTAL_STEPS = 6;
const CURRENT_STEP = 6;

export default function DomainSelectionPage() {
  const { log } = useActivity();
  const { initDomain } = useDomainProgress();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    suggested: string;
    reason: string;
  } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setSuggestion(null);
    setSelected(null);
    setError(null);

    try {
      const res = await fetch("/api/onboarding/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: trimmed,
          type: "domain",
          department: DEPARTMENT,
        }),
      });

      const data = await res.json();
      const suggested = Array.isArray(data.suggested)
        ? data.suggested[0] ?? ""
        : data.suggested ?? "";

      setSuggestion({
        suggested,
        reason: data.reason ?? data.error ?? "Could not determine a suggestion.",
      });

      if (suggested) setSelected(suggested);
    } catch {
      setSuggestion({
        suggested: "",
        reason: "Connection error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleContinue(e: React.MouseEvent) {
    if (!selected) {
      e.preventDefault();
      setError("Please select a domain before continuing.");
    } else {
      // Initialize domain progress tracking
      const domainSlugMap: Record<string, string> = {
        "Social & Messaging": "social-messaging",
        "Campaign Planning": "campaign-planning",
        "Content Creation": "content-creation",
        "Performance Analytics": "performance-analytics",
        "Customer Insights": "customer-insights",
        "Trend Analysis": "trend-analysis",
      };
      const slug = domainSlugMap[selected] ?? selected.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-");
      initDomain("marketing", slug);

      log({
        icon: "domain",
        title: `${selected} domain added`,
        dept: "Marketing",
        context: "Domain activated with 6 agents",
      });
      log({
        icon: "agent",
        title: "6 agents deployed",
        dept: `Marketing · ${selected}`,
        context: "Foundation, Strategy, Execution, Monitoring, Growth, Innovation",
      });
    }
  }

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <Link href="/auth">
          <LogoMark />
        </Link>
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">
          SYS · OB · 006
        </span>
      </div>

      {/* Step progress bar — 100% filled */}
      <div className="relative z-10 h-px shrink-0 bg-primary" />

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="w-full max-w-[640px]">

          {/* System message */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 border border-primary flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 bg-primary" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                Vepartment
              </span>
              <div className="flex items-center gap-1 ml-1">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-px w-5 ${
                      i < CURRENT_STEP ? "bg-primary/60" : "bg-border"
                    }`}
                  />
                ))}
                <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em] ml-1">
                  {CURRENT_STEP} / {TOTAL_STEPS}
                </span>
              </div>
            </div>

            <h1 className="text-[1.5rem] sm:text-[1.875rem] font-medium text-foreground tracking-tight leading-[1.2] mb-4">
              What would you like your<br />{DEPARTMENT} department to focus on first?
            </h1>
            <p className="text-body-md text-foreground-muted leading-relaxed max-w-[460px]">
              You can describe a workflow or select one of the suggested domains below.
            </p>
          </div>

          {/* Chat input */}
          <div className="relative flex border border-border bg-surface focus-within:border-primary/60 transition-colors">
            <DomainGuide />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              disabled={isLoading}
              placeholder="Describe the workflow you want to run…"
              className="flex-1 h-14 bg-transparent px-5 text-sm text-foreground placeholder:text-foreground-dim focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 flex items-center justify-center border-l border-border hover:bg-surface-raised hover:text-primary transition-colors shrink-0 text-foreground-dim disabled:opacity-50"
            >
              {isLoading ? (
                <IconLoader className="h-4 w-4 animate-spin" />
              ) : (
                <IconArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* AI Suggestion */}
          {(suggestion || isLoading) && (
            <div className="border border-border border-t-0 bg-surface px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 border border-primary flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1 h-1 bg-primary" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary block mb-1.5">
                    Vepartment · Suggestion
                  </span>
                  {isLoading ? (
                    <p className="text-body-md text-foreground-dim">
                      Analyzing your workflow...
                    </p>
                  ) : suggestion ? (
                    <p className="text-body-md text-foreground-muted leading-relaxed">
                      {suggestion.reason}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <div className="mb-10" />

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[9px] text-foreground-dim tracking-[0.14em] uppercase">
              {suggestion ? "Select Domain" : "Available Domains"}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Domain cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {domains.map(({ name, icon: Icon }) => {
              const isSuggested = suggestion?.suggested.toLowerCase() === name.toLowerCase();
              const isSelected = selected === name;
              const isActive = name === "Social & Messaging";

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    if (!isActive) return;
                    setSelected(name);
                    setError(null);
                  }}
                  disabled={!isActive}
                  style={{
                    "--dept-hover-main":  `var(--dept-${DEPT_COLOR_VAR}-main)`,
                    "--dept-hover-light": `var(--dept-${DEPT_COLOR_VAR}-light)`,
                  } as React.CSSProperties}
                  className={cn(
                    "dept-card group relative flex flex-col items-center justify-center gap-3 py-6 px-3 border bg-surface transition-all",
                    isActive ? "cursor-pointer" : "cursor-not-allowed opacity-40",
                    isSelected
                      ? "border-[var(--dept-hover-main)] ring-1 ring-[var(--dept-hover-main)]/30"
                      : "border-border",
                    isActive && !isSelected && "hover:border-border/80"
                  )}
                >
                  <Icon
                    className={cn(
                      "dept-icon transition-colors",
                      isSelected
                        ? "text-[var(--dept-hover-main)]"
                        : "text-foreground-muted"
                    )}
                    size={24}
                    strokeWidth={1.5}
                  />
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-[0.1em] transition-colors text-center leading-tight",
                      isSelected
                        ? "text-[var(--dept-hover-main)]"
                        : "text-foreground-dim group-hover:text-foreground-muted"
                    )}
                  >
                    {name}
                  </span>

                  {/* SUGGESTED label — below the name */}
                  {isSuggested && (
                    <span
                      className="mt-1 px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.14em] font-semibold"
                      style={{
                        backgroundColor: `var(--dept-${DEPT_COLOR_VAR}-main)`,
                        color: "#0D0D0F",
                      }}
                    >
                      Suggested
                    </span>
                  )}

                  {/* LOCKED indicator */}
                  {!isActive && (
                    <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-foreground-dim mt-1">
                      Coming soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 mt-4">
              <IconAlertCircle size={14} strokeWidth={1.5} className="text-error shrink-0" />
              <span className="font-mono text-[10px] text-error tracking-[0.04em]">
                {error}
              </span>
            </div>
          )}

          {/* Continue button */}
          <div className="mt-8 flex justify-end">
            <Link
              href={selected ? "/onboarding/loading" : "#"}
              onClick={handleContinue}
              className={cn(
                "flex items-center gap-2 px-5 h-10 border font-mono text-[10px] uppercase tracking-[0.1em] transition-colors",
                selected
                  ? "border-primary text-primary hover:bg-primary/10"
                  : "border-border text-foreground-dim cursor-not-allowed"
              )}
            >
              Continue
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom annotation */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-10 border-t border-border shrink-0">
        <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em]">
          VEPARTMENT OS v1.0.0
        </span>
        <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em]">
          ENTERPRISE EDITION
        </span>
      </div>
    </div>
  );
}
