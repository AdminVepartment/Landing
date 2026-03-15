"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface ActivityEntry {
  id: string;
  icon: string;
  title: string;
  dept: string;
  context: string;
  time: string;
  timestamp: number;
}

interface ActivityStore {
  entries: ActivityEntry[];
  log: (entry: Omit<ActivityEntry, "id" | "time" | "timestamp">) => void;
  clear: () => void;
}

const ActivityContext = createContext<ActivityStore>({
  entries: [],
  log: () => {},
  clear: () => {},
});

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return "Just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Seed activities that simulate the onboarding flow
const SEED_ENTRIES: ActivityEntry[] = [
  {
    id: "seed-1",
    icon: "account",
    title: "Account created",
    dept: "System",
    context: "User registration completed",
    time: "Just now",
    timestamp: Date.now() - 120000,
  },
  {
    id: "seed-2",
    icon: "workspace",
    title: "Workspace created",
    dept: "System",
    context: "Acme Workspace initialized",
    time: "Just now",
    timestamp: Date.now() - 90000,
  },
  {
    id: "seed-3",
    icon: "department",
    title: "Marketing department activated",
    dept: "Marketing",
    context: "First vepartment created",
    time: "Just now",
    timestamp: Date.now() - 60000,
  },
  {
    id: "seed-4",
    icon: "domain",
    title: "Social & Messaging domain added",
    dept: "Marketing",
    context: "Domain activated with 6 agents",
    time: "Just now",
    timestamp: Date.now() - 30000,
  },
  {
    id: "seed-5",
    icon: "agent",
    title: "6 agents deployed",
    dept: "Marketing · Social & Messaging",
    context: "Foundation, Strategy, Execution, Monitoring, Growth, Innovation",
    time: "Just now",
    timestamp: Date.now() - 15000,
  },
];

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ActivityEntry[]>(SEED_ENTRIES);

  const log = useCallback((entry: Omit<ActivityEntry, "id" | "time" | "timestamp">) => {
    const now = Date.now();
    setEntries((prev) => [
      {
        ...entry,
        id: `act-${now}-${Math.random().toString(36).slice(2, 6)}`,
        time: "Just now",
        timestamp: now,
      },
      ...prev,
    ]);
  }, []);

  const clear = useCallback(() => setEntries([]), []);

  // Refresh relative times
  const entriesWithTime = entries.map((e) => ({
    ...e,
    time: formatTimeAgo(e.timestamp),
  }));

  return (
    <ActivityContext.Provider value={{ entries: entriesWithTime, log, clear }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  return useContext(ActivityContext);
}
