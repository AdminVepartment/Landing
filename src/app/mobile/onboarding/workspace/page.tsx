import Link from "next/link";
import { StatusBar } from "../../_components/status-bar";
import { IconArrowLeft, IconChevronDown } from "@/components/icons";

const industries = [
  "Fashion", "Retail", "Technology", "Manufacturing",
  "Consulting", "Financial Services", "Healthcare", "Education", "Other",
];
const teamSizes = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];

const TOTAL_STEPS = 6;
const CURRENT_STEP = 4;

export default function MobileWorkspacePage() {
  return (
    <div className="flex flex-col flex-1 bg-background relative">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      <StatusBar />

      {/* Nav */}
      <div className="relative z-10 flex items-center px-5 h-12 shrink-0">
        <Link href="/mobile/auth/signup" className="flex items-center justify-center w-9 h-9 -ml-1">
          <IconArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </Link>
        {/* Step dots */}
        <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-[3px] w-5 ${i < CURRENT_STEP ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] text-foreground-dim ml-auto">
          {CURRENT_STEP}/{TOTAL_STEPS}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pt-6 overflow-y-auto pb-4">
        <div className="mb-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground-dim">
            Workspace Setup
          </span>
        </div>
        <h1 className="text-[1.625rem] font-medium text-foreground tracking-tight leading-[1.2] mb-3">
          Create your<br />workspace.
        </h1>
        <p className="text-[13px] text-foreground-muted leading-relaxed mb-8">
          Your workspace is where departments, agents, and workflows operate.
        </p>

        <div className="flex flex-col gap-5">
          {/* Workspace Name */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
              Workspace Name
            </label>
            <input
              type="text"
              placeholder="Acme Workspace"
              className="h-14 bg-surface border border-border px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary/60"
            />
          </div>

          {/* Organization Name */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
              Organization Name
            </label>
            <input
              type="text"
              placeholder="Acme Corporation"
              className="h-14 bg-surface border border-border px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary/60"
            />
          </div>

          {/* Industry */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
              Industry
            </label>
            <div className="relative">
              <select
                className="w-full h-14 bg-surface border border-border px-4 pr-10 text-[15px] text-foreground-muted appearance-none cursor-pointer focus:outline-none focus:border-primary/60"
                style={{ colorScheme: "dark" }}
                defaultValue=""
              >
                <option value="" disabled>Select industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-dim">
                <IconChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Team Size */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
                Team Size
              </label>
              <span className="font-mono text-[9px] text-foreground-dim border border-border px-1.5 py-px">OPTIONAL</span>
            </div>
            <div className="relative">
              <select
                className="w-full h-14 bg-surface border border-border px-4 pr-10 text-[15px] text-foreground-muted appearance-none cursor-pointer focus:outline-none focus:border-primary/60"
                style={{ colorScheme: "dark" }}
                defaultValue=""
              >
                <option value="" disabled>Select size</option>
                {teamSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-dim">
                <IconChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-6 pb-10 shrink-0">
        <Link
          href="/mobile/onboarding/department"
          className="flex items-center justify-center h-14 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.12em] font-semibold"
        >
          Create Workspace
        </Link>
        <div className="flex justify-center mt-4">
          <div className="w-[134px] h-[5px] bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
