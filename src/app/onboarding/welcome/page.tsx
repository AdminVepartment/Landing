"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconCheck, IconPlus, IconArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

// ── Logo ──────────────────────────────────────────────────────────────────────

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

// ── Types ─────────────────────────────────────────────────────────────────────

interface SetupTag {
  label: string;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WorkspaceWelcomePage() {
  const [setupTags, setSetupTags] = useState<SetupTag[]>([]);
  const [userInitial, setUserInitial] = useState("U");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSetupData() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // Get profile with workspace
        const { data: profile } = await supabase
          .from("profiles")
          .select("workspace_id, full_name, email")
          .eq("id", user.id)
          .single();

        // Set user initial from profile name or email
        const name = profile?.full_name || user.email || "U";
        setUserInitial(name.charAt(0).toUpperCase());

        if (!profile?.workspace_id) {
          setLoading(false);
          return;
        }

        // Get workspace name
        const { data: workspace } = await supabase
          .from("workspaces")
          .select("name")
          .eq("id", profile.workspace_id)
          .single();

        // Get most recent department for this workspace
        const { data: department } = await supabase
          .from("departments")
          .select("id, name")
          .eq("workspace_id", profile.workspace_id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        // Get most recent domain for this department
        let domainName = "";
        if (department?.id) {
          const { data: domain } = await supabase
            .from("domains")
            .select("name")
            .eq("department_id", department.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          domainName = domain?.name || "";
        }

        const tags: SetupTag[] = [];
        if (workspace?.name) tags.push({ label: workspace.name });
        if (department?.name) tags.push({ label: `${department.name} Dept.` });
        if (domainName) tags.push({ label: domainName });

        setSetupTags(
          tags.length > 0
            ? tags
            : [
                { label: "Workspace" },
                { label: "Department" },
                { label: "Domain" },
              ]
        );
      } catch {
        // Fallback tags if fetch fails
        setSetupTags([
          { label: "Workspace" },
          { label: "Department" },
          { label: "Domain" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchSetupData();
  }, []);

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none bg-grid" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-border shrink-0">
        <LogoMark />
        <span className="font-mono text-[10px] text-foreground-dim tracking-[0.1em]">
          SYS &middot; WS &middot; 001
        </span>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[480px] flex flex-col items-center text-center">
          {/* ── Section 1 — Welcome message ───────────────────────────── */}
          <div className="mb-12">
            {/* Setup complete tags */}
            <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 border border-border px-2.5 py-1"
                    >
                      <div className="w-14 h-3 bg-surface-raised animate-pulse" />
                    </div>
                  ))
                : setupTags.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 border border-border px-2.5 py-1"
                    >
                      <IconCheck
                        className="h-2.5 w-2.5 text-primary shrink-0"
                        strokeWidth={2}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-foreground-dim">
                        {item.label}
                      </span>
                    </div>
                  ))}
            </div>

            <h1 className="text-[1.75rem] sm:text-[2.25rem] font-medium text-foreground tracking-tight leading-[1.15] mb-5">
              Welcome to your
              <br />
              virtual department.
            </h1>
            <p className="text-body-md text-foreground-muted leading-relaxed max-w-[360px] mx-auto">
              Invite your team to collaborate and start building departments,
              workflows, and agents together.
            </p>
          </div>

          {/* ── Section 2 — Team invitation ───────────────────────────── */}
          <div className="w-full border border-border bg-surface p-4 sm:p-6 mb-10">
            {/* Avatar row */}
            <div className="flex items-center justify-center gap-2 mb-5">
              {/* Current user avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-primary flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs font-semibold text-primary-foreground">
                    {userInitial}
                  </span>
                </div>
                {/* Online dot */}
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-primary border-2 border-surface" />
              </div>

              {/* Invite slot — active */}
              <button
                type="button"
                className="w-10 h-10 border border-dashed border-border flex items-center justify-center text-foreground-dim hover:border-primary/60 hover:text-primary transition-colors"
              >
                <IconPlus className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>

              {/* Empty invite slots */}
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 border border-dashed border-border-subtle"
                />
              ))}
            </div>

            {/* Invite CTA row */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-label-sm text-foreground-dim">
                Invite teammates to join your workspace.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 border border-border bg-background px-4 h-8 text-xs font-mono tracking-[0.08em] text-foreground-muted hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <IconPlus className="h-3 w-3" strokeWidth={1.5} />
                Add teammate
              </button>
            </div>
          </div>

          {/* ── Section 3 — Primary action ────────────────────────────── */}
          <Button
            variant="solid"
            size="lg"
            className="h-11 px-10 gap-2"
            asChild
          >
            <Link href="/onboarding/loading">
              Let&apos;s start
              <IconArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Button>

          {/* Skip link */}
          <Link
            href="/onboarding/loading"
            className="mt-4 font-mono text-[10px] text-foreground-dim tracking-[0.08em] hover:text-foreground-muted transition-colors"
          >
            Skip for now
          </Link>
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
