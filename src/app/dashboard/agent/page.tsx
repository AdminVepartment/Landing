"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  IconHome, IconChevronRight, IconArrowLeft, IconSearch, IconBell,
  IconSettings, IconBot, IconLayers, IconPlus, IconWorkflow,
  IconGauge, IconBarChart, IconScale, IconBookUser, IconSend,
  IconLoader, IconPanelRight, IconClock, IconActivity,
  IconShieldCheck, IconCheckCircle, IconAlertTriangle, IconXCircle,
  IconInfo, IconTrendingUp, IconTrendingDown, IconMinus,
  IconPlay, IconCheck, IconX,
} from "@/components/icons";
import { IconOri, IconMarketing, IconSocialMessaging } from "@/components/icons/vepartment";
import { OriMascot } from "@/components/voa/OriMascot";
import { useOri } from "@/lib/ori-store";
import type { ComponentType, CSSProperties } from "react";

type AnyIcon = ComponentType<{ size?: number; strokeWidth?: number | string; className?: string; style?: CSSProperties }>;

// ── Types ────────────────────────────────────────────────────────────────────

type AgentStatus = "online" | "busy" | "idle" | "offline" | "error";
type TaskStatus = "running" | "queued" | "completed" | "failed" | "paused";
type TaskPriority = "critical" | "high" | "normal" | "low";

// ── Icon lookup for backend supervisor icons ────────────────────────────────

