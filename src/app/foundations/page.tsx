import { Frame, Block } from "@/components/showcase/frame";
import { Separator } from "@/components/ui/separator";

const colorTokens = [
  { name: "background",  tw: "bg-background border",   desc: "Page / surface background" },
  { name: "foreground",  tw: "bg-foreground",           desc: "Primary text" },
  { name: "primary",     tw: "bg-primary",              desc: "Brand / action" },
  { name: "primary-fg",  tw: "bg-primary-foreground border", desc: "Text on primary" },
  { name: "secondary",   tw: "bg-secondary border",     desc: "Subtle action" },
  { name: "muted",       tw: "bg-muted",                desc: "Disabled / inactive" },
  { name: "muted-fg",    tw: "bg-muted-foreground",     desc: "Muted text" },
  { name: "accent",      tw: "bg-accent border",        desc: "Highlight / hover" },
  { name: "destructive", tw: "bg-destructive",          desc: "Error / danger" },
  { name: "border",      tw: "bg-border",               desc: "Dividers / strokes" },
  { name: "input",       tw: "bg-input",                desc: "Form borders" },
  { name: "ring",        tw: "bg-ring",                 desc: "Focus ring" },
];

const departments = [
  { name: "Marketing",      accent: "#4F46E5", light: "#EEF2FF", dark: "#1E1B4B", label: "Indigo" },
  { name: "Branding",       accent: "#EA580C", light: "#FFF7ED", dark: "#431407", label: "Orange" },
  { name: "Product",        accent: "#0284C7", light: "#E0F2FE", dark: "#0C2D4A", label: "Sky" },
  { name: "Sales",          accent: "#059669", light: "#ECFDF5", dark: "#022C22", label: "Emerald" },
  { name: "Sustainability", accent: "#0D9488", light: "#F0FDFA", dark: "#042F2E", label: "Teal" },
  { name: "Scouting",       accent: "#E11D48", light: "#FFF1F2", dark: "#4C0519", label: "Rose" },
  { name: "Operations",     accent: "#52525B", light: "#F4F4F5", dark: "#18181B", label: "Zinc" },
  { name: "Finance",        accent: "#B45309", light: "#FFFBEB", dark: "#451A03", label: "Amber" },
  { name: "HR / Talent",    accent: "#A21CAF", light: "#FDF4FF", dark: "#3B0764", label: "Fuchsia" },
];

const palette = [
  { label: "Neutral",     shades: ["#09090b","#18181b","#27272a","#3f3f46","#52525b","#71717a","#a1a1aa","#d4d4d8","#e4e4e7","#f4f4f5","#fafafa"] },
  { label: "Primary",     shades: ["#172554","#1e3a8a","#1e40af","#1d4ed8","#2563eb","#3b82f6","#60a5fa","#93c5fd","#bfdbfe","#dbeafe","#eff6ff"] },
  { label: "Success",     shades: ["#14532d","#15803d","#16a34a","#22c55e","#4ade80","#86efac","#bbf7d0","#dcfce7"] },
  { label: "Warning",     shades: ["#713f12","#92400e","#a16207","#ca8a04","#eab308","#facc15","#fde047","#fef08a","#fef9c3"] },
  { label: "Destructive", shades: ["#450a0a","#7f1d1d","#991b1b","#b91c1c","#dc2626","#ef4444","#f87171","#fca5a5","#fee2e2"] },
];

const textStyles = [
  { name: "display-md",  cls: "text-display-md",  spec: "36px / 600 / −0.025em" },
  { name: "display-sm",  cls: "text-display-sm",  spec: "30px / 600 / −0.025em" },
  { name: "heading-xl",  cls: "text-heading-xl",  spec: "24px / 600 / 0" },
  { name: "heading-lg",  cls: "text-heading-lg",  spec: "20px / 600 / 0" },
  { name: "heading-md",  cls: "text-heading-md",  spec: "18px / 600 / 0" },
  { name: "heading-sm",  cls: "text-heading-sm",  spec: "16px / 600 / 0" },
  { name: "body-lg",     cls: "text-body-lg",     spec: "18px / 400 / 0" },
  { name: "body-md",     cls: "text-body-md",     spec: "16px / 400 / 0" },
  { name: "body-sm",     cls: "text-body-sm",     spec: "14px / 400 / 0" },
  { name: "body-xs",     cls: "text-body-xs",     spec: "12px / 400 / 0" },
  { name: "label-lg",    cls: "text-label-lg",    spec: "14px / 500 / 0" },
  { name: "label-md",    cls: "text-label-md",    spec: "12px / 500 / 0" },
];

