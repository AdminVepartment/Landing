"use client";

import { useState } from "react";
import { CoachMark } from "@/components/ui/coach-mark";

export function AssetsSearchGuide() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse onDismiss={() => setVisible(false)}>
        Search across all vepartment assets and outputs
      </CoachMark>
    </div>
  );
}
