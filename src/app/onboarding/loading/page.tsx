"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconMarketing } from "@/components/icons";

// ── Constants ─────────────────────────────────────────────────────────────────

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const PHASES: { delay: number; phase: Phase }[] = [
  { delay: 100, phase: 1 },
  { delay: 600, phase: 2 },
  { delay: 1400, phase: 3 },
  { delay: 2100, phase: 4 },
  { delay: 3600, phase: 5 },
];

const W = (opacity: number) => `rgba(255,255,255,${opacity})`;

const LOG_LINES = [
  { label: "Workspace mounted", minPhase: 2 },
  { label: "Department created", minPhase: 3 },
  { label: "Agents initialized", minPhase: 4 },
  { label: "Workflows scheduled", minPhase: 5 },
] as const;

// ── Logo ──────────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-7 h-7 flex items-center justify-center shrink-0"
        style={{ border: `1px solid ${W(0.7)}` }}
      >
        <div className="w-2 h-2" style={{ backgroundColor: W(0.7) }} />
      </div>
      <span
        className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
        style={{ color: W(0.85) }}
      >
        Vepartment
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MarketingLoadingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>(0);

  // Hardcoded for now — Marketing is the only active department
  const deptName = "Marketing";
  const deptColorVar = "marketing";

  useEffect(() => {
    const timers = PHASES.map(({ delay, phase: p }) =>
      setTimeout(() => setPhase(p), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: `hsl(var(--dept-${deptColorVar}-dark))`,
      }}
    >
      {/* Top bar */}
      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 shrink-0"
        style={{ borderBottom: `1px solid ${W(0.12)}` }}
      >
        <Link href="/auth">
          <LogoMark />
        </Link>
        <span
          className="font-mono text-[10px] tracking-[0.1em]"
          style={{ color: W(0.4) }}
        >
          SYS &middot; BOOT &middot; 006
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="relative z-10 flex h-px shrink-0"
        style={{ backgroundColor: W(0.1) }}
      >
        <div
          className="h-full transition-[width] duration-[2200ms] ease-out"
          style={{
            width: phase >= 4 ? "100%" : "0%",
            backgroundColor: `hsl(var(--dept-${deptColorVar}-light))`,
          }}
        />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="w-full max-w-[480px] flex flex-col items-center text-center">
          {/* Icon */}
          <div
            className="transition-opacity duration-500 mb-10"
            style={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <IconMarketing
                size={56}
                strokeWidth={1.25}
                style={{ color: W(0.95) }}
              />
            </div>

            {/* Label under icon */}
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: W(0.6) }}
            >
              {deptName}
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
                color: `hsl(var(--dept-${deptColorVar}-light))`,
                borderColor: `hsl(var(--dept-${deptColorVar}-light))`,
              }}
            >
              {deptName}
            </span>
          </div>

          {/* Welcome message */}
          <div
            className="transition-opacity duration-700"
            style={{ opacity: phase >= 3 ? 1 : 0 }}
          >
            <h1
              className="text-[2rem] sm:text-[2.25rem] font-medium tracking-tight leading-[1.15] mb-4"
              style={{ color: W(1) }}
            >
              Your {deptName}
              <br />
              department is ready.
            </h1>
            <p
              className="text-[14px] leading-relaxed max-w-[360px] mx-auto"
              style={{ color: W(0.55) }}
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
              style={{
                backgroundColor: W(1),
                color: `hsl(var(--dept-${deptColorVar}-dark))`,
              }}
            >
              Enter workspace
            </button>
          </div>
        </div>
      </div>

      {/* Log lines + status — bottom panel */}
      <div
        className="relative z-10 shrink-0"
        style={{ borderTop: `1px solid ${W(0.1)}` }}
      >
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
                      backgroundColor: ready ? W(0.8) : W(0.18),
                    }}
                  />
                  <span
                    className="font-mono text-[9px] tracking-[0.08em] transition-colors duration-300"
                    style={{
                      color: ready ? W(0.7) : W(0.3),
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
              color: phase >= 5 ? W(0.7) : W(0.3),
            }}
          >
            {phase >= 5 ? "READY \u00b7 100%" : "INITIALIZING"}
          </span>
        </div>
      </div>

      {/* Bottom annotation */}
      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-10 shrink-0"
        style={{ borderTop: `1px solid ${W(0.08)}` }}
      >
        <span
          className="font-mono text-[9px] tracking-[0.08em]"
          style={{ color: W(0.3) }}
        >
          VEPARTMENT OS v1.0.0
        </span>
        <span
          className="font-mono text-[9px] tracking-[0.08em]"
          style={{ color: W(0.3) }}
        >
          ENTERPRISE EDITION
        </span>
      </div>
    </div>
  );
}
