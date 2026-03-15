"use client";
import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";
import {
  Bell, Menu, ChevronRight, ArrowUpRight,
  FileText, FileBarChart, FileSpreadsheet,
  Layers, Search, X,
} from "lucide-react";
import {
  IconMarketing, IconBranding, IconProduct, IconSales,
  IconSustainability, IconOperations,
} from "@/components/icons";
import { StatusBar } from "../_components/status-bar";
import { LeftDrawer } from "../_components/LeftDrawer";

type AnyIcon = ComponentType<{ size?: number; strokeWidth?: number | string; className?: string; style?: CSSProperties }>;

// ── Data ─────────────────────────────────────────────────────────────────────

const VEPTS = [
  {
    name: "Marketing", colorVar: "marketing", Icon: IconMarketing as AnyIcon, href: "/mobile/marketing",
    totalAssets: 125,
    domains: [
      { name: "Campaign Planning",     active: true,  assets: 42 },
      { name: "Content Creation",      active: true,  assets: 38 },
      { name: "Performance Analytics", active: false, assets: 45 },
    ],
    recent: [
      { name: "Campaign Strategy Brief",      type: "DOC", Icon: FileText        as AnyIcon, time: "2h ago" },
      { name: "Audience Segmentation Report", type: "RPT", Icon: FileBarChart    as AnyIcon, time: "4h ago" },
    ],
  },
  {
    name: "Branding", colorVar: "branding", Icon: IconBranding as AnyIcon, href: "/mobile/branding",
    totalAssets: 98,
    domains: [
      { name: "Brand Identity",    active: true,  assets: 34 },
      { name: "Visual Design",     active: true,  assets: 41 },
      { name: "Creative Strategy", active: false, assets: 23 },
    ],
    recent: [
      { name: "Brand Guidelines 2025",  type: "DOC", Icon: FileText        as AnyIcon, time: "1h ago" },
      { name: "Visual Identity Report", type: "RPT", Icon: FileBarChart    as AnyIcon, time: "3h ago" },
    ],
  },
  {
    name: "Product", colorVar: "product", Icon: IconProduct as AnyIcon, href: "/mobile/product",
    totalAssets: 74,
    domains: [
      { name: "Product Strategy", active: true,  assets: 28 },
      { name: "UX Research",      active: false, assets: 31 },
      { name: "Feature Planning", active: true,  assets: 15 },
    ],
    recent: [
      { name: "Q1 Roadmap Document",   type: "DOC", Icon: FileText        as AnyIcon, time: "5h ago" },
      { name: "User Research Dataset",  type: "DST", Icon: FileSpreadsheet as AnyIcon, time: "1d ago" },
    ],
  },
  {
    name: "Sales", colorVar: "sales", Icon: IconSales as AnyIcon, href: "/mobile/sales",
    totalAssets: 210,
    domains: [
      { name: "Pipeline Management", active: true, assets: 89 },
      { name: "Lead Generation",     active: true, assets: 76 },
      { name: "Revenue Analytics",   active: true, assets: 45 },
    ],
    recent: [
      { name: "Q4 Pipeline Report",   type: "RPT", Icon: FileBarChart    as AnyIcon, time: "30m ago" },
      { name: "Lead Quality Dataset", type: "DST", Icon: FileSpreadsheet as AnyIcon, time: "2h ago"  },
    ],
  },
  {
    name: "Sustainability", colorVar: "sustainability", Icon: IconSustainability as AnyIcon, href: "/mobile/sustainability",
    totalAssets: 47,
    domains: [
      { name: "Carbon Tracking",  active: false, assets: 19 },
      { name: "Impact Reporting", active: true,  assets: 28 },
    ],
    recent: [
      { name: "Carbon Footprint Report", type: "RPT", Icon: FileBarChart    as AnyIcon, time: "3d ago" },
      { name: "ESG Dataset Q4",          type: "DST", Icon: FileSpreadsheet as AnyIcon, time: "4d ago" },
    ],
  },
  {
    name: "Operations", colorVar: "operations", Icon: IconOperations as AnyIcon, href: "/mobile/operations",
    totalAssets: 156,
    domains: [
      { name: "Process Automation", active: true,  assets: 67 },
      { name: "Resource Planning",  active: false, assets: 52 },
      { name: "Quality Control",    active: true,  assets: 37 },
    ],
    recent: [
      { name: "Ops Process Report", type: "RPT", Icon: FileBarChart    as AnyIcon, time: "1h ago" },
      { name: "Resource Dataset",   type: "DST", Icon: FileSpreadsheet as AnyIcon, time: "8h ago" },
    ],
  },
];

const TOTAL_ASSETS = VEPTS.reduce((s, v) => s + v.totalAssets, 0);

const TYPE_FILTERS = ["DOC", "RPT", "DST", "DBS"] as const;

// ── VeptCard ─────────────────────────────────────────────────────────────────

