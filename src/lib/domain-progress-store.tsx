"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  LAYER_ORDER,
  type LayerSlug,
  type LayerRequirement,
  getRequirementsForDomain,
} from "./domain-requirements";

// ── Types ───────────────────────────────────────────────────────────────────

export type LayerStatus = "locked" | "active" | "completed";

export interface TrackedRequirement extends LayerRequirement {
  fulfilled: boolean;
}

export interface LayerProgress {
  status: LayerStatus;
  requirements: TrackedRequirement[];
  completedAt?: number;
}

export interface DomainProgress {
  domainKey: string; // "marketing:social-messaging"
  layers: Record<LayerSlug, LayerProgress>;
  currentLayerIndex: number;
}

interface DomainProgressStore {
  progress: Record<string, DomainProgress>;
  getProgress: (domainKey: string) => DomainProgress | undefined;
  getLayerStatus: (domainKey: string, layerSlug: LayerSlug) => LayerStatus;
  getLayerRequirements: (domainKey: string, layerSlug: LayerSlug) => TrackedRequirement[];
  fulfillRequirement: (domainKey: string, layerSlug: LayerSlug, requirementKey: string) => void;
  unfulfillRequirement: (domainKey: string, layerSlug: LayerSlug, requirementKey: string) => void;
  completeLayer: (domainKey: string, layerSlug: LayerSlug) => boolean;
  initDomain: (vepartment: string, domainSlug: string) => void;
  getCompletionPercent: (domainKey: string, layerSlug: LayerSlug) => number;
  getDomainCompletionPercent: (domainKey: string) => number;
  getCurrentLayerSlug: (domainKey: string) => LayerSlug | null;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function buildDomainKey(vepartment: string, domainSlug: string): string {
  return `${vepartment}:${domainSlug}`;
}

function createDomainProgress(domainKey: string, domainSlug: string): DomainProgress {
  const config = getRequirementsForDomain(domainSlug);
  const layers = {} as Record<LayerSlug, LayerProgress>;

  LAYER_ORDER.forEach((slug, i) => {
    layers[slug] = {
      status: i === 0 ? "active" : "locked",
      requirements: (config[slug] ?? []).map((r) => ({ ...r, fulfilled: false })),
    };
  });

  return { domainKey, layers, currentLayerIndex: 0 };
}

// ── Seed data — Marketing > Social & Messaging starts at Foundation ────────

function createSeedProgress(): Record<string, DomainProgress> {
  const key = "marketing:social-messaging";
  return { [key]: createDomainProgress(key, "social-messaging") };
}

// ── Context ─────────────────────────────────────────────────────────────────

const DomainProgressContext = createContext<DomainProgressStore>({
  progress: {},
  getProgress: () => undefined,
  getLayerStatus: () => "locked",
  getLayerRequirements: () => [],
  fulfillRequirement: () => {},
  unfulfillRequirement: () => {},
  completeLayer: () => false,
  initDomain: () => {},
  getCompletionPercent: () => 0,
  getDomainCompletionPercent: () => 0,
  getCurrentLayerSlug: () => null,
});

export function DomainProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, DomainProgress>>(createSeedProgress);

  const getProgress = useCallback(
    (domainKey: string) => progress[domainKey],
    [progress]
  );

  const getLayerStatus = useCallback(
    (domainKey: string, layerSlug: LayerSlug): LayerStatus => {
      return progress[domainKey]?.layers[layerSlug]?.status ?? "locked";
    },
    [progress]
  );

  const getLayerRequirements = useCallback(
    (domainKey: string, layerSlug: LayerSlug): TrackedRequirement[] => {
      return progress[domainKey]?.layers[layerSlug]?.requirements ?? [];
    },
    [progress]
  );

  const fulfillRequirement = useCallback(
    (domainKey: string, layerSlug: LayerSlug, requirementKey: string) => {
      setProgress((prev) => {
        const dp = prev[domainKey];
        if (!dp) return prev;
        const layer = dp.layers[layerSlug];
        if (!layer || layer.status !== "active") return prev;

        const updated = {
          ...dp,
          layers: {
            ...dp.layers,
            [layerSlug]: {
              ...layer,
              requirements: layer.requirements.map((r) =>
                r.key === requirementKey ? { ...r, fulfilled: true } : r
              ),
            },
          },
        };
        return { ...prev, [domainKey]: updated };
      });
    },
    []
  );

