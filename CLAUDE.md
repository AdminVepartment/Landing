# CLAUDE.md — Vepartment Design System

This file is loaded automatically by Claude Code and governs how Figma designs
are translated into code for this project.

---

## Brand

**Vepartment** — AI-native operating system for modular virtual departments.

This is an architectural operating layer. The interface must feel **engineered,
not styled**. Every decision communicates: structure, precision, governance,
intelligence, modularity, technical depth, calm authority.

---

## Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Framework   | Next.js 15 (App Router, RSC)  |
| Language    | TypeScript (strict)           |
| Styling     | Tailwind CSS v3               |
| Components  | shadcn/ui + Radix UI          |
| Icons       | lucide-react                  |
| Build       | Next.js / Turbopack           |
| Path alias  | `@/` → `src/`                 |

---

## 0. Vepartment Visual Rules (enforce on every component)

### 0.1 What Vepartment must communicate
structure · precision · governance · intelligence · modularity · technical depth · calm authority

### 0.2 What to avoid — always
| Avoid | Instead |
|---|---|
| Rounded corners (>4px) | Sharp edges — 0px default, 2px micro max |
| Gradients | Flat solid fills |
| Glows / glow effects | Hard borders define structure |
| Glass / blur effects | Opaque surfaces only |
| Neon or vibrant fills | Monochrome surface + cyan signal only |
| Drop shadows for elevation | Borders separate layers |
| Decorative illustration | Geometry only: □ ▷ ○ straight lines |
| Playful or rounded icons | 1.5px stroked icons, butt caps, miter joins |
| Consumer SaaS patterns | OS / terminal / infrastructure patterns |

### 0.3 Geometry language
All visual expression originates from simple primitives:
- Square, Rectangle, Triangle, Circle
- Lines at 0°, 90°, 45° only
- No organic curves. No decorative waves. No soft irregular shapes.
- Components feel modular — assembled in a system, not designed in isolation.

### 0.4 Edge & corner rules
```
Default radius:         0px  (all structural elements, frames, icons)
Interactive elements:   2px  (maximum — micro-radius only)
Absolute maximum:       4px  (requires justification — use rarely)
Pill (status/avatar):   full (9999px — only for indicators and toggles)
```

### 0.5 Stroke language
```
1px    dividers, borders, grid lines
1.5px  icons (default stroke width)
2px    emphasis borders, active state outlines
Caps:  butt (not round)
Joins: miter (not round)
```

### 0.6 Color rules
```
Operating environment:  dark charcoal — #0D0D0F background, #141416 surface
Primary text:           #F0F0F2  (near-white)
Secondary text:         #A1A1AA  (muted gray)
Default border:         #2A2A2E
Accent (green):         #00E676  — functional only, ≤10% of total surface
  Hover: #1FFF8F · Border: #00C853 · Soft bg: #0F3F2A
  Use cyan for: active state, selected item, primary action, link, focus ring
  Never use cyan for: decoration, backgrounds, fills, illustrations
Status:                 success #22C55E / warning #F59E0B / error #EF4444
                        (structural signals only — not decorative)
```

### 0.7 Typography rules
```
UI text:    IBM Plex Sans — 400/500/600/700
Data/code:  IBM Plex Mono — 400/500/600
OS labels:  IBM Plex Sans — uppercase, tracked (0.08em–0.12em), semibold
No italic. No decorative weights. Monospace for all data values.
```

### 0.8 Color usage decision tree
```
Is it a background/surface?    → bg-background / bg-surface / bg-surface-raised
Is it text?                    → text-foreground / text-foreground-muted / text-foreground-dim
Is it a border/divider?        → border-border / border-border-subtle
Is it an active/selected state? → text-primary / border-primary / bg-primary/10
Is it a status signal?         → text-success / text-warning / text-error
Is it a primary action?        → bg-primary text-primary-foreground
Never use raw hex in components. Always use a semantic token.
```

---

## 1. Design Token Definitions

### Location
```
src/tokens/colors.ts      ← color palette + semantic colors
src/tokens/typography.ts  ← font families, sizes, weights, text styles
src/tokens/spacing.ts     ← spacing scale, border radius, shadows
src/app/globals.css       ← CSS custom properties (consumed by Tailwind)
tailwind.config.ts        ← Tailwind extension of the token system
```

### Color tokens → CSS variables → Tailwind utilities

