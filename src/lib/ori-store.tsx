"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  BackendState,
  BackendVepartment,
  BackendDomainSupervisor,
  BackendAgent,
  BackendTask,
  BackendLogEntry,
  BackendMetrics,
  ChatMessage,
  ChatResponse,
  CommandResponse,
  OriExpression,
} from "./ori/types";
import {
  expressionForPhase,
  resolveExpression,
  getDecayDelay,
} from "./ori/expression-engine";
import type { ExpressionPhase } from "./ori/expression-engine";

// ── Context shape ───────────────────────────────────────────────────────────

interface OriContextValue {
  // Ori state
  expression: OriExpression;
  status: "online" | "busy" | "idle" | "offline" | "error";
  isProcessing: boolean;

  // 4-tier system state (from CrewAI backend)
  vepartments: BackendVepartment[];
  domainSupervisors: BackendDomainSupervisor[];
  agents: BackendAgent[];
  tasks: BackendTask[];
  logs: BackendLogEntry[];
  metrics: BackendMetrics;

  // Chat
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  executeCommand: (
    cmd: string,
    params?: Record<string, string>,
  ) => Promise<void>;
  refreshState: () => Promise<void>;

  // Session
  sessionId: string;
}

const DEFAULT_METRICS: BackendMetrics = {
  vepartments: 0,
  vepartmentSupervisors: 0,
  domainSupervisors: 0,
  agents: 0,
  agentsBusy: 0,
  tasksToday: 0,
  tasksRunning: 0,
  tasksQueued: 0,
};

const OriContext = createContext<OriContextValue | null>(null);

// ── Provider ────────────────────────────────────────────────────────────────

export function OriProvider({ children }: { children: React.ReactNode }) {
  // Expression & status
  const [expression, setExpression] = useState<OriExpression>("default");
  const [isProcessing, setIsProcessing] = useState(false);
  const decayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 4-tier system state
  const [vepartments, setVepartments] = useState<BackendVepartment[]>([]);
  const [domainSupervisors, setDomainSupervisors] = useState<BackendDomainSupervisor[]>([]);
  const [agents, setAgents] = useState<BackendAgent[]>([]);
  const [tasks, setTasks] = useState<BackendTask[]>([]);
  const [logs, setLogs] = useState<BackendLogEntry[]>([]);
  const [metrics, setMetrics] = useState<BackendMetrics>(DEFAULT_METRICS);

  // Chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId] = useState(
    () => `ori_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  );

  // ── Expression management ───────────────────────────────────────────

  const setPhase = useCallback((phase: ExpressionPhase) => {
    const expr = expressionForPhase(phase);
    setExpression(expr);

    if (decayTimer.current) clearTimeout(decayTimer.current);
    const delay = getDecayDelay(expr);
    if (delay > 0) {
      decayTimer.current = setTimeout(() => setExpression("calm"), delay);
    }
  }, []);

  // ── Fetch system state ──────────────────────────────────────────────

  const refreshState = useCallback(async () => {
    try {
      const res = await fetch("/api/ori/state");
      if (!res.ok) return;
      const data: BackendState = await res.json();
      setVepartments(data.vepartments);
      setDomainSupervisors(data.domainSupervisors);
      setAgents(data.agents);
      setTasks(data.tasks);
      setLogs(data.logs);
      setMetrics(data.metrics);
    } catch {
      // Backend not running — keep current state
    }
  }, []);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  // ── Send chat message ───────────────────────────────────────────────

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isProcessing) return;

      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsProcessing(true);
      setPhase("sending");

      try {
        setTimeout(() => setPhase("processing"), 500);

        const res = await fetch("/api/ori/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, sessionId }),
        });
        const data: ChatResponse = await res.json();

        const finalExpr = resolveExpression(data.expression, "success");
        setExpression(finalExpr);

        const delay = getDecayDelay(finalExpr);
        if (delay > 0) {
          if (decayTimer.current) clearTimeout(decayTimer.current);
          decayTimer.current = setTimeout(
            () => setExpression("calm"),
            delay,
          );
        }

        const assistantMsg: ChatMessage = {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: data.output,
          timestamp: new Date(),
          expression: finalExpr,
        };
        setMessages((prev) => [...prev, assistantMsg]);

        await refreshState();
      } catch {
        setPhase("error");
        setMessages((prev) => [
          ...prev,
          {
            id: `e_${Date.now()}`,
            role: "assistant",
            content:
              "I couldn't reach the backend. Make sure the CrewAI server is running on localhost:8000.",
            timestamp: new Date(),
            expression: "curious",
          },
        ]);
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, sessionId, setPhase, refreshState],
  );

  // ── Execute command ─────────────────────────────────────────────────

  const executeCommand = useCallback(
    async (cmd: string, params?: Record<string, string>) => {
      if (isProcessing) return;

      setIsProcessing(true);
      setPhase("executing");

      try {
        const res = await fetch("/api/ori/command", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: cmd, params }),
        });
        const data: CommandResponse = await res.json();

        const finalExpr = resolveExpression(
          data.expression,
          data.success ? "success" : "error",
        );
        setExpression(finalExpr);

        const delay = getDecayDelay(finalExpr);
        if (delay > 0) {
          if (decayTimer.current) clearTimeout(decayTimer.current);
          decayTimer.current = setTimeout(
            () => setExpression("calm"),
            delay,
          );
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `cmd_${Date.now()}`,
            role: "assistant",
            content: data.output,
            timestamp: new Date(),
            expression: finalExpr,
          },
        ]);

        await refreshState();
      } catch {
        setPhase("error");
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, setPhase, refreshState],
  );

  const status = isProcessing ? "busy" : "online";

  return (
    <OriContext.Provider
      value={{
        expression,
        status,
        isProcessing,
        vepartments,
        domainSupervisors,
        agents,
        tasks,
        logs,
        metrics,
        messages,
        sendMessage,
        executeCommand,
        refreshState,
        sessionId,
      }}
    >
      {children}
    </OriContext.Provider>
  );
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useOri(): OriContextValue {
  const ctx = useContext(OriContext);
  if (!ctx) {
    throw new Error("useOri must be used within an OriProvider");
  }
  return ctx;
}
