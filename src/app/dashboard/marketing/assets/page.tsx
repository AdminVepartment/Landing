"use client";

import { useState, useRef, useEffect } from "react";
import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";
import {
  IconHome, IconSearch, IconBell, IconSettings, IconLock,
  IconChevronRight, IconChevronDown, IconArrowUpRight,
  IconFileText, IconFileBarChart, IconFileSpreadsheet, IconBarChart,
  IconX, IconLayers, IconArchive, IconBot,
  IconTarget, IconActivity, IconTrendingUp,
  IconBrain, IconFilter, IconDollar, IconPencil, IconCrosshair,
} from "@/components/icons";
import {
  IconMarketing, IconCampaign, IconContent, IconPerformance,
  IconCustomerInsights, IconTrendAnalysis,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type AnyIcon = ComponentType<{ size?: number; strokeWidth?: number | string; className?: string; style?: CSSProperties }>;

// ── Constants ─────────────────────────────────────────────────────────────────

const DEPT_COLOR = "#4F46E5";
const DEPT_NAME  = "Marketing";

// ── Data ─────────────────────────────────────────────────────────────────────

const DOMAINS = [
  {
    name: "Campaign Planning",
    Icon: IconCampaign as AnyIcon,
    totalAssets: 24,
    agents: [
      { name: "Campaign Strategist",      Icon: IconTarget    as AnyIcon, outputs: 12 },
      { name: "Audience Targeting Agent", Icon: IconCrosshair as AnyIcon, outputs: 8  },
      { name: "Budget Allocation Agent",  Icon: IconDollar    as AnyIcon, outputs: 4  },
    ],
    recent: [
      { name: "Campaign Strategy Brief",      agent: "Campaign Strategist",      type: "DOC", Icon: IconFileText     as AnyIcon, time: "2h ago" },
      { name: "Audience Segmentation Report", agent: "Audience Targeting Agent", type: "RPT", Icon: IconFileBarChart as AnyIcon, time: "4h ago" },
      { name: "Campaign Channel Plan",        agent: "Budget Allocation Agent",  type: "DOC", Icon: IconFileText     as AnyIcon, time: "1d ago" },
    ],
  },
  {
    name: "Content Creation",
    Icon: IconContent as AnyIcon,
    totalAssets: 38,
    agents: [
      { name: "Content Strategist", Icon: IconFileText as AnyIcon, outputs: 15 },
      { name: "Copywriting Agent",  Icon: IconPencil   as AnyIcon, outputs: 12 },
      { name: "SEO Optimizer",      Icon: IconSearch   as AnyIcon, outputs: 11 },
    ],
    recent: [
      { name: "Q1 Content Calendar",        agent: "Content Strategist", type: "DOC", Icon: IconFileText     as AnyIcon, time: "1h ago" },
      { name: "Blog Post: AI in Marketing", agent: "Copywriting Agent",  type: "DOC", Icon: IconFileText     as AnyIcon, time: "3h ago" },
      { name: "SEO Keyword Report",         agent: "SEO Optimizer",      type: "RPT", Icon: IconFileBarChart as AnyIcon, time: "6h ago" },
    ],
  },
  {
    name: "Performance Analytics",
    Icon: IconPerformance as AnyIcon,
    totalAssets: 31,
    agents: [
      { name: "Performance Analyst", Icon: IconActivity     as AnyIcon, outputs: 18 },
      { name: "Report Generator",    Icon: IconFileBarChart as AnyIcon, outputs: 13 },
    ],
    recent: [
      { name: "Monthly Performance Dashboard", agent: "Performance Analyst", type: "DBS", Icon: IconBarChart     as AnyIcon, time: "30m ago" },
      { name: "Attribution Report Q1",         agent: "Report Generator",    type: "RPT", Icon: IconFileBarChart as AnyIcon, time: "2h ago"  },
      { name: "Traffic Analysis Report",       agent: "Performance Analyst", type: "RPT", Icon: IconFileBarChart as AnyIcon, time: "5h ago"  },
    ],
  },
  {
    name: "Customer Insights",
    Icon: IconCustomerInsights as AnyIcon,
    totalAssets: 19,
    agents: [
      { name: "Behavior Analyst",   Icon: IconBrain  as AnyIcon, outputs: 10 },
      { name: "Segmentation Agent", Icon: IconFilter as AnyIcon, outputs: 9  },
    ],
    recent: [
      { name: "Customer Segment Map",  agent: "Segmentation Agent", type: "DST", Icon: IconFileSpreadsheet as AnyIcon, time: "1h ago" },
      { name: "Behavior Flow Report",  agent: "Behavior Analyst",   type: "RPT", Icon: IconFileBarChart    as AnyIcon, time: "4h ago" },
      { name: "NPS Analysis Q1",       agent: "Behavior Analyst",   type: "RPT", Icon: IconFileBarChart    as AnyIcon, time: "1d ago" },
    ],
  },
  {
    name: "Trend Analysis",
    Icon: IconTrendAnalysis as AnyIcon,
    totalAssets: 13,
    agents: [
      { name: "Market Scanner",   Icon: IconActivity    as AnyIcon, outputs: 8 },
      { name: "Trend Forecaster", Icon: IconTrendingUp  as AnyIcon, outputs: 5 },
    ],
    recent: [
      { name: "Market Trend Report Q1",    agent: "Market Scanner",   type: "RPT", Icon: IconFileBarChart as AnyIcon, time: "2h ago" },
      { name: "Competitor Analysis Brief", agent: "Trend Forecaster", type: "DOC", Icon: IconFileText     as AnyIcon, time: "1d ago" },
    ],
  },
];

const FILTER_DEFS = [
  { key: "domain", label: "Domain",     options: ["Campaign Planning", "Content Creation", "Performance Analytics", "Customer Insights", "Trend Analysis"] },
  { key: "agent",  label: "Agent",      options: ["Campaign Strategist", "Audience Targeting Agent", "Content Strategist", "Performance Analyst", "SEO Optimizer", "Behavior Analyst"] },
  { key: "type",   label: "Asset Type", options: ["Report", "Document", "Dataset", "Dashboard"] },
  { key: "date",   label: "Date",       options: ["Last 24h", "Last week", "Last month", "All time"] },
];

const TOTAL_ASSETS = DOMAINS.reduce((s, d) => s + d.totalAssets, 0);
const TOTAL_AGENTS = DOMAINS.reduce((s, d) => s + d.agents.length, 0);

const SIDEBAR_DEPTS = [
  { name: "Marketing", colorVar: "marketing", active: true,  current: true  },
  { name: "Branding",  colorVar: "branding",  active: true,  current: false },
  { name: "Sales",     colorVar: "sales",     active: false, current: false },
  { name: "Product",   colorVar: "product",   active: false, current: false },
];

// ── Filter dropdown ───────────────────────────────────────────────────────────

function FilterButton({
  label, options, value, onChange,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-1.5 h-8 px-3 border text-[11px] font-mono transition-colors",
          value
            ? "border-foreground-muted text-foreground bg-surface-raised"
            : "border-border text-foreground-muted hover:border-foreground-muted hover:text-foreground"
        )}
      >
        <span>{value || label}</span>
        {value
          ? <IconX size={10} onClick={e => { e.stopPropagation(); onChange(""); setOpen(false); }} className="text-foreground-muted" />
          : <IconChevronDown size={10} />
        }
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 bg-surface border border-border min-w-[180px]">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 text-[11px] font-mono transition-colors",
                opt === value
                  ? "text-foreground bg-surface-raised"
                  : "text-foreground-muted hover:text-foreground hover:bg-surface-raised"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Domain cluster card ───────────────────────────────────────────────────────

function DomainCard({ domain }: { domain: typeof DOMAINS[0] }) {
  const DomainIcon = domain.Icon;

  return (
    <div
      className="bg-surface border border-border"
      style={{ borderTopColor: DEPT_COLOR, borderTopWidth: 2 }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border/40">
        <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0">
          <DomainIcon size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-foreground">{domain.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <IconArchive size={10} className="text-foreground-muted" />
            <span className="text-[11px] font-mono text-foreground-muted">{domain.totalAssets} assets</span>
            <div className="w-px h-2.5 bg-border" />
            <IconBot size={10} className="text-foreground-muted" />
            <span className="text-[11px] font-mono text-foreground-muted">{domain.agents.length} agents</span>
          </div>
        </div>
        <Link
          href="#"
          className="flex items-center gap-1 border border-border px-2.5 py-1.5 hover:border-foreground-muted transition-colors"
        >
          <span className="text-[11px] font-mono text-foreground-muted">View all</span>
          <IconArrowUpRight size={10} className="text-foreground-muted" />
        </Link>
      </div>

      {/* Two-column body: agents | recent outputs */}
      <div className="grid grid-cols-[220px_1fr] divide-x divide-border/40">

        {/* Agents column */}
        <div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-raised border-b border-border/40">
            <IconBot size={10} className="text-foreground-muted" />
            <span className="text-[10px] font-mono font-medium text-foreground-muted tracking-[0.08em] uppercase">Agents</span>
          </div>
          {domain.agents.map((agent, i) => {
            const AgentIcon = agent.Icon;
            return (
              <Link
                key={agent.name}
                href="#"
                className={cn(
                  "flex items-center gap-2.5 px-5 py-3.5 hover:bg-surface-raised transition-colors group",
                  i < domain.agents.length - 1 && "border-b border-border/30"
                )}
              >
                <div className="w-7 h-7 border border-border flex items-center justify-center shrink-0">
                  <AgentIcon size={13} strokeWidth={1.5} className="text-foreground-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-foreground truncate">{agent.name}</p>
                  <p className="text-[11px] font-mono text-foreground-muted">{agent.outputs} outputs</p>
                </div>
                <IconChevronRight size={11} className="text-foreground-dim shrink-0 group-hover:text-foreground-muted transition-colors" />
              </Link>
            );
          })}
        </div>

        {/* Recent outputs column */}
        <div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-raised border-b border-border/40">
            <span className="text-[10px] font-mono font-medium text-foreground-muted tracking-[0.08em] uppercase">Recent Outputs</span>
          </div>
          {domain.recent.map((r, i) => {
            const FileIcon = r.Icon;
            return (
              <div
                key={r.name}
                className={cn(
                  "flex items-center gap-3 px-5 py-3.5 hover:bg-surface-raised transition-colors cursor-pointer",
                  i < domain.recent.length - 1 && "border-b border-border/30"
                )}
              >
                <FileIcon size={13} className="text-foreground-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-foreground truncate">{r.name}</p>
                  <p className="text-[11px] font-mono text-foreground-muted truncate">{r.agent}</p>
                </div>
                <span className="text-[9px] font-mono text-foreground-dim border border-border px-1.5 py-px shrink-0">{r.type}</span>
                <span className="text-[11px] font-mono text-foreground-muted shrink-0 ml-1">{r.time}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MarketingAssetsPage() {
  const [query, setQuery]     = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  function setFilter(key: string, val: string) { setFilters(p => ({ ...p, [key]: val })); }
  function clearAll() { setFilters({}); }

  return (
    <div className="flex bg-background text-foreground h-screen overflow-hidden w-full">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-[200px] shrink-0 hidden lg:flex flex-col bg-surface border-r border-border overflow-y-auto">
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
          <div className="w-6 h-6 border border-foreground flex items-center justify-center shrink-0">
            <div className="w-2 h-2 bg-foreground" />
          </div>
          <p className="text-[13px] text-foreground font-medium flex-1 truncate">Acme Workspace</p>
          <IconChevronRight size={13} className="text-foreground-dim shrink-0" />
        </div>

        <nav className="px-3 pt-4 pb-3 space-y-px border-b border-border">
          {[
            { Icon: IconHome,    label: "Dashboard", active: false },
            { Icon: IconArchive, label: "Assets",    active: true  },
            { Icon: IconSearch,  label: "Search",    active: false },
          ].map(({ Icon, label, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer transition-colors",
                active ? "bg-surface-raised text-foreground" : "text-foreground-muted hover:text-foreground"
              )}
            >
              <Icon size={14} strokeWidth={1.5} className="shrink-0" />
              <span className="text-[13px] flex-1 font-medium">{label}</span>
            </div>
          ))}
        </nav>

        <div className="flex-1 px-3 pt-4 overflow-auto">
          <p className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.1em] uppercase px-3 mb-3">Vepartments</p>
          {SIDEBAR_DEPTS.filter(d => d.active).map(({ name, colorVar, current }) => (
            <div
              key={name}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 mb-px cursor-pointer transition-colors",
                current ? "bg-surface-raised" : "hover:bg-surface-raised"
              )}
            >
              <div
                className="w-3 h-3 shrink-0"
                style={{ backgroundColor: `hsl(var(--dept-${colorVar}-main))`, opacity: current ? 1 : 0.7 }}
              />
              <span className={cn("text-[13px] font-medium flex-1", current ? "text-foreground" : "text-foreground-muted")}>{name}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
            </div>
          ))}
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

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="h-14 shrink-0 flex items-center gap-4 px-10 border-b border-border bg-surface">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[11px] font-mono text-foreground-dim">Assets</span>
            <span className="text-[11px] font-mono text-foreground-dim">/</span>
            <span className="text-[11px] font-mono font-medium text-foreground">Marketing</span>
          </div>
          <IconBell size={14} className="text-foreground-muted" />
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        <main className="flex-1 overflow-auto bg-background">
          <div className="px-10 py-8 space-y-6">

            {/* ── Page header ────────────────────────────────────────── */}
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 border border-border flex items-center justify-center shrink-0"
                style={{ borderTopColor: DEPT_COLOR, borderTopWidth: 2 }}
              >
                <IconMarketing size={22} strokeWidth={1.5} className="text-foreground-muted" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-[20px] font-medium text-foreground">{DEPT_NAME} Assets</h1>
                  <span
                    className="text-[9px] font-mono font-medium px-1.5 py-0.5 border tracking-[0.06em]"
                    style={{ borderColor: DEPT_COLOR, color: DEPT_COLOR }}
                  >
                    {DEPT_NAME.toUpperCase()}
                  </span>
                </div>
                <p className="text-[13px] font-mono text-foreground-muted">Browse outputs generated across marketing domains and agents.</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1.5">
                    <IconLayers size={11} className="text-foreground-muted" />
                    <span className="text-[11px] font-mono text-foreground-muted">{DOMAINS.length} domains</span>
                  </div>
                  <div className="w-px h-3 bg-border" />
                  <div className="flex items-center gap-1.5">
                    <IconArchive size={11} className="text-foreground-muted" />
                    <span className="text-[11px] font-mono text-foreground-muted">{TOTAL_ASSETS} total assets</span>
                  </div>
                  <div className="w-px h-3 bg-border" />
                  <div className="flex items-center gap-1.5">
                    <IconBot size={11} className="text-foreground-muted" />
                    <span className="text-[11px] font-mono text-foreground-muted">{TOTAL_AGENTS} agents</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Search ─────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 h-12 border border-border bg-surface px-4">
              <IconSearch size={14} className="text-foreground-muted shrink-0" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search marketing assets, agents, or domains…"
                className="flex-1 text-[13px] font-mono text-foreground bg-transparent outline-none placeholder:text-foreground-dim"
              />
              {query && (
                <button onClick={() => setQuery("")}>
                  <IconX size={13} className="text-foreground-muted hover:text-foreground" />
                </button>
              )}
            </div>

            {/* ── Filters ────────────────────────────────────────────── */}
            <div className="flex items-center gap-2 flex-wrap">
              {FILTER_DEFS.map(f => (
                <FilterButton
                  key={f.key}
                  label={f.label}
                  options={f.options}
                  value={filters[f.key] ?? ""}
                  onChange={v => setFilter(f.key, v)}
                />
              ))}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 h-8 px-3 text-[11px] font-mono text-foreground-muted hover:text-foreground transition-colors ml-1"
                >
                  <IconX size={10} />
                  Clear all
                </button>
              )}
            </div>

            {/* ── Section label ──────────────────────────────────────── */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.1em] uppercase">Domain Clusters</span>
              <div className="w-px h-3 bg-border" />
              <span className="text-[11px] font-mono text-foreground-muted">{DOMAINS.length} domains</span>
              <div className="w-px h-3 bg-border" />
              <span className="text-[11px] font-mono text-foreground-muted">{TOTAL_ASSETS} assets</span>
            </div>

            {/* ── Domain cards ───────────────────────────────────────── */}
            <div className="flex flex-col gap-5 pb-10">
              {DOMAINS.map(domain => (
                <DomainCard key={domain.name} domain={domain} />
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
