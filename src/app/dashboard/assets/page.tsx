"use client";

import { useState, useRef, useEffect } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  IconHome, IconSearch, IconBell, IconSettings,
  IconChevronRight, IconChevronDown, IconArrowUpRight,
  IconFileText, IconFileBarChart, IconFileSpreadsheet, IconBarChart,
  IconX, IconLayers, IconArchive, IconBot, IconPlus,
} from "@/components/icons";
import {
  IconMarketing, IconBranding, IconProduct, IconSales,
  IconSustainability, IconOperations,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { AssetsSearchGuide } from "./guide";

type AnyIcon = ComponentType<{ size?: number; strokeWidth?: number | string; className?: string; style?: CSSProperties }>;

// ── Data ─────────────────────────────────────────────────────────────────────

const VEPTS = [
  {
    name: "Marketing", colorVar: "marketing", Icon: IconMarketing as AnyIcon,
    totalAssets: 125,
    domains: [
      { name: "Campaign Planning",    active: true,  assets: 42 },
      { name: "Content Creation",     active: true,  assets: 38 },
      { name: "Performance Analytics",active: false, assets: 45 },
    ],
    recent: [
      { name: "Campaign Strategy Brief",      type: "DOC", Icon: IconFileText        as AnyIcon, time: "2h ago"  },
      { name: "Audience Segmentation Report", type: "RPT", Icon: IconFileBarChart    as AnyIcon, time: "4h ago"  },
      { name: "Content Engagement Dashboard", type: "DBS", Icon: IconBarChart        as AnyIcon, time: "1d ago"  },
    ],
  },
  {
    name: "Branding", colorVar: "branding", Icon: IconBranding as AnyIcon,
    totalAssets: 98,
    domains: [
      { name: "Brand Identity",    active: true,  assets: 34 },
      { name: "Visual Design",     active: true,  assets: 41 },
      { name: "Creative Strategy", active: false, assets: 23 },
    ],
    recent: [
      { name: "Brand Guidelines 2025",   type: "DOC", Icon: IconFileText        as AnyIcon, time: "1h ago"  },
      { name: "Visual Identity Report",  type: "RPT", Icon: IconFileBarChart    as AnyIcon, time: "3h ago"  },
      { name: "Color Palette Dataset",   type: "DST", Icon: IconFileSpreadsheet as AnyIcon, time: "2d ago"  },
    ],
  },
  {
    name: "Product", colorVar: "product", Icon: IconProduct as AnyIcon,
    totalAssets: 74,
    domains: [
      { name: "Product Strategy", active: true,  assets: 28 },
      { name: "UX Research",      active: false, assets: 31 },
      { name: "Feature Planning", active: true,  assets: 15 },
    ],
    recent: [
      { name: "Q1 Roadmap Document",     type: "DOC", Icon: IconFileText        as AnyIcon, time: "5h ago"  },
      { name: "User Research Dataset",   type: "DST", Icon: IconFileSpreadsheet as AnyIcon, time: "1d ago"  },
      { name: "Feature Usage Dashboard", type: "DBS", Icon: IconBarChart        as AnyIcon, time: "2d ago"  },
    ],
  },
  {
    name: "Sales", colorVar: "sales", Icon: IconSales as AnyIcon,
    totalAssets: 210,
    domains: [
      { name: "Pipeline Management", active: true, assets: 89 },
      { name: "Lead Generation",     active: true, assets: 76 },
      { name: "Revenue Analytics",   active: true, assets: 45 },
    ],
    recent: [
      { name: "Q4 Pipeline Report",    type: "RPT", Icon: IconFileBarChart    as AnyIcon, time: "30m ago" },
      { name: "Lead Quality Dataset",  type: "DST", Icon: IconFileSpreadsheet as AnyIcon, time: "2h ago"  },
      { name: "Revenue Dashboard",     type: "DBS", Icon: IconBarChart        as AnyIcon, time: "6h ago"  },
    ],
  },
  {
    name: "Sustainability", colorVar: "sustainability", Icon: IconSustainability as AnyIcon,
    totalAssets: 47,
    domains: [
      { name: "Carbon Tracking",  active: false, assets: 19 },
      { name: "Impact Reporting", active: true,  assets: 28 },
    ],
    recent: [
      { name: "Carbon Footprint Report", type: "RPT", Icon: IconFileBarChart    as AnyIcon, time: "3d ago" },
      { name: "ESG Dataset Q4",          type: "DST", Icon: IconFileSpreadsheet as AnyIcon, time: "4d ago" },
    ],
  },
  {
    name: "Operations", colorVar: "operations", Icon: IconOperations as AnyIcon,
    totalAssets: 156,
    domains: [
      { name: "Process Automation", active: true,  assets: 67 },
      { name: "Resource Planning",  active: false, assets: 52 },
      { name: "Quality Control",    active: true,  assets: 37 },
    ],
    recent: [
      { name: "Ops Process Report",  type: "RPT", Icon: IconFileBarChart    as AnyIcon, time: "1h ago"  },
      { name: "Resource Dataset",    type: "DST", Icon: IconFileSpreadsheet as AnyIcon, time: "8h ago"  },
      { name: "QC Dashboard",        type: "DBS", Icon: IconBarChart        as AnyIcon, time: "1d ago"  },
    ],
  },
];

const FILTER_DEFS = [
  { key: "vept",   label: "Vepartment", options: ["Marketing", "Branding", "Product", "Sales", "Sustainability", "Operations"] },
  { key: "domain", label: "Domain",     options: ["Campaign Planning", "Content Creation", "Performance Analytics", "Brand Identity", "Visual Design", "Product Strategy"] },
  { key: "agent",  label: "Agent",      options: ["Campaign Strategist", "Content Planner", "Performance Analyst", "Brand Designer"] },
  { key: "type",   label: "Type",       options: ["Report", "Dataset", "Document", "Dashboard"] },
  { key: "date",   label: "Date",       options: ["Last 24h", "Last week", "Last month", "All time"] },
];

const ALL_DEPTS = [
  { name: "Marketing", Icon: IconMarketing as AnyIcon, colorVar: "marketing", active: true },
];

const TOTAL_ASSETS = VEPTS.reduce((s, v) => s + v.totalAssets, 0);

// ── Filter dropdown ───────────────────────────────────────────────────────────

function FilterButton({
  label, options, value, onChange,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-1.5 h-8 px-3 border text-label-sm font-mono transition-colors",
          value
            ? "border-foreground-muted text-foreground bg-surface-raised"
            : "border-border text-foreground-muted hover:border-foreground-muted hover:text-foreground"
        )}
      >
        <span>{value || label}</span>
        {value
          ? <IconX size={10} onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }} className="text-foreground-muted hover:text-foreground" />
          : <IconChevronDown size={10} />}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 bg-surface border border-border min-w-[160px] shadow-sm">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 text-label-sm font-mono transition-colors",
                opt === value ? "text-foreground bg-surface-raised" : "text-foreground-muted hover:text-foreground hover:bg-surface-raised"
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

