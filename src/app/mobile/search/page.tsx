"use client";
import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { StatusBar } from "../_components/status-bar";
import { LeftDrawer } from "../_components/LeftDrawer";

export default function SearchPage() {
  const [query, setQuery] = useState("");
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
        <span className="text-[13px] font-mono font-medium text-foreground">Search</span>
      </div>

      {/* Search box */}
      <div className="px-4 py-4 border-b border-border bg-surface shrink-0">
        <div className="flex items-center gap-2.5 h-10 border border-border bg-background px-3">
          <Search size={13} className="text-foreground-dim shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search agents, domains, files…"
            className="flex-1 text-[12px] font-mono text-foreground bg-transparent outline-none placeholder:text-foreground-dim"
          />
        </div>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
        <span className="text-[11px] font-mono font-medium text-foreground-dim tracking-[0.1em] uppercase">Search</span>
        <p className="text-[12px] font-mono text-foreground-dim text-center leading-[18px]">
          Search across all vepartments, domains, agents, and assets.
        </p>
      </div>
    </div>
  );
}
