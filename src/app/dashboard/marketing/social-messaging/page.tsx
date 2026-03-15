"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  IconHome, IconSearch, IconBell, IconSettings, IconLock,
  IconWorkflow, IconLayers, IconChevronRight, IconChevronDown,
  IconPlus,
  IconTarget, IconActivity, IconLightbulb, IconTrendingUp,
  IconCompass, IconGauge, IconUserPlus, IconZap,
  IconUsers,
  IconMessage, IconSend,
  IconCalendarDays, IconLibrary,
  IconFile, IconFileText, IconFileSpreadsheet, IconImage, IconUpload, IconFolder,
  IconMarketing,
  IconCampaign, IconContent, IconPerformance,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import { cn } from "@/lib/utils";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { NotificationCenter, NotificationBell } from "@/components/notifications/NotificationCenter";
import { SocialMessagingChatGuide, DomainOfficeGuide, LayerAgentGuide } from "./guide";
import { IconX, IconArrowUpRight, IconBot, IconInfo, IconCheck } from "@/components/icons";
import { useActivity } from "@/lib/activity-store";
import { useDomainProgress, LAYER_ORDER, type LayerStatus } from "@/lib/domain-progress-store";
import type { LayerSlug } from "@/lib/domain-requirements";
import { LayerRequirementChecklist } from "@/components/domain/LayerRequirementChecklist";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Data ─────────────────────────────────────────────────────────────────────

interface AgentDetail {
  name: string;
  code: string;
  Icon: AnyIcon;
  role: string;
  status: "active" | "draft" | "deactivated";
  capabilities: string[];
  inputs: string[];
  outputs: string[];
}

interface LayerData {
  name: string;
  short: string;
  Icon: AnyIcon;
  color: string;
  bgClass: string;
  agents: AgentDetail[];
}

const LAYERS_DATA: LayerData[] = [
  {
    name: "Foundation", short: "FOUND", Icon: IconLayers as AnyIcon, color: "#8C90A0", bgClass: "bg-[#8C90A0]/5",
    agents: [
      {
        name: "Rules & Context Manager", code: "SM-F1", Icon: IconLibrary as AnyIcon,
        role: "Defines operational rules, assembles context from knowledge sources, and enforces policies before and after agent execution.",
        status: "active",
        capabilities: ["Policy enforcement", "Knowledge assembly", "Pre/post execution checks", "Context window management"],
        inputs: ["Brand guidelines", "Compliance rules", "Knowledge base documents"],
        outputs: ["Context packages", "Policy validation reports", "Rule violation alerts"],
      },
    ],
  },
  {
    name: "Strategy", short: "STRAT", Icon: IconTarget as AnyIcon, color: "#7B9EB8", bgClass: "bg-[#7B9EB8]/5",
    agents: [
      {
        name: "Strategy Planner", code: "SM-S1", Icon: IconCompass as AnyIcon,
        role: "Develops social media strategies aligned with brand goals, audience segments, and platform-specific best practices.",
        status: "active",
        capabilities: ["Audience analysis", "Platform strategy", "Campaign planning", "Goal alignment"],
        inputs: ["Brand objectives", "Audience data", "Market trends", "Competitor analysis"],
        outputs: ["Strategy documents", "Campaign briefs", "Content calendars", "Platform playbooks"],
      },
    ],
  },
  {
    name: "Execution", short: "EXEC", Icon: IconWorkflow as AnyIcon, color: "#B89560", bgClass: "bg-[#B89560]/5",
    agents: [
      {
        name: "Content Creator", code: "SM-E1", Icon: IconCalendarDays as AnyIcon,
        role: "Generates, schedules, and publishes social media content across all connected platforms.",
        status: "active",
        capabilities: ["Content generation", "Multi-platform publishing", "Scheduling automation", "A/B variant creation"],
        inputs: ["Strategy briefs", "Brand voice guide", "Asset library", "Publishing schedule"],
        outputs: ["Social posts", "Visual assets", "Scheduled content queue", "Platform-specific adaptations"],
      },
    ],
  },
  {
    name: "Monitoring", short: "MON", Icon: IconActivity as AnyIcon, color: "#5FA89A", bgClass: "bg-[#5FA89A]/5",
    agents: [
      {
        name: "Quality Reviewer", code: "SM-M1", Icon: IconGauge as AnyIcon,
        role: "Reviews all outputs for quality, brand alignment, compliance, and assigns quality scores.",
        status: "active",
        capabilities: ["Quality scoring", "Brand alignment check", "Compliance verification", "Tone analysis"],
        inputs: ["Draft content", "Brand guidelines", "Quality thresholds", "Compliance policies"],
        outputs: ["Quality scores", "Review reports", "Revision requests", "Compliance flags"],
      },
    ],
  },
  {
    name: "Growth", short: "GROWTH", Icon: IconTrendingUp as AnyIcon, color: "#7BA680", bgClass: "bg-[#7BA680]/5",
    agents: [
      {
        name: "Performance Optimizer", code: "SM-G1", Icon: IconUserPlus as AnyIcon,
        role: "Analyzes engagement metrics, audience growth trends, and optimizes content strategy for maximum reach.",
        status: "active",
        capabilities: ["Engagement analysis", "Growth tracking", "Content optimization", "Audience segmentation"],
        inputs: ["Platform analytics", "Engagement data", "Audience demographics", "Content performance history"],
        outputs: ["Performance reports", "Optimization recommendations", "Growth forecasts", "Audience insights"],
      },
    ],
  },
  {
    name: "Innovation", short: "INNOV", Icon: IconLightbulb as AnyIcon, color: "#9E87B5", bgClass: "bg-[#9E87B5]/5",
    agents: [
      {
        name: "Innovation Explorer", code: "SM-I1", Icon: IconZap as AnyIcon,
        role: "Identifies emerging trends, viral content opportunities, and experiments with new formats and platforms.",
        status: "draft",
        capabilities: ["Trend detection", "Viral opportunity scoring", "Format experimentation", "Platform scouting"],
        inputs: ["Trending topics", "Industry feeds", "Competitor content", "Platform updates"],
        outputs: ["Trend reports", "Experiment proposals", "Format recommendations", "Opportunity briefs"],
      },
    ],
  },
];