// ── Vepartment card ───────────────────────────────────────────────────────────

function VeptCard({ vept }: { vept: typeof VEPTS[0] }) {
  const deptColor = `hsl(var(--dept-${vept.colorVar}-main))`;
  const DeptIcon  = vept.Icon;

  return (
    <div
      className="bg-surface border border-border flex flex-col"
      style={{ borderTopColor: deptColor, borderTopWidth: 3 }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 px-5 py-4 border-b border-border-subtle">
        <div className="w-9 h-9 flex items-center justify-center border border-border shrink-0">
          <DeptIcon size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-module-sm font-semibold text-foreground">{vept.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <IconArchive size={10} className="text-foreground-muted" />
            <span className="text-label-sm text-foreground-muted font-mono">{vept.totalAssets} assets</span>
            <div className="w-px h-2.5 bg-border" />
            <IconBot size={10} className="text-foreground-muted" />
            <span className="text-label-sm text-foreground-muted font-mono">{vept.domains.length} domains</span>
          </div>
        </div>
        <button className="flex items-center gap-1 border border-border px-2 py-1.5 shrink-0 hover:border-foreground-muted transition-colors">
          <span className="text-label-sm text-foreground-muted">Open</span>
          <IconArrowUpRight size={10} className="text-foreground-muted" />
        </button>
      </div>

      {/* Domains */}
      <div className="border-b border-border-subtle">
        <div className="flex items-center gap-2 px-5 py-2 bg-surface-raised border-b border-border-subtle">
          <IconLayers size={10} className="text-foreground-muted" />
          <span className="text-os-title-sm text-foreground-muted">DOMAINS</span>
        </div>
        {vept.domains.map((d, i) => (
          <div
            key={d.name}
            className={cn(
              "flex items-center gap-2.5 px-5 py-2.5",
              i < vept.domains.length - 1 && "border-b border-border-subtle"
            )}
          >
            <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", d.active ? "bg-success" : "bg-border")} />
            <span className={cn("flex-1 text-body-sm truncate", d.active ? "text-foreground" : "text-foreground-dim")}>{d.name}</span>
            <span className="text-label-sm text-foreground-muted font-mono shrink-0">{d.assets}</span>
          </div>
        ))}
      </div>

      {/* Recent outputs */}
      <div className="flex-1">
        <div className="flex items-center gap-2 px-5 py-2 bg-surface-raised border-b border-border-subtle">
          <span className="text-os-title-sm text-foreground-muted">RECENT</span>
        </div>
        {vept.recent.map((r, i) => {
          const FileIcon = r.Icon;
          return (
            <div
              key={r.name}
              className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 hover:bg-surface-raised transition-colors cursor-pointer",
                i < vept.recent.length - 1 && "border-b border-border-subtle"
              )}
            >
              <FileIcon size={12} className="text-foreground-muted shrink-0" />
              <span className="flex-1 text-body-sm text-foreground truncate">{r.name}</span>
              <span className="text-[9px] font-mono text-foreground-dim border border-border px-1 py-px">{r.type}</span>
              <span className="text-label-sm text-foreground-muted font-mono shrink-0">{r.time}</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <button className="w-full flex items-center justify-between px-5 py-3 border-t border-border-subtle text-foreground-muted hover:text-foreground hover:bg-surface-raised transition-colors">
        <span className="text-label-sm font-mono">View all {vept.totalAssets} assets</span>
        <IconArrowUpRight size={11} />
      </button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AssetsPage() {
  const [query, setQuery]     = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const activeCount = Object.values(filters).filter(Boolean).length;

  function setFilter(key: string, val: string) {
    setFilters(prev => ({ ...prev, [key]: val }));
  }

  function clearAll() {
    setFilters({});
  }

  return (
    <div className="flex bg-background text-foreground h-screen overflow-hidden w-full">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-[200px] shrink-0 hidden lg:flex flex-col bg-surface border-r border-border overflow-y-auto">
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
          <div className="w-6 h-6 border border-foreground flex items-center justify-center shrink-0">
            <div className="w-2 h-2 bg-foreground" />
          </div>
          <p className="text-body-sm text-foreground font-medium flex-1 truncate">Acme Workspace</p>
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
              <span className="text-body-sm flex-1 font-medium">{label}</span>
            </div>
          ))}
        </nav>

        <div className="flex-1 px-3 pt-4 overflow-auto">
          <p className="text-os-title-sm text-foreground-dim px-3 mb-3">VEPARTMENTS</p>
          {ALL_DEPTS.filter(d => d.active).map(({ name, Icon, colorVar }) => (
            <div key={name} className="flex items-center gap-2.5 px-3 py-2.5 mb-px text-foreground-muted hover:text-foreground hover:bg-surface-raised cursor-pointer transition-colors">
              <Icon size={14} strokeWidth={1.5} className="shrink-0" />
              <span className="text-body-sm flex-1">{name}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
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

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="h-14 shrink-0 flex items-center gap-4 px-10 border-b border-border bg-surface">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-label-sm text-foreground-dim font-mono">Dashboard</span>
            <span className="text-label-sm text-foreground-dim">/</span>
            <span className="text-label-sm text-foreground font-mono font-medium">Assets</span>
          </div>
          <div className="relative">
            <IconBell size={14} className="text-foreground-muted" />
          </div>
          <div className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">AK</div>
        </header>

        <main className="flex-1 overflow-auto bg-background">
          <div className="px-10 py-8 space-y-6">

            {/* ── Page hero ──────────────────────────────────────────── */}
            <div>
              <h1 className="text-module-lg font-semibold text-foreground mb-1">Assets</h1>
              <p className="text-body-sm text-foreground-muted">Browse and manage outputs generated across departments.</p>
            </div>

            {/* ── Search ─────────────────────────────────────────────── */}
            <div className="relative">
              <AssetsSearchGuide />
            </div>
            <div className="flex items-center gap-3 h-12 border border-border bg-surface px-4">
              <IconSearch size={14} className="text-foreground-muted shrink-0" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search assets, reports, documents, datasets, agents…"
                className="flex-1 text-body-md text-foreground bg-transparent outline-none placeholder:text-foreground-dim font-mono"
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
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 h-8 px-3 text-label-sm text-foreground-muted font-mono hover:text-foreground transition-colors ml-1"
                >
                  <IconX size={10} />
                  Clear all
                </button>
              )}
            </div>

            {/* ── Section header ─────────────────────────────────────── */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-os-title-sm text-foreground-dim">VEPARTMENTS</span>
                <div className="w-px h-3 bg-border" />
                <span className="text-label-sm text-foreground-muted font-mono">{VEPTS.length} active</span>
                <div className="w-px h-3 bg-border" />
                <span className="text-label-sm text-foreground-muted font-mono">{TOTAL_ASSETS} total assets</span>
              </div>
            </div>

            {/* ── Vepartment grid ────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-8">
              {VEPTS.map(vept => (
                <VeptCard key={vept.name} vept={vept} />
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
