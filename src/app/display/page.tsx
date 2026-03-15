import { Frame, Block } from "@/components/showcase/frame";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { IconUser, IconCheck, IconStar } from "@/components/icons";

export default function DisplayPage() {
  return (
    <Frame
      group="03 · Display"
      title="Display"
      description="Badges, avatars, progress, skeleton loaders, and separators."
    >
      {/* ── Badge — variants ────────────────────────────────────────────── */}
      <Block label="Badge — Variants">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Block>

      {/* ── Badge — use cases ───────────────────────────────────────────── */}
      <Block label="Badge — Use Cases">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-body-sm">Status:</span>
            <Badge variant="success"><IconCheck className="h-3 w-3" /> Active</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-body-sm">Plan:</span>
            <Badge variant="info"><IconStar className="h-3 w-3" /> Pro</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-body-sm">Version:</span>
            <Badge variant="outline">v2.4.1</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-body-sm">Unread:</span>
            <Badge className="rounded-full px-2">12</Badge>
          </div>
        </div>
      </Block>

      {/* ── Avatar — sizes ──────────────────────────────────────────────── */}
      <Block label="Avatar — Sizes">
        <div className="flex flex-wrap items-end gap-6">
          {[
            { size: "h-6 w-6",  label: "xs · 24px" },
            { size: "h-8 w-8",  label: "sm · 32px" },
            { size: "h-10 w-10",label: "md · 40px (default)" },
            { size: "h-12 w-12",label: "lg · 48px" },
            { size: "h-16 w-16",label: "xl · 64px" },
          ].map((s) => (
            <div key={s.size} className="flex flex-col items-center gap-2">
              <Avatar className={s.size}>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span className="text-label-md text-muted-foreground text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Avatar — fallbacks ──────────────────────────────────────────── */}
      <Block label="Avatar — Fallbacks & States">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="SC" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback><IconUser className="h-4 w-4" /></AvatarFallback></Avatar>
          {/* Avatar group */}
          <div className="flex -space-x-2 ml-4">
            {["SC","AB","JD","KL"].map((init) => (
              <Avatar key={init} className="border-2 border-background">
                <AvatarFallback className="text-xs">{init}</AvatarFallback>
              </Avatar>
            ))}
            <Avatar className="border-2 border-background">
              <AvatarFallback className="text-xs bg-muted text-muted-foreground">+8</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </Block>

      {/* ── Progress ────────────────────────────────────────────────────── */}
      <Block label="Progress" hint="Values: 0% → 100%">
        <div className="max-w-lg space-y-5">
          {[
            { label: "Getting started",  value: 10 },
            { label: "Profile complete", value: 35 },
            { label: "Storage used",     value: 62 },
            { label: "Upload progress",  value: 85 },
            { label: "Task completed",   value: 100 },
          ].map((p) => (
            <div key={p.label} className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-label-lg">{p.label}</span>
                <span className="text-label-lg text-muted-foreground">{p.value}%</span>
              </div>
              <Progress value={p.value} />
            </div>
          ))}
        </div>
      </Block>

      {/* ── Skeleton ────────────────────────────────────────────────────── */}
      <Block label="Skeleton — Loading States">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Card skeleton */}
          <div className="space-y-3">
            <p className="text-label-lg text-muted-foreground">Card</p>
            <div className="rounded-xl border p-5 space-y-4">
              <Skeleton className="h-36 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          </div>

          {/* List skeleton */}
          <div className="space-y-3">
            <p className="text-label-lg text-muted-foreground">List</p>
            <div className="space-y-4">
              {[1,2,3].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text skeleton */}
          <div className="space-y-3">
            <p className="text-label-lg text-muted-foreground">Text block</p>
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>

          {/* Table skeleton */}
          <div className="space-y-3">
            <p className="text-label-lg text-muted-foreground">Table row</p>
            <div className="space-y-2">
              <div className="flex gap-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              {[1,2,3,4].map((n) => (
                <div key={n} className="flex gap-3">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>

      {/* ── Separator ───────────────────────────────────────────────────── */}
      <Block label="Separator">
        <div className="space-y-6 max-w-lg">
          <div className="space-y-2">
            <p className="text-label-lg text-muted-foreground">Horizontal</p>
            <Separator />
          </div>
          <div className="space-y-2">
            <p className="text-label-lg text-muted-foreground">With label</p>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-label-md text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-label-lg text-muted-foreground">Vertical</p>
            <div className="flex h-8 items-center gap-3">
              <span className="text-body-sm">Section A</span>
              <Separator orientation="vertical" />
              <span className="text-body-sm">Section B</span>
              <Separator orientation="vertical" />
              <span className="text-body-sm">Section C</span>
            </div>
          </div>
        </div>
      </Block>
    </Frame>
  );
}
