"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  IconHome, IconSearch, IconBell, IconSettings, IconLock, IconPlus,
  IconBot, IconWorkflow, IconLayers, IconFileText,
  IconArrowUpRight, IconChevronRight, IconChevronDown,
  IconBarChart, IconX, IconCheck,
  IconTarget, IconUsers, IconDollar, IconWand, IconBrain,
  IconFilter, IconUser, IconScan, IconActivity, IconCrosshair,
  IconClock, IconFileBarChart, IconFileSpreadsheet,
  IconTrendingUp, IconLineChart, IconUserPlus, IconCompass,
  IconLightbulb, IconClipboardList, IconHistory,
  IconArchive, IconSettings2, IconBuilding, IconNetwork,
  IconMail, IconShare, IconMic,
  IconCalendarDays, IconLibrary, IconGauge, IconZap,
  IconMarketing,
  IconCampaign, IconContent, IconPerformance,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import { cn } from "@/lib/utils";
import { NotificationCenter, NotificationBell } from "@/components/notifications/NotificationCenter";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { MarketingDomainGuide } from "./guide";
import { useDomainProgress, LAYER_ORDER, type LayerStatus } from "@/lib/domain-progress-store";
import type { LayerSlug } from "@/lib/domain-requirements";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Data ─────────────────────────────────────────────────────────────────────

const DEPT = {
  name: "Marketing", colorVar: "marketing", Icon: IconMarketing,
  domains: 1, agents: 6,
};

const ACTIVE_DOMAINS = [
  {
    name: "Social & Messaging", Icon: IconSocialMessaging,
    desc: "Schedule, publish, and analyze social media content across all platforms.",
    agents: [
      { name: "Rules & Context Manager", Icon: IconLibrary      },
      { name: "Strategy Planner",        Icon: IconCompass      },
      { name: "Content Creator",         Icon: IconCalendarDays },
      { name: "Quality Reviewer",        Icon: IconGauge        },
      { name: "Performance Optimizer",   Icon: IconUserPlus     },
      { name: "Innovation Explorer",     Icon: IconZap          },
    ],
    workflows: 6, lastRun: "15m ago",
    href: "/dashboard/marketing/social-messaging",
  },
];

const LOCKED_DOMAINS = [
  { name: "Campaign Planning",     Icon: IconCampaign    },
  { name: "Content Creation",      Icon: IconContent     },
  { name: "Performance Analytics", Icon: IconPerformance },
  { name: "Customer Insights",     Icon: IconUsers       },
  { name: "Trend Analysis",        Icon: IconTrendingUp  },
];

const ADDABLE_DOMAINS = [
  {
    name: "Email Marketing", Icon: IconMail,
    desc: "Manage email campaigns, automation sequences, and subscriber segments.",
    agents: ["Email Campaign Manager", "Automation Builder", "List Segmentation Agent"],
    workflows: ["Email Sequence Builder", "A/B Test Runner", "Unsubscribe Manager"],
  },
  {
    name: "Social Media", Icon: IconShare,
    desc: "Schedule, publish, and analyze social media content across all platforms.",
    agents: ["Social Scheduler", "Engagement Analyst", "Content Curator"],
    workflows: ["Post Scheduler", "Engagement Monitor", "Hashtag Optimizer"],
  },
  {
    name: "SEO & Growth", Icon: IconTrendingUp,
    desc: "Optimize content for search engines and drive organic traffic.",
    agents: ["Keyword Researcher", "SEO Auditor", "Content Gap Analyst"],
    workflows: ["Keyword Analysis", "Site Audit", "Backlink Monitor"],
  },
  {
    name: "Brand Voice", Icon: IconMic,
    desc: "Maintain consistent brand messaging and tone across all channels.",
    agents: ["Brand Tone Monitor", "Messaging Agent", "Voice Guide Writer"],
    workflows: ["Brand Audit", "Tone Analysis", "Style Guide Update"],
  },
  {
    name: "Market Research", Icon: IconSearch,
    desc: "Conduct market surveys, analyze competition, and surface opportunities.",
    agents: ["Market Analyst", "Survey Designer", "Opportunity Scanner"],
    workflows: ["Market Survey", "Competitor Analysis", "Opportunity Report"],
  },
  {
    name: "Paid Advertising", Icon: IconDollar,
    desc: "Manage paid campaigns across search, social, and display networks.",
    agents: ["Ad Campaign Manager", "Bid Optimizer", "Creative Tester"],
    workflows: ["Campaign Setup", "Budget Optimizer", "Performance Reporter"],
  },
];

