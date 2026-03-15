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

// ── Office data ──────────────────────────────────────────────────────────────

interface WalkingAgent {
  name: string;
  code: string;
  Icon: AnyIcon;
  layer: string;
  layerColor: string;
  status: "active" | "draft";
  walkAnim: string; // keyframe name
  walkDuration: number; // seconds
}

interface OfficeDomain {
  name: string;
  code: string;
  Icon: AnyIcon;
  active: boolean;
  /** Position & size within the department wing (percentage of wing) */
  x: number;
  y: number;
  w: number;
  h: number;
  agents: WalkingAgent[];
}

interface OfficeDept {
  name: string;
  code: string;
  Icon: AnyIcon;
  colorVar: string;
  active: boolean;
  /** Position on the floor plan — absolute px from top-left of canvas */
  x: number;
  y: number;
  w: number;
  h: number;
  domains: OfficeDomain[];
}

// Canvas dimensions
const CW = 1400;
const CH = 900;

// Layout constants
const CORRIDOR_Y = 140;
const CORRIDOR_H = 50;
const WING_Y = CORRIDOR_Y + CORRIDOR_H; // 190
const WING_H = 520;
const WING_W = 170;
const WING_GAP = 12;
const WING_START_X = 40;

function wingX(i: number) {
  return WING_START_X + i * (WING_W + WING_GAP);
}

const departments: OfficeDept[] = [
  {
    name: "Marketing", code: "MKT", Icon: IconMarketing as AnyIcon, colorVar: "marketing", active: true,
    x: wingX(0), y: WING_Y, w: WING_W, h: WING_H,
    domains: [
      {
        name: "Social & Messaging", code: "S&M", Icon: IconSocialMessaging as AnyIcon, active: true,
        x: 5, y: 8, w: 90, h: 45,
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
        x: 5, y: 56, w: 90, h: 18, agents: [],
      },
      {
        name: "PR & Comms", code: "PR", Icon: IconUsers as AnyIcon, active: false,
        x: 5, y: 77, w: 90, h: 18, agents: [],
      },
    ],
  },
  {
    name: "Branding", code: "BRD", Icon: IconBranding as AnyIcon, colorVar: "branding", active: false,
    x: wingX(1), y: WING_Y, w: WING_W, h: WING_H,
    domains: [
      { name: "Brand Identity", code: "BI", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 8, w: 90, h: 42, agents: [] },
      { name: "Visual Design", code: "VD", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 54, w: 90, h: 42, agents: [] },
    ],
  },
  {
    name: "Operations", code: "OPS", Icon: IconOperations as AnyIcon, colorVar: "operations", active: false,
    x: wingX(2), y: WING_Y, w: WING_W, h: WING_H,
    domains: [
      { name: "Process Automation", code: "PA", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 8, w: 90, h: 42, agents: [] },
      { name: "Quality Assurance", code: "QA", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 54, w: 90, h: 42, agents: [] },
    ],
  },
  {
    name: "Sales", code: "SLS", Icon: IconSales as AnyIcon, colorVar: "sales", active: false,
    x: wingX(3), y: WING_Y, w: WING_W, h: WING_H,
    domains: [
      { name: "Pipeline Management", code: "PM", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 8, w: 90, h: 42, agents: [] },
      { name: "Client Relations", code: "CR", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 54, w: 90, h: 42, agents: [] },
    ],
  },
  {
    name: "Product", code: "PRD", Icon: IconProduct as AnyIcon, colorVar: "product", active: false,
    x: wingX(4), y: WING_Y, w: WING_W, h: WING_H,
    domains: [
      { name: "Product Strategy", code: "PS", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 8, w: 90, h: 42, agents: [] },
      { name: "Feature Development", code: "FD", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 54, w: 90, h: 42, agents: [] },
    ],
  },
  {
    name: "Sustainability", code: "SUS", Icon: IconSustainability as AnyIcon, colorVar: "sustainability", active: false,
    x: wingX(5), y: WING_Y, w: WING_W, h: WING_H,
    domains: [
      { name: "ESG Reporting", code: "ESG", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 8, w: 90, h: 42, agents: [] },
      { name: "Carbon Tracking", code: "CT", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 54, w: 90, h: 42, agents: [] },
    ],
  },
  {
    name: "HR / Talent", code: "HR", Icon: IconHRTalent as AnyIcon, colorVar: "hr", active: false,
    x: wingX(6), y: WING_Y, w: WING_W, h: WING_H,
    domains: [
      { name: "Recruitment", code: "REC", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 8, w: 90, h: 42, agents: [] },
      { name: "People Operations", code: "PO", Icon: IconWorkflow as AnyIcon, active: false, x: 5, y: 54, w: 90, h: 42, agents: [] },
    ],
  },
];

