import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconCheck, IconPlus, IconArrowRight } from "@/components/icons";
import { WelcomeGuide } from "./guide";

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

const setupSummary = [
  { label: "Acme Workspace" },
  { label: "Marketing Dept." },
  { label: "Campaign Planning" },
];

// Placeholder collaborators already in workspace (just the owner)
const USER_INITIAL = "A";

export default function WorkspaceWelcomePage() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <LogoMark />
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">
          SYS · WS · 001
        </span>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[480px] flex flex-col items-center text-center">

          {/* ── Section 1 — Welcome message ───────────────────────────── */}
          <div className="mb-12">
            {/* Setup complete tags */}
            <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
              {setupSummary.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 border border-border px-2.5 py-1"
                >
                  <IconCheck className="h-2.5 w-2.5 text-primary shrink-0" strokeWidth={2} />
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-dim">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <h1 className="text-[1.75rem] sm:text-[2.25rem] font-medium text-foreground tracking-tight leading-[1.15] mb-5">
              Welcome to your<br />virtual department.
            </h1>
            <p className="text-body-md text-foreground-muted leading-relaxed max-w-[360px] mx-auto">
              Invite your team to collaborate and start building departments, workflows, and agents together.
            </p>
          </div>

          {/* ── Section 2 — Team invitation ───────────────────────────── */}
          <div className="w-full border border-border bg-surface p-4 sm:p-6 mb-10">
            {/* Avatar row */}
            <div className="flex items-center justify-center gap-2 mb-5">
              {/* Current user avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-primary flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs font-semibold text-primary-foreground">
                    {USER_INITIAL}
                  </span>
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-primary border-2 border-surface" />
              </div>

              {/* Invite slot — active */}
              <button
                type="button"
                className="w-10 h-10 border border-dashed border-border flex items-center justify-center text-foreground-dim hover:border-primary/60 hover:text-primary transition-colors"
              >
                <IconPlus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>

              {/* Empty invite slots */}
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 border border-dashed border-border-subtle"
                />
              ))}
            </div>

            {/* Invite CTA row */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-label-sm text-foreground-dim">
                Invite teammates to join your workspace.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 border border-border bg-background px-4 h-8 text-xs font-mono tracking-[0.08em] text-foreground-muted hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <IconPlus className="h-3 w-3" strokeWidth={1.5} />
                Add teammate
              </button>
            </div>
          </div>

          {/* ── Section 3 — Primary action ────────────────────────────── */}
          <div className="relative mb-2">
            <WelcomeGuide />
          </div>
          <Button variant="solid" size="lg" className="h-11 px-10 gap-2" asChild>
            <Link href="/dashboard">
              Let&apos;s start
              <IconArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Button>

          {/* Skip link */}
          <Link
            href="/dashboard"
            className="mt-4 font-mono text-[10px] text-foreground-dim tracking-[0.08em] hover:text-foreground-muted transition-colors"
          >
            Skip for now
          </Link>
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
