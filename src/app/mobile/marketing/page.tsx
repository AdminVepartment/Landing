"use client";
import { useState } from "react";
import {
  Bell, Bot, Plus, ArrowUpRight, ChevronRight, Layers, FileText, BarChart2,
  Workflow, Clock, History, Lightbulb, Check, X, Menu,
  Target, Users, TrendingUp, Search, Wand2, Brain, Filter, User, Activity, Crosshair,
  FileBarChart, FileSpreadsheet, LineChart, Archive, Settings2,
  Mail, Share2, Mic,
} from "lucide-react";
import { StatusBar } from "../_components/status-bar";
import { LeftDrawer } from "../_components/LeftDrawer";
import type { LucideIcon } from "lucide-react";

const DEPT_COLOR = "#4F46E5";

const LAYERS = [
  { name: "Foundation", short: "FOUND",  Icon: Layers,     color: "#8C90A0" },
  { name: "Strategy",   short: "STRAT",  Icon: Target,     color: "#7B9EB8" },
  { name: "Execution",  short: "EXEC",   Icon: Workflow,   color: "#B89560" },
  { name: "Monitoring", short: "MON",    Icon: Activity,   color: "#5FA89A" },
  { name: "Growth",     short: "GROWTH", Icon: TrendingUp, color: "#7BA680" },
  { name: "Innovation", short: "INNOV",  Icon: Lightbulb,  color: "#9E87B5" },
];

const ACTIVE_DOMAINS = [
  {
    name: "Campaign Planning", Icon: Target,
    desc: "Plan and execute marketing campaigns.",
    agents: [
      { name: "Campaign Strategist",      Icon: Target as LucideIcon },
      { name: "Audience Targeting Agent", Icon: Target as LucideIcon },
      { name: "Budget Allocation Agent",  Icon: Target as LucideIcon },
    ],
    workflows: 2, lastRun: "1h ago",
  },
  {
    name: "Content Creation", Icon: FileText,
    desc: "Create and manage content assets.",
    agents: [
      { name: "Content Writer",    Icon: FileText as LucideIcon },
      { name: "SEO Optimizer",     Icon: Search   as LucideIcon },
      { name: "Creative Director", Icon: Wand2    as LucideIcon },
    ],
    workflows: 3, lastRun: "30m ago",
  },
  {
    name: "Performance Analytics", Icon: BarChart2,
    desc: "Track and analyze marketing performance.",
    agents: [
      { name: "Data Analyst",        Icon: BarChart2    as LucideIcon },
      { name: "Report Generator",    Icon: FileBarChart as LucideIcon },
      { name: "Attribution Modeler", Icon: LineChart    as LucideIcon },
    ],
    workflows: 1, lastRun: "2h ago",
  },
  {
    name: "Customer Insights", Icon: Users,
    desc: "Understand customer behavior and segments.",
    agents: [
      { name: "Behavior Analyst",   Icon: Brain  as LucideIcon },
      { name: "Segmentation Agent", Icon: Filter as LucideIcon },
      { name: "Profile Builder",    Icon: User   as LucideIcon },
    ],
    workflows: 2, lastRun: "45m ago",
  },
  {
    name: "Trend Analysis", Icon: TrendingUp,
    desc: "Identify and analyze market trends.",
    agents: [
      { name: "Market Scanner",          Icon: Activity   as LucideIcon },
      { name: "Trend Forecaster",        Icon: TrendingUp as LucideIcon },
      { name: "Competitive Intel Agent", Icon: Crosshair  as LucideIcon },
    ],
    workflows: 1, lastRun: "3h ago",
  },
];

const ADDABLE_DOMAINS = [
  { name: "Email Marketing", Icon: Mail,       desc: "Manage email campaigns and automation.", agents: 3, workflows: 3 },
  { name: "Social Media",    Icon: Share2,     desc: "Schedule and analyze social content.",    agents: 3, workflows: 3 },
  { name: "SEO & Growth",    Icon: TrendingUp, desc: "Optimize content for search engines.",    agents: 3, workflows: 3 },
  { name: "Brand Voice",     Icon: Mic,        desc: "Maintain consistent brand messaging.",    agents: 3, workflows: 3 },
  { name: "Market Research", Icon: Search,     desc: "Conduct surveys and analyze competition.", agents: 3, workflows: 3 },
  { name: "Paid Advertising",Icon: Target,     desc: "Manage paid campaigns across networks.",  agents: 3, workflows: 3 },
];