const ICON_MAP: Record<string, AnyIcon> = {
  IconSocialMessaging: IconSocialMessaging as AnyIcon,
  IconMarketing: IconMarketing as AnyIcon,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function LogoMark() {
  return (
    <div className="w-6 h-6 flex items-center justify-center shrink-0 border border-foreground">
      <div className="w-2 h-2 bg-foreground" />
    </div>
  );
}

const STATUS_DOT: Record<AgentStatus, string> = {
  online: "bg-success", busy: "bg-warning", idle: "bg-foreground-dim", offline: "bg-border", error: "bg-error",
};

const STATUS_ICON_MAP = {
  success: { Icon: IconCheckCircle, color: "text-success" },
  warning: { Icon: IconAlertTriangle, color: "text-warning" },
  error: { Icon: IconXCircle, color: "text-error" },
  info: { Icon: IconInfo, color: "text-foreground-dim" },
} as const;

const TASK_STATUS: Record<TaskStatus, { Icon: AnyIcon; color: string }> = {
  running: { Icon: IconLoader as AnyIcon, color: "text-primary" },
  queued: { Icon: IconPlay as AnyIcon, color: "text-foreground-dim" },
  completed: { Icon: IconCheck as AnyIcon, color: "text-success" },
  failed: { Icon: IconX as AnyIcon, color: "text-error" },
  paused: { Icon: IconAlertTriangle as AnyIcon, color: "text-warning" },
};

const PRIORITY_STYLE: Record<TaskPriority, string> = {
  critical: "text-error border-error/30 bg-error/5",
  high: "text-warning border-warning/30 bg-warning/5",
  normal: "text-foreground-dim border-border",
  low: "text-foreground-dim border-border-subtle",
};

const SUGGESTIONS = [
  { label: "What's happening today?", desc: "Get a status briefing" },
  { label: "Show active tasks", desc: "See what's running" },
  { label: "Deploy a new agent", desc: "Activate a worker" },
  { label: "Check supervisor health", desc: "Run diagnostics" },
  { label: "Analyze performance", desc: "Review metrics" },
  { label: "Help me get started", desc: "Onboarding guide" },
];

// ── Greeting helper ──────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OriPage() {
  const {
    expression,
    status,
    isProcessing,
    domainSupervisors,
    tasks,
    logs,
    metrics,
    messages,
    sendMessage,
    executeCommand,
  } = useOri();

  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scroll = useCallback(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), []);
  useEffect(() => { scroll(); }, [messages, scroll]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  async function send(text?: string) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isProcessing) return;

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "44px";

    await sendMessage(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "44px";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  const hasMessages = messages.length > 0;
  const runningTasks = tasks.filter(t => t.status === "running");
  const oriStatus = status;

  return (
    <div className="flex bg-background text-foreground w-full min-h-screen">

      {/* ── Left sidebar ───────────────────────────────────────────────── */}
      <aside className="w-[200px] shrink-0 hidden lg:flex flex-col bg-surface border-r border-border" style={{ minHeight: "100vh" }}>
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
          <LogoMark />
          <p className="text-body-sm text-foreground font-medium flex-1 truncate">Acme Workspace</p>
          <IconChevronRight size={13} className="text-foreground-dim shrink-0" />
        </div>

        <nav className="px-3 pt-4 pb-3 space-y-px border-b border-border">
          {[
            { Icon: IconHome, label: "Dashboard", href: "/dashboard" },
            { Icon: IconLayers, label: "Assets", href: "/dashboard/assets" },
            { Icon: IconSearch, label: "Search", href: "#" },
          ].map(({ Icon, label, href }) => (
            <Link key={label} href={href} className="flex items-center gap-2.5 px-3 py-2 text-foreground-muted hover:text-foreground hover:bg-surface-raised transition-colors">
              <Icon size={14} strokeWidth={1.5} className="shrink-0" />
              <span className="text-body-sm flex-1">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Ori nav — active */}
        <div className="px-3 pt-4 pb-3 border-b border-border">
          <p className="text-os-title-sm text-foreground-dim px-3 mb-3">OPERATIONS</p>
          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-primary/5 border border-primary/20">
            <IconOri size={16} strokeWidth={1.5} className="text-primary shrink-0" />
            <span className="text-body-sm text-primary font-medium flex-1">Ori</span>
            <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", STATUS_DOT[oriStatus])} />
          </div>
        </div>

        <div className="flex-1 px-3 pt-4 overflow-auto">
          <p className="text-os-title-sm text-foreground-dim px-3 mb-3">VEPARTMENTS</p>
          <Link href="/dashboard/marketing" className="flex items-center gap-2.5 px-3 py-2.5 mb-px text-foreground-muted hover:text-foreground hover:bg-surface-raised transition-colors">
            <IconMarketing size={14} strokeWidth={1.5} className="shrink-0" />
            <span className="text-body-sm font-medium flex-1">Marketing</span>
            <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
          </Link>
          <button className="flex items-center gap-2 px-3 py-2.5 mt-1 w-full text-foreground-dim hover:text-foreground hover:bg-surface-raised transition-colors border border-dashed border-border">
            <IconPlus size={12} className="shrink-0" />
            <span className="text-label-sm">Add new vepartment</span>
          </button>
        </div>

        <div className="shrink-0 border-t border-border px-4 py-3 flex items-center gap-2.5">
          <div className="flex -space-x-1.5 flex-1">
            {["AK", "MR", "TP"].map((i) => (
              <div key={i} className="w-5 h-5 flex items-center justify-center bg-surface-raised border border-border text-[9px] font-mono text-foreground-muted">{i}</div>
            ))}
          </div>
          <IconBell size={13} className="text-foreground-dim" />
          <Link href="/dashboard/settings">
            <IconSettings size={13} className="text-foreground-dim hover:text-foreground transition-colors" />
          </Link>
        </div>
      </aside>

      {/* ── Main chat area ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-14 shrink-0 flex items-center gap-4 px-4 lg:px-8 border-b border-border bg-surface">
          <Link href="/dashboard" className="lg:hidden text-foreground-dim hover:text-foreground transition-colors">
            <IconArrowLeft size={16} />
          </Link>
          <Link href="/dashboard" className="hidden lg:flex items-center gap-1.5 text-foreground-dim hover:text-foreground transition-colors">
            <IconArrowLeft size={13} />
            <span className="text-label-sm">Dashboard</span>
          </Link>
          <div className="w-px h-4 bg-border hidden lg:block" />

          {/* Ori identity in header */}
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-8 h-8 flex items-center justify-center border border-primary/30 bg-primary/5 relative">
              <IconOri size={18} strokeWidth={1.5} className="text-primary" />
              <div className={cn("absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full", STATUS_DOT[oriStatus])} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-body-sm text-foreground font-medium">Ori</span>
                <span className="text-os-title-sm text-foreground-dim hidden sm:inline">OPERATIONS AGENT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={cn("w-1 h-1 rounded-full", STATUS_DOT[oriStatus])} />
                <span className="text-label-sm text-foreground-dim font-mono">{oriStatus}</span>
              </div>
            </div>
          </div>

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={cn(
              "w-8 h-8 flex items-center justify-center border transition-colors",
              sidebarOpen
                ? "border-primary/30 bg-primary/5 text-primary"
                : "border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted"
            )}
            title="Toggle operations panel"
          >
            <IconPanelRight size={15} strokeWidth={1.5} />
          </button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* ── Chat column ─────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-[720px] mx-auto px-4 lg:px-6 py-6">

                {/* ── Empty state — Ori welcome ──────────────────────── */}
                {!hasMessages && (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                    {/* Animated Ori mascot — expression-aware */}
                    <OriMascot size={200} expression={expression} />

                    <div className="text-center">
                      <h1 className="text-module-lg font-medium text-foreground mb-2">
                        {getGreeting()}, I&apos;m Ori.
                      </h1>
                      <p className="text-body-md text-foreground-muted max-w-md leading-relaxed">
                        Your operations agent for the Vepartment system.
                        I can manage departments, monitor supervisors, deploy agents,
                        and help you run things smoothly.
                      </p>
                    </div>

                    {/* Quick summary strip — live data */}
                    <div className="flex items-center gap-3 px-4 py-2.5 border border-border-subtle bg-surface">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        <span className="text-label-sm text-foreground-dim font-mono">
                          {metrics.vepartments} dept{metrics.vepartments !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5">
                        <IconBot size={10} className="text-foreground-dim" />
                        <span className="text-label-sm text-foreground-dim font-mono">
                          {metrics.agents} agents active
                        </span>
                      </div>
                      <div className="w-px h-3 bg-border" />
                      <div className="flex items-center gap-1.5">
                        <IconActivity size={10} className="text-foreground-dim" />
                        <span className="text-label-sm text-foreground-dim font-mono">
                          {metrics.tasksRunning} tasks running
                        </span>
                      </div>
                    </div>

                    {/* Suggestion cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg mt-1">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => send(s.label)}
                          className="flex flex-col items-start gap-1 px-4 py-3.5 border border-border bg-surface hover:bg-surface-raised hover:border-foreground-muted transition-colors text-left group"
                        >
                          <span className="text-body-sm text-foreground font-medium group-hover:text-foreground">{s.label}</span>
                          <span className="text-label-sm text-foreground-dim">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Conversation ────────────────────────────────────── */}
                {hasMessages && (
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        {/* Avatar */}
                        {msg.role === "assistant" ? (
                          <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-primary/30 bg-primary/5 mt-0.5">
                            <IconOri size={18} className="text-primary" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-surface-raised border border-border mt-0.5 text-[10px] font-mono text-foreground-muted">
                            AK
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-body-sm font-medium text-foreground">
                              {msg.role === "assistant" ? "Ori" : "You"}
                            </span>
                            <span className="text-label-sm text-foreground-dim font-mono">
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                          <div className="text-body-md text-foreground leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Loading — Ori is thinking */}
                    {isProcessing && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-primary/30 bg-primary/5 mt-0.5 ori-thinking">
                          <IconOri size={18} className="text-primary" />
                        </div>
                        <div className="flex items-center gap-2.5 py-2">
                          <div className="flex gap-1.5 items-center">
                            <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                            <div className="w-1.5 h-1.5 bg-primary animate-pulse" style={{ animationDelay: "200ms" }} />
                            <div className="w-1.5 h-1.5 bg-primary animate-pulse" style={{ animationDelay: "400ms" }} />
                          </div>
                          <span className="text-body-sm text-foreground-dim">Ori is thinking...</span>
                        </div>
                      </div>
                    )}

                    <div ref={endRef} />
                  </div>
                )}
              </div>
            </div>

            {/* ── Input area ─────────────────────────────────────────── */}
            <div className="shrink-0 border-t border-border bg-surface">
              <div className="max-w-[720px] mx-auto px-4 lg:px-6 py-4">
                <div className="flex items-end gap-3 bg-background border border-border focus-within:border-primary/50 transition-colors px-4 py-3">
                  <IconOri size={18} className="text-primary/40 shrink-0 mb-1" />
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleTextareaInput}
                    onKeyDown={handleKeyDown}
                    disabled={isProcessing}
                    rows={1}
                    className="flex-1 bg-transparent text-body-md text-foreground placeholder:text-foreground-dim focus:outline-none disabled:opacity-50 resize-none"
                    style={{ height: 44, maxHeight: 160 }}
                    placeholder="Message Ori..."
                  />
                  <button
                    onClick={() => send()}
                    disabled={isProcessing || !input.trim()}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center shrink-0 transition-colors",
                      input.trim() && !isProcessing
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-raised text-foreground-dim"
                    )}
                  >
                    <IconSend size={14} strokeWidth={1.5} />
                  </button>
                </div>
                <p className="text-label-sm text-foreground-dim mt-2 text-center">
                  Ori · Operations Agent · Connected to {domainSupervisors.length} supervisor{domainSupervisors.length !== 1 ? "s" : ""} · {runningTasks.length} tasks running
                </p>
              </div>
            </div>
          </div>

          {/* ── Right sidebar — operations panel ───────────────────── */}
          {sidebarOpen && (
            <aside className="w-[340px] shrink-0 border-l border-border bg-surface overflow-y-auto hidden lg:block">
              <div className="p-4 space-y-4">

                {/* Ori identity mini */}
                <div className="border border-border bg-background" style={{ borderTop: "2px solid hsl(var(--primary))" }}>
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center border border-primary/30 bg-primary/5 shrink-0">
                        <IconOri size={22} strokeWidth={1.5} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-module-sm font-semibold text-foreground">Ori</span>
                          <span className="text-os-title-sm px-1 py-0.5 border border-primary/30 text-primary bg-primary/5">VOA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-1.5 h-1.5 rounded-full", STATUS_DOT[oriStatus])} />
                          <span className="text-label-sm text-foreground-dim capitalize">{oriStatus}</span>
                          <div className="w-px h-2.5 bg-border" />
                          <IconShieldCheck size={10} className="text-foreground-dim" />
                          <span className="text-label-sm text-foreground-dim">HAS-5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border-subtle border-t border-border-subtle">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <IconClock size={11} className="text-foreground-dim" />
                      <span className="text-label-sm text-foreground-dim">Uptime</span>
                      <span className="text-data-sm text-foreground ml-auto">14d 6h</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <IconActivity size={11} className="text-foreground-dim" />
                      <span className="text-label-sm text-foreground-dim">Done</span>
                      <span className="text-data-sm text-foreground ml-auto">247</span>
                    </div>
                  </div>
                </div>

                {/* System overview — live metrics */}
                <div className="border border-border bg-background">
                  <div className="px-4 py-2.5 border-b border-border-subtle">
                    <span className="text-os-title-sm text-foreground-dim">SYSTEM OVERVIEW</span>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-border-subtle">
                    {([
                      { label: "Vepartments", value: String(metrics.vepartments), trend: "neutral" },
                      { label: "Supervisors", value: String(metrics.domainSupervisors), trend: "neutral" },
                      { label: "Agents", value: String(metrics.agents), trend: "up" },
                      { label: "Tasks today", value: String(metrics.tasksToday), trend: "up" },
                    ] as Array<{ label: string; value: string; trend: "up" | "down" | "neutral" }>).map((m) => (
                      <div key={m.label} className="bg-background px-3 py-2.5">
                        <p className="text-label-sm text-foreground-dim">{m.label}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-data-md text-foreground">{m.value}</span>
                          {m.trend === "up" && <IconTrendingUp size={10} className="text-success" />}
                          {m.trend === "down" && <IconTrendingDown size={10} className="text-error" />}
                          {m.trend === "neutral" && <IconMinus size={10} className="text-foreground-dim" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Domain supervisors — live data */}
                <div className="border border-border bg-background">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle">
                    <span className="text-os-title-sm text-foreground-dim">DOMAIN SUPERVISORS</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      <span className="text-label-sm text-foreground-dim font-mono">
                        {domainSupervisors.filter((s) => s.status === "online").length}/{domainSupervisors.length}
                      </span>
                    </div>
                  </div>
                  {domainSupervisors.map((sup) => {
                    const topColor = `hsl(var(--dept-${sup.colorVar}-main))`;
                    const SupIcon = ICON_MAP[sup.icon] ?? (IconBot as AnyIcon);
                    return (
                      <div key={sup.id} className="flex items-center gap-2.5 px-4 py-3 hover:bg-surface-raised transition-colors cursor-pointer border-b border-border-subtle last:border-b-0">
                        <div className="w-0.5 h-6 shrink-0" style={{ backgroundColor: topColor }} />
                        <div className="w-6 h-6 flex items-center justify-center border border-border shrink-0">
                          <SupIcon size={12} strokeWidth={1.5} className="text-foreground-muted" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm text-foreground font-medium truncate">{sup.name}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-label-sm text-foreground-dim">{sup.department}</span>
                            <div className="w-px h-2 bg-border" />
                            <IconBot size={9} className="text-foreground-dim" />
                            <span className="text-label-sm text-foreground-dim font-mono">{sup.activeAgents}/{sup.totalAgents}</span>
                          </div>
                        </div>
                        <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", STATUS_DOT[sup.status])} />
                      </div>
                    );
                  })}
                </div>

                {/* Active tasks — live data */}
                <div className="border border-border bg-background">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle">
                    <span className="text-os-title-sm text-foreground-dim">ACTIVE TASKS</span>
                    <span className="text-label-sm text-foreground-dim font-mono">
                      {runningTasks.length} running
                    </span>
                  </div>
                  {tasks.map((task) => {
                    const sc = TASK_STATUS[task.status];
                    return (
                      <div key={task.id} className="px-4 py-3 border-b border-border-subtle last:border-b-0 hover:bg-surface-raised transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <sc.Icon size={12} strokeWidth={1.5} className={cn(sc.color, task.status === "running" && "animate-spin")} />
                          <span className="text-body-sm text-foreground font-medium flex-1 truncate">{task.title}</span>
                          <span className={cn("text-os-title-sm px-1 py-0.5 border", PRIORITY_STYLE[task.priority])}>
                            {task.priority === "high" ? "HI" : task.priority === "critical" ? "CRIT" : task.priority === "low" ? "LO" : "—"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pl-5">
                          <span className="text-label-sm text-foreground-dim font-mono">{task.assignedTo}</span>
                          <div className="w-px h-2 bg-border" />
                          <span className="text-label-sm text-foreground-dim">{task.startedAt}</span>
                          {task.status === "running" && (
                            <>
                              <div className="flex-1 h-0.5 bg-background ml-1">
                                <div className="h-full bg-primary" style={{ width: `${task.progress}%` }} />
                              </div>
                              <span className="text-label-sm text-foreground-dim font-mono">{task.progress}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Operation log — live data */}
                <div className="border border-border bg-background">
                  <div className="px-4 py-2.5 border-b border-border-subtle">
                    <span className="text-os-title-sm text-foreground-dim">RECENT LOG</span>
                  </div>
                  {logs.slice(0, 5).map((entry) => {
                    const si = STATUS_ICON_MAP[entry.status];
                    return (
                      <div key={entry.id} className="flex items-start gap-2 px-4 py-2.5 border-b border-border-subtle last:border-b-0">
                        <si.Icon size={11} strokeWidth={1.5} className={cn("shrink-0 mt-0.5", si.color)} />
                        <div className="flex-1 min-w-0">
                          <p className="text-label-sm text-foreground leading-snug">{entry.action}</p>
                          <span className="text-label-sm text-foreground-dim font-mono">{entry.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick operations — wired to executeCommand */}
                <div className="border border-border bg-background">
                  <div className="px-4 py-2.5 border-b border-border-subtle">
                    <span className="text-os-title-sm text-foreground-dim">QUICK OPERATIONS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-border-subtle">
                    {[
                      { label: "Deploy Agent", Icon: IconBot, cmd: "deploy_agent" },
                      { label: "Create Domain", Icon: IconWorkflow, cmd: "create_domain" },
                      { label: "Diagnostics", Icon: IconGauge, cmd: "diagnostics" },
                      { label: "Reports", Icon: IconBarChart, cmd: "reports" },
                      { label: "Policies", Icon: IconScale, cmd: "policies" },
                      { label: "Directory", Icon: IconBookUser, cmd: "directory" },
                    ].map((a) => (
                      <button
                        key={a.label}
                        onClick={() => executeCommand(a.cmd)}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-3 py-2.5 bg-background hover:bg-surface-raised transition-colors disabled:opacity-50"
                      >
                        <a.Icon size={13} strokeWidth={1.5} className="text-foreground-dim" />
                        <span className="text-label-sm text-foreground-muted">{a.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