  const unfulfillRequirement = useCallback(
    (domainKey: string, layerSlug: LayerSlug, requirementKey: string) => {
      setProgress((prev) => {
        const dp = prev[domainKey];
        if (!dp) return prev;
        const layer = dp.layers[layerSlug];
        if (!layer || layer.status !== "active") return prev;

        const updated = {
          ...dp,
          layers: {
            ...dp.layers,
            [layerSlug]: {
              ...layer,
              requirements: layer.requirements.map((r) =>
                r.key === requirementKey ? { ...r, fulfilled: false } : r
              ),
            },
          },
        };
        return { ...prev, [domainKey]: updated };
      });
    },
    []
  );

  const completeLayer = useCallback(
    (domainKey: string, layerSlug: LayerSlug): boolean => {
      let success = false;
      setProgress((prev) => {
        const dp = prev[domainKey];
        if (!dp) return prev;
        const layer = dp.layers[layerSlug];
        if (!layer || layer.status !== "active") return prev;

        // All requirements must be fulfilled
        const allFulfilled = layer.requirements.every((r) => r.fulfilled);
        if (!allFulfilled) return prev;

        const layerIndex = LAYER_ORDER.indexOf(layerSlug);
        const nextSlug = LAYER_ORDER[layerIndex + 1] as LayerSlug | undefined;

        const updatedLayers = { ...dp.layers };
        updatedLayers[layerSlug] = {
          ...layer,
          status: "completed",
          completedAt: Date.now(),
        };

        // Unlock next layer
        if (nextSlug && updatedLayers[nextSlug]) {
          updatedLayers[nextSlug] = {
            ...updatedLayers[nextSlug],
            status: "active",
          };
        }

        success = true;
        return {
          ...prev,
          [domainKey]: {
            ...dp,
            layers: updatedLayers,
            currentLayerIndex: nextSlug ? layerIndex + 1 : layerIndex,
          },
        };
      });
      return success;
    },
    []
  );

  const initDomain = useCallback(
    (vepartment: string, domainSlug: string) => {
      const key = buildDomainKey(vepartment, domainSlug);
      setProgress((prev) => {
        if (prev[key]) return prev; // already exists
        return { ...prev, [key]: createDomainProgress(key, domainSlug) };
      });
    },
    []
  );

  const getCompletionPercent = useCallback(
    (domainKey: string, layerSlug: LayerSlug): number => {
      const reqs = progress[domainKey]?.layers[layerSlug]?.requirements ?? [];
      if (reqs.length === 0) return 0;
      return Math.round((reqs.filter((r) => r.fulfilled).length / reqs.length) * 100);
    },
    [progress]
  );

  const getDomainCompletionPercent = useCallback(
    (domainKey: string): number => {
      const dp = progress[domainKey];
      if (!dp) return 0;
      const completed = LAYER_ORDER.filter(
        (slug) => dp.layers[slug]?.status === "completed"
      ).length;
      return Math.round((completed / LAYER_ORDER.length) * 100);
    },
    [progress]
  );

  const getCurrentLayerSlug = useCallback(
    (domainKey: string): LayerSlug | null => {
      const dp = progress[domainKey];
      if (!dp) return null;
      return LAYER_ORDER[dp.currentLayerIndex] ?? null;
    },
    [progress]
  );

  return (
    <DomainProgressContext.Provider
      value={{
        progress,
        getProgress,
        getLayerStatus,
        getLayerRequirements,
        fulfillRequirement,
        unfulfillRequirement,
        completeLayer,
        initDomain,
        getCompletionPercent,
        getDomainCompletionPercent,
        getCurrentLayerSlug,
      }}
    >
      {children}
    </DomainProgressContext.Provider>
  );
}

export function useDomainProgress() {
  return useContext(DomainProgressContext);
}

export { LAYER_ORDER, buildDomainKey };
