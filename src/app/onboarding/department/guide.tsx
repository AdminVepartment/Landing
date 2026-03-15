"use client";

import { CoachMark } from "@/components/ui/coach-mark";

export function DepartmentGuide() {
  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse step="Step 5 of 6">
        Describe your needs or pick a department below
      </CoachMark>
    </div>
  );
}