const RECENT_RUNS = [
  { name: "Campaign Performance Analysis", status: "Completed", time: "2h ago" },
  { name: "Audience Segment Refresh",      status: "Running",   time: "Now"    },
  { name: "Content Calendar Generation",   status: "Completed", time: "4h ago" },
  { name: "Q1 Budget Allocation",          status: "Completed", time: "1d ago" },
];

const ASSETS = [
  { Icon: FileBarChart    as LucideIcon, name: "Campaign Performance Report",  time: "2h ago" },
  { Icon: FileSpreadsheet as LucideIcon, name: "Content Engagement Dashboard", time: "4h ago" },
  { Icon: FileText        as LucideIcon, name: "Q1 Content Calendar",          time: "1d ago" },
];

const INSIGHTS = [
  { label: "Active campaigns", value: "4",    note: "+1 this week"  },
  { label: "Engagement rate",  value: "+18%", note: "vs last month" },
  { label: "Leads this week",  value: "284",  note: "↑ from 231"    },
];

const APPROVAL_TASKS = [
  { title: "Approve Campaign Budget",         agent: "Budget Allocation Agent",  time: "10m ago" },
  { title: "Review Content Strategy",         agent: "Content Strategist Agent", time: "1h ago"  },
  { title: "Approve Audience Segment Update", agent: "Segmentation Agent",       time: "2h ago"  },
];

