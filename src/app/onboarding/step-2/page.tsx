"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconLoader,
  IconAlertCircle,
  IconMarketing,
  IconBranding,
  IconProduct,
  IconSales,
  IconSustainability,
  IconOperations,
  IconFinanceDept,
  IconHRTalent,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

// ── Logo ──────────────────────────────────────────────────────────────────────

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

// ── Types ─────────────────────────────────────────────────────────────────────

type VIcon = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string };

interface DeptDef {
  name: string;
  slug: string;
  icon: (p: VIcon) => React.ReactElement;
  colorVar: string;
  color: string;
  active: boolean;
}

interface DomainDef {
  name: string;
  slug: string;
  icon?: (p: VIcon) => React.ReactElement;
  active: boolean;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const DEPARTMENTS: DeptDef[] = [
  { name: "Marketing", slug: "marketing", icon: IconMarketing, colorVar: "marketing", color: "#4F46E5", active: true },
  { name: "Branding", slug: "branding", icon: IconBranding, colorVar: "branding", color: "#EA580C", active: false },
  { name: "Product", slug: "product", icon: IconProduct, colorVar: "product", color: "#0284C7", active: false },
  { name: "Sales", slug: "sales", icon: IconSales, colorVar: "sales", color: "#059669", active: false },
  { name: "Sustainability", slug: "sustainability", icon: IconSustainability, colorVar: "sustainability", color: "#0D9488", active: false },
  { name: "Operations", slug: "operations", icon: IconOperations, colorVar: "operations", color: "#52525B", active: false },
  { name: "Finance", slug: "finance", icon: IconFinanceDept, colorVar: "finance", color: "#B45309", active: false },
  { name: "HR / Talent", slug: "hr", icon: IconHRTalent, colorVar: "hr", color: "#A21CAF", active: false },
];

const MARKETING_DOMAINS: DomainDef[] = [
  { name: "Social & Messaging", slug: "social-messaging", icon: IconSocialMessaging, active: true },
  { name: "Campaign Planning", slug: "campaign-planning", active: false },
  { name: "Content Creation", slug: "content-creation", active: false },
  { name: "Performance Analytics", slug: "performance-analytics", active: false },
  { name: "Customer Insights", slug: "customer-insights", active: false },
  { name: "Trend Analysis", slug: "trend-analysis", active: false },
];

const N8N_WEBHOOK = "https://vepartment.app.n8n.cloud/webhook/50cd53b3-e5dc-40a6-a5c4-e6bde8c0ebab/chat";

// ── Page ──────────────────────────────────────────────────────────────────────

type Phase = "department" | "domain";

export default function OnboardingStep2() {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("department");

  // Chat
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Department
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Domain
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // State
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ── Chat submit → n8n ────────────────────────────────────────────
  async function handleChatSubmit() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setSuggestion(null);
    setError(null);

    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: crypto.randomUUID(),
          chatInput: trimmed,
        }),
      });

      if (!res.ok || !res.body) throw new Error("Failed");

      // Read streaming response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const t = line.trim();
          if (!t) continue;
          try {
            const p = JSON.parse(t);
            if (p.type === "item" && p.content) fullText += p.content;
          } catch { /* skip */ }
        }
      }

      setSuggestion(fullText || "I can help you choose the right department. Tell me more about your needs.");

      // Auto-select department from response
      const lower = (trimmed + " " + fullText).toLowerCase();
      if (lower.includes("market") || lower.includes("campaign") || lower.includes("social")) {
        setSelectedDept("Marketing");
      }
    } catch {
      setSuggestion("Connection error. Please try again or select a department below.");
    } finally {
      setIsLoading(false);
    }
  }

  // ── Continue to domain ───────────────────────────────────────────
  function handleContinueToDomain(e: React.MouseEvent) {
    e.preventDefault();
    if (!selectedDept) {
      setError("Please select a department before continuing.");
      return;
    }
    setPhase("domain");
    setError(null);
    setSuggestion(null);
    setInput("");
  }

  // ── Launch workspace ─────────────────────────────────────────────
  async function handleLaunch(e: React.MouseEvent) {
    e.preventDefault();
    if (!selectedDomain) {
      setError("Please select a domain before continuing.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/signin"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("workspace_id")
        .eq("id", user.id)
        .single();

      if (!profile?.workspace_id) { router.push("/onboarding/step-1"); return; }

      const dept = DEPARTMENTS.find((d) => d.name === selectedDept)!;

      // Create department
      const { data: createdDept, error: deptErr } = await supabase
        .from("departments")
        .insert({
          workspace_id: profile.workspace_id,
          name: dept.name,
          slug: dept.slug,
          color: dept.color,
          status: "active",
        })
        .select()
        .single();

      if (deptErr) { setError(deptErr.message); setSaving(false); return; }

      // Create domain
      const domain = MARKETING_DOMAINS.find((d) => d.name === selectedDomain)!;
      await supabase.from("domains").insert({
        department_id: createdDept.id,
        name: domain.name,
        slug: domain.slug,
        status: "active",
      });

      router.push("/onboarding/welcome");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────

  const TOTAL_STEPS = 2;
  const CURRENT_STEP = 2;

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <Link href="/"><LogoMark /></Link>
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">
          SYS · OB · {phase === "department" ? "005" : "006"}
        </span>
      </div>

      {/* Progress */}
      <div className="relative z-10 flex h-px shrink-0">
        <div className="bg-primary h-full transition-all" style={{ width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` }} />
        <div className="flex-1 bg-border-subtle" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="w-full max-w-[640px]">

          {/* ── DEPARTMENT PHASE ────────────────────────────────── */}
          {phase === "department" && (
            <>
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
                      <div key={i} className={`h-px w-5 ${i < CURRENT_STEP ? "bg-primary/60" : "bg-border"}`} />
                    ))}
                    <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em] ml-1">
                      {CURRENT_STEP} / {TOTAL_STEPS}
                    </span>
                  </div>
                </div>

                <h1 className="text-[1.5rem] sm:text-[1.875rem] font-medium text-foreground tracking-tight leading-[1.2] mb-4">
                  What department would you<br />like to create first?
                </h1>
                <p className="text-body-md text-foreground-muted leading-relaxed max-w-[460px]">
                  Describe your organization&apos;s needs and we&apos;ll suggest the right department — or pick one directly below.
                </p>
              </div>

              {/* Chat input */}
              <div className="relative flex border border-border bg-surface focus-within:border-primary/60 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleChatSubmit(); } }}
                  disabled={isLoading}
                  placeholder={'e.g. "We need to grow brand awareness and run campaigns…"'}
                  className="flex-1 h-14 bg-transparent px-5 text-sm text-foreground placeholder:text-foreground-dim focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={isLoading || !input.trim()}
                  className="w-14 h-14 flex items-center justify-center border-l border-border hover:bg-surface-raised hover:text-primary transition-colors shrink-0 text-foreground-dim disabled:opacity-50"
                >
                  {isLoading ? <IconLoader className="h-4 w-4 animate-spin" /> : <IconArrowRight className="h-4 w-4" />}
                </button>
              </div>

              {/* AI Suggestion */}
              {(suggestion || isLoading) && (
                <div className="border border-border border-t-0 bg-surface px-5 py-4 mb-10">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 border border-primary flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1 h-1 bg-primary" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary block mb-1.5">
                        Vepartment · Suggestion
                      </span>
                      {isLoading ? (
                        <p className="text-body-md text-foreground-dim">Analyzing your needs...</p>
                      ) : (
                        <p className="text-body-md text-foreground-muted leading-relaxed">{suggestion}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!suggestion && !isLoading && <div className="mb-10" />}

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono text-[9px] text-foreground-dim tracking-[0.14em] uppercase">
                  {suggestion ? "Select Department" : "All Departments"}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Department cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DEPARTMENTS.map(({ name, icon: Icon, colorVar, active }) => {
                  const isSuggested = suggestion && selectedDept === name;
                  const isSelected = selectedDept === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => { if (!active) return; setSelectedDept(name); setError(null); }}
                      disabled={!active}
                      style={{
                        "--dept-hover-main": `var(--dept-${colorVar}-main)`,
                        "--dept-hover-light": `var(--dept-${colorVar}-light)`,
                      } as React.CSSProperties}
                      className={cn(
                        "dept-card group relative flex flex-col items-center justify-center gap-3 py-6 px-3 border bg-surface transition-all",
                        active ? "cursor-pointer" : "cursor-not-allowed opacity-40",
                        isSelected
                          ? "border-[var(--dept-hover-main)] ring-1 ring-[var(--dept-hover-main)]/30"
                          : "border-border",
                        active && !isSelected && "hover:border-border/80"
                      )}
                    >
                      <Icon
                        className={cn("dept-icon transition-colors", isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-muted")}
                        size={28} strokeWidth={1.5}
                      />
                      <span className={cn(
                        "font-mono text-[9px] uppercase tracking-[0.1em] transition-colors text-center leading-tight",
                        isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-dim group-hover:text-foreground-muted"
                      )}>
                        {name}
                      </span>
                      {isSuggested && (
                        <span className="mt-1 px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.14em] font-semibold"
                          style={{ backgroundColor: `var(--dept-${colorVar}-main)`, color: "#0D0D0F" }}>
                          Suggested
                        </span>
                      )}
                      {!active && (
                        <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-foreground-dim mt-1">Coming soon</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 mt-4">
                  <IconAlertCircle size={14} strokeWidth={1.5} className="text-error shrink-0" />
                  <span className="font-mono text-[10px] text-error tracking-[0.04em]">{error}</span>
                </div>
              )}

              {/* Continue */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleContinueToDomain}
                  className={cn(
                    "flex items-center gap-2 px-5 h-10 border font-mono text-[10px] uppercase tracking-[0.1em] transition-colors",
                    selectedDept
                      ? "border-primary text-primary hover:bg-primary/10"
                      : "border-border text-foreground-dim cursor-not-allowed"
                  )}
                >
                  Continue
                  <IconArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          )}

          {/* ── DOMAIN PHASE ───────────────────────────────────── */}
          {phase === "domain" && (
            <>
              <div className="mb-10">
                <button onClick={() => { setPhase("department"); setError(null); }} className="inline-flex items-center gap-1.5 text-label-sm text-foreground-dim hover:text-foreground-muted transition-colors mb-6">
                  ← Back to departments
                </button>

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-5 h-5 border border-primary flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 bg-primary" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                    Vepartment · {selectedDept}
                  </span>
                </div>

                <h1 className="text-[1.5rem] sm:text-[1.875rem] font-medium text-foreground tracking-tight leading-[1.2] mb-4">
                  Which domain would you<br />like to activate first?
                </h1>
                <p className="text-body-md text-foreground-muted leading-relaxed max-w-[460px]">
                  Each domain is a focused area within your department. Start with one — you can add more later.
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono text-[9px] text-foreground-dim tracking-[0.14em] uppercase">
                  {selectedDept} Domains
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Domain cards — same style as department cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MARKETING_DOMAINS.map(({ name, slug, icon: Icon, active }) => {
                  const isSelected = selectedDomain === name;
                  const deptColorVar = DEPARTMENTS.find(d => d.name === selectedDept)?.colorVar || "marketing";

                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => { if (!active) return; setSelectedDomain(name); setError(null); }}
                      disabled={!active}
                      style={{
                        "--dept-hover-main": `var(--dept-${deptColorVar}-main)`,
                        "--dept-hover-light": `var(--dept-${deptColorVar}-light)`,
                      } as React.CSSProperties}
                      className={cn(
                        "dept-card group relative flex flex-col items-center justify-center gap-3 py-6 px-3 border bg-surface transition-all",
                        active ? "cursor-pointer" : "cursor-not-allowed opacity-40",
                        isSelected
                          ? "border-[var(--dept-hover-main)] ring-1 ring-[var(--dept-hover-main)]/30"
                          : "border-border",
                        active && !isSelected && "hover:border-border/80"
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn("dept-icon transition-colors", isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-muted")}
                          size={28} strokeWidth={1.5}
                        />
                      )}
                      <span className={cn(
                        "font-mono text-[9px] uppercase tracking-[0.1em] transition-colors text-center leading-tight",
                        isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-dim group-hover:text-foreground-muted"
                      )}>
                        {name}
                      </span>
                      {!active && (
                        <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-foreground-dim mt-1">Coming soon</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 mt-4">
                  <IconAlertCircle size={14} strokeWidth={1.5} className="text-error shrink-0" />
                  <span className="font-mono text-[10px] text-error tracking-[0.04em]">{error}</span>
                </div>
              )}

              {/* Launch */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleLaunch}
                  disabled={saving}
                  className={cn(
                    "flex items-center gap-2 px-5 h-10 border font-mono text-[10px] uppercase tracking-[0.1em] transition-colors",
                    selectedDomain
                      ? "border-primary text-primary hover:bg-primary/10"
                      : "border-border text-foreground-dim cursor-not-allowed"
                  )}
                >
                  {saving ? "Launching..." : "Launch Workspace"}
                  <IconArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-10 border-t border-border shrink-0">
        <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em]">VEPARTMENT OS v1.0.0</span>
        <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em]">ENTERPRISE EDITION</span>
      </div>
    </div>
  );
}
