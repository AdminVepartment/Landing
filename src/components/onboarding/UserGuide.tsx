"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import {
  IconX, IconChevronRight, IconChevronLeft,
  IconRocket, IconBuilding, IconBot, IconWorkflow,
  IconLayers, IconBell, IconSettings, IconShield,
  IconTarget, IconActivity, IconBookOpen,
  IconCircleCheckBig, IconHASSystem,
  IconMarketing, IconBranding, IconSales,
} from "@/components/icons";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type AnyIcon = ComponentType<{ size?: number; className?: string }>;

interface GuideSection {
  id: string;
  title: string;
  subtitle: string;
  icon: AnyIcon;
  content: GuidePage[];
}

interface GuidePage {
  heading: string;
  body: string;
  bullets?: string[];
  tip?: string;
  visual?: "departments" | "agent-layers" | "has-scale" | "workflow-flow";
}

// ── Guide content ────────────────────────────────────────────────────────────

const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "What is Vepartment",
    icon: IconRocket,
    content: [
      {
        heading: "Welcome to Vepartment",
        body: "Vepartment is an AI-native operating system for modular virtual departments. It replaces traditional team structures with intelligent, autonomous agent networks that work around the clock.",
        bullets: [
          "Each department is a self-contained unit with its own AI agents",
          "Agents collaborate through structured workflows and governance",
          "You stay in control through the Human Agency Scale (HAS)",
          "Every action is logged, auditable, and reversible",
        ],
      },
      {
        heading: "Core concepts",
        body: "The platform is built around four key primitives. Understanding these will help you navigate everything else.",
        bullets: [
          "Vepartment — A virtual department (e.g. Marketing, Sales, Operations)",
          "Domain — A focus area within a department (e.g. Social & Messaging)",
          "Agent — An AI worker assigned to a specific role within a domain",
          "Workflow — An automated chain of agent actions triggered by events",
        ],
        tip: "Think of it as: Company → Department → Team → Individual → Process",
      },
    ],
  },
  {
    id: "departments",
    title: "Departments",
    subtitle: "Virtual org structure",
    icon: IconBuilding,
    content: [
      {
        heading: "Virtual departments",
        body: "A vepartment mirrors a traditional business department — but powered entirely by AI agents. Each one operates independently with its own domains, agents, budgets, and governance.",
        visual: "departments",
      },
      {
        heading: "Department anatomy",
        body: "Every department has a consistent internal structure:",
        bullets: [
          "Dashboard — Overview of health, metrics, and active workflows",
          "Domains — Focus areas (think: teams within a department)",
          "Agent Registry — All AI agents assigned to this department",
          "Workflows — Automated processes that chain agents together",
          "Settings — Governance policies, HAS levels, and access control",
        ],
        tip: "Start with one department. Most users begin with Marketing.",
      },
    ],
  },
  {
    id: "agents",
    title: "Agents",
    subtitle: "Your AI workforce",
    icon: IconBot,
    content: [
      {
        heading: "AI agent system",
        body: "Agents are the core workers of Vepartment. Each agent has a defined role, layer, and autonomy level. They can be configured with policies, data sources, and quality criteria.",
        visual: "agent-layers",
      },
      {
        heading: "Agent layers",
        body: "Agents within a domain are organized into 6 functional layers. Each layer handles a different responsibility in the operating stack.",
        bullets: [
          "FND — Foundation: data collection, knowledge base, core inputs",
          "STR — Strategy: planning, analysis, recommendation generation",
          "EXC — Execution: content creation, task completion, output delivery",
          "MON — Monitoring: quality review, compliance, performance checks",
          "GRW — Growth: optimization, A/B testing, performance improvement",
          "INN — Innovation: experimentation, trend detection, new approaches",
        ],
      },
      {
        heading: "Human Agency Scale (HAS)",
        body: "Every agent operates at a defined HAS level that determines how much autonomy it has. You set the level; the system enforces it.",
        visual: "has-scale",
        tip: "New agents start at HAS 1 (Insight). Increase autonomy as trust builds.",
      },
    ],
  },
  {
    id: "workflows",
    title: "Workflows",
    subtitle: "Automated pipelines",
    icon: IconWorkflow,
    content: [
      {
        heading: "Workflow system",
        body: "Workflows are automated pipelines that chain agents together. When a trigger fires, agents execute their tasks in sequence — each passing output to the next.",
        visual: "workflow-flow",
      },
      {
        heading: "Workflow components",
        body: "Every workflow has three parts:",
        bullets: [
          "Trigger — What starts the workflow (schedule, event, manual, or API call)",
          "Steps — Ordered agent actions, each with input/output contracts",
          "Approval gates — Optional human checkpoints at critical decision points",
        ],
        tip: "Approval gates are required for workflows above HAS 3 (Assist).",
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    subtitle: "Oversight & notifications",
    icon: IconActivity,
    content: [
      {
        heading: "Monitoring & oversight",
        body: "Vepartment gives you full visibility into what your AI agents are doing. Every action is logged, and you receive notifications for key events.",
        bullets: [
          "Notification Center — Real-time alerts for approvals, completions, and issues",
          "Activity Feed — Chronological log of all agent actions across departments",
          "Health Dashboard — System status, agent performance, and error rates",
          "Audit Trail — Immutable record of all decisions and outputs for compliance",
        ],
      },
      {
        heading: "Notification categories",
        body: "Notifications are organized into four categories so you can filter and prioritize:",
        bullets: [
          "Approval — Actions requiring your review before proceeding",
          "Agent — Updates from individual agents (completions, flags, status changes)",
          "Workflow — Pipeline events (triggers, completions, failures)",
          "System — Platform-level events (maintenance, activations, errors)",
        ],
        tip: "Set up notification rules to only surface what matters. Not all alerts need your attention.",
      },
    ],
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Control & policies",
    icon: IconShield,
    content: [
      {
        heading: "Governance framework",
        body: "Vepartment is built with governance at its core. Every agent, workflow, and output is subject to configurable policies that ensure quality, compliance, and alignment.",
        bullets: [
          "Policies — Rules that agents must follow (tone, format, constraints)",
          "Quality Dimensions — Measurable criteria agents are scored against",
          "Approval Gates — Human checkpoints in automated workflows",
          "Audit Logs — Complete history of all system actions and decisions",
        ],
      },
      {
        heading: "Configuration hierarchy",
        body: "Policies cascade down through the system. Higher-level settings are inherited unless explicitly overridden.",
        bullets: [
          "Platform level — Global rules that apply to all departments",
          "Department level — Department-specific policies and constraints",
          "Domain level — Focus-area customizations within a department",
          "Agent level — Individual agent tuning and behavioral rules",
        ],
        tip: "Set broad guardrails at the platform level. Fine-tune at the agent level.",
      },
    ],
  },
];

// ── Visual diagrams ──────────────────────────────────────────────────────────

function DepartmentsVisual() {
  const depts = [
    { icon: IconMarketing, label: "MARKETING", domains: 8, agents: 48, active: true },
    { icon: IconBranding, label: "BRANDING", domains: 5, agents: 30, active: false },
    { icon: IconSales, label: "SALES", domains: 6, agents: 36, active: false },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {depts.map((d) => {
        const Icon = d.icon;
        return (
          <div
            key={d.label}
            className={cn(
              "border p-3 flex flex-col gap-2",
              d.active
                ? "border-primary bg-primary/5"
                : "border-border bg-background"
            )}
          >
            <Icon size={14} className={d.active ? "text-primary" : "text-foreground-dim"} />
            <span className={cn(
              "text-[8px] font-mono uppercase tracking-[0.1em]",
              d.active ? "text-primary" : "text-foreground-dim"
            )}>
              {d.label}
            </span>
            <div className="flex gap-3 mt-auto">
              <span className="text-[8px] font-mono text-foreground-dim">
                {d.domains} domains
              </span>
              <span className="text-[8px] font-mono text-foreground-dim">
                {d.agents} agents
              </span>
            </div>
            {d.active && (
              <span className="text-[7px] font-mono uppercase tracking-[0.1em] text-primary">
                ACTIVE
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AgentLayersVisual() {
  const layers = [
    { code: "INN", label: "Innovation", color: "text-foreground-dim" },
    { code: "GRW", label: "Growth", color: "text-foreground-dim" },
    { code: "MON", label: "Monitoring", color: "text-foreground-dim" },
    { code: "EXC", label: "Execution", color: "text-foreground" },
    { code: "STR", label: "Strategy", color: "text-foreground" },
    { code: "FND", label: "Foundation", color: "text-foreground" },
  ];

  return (
    <div className="flex flex-col gap-px">
      {layers.map((l, i) => (
        <div
          key={l.code}
          className="flex items-center gap-3 px-3 py-1.5 bg-background border border-border-subtle"
        >
          <span className="text-[9px] font-mono text-primary w-7">{l.code}</span>
          <div className="h-[2px] flex-1 bg-border">
            <div
              className="h-full bg-foreground-dim/30"
              style={{ width: `${100 - i * 15}%` }}
            />
          </div>
          <span className={cn("text-[9px] font-mono", l.color)}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}

function HASScaleVisual() {
  const levels = [
    { n: 1, label: "Insight", desc: "AI observes, human acts" },
    { n: 2, label: "Suggestion", desc: "AI suggests, human decides" },
    { n: 3, label: "Assist", desc: "AI and human collaborate" },
    { n: 4, label: "Execute", desc: "AI acts, human oversees" },
    { n: 5, label: "Autonomous", desc: "AI self-operates" },
  ];

  return (
    <div className="flex flex-col gap-px">
      {levels.map((l) => (
        <div
          key={l.n}
          className="flex items-center gap-3 px-3 py-1.5 bg-background border border-border-subtle"
        >
          <span className="text-[9px] font-mono text-primary w-5 text-center">{l.n}</span>
          <span className="text-[9px] font-mono text-foreground w-20">{l.label}</span>
          <div className="h-[2px] flex-1 bg-border">
            <div
              className="h-full bg-primary/40"
              style={{ width: `${l.n * 20}%` }}
            />
          </div>
          <span className="text-[8px] font-mono text-foreground-dim">{l.desc}</span>
        </div>
      ))}
    </div>
  );
}

function WorkflowFlowVisual() {
  const nodes = ["TRIGGER", "AGENT 1", "AGENT 2", "GATE", "AGENT 3", "OUTPUT"];

  return (
    <div className="flex items-center gap-1 overflow-x-auto py-1">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-1 shrink-0">
          <div className={cn(
            "px-2.5 py-1.5 border text-[8px] font-mono uppercase tracking-[0.06em]",
            n === "GATE"
              ? "border-warning text-warning bg-warning/5"
              : n === "TRIGGER"
                ? "border-primary text-primary bg-primary/5"
                : n === "OUTPUT"
                  ? "border-success text-success bg-success/5"
                  : "border-border text-foreground-dim"
          )}>
            {n}
          </div>
          {i < nodes.length - 1 && (
            <span className="text-foreground-dim/40 text-[10px]">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

const VISUAL_MAP: Record<string, ComponentType> = {
  departments: DepartmentsVisual,
  "agent-layers": AgentLayersVisual,
  "has-scale": HASScaleVisual,
  "workflow-flow": WorkflowFlowVisual,
};

// ── Main component ───────────────────────────────────────────────────────────

export function UserGuide({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(
    new Set([GUIDE_SECTIONS[0].id])
  );

  if (!open) return null;

  const section = GUIDE_SECTIONS[activeSectionIdx];
  const page = section.content[activePageIdx];
  const totalPages = section.content.length;

  // Global progress: sections visited
  const totalSections = GUIDE_SECTIONS.length;
  const visitedCount = visitedSections.size;
  const progressPct = Math.round((visitedCount / totalSections) * 100);

  function goToSection(idx: number) {
    setActiveSectionIdx(idx);
    setActivePageIdx(0);
    setVisitedSections((prev) => new Set(prev).add(GUIDE_SECTIONS[idx].id));
  }

  function nextPage() {
    if (activePageIdx < totalPages - 1) {
      setActivePageIdx(activePageIdx + 1);
    } else if (activeSectionIdx < totalSections - 1) {
      goToSection(activeSectionIdx + 1);
    }
  }

  function prevPage() {
    if (activePageIdx > 0) {
      setActivePageIdx(activePageIdx - 1);
    } else if (activeSectionIdx > 0) {
      const prevSection = GUIDE_SECTIONS[activeSectionIdx - 1];
      setActiveSectionIdx(activeSectionIdx - 1);
      setActivePageIdx(prevSection.content.length - 1);
    }
  }

  const isFirstPage = activeSectionIdx === 0 && activePageIdx === 0;
  const isLastPage =
    activeSectionIdx === totalSections - 1 && activePageIdx === totalPages - 1;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-background/70" onClick={onClose} />

      {/* Guide panel */}
      <div className="fixed inset-4 z-50 flex items-center justify-center">
        <div className="w-full max-w-[820px] h-full max-h-[640px] bg-surface border border-border flex flex-col overflow-hidden">

          {/* Top bar */}
          <div className="flex items-center gap-3 px-5 h-12 border-b border-border shrink-0">
            <IconBookOpen size={13} className="text-foreground-muted" />
            <span className="text-os-title-sm text-foreground-muted flex-1">USER GUIDE</span>
            <span className="text-[8px] font-mono text-foreground-dim">
              {visitedCount}/{totalSections} SECTIONS
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors"
            >
              <IconX size={12} />
            </button>
          </div>

          {/* Progress */}
          <div className="h-[2px] bg-border shrink-0">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Body: sidebar + content */}
          <div className="flex flex-1 min-h-0">

            {/* Section nav sidebar */}
            <div className="w-52 border-r border-border shrink-0 overflow-y-auto bg-background">
              <div className="py-2">
                {GUIDE_SECTIONS.map((s, idx) => {
                  const SectionIcon = s.icon;
                  const isActive = idx === activeSectionIdx;
                  const isVisited = visitedSections.has(s.id);

                  return (
                    <button
                      key={s.id}
                      onClick={() => goToSection(idx)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors",
                        isActive
                          ? "bg-surface border-l-2 border-l-primary"
                          : "border-l-2 border-l-transparent hover:bg-surface/50"
                      )}
                    >
                      <SectionIcon
                        size={12}
                        className={cn(
                          isActive
                            ? "text-primary"
                            : isVisited
                              ? "text-foreground-muted"
                              : "text-foreground-dim"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-[10px] font-mono uppercase tracking-[0.06em] leading-tight",
                          isActive
                            ? "text-foreground"
                            : isVisited
                              ? "text-foreground-muted"
                              : "text-foreground-dim"
                        )}>
                          {s.title}
                        </p>
                        <p className="text-[8px] font-mono text-foreground-dim/60 mt-0.5 truncate">
                          {s.subtitle}
                        </p>
                      </div>
                      {isVisited && !isActive && (
                        <IconCircleCheckBig size={10} className="text-primary/50 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col min-w-0">

              {/* Section header */}
              <div className="px-6 pt-5 pb-4 border-b border-border-subtle shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-mono text-foreground-dim uppercase tracking-[0.1em]">
                    SECTION {activeSectionIdx + 1} OF {totalSections}
                  </span>
                  {totalPages > 1 && (
                    <>
                      <div className="w-px h-2.5 bg-border" />
                      <span className="text-[8px] font-mono text-foreground-dim uppercase tracking-[0.1em]">
                        PAGE {activePageIdx + 1} OF {totalPages}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-module-md text-foreground">{page.heading}</h2>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {/* Body text */}
                <p className="text-body-md text-foreground-muted leading-relaxed mb-4">
                  {page.body}
                </p>

                {/* Visual diagram */}
                {page.visual && VISUAL_MAP[page.visual] && (
                  <div className="mb-5 border border-border-subtle bg-background p-4">
                    {(() => {
                      const Visual = VISUAL_MAP[page.visual!];
                      return <Visual />;
                    })()}
                  </div>
                )}

                {/* Bullet list */}
                {page.bullets && (
                  <div className="space-y-2 mb-4">
                    {page.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1 h-1 bg-foreground-dim shrink-0 mt-[7px]" />
                        <p className="text-body-sm text-foreground-muted leading-relaxed">{b}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tip box */}
                {page.tip && (
                  <div className="border border-primary/20 bg-primary/5 px-4 py-3 mt-4">
                    <div className="flex items-start gap-2.5">
                      <IconTarget size={11} className="text-primary shrink-0 mt-0.5" />
                      <p className="text-label-sm text-foreground-muted leading-relaxed">
                        <span className="text-primary font-mono text-[9px] uppercase tracking-[0.06em] mr-1.5">
                          TIP
                        </span>
                        {page.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Page navigation footer */}
              <div className="flex items-center justify-between px-6 py-3 border-t border-border shrink-0">
                <button
                  onClick={prevPage}
                  disabled={isFirstPage}
                  className={cn(
                    "flex items-center gap-1.5 h-8 px-3 border transition-colors",
                    isFirstPage
                      ? "border-border-subtle text-foreground-dim/30 cursor-not-allowed"
                      : "border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted"
                  )}
                >
                  <IconChevronLeft size={11} />
                  <span className="text-label-sm">Previous</span>
                </button>

                {/* Page dots */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5">
                    {section.content.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePageIdx(i)}
                        className={cn(
                          "w-1.5 h-1.5 transition-colors",
                          i === activePageIdx
                            ? "bg-primary"
                            : "bg-foreground-dim/30 hover:bg-foreground-dim"
                        )}
                      />
                    ))}
                  </div>
                )}

                {isLastPage ? (
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 h-8 px-4 border border-primary text-primary hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-label-sm font-medium">Done</span>
                    <IconCircleCheckBig size={11} />
                  </button>
                ) : (
                  <button
                    onClick={nextPage}
                    className="flex items-center gap-1.5 h-8 px-3 border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors"
                  >
                    <span className="text-label-sm">Next</span>
                    <IconChevronRight size={11} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
