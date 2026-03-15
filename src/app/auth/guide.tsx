"use client";

import { CoachMark } from "@/components/ui/coach-mark";

export function AuthLandingGuide() {
  return (
    <div className="absolute -top-14 left-0 right-0 flex justify-center z-20">
      <CoachMark arrow="bottom" pulse step="Start here">
        Sign in or create a new account to begin
      </CoachMark>
    </div>
  );
}
