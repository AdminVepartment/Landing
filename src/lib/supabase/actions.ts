"use server";

import { createClient } from "./server";
import { redirect } from "next/navigation";

// ── Workspace ─────────────────────────────────────────────────────────────────

export async function createWorkspace(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const name = formData.get("name") as string;
  const orgName = formData.get("orgName") as string;
  const industry = formData.get("industry") as string;
  const teamSize = formData.get("teamSize") as string;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Create workspace
  const { data: workspace, error: wsError } = await supabase
    .from("workspaces")
    .insert({
      name: orgName || name,
      slug,
      owner_id: user.id,
    })
    .select()
    .single();

  if (wsError) throw new Error(wsError.message);

  // Link profile to workspace
  await supabase
    .from("profiles")
    .update({
      workspace_id: workspace.id,
      role: "owner",
    })
    .eq("id", user.id);

  // Create workspace settings
  await supabase
    .from("workspace_settings")
    .insert({
      workspace_id: workspace.id,
      settings: { industry, teamSize },
    });

  redirect("/onboarding/department");
}

// ── Departments ───────────────────────────────────────────────────────────────

const DEPT_COLORS: Record<string, string> = {
  marketing: "#4F46E5",
  branding: "#EA580C",
  product: "#0284C7",
  sales: "#059669",
  sustainability: "#0D9488",
  operations: "#52525B",
  finance: "#B45309",
  hr: "#A21CAF",
};

export async function createDepartments(slugs: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  // Get user's workspace
  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", user.id)
    .single();

  if (!profile?.workspace_id) redirect("/onboarding/workspace");

  const departments = slugs.map((slug) => ({
    workspace_id: profile.workspace_id,
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    slug,
    color: DEPT_COLORS[slug] || "#52525B",
    status: "active",
    agent_count: 0,
  }));

  const { error } = await supabase
    .from("departments")
    .insert(departments);

  if (error) throw new Error(error.message);

  redirect("/onboarding/domain");
}

// ── Get current user profile ──────────────────────────────────────────────────

export async function getCurrentProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, workspaces(*)")
    .eq("id", user.id)
    .single();

  return profile;
}

// ── Get workspace departments ─────────────────────────────────────────────────

export async function getWorkspaceDepartments() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", user.id)
    .single();

  if (!profile?.workspace_id) return [];

  const { data: departments } = await supabase
    .from("departments")
    .select("*")
    .eq("workspace_id", profile.workspace_id)
    .order("created_at");

  return departments || [];
}
