import type { ReactNode } from "react";

/** Wraps all mobile pages in a 390px phone shell, centered on desktop. */
export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background-deep flex items-start justify-center py-0 sm:py-8">
      <div className="relative w-full sm:w-[390px] min-h-screen sm:min-h-[844px] bg-background overflow-hidden sm:rounded-[44px] sm:border sm:border-border sm:shadow-[0_0_0_8px_hsl(var(--background-deep))] flex flex-col">
        {children}
      </div>
    </div>
  );
}
