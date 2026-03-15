"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Workflow,
  ShieldCheck,
  Layers,
  Activity,
  BrainCircuit,
  ArrowRight,
  Target,
  BookOpen,
  Gauge,
  Users,
  Zap,
  Globe,
  CornerDownLeft,
  Sparkles,
  Leaf,
  FileText,
  Download,
} from "lucide-react";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ── Grid background ──────────────────────────────────────────────────────────

function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(hsl(0 0% 0% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 0% / 0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const capReveal = useReveal();
  const howReveal = useReveal();
  const deptReveal = useReveal();
  const archReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Animations ─────────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes fadeInSlow {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulseBar {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger > * {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .reveal-stagger.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-stagger.visible > *:nth-child(1) { transition-delay: 0ms; }
        .reveal-stagger.visible > *:nth-child(2) { transition-delay: 80ms; }
        .reveal-stagger.visible > *:nth-child(3) { transition-delay: 160ms; }
        .reveal-stagger.visible > *:nth-child(4) { transition-delay: 240ms; }
        .reveal-stagger.visible > *:nth-child(5) { transition-delay: 320ms; }
        .reveal-stagger.visible > *:nth-child(6) { transition-delay: 400ms; }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-primary flex items-center justify-center">
              <div className="w-2 h-2 bg-primary" />
            </div>
            <span className="text-os-title-lg text-foreground tracking-[0.12em]">VEPARTMENT</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#capabilities" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Capabilities</a>
            <a href="#how-it-works" className="text-sm text-foreground-muted hover:text-foreground transition-colors">How it works</a>
            <a href="#departments" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Departments</a>
            <Link href="/whitepaper" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Whitepaper</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center h-8 px-4 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center h-8 px-4 text-sm font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 overflow-hidden">
        <GridBg />

        <div className="relative mx-auto max-w-5xl px-6 py-28 md:py-36 lg:py-44">
          <div className="max-w-3xl animate-[fadeInSlow_1s_ease-out]">
            <div className="inline-flex items-center gap-2.5 border border-border px-4 py-2 mb-10">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-foreground-muted tracking-wide">AI-NATIVE OPERATING SYSTEM</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-foreground">
              Your department
              <br />
              <span className="text-primary">without walls</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-foreground-muted leading-relaxed">
              Vepartment deploys AI agent crews into modular virtual departments.
              Each department owns its domain — strategy, execution, and governance —
              operating 24/7 with full visibility and control.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/auth/signup"
                className="group inline-flex items-center justify-center gap-2.5 h-11 px-7 text-base font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Deploy your first department
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/onboarding/user-guide"
                className="inline-flex items-center justify-center h-11 px-7 text-base font-medium border border-border text-foreground hover:border-foreground-dim transition-colors"
              >
                Read the docs
              </Link>
            </div>
          </div>

          {/* ── Chat bar ──────────────────────────────────────────────── */}
          <HeroChatBar />

          {/* Metrics strip */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px border border-border bg-border">
            {[
              { value: "12", label: "AUTONOMOUS AGENTS" },
              { value: "3", label: "CORE DEPARTMENTS" },
              { value: "\u221E", label: "WORKFLOW CAPACITY" },
              { value: "24/7", label: "OPERATIONAL UPTIME" },
            ].map((m, i) => (
              <div key={m.label} className="bg-surface px-6 py-6 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-px bg-primary/30"
                  style={{ animation: `pulseBar 3s ease-in-out infinite ${i * 0.5}s` }}
                />
                <p className="text-3xl font-mono font-medium text-primary">{m.value}</p>
                <p className="text-xs font-mono text-foreground-dim mt-2 tracking-wide">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Capabilities ────────────────────────────────────────────────── */}
      <section id="capabilities" className="relative overflow-hidden">
        <GridBg />
        <div className="relative mx-auto max-w-5xl px-6 py-28 md:py-36">
          <div ref={capReveal.ref} className={cn("reveal mb-20", capReveal.visible && "visible")}>
            <span className="text-xs font-mono text-primary tracking-[0.14em]">CAPABILITIES</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium text-foreground leading-tight">
              Infrastructure-grade AI operations
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted leading-relaxed">
              Every component is designed for autonomous execution, observability, and governance — not just chat.
            </p>
          </div>

          <div className={cn("grid gap-px md:grid-cols-2 lg:grid-cols-3 border border-border bg-border reveal-stagger", capReveal.visible && "visible")}>
            <CapCard icon={<Bot size={20} />} title="Autonomous Agents" desc="AI agents that own domain-level tasks end-to-end. Marketing, branding, sustainability — each department runs itself." />
            <CapCard icon={<Workflow size={20} />} title="Modular Workflows" desc="n8n-powered execution pipelines. Connect external services, automate operations, scale without engineering overhead." />
            <CapCard icon={<Layers size={20} />} title="Virtual Departments" desc="Structured organizational modules. Each department has its own agents, knowledge base, workflows, and governance rules." />
            <CapCard icon={<ShieldCheck size={20} />} title="Governance Built In" desc="Policy enforcement, approval chains, and audit trails. Every agent action is logged, reviewed, and accountable." />
            <CapCard icon={<BrainCircuit size={20} />} title="Knowledge System" desc="Domain-specific knowledge bases feed each agent. Context-aware reasoning grounded in your organization's data." />
            <CapCard icon={<Activity size={20} />} title="Real-Time Monitoring" desc="Live dashboards for every department. Agent status, task throughput, confidence scores — full operational visibility." />
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── How It Works ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div ref={howReveal.ref} className={cn("reveal mb-20", howReveal.visible && "visible")}>
          <span className="text-xs font-mono text-primary tracking-[0.14em]">HOW IT WORKS</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium text-foreground leading-tight">
            From zero to autonomous in four steps
          </h2>
        </div>

        <div className={cn("grid gap-6 md:grid-cols-2 reveal-stagger", howReveal.visible && "visible")}>
          <StepCard num="01" icon={<Target size={16} />} title="Define your departments" desc="Create modular organizational units — branding, marketing, sustainability. Each department gets its own workspace, agents, and governance rules." />
          <StepCard num="02" icon={<BookOpen size={16} />} title="Build knowledge bases" desc="Upload documents, connect data sources, define brand guidelines. Agents inherit domain-specific context and reasoning capabilities." />
          <StepCard num="03" icon={<Workflow size={16} />} title="Deploy agent crews" desc="Assign specialized agents to each department. Strategy leads, content creators, analysts — each with defined roles and permissions." />
          <StepCard num="04" icon={<Gauge size={16} />} title="Monitor and govern" desc="Real-time dashboards show agent activity, task progress, and confidence scores. Approval chains ensure quality at every step." />
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Zoom Dive ─────────────────────────────────────────────── */}
      <ZoomDive />

      <div className="h-px bg-border" />

      <div className="h-px bg-border" />

      {/* ── Departments ─────────────────────────────────────────────────── */}
      <section id="departments" className="relative overflow-hidden">
        <GridBg />
        <div className="relative mx-auto max-w-5xl px-6 py-28 md:py-36">
          <div ref={deptReveal.ref} className={cn("reveal mb-20", deptReveal.visible && "visible")}>
            <span className="text-xs font-mono text-primary tracking-[0.14em]">DEPARTMENTS</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium text-foreground leading-tight">
              Modular. Autonomous. Observable.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-foreground-muted leading-relaxed">
              Each virtual department operates independently with its own agent crew, knowledge base, and execution pipeline.
            </p>
          </div>

          <div className={cn("reveal border border-border bg-surface", deptReveal.visible && "visible")}>
            <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_120px_120px_120px] gap-4 px-6 py-4 border-b border-border bg-surface-raised">
              <span className="text-xs font-mono text-foreground-dim tracking-wide">DEPARTMENT</span>
              <span className="text-xs font-mono text-foreground-dim tracking-wide text-right md:text-left">AGENTS</span>
              <span className="text-xs font-mono text-foreground-dim tracking-wide text-right md:text-left">STATUS</span>
              <span className="hidden md:block text-xs font-mono text-foreground-dim" />
            </div>
            {[
              { name: "Branding", agents: 4, status: "ACTIVE", dot: "#EA580C" },
              { name: "Marketing", agents: 5, status: "ACTIVE", dot: "#4F46E5" },
              { name: "Sustainability", agents: 3, status: "ACTIVE", dot: "#0D9488" },
              { name: "Sales", agents: 4, status: "ACTIVE", dot: "#059669" },
              { name: "Product", agents: 3, status: "STANDBY", dot: "#0284C7" },
              { name: "Finance", agents: 2, status: "STANDBY", dot: "#B45309" },
            ].map((dept, i, arr) => (
              <div
                key={dept.name}
                className={cn(
                  "grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_120px_120px_120px] gap-4 items-center px-6 py-5 transition-colors hover:bg-surface-raised/50",
                  i < arr.length - 1 && "border-b border-border-subtle"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn("w-2.5 h-2.5", dept.status === "ACTIVE" && "animate-pulse")}
                    style={{ backgroundColor: dept.dot }}
                  />
                  <span className="text-base text-foreground font-medium">{dept.name}</span>
                </div>
                <span className="text-sm font-mono text-foreground-muted text-right md:text-left">
                  {dept.agents}
                </span>
                <span className={cn(
                  "text-xs font-mono tracking-wide text-right md:text-left",
                  dept.status === "ACTIVE" ? "text-success" : "text-foreground-dim"
                )}>
                  {dept.status}
                </span>
                <div className="hidden md:block">
                  <div className="h-1.5 bg-border-subtle overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-1000",
                        dept.status === "ACTIVE" ? "bg-primary/40 w-full" : "bg-border w-0"
                      )}
                      style={dept.status === "ACTIVE" ? {
                        animation: `pulseBar 2.5s ease-in-out infinite ${i * 0.3}s`
                      } : undefined}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Architecture ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div ref={archReveal.ref} className={cn("reveal mb-16", archReveal.visible && "visible")}>
          <span className="text-xs font-mono text-primary tracking-[0.14em]">ARCHITECTURE</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium text-foreground leading-tight">
            Built on proven infrastructure
          </h2>
        </div>

        <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-px border border-border bg-border reveal-stagger", archReveal.visible && "visible")}>
          <ArchCard icon={<BrainCircuit size={22} />} label="CrewAI" sub="Agent framework" />
          <ArchCard icon={<Workflow size={22} />} label="n8n" sub="Workflow engine" />
          <ArchCard icon={<Globe size={22} />} label="Next.js 15" sub="Application layer" />
          <ArchCard icon={<Users size={22} />} label="Multi-tenant" sub="Organization-scoped" />
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── Whitepaper ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div className="border border-border bg-surface p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-14 h-14 border border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
            <FileText size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-mono text-primary tracking-[0.14em]">RESOURCE</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-medium text-foreground">
              Read the Whitepaper
            </h2>
            <p className="mt-3 text-base text-foreground-muted leading-relaxed max-w-xl">
              21 chapters on organizational intelligence, the Human Agency Scale, agent architecture, and how Virtual Departments transform AI from a tool into an operational layer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/whitepaper"
              className="group inline-flex items-center justify-center gap-2.5 h-11 px-7 text-base font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Read online
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="/Vepartment_Whitepaper.pdf"
              download
              className="inline-flex items-center justify-center gap-2 h-11 px-7 text-base font-medium border border-border text-foreground hover:border-foreground-dim transition-colors"
            >
              <Download size={16} />
              PDF
            </a>
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <GridBg />
        <div ref={ctaReveal.ref} className={cn("reveal relative mx-auto max-w-5xl px-6 py-28 md:py-36 text-center", ctaReveal.visible && "visible")}>
          <div className="inline-flex items-center gap-2.5 border border-primary/30 bg-primary/5 px-4 py-2 mb-8">
            <Zap size={14} className="text-primary" />
            <span className="text-xs font-mono text-primary tracking-wide">DEPLOY NOW</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-foreground">
            Departments that think
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-lg text-foreground-muted leading-relaxed">
            Deploy autonomous departments that think, execute, and govern themselves.
            Start with one department — scale to your entire operation.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="group inline-flex items-center justify-center gap-2.5 h-11 px-7 text-base font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get started free
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-11 px-7 text-base font-medium border border-border text-foreground hover:border-foreground-dim transition-colors"
            >
              View live demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-border flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary" />
              </div>
              <span className="text-xs font-mono text-foreground-dim tracking-[0.12em]">VEPARTMENT</span>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <Link href="/whitepaper" className="text-sm text-foreground-dim hover:text-foreground transition-colors">Whitepaper</Link>
              <Link href="/onboarding/user-guide" className="text-sm text-foreground-dim hover:text-foreground transition-colors">Docs</Link>
              <Link href="/dashboard" className="text-sm text-foreground-dim hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="/auth/signin" className="text-sm text-foreground-dim hover:text-foreground transition-colors">Sign in</Link>
            </div>
          </div>

          <div className="h-px bg-border my-8" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs font-mono text-foreground-dim">Vepartment v1.0.0</p>
            <p className="text-xs font-mono text-foreground-dim">AI-native operating system for modular virtual departments</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CapCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-surface p-8 flex flex-col gap-5 group hover:bg-surface-raised/50 transition-colors relative overflow-hidden">
      <div className="absolute top-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
      <div className="w-12 h-12 border border-border flex items-center justify-center text-foreground-muted group-hover:border-primary/30 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-lg text-foreground font-medium">{title}</h3>
        <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StepCard({ num, icon, title, desc }: { num: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="border border-border bg-surface p-8 flex gap-6 group hover:border-primary/20 transition-colors">
      <div className="shrink-0 flex flex-col items-center gap-3">
        <span className="text-2xl font-mono font-medium text-primary">{num}</span>
        <div className="w-px flex-1 bg-border group-hover:bg-primary/20 transition-colors" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 border border-border flex items-center justify-center text-foreground-muted group-hover:border-primary/30 group-hover:text-primary transition-colors">
            {icon}
          </div>
          <h3 className="text-lg text-foreground font-medium">{title}</h3>
        </div>
        <p className="text-sm text-foreground-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ArchCard({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="bg-surface px-6 py-8 flex flex-col items-center text-center gap-4 group hover:bg-surface-raised/50 transition-colors">
      <div className="w-14 h-14 border border-border flex items-center justify-center text-foreground-muted group-hover:border-primary/30 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-lg text-foreground font-medium">{label}</p>
        <p className="text-xs font-mono text-foreground-dim mt-1">{sub}</p>
      </div>
    </div>
  );
}

// ── Zoom Dive ─────────────────────────────────────────────────────────────────

const ZOOM_LEVELS = [
  { label: "ORGANIZATION", title: "Your organization from above", desc: "One system. Three departments. Agents everywhere." },
  { label: "DEPARTMENT", title: "Inside Branding", desc: "Domains organize the work. Agents move between them." },
  { label: "DOMAIN", title: "Brand Identity", desc: "Each workflow has an owner. Tasks flow through lanes." },
  { label: "AGENTS", title: "Agents at work", desc: "Creating, reviewing, refining — right now." },
];

function ZoomDive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    function onScroll() {
      const rect = container!.getBoundingClientRect();
      const total = container!.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      setLevel(Math.min(3, Math.floor(progress * 4)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden bg-background">
        <GridBg />

        {/* Depth indicator */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-1">
          {ZOOM_LEVELS.map((l, i) => (
            <button key={i} className="flex items-center gap-3 group" onClick={() => {
              const container = containerRef.current;
              if (!container) return;
              const total = container.scrollHeight - window.innerHeight;
              const targetScroll = container.offsetTop + (i / 4) * total;
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
            }}>
              <div className={cn("w-px transition-all duration-500", level === i ? "h-10 bg-primary" : "h-4 bg-border")} />
              <span className={cn("text-[10px] font-mono tracking-wider transition-all duration-300", level === i ? "text-primary opacity-100" : "text-foreground-dim opacity-0 group-hover:opacity-60")}>{l.label}</span>
            </button>
          ))}
        </div>

        {/* Header text */}
        <div className="absolute top-6 left-0 right-0 z-20 text-center px-6">
          <p className="text-xs font-mono text-primary tracking-[0.14em] mb-2">{ZOOM_LEVELS[level].label}</p>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground">{ZOOM_LEVELS[level].title}</h2>
          <p className="mt-2 text-base text-foreground-muted max-w-md mx-auto">{ZOOM_LEVELS[level].desc}</p>
        </div>

        {/* Canvas */}
        <div className="absolute inset-0 flex items-center justify-center pt-20">

          {/* L0 — Org: full-width floor with large department zones */}
          <div className={cn("absolute transition-all duration-700 inset-x-0 px-6", level === 0 ? "opacity-100 scale-100" : "opacity-0 scale-[1.3] pointer-events-none")}>
            <div className="border border-border bg-surface relative overflow-hidden mx-auto max-w-5xl" style={{ height: 420 }}>
              <InnerGrid />
              {/* Org label */}
              <div className="absolute top-3 left-4 text-[10px] font-mono text-foreground-dim tracking-wider">YOUR ORGANIZATION</div>
              {/* Three department zones */}
              <div className="absolute inset-4 top-9 grid grid-cols-3 gap-4">
                {[
                  { name: "Branding", color: "#EA580C", agents: 4 },
                  { name: "Marketing", color: "#4F46E5", agents: 5 },
                  { name: "Sustainability", color: "#0D9488", agents: 3 },
                ].map((dept, di) => (
                  <div
                    key={dept.name}
                    className="border-2 relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_0_0_1px_inset]"
                    style={{ borderColor: dept.color, ["--tw-shadow-color" as string]: dept.color }}
                  >
                    <InnerGrid />
                    <div className="absolute top-2.5 left-3 text-[10px] font-mono tracking-wider font-medium" style={{ color: dept.color }}>{dept.name}</div>
                    {/* Agent count */}
                    <div className="absolute top-2.5 right-3 text-[9px] font-mono text-foreground-dim">{dept.agents} agents</div>
                    {/* Agents inside */}
                    {Array.from({ length: dept.agents }).map((_, ai) => (
                      <PixelAgent key={ai} color={dept.color} index={ai + di * 4} />
                    ))}
                    <ChatBubble color={dept.color} delay={di * 2} />
                    {/* Expand hint on hover */}
                    <div className="absolute bottom-2.5 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface border" style={{ borderColor: `${dept.color}40` }}>
                        <span className="text-[9px] font-mono" style={{ color: dept.color }}>Expand</span>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 3L4 5L6 3" stroke={dept.color} strokeWidth="1"/></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Traveling agents between departments */}
              <PixelAgent color="#888" index={20} travel />
              <PixelAgent color="#888" index={21} travel />
            </div>
            {/* Scroll hint below container */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-foreground-dim">
                <span>Scroll to enter Branding</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 4L5 6L7 4" stroke="currentColor" strokeWidth="1"/></svg>
              </div>
            </div>
          </div>

          {/* L1 — Dept: large container with domain zones */}
          <div className={cn("absolute transition-all duration-700 inset-x-0 px-6", level === 1 ? "opacity-100 scale-100" : level > 1 ? "opacity-0 scale-[1.3] pointer-events-none" : "opacity-0 scale-75 pointer-events-none")}>
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 mb-3 text-[10px] font-mono text-foreground-dim">
              <span>Organization</span>
              <span className="text-foreground-dim/40">/</span>
              <span className="text-[#B8960A]">Branding</span>
            </div>
            <div className="border-2 border-[#B8960A] bg-surface relative overflow-hidden mx-auto max-w-4xl" style={{ height: 380 }}>
              <InnerGrid />
              <div className="absolute top-3 left-4 text-[10px] font-mono tracking-wider font-medium" style={{ color: "#EA580C" }}>BRANDING</div>
              <div className="absolute top-3 right-4 text-[9px] font-mono text-foreground-dim">3 domains</div>
              {/* Three domain zones */}
              <div className="absolute inset-4 top-9 grid grid-cols-3 gap-4">
                {["Identity", "Visual Assets", "Guidelines"].map((d, di) => (
                  <div key={d} className="border border-[#B8960A]/30 relative overflow-hidden group cursor-pointer hover:border-[#B8960A]/60 transition-colors">
                    <InnerGrid />
                    <div className="absolute top-2.5 left-3 text-[10px] font-mono text-foreground-muted">{d}</div>
                    <PixelAgent color="#EA580C" index={di * 2} />
                    <PixelAgent color="#EA580C" index={di * 2 + 1} />
                    <ChatBubble color="#EA580C" delay={di * 2.5} />
                    {/* Expand hint */}
                    <div className="absolute bottom-2 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-mono px-2 py-0.5 bg-surface border border-[#B8960A]/30" style={{ color: "#EA580C" }}>Expand</span>
                    </div>
                  </div>
                ))}
              </div>
              <PixelAgent color="#EA580C" index={10} travel />
            </div>
            <div className="flex justify-center mt-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-foreground-dim">
                <span>Scroll to enter Identity</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 4L5 6L7 4" stroke="currentColor" strokeWidth="1"/></svg>
              </div>
            </div>
          </div>

          {/* L2 — Domain: workflow lanes with agents */}
          <div className={cn("absolute transition-all duration-700 inset-x-0 px-6", level === 2 ? "opacity-100 scale-100" : level > 2 ? "opacity-0 scale-[1.3] pointer-events-none" : "opacity-0 scale-75 pointer-events-none")}>
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 mb-3 text-[10px] font-mono text-foreground-dim">
              <span>Organization</span>
              <span className="text-foreground-dim/40">/</span>
              <span>Branding</span>
              <span className="text-foreground-dim/40">/</span>
              <span className="text-[#B8960A]">Identity</span>
            </div>
            <div className="border-2 border-border bg-surface relative overflow-hidden mx-auto max-w-3xl" style={{ height: 340 }}>
              <InnerGrid />
              <div className="absolute top-3 left-4 text-[10px] font-mono tracking-wider font-medium" style={{ color: "#EA580C" }}>BRAND IDENTITY</div>
              <div className="absolute top-3 right-4 text-[9px] font-mono text-foreground-dim">4 workflows</div>
              {/* Workflow lanes */}
              <div className="absolute inset-4 top-8 flex flex-col gap-2">
                {["Logo system", "Voice & tone", "Color palette", "Typography"].map((w, i) => (
                  <div key={w} className="flex-1 border border-border/50 relative overflow-hidden flex items-center px-4">
                    <span className="text-xs font-mono text-foreground-muted">{w}</span>
                    {i < 3 && <PixelAgent color="#EA580C" index={i} lane />}
                  </div>
                ))}
              </div>
              <ChatBubble color="#EA580C" delay={1} />
            </div>
            <div className="flex justify-center mt-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-foreground-dim">
                <span>Scroll to see agents</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 4L5 6L7 4" stroke="currentColor" strokeWidth="1"/></svg>
              </div>
            </div>
          </div>

          {/* L3 — Agents: close-up pixel characters */}
          <div className={cn("absolute transition-all duration-700 inset-x-0 px-6", level === 3 ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none")}>
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 mb-4 text-[10px] font-mono text-foreground-dim">
              <span>Organization</span>
              <span className="text-foreground-dim/40">/</span>
              <span>Branding</span>
              <span className="text-foreground-dim/40">/</span>
              <span>Identity</span>
              <span className="text-foreground-dim/40">/</span>
              <span className="text-primary">Agents</span>
            </div>
          </div>
          <div className={cn("absolute transition-all duration-700 px-6 w-full max-w-2xl", level === 3 ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none")}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { name: "Design Agent", task: "Refining logo variants for the Q2 campaign", color: "#EA580C" },
                { name: "Copy Agent", task: "Writing the updated brand voice guide", color: "#EA580C" },
                { name: "Review Agent", task: "Checking visual consistency across all assets", color: "#EA580C" },
                { name: "Data Agent", task: "Analyzing brand perception metrics", color: "#EA580C" },
              ].map((a, i) => (
                <div key={a.name} className="border border-border bg-surface p-5 relative overflow-hidden" style={{ animation: `fadeInSlow 0.5s ease-out ${i * 0.12}s both` }}>
                  <div className="flex items-start gap-4">
                    {/* Pixel character — bigger */}
                    <div className="shrink-0 flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 relative">
                        {/* Head */}
                        <div className="absolute top-0 left-1 w-8 h-8" style={{ backgroundColor: a.color }} />
                        {/* Eyes */}
                        <div className="absolute top-3 left-3 w-2 h-2 bg-background" />
                        <div className="absolute top-3 left-6 w-2 h-2 bg-background" />
                      </div>
                      {/* Body */}
                      <div className="w-6 h-4" style={{ backgroundColor: a.color, opacity: 0.5 }} />
                      {/* Legs */}
                      <div className="flex gap-1">
                        <div className="w-2 h-2" style={{ backgroundColor: a.color, opacity: 0.35 }} />
                        <div className="w-2 h-2" style={{ backgroundColor: a.color, opacity: 0.35 }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-base font-medium text-foreground">{a.name}</p>
                      <p className="text-sm text-foreground-muted mt-1.5 leading-relaxed">{a.task}</p>
                    </div>
                  </div>
                  {/* Activity bar */}
                  <div className="mt-4 h-1 bg-border overflow-hidden">
                    <div className="h-full w-full" style={{ backgroundColor: a.color, opacity: 0.4, animation: `pulseBar 3s ease-in-out infinite ${i * 0.4}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Empty — per-level hints handle scroll guidance */}
      </div>
    </div>
  );
}

// Subtle inner grid for containers
function InnerGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(hsl(0 0% 0% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 0% / 0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

// Pixel agent that drifts inside a container
function PixelAgent({ color, index, lane, travel }: { color: string; index: number; lane?: boolean; travel?: boolean }) {
  const size = 8;
  const speed = 12 + (index % 5) * 4; // much slower: 12-28s
  const delay = (index % 7) * 1.2;

  const animName = travel ? `agentTravel${index % 2}` : lane ? `agentLane${index % 3}` : `agentDrift${index % 6}`;

  return (
    <>
      <style jsx>{`
        @keyframes agentDrift0 { 0%,100%{left:10%;top:25%} 33%{left:65%;top:35%} 66%{left:40%;top:70%} }
        @keyframes agentDrift1 { 0%,100%{left:75%;top:20%} 33%{left:25%;top:50%} 66%{left:60%;top:75%} }
        @keyframes agentDrift2 { 0%,100%{left:50%;top:75%} 33%{left:15%;top:35%} 66%{left:70%;top:20%} }
        @keyframes agentDrift3 { 0%,100%{left:20%;top:55%} 33%{left:55%;top:20%} 66%{left:80%;top:60%} }
        @keyframes agentDrift4 { 0%,100%{left:60%;top:40%} 33%{left:20%;top:70%} 66%{left:45%;top:15%} }
        @keyframes agentDrift5 { 0%,100%{left:85%;top:50%} 33%{left:35%;top:25%} 66%{left:55%;top:65%} }
        @keyframes agentLane0 { 0%,100%{left:12%} 50%{left:80%} }
        @keyframes agentLane1 { 0%,100%{left:75%} 50%{left:15%} }
        @keyframes agentLane2 { 0%,100%{left:45%} 25%{left:12%} 75%{left:85%} }
        @keyframes agentTravel0 { 0%,100%{left:15%;top:30%} 25%{left:50%;top:50%} 50%{left:80%;top:35%} 75%{left:50%;top:65%} }
        @keyframes agentTravel1 { 0%,100%{left:80%;top:60%} 25%{left:50%;top:40%} 50%{left:20%;top:55%} 75%{left:50%;top:30%} }
      `}</style>
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          animation: `${animName} ${speed}s ease-in-out ${delay}s infinite`,
          ...(lane ? { top: "50%", marginTop: -size / 2 } : {}),
        }}
      >
        {/* Eyes */}
        <div className="absolute bg-background" style={{ width: 2, height: 1, top: 2, left: 1 }} />
        <div className="absolute bg-background" style={{ width: 2, height: 1, top: 2, left: 5 }} />
      </div>
    </>
  );
}

// Chat bubble that appears briefly between agents
function ChatBubble({ color, delay }: { color: string; delay: number }) {
  return (
    <>
      <style jsx>{`
        @keyframes chatPop {
          0%,85%,100% { opacity: 0; transform: scale(0.5); }
          10%,75% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        className="absolute"
        style={{
          top: "30%",
          left: "45%",
          animation: `chatPop 5s ease-in-out ${delay}s infinite`,
          opacity: 0,
        }}
      >
        <div className="border bg-surface px-1.5 py-0.5 flex gap-0.5" style={{ borderColor: `${color}40` }}>
          <div className="w-1 h-1" style={{ backgroundColor: color, opacity: 0.6 }} />
          <div className="w-1 h-1" style={{ backgroundColor: color, opacity: 0.4 }} />
          <div className="w-1 h-1" style={{ backgroundColor: color, opacity: 0.2 }} />
        </div>
      </div>
    </>
  );
}

// ── Hero Chat Bar ─────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "branding — identity + governance",
  "marketing — campaigns + analytics",
  "sustainability — ESG reporting",
  "sales — pipeline + outreach",
];

function HeroChatBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmitted(true);
    const encoded = encodeURIComponent(query.trim());
    setTimeout(() => {
      router.push(`/auth/signup?intent=${encoded}`);
    }, 600);
  }

  return (
    <div className="mt-20 animate-[fadeInSlow_1.2s_ease-out_0.3s_both]">
      {/* Outer glow frame */}
      <div className="relative p-px bg-gradient-to-b from-primary/30 via-border to-border">
        <div className="bg-surface p-6 md:p-8">
          {/* Label row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 border border-primary/40 bg-primary/5 flex items-center justify-center">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Initialize Department</p>
                <p className="text-xs font-mono text-foreground-dim mt-0.5">Define scope — agents are provisioned automatically</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-primary/20 bg-primary/5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary">SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Input bar */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center border-2 border-primary/20 bg-background hover:border-primary/40 focus-within:border-primary transition-colors">
              <span className="pl-5 pr-3 text-primary font-mono text-xl select-none">&gt;</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="branding department, 3 agents, brand governance focus"
                className="flex-1 h-16 bg-transparent text-lg text-foreground font-mono placeholder:text-foreground-dim/60 focus:outline-none pr-4"
              />
              <button
                type="submit"
                className={cn(
                  "shrink-0 h-16 px-6 flex items-center gap-2.5 border-l-2 border-primary/20 font-mono text-sm transition-all",
                  query.trim()
                    ? "text-primary-foreground bg-primary hover:bg-primary/90"
                    : "text-foreground-dim hover:text-foreground"
                )}
              >
                {submitted ? (
                  <>
                    <Bot size={16} className="animate-pulse" />
                    <span>Initializing...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight size={16} />
                    <span className="hidden sm:inline">Init</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-4 py-2 border border-border bg-background text-xs font-mono text-foreground-muted hover:text-primary hover:border-primary/30 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