const allAgents = departments.flatMap((d) => d.domains.flatMap((dm) => dm.agents));

// Desk positions within a domain room (percentage within the room)
const DESK_LAYOUTS: [number, number][][] = [
  // 6 desks: 2 rows of 3
  [[15, 35], [45, 35], [75, 35], [15, 68], [45, 68], [75, 68]],
  // 4 desks
  [[20, 40], [60, 40], [20, 70], [60, 70]],
  // 2 desks
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
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Desk surface */}
      <div
        className={cn(
          "w-[16px] h-[10px] border",
          occupied
            ? "border-foreground-dim/30 bg-surface-raised/80"
            : "border-border/30 bg-background/40"
        )}
      />
      {/* Chair (small circle below desk) */}
      <div
        className={cn(
          "w-[6px] h-[6px] rounded-full mx-auto mt-[2px]",
          occupied ? "bg-foreground-dim/20" : "bg-border/20"
        )}
      />
    </div>
  );
}

function AgentAvatar({ agent, deptActive }: { agent: WalkingAgent; deptActive: boolean }) {
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
      {/* Agent body */}
      <div className="relative flex flex-col items-center">
        {/* Head */}
        <div
          className="w-[10px] h-[10px] rounded-full border-[1.5px]"
          style={{
            borderColor: agent.layerColor,
            backgroundColor: `${agent.layerColor}33`,
            opacity: agent.status === "draft" ? 0.5 : 1,
          }}
        />
        {/* Body */}
        <div
          className="w-[6px] h-[8px] -mt-[1px]"
          style={{
            backgroundColor: `${agent.layerColor}88`,
            opacity: agent.status === "draft" ? 0.5 : 1,
            animation: "vo-idle-bob 2s ease-in-out infinite",
          }}
        />
        {/* Walking shadow */}
        <div
          className="w-[8px] h-[3px] rounded-full mt-[1px]"
          style={{ backgroundColor: `${agent.layerColor}15` }}
        />
        {/* Activity pulse */}
        {agent.status === "active" && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full"
            style={{
              backgroundColor: agent.layerColor,
              animation: "vo-pulse 3s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-50 pointer-events-none">
          <div className="bg-surface border border-border px-2 py-1.5 flex flex-col items-center gap-0.5">
            <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-foreground">
              {agent.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className="font-mono text-[7px] uppercase tracking-wider"
                style={{ color: agent.layerColor }}
              >
                {agent.layer}
              </span>
              <span className="font-mono text-[7px] text-foreground-dim">{agent.code}</span>
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

function DomainRoom({ domain, dept }: { domain: OfficeDomain; dept: OfficeDept }) {
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
          borderLeftColor: `hsl(var(--dept-${dept.colorVar}-main) / 0.4)`,
          borderLeftWidth: 2,
        } : undefined}
      >
        {/* Room label */}
        <div className="absolute top-1 left-2 flex items-center gap-1">
          <span className={cn(
            "font-mono text-[7px] uppercase tracking-[0.1em]",
            domain.active ? "text-foreground-dim/70" : "text-foreground-dim/30"
          )}>
            {domain.code}
          </span>
          {domain.active && (
            <div className="w-1 h-1 rounded-full bg-success/60" />
          )}
        </div>

        {/* Room name (bottom) */}
        <span className={cn(
          "absolute bottom-1 left-2 font-mono text-[6px] uppercase tracking-[0.06em]",
          domain.active ? "text-foreground-dim/40" : "text-foreground-dim/15"
        )}>
          {domain.name}
        </span>

        {/* Desks */}
        {desks.map(([dx, dy], i) => (
          <Desk key={i} x={dx} y={dy} occupied={i < domain.agents.length} />
        ))}

        {/* Door indicator */}
        <div
          className={cn(
            "absolute -top-[1px] left-1/2 -translate-x-1/2 h-[3px]",
            domain.active ? "bg-surface w-[20px]" : "bg-background/50 w-[14px]"
          )}
        />

        {/* Empty room overlay */}
        {!domain.active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[6px] text-foreground-dim/20 uppercase tracking-[0.15em]">
              VACANT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function DeptWing({ dept }: { dept: OfficeDept }) {
  const DIcon = dept.Icon;

  return (
    <div
      className="absolute"
      style={{
        left: dept.x,
        top: dept.y,
        width: dept.w,
        height: dept.h,
        "--dept-c": `var(--dept-${dept.colorVar}-main)`,
      } as CSSProperties}
    >
      {/* Wing outline */}
      <div className={cn(
        "w-full h-full border relative",
        dept.active
          ? "border-[hsl(var(--dept-c)/0.25)] bg-[hsl(var(--dept-c)/0.02)]"
          : "border-border/20 bg-background/20"
      )}>
        {/* Department header strip */}
        <div className={cn(
          "absolute -top-[22px] left-0 right-0 h-[22px] flex items-center justify-center gap-1.5 border border-b-0",
          dept.active
            ? "border-[hsl(var(--dept-c)/0.25)] bg-[hsl(var(--dept-c)/0.06)]"
            : "border-border/20 bg-background/30"
        )}>
          <DIcon
            size={10}
            strokeWidth={1.5}
            className={dept.active ? "text-[hsl(var(--dept-c))]" : "text-foreground-dim/30"}
          />
          <span className={cn(
            "font-mono text-[8px] uppercase tracking-[0.12em]",
            dept.active ? "text-[hsl(var(--dept-c))]" : "text-foreground-dim/30"
          )}>
            {dept.code}
          </span>
          {dept.active && <div className="w-1.5 h-1.5 rounded-full bg-success/70" />}
        </div>

        {/* Entrance from corridor */}
        <div className={cn(
          "absolute -top-[1px] left-1/2 -translate-x-1/2 h-[3px]",
          dept.active ? "bg-[hsl(var(--dept-c)/0.06)] w-[30px]" : "bg-background/30 w-[20px]"
        )} />

        {/* Domain rooms */}
        {dept.domains.map((domain) => (
          <DomainRoom key={domain.code} domain={domain} dept={dept} />
        ))}

        {/* Internal corridor (vertical) */}
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px]",
          dept.active ? "bg-foreground-dim/8" : "bg-border/10"
        )} />

        {/* Not active overlay label */}
        {!dept.active && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-background/60 border border-border/20 px-3 py-1.5">
              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-foreground-dim/30">
                COMING SOON
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Walking agents — positioned relative to the entire canvas, but scoped visually to this wing */}
      {dept.active && dept.domains.flatMap((domain) =>
        domain.agents.map((agent) => (
          <AgentAvatar key={agent.code} agent={agent} deptActive={dept.active} />
        ))
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const ZOOM_MIN = 0.4;
const ZOOM_MAX = 1.5;
const ZOOM_STEP = 0.1;

export default function VirtualOfficePage() {
  const [zoom, setZoom] = useState(0.85);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1))), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1))), []);
  const zoomReset = useCallback(() => setZoom(0.85), []);

  const activeDepts = departments.filter((d) => d.active).length;
  const activeAgents = allAgents.filter((a) => a.status === "active").length;

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
        <h1 className="text-os-title-sm text-foreground-muted">VIRTUAL OFFICE</h1>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 ml-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-label-sm text-success/80 font-mono">LIVE</span>
        </div>

        {/* Stats */}
        <div className="ml-auto flex items-center gap-5">
          <span className="text-label-sm text-foreground-dim">
            {activeDepts} active dept{activeDepts !== 1 ? "s" : ""}
          </span>
          <div className="w-px h-4 bg-border" />
          <span className="text-label-sm text-foreground-dim">
            {activeAgents} agents working
          </span>
          <div className="w-px h-4 bg-border" />
          <Link
            href="/dashboard/org-map"
            className="text-label-sm text-foreground-dim hover:text-foreground transition-colors"
          >
            Org Chart →
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
      <div className="fixed bottom-6 left-6 z-50 border border-border bg-surface w-[160px]">
        <div className="px-3 py-2 border-b border-border flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-foreground-dim">
            AGENTS ONLINE — {allAgents.length}
          </span>
        </div>
        <div className="max-h-[240px] overflow-auto">
          {allAgents.map((agent) => (
            <div
              key={agent.code}
              className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-raised transition-colors cursor-pointer"
            >
              <div
                className="w-[6px] h-[6px] rounded-full shrink-0"
                style={{
                  backgroundColor: agent.layerColor,
                  opacity: agent.status === "draft" ? 0.4 : 1,
                }}
              />
              <span className="font-mono text-[7px] text-foreground-dim flex-1 truncate">
                {agent.name}
              </span>
              <span className="font-mono text-[6px] text-foreground-dim/50">{agent.code}</span>
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
            height: CH + 60,
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            margin: "0 auto",
          }}
        >
          {/* Floor plan canvas */}
          <div
            className="relative"
            style={{ width: CW, height: CH }}
          >
            {/* Grid pattern background */}
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

            {/* ── Building outline ── */}
            <div
              className="absolute border border-border/30"
              style={{ left: 20, top: 40, width: CW - 40, height: CH - 60 }}
            />

            {/* ── Lobby / Reception ── */}
            <div
              className="absolute flex items-center justify-center border border-border/40 bg-surface/30"
              style={{ left: CW / 2 - 120, top: 50, width: 240, height: 60 }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-foreground flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-foreground" />
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground">
                    ACME HQ
                  </span>
                </div>
                <span className="font-mono text-[6px] uppercase tracking-[0.2em] text-foreground-dim/50">
                  RECEPTION
                </span>
              </div>
            </div>

            {/* Lobby → Corridor connector */}
            <div
              className="absolute bg-border/20"
              style={{ left: CW / 2 - 0.5, top: 110, width: 1, height: 30 }}
            />

            {/* ── Main Corridor ── */}
            <div
              className="absolute border-y border-border/25 bg-surface/10"
              style={{
                left: 30,
                top: CORRIDOR_Y,
                width: CW - 60,
                height: CORRIDOR_H,
              }}
            >
              {/* Corridor label */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[6px] uppercase tracking-[0.2em] text-foreground-dim/20">
                MAIN CORRIDOR
              </span>

              {/* Corridor floor pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] h-px bg-border/10" />
              </div>

              {/* Department entrance markers along corridor */}
              {departments.map((dept) => (
                <div
                  key={dept.code}
                  className="absolute bottom-0 flex flex-col items-center"
                  style={{ left: dept.x + dept.w / 2 - 15, width: 30 }}
                >
                  <div className={cn(
                    "w-full h-[3px]",
                    dept.active ? "bg-foreground/10" : "bg-border/10"
                  )} />
                </div>
              ))}
            </div>

            {/* ── Department Wings ── */}
            {departments.map((dept) => (
              <DeptWing key={dept.code} dept={dept} />
            ))}

            {/* ── Shared spaces (meeting room, break room) ── */}
            {/* Meeting room */}
            <div
              className="absolute border border-border/15 bg-surface/20"
              style={{ left: CW - 180, top: WING_Y + 20, width: 120, height: 80 }}
            >
              <span className="absolute top-1 left-2 font-mono text-[6px] uppercase tracking-[0.1em] text-foreground-dim/25">
                MEETING ROOM
              </span>
              {/* Table */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[20px] border border-border/20 bg-surface-raised/30" />
            </div>

            {/* Break room */}
            <div
              className="absolute border border-border/15 bg-surface/20"
              style={{ left: CW - 180, top: WING_Y + 120, width: 120, height: 60 }}
            >
              <span className="absolute top-1 left-2 font-mono text-[6px] uppercase tracking-[0.1em] text-foreground-dim/25">
                BREAK ROOM
              </span>
            </div>

            {/* Server room */}
            <div
              className="absolute border border-border/15 bg-surface/20"
              style={{ left: CW - 180, top: WING_Y + 200, width: 120, height: 50 }}
            >
              <span className="absolute top-1 left-2 font-mono text-[6px] uppercase tracking-[0.1em] text-foreground-dim/25">
                SERVER ROOM
              </span>
              {/* Server racks */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute bg-foreground/5 border border-border/10"
                  style={{ left: 15 + i * 30, top: 20, width: 20, height: 22 }}
                />
              ))}
            </div>

            {/* ── Scale / compass ── */}
            <div className="absolute bottom-3 right-4 flex items-center gap-2">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-2 bg-foreground-dim/20" />
                <div className="w-[40px] h-px bg-foreground-dim/20" />
                <span className="font-mono text-[5px] text-foreground-dim/20">~50m</span>
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
