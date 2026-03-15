"use client";

import { CoachMark } from "@/components/ui/coach-mark";

export function WorkspaceGuide() {
  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse step="Step 4 of 6">
        Name your workspace and select your industry
      </CoachMark>
    </div>
  );
}
