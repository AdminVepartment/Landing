"use client";

import { useState, useEffect, useCallback } from "react";
import {
  IconOri,
  IconOriConfident,
  IconOriFocused,
  IconOriCalm,
  IconOriThinking,
  IconOriDetermined,
  IconOriWatching,
  IconOriExcited,
  IconOriCurious,
  IconRex,
  IconPix,
  IconVig,
  IconLux,
  IconZyn,
  IconNox,
  IconKel,
  IconRho,
  IconAxe,
  IconSol,
  IconFlux,
  IconCogAgent,
} from "@/components/icons/vepartment";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconPlay, IconX } from "@/components/icons";
import type { ComponentType } from "react";

type FaceIcon = ComponentType<{ size?: number; strokeWidth?: number | string; className?: string }>;

interface Expression {
  Icon: FaceIcon;
  name: string;
  when: string;
  desc: string;
}

interface Character {
  Icon: FaceIcon;
  name: string;
  shape: string;
  role: string;
  desc: string;
}

const EXPRESSIONS: Expression[] = [
  { Icon: IconOri, name: "Default", when: "Normal conversation, greeting, idle", desc: "Happy, friendly — the everyday Ori" },
  { Icon: IconOriConfident, name: "Confident", when: "Giving directives, summaries, confirmations", desc: "Level brows, wide eyes, assured dash mouth" },
  { Icon: IconOriFocused, name: "Focused", when: "Processing tasks, busy, loading", desc: "Compact eyes, level brows, neutral mouth" },
  { Icon: IconOriCalm, name: "Calm", when: "System info, stable states, idle monitoring", desc: "Flat brows, tall solid eyes, long calm mouth" },
  { Icon: IconOriThinking, name: "Thinking", when: "Planning, strategizing, weighing options", desc: "One brow raised, offset eyes, angled mouth" },
  { Icon: IconOriDetermined, name: "Determined", when: "Executing tasks, running operations", desc: "Inward brows, tall alert eyes, firm split mouth" },
  { Icon: IconOriWatching, name: "Watching", when: "Monitoring status, checking health, scanning", desc: "Sharp wide brows, narrow scanning eyes" },
  { Icon: IconOriExcited, name: "Excited", when: "Success, good metrics, task completed", desc: "Raised brows, wide eyes, big chevron smile" },
  { Icon: IconOriCurious, name: "Curious", when: "Exploring, discovering, asking questions", desc: "Asymmetric brows, offset eyes, open 'o' mouth" },
];

const CHARACTERS: Character[] = [
  { Icon: IconOri, name: "Ori", shape: "◇ Diamond", role: "Operations Agent", desc: "Your personal assistant. Happy, friendly, always ready." },
  { Icon: IconRex, name: "Rex", shape: "□ Square", role: "Supervisor", desc: "Structured, commanding. Oversees departments and domains." },
  { Icon: IconPix, name: "Pix", shape: "⊡ Notched", role: "Worker", desc: "Compact, industrious. Executes tasks and gets things done." },
  { Icon: IconVig, name: "Vig", shape: "⬠ Shield", role: "Monitor", desc: "Vigilant, protective. Watches health, quality, and compliance." },
  { Icon: IconLux, name: "Lux", shape: "△ Triangle", role: "Strategist", desc: "Elevated, directional. Plans, analyzes, finds the path." },
  { Icon: IconZyn, name: "Zyn", shape: "⬡ Hexagon", role: "Innovator", desc: "Experimental, curious. Explores new ideas and approaches." },
  { Icon: IconNox, name: "Nox", shape: "▽ Inv. triangle", role: "Enforcer", desc: "Stern, imposing. Governs policy and enforces rules." },
  { Icon: IconKel, name: "Kel", shape: "◈ Wide diamond", role: "Connector", desc: "Warm, relational. Routes data and bridges between agents." },
  { Icon: IconRho, name: "Rho", shape: "▯ Tall rect", role: "Analyst", desc: "Methodical, deep. Processes numbers, reads data." },
  { Icon: IconAxe, name: "Axe", shape: "▷ Arrow", role: "Executor", desc: "Sharp, forward. Drives execution at speed." },
  { Icon: IconSol, name: "Sol", shape: "○ Circle", role: "Guide", desc: "Approachable, warm. Onboards, teaches, supports." },
  { Icon: IconFlux, name: "Flux", shape: "▱ Parallelogram", role: "Automator", desc: "In motion, flowing. Runs pipelines and automation." },
  { Icon: IconCogAgent, name: "Cog", shape: "✚ Cross", role: "Builder", desc: "Constructive, modular. Assembles and configures systems." },
];