const RECENT_RUNS: { name: string; status: string; time: string }[] = [];

const ASSETS: { Icon: AnyIcon; name: string; time: string }[] = [];

const INSIGHTS: { label: string; value: string; note: string }[] = [];

const APPROVAL_TASKS: { title: string; domain: string; agent: string; time: string }[] = [];

const ALL_DEPTS = [
  { name: "Marketing", Icon: IconMarketing, colorVar: "marketing", active: true, current: true },
];

const LAYERS = [
  { name: "Foundation", short: "FOUND",  Icon: IconLayers,     color: "#8C90A0" },
  { name: "Strategy",   short: "STRAT",  Icon: IconTarget,     color: "#7B9EB8" },
  { name: "Execution",  short: "EXEC",   Icon: IconWorkflow,   color: "#B89560" },
  { name: "Monitoring", short: "MON",    Icon: IconActivity,   color: "#5FA89A" },
  { name: "Growth",     short: "GROWTH", Icon: IconTrendingUp, color: "#7BA680" },
  { name: "Innovation", short: "INNOV",  Icon: IconLightbulb,  color: "#9E87B5" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── Add domain modal (list) ───────────────────────────────────────────────────

function AddDomainModal({
  deptColor,
  onSelectDomain,
  onClose,
}: {
  deptColor: string;
  onSelectDomain: (d: typeof ADDABLE_DOMAINS[0]) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-background/90" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
        <div className="bg-surface border border-border w-full max-w-[800px] max-h-[80vh] flex flex-col pointer-events-auto">

          {/* Header */}
          <div className="flex items-center justify-between px-5 md:px-8 py-5 md:py-6 border-b border-border shrink-0">
            <div>
              <p className="text-os-title-sm text-foreground-dim mb-1.5">MARKETING</p>
              <h2 className="text-module-md font-semibold text-foreground">Add a domain</h2>
              <p className="text-body-sm text-foreground-muted mt-1">Select a domain to activate inside Marketing.</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors"
            >
              <IconX size={14} />
            </button>
          </div>

          {/* Domain grid */}
          <div className="overflow-auto p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ADDABLE_DOMAINS.map((domain) => (
              <button
                key={domain.name}
                onClick={() => onSelectDomain(domain)}
                className="group text-left bg-background border border-dashed border-border hover:border-foreground-dim hover:bg-surface-raised transition-colors p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 flex items-center justify-center border border-border group-hover:border-foreground-muted transition-colors shrink-0">
                    <domain.Icon size={15} strokeWidth={1.5} className="text-foreground-dim" />
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center border border-dashed border-border group-hover:border-foreground-dim transition-colors">
                    <IconPlus size={11} className="text-foreground-dim" />
                  </div>
                </div>
                <div>
                  <p className="text-body-sm font-medium text-foreground mb-1">{domain.name}</p>
                  <p className="text-label-sm text-foreground-muted leading-relaxed line-clamp-2">{domain.desc}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconBot size={10} className="text-foreground-dim" />
                  <span className="text-body-sm text-foreground-muted font-mono">{domain.agents.length} agents</span>
                  <div className="w-px h-3 bg-border mx-0.5" />
                  <IconWorkflow size={10} className="text-foreground-dim" />
                  <span className="text-body-sm text-foreground-muted font-mono">{domain.workflows.length} workflows</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Domain detail modal ───────────────────────────────────────────────────────

function DomainDetailModal({
  domain,
  deptColor,
  onClose,
  onAdd,
}: {
  domain: typeof ADDABLE_DOMAINS[0];
  deptColor: string;
  onClose: () => void;
  onAdd: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-60 bg-background/60" onClick={onClose} />
      <div className="fixed inset-0 z-70 flex items-center justify-center p-4 md:p-10 pointer-events-none">
        <div
          className="bg-surface border border-border w-full max-w-[520px] flex flex-col pointer-events-auto"
          style={{ borderTopColor: deptColor, borderTopWidth: 3 }}
        >
          <div className="flex items-start justify-between px-7 py-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                <domain.Icon size={20} strokeWidth={1.5} className="text-foreground-muted" />
              </div>
              <div>
                <h2 className="text-module-md font-semibold text-foreground mb-1">{domain.name}</h2>
                <p className="text-body-sm text-foreground-muted leading-relaxed">{domain.desc}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground transition-colors shrink-0 ml-4"
            >
              <IconX size={13} />
            </button>
          </div>

          <div className="px-7 py-5 border-b border-border">
            <p className="text-os-title-sm text-foreground-muted mb-3">AGENTS</p>
            <div className="divide-y divide-border-subtle">
              {domain.agents.map((a) => (
                <div key={a} className="flex items-center gap-3 py-2.5">
                  <div className="w-6 h-6 flex items-center justify-center border border-border shrink-0">
                    <IconBot size={12} strokeWidth={1.5} className="text-foreground-dim" />
                  </div>
                  <span className="text-body-sm text-foreground">{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-7 py-5 border-b border-border">
            <p className="text-os-title-sm text-foreground-muted mb-3">WORKFLOWS</p>
            <div className="flex flex-wrap gap-1.5">
              {domain.workflows.map((w) => (
                <span key={w} className="text-body-sm text-foreground-muted border border-border-subtle px-2.5 py-1 bg-background">
                  {w}
                </span>
              ))}
            </div>
          </div>

          <div className="px-7 py-5">
            <button
              onClick={onAdd}
              className="flex items-center gap-2 h-9 px-5 border border-border text-foreground hover:border-foreground-muted transition-colors"
              style={{ borderTopColor: deptColor, borderTopWidth: 1.5 }}
            >
              <IconPlus size={13} />
              <span className="text-body-sm font-medium">Add to Marketing</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Active domain card ────────────────────────────────────────────────────────

function ActiveDomainCard({ domain, deptColor }: { domain: typeof ACTIVE_DOMAINS[0]; deptColor: string }) {
  const { getLayerStatus, getDomainCompletionPercent } = useDomainProgress();
  const domainKey = "marketing:social-messaging";
  const domainPercent = getDomainCompletionPercent(domainKey);

  return (
    <div
      className="bg-surface border border-border flex flex-col"
      style={{ borderTopColor: deptColor, borderTopWidth: 2 }}
    >
      <div className="px-5 pt-5 pb-4 border-b border-border-subtle">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 flex items-center justify-center border border-border shrink-0 mt-0.5">
            <domain.Icon size={16} strokeWidth={1.5} className="text-foreground-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-module-sm font-semibold text-foreground mb-1">{domain.name}</p>
            <p className="text-body-sm text-foreground-muted leading-snug">{domain.desc}</p>
          </div>
          <Link href={domain.href} className="flex items-center gap-1 border border-border px-2.5 py-1.5 shrink-0 text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
            <span className="text-label-sm">Open</span>
            <IconArrowUpRight size={11} />
          </Link>
        </div>

        {/* Domain progress bar */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-1 bg-background border border-border-subtle overflow-hidden">
            <div
              className="h-full transition-all duration-300 bg-primary"
              style={{ width: `${domainPercent}%` }}
            />
          </div>
          <span className="text-label-sm text-foreground-dim font-mono">{domainPercent}%</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border-subtle bg-surface-raised">
          <IconBot size={10} className="text-foreground-muted" />
          <span className="text-os-title-sm text-foreground-muted">LAYERS</span>
          <span className="text-body-sm text-foreground-muted ml-auto font-mono">{domain.agents.length}/6 agents</span>
        </div>
        {LAYERS.map((layer, i) => {
          const agent = domain.agents[i];
          const LayerIcon = layer.Icon;
          const slug = LAYER_ORDER[i] as LayerSlug;
          const layerStatus: LayerStatus = getLayerStatus(domainKey, slug);
          const isLocked = layerStatus === "locked";
          const isCompleted = layerStatus === "completed";

          return (
            <div
              key={layer.name}
              className={cn(
                "flex items-center px-5 py-2.5 border-b border-border-subtle last:border-0",
                isLocked && "opacity-35"
              )}
            >
              {/* Layer label */}
              <div className="flex items-center gap-1.5 w-[84px] shrink-0">
                {isLocked ? (
                  <IconLock size={10} className="text-foreground-dim shrink-0" />
                ) : isCompleted ? (
                  <IconCheck size={12} strokeWidth={2} style={{ color: layer.color }} className="shrink-0" />
                ) : (
                  <LayerIcon size={12} strokeWidth={1.5} style={{ color: layer.color }} className="shrink-0" />
                )}
                <span className="text-[9px] font-mono tracking-[0.05em] uppercase" style={{ color: isLocked ? undefined : layer.color }}>{layer.short}</span>
              </div>
              <div className="w-px h-3.5 bg-border/50 shrink-0 mr-3" />
              {/* Agent */}
              {isLocked ? (
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="w-5 h-5 border border-dashed border-border shrink-0" />
                  <span className="text-label-sm text-foreground-dim font-mono">Locked</span>
                </div>
              ) : agent ? (
                <Link href={`${domain.href}/agent`} className="flex items-center gap-2.5 flex-1 min-w-0 hover:text-foreground group">
                  <div className="w-5 h-5 flex items-center justify-center border border-border shrink-0 group-hover:border-foreground-muted transition-colors">
                    <agent.Icon size={11} strokeWidth={1.5} className="text-foreground-muted group-hover:text-foreground transition-colors" />
                  </div>
                  <span className="text-body-sm text-foreground truncate group-hover:text-foreground">{agent.name}</span>
                  {isCompleted && <IconCheck size={10} style={{ color: layer.color }} className="shrink-0" />}
                </Link>
              ) : (
                <div className="flex items-center gap-2.5 flex-1 min-w-0 opacity-40">
                  <div className="w-5 h-5 border border-dashed border-border shrink-0" />
                  <div className="h-2 w-28 bg-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border-subtle">
        <div className="flex items-center gap-4 px-5 py-3 border-b border-border-subtle bg-surface-raised">
          <div className="flex items-center gap-1.5">
            <IconWorkflow size={10} className="text-foreground-muted" />
            <span className="text-body-sm text-foreground-muted font-mono">{domain.workflows} workflows</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5">
            <IconClock size={10} className="text-foreground-muted" />
            <span className="text-body-sm text-foreground-muted font-mono">Last run {domain.lastRun}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const [taskStates, setTaskStates] = useState<Record<number, "approved" | "rejected" | null>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const deptColor    = `hsl(var(--dept-${DEPT.colorVar}-main))`;
  const pendingCount = APPROVAL_TASKS.filter((_, i) => !taskStates[i]).length;

  function handleTask(i: number, action: "approved" | "rejected") {
    setTaskStates(prev => ({ ...prev, [i]: action }));
  }

  return (
    <div className="flex bg-background text-foreground h-screen overflow-hidden w-full">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="w-[200px] shrink-0 hidden lg:flex flex-col bg-surface border-r border-border overflow-y-auto">
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
          <LogoMark />
          <p className="text-body-sm text-foreground font-medium flex-1 truncate">Acme Workspace</p>
          <IconChevronRight size={13} className="text-foreground-dim shrink-0" />
        </div>

        <nav className="px-3 pt-4 pb-3 space-y-px border-b border-border">
          {[
            { Icon: IconHome,   label: "Dashboard" },
            { Icon: IconLayers, label: "Assets"    },
            { Icon: IconSearch, label: "Search"    },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 px-3 py-2 text-foreground-muted hover:text-foreground transition-colors cursor-pointer">
              <Icon size={14} strokeWidth={1.5} className="shrink-0" />
              <span className="text-body-sm flex-1">{label}</span>
            </div>
          ))}
        </nav>

        <div className="flex-1 px-3 pt-4 overflow-auto">
          <p className="text-os-title-sm text-foreground-dim px-3 mb-3">VEPARTMENTS</p>
          {ALL_DEPTS.filter(d => d.active).map(({ name, Icon, colorVar, current }) => (
            <div key={name}>
              <div
                className={cn("flex items-center gap-2.5 px-3 py-2.5 mb-px cursor-pointer", current ? "bg-surface-raised text-foreground" : "text-foreground-muted hover:bg-surface-raised hover:text-foreground transition-colors")}
              >
                <Icon size={14} strokeWidth={1.5} className="shrink-0" />
                <span className={cn("text-body-sm flex-1 font-medium")}>{name}</span>
                {current
                  ? <IconChevronDown size={11} className="text-foreground-dim shrink-0 cursor-pointer" onClick={() => setSidebarOpen(v => !v)} />
                  : <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />}
              </div>
              {current && sidebarOpen && (
                <div className="ml-3 pl-3 border-l border-border-subtle mb-1">
                  {ACTIVE_DOMAINS.map(d => (
                    <div key={d.name} className="flex items-center gap-2 px-2 py-1.5 text-foreground-muted hover:text-foreground cursor-pointer transition-colors">
                      <d.Icon size={11} strokeWidth={1.5} className="shrink-0" />
                      <span className="text-body-sm truncate">{d.name}</span>
                    </div>
                  ))}
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
            {["AK", "MR", "TP"].map((i) => (
              <div key={i} className="w-5 h-5 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">{i}</div>
            ))}
          </div>
          <IconBell size={13} className="text-foreground-dim" />
          <IconSettings size={13} className="text-foreground-dim" />
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile header */}
        <header className="lg:hidden h-14 shrink-0 flex items-center gap-4 px-4 border-b border-border bg-surface">
          <LogoMark />
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-label-sm text-foreground-dim font-mono">Dashboard</span>
            <span className="text-label-sm text-foreground-dim">/</span>
            <span className="text-label-sm text-foreground font-mono font-medium truncate">Marketing</span>
          </div>
          <NotificationBell unreadCount={4} onClick={() => setShowNotifications(true)} />
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        {/* Desktop header */}
        <header className="hidden lg:flex h-14 shrink-0 items-center gap-4 px-10 border-b border-border bg-surface">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-label-sm text-foreground-dim font-mono">Dashboard</span>
            <span className="text-label-sm text-foreground-dim">/</span>
            <span className="text-label-sm text-foreground font-mono font-medium">Marketing</span>
          </div>
          <div className="relative w-48">
            <IconSearch size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-dim" />
            <input className="w-full h-7 bg-background border border-border pl-7 pr-3 text-xs font-mono placeholder:text-foreground-dim focus:outline-none focus:border-foreground-muted" placeholder="Search…" />
          </div>
          <NotificationBell unreadCount={4} onClick={() => setShowNotifications(true)} />
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        <main className="flex-1 overflow-auto bg-background">
          <div className="px-4 py-6 lg:px-10 lg:py-8 space-y-6 lg:space-y-8">

            {/* ── 1. Department header ────────────────────────────────── */}
            <div
              className="bg-surface border border-border px-4 py-5 md:px-8 md:py-6"
              style={{ borderTopColor: deptColor, borderTopWidth: 3 }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 flex items-center justify-center border border-border shrink-0">
                    <DEPT.Icon size={26} strokeWidth={1.5} className="text-foreground-muted" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <h1 className="text-module-lg font-semibold text-foreground">{DEPT.name}</h1>
                      <span className="text-os-title-sm text-foreground-dim border border-border px-1.5 py-0.5">ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <IconLayers size={11} className="text-foreground-muted" />
                        <span className="text-label-sm text-foreground-muted font-mono">{DEPT.domains} domains</span>
                      </div>
                      <div className="w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5">
                        <IconBot size={11} className="text-foreground-muted" />
                        <span className="text-label-sm text-foreground-muted font-mono">{DEPT.agents} active agents</span>
                      </div>
                      {pendingCount > 0 && (
                        <>
                          <div className="w-px h-3 bg-border" />
                          <div className="flex items-center gap-1.5">
                            <IconClipboardList size={11} className="text-warning" />
                            <span className="text-label-sm text-warning font-mono">{pendingCount} pending approval</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Link href="/dashboard/marketing/virtual-office" className="flex items-center gap-2 h-8 px-4 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                    <IconBuilding size={11} />
                    <span className="text-label-sm">Office View</span>
                  </Link>
                  <Link href="/dashboard/marketing/org-map" className="flex items-center gap-2 h-8 px-4 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                    <IconNetwork size={11} />
                    <span className="text-label-sm">Org Chart</span>
                  </Link>
                  <button className="flex items-center gap-2 h-8 px-4 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                    <IconArchive size={11} />
                    <span className="text-label-sm">Assets</span>
                  </button>
                  <button className="flex items-center gap-2 h-8 px-4 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                    <IconSettings2 size={11} />
                    <span className="text-label-sm">Settings</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Vepartment Supervisor chat bar ─────────────────────── */}
            <ChatPanel
              department="Marketing"
              supervisorName="Marketing Supervisor"
              Icon={IconMarketing}
              placeholder="Ask Marketing Supervisor..."
              emptyPrompt={"Ask anything about the Marketing department\nor cross-domain coordination."}
            />

            {/* ── 2. Operational panels row ───────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start">

              {/* Recent Runs */}
              <div className="bg-surface border border-border flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle shrink-0">
                  <p className="text-os-title-sm text-foreground-muted">RECENT RUNS</p>
                  <IconHistory size={11} className="text-foreground-muted" />
                </div>
                {RECENT_RUNS.length === 0 ? (
                  <div className="flex items-center justify-center px-4 py-8 flex-1">
                    <span className="text-label-sm text-foreground-dim font-mono">No runs yet</span>
                  </div>
                ) : RECENT_RUNS.map(({ name, status, time }, i) => (
                  <div key={i} className={cn("flex items-center gap-2 px-4 py-2.5", i < RECENT_RUNS.length - 1 && "border-b border-border-subtle")}>
                    <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", status === "Running" ? "bg-success" : "bg-foreground-dim")} />
                    <span className="text-body-sm text-foreground truncate flex-1">{name}</span>
                    <span className="text-label-sm text-foreground-muted font-mono shrink-0">{time}</span>
                  </div>
                ))}
              </div>

              {/* Assets & Outputs */}
              <div className="bg-surface border border-border flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle shrink-0">
                  <p className="text-os-title-sm text-foreground-muted">ASSETS & OUTPUTS</p>
                  <span className="text-body-sm text-foreground-muted font-mono">{ASSETS.length}</span>
                </div>
                {ASSETS.length === 0 ? (
                  <div className="flex items-center justify-center px-4 py-8 flex-1">
                    <span className="text-label-sm text-foreground-dim font-mono">No outputs yet</span>
                  </div>
                ) : ASSETS.map(({ Icon, name, time }, i) => (
                  <div key={i} className={cn("flex items-center gap-2 px-4 py-2.5 hover:bg-surface-raised transition-colors cursor-pointer", i < ASSETS.length - 1 && "border-b border-border-subtle")}>
                    <Icon size={12} className="text-foreground-muted shrink-0" />
                    <span className="text-body-sm text-foreground truncate flex-1">{name}</span>
                    <span className="text-label-sm text-foreground-muted font-mono shrink-0">{time}</span>
                  </div>
                ))}
              </div>

              {/* Insights */}
              <div className="bg-surface border border-border flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle shrink-0">
                  <p className="text-os-title-sm text-foreground-muted">INSIGHTS</p>
                  <IconLightbulb size={11} className="text-foreground-muted" />
                </div>
                {INSIGHTS.length === 0 ? (
                  <div className="flex items-center justify-center px-4 py-8 flex-1">
                    <span className="text-label-sm text-foreground-dim font-mono">No data yet</span>
                  </div>
                ) : INSIGHTS.map(({ label, value, note }, i) => (
                  <div key={label} className={cn("flex items-center justify-between px-4 py-2.5", i < INSIGHTS.length - 1 && "border-b border-border-subtle")}>
                    <div>
                      <p className="text-body-sm text-foreground-muted">{label}</p>
                      <p className="text-body-sm text-foreground font-medium font-mono">{value}</p>
                    </div>
                    <span className="text-body-sm text-foreground-muted">{note}</span>
                  </div>
                ))}
              </div>

              {/* Approvals */}
              <div className="bg-surface border border-border flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle shrink-0">
                  <p className="text-os-title-sm text-foreground-muted">APPROVALS</p>
                </div>
                {APPROVAL_TASKS.length === 0 ? (
                  <div className="flex items-center justify-center px-4 py-8 flex-1">
                    <span className="text-label-sm text-foreground-dim font-mono">No pending approvals</span>
                  </div>
                ) : APPROVAL_TASKS.map(({ title, agent, time }, i) => {
                  const state = taskStates[i];
                  return (
                    <div key={i} className={cn("px-4 py-2.5 flex flex-col gap-1.5", i < APPROVAL_TASKS.length - 1 && "border-b border-border-subtle", state && "opacity-40")}>
                      <div className="flex items-center gap-2">
                        {!state && <div className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />}
                        <span className="text-body-sm text-foreground truncate flex-1">{title}</span>
                        <span className="text-label-sm text-foreground-muted font-mono shrink-0">{time}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-body-sm text-foreground-muted truncate flex-1">{agent}</span>
                        {!state ? (
                          <div className="flex gap-1 shrink-0">
                            <button onClick={() => handleTask(i, "rejected")} className="w-5 h-5 flex items-center justify-center border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                              <IconX size={9} />
                            </button>
                            <button onClick={() => handleTask(i, "approved")} className="w-5 h-5 flex items-center justify-center border border-success/50 text-success hover:bg-success/5 transition-colors">
                              <IconCheck size={9} />
                            </button>
                          </div>
                        ) : (
                          <span className={cn("text-label-sm font-mono shrink-0", state === "approved" ? "text-success" : "text-foreground-dim")}>
                            {state === "approved" ? "Approved" : "Rejected"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* ── 3. Active domains grid ──────────────────────────────── */}
            <section className="relative">
              <MarketingDomainGuide />
              <div className="flex items-center justify-between mb-5">
                <p className="text-os-title-sm text-foreground-dim">ACTIVE DOMAINS</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-label-sm text-foreground-dim font-mono">1 active</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ACTIVE_DOMAINS.map((domain) => (
                  <ActiveDomainCard key={domain.name} domain={domain} deptColor={deptColor} />
                ))}

                {/* Locked domain slots — activate step by step */}
                {LOCKED_DOMAINS.map(({ name, Icon }) => (
                  <div
                    key={name}
                    className="border border-dashed border-border bg-surface flex flex-col items-center justify-center gap-3 min-h-[200px] opacity-30 select-none"
                  >
                    <div className="w-9 h-9 flex items-center justify-center border border-dashed border-border shrink-0">
                      <Icon size={16} strokeWidth={1.5} className="text-foreground-dim" />
                    </div>
                    <div className="text-center">
                      <p className="text-body-sm text-foreground-dim font-medium">{name}</p>
                      <div className="flex items-center justify-center gap-1.5 mt-1.5">
                        <IconLock size={9} className="text-foreground-dim" />
                        <span className="text-label-sm text-foreground-dim">Locked</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden shrink-0 h-14 border-t border-border bg-surface flex items-center">
          {[
            { Icon: IconHome,     label: "Home",     active: false },
            { Icon: IconSearch,   label: "Search",   active: false },
            { Icon: IconBell,     label: "Alerts",   active: pendingCount > 0 },
            { Icon: IconSettings, label: "Settings", active: false },
          ].map(({ Icon, label, active }) => (
            <button key={label} className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-2", active ? "text-foreground" : "text-foreground-dim")}>
              <Icon size={16} strokeWidth={1.5} />
              <span className="text-[9px] font-mono uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── Notification center ─────────────────────────────────────────── */}
      <NotificationCenter
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
