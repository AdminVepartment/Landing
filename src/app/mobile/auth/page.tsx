import Link from "next/link";
import { StatusBar } from "../_components/status-bar";

export default function MobileAuthPage() {
  return (
    <div className="flex flex-col flex-1 bg-background relative">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      <StatusBar />

      {/* Logo zone */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pb-4">
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="w-10 h-10 border border-primary flex items-center justify-center">
            <div className="w-3 h-3 bg-primary" />
          </div>
          <span className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-foreground">
            Vepartment
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-3">
          <h1 className="text-[1.75rem] font-medium text-foreground tracking-tight leading-[1.15] mb-4">
            Your AI-native<br />virtual department<br />OS.
          </h1>
          <p className="text-[13px] text-foreground-muted leading-relaxed max-w-[280px] mx-auto">
            Build departments, run workflows, and deploy AI agents — all from one operating layer.
          </p>
        </div>
      </div>

      {/* Bottom CTA zone */}
      <div className="relative z-10 px-6 pb-10 flex flex-col gap-3 shrink-0">
        {/* System code */}
        <div className="flex items-center justify-center mb-2">
          <span className="font-mono text-[9px] text-foreground-dim tracking-[0.12em]">
            SYS · AUTH · 001
          </span>
        </div>

        <Link
          href="/mobile/auth/signup"
          className="flex items-center justify-center h-14 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[0.12em] font-semibold"
        >
          Create Account
        </Link>

        <Link
          href="/mobile/auth/signin"
          className="flex items-center justify-center h-14 border border-border text-foreground font-mono text-[11px] uppercase tracking-[0.12em]"
        >
          Sign In
        </Link>

        {/* Home indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-[134px] h-[5px] bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
