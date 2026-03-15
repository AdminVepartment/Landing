"use client";

import { useState } from "react";
import { CoachMark } from "@/components/ui/coach-mark";

export function MarketingDomainGuide() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="absolute -top-12 left-0 z-20">
      <CoachMark arrow="bottom" pulse onDismiss={() => setVisible(false)}>
        Open Social & Messaging to manage agents and workflows
      </CoachMark>
    </div>
  );
}
