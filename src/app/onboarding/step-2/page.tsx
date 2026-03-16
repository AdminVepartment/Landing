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

const DEPARTMENTS: { name: string; slug: string; icon: (p: VIcon) => React.ReactElement; colorVar: string; color: string; desc: string }[] = [
  { name: "Branding", slug: "branding", icon: IconBranding, colorVar: "branding", color: "#EA580C", desc: "Identity, guidelines, visual assets" },
  { name: "Marketing", slug: "marketing", icon: IconMarketing, colorVar: "marketing", color: "#4F46E5", desc: "Campaigns, content, analytics" },
  { name: "Sustainability", slug: "sustainability", icon: IconSustainability, colorVar: "sustainability", color: "#0D9488", desc: "ESG reporting, impact tracking" },
  { name: "Sales", slug: "sales", icon: IconSales, colorVar: "sales", color: "#059669", desc: "Pipeline, outreach, conversion" },
  { name: "Product", slug: "product", icon: IconProduct, colorVar: "product", color: "#0284C7", desc: "Features, roadmap, development" },
  { name: "Operations", slug: "operations", icon: IconOperations, colorVar: "operations", color: "#52525B", desc: "Processes, workflows, coordination" },
  { name: "Finance", slug: "finance", icon: IconFinanceDept, colorVar: "finance", color: "#B45309", desc: "Budgets, reporting, compliance" },
  { name: "HR / Talent", slug: "hr", icon: IconHRTalent, colorVar: "hr", color: "#A21CAF", desc: "Hiring, culture, people ops" },
];

export default function OnboardingStep2() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleDept(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setError("");
  }

  async function handleFinish() {
    if (selected.length === 0) {
      setError("Select at least one department.");
      return;
    }

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

      const departments = selected.map((slug) => {
        const dept = DEPARTMENTS.find((d) => d.slug === slug)!;
        return {
          workspace_id: profile.workspace_id,
          name: dept.name,
          slug: dept.slug,
          color: dept.color,
          status: "active",
        };
      });

      const { error: insertError } = await supabase
        .from("departments")
        .insert(departments);

      if (insertError) { setError(insertError.message); setLoading(false); return; }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

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
        <div className="bg-primary h-full w-full" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-[640px]">

          <div className="mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Onboarding</span>
            <h1 className="text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-2 mb-4">
              Choose your departments.
            </h1>
            <p className="text-base text-foreground-muted leading-relaxed">
              Select the departments you want to activate. You can add more later.
            </p>
          </div>

          {error && (
            <div className="mb-5 border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>
          )}

          {/* Department grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {DEPARTMENTS.map(({ name, slug, icon: Icon, colorVar, color, desc }) => {
              const isSelected = selected.includes(slug);
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
                    className={cn(
                      "dept-icon transition-colors",
                      isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-muted"
                    )}
                    size={28}
                    strokeWidth={1.5}
                  />
                  <div>
                    <span className={cn(
                      "font-mono text-[9px] uppercase tracking-[0.1em] transition-colors block",
                      isSelected ? "text-[var(--dept-hover-main)]" : "text-foreground-dim"
                    )}>
                      {name}
                    </span>
                    <span className="text-[9px] text-foreground-dim mt-1 block leading-tight">{desc}</span>
                  </div>

                  {/* Checkmark */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center" style={{ backgroundColor: color }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected count */}
          {selected.length > 0 && (
            <p className="text-xs font-mono text-foreground-muted mb-5">
              {selected.length} department{selected.length > 1 ? "s" : ""} selected
            </p>
          )}

          <Button variant="solid" size="lg" className="w-full h-11" onClick={handleFinish} disabled={loading}>
            {loading ? "Creating departments..." : "Launch Workspace"}
          </Button>

          {/* Skip for now */}
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 w-full text-center text-xs font-mono text-foreground-dim hover:text-foreground-muted transition-colors py-2"
          >
            Skip for now — I&apos;ll add departments later
          </button>
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
