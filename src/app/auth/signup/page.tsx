"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setError("");

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company: company || undefined,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding/step-1");
  }

  async function handleGoogleSignUp() {
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
          SYS · AUTH · 003
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
                New Account
              </span>
            </div>
            <h1 className="text-[1.5rem] sm:text-[1.875rem] font-medium text-foreground tracking-tight mb-3">
              Create your<br />workspace.
            </h1>
            <p className="text-body-md text-foreground-muted leading-relaxed">
              Create your Vepartment workspace and start building AI-powered departments.
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
              <label htmlFor="name" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                Full Name
              </label>
              <Input
                id="name" type="text" placeholder="Your full name"
                value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                Email Address
              </label>
              <Input
                id="email" type="email" placeholder="you@company.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                  Password
                </label>
                <Input
                  id="password" type="password" placeholder="Min. 8 characters"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-password" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                  Confirm Password
                </label>
                <Input
                  id="confirm-password" type="password" placeholder="Repeat password"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
                />
              </div>
            </div>

            <div className="pt-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono text-[9px] text-foreground-dim tracking-[0.1em] uppercase">Organization</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <label htmlFor="company" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                    Company Name
                  </label>
                  <span className="font-mono text-[9px] text-foreground-dim border border-border px-1.5 py-px tracking-[0.06em]">OPTIONAL</span>
                </div>
                <Input
                  id="company" type="text" placeholder="Your organization"
                  value={company} onChange={(e) => setCompany(e.target.value)}
                  className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
                />
                <p className="text-[10px] font-mono text-foreground-dim">Used to name your first workspace</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <p className="text-label-sm text-foreground-dim mb-5 leading-relaxed">
            By creating an account you agree to the{" "}
            <Link href="/terms" className="text-foreground-muted hover:text-foreground transition-colors">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-foreground-muted hover:text-foreground transition-colors">Privacy Policy</Link>.
          </p>

          {/* CTA */}
          <Button variant="solid" size="lg" className="w-full h-11 mb-8" onClick={handleSignUp} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-label-sm text-foreground-dim">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google SSO */}
          <Button variant="outline" size="lg" className="w-full h-11 gap-2.5 mb-8" onClick={handleGoogleSignUp}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z" fill="hsl(240 4% 65%)"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2a4.8 4.8 0 01-7.17-2.52H.94v2.07A8 8 0 008 16z" fill="hsl(240 4% 55%)"/>
              <path d="M3.54 9.54A4.81 4.81 0 013.3 8c0-.53.09-1.05.24-1.54V4.39H.94A8 8 0 000 8c0 1.29.31 2.51.94 3.61l2.6-2.07z" fill="hsl(240 4% 50%)"/>
              <path d="M8 3.18a4.33 4.33 0 013.06 1.2l2.3-2.3A7.7 7.7 0 008 0 8 8 0 00.94 4.39l2.6 2.07A4.77 4.77 0 018 3.18z" fill="hsl(240 4% 45%)"/>
            </svg>
            Continue with Google
          </Button>

          {/* Sign in link */}
          <div className="pt-6 border-t border-border">
            <p className="text-body-sm text-foreground-muted">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-foreground hover:text-primary transition-colors">Sign In →</Link>
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
