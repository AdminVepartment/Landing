"use client";

import { cn } from "@/lib/utils";
import { IconCheck, IconLock } from "@/components/icons";
import { useDomainProgress, type TrackedRequirement, type LayerStatus } from "@/lib/domain-progress-store";
import type { LayerSlug } from "@/lib/domain-requirements";
import { useActivity } from "@/lib/activity-store";

interface LayerRequirementChecklistProps {
  domainKey: string;
  layerSlug: LayerSlug;
  layerName: string;
  layerColor: string;
}

export function LayerRequirementChecklist({
  domainKey,
  layerSlug,
  layerName,
  layerColor,
}: LayerRequirementChecklistProps) {
  const {
    getLayerStatus,
    getLayerRequirements,
    fulfillRequirement,
    unfulfillRequirement,
    completeLayer,
    getCompletionPercent,
  } = useDomainProgress();
  const { log } = useActivity();

  const status: LayerStatus = getLayerStatus(domainKey, layerSlug);
  const requirements: TrackedRequirement[] = getLayerRequirements(domainKey, layerSlug);
  const percent = getCompletionPercent(domainKey, layerSlug);
  const allFulfilled = requirements.length > 0 && requirements.every((r) => r.fulfilled);

  if (status === "locked") {
    return (
      <div className="bg-surface border border-border p-6 flex flex-col items-center justify-center gap-3 opacity-50">
        <IconLock size={20} className="text-foreground-dim" />
        <p className="text-body-sm text-foreground-dim text-center">
          Complete the previous layer to unlock <span className="font-medium text-foreground-muted">{layerName}</span>
        </p>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="bg-surface border border-border p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-6 h-6 flex items-center justify-center"
            style={{ backgroundColor: layerColor }}
          >
            <IconCheck size={14} className="text-background" />
          </div>
          <div>
            <p className="text-body-sm font-medium text-foreground">{layerName} — Completed</p>
            <p className="text-label-sm text-foreground-dim">All requirements fulfilled</p>
          </div>
        </div>
        <div className="space-y-2">
          {requirements.map((req) => (
            <div key={req.key} className="flex items-center gap-3 px-3 py-2 bg-background border border-border-subtle">
              <div
                className="w-4 h-4 flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${layerColor}20`, border: `1px solid ${layerColor}40` }}
              >
                <IconCheck size={10} style={{ color: layerColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body-sm text-foreground-muted line-through">{req.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Active layer
  function handleToggle(req: TrackedRequirement) {
    if (req.fulfilled) {
      unfulfillRequirement(domainKey, layerSlug, req.key);
    } else {
      fulfillRequirement(domainKey, layerSlug, req.key);
      log({
        icon: "agent",
        title: `Requirement fulfilled: ${req.label}`,
        dept: domainKey.replace(":", " · "),
        context: `${layerName} layer`,
      });
    }
  }

  function handleComplete() {
    const success = completeLayer(domainKey, layerSlug);
    if (success) {
      log({
        icon: "domain",
        title: `${layerName} layer completed`,
        dept: domainKey.replace(":", " · "),
        context: "Next layer unlocked",
      });
    }
  }

  return (
    <div className="bg-surface border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <p className="text-os-title-sm text-foreground-muted">REQUIREMENTS</p>
          <span className="text-label-sm text-foreground-dim font-mono">
            {requirements.filter((r) => r.fulfilled).length}/{requirements.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-background border border-border-subtle overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${percent}%`, backgroundColor: layerColor }}
            />
          </div>
          <span className="text-label-sm text-foreground-dim font-mono">{percent}%</span>
        </div>
      </div>

      {/* Requirements list */}
      <div className="divide-y divide-border-subtle">
        {requirements.map((req) => (
          <button
            key={req.key}
            type="button"
            onClick={() => handleToggle(req)}
            className="w-full text-left flex items-start gap-3 px-5 py-3.5 hover:bg-surface-raised transition-colors"
          >
            <div
              className={cn(
                "w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 border transition-colors",
                req.fulfilled
                  ? ""
                  : "border-border bg-background"
              )}
              style={
                req.fulfilled
                  ? { backgroundColor: `${layerColor}20`, borderColor: `${layerColor}60` }
                  : undefined
              }
            >
              {req.fulfilled && <IconCheck size={10} style={{ color: layerColor }} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-body-sm transition-colors",
                req.fulfilled ? "text-foreground-muted" : "text-foreground"
              )}>
                {req.label}
              </p>
              <p className="text-label-sm text-foreground-dim mt-0.5">{req.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Complete button */}
      <div className="px-5 py-4 border-t border-border">
        <button
          onClick={handleComplete}
          disabled={!allFulfilled}
          className={cn(
            "flex items-center justify-center gap-2 w-full h-9 text-label-sm font-mono uppercase tracking-wider transition-colors border",
            allFulfilled
              ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
              : "border-border text-foreground-dim cursor-not-allowed opacity-40"
          )}
        >
          <IconCheck size={12} />
          Complete {layerName} Layer
        </button>
      </div>
    </div>
  );
}
