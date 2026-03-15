"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconArrowLeft } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

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

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  async function handleGoogleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <Link href="/">
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
              href="/"
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

          {/* Error */}
          {error && (
            <div className="mb-5 border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="relative flex flex-col gap-5 mb-8">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                Email Address
              </label>
              <Input
                id="email" type="email" placeholder="you@company.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="font-mono text-[10px] text-foreground-dim hover:text-foreground transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password" type="password" placeholder="Enter your password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
              />
            </div>
          </div>

          {/* CTA */}
          <Button variant="solid" size="lg" className="w-full h-11 mb-8" onClick={handleSignIn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-label-sm text-foreground-dim">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google SSO */}
          <Button variant="outline" size="lg" className="w-full h-11 gap-2.5 mb-8" onClick={handleGoogleSignIn}>
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
              <Link href="/auth/signup" className="text-foreground hover:text-primary transition-colors">Create Account →</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-10 border-t border-border shrink-0">
        <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em]">VEPARTMENT OS v1.0.0</span>
        <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em]">ENTERPRISE EDITION</span>
      </div>
    </div>
  );
}
