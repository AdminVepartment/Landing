"use client";

import { useState } from "react";
import { UserGuide } from "@/components/onboarding/UserGuide";
import { IconBookOpen } from "@/components/icons";

export default function UserGuidePage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 h-10 px-5 border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors"
        >
          <IconBookOpen size={14} />
          <span className="text-label-md font-mono">Open User Guide</span>
        </button>
      )}
      <UserGuide open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
