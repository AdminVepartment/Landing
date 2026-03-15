"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  IconHome, IconSearch, IconBell, IconSettings, IconLock,
  IconLayers, IconChevronRight, IconChevronDown,
  IconPlus, IconEdit,
  IconActivity, IconBot,
  IconShield, IconCheckCircle, IconAlertCircle,
  IconFileCog, IconBarChart3, IconUserCheck, IconKey,
  IconEye, IconEyeOff, IconRefresh,
  IconMarketing,
  IconFile,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import { cn } from "@/lib/utils";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Tab Data ─────────────────────────────────────────────────────────────────

type TabId = "policies" | "inputs" | "sources" | "quality" | "approvals" | "agents" | "credentials";

const TABS: { id: TabId; label: string; Icon: AnyIcon }[] = [
  { id: "policies",    label: "Policies",        Icon: IconShield    as AnyIcon },
  { id: "inputs",      label: "Input Controls",  Icon: IconFileCog   as AnyIcon },
  { id: "sources",     label: "Data Sources",    Icon: IconLayers    as AnyIcon },
  { id: "quality",     label: "Quality Scoring", Icon: IconBarChart3 as AnyIcon },
  { id: "approvals",   label: "Approval Rules",  Icon: IconUserCheck as AnyIcon },
  { id: "agents",      label: "Agent Definitions", Icon: IconBot     as AnyIcon },
  { id: "credentials", label: "Credentials",     Icon: IconKey       as AnyIcon },
];

// ── Policies ─────────────────────────────────────────────────────────────────

const POLICY_CATEGORIES = [
  {
    name: "Content Controls", count: 4,
    policies: [
      { name: "Brand voice consistency", required: true, status: "defined" as const },
      { name: "Platform content guidelines", required: true, status: "defined" as const },
      { name: "Character limit enforcement", required: false, status: "defined" as const },
      { name: "Hashtag policy", required: false, status: "draft" as const },
    ],
  },
  {
    name: "Tone & Voice", count: 3,
    policies: [
      { name: "Professional tone mandate", required: true, status: "defined" as const },
      { name: "Emoji usage guidelines", required: false, status: "defined" as const },
      { name: "Humor boundaries", required: false, status: "draft" as const },
    ],
  },
  {
    name: "Approval Requirements", count: 4,
    policies: [
      { name: "External communications review", required: true, status: "defined" as const },
      { name: "Campaign budget threshold", required: true, status: "defined" as const },
      { name: "Sensitive topic escalation", required: true, status: "defined" as const },
      { name: "Influencer partnership approval", required: false, status: "draft" as const },
    ],
  },
  {
    name: "Communication Boundaries", count: 3,
    policies: [
      { name: "Response time SLA", required: true, status: "defined" as const },
      { name: "Crisis communication protocol", required: true, status: "defined" as const },
      { name: "Competitor mention policy", required: false, status: "draft" as const },
    ],
  },
];

// ── Input Controls ───────────────────────────────────────────────────────────

const INPUT_FIELDS = [
  { name: "Campaign objective", desc: "Primary goal of the campaign or content piece", required: true },
  { name: "Target audience", desc: "Demographic and psychographic audience definition", required: true },
  { name: "Channel or platform", desc: "Social platform or messaging channel target", required: true },
  { name: "Tone of voice", desc: "Desired communication tone and style", required: true },
  { name: "Content format", desc: "Post type — image, video, carousel, story, etc.", required: false },
  { name: "Call-to-action", desc: "Desired user action after engaging with content", required: false },
  { name: "Existing draft", desc: "Optional pre-written content to refine or adapt", required: false },
];

// ── Data Sources ─────────────────────────────────────────────────────────────

const DATA_SOURCES = [
  { name: "Brand Profile", desc: "Core brand identity, mission, values, and positioning" },
  { name: "Campaign Database", desc: "Historical campaign data, performance metrics, and learnings" },
  { name: "Messaging Guidelines", desc: "Approved messaging frameworks and communication templates" },
  { name: "Approved Content Archive", desc: "Previously approved content for reference and reuse" },
  { name: "Channel Communication Rules", desc: "Platform-specific rules, best practices, and formatting" },
  { name: "Brand Vocabulary & Terminology", desc: "Approved terms, phrases, and language patterns" },
];

// ── Quality Scoring ──────────────────────────────────────────────────────────