// Scenario
const SCENARIO: Array<{ expression: number; event: string; detail: string; duration: number }> = [
  { expression: 0, event: "User opens Ori", detail: "Hey there!", duration: 2000 },
  { expression: 4, event: "User asks a question", detail: "Hmm, let me think about that...", duration: 2500 },
  { expression: 2, event: "Processing request", detail: "Looking into it now.", duration: 2000 },
  { expression: 5, event: "Running task", detail: "Deploying agent SM-I1...", duration: 2500 },
  { expression: 6, event: "Monitoring progress", detail: "Watching deployment status...", duration: 2000 },
  { expression: 7, event: "Task succeeded!", detail: "Done! SM-I1 is live.", duration: 2500 },
  { expression: 1, event: "Delivering report", detail: "Here's your summary.", duration: 2000 },
  { expression: 8, event: "Unexpected finding", detail: "Wait — I found something interesting.", duration: 2500 },
  { expression: 4, event: "Analyzing", detail: "Let me dig deeper...", duration: 2000 },
  { expression: 3, event: "All clear", detail: "Everything looks stable.", duration: 2500 },
  { expression: 0, event: "Ready", detail: "What's next?", duration: 2000 },
];

export default function OriFacesPage() {
  const [activeExpression, setActiveExpression] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenarioStep, setScenarioStep] = useState(-1);
  const [transitioning, setTransitioning] = useState(false);

  const transitionTo = useCallback((index: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveExpression(index);
      setTimeout(() => setTransitioning(false), 150);
    }, 150);
  }, []);

  useEffect(() => {
    if (!isPlaying || scenarioStep < 0) return;
    if (scenarioStep >= SCENARIO.length) {
      setIsPlaying(false);
      setScenarioStep(-1);
      return;
    }
    const step = SCENARIO[scenarioStep];
    transitionTo(step.expression);
    const timer = setTimeout(() => setScenarioStep((s) => s + 1), step.duration);
    return () => clearTimeout(timer);
  }, [isPlaying, scenarioStep, transitionTo]);

  function startScenario() { setScenarioStep(0); setIsPlaying(true); }
  function stopScenario() { setIsPlaying(false); setScenarioStep(-1); transitionTo(0); }

  const current = EXPRESSIONS[activeExpression];
  const currentScenario = isPlaying && scenarioStep >= 0 && scenarioStep < SCENARIO.length ? SCENARIO[scenarioStep] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[960px] mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <Link href="/dashboard/agent" className="flex items-center gap-1.5 text-foreground-dim hover:text-foreground transition-colors mb-6">
            <IconArrowLeft size={13} />
            <span className="text-label-sm">Back to Ori</span>
          </Link>
          <h1 className="text-module-lg font-medium text-foreground mb-2">Agent Characters & Expressions</h1>
          <p className="text-body-md text-foreground-muted">
            Each agent has its own geometric identity. Ori reacts with expressions — others have fixed personalities.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* CHARACTERS                                                     */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-os-title-sm text-foreground-dim">AGENT CHARACTERS</span>
            <div className="flex-1 h-px bg-border" />
            <span className="text-label-sm text-foreground-dim font-mono">{CHARACTERS.length} types</span>
          </div>

          {/* Character lineup — large side-by-side */}
          <div className="border border-border bg-surface mb-6">
            <div className="flex items-end justify-center gap-8 px-6 py-10 bg-background border-b border-border-subtle">
              {CHARACTERS.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 flex items-center justify-center border border-primary/20 bg-primary/5">
                    <c.Icon size={40} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-body-sm font-semibold text-foreground">{c.name}</p>
                    <p className="text-label-sm text-foreground-dim">{c.shape}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Character cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHARACTERS.map((c) => (
              <div key={c.name} className="border border-border bg-surface">
                <div className="flex items-center justify-center py-8 bg-background border-b border-border-subtle">
                  <div className="w-20 h-20 flex items-center justify-center border border-primary/20 bg-primary/5">
                    <c.Icon size={48} className="text-primary" />
                  </div>
                </div>

                {/* Sizes */}
                <div className="flex items-center justify-center gap-5 py-3 border-b border-border-subtle bg-surface-raised">
                  {[14, 20, 28, 36].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-1">
                      <c.Icon size={s} className="text-foreground" />
                      <span className="text-label-sm text-foreground-dim font-mono">{s}</span>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-module-sm font-semibold text-foreground">{c.name}</span>
                    <span className="text-os-title-sm px-1.5 py-0.5 border border-border text-foreground-dim">{c.role}</span>
                  </div>
                  <p className="text-label-sm text-foreground-dim">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ORI EXPRESSIONS                                                */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-os-title-sm text-foreground-dim">ORI EXPRESSIONS</span>
            <div className="flex-1 h-px bg-border" />
            <span className="text-label-sm text-foreground-dim font-mono">{EXPRESSIONS.length} moods</span>
          </div>

          {/* Live preview */}
          <div className="border border-border bg-surface mb-6">
            <div className="flex items-center justify-between px-6 py-3 border-b border-border">
              <span className="text-os-title-sm text-foreground-dim">LIVE PREVIEW</span>
              {isPlaying ? (
                <button onClick={stopScenario} className="flex items-center gap-1.5 px-3 py-1.5 border border-error/30 text-error hover:bg-error/5 transition-colors">
                  <IconX size={11} />
                  <span className="text-label-sm">Stop</span>
                </button>
              ) : (
                <button onClick={startScenario} className="flex items-center gap-1.5 px-3 py-1.5 border border-primary/30 text-primary hover:bg-primary/5 transition-colors">
                  <IconPlay size={11} />
                  <span className="text-label-sm">Play scenario</span>
                </button>
              )}
            </div>

            <div className="flex flex-col items-center py-10 px-6">
              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-24 h-24 ori-status-ring border border-primary/15" />
                  <div className="absolute w-24 h-24 ori-status-ring border border-primary/10" style={{ animationDelay: "1.5s" }} />
                </div>
                <div className={cn(
                  "w-24 h-24 flex items-center justify-center border-2 border-primary/20 bg-primary/5 ori-idle transition-all duration-300",
                  transitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"
                )}>
                  <current.Icon size={56} className="text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-success animate-ping opacity-30" />
                </div>
              </div>

              <span className="text-module-sm font-semibold text-foreground mb-1">Ori — {current.name}</span>

              {currentScenario ? (
                <div className="text-center mt-1">
                  <p className="text-os-title-sm text-primary">{currentScenario.event}</p>
                  <p className="text-body-sm text-foreground-muted">&ldquo;{currentScenario.detail}&rdquo;</p>
                </div>
              ) : (
                <p className="text-label-sm text-foreground-dim">{current.when}</p>
              )}

              {isPlaying && (
                <div className="flex items-center gap-1 mt-5">
                  {SCENARIO.map((_, i) => (
                    <div key={i} className={cn("h-1 transition-all duration-300", i === scenarioStep ? "w-5 bg-primary" : i < scenarioStep ? "w-2.5 bg-primary/40" : "w-2.5 bg-border")} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Expression picker */}
          <div className="border border-border bg-surface mb-6">
            <div className="px-6 py-3 border-b border-border">
              <span className="text-os-title-sm text-foreground-dim">CLICK TO PREVIEW</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-px bg-border-subtle">
              {EXPRESSIONS.map((face, i) => (
                <button
                  key={face.name}
                  onClick={() => { if (!isPlaying) transitionTo(i); }}
                  className={cn("flex flex-col items-center gap-2 py-4 px-2 transition-colors", i === activeExpression ? "bg-primary/5" : "bg-surface hover:bg-surface-raised")}
                >
                  <div className={cn("w-9 h-9 flex items-center justify-center border transition-colors", i === activeExpression ? "border-primary/40 bg-primary/10" : "border-border bg-background")}>
                    <face.Icon size={22} className={i === activeExpression ? "text-primary" : "text-foreground-muted"} />
                  </div>
                  <span className={cn("text-label-sm", i === activeExpression ? "text-primary" : "text-foreground-dim")}>{face.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Expression cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPRESSIONS.map((face, i) => (
              <button
                key={face.name}
                onClick={() => { if (!isPlaying) transitionTo(i); }}
                className={cn("border bg-surface flex flex-col items-center text-left transition-colors", i === activeExpression ? "border-primary/30" : "border-border hover:border-foreground-muted")}
              >
                <div className="w-full flex items-center justify-center py-6 bg-background border-b border-border-subtle">
                  <div className={cn("w-14 h-14 flex items-center justify-center border transition-colors", i === activeExpression ? "border-primary/30 bg-primary/5" : "border-border bg-surface")}>
                    <face.Icon size={36} className={i === activeExpression ? "text-primary" : "text-foreground"} />
                  </div>
                </div>
                <div className="w-full px-5 py-3">
                  <span className="text-body-sm font-semibold text-foreground">Ori — {face.name}</span>
                  <p className="text-label-sm text-foreground-dim mt-0.5">{face.when}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
