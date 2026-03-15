"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  IconMessage,
  IconSend,
  IconX,
  IconLoader,
  IconBot,
  IconHistory,
  IconTrash,
  IconPlus,
} from "@/components/icons";
import type { ComponentType } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

// ── Props ────────────────────────────────────────────────────────────────────

interface ChatPanelProps {
  /** Department name (e.g. "Marketing"). Required for routing. */
  department: string;
  /** Domain name (e.g. "Social & Messaging"). Empty = vepartment supervisor. */
  domain?: string;
  /** Display name shown in the header. */
  supervisorName?: string;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Icon component to show in the header. Defaults to IconBot. */
  Icon?: ComponentType<{ size?: number; strokeWidth?: number | string; className?: string }>;
  /** Empty state prompt text. */
  emptyPrompt?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// ── Component ────────────────────────────────────────────────────────────────

export function ChatPanel({
  department,
  domain = "",
  supervisorName,
  placeholder,
  Icon,
  emptyPrompt,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessionId, setSessionId] = useState(generateSessionId);
  const [history, setHistory] = useState<ChatSession[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive display values from props
  const displayName =
    supervisorName ||
    (domain ? `${domain} Supervisor` : `${department} Supervisor`);
  const headerLabel = displayName.toUpperCase();
  const inputPlaceholder =
    placeholder || `Ask ${displayName}...`;
  const emptyText =
    emptyPrompt ||
    (domain
      ? `Ask anything about ${domain}\nor domain operations.`
      : `Ask anything about the ${department}\ndepartment.`);
  const HeaderIcon = Icon || IconBot;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !showHistory) inputRef.current?.focus();
  }, [isOpen, showHistory]);

  function saveCurrentToHistory() {
    if (messages.length === 0) return;
    const firstUserMsg = messages.find((m) => m.role === "user");
    const title = firstUserMsg
      ? firstUserMsg.content.slice(0, 40) + (firstUserMsg.content.length > 40 ? "…" : "")
      : "New conversation";

    setHistory((prev) => {
      const existing = prev.findIndex((s) => s.id === sessionId);
      const session: ChatSession = {
        id: sessionId,
        title,
        messages: [...messages],
        createdAt: messages[0]?.timestamp ?? new Date(),
      };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = session;
        return updated;
      }
      return [session, ...prev];
    });
  }

  function startNewChat() {
    saveCurrentToHistory();
    setMessages([]);
    setSessionId(generateSessionId());
    setShowHistory(false);
  }

  function loadSession(session: ChatSession) {
    saveCurrentToHistory();
    setMessages(session.messages);
    setSessionId(session.id);
    setShowHistory(false);
  }

  function deleteSession(id: string) {
    setHistory((prev) => prev.filter((s) => s.id !== id));
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ori/supervisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          department,
          domain,
          sessionId,
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `a_${Date.now()}`,
        role: "assistant",
        content: data.output ?? data.error ?? "No response received.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e_${Date.now()}`,
          role: "assistant",
          content: "Connection error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Collapsed: compact input bar
  if (!isOpen) {
    return (
      <div className="bg-surface border border-border p-3 flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-foreground/5 border border-border">
          <HeaderIcon
            size={14}
            strokeWidth={1.5}
            className="text-foreground-muted"
          />
        </div>
        <input
          className="flex-1 h-8 bg-background border-0 px-3 text-body-sm text-foreground placeholder:text-foreground-dim focus:outline-none"
          placeholder={inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              setIsOpen(true);
              setTimeout(() => sendMessage(), 50);
            }
          }}
          onFocus={() => setIsOpen(true)}
        />
        <button
          onClick={() => { setShowHistory(true); setIsOpen(true); }}
          className="w-8 h-8 flex items-center justify-center text-foreground-dim hover:text-foreground transition-colors"
          title="Chat history"
        >
          <IconHistory size={14} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => {
            if (input.trim()) {
              setIsOpen(true);
              setTimeout(() => sendMessage(), 50);
            } else {
              setIsOpen(true);
            }
          }}
          className="w-8 h-8 flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
        >
          <IconSend size={14} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  // Expanded: full chat panel
  return (
    <div className="bg-surface border border-border flex flex-col" style={{ height: 420 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center bg-primary/10 border border-primary/20">
            <HeaderIcon size={12} strokeWidth={1.5} className="text-primary" />
          </div>
          <span className="text-os-title-sm text-foreground-muted">
            {headerLabel}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={startNewChat}
            className="w-6 h-6 flex items-center justify-center text-foreground-dim hover:text-foreground transition-colors"
            title="New chat"
          >
            <IconPlus size={13} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setShowHistory((v) => !v)}
            className={cn(
              "w-6 h-6 flex items-center justify-center transition-colors",
              showHistory
                ? "text-primary"
                : "text-foreground-dim hover:text-foreground"
            )}
            title="Chat history"
          >
            <IconHistory size={13} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => {
              saveCurrentToHistory();
              setIsOpen(false);
              setShowHistory(false);
            }}
            className="w-6 h-6 flex items-center justify-center text-foreground-dim hover:text-foreground transition-colors"
          >
            <IconX size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* History panel */}
      {showHistory ? (
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-foreground-dim">
              <IconHistory size={20} strokeWidth={1.5} />
              <p className="text-body-sm">No previous conversations</p>
            </div>
          ) : (
            <div className="py-2">
              {history.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-raised transition-colors group",
                    session.id === sessionId && "bg-surface-raised"
                  )}
                >
                  <button
                    onClick={() => loadSession(session)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <p className="text-body-sm text-foreground truncate">
                      {session.title}
                    </p>
                    <p className="text-label-sm text-foreground-dim">
                      {session.messages.length} messages · {formatDate(session.createdAt)}
                    </p>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="w-5 h-5 flex items-center justify-center text-foreground-dim opacity-0 group-hover:opacity-100 hover:text-error transition-all shrink-0"
                    title="Delete"
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
              <div className="flex flex-col items-center justify-center h-full gap-2 text-foreground-dim">
                <HeaderIcon size={24} strokeWidth={1.5} />
                <p className="text-body-sm text-center whitespace-pre-line">
                  {emptyText}
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-primary/10 border border-primary/20 mt-0.5">
                    <HeaderIcon size={10} strokeWidth={1.5} className="text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] px-3 py-2 text-body-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-surface-raised border border-border text-foreground"
                      : "bg-background border border-border-subtle text-foreground"
                  )}
                >
                  <p>{msg.content}</p>
                  <span className="block text-[9px] font-mono text-foreground-dim mt-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 shrink-0 flex items-center justify-center bg-primary/10 border border-primary/20 mt-0.5">
                  <HeaderIcon size={10} strokeWidth={1.5} className="text-primary" />
                </div>
                <div className="bg-background border border-border-subtle px-3 py-2">
                  <IconLoader
                    size={14}
                    strokeWidth={1.5}
                    className="text-foreground-dim animate-spin"
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3 flex items-center gap-3 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 h-8 bg-background border border-border px-3 text-body-sm text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-primary disabled:opacity-50"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={cn(
                "w-8 h-8 flex items-center justify-center transition-colors",
                input.trim() && !isLoading
                  ? "text-primary hover:text-primary/80"
                  : "text-foreground-dim opacity-50"
              )}
            >
              <IconSend size={14} strokeWidth={1.5} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
