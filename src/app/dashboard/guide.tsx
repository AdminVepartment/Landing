"use client";

import { useState } from "react";
import { CoachMark } from "@/components/ui/coach-mark";

export function DashboardCommandGuide() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
      <CoachMark arrow="bottom" pulse onDismiss={() => setVisible(false)}>
        Ask Vepartment anything or use a quick prompt below
      </CoachMark>
    </div>
  );
}

export function DashboardVepartmentGuide() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse onDismiss={() => setVisible(false)}>
        Open your Marketing vepartment or add a new one
      </CoachMark>
    </div>
  );
}
