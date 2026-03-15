"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  IconArrowLeft, IconZoomIn, IconZoomOut,
  IconMarketing, IconUsers, IconWorkflow,
  IconCompass, IconZap, IconBuilding,
  IconLibrary, IconCalendarDays, IconGauge, IconUserPlus,
  IconTarget, IconActivity, IconTrendingUp, IconLightbulb, IconLayers,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import { cn } from "@/lib/utils";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Marketing-only org data ─────────────────────────────────────────────────

interface Agent {
  name: string;
  code: string;
  Icon: AnyIcon;
  layer: string;
  layerColor: string;
  status: "active" | "draft";
}

interface Domain {
  name: string;
  Icon: AnyIcon;
  active: boolean;
  agents: Agent[];
}

const DOMAINS: Domain[] = [
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
];

const LAYERS = [
  { name: "Foundation", short: "FOUND", Icon: IconLayers, color: "#8C90A0" },
  { name: "Strategy", short: "STRAT", Icon: IconTarget, color: "#7B9EB8" },
  { name: "Execution", short: "EXEC", Icon: IconWorkflow, color: "#B89560" },
  { name: "Monitoring", short: "MON", Icon: IconActivity, color: "#5FA89A" },
  { name: "Growth", short: "GROWTH", Icon: IconTrendingUp, color: "#7BA680" },
  { name: "Innovation", short: "INNOV", Icon: IconLightbulb, color: "#9E87B5" },
];

const allAgents = DOMAINS.flatMap((d) => d.agents);
const DOMAIN_W = 200;
const DOMAIN_GAP = 16;

// ── Components ───────────────────────────────────────────────────────────────

function DomainBranch({ domain }: { domain: Domain }) {
  const DDIcon = domain.Icon;

  return (
    <div className="flex flex-col items-center" style={{ width: DOMAIN_W }}>
      {/* Drop line */}
      <div className={cn("w-px h-6", domain.active ? "bg-border" : "bg-border/30")} />

      {/* Domain node */}
      <div
        className={cn(
          "w-full border px-3 py-3 flex items-center gap-2.5",
          domain.active
            ? "border-foreground/20 bg-surface-raised"
            : "border-border bg-surface opacity-40"
        )}
      >
        <DDIcon size={14} strokeWidth={1.5} className="text-foreground-muted shrink-0" />
        <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-foreground-dim flex-1 leading-tight">
          {domain.name}
        </span>
        {domain.active && <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />}
      </div>

      {/* Agents below */}
      {domain.active && domain.agents.length > 0 && (
        <>
          <div className="w-px h-6 bg-border" />

          {/* Layer-grouped agent list */}
          <div className="w-full border border-border bg-background p-2 space-y-1">
            <div className="flex items-center gap-1.5 px-1.5 pb-1.5 border-b border-border">
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-foreground-dim">
                AI AGENTS
              </span>
              <span className="font-mono text-[8px] text-foreground-dim ml-auto">
                {domain.agents.length}
              </span>
            </div>
            {domain.agents.map((agent) => {
              const AIcon = agent.Icon;
              const layer = LAYERS.find((l) => l.name === agent.layer);
              return (
                <div
                  key={agent.code}
                  className="flex items-center gap-2 px-2 py-2 border border-border bg-surface"
                >
                  <AIcon
                    size={12}
                    strokeWidth={1.5}
                    style={{ color: agent.layerColor }}
                    className="shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[8px] uppercase tracking-[0.04em] text-foreground-dim truncate leading-tight">
                      {agent.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className="font-mono text-[7px] uppercase tracking-wider"
                        style={{ color: agent.layerColor }}
                      >
                        {layer?.short ?? agent.layer}
                      </span>
                      <span className="font-mono text-[7px] text-foreground-dim">
                        {agent.code}
                      </span>
                    </div>
                  </div>
                  {agent.status === "active" ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
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

const ZOOM_MIN = 0.4;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

export default function MarketingOrgMapPage() {
  const [zoom, setZoom] = useState(0.85);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1))), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1))), []);
  const zoomReset = useCallback(() => setZoom(0.85), []);

  const domainCount = DOMAINS.length;
  const subtreeW = domainCount * DOMAIN_W + (domainCount - 1) * DOMAIN_GAP;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-6 h-14 border-b border-border shrink-0">
        <Link
          href="/dashboard/marketing"
          className="flex items-center gap-2 text-foreground-dim hover:text-foreground transition-colors"
        >
          <IconArrowLeft size={14} strokeWidth={1.5} />
          <span className="text-body-sm">Marketing</span>
        </Link>
        <div className="w-px h-5 bg-border" />
        <h1 className="text-os-title-sm text-foreground-muted">ORGANIZATION MAP</h1>

        {/* Stats */}
        <div className="ml-auto flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-label-sm text-foreground-dim">
              {DOMAINS.filter((d) => d.active).length} Active Domain{DOMAINS.filter((d) => d.active).length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground-dim" />
            <span className="text-label-sm text-foreground-dim">
              {DOMAINS.filter((d) => !d.active).length} Pending
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-label-sm text-foreground-dim">
            {allAgents.length} Agents
          </span>
          <div className="w-px h-4 bg-border" />
          <Link
            href="/dashboard/marketing/virtual-office"
            className="flex items-center gap-1.5 text-label-sm text-foreground-dim hover:text-foreground transition-colors"
          >
            <IconBuilding size={11} strokeWidth={1.5} />
            <span>Office View</span>
          </Link>
        </div>
      </div>

      {/* Zoom controls */}
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
          {/* Department root */}
          <div
            className="border px-8 py-4 flex flex-col items-center gap-2"
            style={{
              borderColor: "hsl(var(--dept-marketing-main))",
              backgroundColor: "hsl(var(--dept-marketing-light))",
            }}
          >
            <IconMarketing
              size={24}
              strokeWidth={1.5}
              className="text-[hsl(var(--dept-marketing-main))]"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-center leading-tight text-[hsl(var(--dept-marketing-main))]">
              Marketing
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] text-foreground-dim">MKT</span>
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
            </div>
          </div>

          {/* Stem */}
          <div className="w-px h-10 bg-border" />

          {/* Domain fan-out */}
          <div style={{ width: subtreeW }}>
            {/* Horizontal rail */}
            {domainCount > 1 && (
              <div
                className="h-px mx-auto bg-border"
                style={{ width: subtreeW - DOMAIN_W + DOMAIN_GAP }}
              />
            )}

            {/* Domain columns */}
            <div className="flex justify-center" style={{ gap: DOMAIN_GAP }}>
              {DOMAINS.map((domain) => (
                <DomainBranch key={domain.name} domain={domain} />
              ))}
            </div>
          </div>

          {/* Legend */}
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
