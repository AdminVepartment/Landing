import Link from "next/link";
import { StatusBar } from "../../_components/status-bar";
import { IconCheck, IconPlus, IconArrowRight } from "@/components/icons";

const setupSummary = [
  { label: "Acme Workspace" },
  { label: "Marketing Dept." },
  { label: "Campaign Planning" },
];

const USER_INITIAL = "A";

export default function MobileWelcomePage() {
  return (
    <div className="flex flex-col flex-1 bg-background relative">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      <StatusBar />

      {/* Top bar — logo + code */}
      <div className="relative z-10 flex items-center justify-between px-5 h-12 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-primary flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-primary" />
          </div>
          <span className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-foreground">
            Vepartment
          </span>
        </div>
        <span className="font-mono text-[9px] text-foreground-dim tracking-[0.1em]">
          SYS · WS · 001
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pt-8 overflow-y-auto pb-4">
        {/* Setup summary chips */}
        <div className="flex flex-wrap gap-2 mb-7">
          {setupSummary.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 border border-border px-2.5 py-1.5"
            >
              <IconCheck className="h-2.5 w-2.5 text-primary shrink-0" strokeWidth={2} />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-dim">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Welcome headline */}
        <h1 className="text-[1.625rem] font-medium text-foreground tracking-tight leading-[1.15] mb-4">
          Welcome to your<br />virtual department.
        </h1>
        <p className="text-[13px] text-foreground-muted leading-relaxed mb-8">
          Invite your team to collaborate and start building departments, workflows, and agents together.
        </p>

        {/* Team invitation card */}
        <div className="border border-border bg-surface p-5 mb-8">
          {/* Avatar row */}
          <div className="flex items-center gap-2.5 mb-5">
            {/* Current user */}
            <div className="relative">
              <div className="w-12 h-12 bg-primary flex items-center justify-center shrink-0">
                <span className="font-mono text-sm font-semibold text-primary-foreground">
                  {USER_INITIAL}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary border-2 border-surface" />
            </div>

            {/* Active invite slot */}
            <button
              type="button"
              className="w-12 h-12 border border-dashed border-border flex items-center justify-center text-foreground-dim"
            >
              <IconPlus className="h-4 w-4" strokeWidth={1.5} />
            </button>

            {/* Ghost slots */}
            {[1, 2].map((i) => (
              <div key={i} className="w-12 h-12 border border-dashed border-border-subtle" />
            ))}
          </div>

          {/* Invite CTA */}
          <p className="text-[13px] text-foreground-dim mb-3">
            Invite teammates to join your workspace.
          </p>
          <button
            type="button"
            className="flex items-center gap-2 border border-border bg-background px-4 h-10 font-mono text-[10px] tracking-[0.08em] text-foreground-muted"
          >
            <IconPlus className="h-3 w-3" strokeWidth={1.5} />
            Add teammate
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-6 pb-10 flex flex-col gap-3 shrink-0">
        <Link
          href="/mobile/onboarding/loading"
          className="flex items-center justify-center gap-2 h-14 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.12em] font-semibold"
        >
          Let&apos;s start
          <IconArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
        <Link
          href="/mobile/onboarding/loading"
          className="text-center font-mono text-[10px] text-foreground-dim tracking-[0.08em] py-2"
        >
          Skip for now
        </Link>
        <div className="flex justify-center mt-2">
          <div className="w-[134px] h-[5px] bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
