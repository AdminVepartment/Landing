"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconX, IconCheck, IconBell, IconBellOff,
  IconBot, IconWorkflow, IconLayers,
  IconAlertTriangle, IconInfo, IconCheckCircle,
  IconChevronRight, IconFilter,
  IconMarketing,
} from "@/components/icons";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type NotifCategory = "system" | "agent" | "workflow" | "approval";
type NotifPriority = "info" | "warning" | "success" | "error";

interface Notification {
  id: string;
  category: NotifCategory;
  priority: NotifPriority;
  title: string;
  body: string;
  dept?: string;
  domain?: string;
  agent?: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  actionHref?: string;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    category: "approval",
    priority: "warning",
    title: "Content draft pending review",
    body: "Content Creator (SM-E1) submitted a LinkedIn post draft for approval.",
    dept: "Marketing",
    domain: "Social & Messaging",
    agent: "SM-E1",
    time: "4m ago",
    read: false,
    actionLabel: "Review",
    actionHref: "/dashboard/marketing/social-messaging",
  },
  {
    id: "n2",
    category: "agent",
    priority: "success",
    title: "Strategy Planner completed analysis",
    body: "Weekly content strategy analysis finished. 3 new recommendations available.",
    dept: "Marketing",
    domain: "Social & Messaging",
    agent: "SM-S1",
    time: "12m ago",
    read: false,
    actionLabel: "View",
    actionHref: "/dashboard/marketing/social-messaging",
  },
  {
    id: "n3",
    category: "workflow",
    priority: "info",
    title: "Scheduled post queued",
    body: "Instagram carousel scheduled for tomorrow 09:00 UTC.",
    dept: "Marketing",
    domain: "Social & Messaging",
    time: "28m ago",
    read: false,
  },
  {
    id: "n4",
    category: "agent",
    priority: "warning",
    title: "Quality Reviewer flagged issue",
    body: "Brand voice deviation detected in 2 queued posts. Manual check recommended.",
    dept: "Marketing",
    domain: "Social & Messaging",
    agent: "SM-M1",
    time: "1h ago",
    read: false,
    actionLabel: "Review",
    actionHref: "/dashboard/marketing/social-messaging",
  },
  {
    id: "n5",
    category: "system",
    priority: "success",
    title: "Domain activated",
    body: "Social & Messaging domain is now fully operational with 6 agents.",
    dept: "Marketing",
    time: "2h ago",
    read: true,
  },
  {
    id: "n6",
    category: "workflow",
    priority: "info",
    title: "Performance report generated",
    body: "Weekly performance report for Social & Messaging is ready.",
    dept: "Marketing",
    domain: "Social & Messaging",
    time: "3h ago",
    read: true,
    actionLabel: "Open",
    actionHref: "/dashboard/marketing/social-messaging",
  },
  {
    id: "n7",
    category: "agent",
    priority: "info",
    title: "Innovation Explorer updated",
    body: "SM-I1 draft agent configuration has been updated with new parameters.",
    dept: "Marketing",
    domain: "Social & Messaging",
    agent: "SM-I1",
    time: "5h ago",
    read: true,
  },
  {
    id: "n8",
    category: "system",
    priority: "info",
    title: "System maintenance completed",
    body: "Scheduled maintenance window completed. All services operational.",
    time: "8h ago",
    read: true,
  },
  {
    id: "n9",
    category: "approval",
    priority: "warning",
    title: "Workflow change requires approval",
    body: "Performance Optimizer proposed changes to posting frequency rules.",
    dept: "Marketing",
    domain: "Social & Messaging",
    agent: "SM-G1",
    time: "12h ago",
    read: true,
    actionLabel: "Review",
    actionHref: "/dashboard/marketing/social-messaging",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<NotifCategory, { label: string; icon: typeof IconBell }> = {
  system:   { label: "SYSTEM",   icon: IconInfo },
  agent:    { label: "AGENT",    icon: IconBot },
  workflow: { label: "WORKFLOW", icon: IconWorkflow },
  approval: { label: "APPROVAL", icon: IconAlertTriangle },
};

const PRIORITY_STYLES: Record<NotifPriority, string> = {
  info:    "bg-foreground-dim",
  warning: "bg-warning",
  success: "bg-success",
  error:   "bg-error",
};

// ── Component ────────────────────────────────────────────────────────────────

export function NotificationCenter({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<NotifCategory | "all">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === "all"
    ? notifications
    : notifications.filter((n) => n.category === filter);

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/60"
        onClick={onClose}
      />

      {/* Panel — slides from right */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-surface border-l border-border flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-border shrink-0">
          <IconBell size={14} className="text-foreground-muted" />
          <h2 className="text-os-title-sm text-foreground-muted flex-1">NOTIFICATIONS</h2>
          {unreadCount > 0 && (
            <span className="text-label-sm text-foreground-dim font-mono border border-border px-1.5 py-0.5">
              {unreadCount} new
            </span>
          )}
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors"
          >
            <IconX size={12} />
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1 px-4 py-2.5 border-b border-border-subtle overflow-x-auto shrink-0">
          <IconFilter size={10} className="text-foreground-dim shrink-0 mr-1" />
          {(["all", "approval", "agent", "workflow", "system"] as const).map((cat) => {
            const isActive = filter === cat;
            const count = cat === "all"
              ? notifications.length
              : notifications.filter((n) => n.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "h-6 px-2.5 text-[9px] font-mono uppercase tracking-[0.08em] border transition-colors shrink-0",
                  isActive
                    ? "border-foreground/20 bg-surface-raised text-foreground"
                    : "border-transparent text-foreground-dim hover:text-foreground"
                )}
              >
                {cat === "all" ? "All" : cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Actions bar */}
        {unreadCount > 0 && (
          <div className="flex items-center justify-between px-5 py-2 border-b border-border-subtle shrink-0">
            <span className="text-label-sm text-foreground-dim font-mono">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </span>
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-foreground-dim hover:text-foreground transition-colors"
            >
              <IconCheck size={10} />
              <span className="text-label-sm">Mark all read</span>
            </button>
          </div>
        )}

        {/* Notification list */}
        <div className="flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <IconBellOff size={20} className="text-foreground-dim/30" />
              <span className="text-label-sm text-foreground-dim font-mono">No notifications</span>
            </div>
          ) : (
            <div className="divide-y divide-border-subtle">
              {filtered.map((notif) => {
                const catMeta = CATEGORY_META[notif.category];
                const CatIcon = catMeta.icon;

                return (
                  <div
                    key={notif.id}
                    className={cn(
                      "px-5 py-4 transition-colors group relative",
                      !notif.read && "bg-surface-raised/50"
                    )}
                    onClick={() => markRead(notif.id)}
                  >
                    {/* Unread indicator */}
                    {!notif.read && (
                      <div
                        className={cn(
                          "absolute left-1.5 top-5 w-1.5 h-1.5 rounded-full",
                          PRIORITY_STYLES[notif.priority]
                        )}
                      />
                    )}

                    {/* Top row: category + time + dismiss */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <CatIcon size={10} className="text-foreground-dim shrink-0" />
                      <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-foreground-dim">
                        {catMeta.label}
                      </span>
                      {notif.dept && (
                        <>
                          <div className="w-px h-2.5 bg-border" />
                          <span className="text-[8px] font-mono uppercase tracking-[0.06em] text-foreground-dim">
                            {notif.dept}
                          </span>
                        </>
                      )}
                      <span className="text-[8px] font-mono text-foreground-dim/50 ml-auto shrink-0">
                        {notif.time}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dismiss(notif.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center text-foreground-dim hover:text-foreground transition-all shrink-0"
                      >
                        <IconX size={9} />
                      </button>
                    </div>

                    {/* Title */}
                    <p className={cn(
                      "text-body-sm leading-snug mb-1",
                      notif.read ? "text-foreground-muted" : "text-foreground font-medium"
                    )}>
                      {notif.title}
                    </p>

                    {/* Body */}
                    <p className="text-label-sm text-foreground-dim leading-relaxed">
                      {notif.body}
                    </p>

                    {/* Meta row: agent code + domain */}
                    {(notif.agent || notif.domain) && (
                      <div className="flex items-center gap-2 mt-2">
                        {notif.agent && (
                          <span className="text-[8px] font-mono text-foreground-dim/60 border border-border px-1.5 py-0.5">
                            {notif.agent}
                          </span>
                        )}
                        {notif.domain && (
                          <span className="text-[8px] font-mono text-foreground-dim/60">
                            {notif.domain}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action button */}
                    {notif.actionLabel && notif.actionHref && (
                      <Link
                        href={notif.actionHref}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 mt-2.5 h-6 px-3 border border-border text-foreground-dim hover:text-foreground hover:border-foreground-muted transition-colors"
                      >
                        <span className="text-[9px] font-mono uppercase tracking-[0.06em]">
                          {notif.actionLabel}
                        </span>
                        <IconChevronRight size={9} />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <IconMarketing size={10} className="text-foreground-dim" />
            <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-foreground-dim">
              MARKETING DEPT
            </span>
          </div>
          <Link
            href="/dashboard/notifications"
            className="flex items-center gap-1 text-foreground-dim hover:text-foreground transition-colors"
          >
            <span className="text-label-sm">View all</span>
            <IconChevronRight size={10} />
          </Link>
        </div>
      </div>
    </>
  );
}

// ── Bell trigger (reusable) ──────────────────────────────────────────────────

export function NotificationBell({
  unreadCount,
  onClick,
  size = 14,
}: {
  unreadCount: number;
  onClick: () => void;
  size?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
    >
      <IconBell size={size} />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-error" />
      )}
    </button>
  );
}