const QUALITY_DIMS = [
  { name: "Brand alignment", desc: "Content aligns with brand identity and voice", pct: 20 },
  { name: "Tone consistency", desc: "Maintains consistent tone across all outputs", pct: 15 },
  { name: "Audience relevance", desc: "Content resonates with target audience segments", pct: 20 },
  { name: "Channel fit", desc: "Optimized format and style for the target platform", pct: 15 },
  { name: "Message clarity", desc: "Clear, concise, and actionable messaging", pct: 15 },
  { name: "CTA effectiveness", desc: "Call-to-action is compelling and measurable", pct: 10 },
  { name: "Compliance safety", desc: "Content passes all regulatory and brand safety checks", pct: 5 },
];

// ── Approval Rules ───────────────────────────────────────────────────────────

const APPROVAL_RULES = [
  { name: "Low quality score", threshold: "< 70%", action: "Route to Content Review" },
  { name: "Compliance concerns", threshold: "Any flag", action: "Route to Legal Review" },
  { name: "External communication", threshold: "All", action: "Route to Brand Manager" },
  { name: "Sensitive campaigns", threshold: "Tagged", action: "Route to Senior Approval" },
  { name: "First-time brand messaging", threshold: "New tone/style", action: "Route to Brand Lead" },
];

// ── Agent Definitions ────────────────────────────────────────────────────────

const AGENT_DEFS = [
  { code: "SM-F1", name: "Rules & Context Manager", role: "Defines operational rules, assembles context, and enforces policies", status: "active" as const },
  { code: "SM-S1", name: "Strategy Planner", role: "Develops social media strategies aligned with brand goals", status: "active" as const },
  { code: "SM-E1", name: "Content Creator", role: "Generates, schedules, and publishes social media content", status: "active" as const },
  { code: "SM-M1", name: "Quality Reviewer", role: "Reviews all outputs for quality, compliance, and brand alignment", status: "active" as const },
  { code: "SM-G1", name: "Performance Optimizer", role: "Analyzes engagement metrics and optimizes content strategy", status: "active" as const },
  { code: "SM-I1", name: "Innovation Explorer", role: "Identifies emerging trends and experiments with new formats", status: "draft" as const },
];

// ── Credentials ──────────────────────────────────────────────────────────────

const PLATFORM_CREDS = [
  {
    name: "Instagram Business", color: "#E1306C", lastSync: "2h ago", status: "connected" as const,
    keys: [
      { key: "ACCESS_TOKEN", value: "IGQ•••••••4xZ", status: "valid" as const },
      { key: "APP_SECRET", value: "fb•••••••a1c", status: "valid" as const },
    ],
  },
  {
    name: "Meta Business Suite", color: "#1877F2", lastSync: "2h ago", status: "connected" as const,
    keys: [
      { key: "PAGE_TOKEN", value: "EAA•••••••Gk0", status: "valid" as const },
      { key: "APP_ID", value: "28•••••19", status: "valid" as const },
    ],
  },
  {
    name: "WhatsApp Business API", color: "#25D366", lastSync: "6h ago", status: "warning" as const,
    keys: [
      { key: "API_KEY", value: "wab•••••••x2f", status: "valid" as const },
      { key: "PHONE_NUMBER_ID", value: "10•••••87", status: "expired" as const },
    ],
  },
  {
    name: "LinkedIn Marketing", color: "#0A66C2", lastSync: "12h ago", status: "disconnected" as const,
    keys: [
      { key: "CLIENT_ID", value: "78•••••q1", status: "missing" as const },
      { key: "CLIENT_SECRET", value: "—", status: "missing" as const },
    ],
  },
];

const ENV_VARS = [
  { name: "OPENAI_API_KEY", desc: "OpenAI API access", status: "valid" as const },
  { name: "ANTHROPIC_API_KEY", desc: "Anthropic API access", status: "valid" as const },
  { name: "WEBHOOK_SECRET", desc: "Webhook verification", status: "valid" as const },
  { name: "DATABASE_URL", desc: "Primary database connection", status: "valid" as const },
  { name: "REDIS_URL", desc: "Cache and queue connection", status: "valid" as const },
  { name: "SENTRY_DSN", desc: "Error tracking endpoint", status: "expired" as const },
];

// ── Sidebar Data ─────────────────────────────────────────────────────────────

const CONNECTED_AGENTS = [
  { name: "Strategy Planner", code: "SM-S1", status: "active" as const },
  { name: "Content Creator", code: "SM-E1", status: "active" as const },
  { name: "Quality Reviewer", code: "SM-M1", status: "active" as const },
];

