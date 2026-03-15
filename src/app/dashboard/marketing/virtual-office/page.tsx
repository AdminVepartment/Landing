"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  IconArrowLeft, IconZoomIn, IconZoomOut,
  IconMarketing, IconUsers, IconWorkflow,
  IconCompass, IconZap,
  IconLibrary, IconCalendarDays, IconGauge, IconUserPlus,
  IconNetwork,
} from "@/components/icons";
import { IconSocialMessaging } from "@/components/icons/vepartment";
import { cn } from "@/lib/utils";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

// ── Marketing-only office data ──────────────────────────────────────────────

interface WalkingAgent {
  name: string;
  code: string;
  Icon: AnyIcon;
  layer: string;
  layerColor: string;
  status: "active" | "draft";
  walkAnim: string;
  walkDuration: number;
}

interface OfficeDomain {
  name: string;
  code: string;
  Icon: AnyIcon;
  active: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  agents: WalkingAgent[];
}

// Canvas dimensions — smaller since only one department
const CW = 700;
const CH = 650;

const DOMAINS: OfficeDomain[] = [
  {
    name: "Social & Messaging", code: "S&M", Icon: IconSocialMessaging as AnyIcon, active: true,
    x: 5, y: 12, w: 42, h: 55,
    agents: [
      { name: "Rules & Context Manager", code: "SM-F1", Icon: IconLibrary as AnyIcon, layer: "Foundation", layerColor: "#8C90A0", status: "active", walkAnim: "vo-walk-1", walkDuration: 28 },
      { name: "Strategy Planner", code: "SM-S1", Icon: IconCompass as AnyIcon, layer: "Strategy", layerColor: "#7B9EB8", status: "active", walkAnim: "vo-walk-2", walkDuration: 32 },
      { name: "Content Creator", code: "SM-E1", Icon: IconCalendarDays as AnyIcon, layer: "Execution", layerColor: "#B89560", status: "active", walkAnim: "vo-walk-3", walkDuration: 24 },
      { name: "Quality Reviewer", code: "SM-M1", Icon: IconGauge as AnyIcon, layer: "Monitoring", layerColor: "#5FA89A", status: "active", walkAnim: "vo-walk-4", walkDuration: 36 },
      { name: "Performance Optimizer", code: "SM-G1", Icon: IconUserPlus as AnyIcon, layer: "Growth", layerColor: "#7BA680", status: "active", walkAnim: "vo-walk-5", walkDuration: 26 },
      { name: "Innovation Explorer", code: "SM-I1", Icon: IconZap as AnyIcon, layer: "Innovation", layerColor: "#9E87B5", status: "draft", walkAnim: "vo-walk-6", walkDuration: 40 },
    ],
  },
  {
    name: "Content Strategy", code: "CS", Icon: IconWorkflow as AnyIcon, active: false,
    x: 53, y: 12, w: 42, h: 25, agents: [],
  },
  {
    name: "PR & Comms", code: "PR", Icon: IconUsers as AnyIcon, active: false,
    x: 53, y: 42, w: 42, h: 25, agents: [],
  },
];

const allAgents = DOMAINS.flatMap((d) => d.agents);

// Desk positions within a domain room (percentage within the room)
const DESK_LAYOUTS: [number, number][][] = [
  [[15, 30], [45, 30], [75, 30], [15, 62], [45, 62], [75, 62]],
  [[20, 40], [60, 40], [20, 70], [60, 70]],
  [[30, 50], [65, 50]],
];

function getDeskLayout(agentCount: number): [number, number][] {
  if (agentCount >= 5) return DESK_LAYOUTS[0];
  if (agentCount >= 3) return DESK_LAYOUTS[1];
  return DESK_LAYOUTS[2];
}

// ── Components ───────────────────────────────────────────────────────────────

function Desk({ x, y, occupied }: { x: number; y: number; occupied: boolean }) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <div
        className={cn(
          "w-[18px] h-[12px] border",
          occupied
            ? "border-foreground-dim/30 bg-surface-raised/80"
            : "border-border/30 bg-background/40"
        )}
      />
      <div
        className={cn(
          "w-[7px] h-[7px] rounded-full mx-auto mt-[2px]",
          occupied ? "bg-foreground-dim/20" : "bg-border/20"
        )}
      />
    </div>
  );
}

