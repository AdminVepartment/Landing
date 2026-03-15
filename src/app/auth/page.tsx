import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthLandingGuide } from "./guide";

// ── Shared logo mark ─────────────────────────────────────────────────────────
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

export default function AuthLandingPage() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col">

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <LogoMark />
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">
          SYS · AUTH · 001
        </span>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-[440px]">

          {/* Headline block */}
          <div className="mb-10 pb-10 border-b border-border">
            <div className="mb-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                AI-Native OS · Virtual Departments
              </span>
            </div>
            <h1 className="text-[1.75rem] sm:text-[2.25rem] font-medium text-foreground leading-[1.15] tracking-tight mb-5">
              Your department<br />without walls.
            </h1>
            <p className="text-body-md text-foreground-muted leading-relaxed max-w-[360px]">
              Create modular AI-powered departments to run workflows, agents, and governance in one unified system.
            </p>
          </div>

          {/* Auth actions */}
          <div className="relative flex flex-col gap-2 mb-8">
            <AuthLandingGuide />
            <Link href="/auth/signin">
              <Button variant="solid" size="lg" className="w-full h-11">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="default" size="lg" className="w-full h-11">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-label-sm text-foreground-dim">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google SSO */}
          <Button variant="outline" size="lg" className="w-full h-11 mb-10 gap-2.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z" fill="hsl(240 4% 65%)"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2a4.8 4.8 0 01-7.17-2.52H.94v2.07A8 8 0 008 16z" fill="hsl(240 4% 55%)"/>
              <path d="M3.54 9.54A4.81 4.81 0 013.3 8c0-.53.09-1.05.24-1.54V4.39H.94A8 8 0 000 8c0 1.29.31 2.51.94 3.61l2.6-2.07z" fill="hsl(240 4% 50%)"/>
              <path d="M8 3.18a4.33 4.33 0 013.06 1.2l2.3-2.3A7.7 7.7 0 008 0 8 8 0 00.94 4.39l2.6 2.07A4.77 4.77 0 018 3.18z" fill="hsl(240 4% 45%)"/>
            </svg>
            Continue with Google
          </Button>

          {/* Footer */}
          <div className="flex items-center gap-4 pt-6 border-t border-border">
            <Link href="#" className="text-label-sm text-foreground-dim hover:text-foreground-muted transition-colors">
              Privacy Policy
            </Link>
            <span className="text-foreground-dim text-[10px]">·</span>
            <Link href="#" className="text-label-sm text-foreground-dim hover:text-foreground-muted transition-colors">
              Terms of Service
            </Link>
          </div>
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