Figma variables map to CSS custom properties in `globals.css`:

```
Figma variable           → CSS var                  → Tailwind utility         → Hex
─────────────────────────────────────────────────────────────────────────────────────
color/background         → --background             → bg-background            #0D0D0F
color/background-deep    → --background-deep        → bg-background-deep       #0A0A0C
color/surface            → --surface                → bg-surface               #141416
color/surface-raised     → --surface-raised         → bg-surface-raised        #1C1C1F
color/foreground         → --foreground             → text-foreground          #F0F0F2
color/foreground-muted   → --foreground-muted       → text-foreground-muted    #A1A1AA
color/foreground-dim     → --foreground-dim         → text-foreground-dim      #71717A
color/border             → --border                 → border-border            #2A2A2E
color/border-subtle      → --border-subtle          → border-border-subtle     #1C1C1F
color/primary (cyan)     → --primary                → bg-primary / text-primary / border-primary  #00C8FF
color/primary-fg         → --primary-foreground     → text-primary-foreground  #0D0D0F
color/destructive        → --destructive            → bg-destructive           #EF4444
color/success            → --success                → text-success             #22C55E
color/warning            → --warning                → text-warning             #F59E0B
color/error              → --error                  → text-error               #EF4444
```

### Token format
CSS custom properties use HSL triplets (no `hsl()` wrapper — Tailwind adds it):
```css
--primary: 193 100% 50%;   /* #00C8FF */
--background: 240 7% 5%;   /* #0D0D0F */
```

Used in Tailwind config as:
```ts
primary: { DEFAULT: "hsl(var(--primary))" }
```

### When mapping Figma colors to code
1. Check `tailwind.config.ts` for an existing semantic token first.
2. If the color matches a palette step (e.g. `blue-500`), use the Tailwind utility directly.
3. Only use raw hex values as a last resort; prefer `colorTokens` from `src/tokens/colors.ts`.

---

## 2. Component Library

### Location
```
src/components/ui/       ← shadcn/ui primitives (one file per component)
src/components/icons/    ← icon barrel exports
src/components/          ← feature / composite components (subdirectories)
```

### Component architecture
Every component follows this pattern:
```tsx
// src/components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "base-classes...",
  {
    variants: {
      variant: { default: "...", outline: "...", ... },
      size:    { sm: "...", default: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
```

### Class merging utility
Always use `cn()` from `@/lib/utils` to merge classNames:
```ts
import { cn } from "@/lib/utils";
cn("base-class", condition && "conditional-class", className)
```

### Available UI components (shadcn/ui)
```
src/components/ui/button.tsx      src/components/ui/badge.tsx
src/components/ui/input.tsx       src/components/ui/card.tsx
src/components/ui/avatar.tsx      src/components/ui/checkbox.tsx
src/components/ui/switch.tsx      src/components/ui/separator.tsx
src/components/ui/progress.tsx    src/components/ui/skeleton.tsx
src/components/ui/alert.tsx       src/components/ui/tabs.tsx
src/components/ui/accordion.tsx   src/components/ui/label.tsx
src/components/ui/table.tsx       src/components/ui/textarea.tsx
```
Add more with: `npx shadcn@latest add <component-name>`

---

## 3. Styling Approach

### Methodology: Tailwind CSS utility classes
- No CSS Modules, no Styled Components, no SCSS files.
- All styling is done via Tailwind utilities in the `className` prop.
- Complex variants are managed with `cva` (class-variance-authority).
- Class conflicts are resolved with `twMerge` (via `cn()`).

### Global styles
Only one global CSS file: `src/app/globals.css`
- Sets CSS custom properties for all design tokens
- Applies base resets via `@layer base`
- Exposes text-style utility classes via `@layer components`

