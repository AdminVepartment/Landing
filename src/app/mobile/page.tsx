"use client";
import { useState } from "react";
import { Bell, Bot, Plus, Sparkles, ChevronRight, ArrowUpRight, Layers, FileText, Calendar, Lock, Menu } from "lucide-react";
import { StatusBar } from "./_components/status-bar";
import { LeftDrawer } from "./_components/LeftDrawer";

const ACTIVE_DEPTS = [
  {
    name: "Marketing", color: "#4F46E5",
    desc: "Brand awareness, lead generation, and content operations",
    domains: [
      { name: "Campaign Planning",    active: true,  agents: 3, agentsActive: 2 },
      { name: "Content Creation",     active: true,  agents: 4, agentsActive: 1 },
      { name: "Performance Analysis", active: true,  agents: 2, agentsActive: 2 },
    ],
  },
  {
    name: "Branding", color: "#EA580C",
    desc: "Brand identity, visual language, and creative direction",
    domains: [
      { name: "Brand Identity",    active: true,  agents: 3, agentsActive: 3 },
      { name: "Visual Design",     active: true,  agents: 2, agentsActive: 2 },
      { name: "Creative Strategy", active: false, agents: 1, agentsActive: 0 },
    ],
  },
];

const LOCKED  = ["Sustainability", "Sales"];
const QUICK   = ["Draft a campaign", "Analyze performance", "Schedule content"];
const ACTIVITY = [
  { title: "Campaign brief generated",      dept: "Marketing", time: "2m ago"  },
  { title: "Brand identity deck generated", dept: "Branding",  time: "14m ago" },
  { title: "Content calendar updated",      dept: "Marketing", time: "1h ago"  },
  { title: "Performance report compiled",   dept: "Marketing", time: "2h ago"  },
];
const UPCOMING = [
  { day: "Today", time: "11:00", label: "Q1 Campaign Review",     dept: "Marketing" },
  { day: "Today", time: "14:30", label: "Brand Identity Workshop", dept: "Branding"  },
  { day: "Mar 6", time: "10:00", label: "Content Planning Sync",   dept: "Marketing" },
];

const totalAgents       = ACTIVE_DEPTS.flatMap(d => d.domains).reduce((s, d) => s + d.agents, 0);
const totalAgentsActive = ACTIVE_DEPTS.flatMap(d => d.domains).reduce((s, d) => s + d.agentsActive, 0);
const totalDomains      = ACTIVE_DEPTS.flatMap(d => d.domains).length;
const activeDomains     = ACTIVE_DEPTS.flatMap(d => d.domains).filter(d => d.active).length;

