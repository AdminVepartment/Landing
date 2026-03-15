"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  IconArrowLeft, IconZoomIn, IconZoomOut,
  IconMarketing, IconBranding, IconSustainability, IconSales,
  IconOperations, IconHRTalent, IconProduct,
  IconUsers, IconWorkflow,
  IconCompass, IconZap,
  IconLibrary, IconCalendarDays, IconGauge, IconUserPlus,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import { cn } from "@/lib/utils";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Data ─────────────────────────────────────────────────────────────────────

interface Agent {
  name: string;
  code: string;
  Icon: AnyIcon;
  layer: string;
  layerColor: string;
  status: "active" | "draft" | "deactivated";
}

interface Domain {
  name: string;
  Icon: AnyIcon;
  active: boolean;
  agents: Agent[];
}

interface Department {
  name: string;
  code: string;
  Icon: AnyIcon;
  colorVar: string;
  active: boolean;
  domains: Domain[];
}

const departments: Department[] = [
  {
    name: "Marketing", code: "MKT", Icon: IconMarketing as AnyIcon, colorVar: "marketing", active: true,
    domains: [
      {
        name: "Social & Messaging", Icon: IconSocialMessaging as AnyIcon, active: true,
        agents: [
          { name: "Rules & Context Manager", code: "SM-F1", Icon: IconLibrary as AnyIcon, layer: "Foundation", layerColor: "#8C90A0", status: "active" },
          { name: "Strategy Planner", code: "SM-S1", Icon: IconCompass as AnyIcon, layer: "Strategy", layerColor: "#7B9EB8", status: "active" },
          { name: "Content Creator", code: "SM-E1", Icon: IconCalendarDays as AnyIcon, layer: "Execution", layerColor: "#B89560", status: "active" },
          { name: "Quality Reviewer", code: "SM-M1", Icon: IconGauge as AnyIcon, layer: "Monitoring", layerColor: "#5FA89A", status: "active" },
          { name: "Performance Optimizer", code: "SM-G1", Icon: IconUserPlus as AnyIcon, layer: "Growth", layerColor: "#7BA680", status: "active" },
          { name: "Innovation Explorer", code: "SM-I1", Icon: IconZap as AnyIcon, layer: "Innovation", layerColor: "#9E87B5", status: "draft" },
        ],
      },
      { name: "Content Strategy", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
      { name: "PR & Comms", Icon: IconUsers as AnyIcon, active: false, agents: [] },
    ],
  },
  {
    name: "Branding", code: "BRD", Icon: IconBranding as AnyIcon, colorVar: "branding", active: false,
    domains: [
      { name: "Brand Identity", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
      { name: "Visual Design", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
    ],
  },
  {
    name: "Operations", code: "OPS", Icon: IconOperations as AnyIcon, colorVar: "operations", active: false,
    domains: [
      { name: "Process Automation", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
      { name: "Quality Assurance", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
    ],
  },
  {
    name: "Sales", code: "SLS", Icon: IconSales as AnyIcon, colorVar: "sales", active: false,
    domains: [
      { name: "Pipeline Management", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
      { name: "Client Relations", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
    ],
  },
  {
    name: "Product", code: "PRD", Icon: IconProduct as AnyIcon, colorVar: "product", active: false,
    domains: [
      { name: "Product Strategy", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
      { name: "Feature Development", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
    ],
  },
  {
    name: "Sustainability", code: "SUS", Icon: IconSustainability as AnyIcon, colorVar: "sustainability", active: false,
    domains: [
      { name: "ESG Reporting", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
      { name: "Carbon Tracking", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
    ],
  },
  {
    name: "HR / Talent", code: "HR", Icon: IconHRTalent as AnyIcon, colorVar: "hr", active: false,
    domains: [
      { name: "Recruitment", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
      { name: "People Operations", Icon: IconWorkflow as AnyIcon, active: false, agents: [] },
    ],
  },
];

const DOMAIN_W = 140;
const DOMAIN_GAP = 8;
const DEPT_GAP = 24;

// Flatten for stats
const allDomains = departments.flatMap((d) => d.domains);
const allAgents = allDomains.flatMap((d) => d.agents);

// ── Reusable sub-trees ──────────────────────────────────────────────────────

function DeptBranch({ dept }: { dept: Department }) {
  const DIcon = dept.Icon;
  const domainCount = dept.domains.length;
  // Width this department subtree occupies
  const subtreeW = domainCount * DOMAIN_W + (domainCount - 1) * DOMAIN_GAP;

  return (
    <div
      className="flex flex-col items-center"
      style={{
        "--dept-main": `var(--dept-${dept.colorVar}-main)`,
        "--dept-light": `var(--dept-${dept.colorVar}-light)`,
      } as CSSProperties}
    >
      {/* Drop line from top rail */}
      <div className={cn("w-px h-8", dept.active ? "bg-border" : "bg-border/30")} />

      {/* Department node */}
      <div
        className={cn(
          "border px-5 py-3 flex flex-col items-center gap-1.5",
          dept.active
            ? "border-[var(--dept-main)] bg-[var(--dept-light)]"
            : "border-border bg-surface opacity-40"
        )}
      >
        <DIcon
          size={20}
          strokeWidth={1.5}
          className={dept.active ? "text-[var(--dept-main)]" : "text-foreground-muted"}
        />
        <span className={cn(
          "font-mono text-[10px] uppercase tracking-[0.1em] text-center leading-tight",
          dept.active ? "text-[var(--dept-main)]" : "text-foreground-dim"
        )}>
          {dept.name}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[8px] text-foreground-dim">{dept.code}</span>
          {dept.active && <div className="w-1.5 h-1.5 rounded-full bg-success" />}
        </div>
      </div>

      {/* Stem down to domain rail */}
      <div className={cn("w-px h-8", dept.active ? "bg-border" : "bg-border/30")} />

      {/* Domain fan-out */}
      <div style={{ width: subtreeW }}>
        {/* Horizontal rail connecting all domain branches */}
        {domainCount > 1 && (
          <div
            className={cn("h-px mx-auto", dept.active ? "bg-border" : "bg-border/30")}
            style={{ width: subtreeW - DOMAIN_W + DOMAIN_GAP }}
          />
        )}

        {/* Domain columns */}
        <div className="flex justify-center" style={{ gap: DOMAIN_GAP }}>
          {dept.domains.map((domain) => (
            <DomainBranch key={domain.name} domain={domain} dept={dept} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainBranch({ domain, dept }: { domain: Domain; dept: Department }) {
  const DDIcon = domain.Icon;

  return (
    <div className="flex flex-col items-center" style={{ width: DOMAIN_W }}>
      {/* Drop line from domain rail */}
      <div className={cn("w-px h-6", domain.active ? "bg-border" : "bg-border/30")} />

      {/* Domain node */}
      <div
        className={cn(
          "w-full border px-2.5 py-2.5 flex items-center gap-2",
          domain.active
            ? "border-foreground/20 bg-surface-raised"
            : "border-border bg-surface opacity-40"
        )}
      >
        <DDIcon size={12} strokeWidth={1.5} className="text-foreground-muted shrink-0" />
        <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-foreground-dim flex-1 leading-tight">
          {domain.name}
        </span>
        {domain.active && <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />}
      </div>

      {/* Agents below this domain */}
      {domain.active && domain.agents.length > 0 && (
        <>
          {/* Stem to agents */}
          <div className="w-px h-6 bg-border" />

          {/* Agent container */}
          <div className="w-full border border-border bg-background p-1.5 space-y-1">
            <div className="flex items-center gap-1.5 px-1 pb-1 border-b border-border">
              <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-foreground-dim">
                AI AGENTS
              </span>
              <span className="font-mono text-[7px] text-foreground-dim ml-auto">
                {domain.agents.length}
              </span>
            </div>
            {domain.agents.map((agent) => {
              const AIcon = agent.Icon;
              return (
                <div
                  key={agent.code}
                  className="flex items-center gap-1.5 px-1.5 py-1.5 border border-border bg-surface"
                >
                  <AIcon
                    size={11}
                    strokeWidth={1.5}
                    style={{ color: agent.layerColor }}
                    className="shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[7px] uppercase tracking-[0.04em] text-foreground-dim truncate leading-tight">
                      {agent.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className="font-mono text-[6px] uppercase tracking-wider"
                        style={{ color: agent.layerColor }}
                      >
                        {agent.layer}
                      </span>
                      <span className="font-mono text-[6px] text-foreground-dim">
                        {agent.code}
                      </span>
                    </div>
                  </div>
                  {agent.status === "active" ? (
                    <div className="w-1 h-1 rounded-full bg-success shrink-0" />
                  ) : (
                    <div className="w-1 h-1 rounded-full bg-warning shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const ZOOM_MIN = 0.3;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

export default function OrgMapPage() {
  const [zoom, setZoom] = useState(0.75);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1))), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1))), []);
  const zoomReset = useCallback(() => setZoom(0.75), []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-6 h-14 border-b border-border shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-foreground-dim hover:text-foreground transition-colors"
        >
          <IconArrowLeft size={14} strokeWidth={1.5} />
          <span className="text-body-sm">Dashboard</span>
        </Link>
        <span className="text-foreground-dim text-label-sm">/</span>
        <Link
          href="/dashboard/marketing"
          className="text-foreground-dim hover:text-foreground text-label-sm font-mono transition-colors"
        >
          Marketing
        </Link>
        <span className="text-foreground-dim text-label-sm">/</span>
        <Link
          href="/dashboard/marketing/social-messaging"
          className="text-foreground-dim hover:text-foreground text-label-sm font-mono transition-colors"
        >
          Social & Messaging
        </Link>
        <div className="w-px h-5 bg-border" />
        <h1 className="text-os-title-sm text-foreground-muted">ORGANIZATION MAP</h1>

        {/* Stats */}
        <div className="ml-auto flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-label-sm text-foreground-dim">
              {departments.filter((d) => d.active).length} Active Depts
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-dim" />
            <span className="text-label-sm text-foreground-dim">
              {departments.filter((d) => !d.active).length} Pending
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-label-sm text-foreground-dim">
            {allDomains.length} Domains
          </span>
          <span className="text-label-sm text-foreground-dim">
            {allAgents.length} Agents
          </span>
        </div>
      </div>

      {/* Zoom controls — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-0 border border-border bg-surface-raised">
        <button
          onClick={zoomOut}
          disabled={zoom <= ZOOM_MIN}
          className="p-2 text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:cursor-default transition-colors"
        >
          <IconZoomOut size={14} strokeWidth={1.5} />
        </button>
        <button
          onClick={zoomReset}
          className="px-2 py-1.5 font-mono text-[10px] text-foreground-dim hover:text-foreground border-x border-border transition-colors min-w-[44px] text-center"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={zoomIn}
          disabled={zoom >= ZOOM_MAX}
          className="p-2 text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:cursor-default transition-colors"
        >
          <IconZoomIn size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable canvas */}
      <div className="flex-1 overflow-auto">
        <div
          className="inline-flex flex-col items-center min-w-full px-12 py-10 origin-top-left transition-transform duration-150"
          style={{ transform: `scale(${zoom})` }}
        >

          {/* ─── TIER 0: Workspace Root ─── */}
          <div className="border border-foreground px-8 py-3 bg-surface-raised">
            <p className="text-label-sm text-foreground font-mono font-semibold tracking-wider">
              ACME WORKSPACE
            </p>
          </div>

          {/* Trunk */}
          <div className="w-px h-10 bg-border" />

          {/* ─── Horizontal rail across all department subtrees ─── */}
          {/* We use a wrapper that sizes to content, with a rail spanning first-to-last dept center */}
          <div className="relative">
            {/* Department subtrees in a row */}
            <div className="flex items-start" style={{ gap: DEPT_GAP }}>
              {departments.map((dept) => (
                <DeptBranch key={dept.name} dept={dept} />
              ))}
            </div>

            {/* Horizontal rail overlay — connects the top drop-lines of all departments */}
            {/* Positioned at the very top of the subtree row, spanning from first center to last center */}
            <div
              className="absolute top-0 left-0 right-0 h-px bg-border pointer-events-none"
              style={{
                left: `calc(${(() => {
                  // First dept subtree width
                  const first = departments[0];
                  const firstW = first.domains.length * DOMAIN_W + (first.domains.length - 1) * DOMAIN_GAP;
                  return firstW / 2;
                })()}px)`,
                right: `calc(${(() => {
                  const last = departments[departments.length - 1];
                  const lastW = last.domains.length * DOMAIN_W + (last.domains.length - 1) * DOMAIN_GAP;
                  return lastW / 2;
                })()}px)`,
              }}
            />
          </div>

          {/* ─── Legend ─── */}
          <div className="mt-16 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-label-sm text-foreground-dim">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-warning" />
              <span className="text-label-sm text-foreground-dim">Draft</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-border" />
              <span className="text-label-sm text-foreground-dim">Connection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-border opacity-40" />
              <span className="text-label-sm text-foreground-dim">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