### Typography helpers (use these to match Figma text styles exactly)
```tsx
// OS structural labels — uppercase, tracked, IBM Plex Sans
<span className="text-os-title-lg" />    // 12px / 600 / uppercase / 0.08em
<span className="text-os-title-md" />    // 11px / 600 / uppercase / 0.08em
<span className="text-os-title-sm" />    // 10px / 600 / uppercase / 0.12em

// Module & panel headers — IBM Plex Sans
<h1 className="text-module-lg" />        // 20px / 500
<h2 className="text-module-md" />        // 16px / 500
<h3 className="text-module-sm" />        // 14px / 500

// Body copy — IBM Plex Sans
<p className="text-body-lg" />           // 14px / 400
<p className="text-body-md" />           // 13px / 400
<p className="text-body-sm" />           // 12px / 400

// Data values — IBM Plex Mono (metrics, IDs, counts, config)
<span className="text-data-lg" />        // 14px mono / 400
<span className="text-data-md" />        // 13px mono / 400
<span className="text-data-sm" />        // 12px mono / 400

// System labels — IBM Plex Mono (metadata, timestamps, keys)
<span className="text-label-lg" />       // 12px mono / 400
<span className="text-label-md" />       // 11px mono / 400
<span className="text-label-sm" />       // 10px mono / 400
```

### Responsive design
Mobile-first breakpoints matching Figma frames:
```
sm:  640px  → tablet portrait
md:  768px  → tablet landscape
lg:  1024px → desktop small
xl:  1280px → desktop
2xl: 1536px → wide desktop
```
Usage: `className="px-4 md:px-8 lg:px-12"`

### Dark mode
Vepartment is dark-first. The operating environment is always dark.
`darkMode: ["class"]` in tailwind.config.ts. No light mode variant is planned.
The dark charcoal color system is the canonical identity — not an alternative.

---

## 4. Icon System

### Source
All icons come from `lucide-react`. Do NOT add inline SVGs or other icon libs.

### Import pattern — always from the barrel
```tsx
import { IconPlus, IconCheck, IconX } from "@/components/icons";

// In JSX:
<Button><IconPlus /> Add item</Button>
```

### Naming convention
Icons are re-exported with an `Icon` prefix:
```ts
Plus → IconPlus
Check → IconCheck
AlertCircle → IconAlertCircle
```

### Sizing
Icons inherit size from Tailwind via `[&_svg]:size-4` on parent containers,
or use the `size` prop directly:
```tsx
<IconPlus size={16} />
<IconPlus className="size-5" />
```

### Adding new icons
1. Find the icon at https://lucide.dev
2. Add an alias export to `src/components/icons/index.ts`:
   ```ts
   export { Rocket as IconRocket } from "lucide-react";
   ```

---

## 5. Asset Management

### Local assets
```
public/
  images/        ← static images (jpg, png, webp, avif)
  fonts/         ← self-hosted font files (woff2)
  icons/         ← static SVG icons not in lucide-react
```

### Next.js Image component
Always use `<Image>` from `next/image` — never `<img>` — for automatic
optimization (WebP conversion, lazy loading, responsive srcsets):
```tsx
import Image from "next/image";
<Image src="/images/hero.png" alt="Hero" width={800} height={600} />
```

### Figma-exported assets
When Figma MCP provides asset download URLs:
1. Download the asset to `public/images/` or `public/icons/`
2. Reference with an absolute path from `public/`: `src="/images/filename.png"`
3. For SVG icons, add to `src/components/icons/` as a React component if reused,
   or place in `public/icons/` for `<img>` use.

### Fonts
Web fonts are loaded via `next/font/google` in `src/app/layout.tsx`.
Font CSS variables are set there and consumed via `--font-sans` / `--font-mono`.

---

## 6. Project Structure

```
Design system/
├── CLAUDE.md                    ← this file
├── components.json              ← shadcn/ui CLI config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── public/
│   ├── images/                  ← static images
│   ├── fonts/                   ← self-hosted fonts
│   └── icons/                   ← static SVG icons
│
└── src/
    ├── app/                     ← Next.js App Router
    │   ├── layout.tsx           ← root layout + font setup
    │   ├── globals.css          ← CSS tokens + Tailwind directives
    │   └── page.tsx             ← home page
    │
    ├── components/
    │   ├── ui/                  ← shadcn/ui primitives
    │   │   ├── button.tsx
    │   │   ├── badge.tsx
    │   │   ├── card.tsx
    │   │   └── input.tsx
    │   ├── icons/
    │   │   └── index.ts         ← lucide-react barrel
    │   └── [feature]/           ← composite components (e.g. nav/, forms/)
    │
    ├── tokens/                  ← TypeScript token definitions
    │   ├── colors.ts
    │   ├── typography.ts
    │   └── spacing.ts
    │
    ├── lib/
    │   └── utils.ts             ← cn() helper
    │
    └── hooks/                   ← custom React hooks
```

---

## 7. Figma → Code Workflow (MCP)

