"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

function LogoMark({ light }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-7 h-7 flex items-center justify-center shrink-0 transition-colors duration-700"
        style={{ border: `1px solid ${light ? W(0.7) : "hsl(var(--primary))"}` }}
      >
        <div
          className="w-2 h-2 transition-colors duration-700"
          style={{ backgroundColor: light ? W(0.7) : "hsl(var(--primary))" }}
        />
      </div>
      <span
        className="font-mono text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-700"
        style={{ color: light ? W(0.85) : "hsl(var(--foreground))" }}
      >
        Vepartment
      </span>
    </div>
  );
}

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
      className="relative min-h-screen flex flex-col transition-[background-color] duration-700 ease-in-out"
      style={{
        backgroundColor: onDeptBg
          ? `hsl(var(--dept-${dept.colorVar}-dark))`
          : "hsl(var(--background))",
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-grid transition-opacity duration-700"
        style={{ opacity: onDeptBg ? 0.1 : 0.5 }}
      />

      {/* Top bar */}
      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 shrink-0 transition-colors duration-700"
        style={{ borderBottom: `1px solid ${onDeptBg ? W(0.12) : "hsl(var(--border))"}` }}
      >
        <Link href="/auth">
          <LogoMark light={onDeptBg} />
        </Link>
        <span
          className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-700"
          style={{ color: onDeptBg ? W(0.4) : "hsl(var(--foreground-dim))" }}
        >
          SYS · BOOT · 006
        </span>
      </div>

      {/* Progress bar — fills to dept-light color */}
      <div
        className="relative z-10 flex h-px shrink-0"
        style={{ backgroundColor: onDeptBg ? W(0.1) : "hsl(var(--border-subtle))" }}
      >
        <div
          className="h-full transition-[width,background-color] duration-[2200ms] ease-out"
          style={{
            width: phase >= 4 ? "100%" : "0%",
            backgroundColor: onDeptBg
              ? `hsl(var(--dept-${dept.colorVar}-light))`
              : "hsl(var(--primary))",
          }}
        />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="w-full max-w-[480px] flex flex-col items-center text-center">

          {/* Icon cross-fade */}
          <div
            className="transition-opacity duration-500 mb-10"
            style={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              {/* Vepartment logomark */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{ opacity: onDeptBg ? 0 : 1 }}
              >
                <div className="w-16 h-16 border-2 border-primary flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary" />
                </div>
              </div>

              {/* Dept icon */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{ opacity: onDeptBg ? 1 : 0 }}
              >
                {DeptIcon && (
                  <DeptIcon size={56} strokeWidth={1.25} style={{ color: W(0.95) }} />
                )}
              </div>
            </div>

            {/* Label under icon */}
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-700"
              style={{ color: onDeptBg ? W(0.6) : "hsl(var(--foreground-dim))" }}
            >
              {onDeptBg ? dept.name : "Vepartment"}
            </span>
          </div>

          {/* Dept badge */}
          <div
            className="mb-6 transition-opacity duration-500"
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
            className="transition-opacity duration-700"
            style={{ opacity: phase >= 3 ? 1 : 0 }}
          >
            <h1
              className="text-[2rem] sm:text-[2.25rem] font-medium tracking-tight leading-[1.15] mb-4 transition-colors duration-700"
              style={{ color: onDeptBg ? W(1) : "hsl(var(--foreground))" }}
            >
              Your {dept.name}<br />department is ready.
            </h1>
            <p
              className="text-[14px] leading-relaxed max-w-[360px] mx-auto transition-colors duration-700"
              style={{ color: onDeptBg ? W(0.55) : "hsl(var(--foreground-muted))" }}
            >
              Agents and workflows are being initialized for your team.
            </p>
          </div>

          {/* Enter CTA */}
          <div
            className="mt-10 transition-opacity duration-500"
            style={{ opacity: phase >= 5 ? 1 : 0 }}
          >
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center px-10 h-12 font-mono text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors duration-300"
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
      </div>

      {/* Log lines + status — bottom panel */}
      <div
        className="relative z-10 shrink-0 transition-colors duration-700"
        style={{ borderTop: `1px solid ${onDeptBg ? W(0.1) : "hsl(var(--border))"}` }}
      >
        {/* Progress track */}
        <div className="relative h-px w-full overflow-hidden" />

        <div className="flex items-center justify-between px-4 sm:px-8 h-10">
          {/* Log lines inline */}
          <div className="flex items-center gap-6">
            {LOG_LINES.map(({ label, minPhase }) => {
              const ready = phase >= minPhase;
              return (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className="w-1 h-1 shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: ready
                        ? onDeptBg ? W(0.8) : "hsl(var(--primary))"
                        : onDeptBg ? W(0.18) : "hsl(var(--border))",
                    }}
                  />
                  <span
                    className="font-mono text-[9px] tracking-[0.08em] transition-colors duration-300"
                    style={{
                      color: ready
                        ? onDeptBg ? W(0.7) : "hsl(var(--foreground-muted))"
                        : onDeptBg ? W(0.3) : "hsl(var(--foreground-dim))",
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Status */}
          <span
            className="font-mono text-[9px] tracking-[0.1em] transition-colors duration-300"
            style={{
              color: phase >= 5
                ? onDeptBg ? W(0.7) : "hsl(var(--primary))"
                : onDeptBg ? W(0.3) : "hsl(var(--foreground-dim))",
            }}
          >
            {phase >= 5 ? "READY · 100%" : "INITIALIZING"}
          </span>
        </div>
      </div>

      {/* Bottom annotation */}
      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-10 shrink-0 transition-colors duration-700"
        style={{ borderTop: `1px solid ${onDeptBg ? W(0.08) : "hsl(var(--border))"}` }}
      >
        <span
          className="font-mono text-[9px] tracking-[0.08em] transition-colors duration-700"
          style={{ color: onDeptBg ? W(0.3) : "hsl(var(--foreground-dim))" }}
        >
          VEPARTMENT OS v1.0.0
        </span>
        <span
          className="font-mono text-[9px] tracking-[0.08em] transition-colors duration-700"
          style={{ color: onDeptBg ? W(0.3) : "hsl(var(--foreground-dim))" }}
        >
          ENTERPRISE EDITION
        </span>
      </div>
    </div>
  );
}
