"use client";

import type { ComponentType, CSSProperties } from "react";
import {
  IconMarketing, IconBranding, IconSustainability, IconSales,
  IconOperations, IconHRTalent, IconProduct,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type AnyIcon = ComponentType<{
  size?: number;
  strokeWidth?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

interface AgentDot {
  id: string;
  status: "active" | "draft";
  layerColor: string;
}

interface OfficeDomain {
  name: string;
  active: boolean;
  agents: AgentDot[];
}

interface OfficeDept {
  name: string;
  code: string;
  Icon: AnyIcon;
  colorVar: string;
  active: boolean;
  domains: OfficeDomain[];
}

const officeDepts: OfficeDept[] = [
  {
    name: "Marketing", code: "MKT", Icon: IconMarketing as AnyIcon, colorVar: "marketing", active: true,
    domains: [
      {
        name: "Social & Messaging", active: true,
        agents: [
          { id: "SM-F1", status: "active", layerColor: "#8C90A0" },
          { id: "SM-S1", status: "active", layerColor: "#7B9EB8" },
          { id: "SM-E1", status: "active", layerColor: "#B89560" },
          { id: "SM-M1", status: "active", layerColor: "#5FA89A" },
          { id: "SM-G1", status: "active", layerColor: "#7BA680" },
          { id: "SM-I1", status: "draft",  layerColor: "#9E87B5" },
        ],
      },
      { name: "Content Strategy", active: false, agents: [] },
      { name: "PR & Comms", active: false, agents: [] },
    ],
  },
  {
    name: "Branding", code: "BRD", Icon: IconBranding as AnyIcon, colorVar: "branding", active: false,
    domains: [
      { name: "Brand Identity", active: false, agents: [] },
      { name: "Visual Design", active: false, agents: [] },
    ],
  },
  {
    name: "Operations", code: "OPS", Icon: IconOperations as AnyIcon, colorVar: "operations", active: false,
    domains: [
      { name: "Process Auto.", active: false, agents: [] },
      { name: "Quality Assur.", active: false, agents: [] },
    ],
  },
  {
    name: "Sales", code: "SLS", Icon: IconSales as AnyIcon, colorVar: "sales", active: false,
    domains: [
      { name: "Pipeline Mgmt", active: false, agents: [] },
      { name: "Client Relations", active: false, agents: [] },
    ],
  },
  {
    name: "Product", code: "PRD", Icon: IconProduct as AnyIcon, colorVar: "product", active: false,
    domains: [
      { name: "Product Strategy", active: false, agents: [] },
      { name: "Feature Dev", active: false, agents: [] },
    ],
  },
  {
    name: "Sustainability", code: "SUS", Icon: IconSustainability as AnyIcon, colorVar: "sustainability", active: false,
    domains: [
      { name: "ESG Reporting", active: false, agents: [] },
      { name: "Carbon Tracking", active: false, agents: [] },
    ],
  },
  {
    name: "HR / Talent", code: "HR", Icon: IconHRTalent as AnyIcon, colorVar: "hr", active: false,
    domains: [
      { name: "Recruitment", active: false, agents: [] },
      { name: "People Ops", active: false, agents: [] },
    ],
  },
];

// Seeded positions for agent dots within a room (percentage-based)
const AGENT_POSITIONS: [number, number][] = [
  [22, 28], [68, 22], [40, 60], [75, 65], [20, 72], [55, 40],
  [35, 30], [80, 45], [15, 50], [60, 75], [45, 20], [25, 55],
];

// Staggered animation delays for natural movement
const ANIM_DELAYS = [0, 1.2, 2.5, 0.8, 3.1, 1.7, 0.4, 2.8, 1.0, 3.5, 0.6, 2.2];

const totalActive = officeDepts.filter((d) => d.active).length;
const totalDomains = officeDepts.flatMap((d) => d.domains).filter((d) => d.active).length;
const totalAgents = officeDepts.flatMap((d) => d.domains).flatMap((d) => d.agents).length;

export function OfficeMap() {
  return (
    <div className="bg-surface border border-border overflow-hidden">
      {/* Building shell */}
      <div className="relative p-3">

        {/* Lobby / entrance */}
        <div className="flex items-center justify-center border border-border bg-background px-3 py-1.5 mb-0">
          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-foreground-dim">
            ACME HQ — FLOOR PLAN
          </span>
        </div>

        {/* Corridor */}
        <div className="flex">
          <div className="flex-1 h-[3px] bg-border/50" />
        </div>

        {/* Department wings */}
        <div className="flex gap-[1px] bg-border/30">
          {officeDepts.map((dept) => {
            const DIcon = dept.Icon;
            return (
              <div
                key={dept.code}
                className="flex-1 flex flex-col"
                style={{
                  "--dept-c": dept.active ? `var(--dept-${dept.colorVar}-main)` : "var(--border)",
                } as CSSProperties}
              >
                {/* Department label strip */}
                <div
                  className={cn(
                    "flex items-center justify-center gap-1 py-1 border-b",
                    dept.active
                      ? "bg-[hsl(var(--dept-c)/0.08)] border-[hsl(var(--dept-c)/0.3)]"
                      : "bg-background border-border/50 opacity-30"
                  )}
                >
                  <DIcon
                    size={8}
                    strokeWidth={1.5}
                    className={dept.active ? "text-[hsl(var(--dept-c))]" : "text-foreground-dim"}
                  />
                  <span
                    className={cn(
                      "font-mono text-[6px] uppercase tracking-[0.12em]",
                      dept.active ? "text-[hsl(var(--dept-c))]" : "text-foreground-dim"
                    )}
                  >
                    {dept.code}
                  </span>
                </div>

                {/* Domain rooms */}
                <div className="flex flex-col gap-[1px] bg-border/20 flex-1">
                  {dept.domains.map((domain) => (
                    <div
                      key={domain.name}
                      className={cn(
                        "relative flex-1 min-h-[48px]",
                        domain.active
                          ? "bg-[hsl(var(--dept-c)/0.04)]"
                          : "bg-background/60 opacity-25"
                      )}
                      style={{
                        borderLeft: domain.active
                          ? `2px solid hsl(var(--dept-c) / 0.2)`
                          : "2px solid transparent",
                      }}
                    >
                      {/* Room label */}
                      <span className="absolute top-1 left-1.5 font-mono text-[5px] uppercase tracking-[0.08em] text-foreground-dim/60 leading-none max-w-[90%] truncate">
                        {domain.name}
                      </span>

                      {/* Agent dots */}
                      {domain.active && domain.agents.map((agent, i) => {
                        const [x, y] = AGENT_POSITIONS[i % AGENT_POSITIONS.length];
                        const delay = ANIM_DELAYS[i % ANIM_DELAYS.length];
                        return (
                          <div
                            key={agent.id}
                            className="absolute"
                            style={{
                              left: `${x}%`,
                              top: `${y}%`,
                              animation: `office-drift ${3 + (i % 3)}s ease-in-out ${delay}s infinite alternate`,
                            }}
                          >
                            {/* Agent body */}
                            <div
                              className="relative"
                              title={agent.id}
                            >
                              <div
                                className="w-[5px] h-[5px] rounded-full"
                                style={{
                                  backgroundColor: agent.layerColor,
                                  opacity: agent.status === "draft" ? 0.4 : 0.9,
                                }}
                              />
                              {/* Pulse ring for active agents */}
                              {agent.status === "active" && (
                                <div
                                  className="absolute inset-0 rounded-full animate-ping"
                                  style={{
                                    backgroundColor: agent.layerColor,
                                    opacity: 0.15,
                                    animationDuration: `${2 + (i % 3)}s`,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Empty room indicator for inactive domains */}
                      {!domain.active && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-[1px] bg-border/40" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom corridor */}
        <div className="flex">
          <div className="flex-1 h-[3px] bg-border/50" />
        </div>

        {/* Footer stats bar */}
        <div className="flex items-center gap-3 justify-center mt-2">
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-success" />
            <span className="font-mono text-[6px] text-foreground-dim">
              {totalActive} dept
            </span>
          </div>
          <div className="w-px h-2 bg-border/40" />
          <span className="font-mono text-[6px] text-foreground-dim">
            {totalDomains} domain
          </span>
          <div className="w-px h-2 bg-border/40" />
          <span className="font-mono text-[6px] text-foreground-dim">
            {totalAgents} agents
          </span>
        </div>
      </div>

    </div>
  );
}
