"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconChevronDown } from "@/components/icons";
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

function FieldLabel({
  label,
  htmlFor,
  optional,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-dim"
      >
        {label}
      </label>
      {optional && (
        <span className="font-mono text-[9px] text-foreground-dim border border-border px-1.5 py-px tracking-[0.06em]">
          OPTIONAL
        </span>
      )}
    </div>
  );
}

const industries = [
  "Fashion",
  "Retail",
  "Technology",
  "Manufacturing",
  "Consulting",
  "Financial Services",
  "Healthcare",
  "Education",
  "Other",
];

const teamSizes = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];

const TOTAL_STEPS = 6;
const CURRENT_STEP = 4;

export default function WorkspaceCreationPage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateWorkspace() {
    if (!workspaceName.trim()) {
      setError("Please enter a workspace name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/signin"); return; }

      const slug = workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

      const { data: workspace, error: wsError } = await supabase
        .from("workspaces")
        .insert({ name: orgName || workspaceName, slug, owner_id: user.id })
        .select()
        .single();

      if (wsError) { setError(wsError.message); setLoading(false); return; }

      await supabase.from("profiles").update({ workspace_id: workspace.id, role: "owner" }).eq("id", user.id);
      await supabase.from("workspace_settings").insert({ workspace_id: workspace.id, settings: { industry, teamSize } });

      router.push("/onboarding/department");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
          SYS · OB · 004
        </span>
      </div>

      {/* Step progress bar */}
      <div className="relative z-10 flex h-px shrink-0">
        <div
          className="bg-primary h-full transition-all"
          style={{ width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` }}
        />
        <div className="flex-1 bg-border-subtle" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-[480px]">

          {/* Zone 1 — System message */}
          <div className="mb-10 pb-10 border-b border-border">
            <div className="flex items-center gap-1.5 mb-7">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-px w-7 ${
                    i < CURRENT_STEP ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
              <span className="font-mono text-[9px] text-foreground-dim tracking-[0.08em] ml-1">
                {CURRENT_STEP} / {TOTAL_STEPS}
              </span>
            </div>
            <div className="mb-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground-dim">
                Workspace Setup
              </span>
            </div>
            <h1 className="text-[1.5rem] sm:text-[1.875rem] font-medium text-foreground tracking-tight leading-[1.15] mb-3">
              Create your<br />workspace.
            </h1>
            <p className="text-body-md text-foreground-muted leading-relaxed">
              Your workspace is the environment where departments, agents, and workflows operate.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>
          )}

          {/* Zone 2 — Input panel */}
          <div className="relative flex flex-col gap-5 mb-10">
            {/* Workspace Name */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel label="Workspace Name" htmlFor="workspace-name" />
              <Input
                id="workspace-name"
                type="text"
                placeholder="Acme Workspace"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
              />
            </div>

            {/* Organization Name */}
            <div className="flex flex-col gap-1.5">
              <FieldLabel label="Organization Name" htmlFor="org-name" />
              <Input
                id="org-name"
                type="text"
                placeholder="Acme Corporation"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="rounded-none bg-surface border-border h-10 text-sm placeholder:text-foreground-dim focus-visible:ring-primary/50"
              />
            </div>

            {/* Industry + Team Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Industry */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel label="Industry" htmlFor="industry" />
                <div className="relative">
                  <select
                    id="industry"
                    className="w-full h-10 bg-surface border border-border px-3 pr-8 text-sm text-foreground-muted appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/50"
                    style={{ colorScheme: "dark" }}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="" disabled>
                      Select industry
                    </option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-dim">
                    <IconChevronDown className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Team Size */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel label="Team Size" htmlFor="team-size" optional />
                <div className="relative">
                  <select
                    id="team-size"
                    className="w-full h-10 bg-surface border border-border px-3 pr-8 text-sm text-foreground-muted appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/50"
                    style={{ colorScheme: "dark" }}
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    {teamSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-dim">
                    <IconChevronDown className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zone 3 — Primary action */}
          <div className="pt-10 border-t border-border">
            <Button
              variant="solid"
              size="lg"
              className="w-full h-11"
              onClick={handleCreateWorkspace}
              disabled={loading}
            >
              {loading ? "Creating workspace..." : "Create Workspace"}
            </Button>
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
