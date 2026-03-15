"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentType, CSSProperties } from "react";
import {
  IconHome, IconSearch, IconBell, IconSettings, IconLock, IconPlus,
  IconBot, IconWorkflow, IconCalendar, IconFileText, IconLayers,
  IconArrowUpRight, IconChevronRight, IconSparkles, IconBarChart,
  IconX, IconChevronDown,
  IconMarketing, IconBranding, IconSustainability, IconSales,
} from "@/components/icons";
import { IconSocialMessaging, IconOri } from "@/components/icons/vepartment";
import { cn } from "@/lib/utils";
import { OfficeMap } from "@/components/dashboard/office-map";
import { NotificationCenter, NotificationBell } from "@/components/notifications/NotificationCenter";
import { OnboardingGuide } from "@/components/onboarding/OnboardingGuide";
import { UserGuide } from "@/components/onboarding/UserGuide";
import { DashboardCommandGuide, DashboardVepartmentGuide } from "./guide";
import { useActivity } from "@/lib/activity-store";
import { useOri } from "@/lib/ori-store";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Data ─────────────────────────────────────────────────────────────────────

const USER = { name: "Alex", greeting: "Good morning" };

const ACTIVE_DEPTS = [
  {
    name:     "Marketing",
    colorVar: "marketing",
    Icon:     IconMarketing,
    href:     "/dashboard/marketing",
    desc:     "Brand awareness, lead generation, and content operations",
    domains: [
      { name: "Social & Messaging", Icon: IconSocialMessaging as AnyIcon, active: true, agents: 6, agentsActive: 6 },
    ],
  },
];

const LOCKED_DEPTS = [
  { name: "Branding",       Icon: IconBranding       },
  { name: "Sustainability", Icon: IconSustainability },
  { name: "Sales",          Icon: IconSales          },
];

// Domains available to add per dept — empty for step-by-step activation
const ADDABLE_DOMAINS: Record<string, Array<{ name: string; Icon: AnyIcon }>> = {};

// Full vepartment catalog for the add-vepartment modal
const VEPARTMENT_CATALOG = [
  {
    name: "Marketing", colorVar: "marketing", Icon: IconMarketing, active: true,
    desc: "Brand awareness, lead generation, and content operations across all channels.",
    domains: ["Campaign Planning", "Content Creation", "Performance Analysis", "SEO & Growth", "Email Campaigns", "Social Media"],
  },
  {
    name: "Branding", colorVar: "branding", Icon: IconBranding, active: false,
    desc: "Brand identity, visual language, guidelines, and creative direction.",
    domains: ["Brand Identity", "Visual Design", "Creative Strategy", "Brand Guidelines", "Asset Management", "Motion Design"],
  },
  {
    name: "Sustainability", colorVar: "sustainability", Icon: IconSustainability, active: false,
    desc: "ESG reporting, green initiatives, carbon tracking, and impact measurement.",
    domains: ["ESG Reporting", "Carbon Tracking", "Impact Metrics", "Green Operations", "Compliance"],
  },
  {
    name: "Sales", colorVar: "sales", Icon: IconSales, active: false,
    desc: "Pipeline management, revenue operations, forecasting, and client relations.",
    domains: ["Pipeline Management", "Revenue Operations", "Client Relations", "Sales Analytics", "Forecasting"],
  },
];

const QUICK_PROMPTS = ["Draft a campaign", "Analyze performance", "Schedule content", "Brief a workflow"];

const UPCOMING: { day: string; time: string; label: string; dept: string }[] = [];

const ACTIVITY_ICON_MAP: Record<string, AnyIcon> = {
  account:    IconSparkles as AnyIcon,
  workspace:  IconHome as AnyIcon,
  department: IconLayers as AnyIcon,
  domain:     IconWorkflow as AnyIcon,
  agent:      IconBot as AnyIcon,
  default:    IconFileText as AnyIcon,
};

