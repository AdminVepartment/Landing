"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  IconMarketing,
  IconBranding,
  IconProduct,
  IconSales,
  IconSustainability,
  IconOperations,
  IconFinanceDept,
  IconHRTalent,
  IconArrowRight,
  IconCheck,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { SVGProps } from "react";

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

type VIcon = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string };

interface DeptDef {
  name: string;
  slug: string;
  icon: (p: VIcon) => React.ReactElement;
  colorVar: string;
  color: string;
  desc: string;
  domains: { name: string; slug: string }[];
}

const DEPARTMENTS: DeptDef[] = [
  {
    name: "Branding", slug: "branding", icon: IconBranding, colorVar: "branding", color: "#EA580C",
    desc: "Identity, guidelines, visual assets",
    domains: [
      { name: "Brand Identity", slug: "brand-identity" },
      { name: "Visual Assets", slug: "visual-assets" },
      { name: "Brand Guidelines", slug: "brand-guidelines" },
      { name: "Brand Strategy", slug: "brand-strategy" },
    ],
  },
  {
    name: "Marketing", slug: "marketing", icon: IconMarketing, colorVar: "marketing", color: "#4F46E5",
    desc: "Campaigns, content, analytics",
    domains: [
      { name: "Social & Messaging", slug: "social-messaging" },
      { name: "Campaign Planning", slug: "campaign-planning" },
      { name: "Content Creation", slug: "content-creation" },
      { name: "Performance Analytics", slug: "performance-analytics" },
      { name: "Customer Insights", slug: "customer-insights" },
    ],
  },
  {
    name: "Sustainability", slug: "sustainability", icon: IconSustainability, colorVar: "sustainability", color: "#0D9488",
    desc: "ESG reporting, impact tracking",
    domains: [
      { name: "ESG Reporting", slug: "esg-reporting" },
      { name: "Impact Measurement", slug: "impact-measurement" },
      { name: "Compliance", slug: "compliance" },
      { name: "Supply Chain", slug: "supply-chain" },
    ],
  },
  {
    name: "Sales", slug: "sales", icon: IconSales, colorVar: "sales", color: "#059669",
    desc: "Pipeline, outreach, conversion",
    domains: [
      { name: "Lead Generation", slug: "lead-generation" },
      { name: "Pipeline Management", slug: "pipeline-management" },
      { name: "Outreach", slug: "outreach" },
      { name: "Sales Analytics", slug: "sales-analytics" },
    ],
  },
  {
    name: "Product", slug: "product", icon: IconProduct, colorVar: "product", color: "#0284C7",
    desc: "Features, roadmap, development",
    domains: [
      { name: "Product Strategy", slug: "product-strategy" },
      { name: "Feature Development", slug: "feature-development" },
      { name: "User Research", slug: "user-research" },
      { name: "Roadmap", slug: "roadmap" },
    ],
  },
  {
    name: "Operations", slug: "operations", icon: IconOperations, colorVar: "operations", color: "#52525B",
    desc: "Processes, workflows, coordination",
    domains: [
      { name: "Process Optimization", slug: "process-optimization" },
      { name: "Workflow Automation", slug: "workflow-automation" },
      { name: "Resource Management", slug: "resource-management" },
    ],
  },
  {
    name: "Finance", slug: "finance", icon: IconFinanceDept, colorVar: "finance", color: "#B45309",
    desc: "Budgets, reporting, compliance",
    domains: [
      { name: "Financial Reporting", slug: "financial-reporting" },
      { name: "Budget Planning", slug: "budget-planning" },
      { name: "Expense Management", slug: "expense-management" },
    ],
  },
  {
    name: "HR / Talent", slug: "hr", icon: IconHRTalent, colorVar: "hr", color: "#A21CAF",
    desc: "Hiring, culture, people ops",
    domains: [
      { name: "Recruitment", slug: "recruitment" },
      { name: "Onboarding", slug: "employee-onboarding" },
      { name: "Culture & Engagement", slug: "culture-engagement" },
    ],
  },
];

// ── Phase: departments → domains → launch ─────────────────────────────────

type Phase = "departments" | "domains";