const SIDEBAR_ASSETS = [
  { name: "brand-guidelines.pdf", type: "Document", size: "8.1 MB" },
  { name: "messaging-matrix.xlsx", type: "Spreadsheet", size: "2.4 MB" },
  { name: "tone-examples.md", type: "Document", size: "120 KB" },
];

const SIDEBAR_PROGRESS = [
  { label: "Policies", pct: 78 },
  { label: "Input Controls", pct: 100 },
  { label: "Data Sources", pct: 100 },
  { label: "Quality Criteria", pct: 85 },
];

const SIDEBAR_METRICS = [
  { label: "Policies", value: "14" },
  { label: "Input Fields", value: "7" },
  { label: "Data Sources", value: "6" },
  { label: "Quality Dims", value: "7" },
];

// ── Navigation Data ──────────────────────────────────────────────────────────

const SIDEBAR_DOMAINS: { name: string; Icon: AnyIcon; href: string }[] = [
  { name: "Social & Messaging", Icon: IconSocialMessaging as AnyIcon, href: "/dashboard/marketing/social-messaging" },
];

const ALL_DEPTS = [
  { name: "Marketing", Icon: IconMarketing as AnyIcon, colorVar: "marketing", active: true, current: true },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="w-6 h-6 flex items-center justify-center shrink-0 border border-foreground">
      <div className="w-2 h-2 bg-foreground" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FoundationAgentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("policies");
  const [expandedPolicies, setExpandedPolicies] = useState<Record<number, boolean>>({ 0: true });
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const togglePolicy = (i: number) => setExpandedPolicies(prev => ({ ...prev, [i]: !prev[i] }));
  const toggleKeyVis = (k: string) => setVisibleKeys(prev => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className="flex bg-background text-foreground h-screen overflow-hidden w-full">

      {/* ── Left Sidebar ─────────────────────────────────────────────────── */}
      <aside className="w-[200px] shrink-0 hidden lg:flex flex-col bg-surface border-r border-border overflow-y-auto">
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
          <LogoMark />
          <p className="text-body-sm text-foreground font-medium flex-1 truncate">Acme Workspace</p>
          <IconChevronRight size={13} className="text-foreground-dim shrink-0" />
        </div>

        <nav className="px-3 pt-4 pb-3 space-y-px border-b border-border">
          {[
            { Icon: IconHome as AnyIcon, label: "Dashboard" },
            { Icon: IconLayers as AnyIcon, label: "Assets" },
            { Icon: IconSearch as AnyIcon, label: "Search" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 px-3 py-2 text-foreground-muted hover:text-foreground transition-colors cursor-pointer">
              <Icon size={14} strokeWidth={1.5} className="shrink-0" />
              <span className="text-body-sm flex-1">{label}</span>
            </div>
          ))}
        </nav>

        <div className="flex-1 px-3 pt-4 overflow-auto">
          <p className="text-os-title-sm text-foreground-dim px-3 mb-3">VEPARTMENTS</p>
          {ALL_DEPTS.filter(d => d.active).map(({ name, Icon, current }) => (
            <div key={name}>
              <div className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 mb-px cursor-pointer",
                current ? "bg-surface-raised text-foreground" : "text-foreground-muted hover:bg-surface-raised hover:text-foreground transition-colors"
              )}>
                <Icon size={14} strokeWidth={1.5} className="shrink-0" />
                <span className="text-body-sm flex-1 font-medium">{name}</span>
                {current
                  ? <IconChevronDown size={11} className="text-foreground-dim shrink-0 cursor-pointer" onClick={() => setSidebarOpen(v => !v)} />
                  : <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />}
              </div>
              {current && sidebarOpen && (
                <div className="ml-3 pl-3 border-l border-border-subtle mb-1">
                  {SIDEBAR_DOMAINS.map(d => {
                    const DIcon = d.Icon;
                    const isCurrent = d.href === "/dashboard/marketing/social-messaging";
                    return (
                      <Link key={d.name} href={d.href} className={cn(
                        "flex items-center gap-2 px-2 py-1.5 transition-colors",
                        isCurrent ? "text-foreground bg-surface-raised" : "text-foreground-muted hover:text-foreground cursor-pointer"
                      )}>
                        <DIcon size={11} strokeWidth={1.5} className="shrink-0" />
                        <span className="text-body-sm truncate">{d.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <button className="flex items-center gap-2 px-3 py-2.5 mt-1 w-full text-foreground-dim hover:text-foreground hover:bg-surface-raised transition-colors border border-dashed border-border">
            <IconPlus size={12} className="shrink-0" />
            <span className="text-label-sm">Add new vepartment</span>
          </button>
        </div>

        <div className="shrink-0 border-t border-border px-4 py-3 flex items-center gap-2.5">
          <div className="flex -space-x-1.5 flex-1">
            {["AK", "MR", "TP"].map(i => (
              <div key={i} className="w-5 h-5 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">{i}</div>
            ))}
          </div>
          <IconBell size={13} className="text-foreground-dim" />
          <IconSettings size={13} className="text-foreground-dim" />
        </div>
      </aside>

      {/* ── Main + Right Sidebar ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Desktop header */}
        <header className="hidden lg:flex h-14 shrink-0 items-center gap-4 px-10 border-b border-border bg-surface">
          <div className="flex items-center gap-2 flex-1">
            <Link href="/dashboard" className="text-label-sm text-foreground-dim font-mono hover:text-foreground-muted transition-colors">Dashboard</Link>
            <span className="text-label-sm text-foreground-dim">/</span>
            <Link href="/dashboard/marketing" className="text-label-sm text-foreground-dim font-mono hover:text-foreground-muted transition-colors">Marketing</Link>
            <span className="text-label-sm text-foreground-dim">/</span>
            <Link href="/dashboard/marketing/social-messaging" className="text-label-sm text-foreground-dim font-mono hover:text-foreground-muted transition-colors">Social & Messaging</Link>
            <span className="text-label-sm text-foreground-dim">/</span>
            <span className="text-label-sm text-foreground font-mono font-medium">SM-F1</span>
          </div>
          <div className="relative w-48">
            <IconSearch size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-dim" />
            <input className="w-full h-7 bg-background border border-border pl-7 pr-3 text-xs font-mono placeholder:text-foreground-dim focus:outline-none focus:border-foreground-muted" placeholder="Search…" />
          </div>
          <IconBell size={14} className="text-foreground-muted" />
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        {/* Mobile header */}
        <header className="lg:hidden h-14 shrink-0 flex items-center gap-4 px-4 border-b border-border bg-surface">
          <LogoMark />
          <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
            <span className="text-label-sm text-foreground-dim font-mono shrink-0">SM</span>
            <span className="text-label-sm text-foreground-dim shrink-0">/</span>
            <span className="text-label-sm text-foreground font-mono font-medium truncate">SM-F1 Rules & Context Manager</span>
          </div>
          <IconBell size={14} className="text-foreground-muted" />
        </header>

        <div className="flex-1 flex overflow-hidden">

          {/* ── Main Content ───────────────────────────────────────────── */}
          <main className="flex-1 overflow-auto bg-background">
            <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6">

              {/* ── Agent Header ────────────────────────────────────────── */}
              <div className="pb-6 border-b border-border/30 space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-label-sm text-foreground-dim font-mono">SM-F1</span>
                      <span className="text-foreground-dim">—</span>
                      <h1 className="text-module-lg font-medium text-foreground">Rules & Context Manager</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-body-sm text-foreground-muted">Social & Messaging</span>
                      <span className="text-foreground-dim">/</span>
                      <span className="text-label-sm font-mono text-foreground-dim border border-border px-1.5 py-0.5">Foundation</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-start">
                    <span className="text-label-sm text-foreground-dim">Active</span>
                    <div className="w-8 h-4 bg-success/20 border border-success/40 relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-success" />
                    </div>
                  </div>
                </div>
                <p className="text-body-sm text-foreground-muted">Foundation Layer configuration for Social & Messaging Domain</p>
              </div>

              {/* ── Purpose ─────────────────────────────────────────────── */}
              <div>
                <h2 className="text-module-sm font-medium text-foreground mb-2">Purpose</h2>
                <p className="text-body-sm text-foreground-muted leading-relaxed">
                  The Foundation Layer defines the operational rules, knowledge sources, and quality standards
                  that govern all agents within the Social & Messaging domain. It ensures every output aligns
                  with brand identity, compliance requirements, and strategic objectives before and after execution.
                </p>
              </div>

              {/* ── I/O Summary ─────────────────────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border/40 bg-surface">
                  <p className="text-os-title-sm text-foreground-muted mb-3">BEFORE EXECUTION</p>
                  <div className="space-y-2">
                    {["Validates inputs", "Assembles context", "Enforces policies"].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                        <span className="text-body-sm text-foreground-muted">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border border-border/40 bg-surface">
                  <p className="text-os-title-sm text-foreground-muted mb-3">AFTER EXECUTION</p>
                  <div className="space-y-2">
                    {["Evaluates outputs", "Assigns quality scores", "Determines approval requirements"].map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-success/60 shrink-0" />
                        <span className="text-body-sm text-foreground-muted">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Tab Navigation ──────────────────────────────────────── */}
              <div className="flex gap-1 p-1 bg-surface border border-border w-fit flex-wrap">
                {TABS.map(tab => {
                  const TIcon = tab.Icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 text-label-sm font-mono transition-colors",
                        isActive
                          ? "bg-background text-foreground border border-border"
                          : "text-foreground-muted hover:text-foreground border border-transparent"
                      )}
                    >
                      <TIcon size={11} strokeWidth={1.5} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* ── Tab: Policies ───────────────────────────────────────── */}
              {activeTab === "policies" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-module-sm font-medium text-foreground">Domain Policies</h3>
                    <button className="flex items-center gap-2 h-7 px-3 bg-foreground text-background text-label-sm font-mono hover:bg-foreground/90 transition-colors">
                      <IconPlus size={10} />
                      Add Policy
                    </button>
                  </div>
                  <p className="text-body-sm text-foreground-muted">
                    Policies define the rules and constraints that all agents must follow during execution.
                    Each policy is enforced automatically before and after agent operations.
                  </p>
                  <div className="space-y-2">
                    {POLICY_CATEGORIES.map((cat, ci) => (
                      <div key={cat.name} className="border border-border bg-surface">
                        <button
                          onClick={() => togglePolicy(ci)}
                          className="flex items-center gap-2.5 w-full px-4 py-3 hover:bg-surface-raised transition-colors text-left"
                        >
                          {expandedPolicies[ci]
                            ? <IconChevronDown size={11} className="text-foreground-dim shrink-0" />
                            : <IconChevronRight size={11} className="text-foreground-dim shrink-0" />}
                          <span className="text-body-sm text-foreground font-medium flex-1">{cat.name}</span>
                          <span className="text-label-sm text-foreground-dim font-mono">({cat.count} policies)</span>
                        </button>
                        {expandedPolicies[ci] && (
                          <div className="border-t border-border-subtle">
                            {cat.policies.map(p => (
                              <div key={p.name} className="flex items-center gap-3 px-4 py-2.5 border-b border-border-subtle last:border-0">
                                <IconCheckCircle
                                  size={12}
                                  className={cn("shrink-0", p.status === "defined" ? "text-success" : "text-foreground-dim")}
                                />
                                <span className="text-body-sm text-foreground flex-1">{p.name}</span>
                                {p.required && (
                                  <span className="text-[9px] font-mono uppercase tracking-wider text-error border border-error/30 px-1.5 py-0.5">Required</span>
                                )}
                                <span className={cn(
                                  "text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border",
                                  p.status === "defined"
                                    ? "text-success border-success/30"
                                    : "text-warning border-warning/30"
                                )}>
                                  {p.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab: Input Controls ─────────────────────────────────── */}
              {activeTab === "inputs" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-module-sm font-medium text-foreground">Input Controls</h3>
                    <button className="flex items-center gap-2 h-7 px-3 border border-border text-foreground-muted text-label-sm font-mono hover:text-foreground hover:border-foreground-muted transition-colors">
                      <IconPlus size={10} />
                      Add Field
                    </button>
                  </div>
                  <p className="text-body-sm text-foreground-muted">
                    Define the required and optional input fields that agents need before executing tasks.
                    Required fields must be provided for any workflow to proceed.
                  </p>
                  <div className="space-y-2">
                    {INPUT_FIELDS.map(field => (
                      <div key={field.name} className="flex items-start gap-3 p-4 border border-border/40 bg-surface">
                        <IconFileCog size={14} strokeWidth={1.5} className="text-foreground-muted shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-body-sm text-foreground font-medium">{field.name}</span>
                            {field.required && (
                              <span className="text-[9px] font-mono uppercase tracking-wider text-error border border-error/30 px-1.5 py-0.5">Required</span>
                            )}
                          </div>
                          <p className="text-label-sm text-foreground-dim mt-1">{field.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab: Data Sources ───────────────────────────────────── */}
              {activeTab === "sources" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-module-sm font-medium text-foreground">Data Sources</h3>
                    <button className="flex items-center gap-2 h-7 px-3 border border-border text-foreground-muted text-label-sm font-mono hover:text-foreground hover:border-foreground-muted transition-colors">
                      <IconPlus size={10} />
                      Connect Source
                    </button>
                  </div>
                  <p className="text-body-sm text-foreground-muted">
                    Knowledge bases and data sources that agents reference during execution.
                    Connected sources provide context and grounding for all operations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {DATA_SOURCES.map(src => (
                      <div key={src.name} className="flex items-start gap-3 p-4 border border-border/40 bg-surface">
                        <IconLayers size={14} strokeWidth={1.5} className="text-foreground-muted shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-body-sm text-foreground font-medium">{src.name}</span>
                            <span className="text-[9px] font-mono uppercase tracking-wider text-success border border-success/30 px-1.5 py-0.5 shrink-0">Connected</span>
                          </div>
                          <p className="text-label-sm text-foreground-dim mt-1">{src.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab: Quality Scoring ────────────────────────────────── */}
              {activeTab === "quality" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-module-sm font-medium text-foreground">Quality Scoring</h3>
                    <button className="flex items-center gap-2 h-7 px-3 border border-border text-foreground-muted text-label-sm font-mono hover:text-foreground hover:border-foreground-muted transition-colors">
                      <IconPlus size={10} />
                      Add Dimension
                    </button>
                  </div>
                  <p className="text-body-sm text-foreground-muted">
                    Quality dimensions define how agent outputs are scored. Each dimension has a weight
                    that contributes to the overall quality score. Outputs below threshold trigger approval flows.
                  </p>
                  <div className="space-y-2">
                    {QUALITY_DIMS.map(dim => (
                      <div key={dim.name} className="flex items-center gap-4 p-4 border border-border/40 bg-surface">
                        <IconBarChart3 size={14} strokeWidth={1.5} className="text-foreground-muted shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm text-foreground font-medium">{dim.name}</p>
                          <p className="text-label-sm text-foreground-dim mt-0.5">{dim.desc}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="w-20 h-2 bg-surface-raised border border-border overflow-hidden">
                            <div className="h-full bg-foreground/70" style={{ width: `${dim.pct}%` }} />
                          </div>
                          <span className="text-data-sm text-foreground font-mono w-8 text-right">{dim.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab: Approval Rules ─────────────────────────────────── */}
              {activeTab === "approvals" && (
                <div className="space-y-4">
                  <h3 className="text-module-sm font-medium text-foreground">Approval Rules</h3>
                  <p className="text-body-sm text-foreground-muted">
                    Triggers that route agent outputs to human review based on quality scores,
                    compliance flags, or predefined conditions.
                  </p>
                  <div className="space-y-2">
                    {APPROVAL_RULES.map(rule => (
                      <div key={rule.name} className="flex items-center gap-4 p-4 border border-border/40 bg-surface">
                        <IconUserCheck size={14} strokeWidth={1.5} className="text-foreground-muted shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm text-foreground font-medium">{rule.name}</p>
                          <p className="text-label-sm text-foreground-dim font-mono mt-0.5">{rule.threshold}</p>
                        </div>
                        <span className="text-[10px] font-mono text-foreground-muted border border-border px-2 py-1 shrink-0 bg-surface-raised">
                          {rule.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab: Agent Definitions ──────────────────────────────── */}
              {activeTab === "agents" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-module-sm font-medium text-foreground">Agent Definitions</h3>
                    <button className="flex items-center gap-2 h-7 px-3 border border-border text-foreground-muted text-label-sm font-mono hover:text-foreground hover:border-foreground-muted transition-colors">
                      <IconPlus size={10} />
                      Add Agent
                    </button>
                  </div>
                  <p className="text-body-sm text-foreground-muted">
                    Agents assigned to this domain and their current operational status.
                    Each agent has a unique code, defined role, and lifecycle state.
                  </p>
                  <div className="space-y-2">
                    {AGENT_DEFS.map(agent => (
                      <div key={agent.code} className="flex items-start gap-4 p-4 border border-border/40 bg-surface">
                        <div className="w-10 h-10 flex items-center justify-center border border-border bg-surface-raised shrink-0">
                          <IconBot size={16} strokeWidth={1.5} className="text-foreground-muted" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-label-sm text-foreground-dim font-mono mb-0.5">{agent.code}</p>
                          <p className="text-body-sm text-foreground font-medium">{agent.name}</p>
                          <p className="text-label-sm text-foreground-dim mt-1">{agent.role}</p>
                        </div>
                        <span className={cn(
                          "text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border shrink-0",
                          agent.status === "active"
                            ? "text-success border-success/30 bg-success/5"
                            : "text-warning border-warning/30 bg-warning/5"
                        )}>
                          {agent.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab: Credentials ────────────────────────────────────── */}
              {activeTab === "credentials" && (
                <div className="space-y-8">

                  {/* Platform Credentials */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-module-sm font-medium text-foreground">Platform Credentials</h3>
                      <button className="flex items-center gap-2 h-7 px-3 border border-border text-foreground-muted text-label-sm font-mono hover:text-foreground hover:border-foreground-muted transition-colors">
                        <IconPlus size={10} />
                        Connect Platform
                      </button>
                    </div>
                    <p className="text-body-sm text-foreground-muted">
                      API keys and access tokens for connected social platforms.
                      Credentials are encrypted and rotated automatically.
                    </p>
                    <div className="space-y-3">
                      {PLATFORM_CREDS.map(plat => (
                        <div key={plat.name} className="border border-border/40 bg-surface">
                          {/* Platform header */}
                          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
                            <div
                              className="w-8 h-8 flex items-center justify-center border shrink-0"
                              style={{
                                borderColor: plat.status === "connected" ? plat.color : plat.status === "warning" ? "hsl(var(--warning))" : "hsl(var(--border))",
                                backgroundColor: `${plat.color}10`,
                              }}
                            >
                              <IconKey size={12} style={{ color: plat.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-body-sm text-foreground font-medium">{plat.name}</p>
                              <p className="text-label-sm text-foreground-dim font-mono">Last sync: {plat.lastSync}</p>
                            </div>
                            <span className={cn(
                              "text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border shrink-0",
                              plat.status === "connected" && "text-success border-success/30",
                              plat.status === "warning" && "text-warning border-warning/30",
                              plat.status === "disconnected" && "text-foreground-dim border-border",
                            )}>
                              {plat.status}
                            </span>
                            <button className="w-6 h-6 flex items-center justify-center text-foreground-dim hover:text-foreground transition-colors">
                              <IconRefresh size={11} />
                            </button>
                          </div>
                          {/* Keys */}
                          <div className="px-4 py-2">
                            {plat.keys.map(k => {
                              const kId = `${plat.name}-${k.key}`;
                              return (
                                <div key={k.key} className="flex items-center gap-3 py-2 border-b border-border-subtle last:border-0">
                                  {k.status === "valid" ? (
                                    <IconCheckCircle size={11} className="text-success shrink-0" />
                                  ) : k.status === "expired" ? (
                                    <IconAlertCircle size={11} className="text-error shrink-0" />
                                  ) : (
                                    <IconAlertCircle size={11} className="text-warning shrink-0" />
                                  )}
                                  <span className="text-label-sm text-foreground-dim font-mono w-32 shrink-0">{k.key}</span>
                                  <span className="text-label-sm text-foreground font-mono flex-1 truncate">
                                    {visibleKeys[kId] ? "sk-live-abc123def456ghi789" : k.value}
                                  </span>
                                  <button onClick={() => toggleKeyVis(kId)} className="text-foreground-dim hover:text-foreground transition-colors shrink-0">
                                    {visibleKeys[kId] ? <IconEyeOff size={11} /> : <IconEye size={11} />}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Environment Variables */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-module-sm font-medium text-foreground">Environment Variables</h3>
                      <button className="flex items-center gap-2 h-7 px-3 border border-border text-foreground-muted text-label-sm font-mono hover:text-foreground hover:border-foreground-muted transition-colors">
                        <IconPlus size={10} />
                        Add Variable
                      </button>
                    </div>
                    <p className="text-body-sm text-foreground-muted">
                      Service API keys and connection strings used by domain agents.
                    </p>
                    <div className="border border-border bg-surface overflow-hidden">
                      {/* Table header */}
                      <div className="grid grid-cols-[1fr_1fr_80px_60px] gap-3 px-4 py-2 bg-surface-raised border-b border-border text-os-title-sm text-foreground-dim">
                        <span>VARIABLE</span>
                        <span>DESCRIPTION</span>
                        <span>STATUS</span>
                        <span className="text-right">ACTIONS</span>
                      </div>
                      {ENV_VARS.map((v, i) => (
                        <div key={v.name} className={cn(
                          "grid grid-cols-[1fr_1fr_80px_60px] gap-3 px-4 py-2.5 items-center",
                          i < ENV_VARS.length - 1 && "border-b border-border-subtle"
                        )}>
                          <span className="text-label-sm text-foreground font-mono truncate">{v.name}</span>
                          <span className="text-label-sm text-foreground-dim truncate">{v.desc}</span>
                          <span className={cn(
                            "text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border w-fit",
                            v.status === "valid" ? "text-success border-success/30" : "text-error border-error/30"
                          )}>
                            {v.status}
                          </span>
                          <div className="flex items-center gap-1.5 justify-end">
                            <button className="text-foreground-dim hover:text-foreground transition-colors">
                              <IconEye size={11} />
                            </button>
                            <button className="text-foreground-dim hover:text-foreground transition-colors">
                              <IconEdit size={11} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4 bg-surface border border-border">
                    <p className="text-os-title-sm text-foreground-dim mb-3">QUICK ACTIONS</p>
                    <div className="flex flex-wrap gap-2">
                      {["Refresh All Tokens", "Validate Credentials", "Open Vercel Settings"].map(action => (
                        <button key={action} className="h-7 px-3 border border-border text-label-sm font-mono text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>

          {/* ── Right Sidebar ──────────────────────────────────────────── */}
          <aside className="hidden xl:flex w-[260px] shrink-0 flex-col border-l border-border bg-surface overflow-y-auto">

            {/* Connected Agents */}
            <div className="p-4 border-b border-border">
              <p className="text-os-title-sm text-foreground-dim mb-3">CONNECTED AGENTS</p>
              <div className="space-y-2">
                {CONNECTED_AGENTS.map(a => (
                  <div key={a.code} className="flex items-center gap-2.5">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      a.status === "active" ? "bg-success" : "bg-warning"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm text-foreground truncate">{a.name}</p>
                      <p className="text-label-sm text-foreground-dim font-mono">{a.code}</p>
                    </div>
                    <span className={cn(
                      "text-[9px] font-mono uppercase shrink-0",
                      a.status === "active" ? "text-success" : "text-warning"
                    )}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assets */}
            <div className="p-4 border-b border-border">
              <p className="text-os-title-sm text-foreground-dim mb-3">ASSETS</p>
              <div className="space-y-2">
                {SIDEBAR_ASSETS.map(a => (
                  <div key={a.name} className="flex items-start gap-2">
                    <IconFile size={11} className="text-foreground-dim shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm text-foreground truncate">{a.name}</p>
                      <p className="text-label-sm text-foreground-dim font-mono">{a.type} · {a.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="p-4 border-b border-border">
              <p className="text-os-title-sm text-foreground-dim mb-3">PROGRESS</p>
              <div className="space-y-3">
                {SIDEBAR_PROGRESS.map(p => (
                  <div key={p.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-label-sm text-foreground-muted">{p.label}</span>
                      <span className="text-label-sm text-foreground font-mono">{p.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-raised border border-border overflow-hidden">
                      <div
                        className={cn("h-full", p.pct === 100 ? "bg-success" : "bg-foreground/60")}
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="p-4">
              <p className="text-os-title-sm text-foreground-dim mb-3">METRICS</p>
              <div className="grid grid-cols-2 gap-2">
                {SIDEBAR_METRICS.map(m => (
                  <div key={m.label} className="p-2.5 border border-border bg-surface-raised text-center">
                    <p className="text-data-lg text-foreground font-mono">{m.value}</p>
                    <p className="text-label-sm text-foreground-dim mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden shrink-0 h-14 border-t border-border bg-surface flex items-center">
          {[
            { Icon: IconHome as AnyIcon, label: "Home" },
            { Icon: IconSearch as AnyIcon, label: "Search" },
            { Icon: IconBell as AnyIcon, label: "Alerts" },
            { Icon: IconSettings as AnyIcon, label: "Settings" },
          ].map(({ Icon, label }) => (
            <button key={label} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-foreground-dim">
              <Icon size={16} strokeWidth={1.5} />
              <span className="text-[9px] font-mono uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