// derived stats
const totalAgents       = ACTIVE_DEPTS.flatMap(d => d.domains).reduce((s, d) => s + d.agents, 0);
const totalAgentsActive = ACTIVE_DEPTS.flatMap(d => d.domains).reduce((s, d) => s + d.agentsActive, 0);
const totalDomains      = ACTIVE_DEPTS.flatMap(d => d.domains).length;
const activeDomains     = ACTIVE_DEPTS.flatMap(d => d.domains).filter(d => d.active).length;

// ── Shared components ─────────────────────────────────────────────────────────

function LogoMark({ bold }: { bold?: boolean }) {
  return (
    <div
      className="w-6 h-6 flex items-center justify-center shrink-0"
      style={{ border: `${bold ? 2 : 1}px solid hsl(var(--foreground))` }}
    >
      <div className="w-2 h-2 bg-foreground" />
    </div>
  );
}

// ── Dept card ─────────────────────────────────────────────────────────────────

function DeptCard({ dept }: { dept: typeof ACTIVE_DEPTS[0] }) {
  const deptActive   = dept.domains.filter(d => d.active).length;
  const deptAgents   = dept.domains.reduce((s, d) => s + d.agents, 0);
  const deptAgentsOn = dept.domains.reduce((s, d) => s + d.agentsActive, 0);
  const topBorder    = `hsl(var(--dept-${dept.colorVar}-main))`;

  return (
    <div
      className="flex-1 border border-border bg-surface flex flex-col"
      style={{ borderTopColor: topBorder, borderTopWidth: 3 }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-border-subtle">
        <div className="w-9 h-9 flex items-center justify-center border border-border shrink-0">
          <dept.Icon size={20} strokeWidth={1.5} className="text-foreground-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-module-sm font-semibold text-foreground">{dept.name}</span>
            <span className="text-os-title-sm px-1.5 py-0.5 border border-border text-foreground-dim">ACTIVE</span>
          </div>
          <p className="text-body-sm text-foreground-muted truncate">{dept.desc}</p>
        </div>
        <Link href={dept.href} className="flex items-center gap-1 text-foreground-muted hover:text-foreground shrink-0 border border-border px-2.5 py-1.5 transition-colors">
          <span className="text-label-sm">Open</span>
          <IconArrowUpRight size={11} />
        </Link>
      </div>

      {/* Domains label + stats */}
      <div className="flex items-center gap-2.5 px-6 py-2.5 border-b border-border-subtle bg-surface-raised">
        <span className="text-os-title-sm text-foreground-dim">DOMAINS</span>
        <div className="w-px h-3 bg-border mx-0.5" />
        <span className="text-label-sm text-foreground-dim">{deptActive} of {dept.domains.length} active</span>
        <div className="w-px h-3 bg-border mx-0.5" />
        <div className="flex items-center gap-1">
          <IconBot size={10} className="text-foreground-dim" />
          <span className="text-label-sm text-foreground-dim font-mono">{deptAgentsOn}/{deptAgents} agents</span>
        </div>
      </div>

      {/* Domain rows */}
      <div className="flex flex-col flex-1">
        {dept.domains.map(({ name, Icon, active, agents, agentsActive }, i) => (
          <div
            key={name}
            className={cn(
              "group flex items-center gap-3 px-6 py-4 hover:bg-surface-raised transition-colors cursor-pointer",
              i < dept.domains.length - 1 && "border-b border-border-subtle"
            )}
          >
            <div className="w-7 h-7 flex items-center justify-center border border-border shrink-0">
              <Icon size={14} strokeWidth={1.5} className={active ? "text-foreground-muted" : "text-foreground-dim"} />
            </div>
            <span className={cn("text-body-sm flex-1 font-medium", active ? "text-foreground" : "text-foreground-dim")}>
              {name}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <IconBot size={11} className="text-foreground-dim" />
              <span className="text-label-sm text-foreground-dim font-mono">
                {active ? `${agentsActive}/${agents}` : "—"}
              </span>
            </div>
            <div className="w-px h-3 bg-border shrink-0" />
            <div className="flex items-center gap-1.5 shrink-0">
              <div className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-success" : "bg-border")} />
              <span className="text-label-sm text-foreground-dim">{active ? "Active" : "Inactive"}</span>
            </div>
            <IconChevronRight size={13} className="text-foreground-dim opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>
        ))}

        {/* Add domain row — locked until step-by-step activation */}
        <div className="border-t border-border-subtle flex items-center gap-2.5 px-6 py-3.5 opacity-30 cursor-not-allowed select-none">
          <div className="w-7 h-7 flex items-center justify-center border border-dashed border-border shrink-0">
            <IconLock size={11} className="text-foreground-dim" />
          </div>
          <span className="text-label-sm text-foreground-dim flex-1">More domains locked</span>
        </div>
      </div>
    </div>
  );
}

// ── Vepartment catalog modal ──────────────────────────────────────────────────

function VepartmentModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-background/90" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
        <div className="bg-surface border border-border w-full max-w-[880px] max-h-[82vh] flex flex-col pointer-events-auto">

          {/* Modal header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-border shrink-0">
            <div>
              <p className="text-os-title-sm text-foreground-dim mb-1.5">VEPARTMENTS</p>
              <h2 className="text-module-md font-medium text-foreground">Available vepartments</h2>
              <p className="text-body-sm text-foreground-muted mt-1">Select a vepartment to activate it for your workspace.</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors"
            >
              <IconX size={14} />
            </button>
          </div>

          {/* Vepartment grid */}
          <div className="overflow-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {VEPARTMENT_CATALOG.map((v) => {
              const topColor = `hsl(var(--dept-${v.colorVar}-main))`;
              return (
                <div
                  key={v.name}
                  className="border border-border bg-background flex flex-col"
                  style={{ borderTopColor: topColor, borderTopWidth: 2 }}
                >
                  {/* Card header */}
                  <div className="flex items-start gap-4 px-6 py-5 border-b border-border-subtle">
                    <div className="w-9 h-9 flex items-center justify-center border border-border shrink-0 mt-0.5">
                      <v.Icon size={20} strokeWidth={1.5} className="text-foreground-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-module-sm font-semibold text-foreground">{v.name}</span>
                        {v.active && (
                          <span className="text-os-title-sm px-1.5 py-0.5 border border-border text-foreground-dim">ACTIVE</span>
                        )}
                      </div>
                      <p className="text-body-sm text-foreground-muted leading-relaxed">{v.desc}</p>
                    </div>
                  </div>

                  {/* Domains list */}
                  <div className="px-6 py-4 flex-1">
                    <p className="text-os-title-sm text-foreground-dim mb-3">POSSIBLE DOMAINS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {v.domains.map((d) => (
                        <span
                          key={d}
                          className="text-label-sm text-foreground-dim border border-border-subtle px-2.5 py-1 bg-surface"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="px-6 py-4 border-t border-border-subtle">
                    {v.active ? (
                      <button className="flex items-center gap-1.5 text-foreground-dim hover:text-foreground transition-colors">
                        <span className="text-label-sm">Open vepartment</span>
                        <IconArrowUpRight size={11} />
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 h-8 px-4 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors"
                        style={{ borderTopColor: topColor, borderTopWidth: 1 }}
                      >
                        <IconPlus size={12} />
                        <span className="text-label-sm">Activate vepartment</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [showVepartmentModal, setShowVepartmentModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showUserGuide, setShowUserGuide] = useState(true);
  const { entries: activityEntries } = useActivity();
  const { metrics: oriMetrics, status: oriStatus } = useOri();

  return (
    <div className="flex bg-background text-foreground w-full min-h-screen">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-[200px] shrink-0 hidden lg:flex flex-col bg-surface border-r border-border" style={{ minHeight: "100vh" }}>

        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
          <LogoMark />
          <p className="text-body-sm text-foreground font-medium flex-1 truncate">Acme Workspace</p>
          <IconChevronRight size={13} className="text-foreground-dim shrink-0" />
        </div>

        <nav className="px-3 pt-4 pb-3 space-y-px border-b border-border">
          {[
            { Icon: IconHome,   label: "Dashboard", active: true  },
            { Icon: IconLayers, label: "Assets",    active: false },
            { Icon: IconSearch, label: "Search",    active: false },
          ].map(({ Icon, label, active }) => (
            <div key={label} className={cn("flex items-center gap-2.5 px-3 py-2", active ? "bg-surface-raised text-foreground" : "text-foreground-muted")}>
              <Icon size={14} strokeWidth={1.5} className="shrink-0" />
              <span className={cn("text-body-sm flex-1", active && "font-medium")}>{label}</span>
            </div>
          ))}
        </nav>

        <div className="flex-1 px-3 pt-4 overflow-auto">
          <p className="text-os-title-sm text-foreground-dim px-3 mb-3">VEPARTMENTS</p>

          {ACTIVE_DEPTS.map(({ name, Icon }) => (
            <div key={name} className="flex items-center gap-2.5 px-3 py-2.5 mb-px">
              <Icon size={14} strokeWidth={1.5} className="text-foreground-muted shrink-0" />
              <span className="text-body-sm text-foreground font-medium flex-1">{name}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
            </div>
          ))}

          <button
            onClick={() => setShowVepartmentModal(true)}
            className="flex items-center gap-2 px-3 py-2.5 mt-1 w-full text-foreground-dim hover:text-foreground hover:bg-surface-raised transition-colors border border-dashed border-border"
          >
            <IconPlus size={12} className="shrink-0" />
            <span className="text-label-sm">Add new vepartment</span>
          </button>
        </div>

        <div className="shrink-0 border-t border-border px-4 py-3 flex items-center gap-2.5">
          <div className="flex -space-x-1.5 flex-1">
            {["AK", "MR", "TP"].map((i) => (
              <div key={i} className="w-5 h-5 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">{i}</div>
            ))}
          </div>
          <IconBell size={13} className="text-foreground-dim" />
          <Link href="/dashboard/settings">
            <IconSettings size={13} className="text-foreground-dim hover:text-foreground transition-colors" />
          </Link>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile header */}
        <header className="lg:hidden h-14 shrink-0 flex items-center gap-4 px-4 border-b border-border bg-surface">
          <LogoMark />
          <span className="text-body-sm text-foreground font-medium flex-1">Acme Workspace</span>
          <NotificationBell unreadCount={4} onClick={() => setShowNotifications(true)} />
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        {/* Desktop header */}
        <header className="hidden lg:flex h-14 shrink-0 items-center gap-4 px-10 border-b border-border bg-surface">
          <span className="text-label-sm text-foreground-dim font-mono flex-1">Wednesday, March 4, 2026</span>
          <div className="relative w-48">
            <IconSearch size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-dim" />
            <input className="w-full h-7 bg-background border border-border pl-7 pr-3 text-xs font-mono placeholder:text-foreground-dim focus:outline-none focus:border-foreground-muted" placeholder="Search…" />
          </div>
          <NotificationBell unreadCount={4} onClick={() => setShowNotifications(true)} />
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        <main className="flex-1 overflow-auto bg-background">
          <div className="max-w-[1100px] mx-auto px-4 py-6 lg:px-10 lg:py-10 space-y-6 lg:space-y-8">

            {/* ── Greeting ──────────────────────────────────────────────── */}
            <div>
              <h1 className="text-module-lg font-medium text-foreground mb-1">
                {USER.greeting}, {USER.name}.
              </h1>
              <p className="text-body-sm text-foreground-muted">
                {ACTIVE_DEPTS.length} vepartment active
                &nbsp;·&nbsp; {activeDomains} of {totalDomains} domain active
                &nbsp;·&nbsp; {totalAgentsActive} of {totalAgents} agents online
              </p>
            </div>

            {/* ── Onboarding guide ──────────────────────────────────────── */}
            {showOnboarding && (
              <OnboardingGuide onDismiss={() => setShowOnboarding(false)} />
            )}

            {/* ── Ori command bar → opens Operations Agent ────────────── */}
            <div
              className="relative bg-surface cursor-pointer group hover:border-primary/40 transition-colors"
              style={{ border: "2px solid hsl(var(--foreground))" }}
              onClick={() => router.push("/dashboard/agent")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") router.push("/dashboard/agent"); }}
            >
              <DashboardCommandGuide />
              <div className="flex items-center gap-4 px-4 lg:px-6 h-14 lg:h-16">
                <div className="w-9 h-9 flex items-center justify-center border border-primary/30 bg-primary/5 shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors relative">
                  <IconOri size={20} strokeWidth={1.5} className="text-primary ori-idle" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-base font-mono text-foreground-dim group-hover:text-foreground-muted transition-colors">
                    Ask Ori anything...
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", oriStatus === "online" ? "bg-success" : oriStatus === "busy" ? "bg-warning" : "bg-foreground-dim")} />
                    <span className="text-label-sm text-foreground-dim font-mono hidden sm:inline">{oriStatus}</span>
                  </div>
                  <span className="text-label-md text-foreground-dim font-mono border border-border px-1.5 py-0.5">⌘K</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 lg:px-6 py-3 border-t border-border overflow-x-auto">
                <span className="text-label-sm text-foreground-dim mr-1">Try:</span>
                {QUICK_PROMPTS.map((label) => (
                  <button
                    key={label}
                    className="h-7 px-3 bg-background border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted text-label-sm transition-colors shrink-0"
                    onClick={(e) => { e.stopPropagation(); router.push("/dashboard/agent"); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Vepartments ───────────────────────────────────────────── */}
            <section className="relative">
              <DashboardVepartmentGuide />
              <div className="flex items-center justify-between mb-5">
                <p className="text-os-title-sm text-foreground-dim">VEPARTMENTS</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-label-sm text-foreground-dim">1 active</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
                {ACTIVE_DEPTS.map((dept) => (
                  <DeptCard key={dept.name} dept={dept} />
                ))}
              </div>

              {/* Locked + Add vepartment */}
              <div className="flex flex-wrap items-center gap-3 mt-3 px-1">
                <span className="text-label-sm text-foreground-dim">Not activated —</span>
                {LOCKED_DEPTS.map(({ name, Icon }) => (
                  <div key={name} className="flex items-center gap-1.5 opacity-40">
                    <Icon size={12} strokeWidth={1.5} className="text-foreground-dim" />
                    <span className="text-label-sm text-foreground-dim">{name}</span>
                  </div>
                ))}
                <button
                  onClick={() => setShowVepartmentModal(true)}
                  className="flex items-center gap-1.5 ml-auto text-foreground-dim hover:text-foreground transition-colors"
                >
                  <IconPlus size={11} />
                  <span className="text-label-sm">Add vepartment</span>
                </button>
              </div>
            </section>

            {/* ── Bottom: Activity · Calendar · Org Map ─────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-os-title-sm text-foreground-dim">RECENT ACTIVITY</p>
                  <div className="flex items-center gap-2">
                    <span className="text-label-sm text-foreground-dim font-mono">{activityEntries.length} events</span>
                    <button className="flex items-center gap-1 text-foreground-dim hover:text-foreground">
                      <span className="text-label-sm">View all</span>
                      <IconArrowUpRight size={11} />
                    </button>
                  </div>
                </div>
                {activityEntries.length === 0 ? (
                  <div className="flex items-center justify-center px-4 py-10 bg-surface border border-border-subtle">
                    <span className="text-label-sm text-foreground-dim font-mono">No activity yet</span>
                  </div>
                ) : (
                  <div className="space-y-px">
                    {activityEntries.slice(0, 6).map((entry) => {
                      const EntryIcon = ACTIVITY_ICON_MAP[entry.icon] ?? ACTIVITY_ICON_MAP.default;
                      return (
                        <div key={entry.id} className="flex items-start gap-3 px-4 py-3.5 bg-surface border border-border-subtle hover:border-border transition-colors">
                          <EntryIcon size={13} className="text-foreground-dim shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-body-sm text-foreground leading-snug">{entry.title}</p>
                            <p className="text-label-sm text-foreground-dim mt-0.5">{entry.dept} · {entry.context}</p>
                          </div>
                          <span className="text-label-sm text-foreground-dim font-mono shrink-0">{entry.time}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-os-title-sm text-foreground-dim">UPCOMING</p>
                  <IconCalendar size={13} className="text-foreground-dim" />
                </div>
                {UPCOMING.length === 0 ? (
                  <div className="flex items-center justify-center px-4 py-10 bg-surface border border-border-subtle">
                    <span className="text-label-sm text-foreground-dim font-mono">No upcoming events</span>
                  </div>
                ) : (
                  <div className="space-y-px">
                    {UPCOMING.map(({ day, time, label, dept }, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3.5 bg-surface border border-border-subtle">
                        <div className="shrink-0 w-12">
                          <p className="text-label-sm text-foreground-dim font-mono">{day}</p>
                          <p className="text-label-sm text-foreground-dim font-mono">{time}</p>
                        </div>
                        <div className="w-px shrink-0 mt-0.5 bg-border" style={{ height: 30 }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm text-foreground leading-snug">{label}</p>
                          <p className="text-label-sm text-foreground-dim mt-0.5">{dept}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Office Floor Plan */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-os-title-sm text-foreground-dim">OFFICE VIEW</p>
                  <div className="flex items-center gap-3">
                    <Link href="/dashboard/virtual-office" className="flex items-center gap-1 text-foreground-dim hover:text-foreground transition-colors">
                      <span className="text-label-sm">Virtual office</span>
                      <IconArrowUpRight size={11} />
                    </Link>
                    <div className="w-px h-3 bg-border" />
                    <Link href="/dashboard/org-map" className="flex items-center gap-1 text-foreground-dim hover:text-foreground transition-colors">
                      <span className="text-label-sm">Org chart</span>
                      <IconArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
                <Link href="/dashboard/virtual-office" className="block">
                  <OfficeMap />
                </Link>
              </div>

            </div>
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden shrink-0 h-14 border-t border-border bg-surface flex items-center">
          {[
            { Icon: IconHome,     label: "Home",     active: true,  href: "/dashboard" },
            { Icon: IconSearch,   label: "Search",   active: false, href: "#" },
            { Icon: IconBell,     label: "Alerts",   active: false, href: "#" },
            { Icon: IconSettings, label: "Settings", active: false, href: "/dashboard/settings" },
          ].map(({ Icon, label, active, href }) => (
            <Link key={label} href={href} className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-2", active ? "text-foreground" : "text-foreground-dim")}>
              <Icon size={16} strokeWidth={1.5} />
              <span className="text-[9px] font-mono uppercase tracking-wider">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Vepartment modal ──────────────────────────────────────────────── */}
      {showVepartmentModal && (
        <VepartmentModal onClose={() => setShowVepartmentModal(false)} />
      )}

      {/* ── Notification center ─────────────────────────────────────────── */}
      <NotificationCenter
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* ── User guide — auto-opens after account creation ───────────────── */}
      <UserGuide
        open={showUserGuide}
        onClose={() => setShowUserGuide(false)}
      />
    </div>
  );
}
