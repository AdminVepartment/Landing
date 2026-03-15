"use client";

import { CoachMark } from "@/components/ui/coach-mark";

export function SignUpGuide() {
  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse step="Step 1">
        Fill in your details to create an account
      </CoachMark>
    </div>
  );
}
