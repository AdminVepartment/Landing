"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/mobile",          label: "HOME",     Icon: Home     },
  { href: "/mobile/marketing",label: "MKTG",     Icon: Layers   },
  { href: "/mobile/search",   label: "SEARCH",   Icon: Search   },
  { href: "/mobile/settings", label: "SETTINGS", Icon: Settings },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <div className="h-16 border-t border-border bg-surface flex items-stretch shrink-0">
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href || (href !== "/mobile" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1",
              active ? "text-foreground" : "text-foreground-dim"
            )}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="text-[9px] font-mono font-medium tracking-[0.08em]">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
