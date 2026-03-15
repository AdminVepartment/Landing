import Link from "next/link";
import { StatusBar } from "../../_components/status-bar";
import { IconArrowLeft } from "@/components/icons";

export default function MobileSignUpPage() {
  return (
    <div className="flex flex-col flex-1 bg-background relative">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      <StatusBar />

      {/* Nav bar */}
      <div className="relative z-10 flex items-center px-5 h-12 shrink-0">
        <Link href="/mobile/auth" className="flex items-center justify-center w-9 h-9 -ml-1">
          <IconArrowLeft className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-dim absolute left-1/2 -translate-x-1/2">
          New Account
        </span>
      </div>

      {/* Content — scrollable */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pt-6 overflow-y-auto pb-4">
        <div className="mb-8">
          <h1 className="text-[1.625rem] font-medium text-foreground tracking-tight leading-[1.2] mb-2">
            Create your<br />workspace.
          </h1>
          <p className="text-[13px] text-foreground-muted">
            Start building AI-powered departments.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="h-14 bg-surface border border-border px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary/60"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="h-14 bg-surface border border-border px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary/60"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
              Password
            </label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="h-14 bg-surface border border-border px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary/60"
            />
          </div>

          {/* Company — optional */}
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-[9px] text-foreground-dim tracking-[0.1em] uppercase">Organization</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
                  Company Name
                </label>
                <span className="font-mono text-[9px] text-foreground-dim border border-border px-1.5 py-px tracking-[0.06em]">
                  OPTIONAL
                </span>
              </div>
              <input
                type="text"
                placeholder="Your organization"
                className="h-14 bg-surface border border-border px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary/60"
              />
              <p className="font-mono text-[10px] text-foreground-dim">Used to name your first workspace</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="text-[12px] text-foreground-dim mt-6 leading-relaxed">
          By creating an account you agree to the{" "}
          <Link href="#" className="text-foreground-muted">Terms of Service</Link>
          {" "}and{" "}
          <Link href="#" className="text-foreground-muted">Privacy Policy</Link>.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-6 pb-10 shrink-0">
        <Link
          href="/mobile/onboarding/workspace"
          className="flex items-center justify-center h-14 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.12em] font-semibold"
        >
          Create Account
        </Link>
        <div className="flex justify-center mt-4">
          <div className="w-[134px] h-[5px] bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
