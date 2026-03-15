import Link from "next/link";
import { StatusBar } from "../../_components/status-bar";
import { IconArrowLeft } from "@/components/icons";

export default function MobileSignInPage() {
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
          Sign In
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 px-6 pt-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-[1.625rem] font-medium text-foreground tracking-tight leading-[1.2] mb-2">
            Welcome back.
          </h1>
          <p className="text-[13px] text-foreground-muted">
            Sign in to your Vepartment workspace.
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-4 mb-6">
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
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-foreground-dim">
                Password
              </label>
              <Link href="#" className="font-mono text-[10px] text-primary tracking-[0.06em]">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Your password"
              className="h-14 bg-surface border border-border px-4 text-[15px] text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary/60"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[10px] text-foreground-dim">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google SSO */}
        <button
          type="button"
          className="flex items-center justify-center gap-3 h-14 border border-border bg-surface text-foreground-muted font-mono text-[11px] tracking-[0.08em] mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z" fill="hsl(240 4% 65%)"/>
            <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2a4.8 4.8 0 01-7.17-2.52H.94v2.07A8 8 0 008 16z" fill="hsl(240 4% 55%)"/>
            <path d="M3.54 9.54A4.81 4.81 0 013.3 8c0-.53.09-1.05.24-1.54V4.39H.94A8 8 0 000 8c0 1.29.31 2.51.94 3.61l2.6-2.07z" fill="hsl(240 4% 50%)"/>
            <path d="M8 3.18a4.33 4.33 0 013.06 1.2l2.3-2.3A7.7 7.7 0 008 0 8 8 0 00.94 4.39l2.6 2.07A4.77 4.77 0 018 3.18z" fill="hsl(240 4% 45%)"/>
          </svg>
          Continue with Google
        </button>

        {/* Sign up link */}
        <p className="text-[13px] text-foreground-muted text-center">
          No account?{" "}
          <Link href="/mobile/auth/signup" className="text-foreground">
            Create one →
          </Link>
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-6 pb-10 shrink-0">
        <Link
          href="/mobile/onboarding/workspace"
          className="flex items-center justify-center h-14 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.12em] font-semibold"
        >
          Sign In
        </Link>
        <div className="flex justify-center mt-4">
          <div className="w-[134px] h-[5px] bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