export default function OnboardingStep2() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("departments");
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Record<string, string[]>>({});
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleDept(slug: string) {
    setSelectedDepts((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      // Init domain selections for new depts
      if (!prev.includes(slug)) {
        setSelectedDomains((d) => ({ ...d, [slug]: [] }));
      }
      return next;
    });
    setError("");
  }

  function toggleDomain(deptSlug: string, domainSlug: string) {
    setSelectedDomains((prev) => {
      const current = prev[deptSlug] || [];
      return {
        ...prev,
        [deptSlug]: current.includes(domainSlug)
          ? current.filter((s) => s !== domainSlug)
          : [...current, domainSlug],
      };
    });
  }

  function handleChatSubmit() {
    if (!chatInput.trim()) return;
    // Auto-select departments based on keywords
    const lower = chatInput.toLowerCase();
    const autoSelect: string[] = [];
    if (lower.includes("brand")) autoSelect.push("branding");
    if (lower.includes("market") || lower.includes("campaign") || lower.includes("content")) autoSelect.push("marketing");
    if (lower.includes("sustain") || lower.includes("esg") || lower.includes("impact")) autoSelect.push("sustainability");
    if (lower.includes("sale") || lower.includes("pipeline") || lower.includes("lead")) autoSelect.push("sales");
    if (lower.includes("product") || lower.includes("feature") || lower.includes("roadmap")) autoSelect.push("product");
    if (lower.includes("operation") || lower.includes("process") || lower.includes("workflow")) autoSelect.push("operations");
    if (lower.includes("financ") || lower.includes("budget")) autoSelect.push("finance");
    if (lower.includes("hr") || lower.includes("hiring") || lower.includes("talent")) autoSelect.push("hr");

    if (autoSelect.length > 0) {
      setSelectedDepts((prev) => [...new Set([...prev, ...autoSelect])]);
      autoSelect.forEach((slug) => {
        setSelectedDomains((d) => ({ ...d, [slug]: d[slug] || [] }));
      });
    }
    setChatInput("");
  }

  function handleContinueToDomains() {
    if (selectedDepts.length === 0) {
      setError("Select at least one department.");
      return;
    }
    setPhase("domains");
    setError("");
  }

  async function handleLaunch() {
    setLoading(true);
    setError("");

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

      // Create departments
      const deptInserts = selectedDepts.map((slug) => {
        const dept = DEPARTMENTS.find((d) => d.slug === slug)!;
        return { workspace_id: profile.workspace_id, name: dept.name, slug, color: dept.color, status: "active" };
      });

      const { data: createdDepts, error: deptError } = await supabase
        .from("departments")
        .insert(deptInserts)
        .select();

      if (deptError) { setError(deptError.message); setLoading(false); return; }

      // Create domains for each department
      const domainInserts: { department_id: string; name: string; slug: string; status: string }[] = [];
      for (const dept of createdDepts || []) {
        const deptDef = DEPARTMENTS.find((d) => d.slug === dept.slug);
        const selectedForDept = selectedDomains[dept.slug] || [];
        if (deptDef) {
          const domainsToCreate = selectedForDept.length > 0
            ? deptDef.domains.filter((d) => selectedForDept.includes(d.slug))
            : deptDef.domains; // If none selected, create all
          domainsToCreate.forEach((domain) => {
            domainInserts.push({
              department_id: dept.id,
              name: domain.name,
              slug: domain.slug,
              status: "active",
            });
          });
        }
      }

      if (domainInserts.length > 0) {
        await supabase.from("domains").insert(domainInserts);
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const activeDepts = selectedDepts.map((slug) => DEPARTMENTS.find((d) => d.slug === slug)!).filter(Boolean);

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <Link href="/"><LogoMark /></Link>
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">STEP 2 OF 2</span>
      </div>

      {/* Progress */}
      <div className="relative z-10 flex h-0.5 shrink-0">
        <div className="bg-primary h-full" style={{ width: phase === "departments" ? "60%" : "100%" }} />
        <div className="flex-1 bg-border-subtle" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-10">
        <div className="w-full max-w-[640px] mx-auto">

          {/* ── PHASE 1: Departments ──────────────────────────────── */}
          {phase === "departments" && (
            <>
              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Departments</span>
                <h1 className="text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-2 mb-4">
                  What departments do you need?
                </h1>
                <p className="text-base text-foreground-muted leading-relaxed">
                  Describe your needs or select directly below.
                </p>
              </div>

              {/* Chat bar */}
              <div className="flex border border-border bg-surface focus-within:border-primary/60 transition-colors mb-8">
                <span className="pl-4 pr-2 flex items-center text-primary font-mono text-sm select-none">&gt;</span>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleChatSubmit(); } }}
                  placeholder="e.g. I need branding and marketing for my fashion brand..."
                  className="flex-1 h-12 bg-transparent text-sm text-foreground font-mono placeholder:text-foreground-dim focus:outline-none pr-4"
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={!chatInput.trim()}
                  className="w-12 h-12 flex items-center justify-center border-l border-border text-foreground-dim hover:text-primary transition-colors disabled:opacity-40"
                >
                  <IconArrowRight size={16} />
                </button>
              </div>

              {error && (
                <div className="mb-5 border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>
              )}

              {/* Department grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {DEPARTMENTS.map(({ name, slug, icon: Icon, colorVar, color, desc }) => {
                  const isSelected = selectedDepts.includes(slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => toggleDept(slug)}
                      style={{
                        "--dept-hover-main": `var(--dept-${colorVar}-main)`,
                        "--dept-hover-light": `var(--dept-${colorVar}-light)`,
                      } as React.CSSProperties}
                      className={cn(
                        "dept-card group relative flex flex-col items-center gap-3 py-6 px-3 border bg-surface transition-all text-center",
                        isSelected
                          ? "border-[var(--dept-hover-main)] ring-1 ring-[var(--dept-hover-main)]/30"
                          : "border-border hover:border-border/80"
                      )}
                    >
                      <Icon
                        className={cn("dept-icon transition-colors", isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-muted")}
                        size={28} strokeWidth={1.5}
                      />
                      <div>
                        <span className={cn("font-mono text-[9px] uppercase tracking-[0.1em] transition-colors block", isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-dim")}>
                          {name}
                        </span>
                        <span className="text-[9px] text-foreground-dim mt-1 block leading-tight">{desc}</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center" style={{ backgroundColor: color }}>
                          <IconCheck size={10} className="text-background" strokeWidth={2} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedDepts.length > 0 && (
                <p className="text-xs font-mono text-foreground-muted mb-6">
                  {selectedDepts.length} department{selectedDepts.length > 1 ? "s" : ""} selected
                </p>
              )}

              <Button variant="solid" size="lg" className="w-full h-11" onClick={handleContinueToDomains}>
                Continue — Select Domains
              </Button>
            </>
          )}

          {/* ── PHASE 2: Domains ──────────────────────────────────── */}
          {phase === "domains" && (
            <>
              <div className="mb-8">
                <button onClick={() => setPhase("departments")} className="text-xs font-mono text-foreground-dim hover:text-foreground transition-colors mb-4 block">
                  ← Back to departments
                </button>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Domains</span>
                <h1 className="text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-2 mb-4">
                  Choose what each department works on.
                </h1>
                <p className="text-base text-foreground-muted leading-relaxed">
                  Select the domains you want active. Leave empty to activate all.
                </p>
              </div>

              {error && (
                <div className="mb-5 border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>
              )}

              {/* Domain selection per department */}
              <div className="flex flex-col gap-6 mb-10">
                {activeDepts.map((dept) => {
                  const domainsForDept = selectedDomains[dept.slug] || [];
                  return (
                    <div key={dept.slug} className="border border-border bg-surface">
                      {/* Dept header */}
                      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                        <div className="w-3 h-3" style={{ backgroundColor: dept.color }} />
                        <span className="text-sm font-medium text-foreground">{dept.name}</span>
                        <span className="text-[10px] font-mono text-foreground-dim ml-auto">
                          {domainsForDept.length === 0 ? "All domains" : `${domainsForDept.length} selected`}
                        </span>
                      </div>
                      {/* Domain list */}
                      <div className="divide-y divide-border-subtle">
                        {dept.domains.map((domain) => {
                          const isActive = domainsForDept.includes(domain.slug);
                          return (
                            <button
                              key={domain.slug}
                              onClick={() => toggleDomain(dept.slug, domain.slug)}
                              className={cn(
                                "w-full flex items-center gap-3 px-5 py-3 text-left transition-colors",
                                isActive ? "bg-primary/5" : "hover:bg-surface-raised/50"
                              )}
                            >
                              <div className={cn(
                                "w-4 h-4 border flex items-center justify-center shrink-0 transition-colors",
                                isActive ? "border-primary bg-primary" : "border-border"
                              )}>
                                {isActive && <IconCheck size={10} className="text-background" strokeWidth={2} />}
                              </div>
                              <span className={cn(
                                "text-sm transition-colors",
                                isActive ? "text-foreground" : "text-foreground-muted"
                              )}>
                                {domain.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button variant="solid" size="lg" className="w-full h-11" onClick={handleLaunch} disabled={loading}>
                {loading ? "Launching workspace..." : "Launch Workspace"}
              </Button>

              <button
                onClick={() => { handleLaunch(); }}
                className="mt-3 w-full text-center text-xs font-mono text-foreground-dim hover:text-foreground-muted transition-colors py-2 hidden"
              >
                Skip domains — activate all
              </button>
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