function DeptCard({ dept }: { dept: typeof ACTIVE_DEPTS[0] }) {
  const [open, setOpen] = useState(false);

  const deptActive   = dept.domains.filter(d => d.active).length;
  const deptAgents   = dept.domains.reduce((s, d) => s + d.agents, 0);
  const deptAgentsOn = dept.domains.reduce((s, d) => s + d.agentsActive, 0);

  return (
    <div className="border border-border bg-surface" style={{ borderTopColor: dept.color, borderTopWidth: 3 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40">
        <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0">
          <Layers size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] font-mono font-medium text-foreground">{dept.name}</span>
            <span className="border border-border px-1 py-0.5 text-[8px] font-mono font-medium text-foreground-dim tracking-[0.05em]">ACTIVE</span>
          </div>
          <span className="text-[11px] font-mono text-foreground-muted truncate block">{dept.desc}</span>
        </div>
        <button className="flex items-center gap-1 border border-border px-2 py-1.5 shrink-0">
          <span className="text-[10px] font-mono text-foreground-muted">Open</span>
          <ArrowUpRight size={10} className="text-foreground-muted" />
        </button>
      </div>

      {/* Stats strip — always visible, tap to toggle domains */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-1.5 px-4 py-2.5 bg-surface-raised"
      >
        <span className="text-[10px] font-mono font-medium text-foreground-muted tracking-[0.05em] uppercase">Domains</span>
        <div className="w-px h-2.5 bg-border mx-0.5" />
        <span className="text-[10px] font-mono text-foreground-muted">{deptActive}/{dept.domains.length} active</span>
        <div className="w-px h-2.5 bg-border mx-0.5" />
        <Bot size={10} className="text-foreground-muted" />
        <span className="text-[10px] font-mono text-foreground-muted">{deptAgentsOn}/{deptAgents} agents</span>
        <ChevronRight
          size={12}
          className="text-foreground-dim ml-auto transition-transform duration-150"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Collapsible domain list */}
      {open && (
        <>
          <div className="border-t border-border/40">
            {dept.domains.map((d, i) => (
              <div key={d.name} className={`flex items-center gap-2 px-4 py-3 ${i < dept.domains.length - 1 ? "border-b border-border/30" : ""}`}>
                <div className="w-[26px] h-[26px] border border-border flex items-center justify-center shrink-0">
                  <FileText size={12} strokeWidth={1.5} className={d.active ? "text-foreground-muted" : "text-foreground-dim"} />
                </div>
                <span className={`flex-1 text-[12px] font-mono truncate ${d.active ? "text-foreground" : "text-foreground-dim"}`}>{d.name}</span>
                <div className="flex items-center gap-1">
                  <Bot size={9} className="text-foreground-dim" />
                  <span className="text-[10px] font-mono text-foreground-dim">{d.active ? `${d.agentsActive}/${d.agents}` : "—"}</span>
                </div>
                <div className="w-px h-2.5 bg-border" />
                <div className={`w-1.5 h-1.5 rounded-full ${d.active ? "bg-success" : "bg-border"}`} />
              </div>
            ))}
          </div>
          <button className="w-full flex items-center gap-2.5 px-4 py-3 border-t border-border/30">
            <div className="w-[26px] h-[26px] border border-dashed border-border flex items-center justify-center shrink-0">
              <Plus size={11} className="text-foreground-dim" />
            </div>
            <span className="flex-1 text-[11px] font-mono text-foreground-dim text-left">Add domain</span>
            <ChevronRight size={11} className="text-foreground-dim" />
          </button>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <StatusBar />

      {/* Header */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-border bg-surface shrink-0">
        <button onClick={() => setDrawerOpen(true)} className="w-8 h-8 flex items-center justify-center shrink-0">
          <Menu size={18} strokeWidth={1.5} className="text-foreground-muted" />
        </button>
        <span className="flex-1 text-[13px] font-mono font-medium text-foreground truncate">Acme Workspace</span>
        <div className="relative">
          <Bell size={16} strokeWidth={1.5} className="text-foreground-muted" />
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-error" />
        </div>
        <div className="w-[26px] h-[26px] border border-border bg-surface-raised flex items-center justify-center">
          <span className="text-[9px] font-mono text-foreground-muted">AK</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="pt-5">

          {/* Greeting */}
          <div className="px-4 mb-7">
            <h1 className="text-[20px] font-mono font-medium text-foreground mb-1.5">Good morning, Alex.</h1>
            <p className="text-[12px] font-mono text-foreground-muted leading-[18px]">
              {ACTIVE_DEPTS.length} vepartments active · {activeDomains}/{totalDomains} domains · {totalAgentsActive}/{totalAgents} agents online
            </p>
          </div>

          {/* Command bar */}
          <div className="mx-4 mb-7 border-2 border-foreground bg-surface flex items-center gap-2.5 px-4 h-[52px]">
            <div className="w-5 h-5 border border-foreground flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 bg-foreground" />
            </div>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask Vepartment anything..."
              className="flex-1 text-[13px] font-mono text-foreground bg-transparent outline-none placeholder:text-foreground-dim"
            />
            <Sparkles size={14} className="text-foreground-muted shrink-0" />
          </div>

          {/* Vepartments */}
          <div className="px-4 mb-7">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.08em] uppercase">Vepartments</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[10px] font-mono text-foreground-dim">2 active</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {ACTIVE_DEPTS.map(dept => <DeptCard key={dept.name} dept={dept} />)}
            </div>
            {/* Locked */}
            <div className="flex items-center flex-wrap gap-2.5 mt-2.5 pl-1">
              <span className="text-[10px] font-mono text-foreground-dim">Not activated —</span>
              {LOCKED.map(n => (
                <div key={n} className="flex items-center gap-1 opacity-40">
                  <Lock size={9} className="text-foreground-dim" />
                  <span className="text-[10px] font-mono text-foreground-dim">{n}</span>
                </div>
              ))}
              <button className="flex items-center gap-1 ml-auto">
                <Plus size={10} className="text-foreground-dim" />
                <span className="text-[10px] font-mono text-foreground-dim">Add</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-4 mb-7">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.08em] uppercase">Recent Activity</span>
              <button className="text-[10px] font-mono text-foreground-dim">View all</button>
            </div>
            <div>
              {ACTIVITY.map((item, i) => (
                <div key={i} className={`flex items-start gap-2.5 py-3 px-3.5 bg-surface ${i < ACTIVITY.length - 1 ? "border-b border-border/30" : ""}`}>
                  <FileText size={12} className="text-foreground-dim mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-mono text-foreground mb-0.5 truncate">{item.title}</p>
                    <p className="text-[10px] font-mono text-foreground-dim">{item.dept}</p>
                  </div>
                  <span className="text-[10px] font-mono text-foreground-dim shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="px-4 mb-8">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] font-mono font-medium text-foreground-dim tracking-[0.08em] uppercase">Upcoming</span>
              <Calendar size={12} className="text-foreground-dim" />
            </div>
            <div>
              {UPCOMING.map((item, i) => (
                <div key={i} className={`flex items-start gap-0 py-3 px-3.5 bg-surface ${i < UPCOMING.length - 1 ? "border-b border-border/30" : ""}`}>
                  <div className="w-11 shrink-0">
                    <p className="text-[10px] font-mono text-foreground-dim">{item.day}</p>
                    <p className="text-[10px] font-mono text-foreground-dim">{item.time}</p>
                  </div>
                  <div className="w-px h-7 bg-border mx-1.5 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0 ml-1">
                    <p className="text-[12px] font-mono text-foreground mb-0.5">{item.label}</p>
                    <p className="text-[10px] font-mono text-foreground-dim">{item.dept}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
