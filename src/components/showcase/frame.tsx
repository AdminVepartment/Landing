import { Separator } from "@/components/ui/separator";

interface FrameProps {
  group: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Frame({ group, title, description, children }: FrameProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Group header bar */}
      <div className="border-b bg-muted/40 px-10 py-4 flex items-center gap-3">
        <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground uppercase tracking-wider">
          {group}
        </span>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">Design System · shadcn/ui + Tailwind</span>
      </div>

      {/* Page heading */}
      <div className="px-10 pt-10 pb-6">
        <h1 className="text-display-md text-foreground">{title}</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">{description}</p>
      </div>

      {/* Content */}
      <div className="px-10 pb-16 space-y-14">{children}</div>
    </div>
  );
}

interface BlockProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function Block({ label, hint, children }: BlockProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-heading-lg text-foreground">{label}</h2>
        {hint && <p className="text-body-sm text-muted-foreground mt-0.5">{hint}</p>}
        <Separator className="mt-3" />
      </div>
      {children}
    </div>
  );
}
