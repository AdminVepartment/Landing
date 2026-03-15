"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "../../../_components/status-bar";
import {
  IconMarketing,
  IconBranding,
  IconSustainability,
  IconSales,
} from "@/components/icons";
import type { SVGProps } from "react";

type VIcon = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string };

const DEPT_ICONS: Record<string, (props: VIcon) => React.ReactElement> = {
  marketing:      IconMarketing,
  branding:       IconBranding,
  sustainability: IconSustainability,
  sales:          IconSales,
};

export interface DeptConfig {
  name: string;
  colorVar: string;
}

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const PHASES: { delay: number; phase: Phase }[] = [
  { delay: 100,  phase: 1 },
  { delay: 600,  phase: 2 },
  { delay: 1400, phase: 3 },
  { delay: 2100, phase: 4 },
  { delay: 3600, phase: 5 },
];

const W = (opacity: number) => `rgba(255,255,255,${opacity})`;

const LOG_LINES = [
  { label: "Workspace mounted",   minPhase: 2 },
  { label: "Department created",  minPhase: 3 },
  { label: "Agents initialized",  minPhase: 4 },
  { label: "Workflows scheduled", minPhase: 5 },
] as const;

export function DeptLoadingScreen({ dept }: { dept: DeptConfig }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    const timers = PHASES.map(({ delay, phase: p }) =>
      setTimeout(() => setPhase(p), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const onDeptBg = phase >= 2;
  const DeptIcon = DEPT_ICONS[dept.colorVar];

  return (
    <div
      className="flex flex-col flex-1 relative overflow-hidden transition-[background-color] duration-700 ease-in-out"
      style={{
        backgroundColor: onDeptBg
          ? `hsl(var(--dept-${dept.colorVar}-dark))`
          : "hsl(var(--background))",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none bg-grid transition-opacity duration-700"
        style={{ opacity: onDeptBg ? 0.1 : 0.4 }}
      />

      <StatusBar />

      {/* Center content */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-8">

        {/* Icon cross-fade: Vepartment logomark → dept icon */}
        <div
          className="flex flex-col items-center gap-5 transition-opacity duration-500"
          style={{ opacity: phase >= 1 ? 1 : 0 }}
        >
          <div className="relative w-16 h-16">
            {/* Vepartment logomark */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
              style={{ opacity: onDeptBg ? 0 : 1 }}
            >
              <div className="w-14 h-14 border-2 border-primary flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-primary" />
              </div>
            </div>

            {/* Department icon */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
              style={{ opacity: onDeptBg ? 1 : 0 }}
            >
              <DeptIcon size={48} strokeWidth={1.25} style={{ color: W(0.95) }} />
            </div>
          </div>

          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-700"
            style={{ color: onDeptBg ? W(0.85) : "hsl(var(--foreground))" }}
          >
            {onDeptBg ? dept.name : "Vepartment"}
          </span>
        </div>

        {/* Dept badge */}
        <div
          className="mt-4 transition-opacity duration-500"
          style={{ opacity: phase >= 2 ? 1 : 0 }}
        >
          <span
            className="font-mono text-[9px] uppercase tracking-[0.14em] px-3 py-1 border"
            style={{
              color: `hsl(var(--dept-${dept.colorVar}-light))`,
              borderColor: `hsl(var(--dept-${dept.colorVar}-light))`,
            }}
          >
            {dept.name}
          </span>
        </div>

        {/* Welcome message */}
        <div
          className="mt-12 text-center transition-opacity duration-700"
          style={{ opacity: phase >= 3 ? 1 : 0 }}
        >
          <h1
            className="text-[1.625rem] font-medium tracking-tight leading-[1.2] mb-3 transition-colors duration-700"
            style={{ color: onDeptBg ? W(1) : "hsl(var(--foreground))" }}
          >
            Your {dept.name}<br />department is ready.
          </h1>
          <p
            className="text-[13px] leading-relaxed transition-colors duration-700"
            style={{ color: onDeptBg ? W(0.6) : "hsl(var(--foreground-muted))" }}
          >
            Agents and workflows are being initialized.
          </p>
        </div>

        {/* Enter CTA */}
        <div
          className="mt-10 transition-opacity duration-500"
          style={{ opacity: phase >= 5 ? 1 : 0 }}
        >
          <button
            type="button"
            onClick={() => router.push("/mobile/dashboard")}
            className="flex items-center justify-center px-8 h-12 font-mono text-[11px] uppercase tracking-[0.12em] font-semibold"
            style={
              onDeptBg
                ? { backgroundColor: W(1), color: `hsl(var(--dept-${dept.colorVar}-dark))` }
                : { backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }
            }
          >
            Enter workspace
          </button>
        </div>
      </div>

      {/* Loading bar + log lines */}
      <div className="relative z-10 px-8 shrink-0 pb-4">

        <div
          className="h-px w-full overflow-hidden"
          style={{ backgroundColor: onDeptBg ? W(0.15) : "hsl(var(--border))" }}
        >
          <div
            className="h-full transition-[width] duration-[2200ms] ease-out"
            style={{
              width: phase >= 4 ? "100%" : "0%",
              backgroundColor: onDeptBg
                ? `hsl(var(--dept-${dept.colorVar}-light))`
                : "hsl(var(--primary))",
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <span
            className="font-mono text-[9px] tracking-[0.1em]"
            style={{ color: onDeptBg ? W(0.45) : "hsl(var(--foreground-dim))" }}
          >
            {phase >= 5 ? "READY" : "INITIALIZING"}
          </span>
          <span
            className="font-mono text-[9px] tracking-[0.1em]"
            style={{
              color: phase >= 4
                ? onDeptBg ? W(0.85) : "hsl(var(--primary))"
                : onDeptBg ? W(0.3) : "hsl(var(--foreground-dim))",
            }}
          >
            {phase >= 5 ? "100%" : "—"}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          {LOG_LINES.map(({ label, minPhase }) => {
            const ready = phase >= minPhase;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: ready
                      ? onDeptBg ? W(0.9) : "hsl(var(--primary))"
                      : onDeptBg ? W(0.2) : "hsl(var(--border))",
                  }}
                />
                <span
                  className="font-mono text-[9px] tracking-[0.08em] transition-colors duration-300"
                  style={{
                    color: ready
                      ? onDeptBg ? W(0.85) : "hsl(var(--foreground))"
                      : onDeptBg ? W(0.35) : "hsl(var(--foreground-dim))",
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <div
            className="w-[134px] h-[5px] rounded-full"
            style={{ backgroundColor: onDeptBg ? W(0.2) : "rgba(240,240,242,0.2)" }}
          />
        </div>
      </div>
    </div>
  );
}