const AGENT_CATALOG: { name: string; desc: string; Icon: AnyIcon; tags: string[] }[] = [
  { name: "Social Strategy Agent", desc: "Develops comprehensive social media strategies aligned with brand goals.", Icon: IconCompass as AnyIcon, tags: ["strategy", "planning"] },
  { name: "Trend Scout", desc: "Identifies emerging trends and viral content opportunities across platforms.", Icon: IconZap as AnyIcon, tags: ["trends", "research"] },
  { name: "Community Manager", desc: "Manages community engagement, moderation, and relationship building.", Icon: IconUsers as AnyIcon, tags: ["community", "engagement"] },
  { name: "Analytics Reporter", desc: "Generates detailed performance reports and actionable insights.", Icon: IconActivity as AnyIcon, tags: ["analytics", "reporting"] },
  { name: "Content Repurposer", desc: "Transforms content across formats for different platform requirements.", Icon: IconContent as AnyIcon, tags: ["content", "automation"] },
  { name: "Influencer Scout", desc: "Identifies and evaluates potential brand collaborators and influencers.", Icon: IconSearch as AnyIcon, tags: ["partnerships", "outreach"] },
];

const ASSET_CATEGORIES = [
  { name: "Documents", Icon: IconFileText as AnyIcon, count: 24, size: "12.4 MB" },
  { name: "Images", Icon: IconImage as AnyIcon, count: 156, size: "2.1 GB" },
  { name: "Data Files", Icon: IconFileSpreadsheet as AnyIcon, count: 8, size: "45.2 MB" },
  { name: "Templates", Icon: IconFolder as AnyIcon, count: 12, size: "8.7 MB" },
];

const RECENT_ASSETS = [
  { name: "Q1-social-calendar.xlsx", type: "Spreadsheet", size: "2.4 MB", time: "2h ago" },
  { name: "brand-guidelines-v3.pdf", type: "Document", size: "8.1 MB", time: "4h ago" },
  { name: "instagram-templates.fig", type: "Template", size: "14.2 MB", time: "1d ago" },
  { name: "engagement-report-feb.csv", type: "Data", size: "1.1 MB", time: "2d ago" },
  { name: "campaign-brief-spring.docx", type: "Document", size: "340 KB", time: "3d ago" },
];

const CONNECTED_SOURCES = [
  { name: "Google Drive", status: "connected" as const },
  { name: "Notion", status: "connected" as const },
  { name: "Figma", status: "disconnected" as const },
];

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

// ── Agent Detail Modal ──────────────────────────────────────────────────────

