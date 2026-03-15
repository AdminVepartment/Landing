"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActivity } from "@/lib/activity-store";
import { cn } from "@/lib/utils";

interface ActivityLinkProps {
  href: string;
  /** Activity to log when clicked */
  activity?: {
    icon: string;
    title: string;
    dept: string;
    context: string;
  };
  className?: string;
  children: React.ReactNode;
}

export function ActivityLink({ href, activity, className, children }: ActivityLinkProps) {
  const router = useRouter();
  const { log } = useActivity();

  function handleClick(e: React.MouseEvent) {
    if (activity) {
      e.preventDefault();
      log(activity);
      router.push(href);
    }
  }

  if (!activity) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