function VeptCard({ vept }: { vept: typeof VEPTS[0] }) {
  const [domsOpen, setDomsOpen] = useState(false);

  const deptColor   = `hsl(var(--dept-${vept.colorVar}-main))`;
  const DeptIcon    = vept.Icon;
  const activeDoms  = vept.domains.filter(d => d.active).length;

  return (
    <div className="border border-border bg-surface" style={{ borderTopColor: deptColor, borderTopWidth: 3 }}>

      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border/40">
        <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0">
          <DeptIcon size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-mono font-medium text-foreground mb-0.5">{vept.name}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-foreground-muted">{vept.totalAssets} assets</span>
            <div className="w-px h-2.5 bg-border" />
            <span className="text-[10px] font-mono text-foreground-muted">{vept.domains.length} domains</span>
          </div>
        </div>
        <Link href={vept.href} className="flex items-center gap-1 border border-border px-2 py-1.5 shrink-0">
          <span className="text-[10px] font-mono text-foreground-muted">Open</span>
          <ArrowUpRight size={10} className="text-foreground-muted" />
        </Link>
      </div>

      {/* Domains toggle strip */}
      <button
        onClick={() => setDomsOpen(o => !o)}
        className="w-full flex items-center gap-1.5 px-4 py-2.5 bg-surface-raised"
      >
        <Layers size={10} className="text-foreground-muted" />
        <span className="text-[10px] font-mono font-medium text-foreground-muted tracking-[0.05em] uppercase">Domains</span>
        <div className="w-px h-2.5 bg-border mx-0.5" />
        <span className="text-[10px] font-mono text-foreground-muted">{activeDoms}/{vept.domains.length} active</span>
        <ChevronRight
          size={12}
          className="text-foreground-dim ml-auto transition-transform duration-150"
          style={{ transform: domsOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Collapsible domain list */}
      {domsOpen && (
        <div className="border-t border-border/30">
          {vept.domains.map((d, i) => (
            <div
              key={d.name}
              className={`flex items-center gap-2.5 px-4 py-2.5 ${i < vept.domains.length - 1 ? "border-b border-border/20" : ""}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.active ? "bg-success" : "bg-border"}`} />
              <span className={`flex-1 text-[12px] font-mono truncate ${d.active ? "text-foreground" : "text-foreground-dim"}`}>{d.name}</span>
              <span className="text-[10px] font-mono text-foreground-muted shrink-0">{d.assets}</span>
            </div>
          ))}
        </div>
      )}

      {/* Recent outputs — always visible, 1 item */}
      <div className="border-t border-border/40">
        <div className="flex items-center gap-1.5 px-4 py-2 bg-surface-raised border-b border-border/30">
          <span className="text-[9px] font-mono font-medium text-foreground-muted tracking-[0.08em] uppercase">Recent</span>
        </div>
        {(() => {
          const { Icon: FileIcon, name, type, time } = vept.recent[0];
          return (
            <div className="flex items-center gap-2 px-4 py-2.5">
              <FileIcon size={11} className="text-foreground-muted shrink-0" />
              <span className="flex-1 text-[11px] font-mono text-foreground truncate">{name}</span>
              <span className="text-[8px] font-mono text-foreground-dim border border-border px-1 py-px shrink-0">{type}</span>
              <span className="text-[10px] font-mono text-foreground-muted shrink-0 ml-1">{time}</span>
            </div>
          );
        })()}
        <button className="w-full flex items-center justify-between px-4 py-2 border-t border-border/20">
          <span className="text-[9px] font-mono text-foreground-muted">
            +{vept.recent.length - 1 + (vept.totalAssets - vept.recent.length)} more
          </span>
          <ArrowUpRight size={9} className="text-foreground-muted" />
        </button>
      </div>

    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MobileAssetsPage() {
  const [query, setQuery]         = useState("");
  const [activeType, setActiveType] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <StatusBar />

      {/* Header */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-border bg-surface shrink-0">
        <button onClick={() => setDrawerOpen(true)} className="w-8 h-8 flex items-center justify-center shrink-0">
          <Menu size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </button>
        <div className="flex-1 flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-foreground-dim">Dashboard</span>
          <span className="text-[11px] font-mono text-foreground-dim">/</span>
          <span className="text-[11px] font-mono font-medium text-foreground">Assets</span>
        </div>
        <div className="relative">
          <Bell size={16} strokeWidth={1.5} className="text-foreground-muted" />
        </div>
        <div className="w-[26px] h-[26px] border border-border bg-surface-raised flex items-center justify-center">
          <span className="text-[9px] font-mono text-foreground-muted">AK</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="pt-5">

          {/* Search */}
          <div className="mx-4 mb-5 border border-border bg-surface flex items-center gap-2.5 px-3.5 h-[44px]">
            <Search size={13} className="text-foreground-muted shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search assets, reports, documents…"
              className="flex-1 text-[12px] font-mono text-foreground bg-transparent outline-none placeholder:text-foreground-dim"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={12} className="text-foreground-muted" />
              </button>
            )}
          </div>

          {/* Type filter chips */}
          <div className="flex items-center gap-2 px-4 mb-6 overflow-x-auto pb-0.5">
            <span className="text-[10px] font-mono text-foreground-dim shrink-0">Type:</span>
            {TYPE_FILTERS.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(a => a === t ? "" : t)}
                className={`shrink-0 text-[9px] font-mono px-2 py-1 border tracking-[0.05em] transition-colors ${
                  activeType === t
                    ? "border-foreground-muted text-foreground bg-surface-raised"
                    : "border-border text-foreground-muted"
                }`}
              >
                {t}
              </button>
            ))}
            {activeType && (
              <button onClick={() => setActiveType("")} className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-foreground-dim">
                <X size={9} />
                Clear
              </button>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-2 px-4 mb-4">
            <span className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.08em] uppercase">Vepartments</span>
            <div className="w-px h-2.5 bg-border" />
            <span className="text-[10px] font-mono text-foreground-dim">{VEPTS.length} active</span>
            <div className="w-px h-2.5 bg-border" />
            <span className="text-[10px] font-mono text-foreground-dim">{TOTAL_ASSETS} assets total</span>
          </div>

          {/* Vepartment cards */}
          <div className="px-4 pb-8 flex flex-col gap-3">
            {VEPTS.map(vept => <VeptCard key={vept.name} vept={vept} />)}
          </div>

        </div>
      </div>
    </div>
  );
}
