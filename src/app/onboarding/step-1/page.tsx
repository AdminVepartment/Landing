"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function OnboardingStep1() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleContinue() {
    if (!workspaceName.trim()) {
      setError("Give your workspace a name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/signin"); return; }

      const slug = workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

      // Check if user already has a workspace
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("workspace_id")
        .eq("id", user.id)
        .single();

      if (existingProfile?.workspace_id) {
        router.push("/onboarding/step-2");
        return;
      }

      const { data: workspace, error: wsError } = await supabase
        .from("workspaces")
        .insert({ name: workspaceName, slug, owner_id: user.id })
        .select()
        .single();

      if (wsError) { setError(wsError.message); setLoading(false); return; }

      await supabase
        .from("profiles")
        .update({ workspace_id: workspace.id, role: "owner" })
        .eq("id", user.id);

      await supabase
        .from("workspace_settings")
        .insert({ workspace_id: workspace.id, settings: { description } });

      router.push("/onboarding/step-2");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <Link href="/"><LogoMark /></Link>
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">STEP 1 OF 2</span>
      </div>

      {/* Progress */}
      <div className="relative z-10 flex h-0.5 shrink-0">
        <div className="bg-primary h-full w-1/2" />
        <div className="flex-1 bg-border-subtle" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-[480px]">

          <div className="mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Onboarding</span>
            <h1 className="text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-2 mb-4">
              Tell us about your organization.
            </h1>
            <p className="text-base text-foreground-muted leading-relaxed">
              We&apos;ll set up your workspace and help you choose the right departments.
            </p>
          </div>

          {error && (
            <div className="mb-5 border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>
          )}

          <div className="flex flex-col gap-6 mb-10">
            {/* Workspace name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ws-name" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                Workspace Name
              </label>
              <Input
                id="ws-name" type="text" placeholder="e.g. Acme, My Company, Studio X"
                value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)}
                className="rounded-none bg-surface border-border h-11 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
              />
              <p className="text-[10px] font-mono text-foreground-dim">This is how your workspace appears to your team.</p>
            </div>

            {/* What do you need */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="desc" className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim">
                What do you need help with?
              </label>
              <textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. We need to manage our brand identity, run marketing campaigns, and track sustainability goals..."
                rows={4}
                className="w-full bg-surface border border-border px-3 py-3 text-sm text-foreground placeholder:text-foreground-dim focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
              />
              <p className="text-[10px] font-mono text-foreground-dim">This helps us suggest the right departments for you.</p>
            </div>
          </div>

          <Button variant="solid" size="lg" className="w-full h-11" onClick={handleContinue} disabled={loading}>
            {loading ? "Setting up..." : "Continue"}
          </Button>
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
