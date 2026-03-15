"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconSettings,
  IconKey,
  IconBot,
  IconWorkflow,
  IconCheck,
  IconX,
  IconLoader,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconSave,
  IconRefreshCw,
} from "@/components/icons";

// ── Types ────────────────────────────────────────────────────────────────────

interface PlatformConfig {
  llmModel: string;
  openaiKey: string;
  openaiConnected: boolean;
  anthropicKey: string;
  anthropicConnected: boolean;
  n8nWebhookUrl: string;
  n8nConnected: boolean;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ── Platform definitions ────────────────────────────────────────────────────

const LLM_MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "claude-sonnet-4-20250514", label: "Claude Sonnet 4" },
  { value: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5" },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [config, setConfig] = useState<PlatformConfig | null>(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [llmModel, setLlmModel] = useState("gpt-4o-mini");
  const [n8nUrl, setN8nUrl] = useState("");

  // Visibility toggles
  const [showOpenai, setShowOpenai] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);

  // Save status per section
  const [saveStatus, setSaveStatus] = useState<Record<string, SaveStatus>>({});

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/ori/config");
      if (!res.ok) {
        setBackendOnline(false);
        setLoading(false);
        return;
      }
      const data: PlatformConfig = await res.json();
      setConfig(data);
      setBackendOnline(true);
      setLlmModel(data.llmModel || "gpt-4o-mini");
      setN8nUrl(data.n8nWebhookUrl || "");
      // Don't overwrite key inputs — they show redacted values from backend
    } catch {
      setBackendOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  async function saveField(field: string, value: string) {
    setSaveStatus((prev) => ({ ...prev, [field]: "saving" }));

    const bodyMap: Record<string, Record<string, string>> = {
      openai: { openai_api_key: value },
      anthropic: { anthropic_api_key: value },
      llmModel: { llm_model: value },
      n8n: { n8n_webhook_url: value },
    };

    try {
      const res = await fetch("/api/ori/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyMap[field]),
      });

      if (!res.ok) throw new Error("Save failed");

      setSaveStatus((prev) => ({ ...prev, [field]: "saved" }));
      // Refresh config to get updated connection status
      await fetchConfig();
      // Reset after 2s
      setTimeout(() => setSaveStatus((prev) => ({ ...prev, [field]: "idle" })), 2000);
    } catch {
      setSaveStatus((prev) => ({ ...prev, [field]: "error" }));
      setTimeout(() => setSaveStatus((prev) => ({ ...prev, [field]: "idle" })), 3000);
    }
  }

  function StatusBadge({ connected, label }: { connected: boolean; label: string }) {
    return (
      <div className={cn(
        "flex items-center gap-1.5 px-2 py-1 border text-os-title-sm",
        connected
          ? "border-success/30 text-success bg-success/5"
          : "border-border text-foreground-dim bg-transparent"
      )}>
        {connected ? <IconCheck size={10} /> : <IconX size={10} />}
        {label}
      </div>
    );
  }

  function SaveButton({ field, onClick }: { field: string; onClick: () => void }) {
    const status = saveStatus[field] || "idle";
    return (
      <button
        onClick={onClick}
        disabled={status === "saving" || !backendOnline}
        className={cn(
          "flex items-center gap-1.5 h-8 px-3 border text-label-sm transition-colors",
          status === "saved"
            ? "border-success/30 text-success bg-success/5"
            : status === "error"
            ? "border-error/30 text-error bg-error/5"
            : "border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted disabled:opacity-50"
        )}
      >
        {status === "saving" && <IconLoader size={11} className="animate-spin" />}
        {status === "saved" && <IconCheck size={11} />}
        {status === "error" && <IconX size={11} />}
        {status === "idle" && <IconSave size={11} />}
        {status === "saving" ? "Saving..." : status === "saved" ? "Saved" : status === "error" ? "Failed" : "Save"}
      </button>
    );
  }

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">

      {/* Header */}
      <header className="h-14 shrink-0 flex items-center gap-4 px-4 lg:px-8 border-b border-border bg-surface">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-foreground-dim hover:text-foreground transition-colors">
          <IconArrowLeft size={13} />
          <span className="text-label-sm">Dashboard</span>
        </Link>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2 flex-1">
          <IconSettings size={15} className="text-foreground-muted" />
          <span className="text-body-sm text-foreground font-medium">Settings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", backendOnline ? "bg-success" : "bg-error")} />
          <span className="text-label-sm text-foreground-dim font-mono">
            {backendOnline ? "Backend online" : "Backend offline"}
          </span>
          <button
            onClick={fetchConfig}
            className="w-7 h-7 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground transition-colors"
            title="Refresh"
          >
            <IconRefreshCw size={12} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[720px] mx-auto px-4 lg:px-6 py-8 space-y-6">

          {/* Backend status banner */}
          {!loading && !backendOnline && (
            <div className="border border-warning/30 bg-warning/5 px-4 py-3 flex items-start gap-3">
              <IconX size={14} className="text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-body-sm text-foreground font-medium">CrewAI backend is offline</p>
                <p className="text-label-sm text-foreground-dim mt-1">
                  Start the backend to connect agents. Run: <span className="font-mono text-foreground-muted">cd backend && python main.py</span>
                </p>
              </div>
            </div>
          )}

          {/* ── LLM Provider ─────────────────────────────────────── */}
          <section className="border border-border bg-surface">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center border border-border">
                  <IconBot size={16} className="text-foreground-muted" />
                </div>
                <div>
                  <h2 className="text-module-sm font-medium text-foreground">LLM Provider</h2>
                  <p className="text-label-sm text-foreground-dim">AI model powering all agents</p>
                </div>
              </div>
              <StatusBadge
                connected={config?.openaiConnected || config?.anthropicConnected || false}
                label={config?.openaiConnected || config?.anthropicConnected ? "CONNECTED" : "NOT SET"}
              />
            </div>
            <div className="p-5 space-y-5">

              {/* Model selector */}
              <div>
                <label className="text-os-title-sm text-foreground-dim block mb-2">MODEL</label>
                <div className="flex items-center gap-3">
                  <select
                    value={llmModel}
                    onChange={(e) => setLlmModel(e.target.value)}
                    className="flex-1 h-9 bg-background border border-border px-3 text-body-sm text-foreground focus:outline-none focus:border-primary appearance-none"
                  >
                    {LLM_MODELS.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                  <SaveButton field="llmModel" onClick={() => saveField("llmModel", llmModel)} />
                </div>
              </div>

              {/* OpenAI */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-os-title-sm text-foreground-dim">OPENAI API KEY</label>
                  {config?.openaiConnected && (
                    <span className="text-label-sm text-success font-mono">{config.openaiKey}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type={showOpenai ? "text" : "password"}
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full h-9 bg-background border border-border px-3 pr-9 text-body-sm text-foreground font-mono placeholder:text-foreground-dim focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => setShowOpenai((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-dim hover:text-foreground"
                    >
                      {showOpenai ? <IconEyeOff size={13} /> : <IconEye size={13} />}
                    </button>
                  </div>
                  <SaveButton field="openai" onClick={() => saveField("openai", openaiKey)} />
                </div>
              </div>

              {/* Anthropic */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-os-title-sm text-foreground-dim">ANTHROPIC API KEY</label>
                  {config?.anthropicConnected && (
                    <span className="text-label-sm text-success font-mono">{config.anthropicKey}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type={showAnthropic ? "text" : "password"}
                      value={anthropicKey}
                      onChange={(e) => setAnthropicKey(e.target.value)}
                      placeholder="sk-ant-..."
                      className="w-full h-9 bg-background border border-border px-3 pr-9 text-body-sm text-foreground font-mono placeholder:text-foreground-dim focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => setShowAnthropic((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-dim hover:text-foreground"
                    >
                      {showAnthropic ? <IconEyeOff size={13} /> : <IconEye size={13} />}
                    </button>
                  </div>
                  <SaveButton field="anthropic" onClick={() => saveField("anthropic", anthropicKey)} />
                </div>
              </div>

              <p className="text-label-sm text-foreground-dim">
                Set at least one LLM key. OpenAI keys start with <span className="font-mono">sk-</span>, Anthropic with <span className="font-mono">sk-ant-</span>.
                Keys are saved to <span className="font-mono">backend/.env</span> and take effect immediately.
              </p>
            </div>
          </section>

          {/* ── n8n Workflows ────────────────────────────────────── */}
          <section className="border border-border bg-surface">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center border border-border">
                  <IconWorkflow size={16} className="text-foreground-muted" />
                </div>
                <div>
                  <h2 className="text-module-sm font-medium text-foreground">n8n Workflows</h2>
                  <p className="text-label-sm text-foreground-dim">Domain-level execution and external integrations</p>
                </div>
              </div>
              <StatusBadge connected={config?.n8nConnected || false} label={config?.n8nConnected ? "CONNECTED" : "NOT SET"} />
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-os-title-sm text-foreground-dim block mb-2">WEBHOOK BASE URL</label>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    value={n8nUrl}
                    onChange={(e) => setN8nUrl(e.target.value)}
                    placeholder="https://your-n8n.app.n8n.cloud/webhook"
                    className="flex-1 h-9 bg-background border border-border px-3 text-body-sm text-foreground font-mono placeholder:text-foreground-dim focus:outline-none focus:border-primary"
                  />
                  <SaveButton field="n8n" onClick={() => saveField("n8n", n8nUrl)} />
                </div>
              </div>
              <p className="text-label-sm text-foreground-dim">
                Agents use n8n webhooks for domain-level task execution — content publishing, analytics, external API calls.
              </p>
            </div>
          </section>

          {/* ── Platform Connections (future) ────────────────────── */}
          <section className="border border-border bg-surface">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center border border-border">
                  <IconKey size={16} className="text-foreground-muted" />
                </div>
                <div>
                  <h2 className="text-module-sm font-medium text-foreground">Platform Connections</h2>
                  <p className="text-label-sm text-foreground-dim">External services used by domain agents</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border-subtle">
              {[
                { name: "Google Analytics", desc: "Performance tracking and reporting", status: "planned" },
                { name: "Meta Business Suite", desc: "Facebook & Instagram management", status: "planned" },
                { name: "Slack", desc: "Team notifications and alerts", status: "planned" },
                { name: "HubSpot", desc: "CRM and marketing automation", status: "planned" },
                { name: "Mailchimp", desc: "Email campaign execution", status: "planned" },
                { name: "Buffer / Hootsuite", desc: "Social media scheduling", status: "planned" },
              ].map((platform) => (
                <div key={platform.name} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-6 h-6 flex items-center justify-center border border-border-subtle shrink-0">
                    <IconExternalLink size={11} className="text-foreground-dim" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-foreground">{platform.name}</p>
                    <p className="text-label-sm text-foreground-dim">{platform.desc}</p>
                  </div>
                  <span className="text-os-title-sm text-foreground-dim border border-border-subtle px-2 py-0.5">
                    PLANNED
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border">
              <p className="text-label-sm text-foreground-dim">
                Platform connections are routed through n8n workflows. Configure them in your n8n instance and agents will use them automatically.
              </p>
            </div>
          </section>

          {/* ── Version & Updates ──────────────────────────────── */}
          <section className="border border-border bg-surface">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-label-sm text-foreground-dim font-mono">Vepartment v1.0.0</span>
              </div>
              <button className="flex items-center gap-1.5 h-8 px-3 border border-border text-label-sm text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
                <IconRefreshCw size={11} />
                Check for Updates
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
