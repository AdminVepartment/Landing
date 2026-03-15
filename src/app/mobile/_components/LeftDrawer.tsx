"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Archive, Search, Settings, Bell, Plus, Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/mobile",        label: "Dashboard", Icon: Home    },
  { href: "/mobile/assets", label: "Assets",    Icon: Archive },
  { href: "/mobile/search", label: "Search",    Icon: Search  },
];

const ACTIVE_VEPTS = [
  { name: "Marketing", href: "/mobile/marketing", color: "#4F46E5" },
  { name: "Branding",  href: "/mobile/branding",  color: "#EA580C" },
];

const LOCKED_VEPTS = ["Sustainability", "Sales"];

const TEAM = ["AK", "MR", "TP"];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function LeftDrawer({ open, onClose }: Props) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex">
      {/* Panel */}
      <div className="w-[72%] max-w-[280px] h-full bg-surface border-r border-border flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border shrink-0">
          <div className="w-6 h-6 border border-foreground flex items-center justify-center shrink-0">
            <div className="w-2 h-2 bg-foreground" />
          </div>
          <span className="flex-1 text-[13px] font-mono font-medium text-foreground truncate">Acme Workspace</span>
          <button onClick={onClose} className="w-7 h-7 border border-border flex items-center justify-center shrink-0">
            <X size={13} className="text-foreground-muted" />
          </button>
        </div>

        {/* Primary nav */}
        <nav className="px-3 pt-3 pb-3 border-b border-border space-y-px shrink-0">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/mobile" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 text-[13px] font-mono",
                  active ? "bg-surface-raised text-foreground font-medium" : "text-foreground-muted"
                )}
              >
                <Icon size={15} strokeWidth={1.5} className="shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Vepartments */}
        <div className="flex-1 px-3 pt-4 overflow-y-auto min-h-0">
          <p className="text-[10px] font-mono font-medium text-foreground-muted tracking-[0.1em] uppercase px-3 mb-3">Vepartments</p>

          {ACTIVE_VEPTS.map(({ name, href, color }) => (
            <Link key={name} href={href} onClick={onClose} className="flex items-center gap-2.5 px-3 py-2.5 mb-px">
              <div className="w-3.5 h-3.5 shrink-0" style={{ backgroundColor: color, opacity: 0.85 }} />
              <span className="flex-1 text-[13px] font-mono font-medium text-foreground">{name}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
            </Link>
          ))}

          {LOCKED_VEPTS.map(name => (
            <div key={name} className="flex items-center gap-2.5 px-3 py-2.5 opacity-40">
              <div className="w-3.5 h-3.5 border border-border shrink-0" />
              <span className="flex-1 text-[13px] font-mono text-foreground-muted">{name}</span>
              <Lock size={12} className="text-foreground-muted shrink-0" />
            </div>
          ))}

          <button className="flex items-center gap-2 px-3 py-2.5 mt-1 w-full text-foreground-muted">
            <Plus size={13} className="shrink-0" />
            <span className="text-[12px] font-mono">Add department</span>
          </button>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border px-4 py-3 flex items-center gap-2.5">
          <div className="flex -space-x-1.5 flex-1">
            {TEAM.map(i => (
              <div key={i} className="w-6 h-6 flex items-center justify-center bg-surface-raised border border-border text-[10px] font-mono text-foreground-muted">{i}</div>
            ))}
          </div>
          <Bell size={15} className="text-foreground-muted" />
          <Settings size={15} className="text-foreground-muted" />
        </div>
      </div>

      {/* Overlay */}
      <div className="flex-1 bg-background/70" onClick={onClose} />
    </div>
  );
}
