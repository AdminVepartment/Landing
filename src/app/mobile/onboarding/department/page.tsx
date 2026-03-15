import Link from "next/link";
import { StatusBar } from "../../_components/status-bar";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import {
  IconMarketing, IconBranding, IconProduct, IconSales,
  IconSustainability, IconOperations, IconFinanceDept, IconHRTalent,
} from "@/components/icons";
import type { SVGProps } from "react";

type VIcon = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string };
interface DeptItem { name: string; icon: (p: VIcon) => React.ReactElement; colorVar: string }

const departments: DeptItem[] = [
  { name: "Marketing",      icon: IconMarketing,      colorVar: "marketing" },
  { name: "Branding",       icon: IconBranding,       colorVar: "branding" },
  { name: "Product",        icon: IconProduct,        colorVar: "product" },
  { name: "Sales",          icon: IconSales,          colorVar: "sales" },
  { name: "Sustainability", icon: IconSustainability, colorVar: "sustainability" },
  { name: "Operations",     icon: IconOperations,     colorVar: "operations" },
  { name: "Finance",        icon: IconFinanceDept,    colorVar: "finance" },
  { name: "HR / Talent",    icon: IconHRTalent,       colorVar: "hr" },
];

const TOTAL_STEPS = 6;
const CURRENT_STEP = 5;

export default function MobileDepartmentPage() {
  return (
    <div className="flex flex-col flex-1 bg-background relative">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      <StatusBar />

      {/* Nav */}
      <div className="relative z-10 flex items-center px-5 h-12 shrink-0">
        <Link href="/mobile/onboarding/workspace" className="flex items-center justify-center w-9 h-9 -ml-1">
          <IconArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </Link>
        <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`h-[3px] w-5 ${i < CURRENT_STEP ? "bg-primary" : "bg-border"}`} />
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
          What department would you like to create first?
        </h1>
        <p className="text-[13px] text-foreground-muted leading-relaxed mb-5">
          Describe your organization&apos;s needs and we&apos;ll suggest the right department.
        </p>

        {/* Chat input */}
        <div className="flex border border-border bg-surface focus-within:border-primary/60 transition-colors">
          <input
            type="text"
            placeholder={'e.g. "We need to grow brand awareness…"'}
            className="flex-1 h-14 bg-transparent px-4 text-[14px] text-foreground placeholder:text-foreground-dim focus:outline-none"
          />
          <button
            type="button"
            className="w-14 h-14 flex items-center justify-center border-l border-border text-foreground-dim shrink-0"
          >
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* System suggestion */}
        <div className="border border-border border-t-0 bg-surface px-4 py-3.5 mb-5">
          <div className="flex items-start gap-2.5">
            <div className="w-3.5 h-3.5 border border-primary flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-1 h-1 bg-primary" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary block mb-1">
                Vepartment · Suggestion
              </span>
              <p className="text-[12px] text-foreground-muted leading-relaxed">
                A <span className="text-foreground font-medium">Marketing</span> department fits best — covers campaigns, analytics, and customer acquisition.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[9px] text-foreground-dim tracking-[0.14em] uppercase">Suggested Departments</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Department grid — 2×4 */}
        <div className="grid grid-cols-2 gap-2">
          {departments.map(({ name, icon: Icon, colorVar }) => (
            <Link
              key={name}
              href="/mobile/onboarding/domain"
              style={{
                "--dept-hover-main":  `var(--dept-${colorVar}-main)`,
                "--dept-hover-light": `var(--dept-${colorVar}-light)`,
              } as React.CSSProperties}
              className="dept-card group flex flex-col items-center justify-center gap-3 py-7 px-3 border border-border bg-surface transition-colors"
            >
              <Icon className="dept-icon text-foreground-muted transition-colors" size={28} strokeWidth={1.5} />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-dim group-hover:text-foreground-muted transition-colors text-center leading-tight">
                {name}
              </span>
            </Link>
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
