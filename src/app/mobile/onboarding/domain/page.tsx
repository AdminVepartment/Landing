import Link from "next/link";
import { StatusBar } from "../../_components/status-bar";
import { IconArrowLeft, IconArrowRight, IconTarget, IconPencil, IconBarChart3, IconUsers, IconTrendingUp } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

type VIcon = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string };
interface DomainItem { name: string; icon: ComponentType<VIcon> }

const DEPARTMENT = "Marketing";
const DEPT_COLOR_VAR = "marketing";

const domains: DomainItem[] = [
  { name: "Campaign Planning",     icon: IconTarget },
  { name: "Content Creation",      icon: IconPencil },
  { name: "Performance Analytics", icon: IconBarChart3 },
  { name: "Customer Insights",     icon: IconUsers },
  { name: "Trend Analysis",        icon: IconTrendingUp },
];

const TOTAL_STEPS = 6;
const CURRENT_STEP = 6;

export default function MobileDomainPage() {
  return (
    <div className="flex flex-col flex-1 bg-background relative">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      <StatusBar />

      {/* Nav */}
      <div className="relative z-10 flex items-center px-5 h-12 shrink-0">
        <Link href="/mobile/onboarding/department" className="flex items-center justify-center w-9 h-9 -ml-1">
          <IconArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </Link>
        {/* Full progress */}
        <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className="h-[3px] w-5 bg-primary/60" />
          ))}
        </div>
        <span className="font-mono text-[10px] text-foreground-dim ml-auto">{CURRENT_STEP}/{TOTAL_STEPS}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-6 pt-6 flex-1 overflow-y-auto pb-4">
        {/* AI indicator */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-4 h-4 border border-primary flex items-center justify-center shrink-0">
            <div className="w-1 h-1 bg-primary" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Vepartment</span>
        </div>

        <h1 className="text-[1.5rem] font-medium text-foreground tracking-tight leading-[1.2] mb-3">
          What should your {DEPARTMENT} department focus on first?
        </h1>
        <p className="text-[13px] text-foreground-muted leading-relaxed mb-6">
          Describe a workflow or select a suggested domain.
        </p>

        {/* Chat input */}
        <div className="flex border border-border bg-surface focus-within:border-primary/60 transition-colors mb-6">
          <input
            type="text"
            placeholder="Describe the workflow you want to run…"
            className="flex-1 h-14 bg-transparent px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none"
          />
          <Link
            href="/mobile/onboarding/welcome"
            className="w-14 h-14 flex items-center justify-center border-l border-border text-foreground-dim shrink-0"
          >
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[9px] text-foreground-dim tracking-[0.14em] uppercase">Suggested Domains</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Domain cards — 2×3 grid (5 items, last row has 1 or 2) */}
        <div className="grid grid-cols-2 gap-2">
          {domains.map(({ name, icon: Icon }) => (
            <button
              key={name}
              type="button"
              style={{
                "--dept-hover-main":  `var(--dept-${DEPT_COLOR_VAR}-main)`,
                "--dept-hover-light": `var(--dept-${DEPT_COLOR_VAR}-light)`,
              } as React.CSSProperties}
              className="dept-card group flex flex-col items-center justify-center gap-3 py-7 px-3 border border-border bg-surface transition-colors"
            >
              <Icon className="dept-icon text-foreground-muted transition-colors" size={24} strokeWidth={1.5} />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-dim group-hover:text-foreground-muted transition-colors text-center leading-tight">
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="relative z-10 flex justify-center pb-8 pt-4 shrink-0">
        <div className="w-[134px] h-[5px] bg-foreground/20 rounded-full" />
      </div>
    </div>
  );
}
