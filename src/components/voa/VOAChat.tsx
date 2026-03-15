"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { IconSend, IconLoader, IconHistory, IconPlus, IconTrash } from "@/components/icons";
import { IconOri } from "@/components/icons/vepartment";
import { useOri } from "@/lib/ori-store";
import type { ChatMessage } from "@/lib/ori/types";

// ── Types ────────────────────────────────────────────────────────────────────

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function genId() {
  return `voa_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(d: Date) {
  const mins = Math.floor((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Suggested prompts ────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "Show system status",
  "List active tasks",
  "Check supervisor health",
  "Deploy new agent",
];

// ── Component ────────────────────────────────────────────────────────────────

interface VOAChatProps {
  className?: string;
}

export function VOAChat({ className }: VOAChatProps) {
  const { messages, isProcessing, sendMessage, status } = useOri();

  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ChatSession[]>([]);
  const [localSessionId, setLocalSessionId] = useState(genId);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scroll = useCallback(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), []);

  useEffect(() => { scroll(); }, [messages, scroll]);
  useEffect(() => { if (!showHistory) inputRef.current?.focus(); }, [showHistory]);

  function saveToHistory() {
    if (messages.length === 0) return;
    const firstUser = messages.find((m) => m.role === "user");
    const title = firstUser
      ? firstUser.content.slice(0, 40) + (firstUser.content.length > 40 ? "…" : "")
      : "New conversation";

    setHistory((prev) => {
      const idx = prev.findIndex((s) => s.id === localSessionId);
      const session: ChatSession = { id: localSessionId, title, messages: [...messages], createdAt: messages[0]?.timestamp ?? new Date() };
      if (idx >= 0) { const u = [...prev]; u[idx] = session; return u; }
      return [session, ...prev];
    });
  }

  function startNew() { saveToHistory(); setLocalSessionId(genId()); setShowHistory(false); }
  function loadSession(s: ChatSession) { saveToHistory(); setLocalSessionId(s.id); setShowHistory(false); }
  function deleteSession(id: string) { setHistory((p) => p.filter((s) => s.id !== id)); }

  async function send(text?: string) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isProcessing) return;
    setInput("");
    await sendMessage(trimmed);
  }

  const statusDot = status === "online" ? "bg-success" : status === "busy" ? "bg-warning" : "bg-foreground-dim";

  return (
    <div className={cn("border border-border bg-surface flex flex-col", className)} style={{ borderTop: "2px solid hsl(var(--primary))" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 flex items-center justify-center border border-primary/30 bg-primary/5">
            <IconOri size={14} strokeWidth={1.5} className="text-primary" />
          </div>
          <div>
            <span className="text-os-title-sm text-foreground-muted">ORI · OPERATIONS AGENT</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={cn("w-1 h-1 rounded-full", statusDot)} />
              <span className="text-label-sm text-foreground-dim font-mono">{status}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={startNew} className="w-6 h-6 flex items-center justify-center text-foreground-dim hover:text-foreground transition-colors" title="New chat">
            <IconPlus size={13} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setShowHistory((v) => !v)}
            className={cn("w-6 h-6 flex items-center justify-center transition-colors", showHistory ? "text-primary" : "text-foreground-dim hover:text-foreground")}
            title="History"
          >
            <IconHistory size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* History view */}
      {showHistory ? (
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-foreground-dim">
              <IconHistory size={20} strokeWidth={1.5} />
              <p className="text-body-sm">No previous conversations</p>
            </div>
          ) : (
            <div className="py-2">
              {history.map((s) => (
                <div key={s.id} className={cn("flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-raised transition-colors group", s.id === localSessionId && "bg-surface-raised")}>
                  <button onClick={() => loadSession(s)} className="flex-1 min-w-0 text-left">
                    <p className="text-body-sm text-foreground truncate">{s.title}</p>
                    <p className="text-label-sm text-foreground-dim">{s.messages.length} messages · {formatDate(s.createdAt)}</p>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteSession(s.id); }}
                    className="w-5 h-5 flex items-center justify-center text-foreground-dim opacity-0 group-hover:opacity-100 hover:text-error transition-all shrink-0"
                  >
                    <IconTrash size={11} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-foreground-dim">
                <div className="w-10 h-10 flex items-center justify-center border border-primary/20 bg-primary/5">
                  <IconOri size={20} strokeWidth={1.5} className="text-primary" />
                </div>
                <p className="text-body-sm text-center">
                  Hi, I&apos;m Ori. How can I help you<br />operate your Vepartment system?
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-2.5 py-1.5 text-label-sm text-foreground-dim border border-border hover:border-foreground-muted hover:text-foreground transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-primary/5 border border-primary/20 mt-0.5">
                    <IconOri size={10} strokeWidth={1.5} className="text-primary" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[80%] px-3 py-2 text-body-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-surface-raised border border-border text-foreground"
                    : "bg-background border border-border-subtle text-foreground"
                )}>
                  <p>{msg.content}</p>
                  <span className="block text-[9px] font-mono text-foreground-dim mt-1">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-primary/5 border border-primary/20 mt-0.5">
                  <IconOri size={10} strokeWidth={1.5} className="text-primary" />
                </div>
                <div className="bg-background border border-border-subtle px-3 py-2">
                  <IconLoader size={14} strokeWidth={1.5} className="text-foreground-dim animate-spin" />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3 flex items-center gap-3 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              disabled={isProcessing}
              className="flex-1 h-8 bg-background border border-border px-3 text-body-sm text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary disabled:opacity-50"
              placeholder="Message Ori..."
            />
            <button
              onClick={() => send()}
              disabled={isProcessing || !input.trim()}
              className={cn("w-8 h-8 flex items-center justify-center transition-colors", input.trim() && !isProcessing ? "text-primary hover:text-primary/80" : "text-foreground-dim opacity-50")}
            >
              <IconSend size={14} strokeWidth={1.5} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