const spacingScale = [1,2,3,4,5,6,8,10,12,16,20,24,32,40,48];

export default function FoundationsPage() {
  return (
    <Frame
      group="01 · Foundations"
      title="Foundations"
      description="Color tokens, typography scale, and spacing system."
    >
      {/* ── Semantic color tokens ───────────────────────────────────────── */}
      <Block label="Semantic Color Tokens" hint="CSS custom properties consumed by all components">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {colorTokens.map((t) => (
            <div key={t.name} className="flex items-center gap-3">
              <div className={`h-10 w-10 shrink-0 rounded-lg shadow-sm ${t.tw}`} />
              <div>
                <p className="text-label-lg font-mono">{t.name}</p>
                <p className="text-label-md text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Palette ─────────────────────────────────────────────────────── */}
      <Block label="Color Palette">
        <div className="space-y-4">
          {palette.map((row) => (
            <div key={row.label} className="space-y-1.5">
              <p className="text-label-lg text-muted-foreground">{row.label}</p>
              <div className="flex gap-1 flex-wrap">
                {row.shades.map((hex) => (
                  <div key={hex} className="group relative">
                    <div className="h-10 w-10 rounded-md shadow-sm" style={{ backgroundColor: hex }} />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-2xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100">
                      {hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Department colors ───────────────────────────────────────────── */}
      <Block label="Department Colors" hint="Spectrum palette — icons, labels, charts, tags (≤10% surface area)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <div key={dept.name} className="flex items-center gap-3">
              {/* Three tones: light / main / dark */}
              <div className="flex shrink-0 overflow-hidden rounded-sm">
                <div className="h-10 w-8" style={{ backgroundColor: dept.light }} title="light" />
                <div className="h-10 w-8" style={{ backgroundColor: dept.accent }} title="main" />
                <div className="h-10 w-8" style={{ backgroundColor: dept.dark }} title="dark" />
              </div>
              <div>
                <p className="text-label-lg font-mono text-foreground">{dept.name}</p>
                <p className="text-label-md font-mono text-muted-foreground">{dept.label} · {dept.accent}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Typography ──────────────────────────────────────────────────── */}
      <Block label="Typography Scale" hint="Inter · System UI fallback">
        <div className="space-y-1 divide-y divide-border">
          {textStyles.map((s) => (
            <div key={s.name} className="flex items-baseline justify-between gap-6 py-3">
              <p className={`${s.cls} text-foreground leading-none`}>
                The quick brown fox
              </p>
              <div className="shrink-0 text-right">
                <p className="text-label-lg font-mono text-muted-foreground">{s.name}</p>
                <p className="text-label-md text-muted-foreground">{s.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Spacing ─────────────────────────────────────────────────────── */}
      <Block label="Spacing Scale" hint="4px base unit · values shown in px">
        <div className="space-y-2">
          {spacingScale.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <span className="w-8 text-right font-mono text-label-md text-muted-foreground">{n}</span>
              <div className="h-4 rounded-sm bg-primary/70" style={{ width: `${n * 4}px` }} />
              <span className="font-mono text-label-md text-muted-foreground">{n * 4}px</span>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Border radius ───────────────────────────────────────────────── */}
      <Block label="Border Radius">
        <div className="flex flex-wrap gap-6">
          {[
            { label: "none",  cls: "rounded-none" },
            { label: "sm",    cls: "rounded-sm" },
            { label: "md",    cls: "rounded-md" },
            { label: "lg",    cls: "rounded-lg" },
            { label: "xl",    cls: "rounded-xl" },
            { label: "2xl",   cls: "rounded-2xl" },
            { label: "full",  cls: "rounded-full" },
          ].map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div className={`h-14 w-14 border-2 border-primary/60 bg-primary/10 ${r.cls}`} />
              <span className="text-label-md font-mono text-muted-foreground">{r.label}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Shadows ─────────────────────────────────────────────────────── */}
      <Block label="Shadows">
        <div className="flex flex-wrap gap-6">
          {["shadow-sm","shadow-md","shadow-lg","shadow-xl","shadow-2xl"].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`h-14 w-14 rounded-xl bg-background ${s}`} />
              <span className="text-label-md font-mono text-muted-foreground">{s.replace("shadow-","")}</span>
            </div>
          ))}
        </div>
      </Block>
    </Frame>
  );
}
