"use client";

import { useState } from "react";
import { CoachMark } from "@/components/ui/coach-mark";

export function SocialMessagingChatGuide() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse onDismiss={() => setVisible(false)}>
        Chat with your agents or explore layers above
      </CoachMark>
    </div>
  );
}

export function DomainOfficeGuide() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="absolute -top-12 right-0 z-20">
      <CoachMark arrow="bottom" pulse onDismiss={() => setVisible(false)}>
        Click any agent name to view details
      </CoachMark>
    </div>
  );
}

export function LayerAgentGuide() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="absolute -top-12 left-0 z-20">
      <CoachMark arrow="bottom" pulse onDismiss={() => setVisible(false)}>
        Click an agent to see its purpose, capabilities & I/O
      </CoachMark>
    </div>
  );
}
