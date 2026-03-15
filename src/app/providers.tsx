"use client";

import { ActivityProvider } from "@/lib/activity-store";
import { DomainProgressProvider } from "@/lib/domain-progress-store";
import { OriProvider } from "@/lib/ori-store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ActivityProvider>
      <DomainProgressProvider>
        <OriProvider>{children}</OriProvider>
      </DomainProgressProvider>
    </ActivityProvider>
  );
}
