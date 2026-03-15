"use client";

import { CoachMark } from "@/components/ui/coach-mark";

export function DomainGuide() {
  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse step="Step 6 of 6">
        Describe a workflow or select a domain to focus on
      </CoachMark>
    </div>
  );
}