function AgentDetailModal({
  agent,
  layerName,
  layerColor,
  onClose,
}: {
  agent: AgentDetail;
  layerName: string;
  layerColor: string;
  onClose: () => void;
}) {
  const AgentIcon = agent.Icon;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-background/90" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
        <div
          className="bg-surface border border-border w-full max-w-[560px] flex flex-col pointer-events-auto max-h-[85vh] overflow-y-auto"
          style={{ borderTopColor: layerColor, borderTopWidth: 3 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0">
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 flex items-center justify-center shrink-0 border"
                style={{ borderColor: layerColor, backgroundColor: `${layerColor}10` }}
              >
                <AgentIcon size={22} strokeWidth={1.5} style={{ color: layerColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground-dim">{agent.code}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: layerColor }}>{layerName}</span>
                </div>
                <h2 className="text-module-md font-semibold text-foreground">{agent.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <div className={cn(
                "px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border",
                agent.status === "active" && "text-success border-success/30 bg-success/5",
                agent.status === "draft" && "text-warning border-warning/30 bg-warning/5",
                agent.status === "deactivated" && "text-foreground-dim border-border bg-surface-raised",
              )}>
                {agent.status}
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors"
              >
                <IconX size={13} />
              </button>
            </div>
          </div>

          {/* Purpose */}
          <div className="px-6 py-4 border-b border-border">
            <p className="text-os-title-sm text-foreground-dim mb-2">PURPOSE</p>
            <p className="text-body-sm text-foreground-muted leading-relaxed">{agent.role}</p>
          </div>

          {/* Capabilities */}
          <div className="px-6 py-4 border-b border-border">
            <p className="text-os-title-sm text-foreground-dim mb-3">CAPABILITIES</p>
            <div className="flex flex-wrap gap-1.5">
              {agent.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-label-sm text-foreground-muted border border-border px-2.5 py-1 bg-background"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Inputs & Outputs */}
          <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
            <div className="px-6 py-4">
              <p className="text-os-title-sm text-foreground-dim mb-3">INPUTS</p>
              <div className="space-y-2">
                {agent.inputs.map((input) => (
                  <div key={input} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-foreground-dim shrink-0" />
                    <span className="text-label-sm text-foreground-muted">{input}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-os-title-sm text-foreground-dim mb-3">OUTPUTS</p>
              <div className="space-y-2">
                {agent.outputs.map((output) => (
                  <div key={output} className="flex items-center gap-2">
                    <div className="w-1 h-1 shrink-0" style={{ backgroundColor: layerColor }} />
                    <span className="text-label-sm text-foreground-muted">{output}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 flex items-center gap-3">
            <Link
              href="/dashboard/marketing/social-messaging/agent"
              className="flex items-center gap-2 h-8 px-4 border text-foreground-muted hover:text-foreground transition-colors"
              style={{ borderColor: layerColor }}
              onClick={onClose}
            >
              <span className="text-label-sm">Open full config</span>
              <IconArrowUpRight size={11} />
            </Link>
            <span className="text-label-sm text-foreground-dim font-mono">Layer: {layerName}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialMessagingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [section, setSection] = useState<"base" | "assets">("base");
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<{ agent: AgentDetail; layerName: string; layerColor: string } | null>(null);
  const { log } = useActivity();
  const { getLayerStatus, getCompletionPercent, getDomainCompletionPercent } = useDomainProgress();
  const DOMAIN_KEY = "marketing:social-messaging";

  function handleAgentClick(agent: AgentDetail, layerName: string, layerColor: string) {
    setSelectedAgent({ agent, layerName, layerColor });
    log({
      icon: "agent",
      title: `Viewed agent: ${agent.name}`,
      dept: "Marketing · Social & Messaging",
      context: `${layerName} layer · ${agent.code}`,
    });
  }
  const [catalogSearch, setCatalogSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const deptColor = `hsl(var(--dept-marketing-main))`;
  const totalAgents = LAYERS_DATA.reduce((sum, l) => sum + l.agents.length, 0);
  const activeLayers = LAYERS_DATA.filter(l => l.agents.length > 0).length;

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
                      <Link
                        key={d.name}
                        href={d.href}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 transition-colors",
                          isCurrent ? "text-foreground bg-surface-raised" : "text-foreground-muted hover:text-foreground cursor-pointer"
                        )}
                      >
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
          <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
            <span className="text-label-sm text-foreground-dim font-mono shrink-0">Marketing</span>
            <span className="text-label-sm text-foreground-dim shrink-0">/</span>
            <span className="text-label-sm text-foreground font-mono font-medium truncate">Social & Messaging</span>
          </div>
          <NotificationBell unreadCount={4} onClick={() => setShowNotifications(true)} />
        </header>

        {/* Desktop header */}
        <header className="hidden lg:flex h-14 shrink-0 items-center gap-4 px-10 border-b border-border bg-surface">
          <div className="flex items-center gap-2 flex-1">
            <Link href="/dashboard" className="text-label-sm text-foreground-dim font-mono hover:text-foreground-muted transition-colors">Dashboard</Link>
            <span className="text-label-sm text-foreground-dim">/</span>
            <Link href="/dashboard/marketing" className="text-label-sm text-foreground-dim font-mono hover:text-foreground-muted transition-colors">Marketing</Link>
            <span className="text-label-sm text-foreground-dim">/</span>
            <span className="text-label-sm text-foreground font-mono font-medium">Social & Messaging</span>
          </div>
          <div className="relative w-48">
            <IconSearch size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-dim" />
            <input className="w-full h-7 bg-background border border-border pl-7 pr-3 text-xs font-mono placeholder:text-foreground-dim focus:outline-none focus:border-foreground-muted" placeholder="Search…" />
          </div>
          <NotificationBell unreadCount={4} onClick={() => setShowNotifications(true)} />
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        <main className="flex-1 overflow-auto bg-background">
          <div className="px-4 py-6 lg:px-10 lg:py-8 space-y-6 lg:space-y-6">

            {/* ── 1. Domain Header ──────────────────────────────────────── */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0 border"
                  style={{ borderColor: deptColor, backgroundColor: `${deptColor}08` }}
                >
                  <IconMessage size={20} strokeWidth={1.5} style={{ color: deptColor }} />
                </div>
                <div>
                  <h1 className="text-module-lg font-semibold text-foreground">Social & Messaging</h1>
                  <p className="text-body-sm text-foreground-muted mt-0.5">Social Media & Communication Orchestration</p>
                  <p className="text-label-sm text-foreground-dim mt-2">{totalAgents} agents across {activeLayers} layers</p>
                </div>
              </div>
              <div
                className="self-start px-3 py-1 text-label-sm font-mono border"
                style={{ borderColor: deptColor, color: deptColor, backgroundColor: `${deptColor}0A` }}
              >
                ACTIVE
              </div>
            </div>

            {/* ── 2. Section Toggle ─────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setSection("base"); setActiveLayer(null); }}
                className={cn(
                  "h-7 px-4 text-label-sm font-mono transition-colors",
                  section === "base"
                    ? "bg-foreground text-background"
                    : "text-foreground-muted hover:text-foreground border border-border"
                )}
              >
                Domain Base
              </button>
              <button
                onClick={() => { setSection("assets"); setActiveLayer(null); }}
                className={cn(
                  "h-7 px-4 text-label-sm font-mono transition-colors",
                  section === "assets"
                    ? "bg-foreground text-background"
                    : "text-foreground-muted hover:text-foreground border border-border"
                )}
              >
                Assets
              </button>
            </div>

            {/* ── 3. Layer Tabs ─────────────────────────────────────────── */}
            {section === "base" && (
              <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
                <span className="text-[10px] uppercase text-foreground-dim font-mono tracking-wider shrink-0 pr-3">Layers</span>
                {LAYERS_DATA.map((layer, i) => {
                  const count = layer.agents.length;
                  const isActive = activeLayer === i;
                  const layerSlug = LAYER_ORDER[i] as LayerSlug;
                  const layerStatus: LayerStatus = getLayerStatus(DOMAIN_KEY, layerSlug);
                  const isLocked = layerStatus === "locked";
                  const isCompleted = layerStatus === "completed";
                  const LayerIcon = layer.Icon;
                  return (
                    <button
                      key={layer.name}
                      disabled={isLocked}
                      onClick={() => setActiveLayer(isActive ? null : i)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 text-body-sm font-mono whitespace-nowrap transition-colors border-b-2 -mb-px",
                        isActive
                          ? "text-foreground border-foreground"
                          : isLocked
                            ? "text-foreground-dim/30 border-transparent cursor-not-allowed"
                            : "text-foreground-muted border-transparent hover:text-foreground hover:border-foreground-muted"
                      )}
                    >
                      {isLocked ? (
                        <IconLock size={11} className="text-foreground-dim/30" />
                      ) : isCompleted ? (
                        <IconCheck size={13} strokeWidth={2} style={{ color: layer.color }} />
                      ) : (
                        <LayerIcon size={13} strokeWidth={1.5} style={{ color: isActive ? layer.color : undefined }} />
                      )}
                      {layer.name}
                      {isCompleted && <span className="text-[8px] ml-0.5" style={{ color: layer.color }}>&#10003;</span>}
                      {!isLocked && !isCompleted && ` (${count})`}
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Domain Base View ──────────────────────────────────────── */}
            {section === "base" && activeLayer === null && (
              <>
                {/* Chat Panel — connected to n8n RAG workflow */}
                <div className="relative">
                  <SocialMessagingChatGuide />
                </div>
                <ChatPanel
                  department="Marketing"
                  domain="Social & Messaging"
                  supervisorName="Social & Messaging Supervisor"
                />

                {/* Two-Column: Purpose & Supervisor | Org Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                  {/* Left: Purpose + Supervisor */}
                  <div className="space-y-5">
                    {/* Purpose */}
                    <div className="bg-surface border border-border p-5">
                      <h3 className="text-os-title-sm text-foreground-muted mb-3">DOMAIN PURPOSE</h3>
                      <p className="text-body-sm text-foreground-muted leading-relaxed">
                        Schedule, publish, and analyze social media content across all platforms.
                        Manage community engagement, monitor brand mentions, and grow audience
                        reach through data-driven social strategies and automated workflows.
                      </p>
                    </div>

                    {/* Supervisor */}
                    <div
                      className="bg-surface border p-5"
                      style={{ borderColor: deptColor, backgroundColor: `${deptColor}08` }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 flex items-center justify-center shrink-0 border"
                          style={{ borderColor: deptColor }}
                        >
                          <IconZap size={18} strokeWidth={1.5} style={{ color: deptColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-os-title-sm text-foreground-dim">SUPERVISOR</span>
                            <span className="text-label-sm text-foreground-dim font-mono">SM-SUPERVISOR</span>
                          </div>
                          <p className="text-module-sm font-semibold text-foreground mb-1">Social & Messaging Supervisor</p>
                          <p className="text-body-sm text-foreground-muted leading-relaxed">
                            Orchestrates all social media operations, delegates tasks to specialized
                            agents, and ensures consistent brand voice across platforms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Domain Office & Structure */}
                  <div className="relative bg-surface border border-border p-5">
                    <DomainOfficeGuide />
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-os-title-sm text-foreground-muted">SOCIAL & MESSAGING — OFFICE</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                          <span className="font-mono text-[7px] text-success/70 uppercase tracking-wider">LIVE</span>
                        </div>
                        <div className="w-px h-3 bg-border" />
                        <Link href="/dashboard/marketing/virtual-office" className="flex items-center gap-1 text-foreground-dim hover:text-foreground transition-colors">
                          <span className="text-label-sm">Full office</span>
                          <IconChevronRight size={10} />
                        </Link>
                        <Link href="/dashboard/marketing/org-map" className="flex items-center gap-1 text-foreground-dim hover:text-foreground transition-colors">
                          <span className="text-label-sm">Org chart</span>
                          <IconChevronRight size={10} />
                        </Link>
                      </div>
                    </div>

                    {/* Office floor plan with layer zones */}
                    <div className="relative bg-background border border-border overflow-hidden" style={{ height: 220 }}>
                      {/* Grid */}
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                          backgroundSize: "16px 16px",
                        }}
                      />

                      {/* Room border accent */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[2px]"
                        style={{ backgroundColor: `hsl(var(--dept-marketing-main) / 0.5)` }}
                      />

                      {/* Room label */}
                      <div className="absolute top-2 left-3 flex items-center gap-1.5">
                        <IconSocialMessaging size={10} strokeWidth={1.5} className="text-[hsl(var(--dept-marketing-main))]" />
                        <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-[hsl(var(--dept-marketing-main))]">
                          SOCIAL & MESSAGING
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-success/60" />
                      </div>

                      {/* Layer zones — 6 work areas */}
                      {LAYERS_DATA.map((layer, i) => {
                        const cols = 3;
                        const col = i % cols;
                        const row = Math.floor(i / cols);
                        const zoneW = 30;
                        const zoneH = 42;
                        const zoneX = 4 + col * (zoneW + 2);
                        const zoneY = 22 + row * (zoneH + 4);
                        return (
                          <div
                            key={layer.name}
                            className="absolute border border-border/15"
                            style={{
                              left: `${zoneX}%`,
                              top: zoneY,
                              width: `${zoneW}%`,
                              height: zoneH,
                              backgroundColor: `${layer.color}08`,
                              borderLeftColor: `${layer.color}30`,
                              borderLeftWidth: 2,
                            }}
                          >
                            <span
                              className="absolute top-0.5 left-1.5 font-mono text-[5px] uppercase tracking-[0.08em]"
                              style={{ color: `${layer.color}80` }}
                            >
                              {layer.short}
                            </span>
                            <div className="absolute" style={{ left: "35%", top: "45%" }}>
                              <div
                                className="w-[14px] h-[9px] border bg-surface-raised/50"
                                style={{ borderColor: `${layer.color}25` }}
                              />
                              <div
                                className="w-[5px] h-[5px] rounded-full mx-auto mt-[1px]"
                                style={{ backgroundColor: `${layer.color}18` }}
                              />
                            </div>
                          </div>
                        );
                      })}

                      {/* Walking agents */}
                      {LAYERS_DATA.flatMap((layer, layerIdx) =>
                        layer.agents.map((agent) => {
                          const walkAnims = ["vo-walk-1", "vo-walk-2", "vo-walk-3", "vo-walk-4", "vo-walk-5", "vo-walk-6"];
                          const durations = [24, 28, 20, 32, 26, 36];
                          return (
                            <div
                              key={agent.code}
                              className="absolute z-10"
                              title={`${agent.name} (${agent.code}) — ${layer.name}`}
                              style={{
                                animation: `${walkAnims[layerIdx % walkAnims.length]} ${durations[layerIdx % durations.length]}s linear infinite`,
                              }}
                            >
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-[8px] h-[8px] rounded-full border-[1.5px]"
                                  style={{
                                    borderColor: layer.color,
                                    backgroundColor: `${layer.color}33`,
                                    opacity: agent.status === "draft" ? 0.4 : 1,
                                  }}
                                />
                                <div
                                  className="w-[5px] h-[6px] -mt-[1px]"
                                  style={{
                                    backgroundColor: `${layer.color}88`,
                                    opacity: agent.status === "draft" ? 0.4 : 1,
                                    animation: "vo-idle-bob 2s ease-in-out infinite",
                                  }}
                                />
                                {agent.status === "active" && (
                                  <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full"
                                    style={{
                                      backgroundColor: layer.color,
                                      animation: `vo-pulse ${2.5 + layerIdx * 0.3}s ease-in-out infinite`,
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Agent roster with layer labels */}
                    <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-1">
                      {LAYERS_DATA.map((layer, layerIdx) => {
                        const slug = LAYER_ORDER[layerIdx] as LayerSlug;
                        const lStatus = getLayerStatus(DOMAIN_KEY, slug);
                        return layer.agents.map(agent => (
                          <button
                            type="button"
                            key={agent.code}
                            onClick={() => lStatus !== "locked" && handleAgentClick(agent, layer.name, layer.color)}
                            disabled={lStatus === "locked"}
                            className={cn(
                              "flex items-center gap-1.5 px-1 -mx-1 transition-colors",
                              lStatus === "locked"
                                ? "opacity-25 cursor-not-allowed"
                                : "hover:bg-surface-raised cursor-pointer"
                            )}
                          >
                            {lStatus === "locked" ? (
                              <IconLock size={7} className="text-foreground-dim shrink-0" />
                            ) : (
                              <div
                                className="w-[5px] h-[5px] rounded-full shrink-0"
                                style={{ backgroundColor: layer.color, opacity: agent.status === "draft" ? 0.4 : 1 }}
                              />
                            )}
                            <span className="font-mono text-[7px] text-foreground-dim truncate">{agent.name}</span>
                            <span className="font-mono text-[6px] text-foreground-dim/40 shrink-0">{agent.code}</span>
                            {lStatus === "locked" ? (
                              <span className="font-mono text-[5px] text-foreground-dim/30 shrink-0">LOCKED</span>
                            ) : lStatus === "completed" ? (
                              <IconCheck size={7} style={{ color: layer.color }} className="shrink-0" />
                            ) : (
                              <div className={cn(
                                "w-1 h-1 rounded-full shrink-0",
                                agent.status === "active" ? "bg-success" : "bg-warning"
                              )} />
                            )}
                          </button>
                        ));
                      })}
                    </div>
                  </div>
                </div>

              </>
            )}

            {/* ── Layer View ────────────────────────────────────────────── */}
            {section === "base" && activeLayer !== null && (() => {
              const layer = LAYERS_DATA[activeLayer];
              const LayerIcon = layer.Icon;
              const layerSlug = LAYER_ORDER[activeLayer] as LayerSlug;
              const layerStatus: LayerStatus = getLayerStatus(DOMAIN_KEY, layerSlug);

              return (
                <>
                  {/* Layer Header */}
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 flex items-center justify-center border",
                          layerStatus === "locked" && "opacity-40"
                        )}
                        style={{ borderColor: layer.color }}
                      >
                        {layerStatus === "locked" ? (
                          <IconLock size={18} className="text-foreground-dim" />
                        ) : layerStatus === "completed" ? (
                          <IconCheck size={18} strokeWidth={2} style={{ color: layer.color }} />
                        ) : (
                          <LayerIcon size={18} strokeWidth={1.5} style={{ color: layer.color }} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-module-md font-semibold text-foreground">{layer.name} Layer</h2>
                          {layerStatus === "locked" && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-foreground-dim border border-border px-1.5 py-0.5">LOCKED</span>
                          )}
                          {layerStatus === "completed" && (
                            <span className="text-[9px] font-mono uppercase tracking-wider border px-1.5 py-0.5" style={{ color: layer.color, borderColor: `${layer.color}40` }}>COMPLETED</span>
                          )}
                          {layerStatus === "active" && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-success border border-success/30 px-1.5 py-0.5">ACTIVE</span>
                          )}
                        </div>
                        <p className="text-label-sm text-foreground-dim">
                          {layerStatus === "locked"
                            ? "Complete the previous layer to unlock"
                            : `${layer.agents.length} agent${layer.agents.length !== 1 ? "s" : ""} in this layer`}
                        </p>
                      </div>
                    </div>
                    {layerStatus !== "locked" && (
                      <button
                        onClick={() => setShowCatalog(v => !v)}
                        className="flex items-center gap-2 h-8 px-4 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors self-start"
                      >
                        <IconPlus size={12} />
                        <span className="text-label-sm">Add Agent</span>
                      </button>
                    )}
                  </div>

                  {/* Requirements Checklist */}
                  <LayerRequirementChecklist
                    domainKey={DOMAIN_KEY}
                    layerSlug={layerSlug}
                    layerName={layer.name}
                    layerColor={layer.color}
                  />

                  {/* Agent Catalog — only when unlocked */}
                  {layerStatus !== "locked" && showCatalog && (
                    <div
                      className="border p-5 space-y-4"
                      style={{ borderColor: deptColor, backgroundColor: `${deptColor}08` }}
                    >
                      <div className="relative">
                        <IconSearch size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-dim" />
                        <input
                          value={catalogSearch}
                          onChange={e => setCatalogSearch(e.target.value)}
                          className="w-full h-8 bg-background border border-border pl-8 pr-3 text-body-sm placeholder:text-foreground-dim focus:outline-none focus:border-foreground-muted"
                          placeholder="Search available agents..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {AGENT_CATALOG
                          .filter(a => !catalogSearch || a.name.toLowerCase().includes(catalogSearch.toLowerCase()) || a.tags.some(t => t.includes(catalogSearch.toLowerCase())))
                          .map(agent => {
                            const AgentIcon = agent.Icon;
                            return (
                              <div
                                key={agent.name}
                                className="flex items-start gap-3 p-3 bg-surface border border-border hover:bg-surface-raised transition-colors group cursor-pointer"
                              >
                                <div className="w-8 h-8 flex items-center justify-center border border-border shrink-0">
                                  <AgentIcon size={14} strokeWidth={1.5} className="text-foreground-muted" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-body-sm text-foreground font-medium">{agent.name}</p>
                                  <p className="text-label-sm text-foreground-dim mt-0.5">{agent.desc}</p>
                                  <div className="flex gap-1.5 mt-2">
                                    {agent.tags.map(tag => (
                                      <span key={tag} className="text-[9px] font-mono text-foreground-dim border border-border px-1.5 py-0.5">{tag}</span>
                                    ))}
                                  </div>
                                </div>
                                <button className="w-6 h-6 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                                  <IconPlus size={10} />
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Current Agents — only when unlocked */}
                  {layerStatus !== "locked" && layer.agents.length > 0 ? (
                    <div className="relative space-y-3">
                      <LayerAgentGuide />
                      <div className="flex items-center gap-3">
                        <h3 className="text-os-title-sm text-foreground-muted">CURRENT AGENTS</h3>
                        <span className="text-label-sm text-foreground-dim font-mono">Click to view details</span>
                      </div>
                      {layer.agents.map(agent => {
                        const AgentIcon = agent.Icon;
                        return (
                          <button
                            type="button"
                            key={agent.code}
                            onClick={() => handleAgentClick(agent, layer.name, layer.color)}
                            className="w-full text-left flex items-start gap-4 p-4 bg-surface border border-border hover:bg-surface-raised transition-colors cursor-pointer group"
                          >
                            <div
                              className="w-10 h-10 flex items-center justify-center border shrink-0 bg-surface-raised group-hover:border-foreground-muted transition-colors"
                              style={{ borderColor: layer.color }}
                            >
                              <AgentIcon size={18} strokeWidth={1.5} style={{ color: layer.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-label-sm text-foreground-dim font-mono mb-0.5">{agent.code}</p>
                              <p className="text-module-sm font-medium text-foreground">{agent.name}</p>
                              <p className="text-body-sm text-foreground-muted mt-1 leading-relaxed">{agent.role}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className={cn(
                                "px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border",
                                agent.status === "active" && "text-success border-success/30 bg-success/5",
                                agent.status === "draft" && "text-warning border-warning/30 bg-warning/5",
                                agent.status === "deactivated" && "text-foreground-dim border-border bg-surface-raised",
                              )}>
                                {agent.status}
                              </div>
                              <IconInfo size={14} className="text-foreground-dim group-hover:text-foreground transition-colors" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-surface border border-border">
                      <p className="text-body-sm text-foreground-dim">No agents in this layer yet</p>
                      <p className="text-label-sm text-foreground-dim mt-1">Use &quot;Add Agent&quot; to assign agents to this layer</p>
                    </div>
                  )}
                </>
              );
            })()}

            {/* ── Assets View ───────────────────────────────────────────── */}
            {section === "assets" && (
              <>
                {/* Assets Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-module-md font-semibold text-foreground">Domain Assets</h2>
                  <button className="flex items-center gap-2 h-8 px-4 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                    <IconUpload size={12} />
                    <span className="text-label-sm">Upload Asset</span>
                  </button>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {ASSET_CATEGORIES.map(cat => {
                    const CatIcon = cat.Icon;
                    return (
                      <div
                        key={cat.name}
                        className="bg-surface border border-border p-4 hover:bg-surface-raised transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <CatIcon size={16} strokeWidth={1.5} className="text-foreground-muted" />
                          <span className="text-body-sm text-foreground font-medium">{cat.name}</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-data-lg text-foreground font-mono">{cat.count}</span>
                          <span className="text-label-sm text-foreground-dim">{cat.size}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Assets */}
                <div className="bg-surface border border-border">
                  <div className="flex items-center justify-between px-5 py-2.5 border-b border-border-subtle bg-surface-raised">
                    <span className="text-os-title-sm text-foreground-muted">RECENT ASSETS</span>
                    <span className="text-label-sm text-foreground-dim font-mono">{RECENT_ASSETS.length} files</span>
                  </div>
                  {RECENT_ASSETS.map((asset, i) => (
                    <div
                      key={asset.name}
                      className={cn(
                        "flex items-center gap-3 px-5 py-3 hover:bg-surface-raised transition-colors cursor-pointer",
                        i < RECENT_ASSETS.length - 1 && "border-b border-border-subtle"
                      )}
                    >
                      <IconFile size={14} className="text-foreground-muted shrink-0" />
                      <span className="text-body-sm text-foreground flex-1 truncate font-mono">{asset.name}</span>
                      <span className="text-label-sm text-foreground-dim shrink-0 hidden sm:block">{asset.type}</span>
                      <span className="text-label-sm text-foreground-dim font-mono shrink-0">{asset.size}</span>
                      <span className="text-label-sm text-foreground-dim font-mono shrink-0">{asset.time}</span>
                    </div>
                  ))}
                </div>

                {/* Connected Sources */}
                <div className="bg-surface border border-border">
                  <div className="px-5 py-2.5 border-b border-border-subtle bg-surface-raised">
                    <span className="text-os-title-sm text-foreground-muted">CONNECTED SOURCES</span>
                  </div>
                  {CONNECTED_SOURCES.map((source, i) => (
                    <div
                      key={source.name}
                      className={cn(
                        "flex items-center justify-between px-5 py-3",
                        i < CONNECTED_SOURCES.length - 1 && "border-b border-border-subtle"
                      )}
                    >
                      <span className="text-body-sm text-foreground">{source.name}</span>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          source.status === "connected" ? "bg-success" : "bg-foreground-dim"
                        )} />
                        <span className={cn(
                          "text-label-sm font-mono",
                          source.status === "connected" ? "text-success" : "text-foreground-dim"
                        )}>
                          {source.status === "connected" ? "Connected" : "Disconnected"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden shrink-0 h-14 border-t border-border bg-surface flex items-center">
          {[
            { Icon: IconHome as AnyIcon, label: "Home", active: false },
            { Icon: IconSearch as AnyIcon, label: "Search", active: false },
            { Icon: IconBell as AnyIcon, label: "Alerts", active: false },
            { Icon: IconSettings as AnyIcon, label: "Settings", active: false },
          ].map(({ Icon, label, active }) => (
            <button key={label} className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-2", active ? "text-foreground" : "text-foreground-dim")}>
              <Icon size={16} strokeWidth={1.5} />
              <span className="text-[9px] font-mono uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── Agent detail modal ──────────────────────────────────────────── */}
      {selectedAgent && (
        <AgentDetailModal
          agent={selectedAgent.agent}
          layerName={selectedAgent.layerName}
          layerColor={selectedAgent.layerColor}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {/* ── Notification center ─────────────────────────────────────────── */}
      <NotificationCenter
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
