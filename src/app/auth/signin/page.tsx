"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconArrowLeft } from "@/components/icons";
import { SignInGuide } from "./guide";
import { useActivity } from "@/lib/activity-store";

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

function FormField({
  label,
  id,
  type,
  placeholder,
  hint,
  rightLabel,
  rightHref,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  hint?: string;
  rightLabel?: string;
  rightHref?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim"
        >
          {label}
        </label>
        {rightLabel && rightHref && (
          <Link
            href={rightHref}
            className="font-mono text-[10px] text-foreground-dim hover:text-foreground transition-colors"
          >
            {rightLabel}
          </Link>
        )}
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
      />
      {hint && (
        <p className="text-[10px] font-mono text-foreground-dim">{hint}</p>
      )}
    </div>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const { log } = useActivity();

  function handleSignIn() {
    log({ icon: "account", title: "User signed in", dept: "System", context: "Session started" });
    router.push("/dashboard");
  }

  return (
    <div className="relative min-h-screen bg-background flex flex-col">

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <Link href="/auth">
          <LogoMark />
        </Link>
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">
          SYS · AUTH · 002
        </span>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-[440px]">

          {/* Back + heading */}
          <div className="mb-8 pb-8 border-b border-border">
            <Link
              href="/auth"
              className="inline-flex items-center gap-1.5 text-label-sm text-foreground-dim hover:text-foreground-muted transition-colors mb-6"
            >
              <IconArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              Back
            </Link>
            <div className="mb-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground-dim">
                Returning User
              </span>
            </div>
            <h1 className="text-[1.5rem] sm:text-[1.875rem] font-medium text-foreground tracking-tight mb-3">
              Sign in to your<br />workspace.
            </h1>
            <p className="text-body-md text-foreground-muted leading-relaxed">
              Access your workspace and manage your virtual departments.
            </p>
          </div>

          {/* Form */}
          <div className="relative flex flex-col gap-5 mb-8">
            <SignInGuide />
            <FormField
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@company.com"
            />
            <FormField
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              rightLabel="Forgot password?"
              rightHref="#"
            />
          </div>

          {/* CTA */}
          <Button variant="solid" size="lg" className="w-full h-11 mb-8" onClick={handleSignIn}>
            Sign In
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-label-sm text-foreground-dim">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google SSO */}
          <Button variant="outline" size="lg" className="w-full h-11 gap-2.5 mb-8">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z" fill="hsl(240 4% 65%)"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2a4.8 4.8 0 01-7.17-2.52H.94v2.07A8 8 0 008 16z" fill="hsl(240 4% 55%)"/>
              <path d="M3.54 9.54A4.81 4.81 0 013.3 8c0-.53.09-1.05.24-1.54V4.39H.94A8 8 0 000 8c0 1.29.31 2.51.94 3.61l2.6-2.07z" fill="hsl(240 4% 50%)"/>
              <path d="M8 3.18a4.33 4.33 0 013.06 1.2l2.3-2.3A7.7 7.7 0 008 0 8 8 0 00.94 4.39l2.6 2.07A4.77 4.77 0 018 3.18z" fill="hsl(240 4% 45%)"/>
            </svg>
            Continue with Google
          </Button>

          {/* Sign up link */}
          <div className="pt-6 border-t border-border">
            <p className="text-body-sm text-foreground-muted">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-foreground hover:text-primary transition-colors">
                Create Account →
              </Link>
            </p>
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