function AgentAvatar({ agent }: { agent: WalkingAgent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute z-10 group cursor-pointer"
      style={{
        animation: `${agent.walkAnim} ${agent.walkDuration}s linear infinite`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex flex-col items-center">
        <div
          className="w-[12px] h-[12px] rounded-full border-[1.5px]"
          style={{
            borderColor: agent.layerColor,
            backgroundColor: `${agent.layerColor}33`,
            opacity: agent.status === "draft" ? 0.5 : 1,
          }}
        />
        <div
          className="w-[7px] h-[10px] -mt-[1px]"
          style={{
            backgroundColor: `${agent.layerColor}88`,
            opacity: agent.status === "draft" ? 0.5 : 1,
            animation: "vo-idle-bob 2s ease-in-out infinite",
          }}
        />
        <div
          className="w-[10px] h-[3px] rounded-full mt-[1px]"
          style={{ backgroundColor: `${agent.layerColor}15` }}
        />
        {agent.status === "active" && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full"
            style={{
              backgroundColor: agent.layerColor,
              animation: "vo-pulse 3s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-50 pointer-events-none">
          <div className="bg-surface border border-border px-2.5 py-2 flex flex-col items-center gap-0.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-foreground">
              {agent.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className="font-mono text-[8px] uppercase tracking-wider"
                style={{ color: agent.layerColor }}
              >
                {agent.layer}
              </span>
              <span className="font-mono text-[8px] text-foreground-dim">{agent.code}</span>
              <div className={cn(
                "w-1 h-1 rounded-full",
                agent.status === "active" ? "bg-success" : "bg-warning"
              )} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DomainRoom({ domain }: { domain: OfficeDomain }) {
  const desks = getDeskLayout(domain.agents.length);

  return (
    <div
      className="absolute"
      style={{
        left: `${domain.x}%`,
        top: `${domain.y}%`,
        width: `${domain.w}%`,
        height: `${domain.h}%`,
      }}
    >
      <div
        className={cn(
          "w-full h-full border relative overflow-visible",
          domain.active
            ? "border-foreground/15 bg-surface/50"
            : "border-border/20 bg-background/30"
        )}
        style={domain.active ? {
          borderLeftColor: "hsl(var(--dept-marketing-main) / 0.4)",
          borderLeftWidth: 2,
        } : undefined}
      >
        {/* Room label */}
        <div className="absolute top-1.5 left-2.5 flex items-center gap-1.5">
          <span className={cn(
            "font-mono text-[8px] uppercase tracking-[0.1em]",
            domain.active ? "text-foreground-dim/70" : "text-foreground-dim/30"
          )}>
            {domain.code}
          </span>
          {domain.active && <div className="w-1.5 h-1.5 rounded-full bg-success/60" />}
        </div>

        {/* Room name */}
        <span className={cn(
          "absolute bottom-1.5 left-2.5 font-mono text-[7px] uppercase tracking-[0.06em]",
          domain.active ? "text-foreground-dim/40" : "text-foreground-dim/15"
        )}>
          {domain.name}
        </span>

        {/* Desks */}
        {desks.map(([dx, dy], i) => (
          <Desk key={i} x={dx} y={dy} occupied={i < domain.agents.length} />
        ))}

        {/* Door */}
        <div className={cn(
          "absolute -top-[1px] left-1/2 -translate-x-1/2 h-[3px]",
          domain.active ? "bg-surface w-[24px]" : "bg-background/50 w-[16px]"
        )} />

        {/* Vacant overlay */}
        {!domain.active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[7px] text-foreground-dim/20 uppercase tracking-[0.15em]">
              VACANT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

export default function MarketingVirtualOfficePage() {
  const [zoom, setZoom] = useState(0.9);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1))), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1))), []);
  const zoomReset = useCallback(() => setZoom(0.9), []);

  const activeAgents = allAgents.filter((a) => a.status === "active").length;
  const activeDomains = DOMAINS.filter((d) => d.active).length;

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
        <h1 className="text-os-title-sm text-foreground-muted">VIRTUAL OFFICE</h1>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 ml-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-label-sm text-success/80 font-mono">LIVE</span>
        </div>

        {/* Stats & links */}
        <div className="ml-auto flex items-center gap-5">
          <span className="text-label-sm text-foreground-dim">
            {activeDomains} domain{activeDomains !== 1 ? "s" : ""} active
          </span>
          <div className="w-px h-4 bg-border" />
          <span className="text-label-sm text-foreground-dim">
            {activeAgents} agents working
          </span>
          <div className="w-px h-4 bg-border" />
          <Link
            href="/dashboard/marketing/org-map"
            className="flex items-center gap-1.5 text-label-sm text-foreground-dim hover:text-foreground transition-colors"
          >
            <IconNetwork size={11} strokeWidth={1.5} />
            <span>Org Chart</span>
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

      {/* Agent list sidebar */}
      <div className="fixed bottom-6 left-6 z-50 border border-border bg-surface w-[180px]">
        <div className="px-3 py-2 border-b border-border flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-foreground-dim">
            AGENTS — {allAgents.length}
          </span>
        </div>
        <div className="max-h-[260px] overflow-auto">
          {allAgents.map((agent) => (
            <div
              key={agent.code}
              className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-raised transition-colors cursor-pointer"
            >
              <div
                className="w-[7px] h-[7px] rounded-full shrink-0"
                style={{
                  backgroundColor: agent.layerColor,
                  opacity: agent.status === "draft" ? 0.4 : 1,
                }}
              />
              <span className="font-mono text-[8px] text-foreground-dim flex-1 truncate">
                {agent.name}
              </span>
              <span className="font-mono text-[7px] text-foreground-dim/50">{agent.code}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto bg-background">
        <div
          className="origin-top-left transition-transform duration-150"
          style={{
            width: CW,
            height: CH + 40,
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            margin: "0 auto",
          }}
        >
          <div className="relative" style={{ width: CW, height: CH }}>
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Building outline */}
            <div
              className="absolute border border-border/30"
              style={{ left: 20, top: 30, width: CW - 40, height: CH - 50 }}
            />

            {/* Department header */}
            <div
              className="absolute flex items-center justify-center gap-2 border bg-[hsl(var(--dept-marketing-main)/0.06)]"
              style={{
                left: CW / 2 - 120,
                top: 40,
                width: 240,
                height: 50,
                borderColor: "hsl(var(--dept-marketing-main) / 0.25)",
              }}
            >
              <IconMarketing
                size={16}
                strokeWidth={1.5}
                className="text-[hsl(var(--dept-marketing-main))]"
              />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[hsl(var(--dept-marketing-main))]">
                MARKETING
              </span>
              <div className="w-2 h-2 rounded-full bg-success/70 ml-1" />
            </div>

            {/* Corridor */}
            <div
              className="absolute border-y bg-surface/10"
              style={{
                left: 30,
                top: 100,
                width: CW - 60,
                height: 40,
                borderColor: "hsl(var(--border) / 0.25)",
              }}
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[7px] uppercase tracking-[0.2em] text-foreground-dim/20">
                DEPARTMENT CORRIDOR
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] h-px bg-border/10" />
              </div>
            </div>

            {/* Connector from header to corridor */}
            <div
              className="absolute bg-border/20"
              style={{ left: CW / 2 - 0.5, top: 90, width: 1, height: 10 }}
            />

            {/* Domain rooms area */}
            <div
              className="absolute border relative overflow-visible"
              style={{
                left: 60,
                top: 150,
                width: CW - 120,
                height: CH - 220,
                borderColor: "hsl(var(--dept-marketing-main) / 0.15)",
                backgroundColor: "hsl(var(--dept-marketing-main) / 0.02)",
              }}
            >
              {/* Domain rooms */}
              {DOMAINS.map((domain) => (
                <DomainRoom key={domain.code} domain={domain} />
              ))}

              {/* Walking agents */}
              {DOMAINS.flatMap((domain) =>
                domain.agents.map((agent) => (
                  <AgentAvatar key={agent.code} agent={agent} />
                ))
              )}

              {/* Internal corridor (horizontal) */}
              <div
                className="absolute left-0 right-0 top-[10%] h-px"
                style={{ backgroundColor: "hsl(var(--foreground) / 0.04)" }}
              />
            </div>

            {/* Shared spaces */}
            {/* Meeting room */}
            <div
              className="absolute border border-border/15 bg-surface/20"
              style={{ left: CW - 170, top: 160, width: 100, height: 70 }}
            >
              <span className="absolute top-1 left-2 font-mono text-[7px] uppercase tracking-[0.1em] text-foreground-dim/25">
                MEETING ROOM
              </span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36px] h-[18px] border border-border/20 bg-surface-raised/30" />
            </div>

            {/* Break room */}
            <div
              className="absolute border border-border/15 bg-surface/20"
              style={{ left: CW - 170, top: 245, width: 100, height: 55 }}
            >
              <span className="absolute top-1 left-2 font-mono text-[7px] uppercase tracking-[0.1em] text-foreground-dim/25">
                BREAK ROOM
              </span>
            </div>

            {/* Scale */}
            <div className="absolute bottom-3 right-4 flex items-center gap-2">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-2 bg-foreground-dim/20" />
                <div className="w-[40px] h-px bg-foreground-dim/20" />
                <span className="font-mono text-[5px] text-foreground-dim/20">~25m</span>
              </div>
            </div>

            {/* North indicator */}
            <div className="absolute top-3 right-4 flex flex-col items-center gap-0.5">
              <span className="font-mono text-[7px] text-foreground-dim/20">N</span>
              <div className="w-px h-3 bg-foreground-dim/20" />
              <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-transparent border-b-foreground-dim/20 -mt-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
