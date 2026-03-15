"use client";
import { useState } from "react";
import { ChevronRight, Bell, Shield, Users, Database, HelpCircle, LogOut, Menu, RefreshCw } from "lucide-react";
import { StatusBar } from "../_components/status-bar";
import { LeftDrawer } from "../_components/LeftDrawer";
import type { LucideIcon } from "lucide-react";

const GROUPS: { label: string; items: { Icon: LucideIcon; label: string }[] }[] = [
  {
    label: "WORKSPACE",
    items: [
      { Icon: Users,      label: "Members & Permissions" },
      { Icon: Database,   label: "Vepartment Settings"   },
      { Icon: Bell,       label: "Notifications"         },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { Icon: Shield,     label: "Security"    },
      { Icon: HelpCircle, label: "Help & Docs" },
      { Icon: LogOut,     label: "Sign out"    },
    ],
  },
];

export default function SettingsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <StatusBar />

      {/* Header */}
      <div className="h-14 flex items-center gap-3 px-4 border-b border-border bg-surface shrink-0">
        <button onClick={() => setDrawerOpen(true)} className="w-8 h-8 flex items-center justify-center shrink-0">
          <Menu size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </button>
        <span className="text-[13px] font-mono font-medium text-foreground">Settings</span>
      </div>

      {/* Profile card */}
      <div className="flex items-center gap-3.5 px-4 py-4 border-b border-border bg-surface shrink-0">
        <div className="w-10 h-10 border border-border bg-surface-raised flex items-center justify-center shrink-0">
          <span className="text-[12px] font-mono font-medium text-foreground-muted">AK</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-mono font-medium text-foreground mb-0.5">Alex Kim</p>
          <p className="text-[11px] font-mono text-foreground-muted">Acme Workspace · Admin</p>
        </div>
      </div>

      {/* Groups */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="pt-6 px-4 flex flex-col gap-6 pb-8">
          {GROUPS.map(group => (
            <div key={group.label}>
              <p className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.08em] mb-2.5 pl-0.5">{group.label}</p>
              <div className="border border-border bg-surface">
                {group.items.map(({ Icon, label }, i) => (
                  <button
                    key={label}
                    className={`w-full flex items-center gap-3 px-3.5 py-3.5 ${i < group.items.length - 1 ? "border-b border-border/40" : ""}`}
                  >
                    <div className="w-7 h-7 border border-border flex items-center justify-center shrink-0">
                      <Icon size={14} strokeWidth={1.5} className="text-foreground-muted" />
                    </div>
                    <span className="flex-1 text-[13px] font-mono text-foreground text-left">{label}</span>
                    <ChevronRight size={13} className="text-foreground-dim" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pb-6 flex flex-col items-center gap-2.5">
          <span className="text-[10px] font-mono text-foreground-dim">Vepartment v1.0.0</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-[11px] font-mono text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors">
            <RefreshCw size={11} strokeWidth={1.5} />
            Check for Updates
          </button>
        </div>
      </div>
    </div>
  );
}