### Step-by-step

1. **Get design context**
   Call `get_design_context` with the Figma node URL. Extract `fileKey` and
   `nodeId` from the URL format:
   `figma.com/design/:fileKey/:name?node-id=X-Y` → nodeId = `X:Y`

2. **Map Figma tokens → code tokens**
   | Figma concept       | Code equivalent                        |
   |---------------------|----------------------------------------|
   | Color variable      | `hsl(var(--token))` / Tailwind utility |
   | Text style          | `.text-{style-name}` CSS class         |
   | Auto layout (row)   | `flex flex-row gap-{n}`                |
   | Auto layout (col)   | `flex flex-col gap-{n}`                |
   | Fixed width frame   | `w-{n}` or `max-w-{n}`                |
   | Fill container      | `w-full` / `flex-1`                    |
   | Corner radius       | `rounded-{sm|md|lg|xl|2xl|full}`       |
   | Drop shadow         | `shadow-{xs|sm|md|lg|xl}`              |
   | Stroke / border     | `border border-{token}`                |

3. **Check for existing components first**
   Before generating new JSX, check `src/components/ui/` for a matching
   shadcn/ui component. Prefer composition over duplication.

4. **Use CVA for variants**
   If a Figma component has states (hover, disabled) or variants (size, style),
   model them with `cva()` — not conditional className strings.

5. **Never hardcode colors**
   Map all Figma fill colors to a semantic token (`text-foreground`,
   `bg-primary`, etc.). If no token exists, add one to `globals.css` and
   `tailwind.config.ts`.

6. **File placement**
   - New primitive → `src/components/ui/<name>.tsx`
   - Feature/composite component → `src/components/<feature>/<Name>.tsx`
   - Page section → directly in `src/app/<route>/page.tsx`

### Common Figma → Tailwind mappings (Vepartment)
```
Spacing (4px grid):
  padding 4   → p-1        padding 8  → p-2        padding 12 → p-3
  padding 16  → p-4        padding 20 → p-5        padding 24 → p-6
  gap 4       → gap-1      gap 8      → gap-2      gap 12     → gap-3
  gap 16      → gap-4      gap 24     → gap-6      gap 32     → gap-8

Corner radius (Vepartment — sharp by default):
  0px  → rounded-none (default — use this for structural elements)
  2px  → rounded-md   (micro-radius — interactive elements only)
  4px  → rounded-xl   (absolute max — requires justification)

Typography:
  OS label, uppercase, 12px, 600 → text-os-title-lg
  OS label, uppercase, 11px, 600 → text-os-title-md
  Module title, 16px, 500        → text-module-md
  Body copy, 13px, 400           → text-body-md
  Data/metric value (mono)       → text-data-md
  Timestamp / key (mono)         → text-label-md

Colors:
  #0D0D0F fill   → bg-background
  #141416 fill   → bg-surface
  #1C1C1F fill   → bg-surface-raised
  #F0F0F2 text   → text-foreground
  #A1A1AA text   → text-foreground-muted
  #71717A text   → text-foreground-dim
  #2A2A2E border → border-border
  #00C8FF fill   → bg-primary (accent — only for active/selected/action)
  #00C8FF text   → text-primary
  #00C8FF border → border-primary

Layout:
  auto layout row, gap 12   → flex flex-row gap-3
  auto layout col, gap 24   → flex flex-col gap-6
  align items center        → items-center
  justify space-between     → justify-between
  width fill                → w-full
  height hug                → h-auto (default — omit)
```

---

## 8. Code Quality Rules

- **TypeScript strict mode** — no `any`, no type assertions without justification.
- **RSC by default** — components are Server Components unless they use
  hooks/events, in which case add `"use client"` at the top.
- **`cn()` for all className composition** — never string concatenation.
- **`@/` import alias** — never use relative paths like `../../lib/utils`.
- **`<Image>` not `<img>`** — for all raster images.
- **Icons from `@/components/icons`** — never import lucide directly in feature code.
- **No inline styles** — use Tailwind utilities or CSS variables.
- **No hardcoded hex colors** — always use a token.
- **No rounded corners > 4px** — Vepartment brand rule, enforced always.
- **No gradients, glows, or glass effects** — Vepartment brand rule.
- **Cyan accent only for state signals** — active, selected, primary action, focus.
- **Monospace for all data values** — use `text-data-*` or `font-mono`.
