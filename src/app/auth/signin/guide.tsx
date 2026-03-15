"use client";

import { CoachMark } from "@/components/ui/coach-mark";

export function SignInGuide() {
  return (
    <div className="absolute -top-14 left-0 z-20">
      <CoachMark arrow="bottom" pulse step="Step 1">
        Enter your email and password to sign in
      </CoachMark>
    </div>
  );
}