function DomainCard({ domain }: { domain: typeof ACTIVE_DOMAINS[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border bg-surface" style={{ borderTopColor: DEPT_COLOR, borderTopWidth: 2 }}>
      {/* Header */}
      <div className="flex items-start gap-2.5 p-3.5 border-b border-border/30">
        <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
          <domain.Icon size={16} strokeWidth={1.5} className="text-foreground-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-mono font-medium text-foreground mb-1">{domain.name}</p>
          <p className="text-[11px] font-mono text-foreground-muted truncate">{domain.desc}</p>
        </div>
        <button className="flex items-center gap-1 border border-border px-2 py-1.5 shrink-0">
          <span className="text-[10px] font-mono text-foreground-muted">Open</span>
          <ArrowUpRight size={10} className="text-foreground-muted" />
        </button>
      </div>

      {/* Agents strip — tappable toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-1.5 px-3.5 py-2.5 bg-surface-raised"
      >
        <Bot size={10} className="text-foreground-muted" />
        <span className="text-[10px] font-mono font-medium text-foreground-muted tracking-[0.05em] uppercase">Agents</span>
        <div className="w-px h-2.5 bg-border mx-0.5" />
        <span className="text-[10px] font-mono text-foreground-muted">{domain.agents.length}/6 slots</span>
        <div className="w-px h-2.5 bg-border mx-0.5" />
        <Workflow size={10} className="text-foreground-muted" />
        <span className="text-[10px] font-mono text-foreground-muted">{domain.workflows} workflows</span>
        <ChevronRight
          size={12}
          className="text-foreground-dim ml-auto transition-transform duration-150"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Collapsible layer → agent rows */}
      {open && (
        <div className="border-t border-border/30">
          {LAYERS.map((layer, i) => {
            const agent = domain.agents[i];
            const LayerIcon = layer.Icon;
            return (
              <div key={layer.name} className={`flex items-center px-3.5 py-2.5 ${i < 5 ? "border-b border-border/20" : ""}`}>
                <div className="flex items-center gap-1.5 w-[76px] shrink-0">
                  <LayerIcon size={11} strokeWidth={1.5} className="shrink-0" style={{ color: layer.color }} />
                  <span className="text-[9px] font-mono tracking-[0.05em] uppercase" style={{ color: layer.color }}>{layer.short}</span>
                </div>
                <div className="w-px h-3.5 bg-border/50 shrink-0 mr-2.5" />
                {agent ? (
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-5 h-5 border border-border flex items-center justify-center shrink-0">
                      <agent.Icon size={10} strokeWidth={1.5} className="text-foreground-muted" />
                    </div>
                    <span className="flex-1 text-[11px] font-mono text-foreground truncate">{agent.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-1 min-w-0 opacity-35">
                    <div className="w-5 h-5 border border-dashed border-border shrink-0" />
                    <div className="h-2 bg-border flex-1 max-w-[90px]" />
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-t border-border/20 bg-surface-raised">
            <Clock size={10} className="text-foreground-muted" />
            <span className="text-[10px] font-mono text-foreground-muted">Last run {domain.lastRun}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarketingPage() {
  const [taskStates, setTaskStates] = useState<Record<number, "approved" | "rejected" | null>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pendingCount = APPROVAL_TASKS.filter((_, i) => !taskStates[i]).length;

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <StatusBar />

      {/* Header */}
      <div className="h-14 flex items-center gap-2 px-4 border-b border-border bg-surface shrink-0">
        <button onClick={() => setDrawerOpen(true)} className="w-8 h-8 flex items-center justify-center shrink-0">
          <Menu size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </button>
        <div className="flex-1 flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-foreground-dim">Dashboard</span>
          <span className="text-[11px] font-mono text-foreground-dim">/</span>
          <span className="text-[11px] font-mono font-medium text-foreground">Marketing</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={16} strokeWidth={1.5} className="text-foreground-muted" />
            {pendingCount > 0 && <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-error" />}
          </div>
          <div className="w-[26px] h-[26px] border border-border bg-surface-raised flex items-center justify-center">
            <span className="text-[9px] font-mono text-foreground-muted">AK</span>
          </div>
        </div>
      </div>

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">

        {/* Dept header card */}
        <div className="mx-4 mt-4 mb-6 border border-border bg-surface p-4" style={{ borderTopColor: DEPT_COLOR, borderTopWidth: 3 }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 border border-border flex items-center justify-center shrink-0">
              <Layers size={24} strokeWidth={1.5} className="text-foreground-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[15px] font-mono font-medium text-foreground">Marketing</span>
                <span className="border border-border px-1 py-0.5 text-[8px] font-mono font-medium text-foreground-dim tracking-[0.05em]">ACTIVE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers size={10} className="text-foreground-muted" />
                <span className="text-[10px] font-mono text-foreground-muted">5 domains</span>
                <div className="w-px h-2.5 bg-border" />
                <Bot size={10} className="text-foreground-muted" />
                <span className="text-[10px] font-mono text-foreground-muted">12 agents</span>
                {pendingCount > 0 && (
                  <>
                    <div className="w-px h-2.5 bg-border" />
                    <span className="text-[10px] font-mono text-warning">{pendingCount} pending</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5">
            {[
              { Icon: Plus, label: "Add domain", onClick: () => setShowAdd(true) },
              { Icon: Archive, label: "Assets" },
              { Icon: Settings2, label: "Settings" },
            ].map(({ Icon, label, onClick }) => (
              <button key={label} onClick={onClick} className="flex items-center gap-1.5 h-8 px-3 border border-border shrink-0">
                <Icon size={11} className="text-foreground-muted" />
                <span className="text-[11px] font-mono text-foreground-muted">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-col panels */}
        <div className="grid grid-cols-2 gap-2 px-4 mb-6">
          {/* Recent Runs */}
          <div className="border border-border bg-surface">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/30">
              <History size={10} className="text-foreground-muted shrink-0" />
              <span className="text-[9px] font-mono font-medium text-foreground-muted tracking-[0.05em] uppercase">Runs</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2">
              <div className={`w-1 h-1 rounded-full shrink-0 ${RECENT_RUNS[0].status === "Running" ? "bg-success" : "bg-foreground-muted"}`} />
              <span className="flex-1 text-[10px] font-mono text-foreground truncate">{RECENT_RUNS[0].name}</span>
            </div>
            <button className="w-full flex items-center justify-between px-2.5 py-1.5 border-t border-border/20">
              <span className="text-[9px] font-mono text-foreground-muted">+{RECENT_RUNS.length - 1} more</span>
              <ArrowUpRight size={9} className="text-foreground-muted" />
            </button>
          </div>

          {/* Approvals */}
          <div className="border border-border bg-surface" style={pendingCount > 0 ? { borderTopColor: "hsl(var(--warning))", borderTopWidth: 2 } : {}}>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/30">
              <span className="flex-1 text-[9px] font-mono font-medium text-foreground-muted tracking-[0.05em] uppercase">Approvals</span>
              {pendingCount > 0 && <span className="text-[9px] font-mono text-warning font-medium">{pendingCount}</span>}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2">
              <div className="w-1 h-1 rounded-full bg-warning shrink-0" />
              <span className="flex-1 text-[10px] font-mono text-foreground truncate">{APPROVAL_TASKS[0].title}</span>
            </div>
            <button className="w-full flex items-center justify-between px-2.5 py-1.5 border-t border-border/20">
              <span className="text-[9px] font-mono text-foreground-muted">+{APPROVAL_TASKS.length - 1} more</span>
              <ArrowUpRight size={9} className="text-foreground-muted" />
            </button>
          </div>

          {/* Insights */}
          <div className="border border-border bg-surface">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/30">
              <Lightbulb size={10} className="text-foreground-muted shrink-0" />
              <span className="text-[9px] font-mono font-medium text-foreground-muted tracking-[0.05em] uppercase">Insights</span>
            </div>
            <div className="px-2.5 py-2">
              <p className="text-[9px] font-mono text-foreground-muted mb-0.5">{INSIGHTS[0].label}</p>
              <p className="text-[13px] font-mono font-medium text-foreground">{INSIGHTS[0].value}</p>
            </div>
            <button className="w-full flex items-center justify-between px-2.5 py-1.5 border-t border-border/20">
              <span className="text-[9px] font-mono text-foreground-muted">+{INSIGHTS.length - 1} more</span>
              <ArrowUpRight size={9} className="text-foreground-muted" />
            </button>
          </div>

          {/* Assets */}
          <div className="border border-border bg-surface">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/30">
              <span className="flex-1 text-[9px] font-mono font-medium text-foreground-muted tracking-[0.05em] uppercase">Assets</span>
              <span className="text-[9px] font-mono text-foreground-muted">{ASSETS.length}</span>
            </div>
            {(() => { const { Icon: AssetIcon, name } = ASSETS[0]; return (
              <div className="flex items-center gap-1.5 px-2.5 py-2">
                <AssetIcon size={10} className="text-foreground-muted shrink-0" />
                <span className="flex-1 text-[10px] font-mono text-foreground truncate">{name}</span>
              </div>
            ); })()}
            <button className="w-full flex items-center justify-between px-2.5 py-1.5 border-t border-border/20">
              <span className="text-[9px] font-mono text-foreground-muted">+{ASSETS.length - 1} more</span>
              <ArrowUpRight size={9} className="text-foreground-muted" />
            </button>
          </div>
        </div>

        {/* Active domains */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.08em] uppercase">Active Domains</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[10px] font-mono text-foreground-dim">5 active</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {ACTIVE_DOMAINS.map(domain => <DomainCard key={domain.name} domain={domain} />)}
            {/* Add domain placeholder */}
            <button onClick={() => setShowAdd(true)} className="border border-dashed border-border bg-surface flex flex-col items-center justify-center gap-2 py-8">
              <div className="w-10 h-10 border border-dashed border-border flex items-center justify-center">
                <Plus size={18} className="text-foreground-dim" />
              </div>
              <span className="text-[13px] font-mono font-medium text-foreground-dim">Add domain</span>
              <span className="text-[11px] font-mono text-foreground-dim opacity-60">Expand Marketing</span>
            </button>
          </div>
        </div>

      </div>

      {/* Add domain modal */}
      {showAdd && (
        <div className="absolute inset-0 bg-background/90 flex flex-col justify-end z-50">
          <div className="bg-surface border-t border-border max-h-[85%] flex flex-col overflow-hidden" style={{ borderTopColor: DEPT_COLOR, borderTopWidth: 3 }}>
            <div className="flex items-start gap-3 px-5 py-5 border-b border-border shrink-0">
              <div className="flex-1">
                <p className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.08em] mb-1 uppercase">Marketing</p>
                <p className="text-[16px] font-mono font-medium text-foreground mb-1">Add a domain</p>
                <p className="text-[12px] font-mono text-foreground-muted">Select a domain to activate inside Marketing.</p>
              </div>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
                <X size={14} className="text-foreground-dim" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-2">
                {ADDABLE_DOMAINS.map(({ Icon, name, desc, agents, workflows }) => (
                  <button key={name} className="border border-dashed border-border bg-background p-3 flex flex-col gap-2 text-left">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 border border-border flex items-center justify-center">
                        <Icon size={14} strokeWidth={1.5} className="text-foreground-dim" />
                      </div>
                      <div className="w-6 h-6 border border-dashed border-border flex items-center justify-center">
                        <Plus size={10} className="text-foreground-dim" />
                      </div>
                    </div>
                    <p className="text-[12px] font-mono font-medium text-foreground">{name}</p>
                    <p className="text-[10px] font-mono text-foreground-muted leading-[15px] line-clamp-2">{desc}</p>
                    <div className="flex items-center gap-1.5">
                      <Bot size={9} className="text-foreground-muted" />
                      <span className="text-[10px] font-mono text-foreground-muted">{agents} agents</span>
                      <div className="w-px h-2.5 bg-border" />
                      <Workflow size={9} className="text-foreground-muted" />
                      <span className="text-[10px] font-mono text-foreground-muted">{workflows} workflows</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
