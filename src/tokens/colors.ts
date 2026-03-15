/**
 * Design Tokens — Colors
 * Vepartment brand palette.
 *
 * Philosophy:
 *   - Dark mode: monochrome-dominant, green accent for AI/execution signals
 *   - Light mode: neutral-first (90-95% neutral), no green
 *   - Department colors: accent only — icons, labels, charts, tags (≤10% surface)
 *   - No gradients. No glows. No glass. Color ≤ 10% of surface area.
 *
 * Usage:
 *   Components → Tailwind utilities (bg-surface, text-foreground, etc.)
 *   Custom CSS → CSS variables (var(--surface))
 *   Raw values → colorTokens.neutral[600] (last resort only)
 */

export const colorTokens = {
  // ── Charcoal neutral scale (dark-first) ───────────────────────────────
  neutral: {
    0:   "#FFFFFF",
    50:  "#F0F0F2",   // primary text (dark)
    100: "#D4D4D8",   // secondary text
    200: "#A1A1AA",   // muted text
    300: "#71717A",   // disabled / placeholder
    400: "#52525A",   // subtle
    500: "#3A3A3F",   // subtle border
    600: "#2A2A2E",   // border (default)
    700: "#1C1C1F",   // surface-raised
    800: "#141416",   // surface
    900: "#0D0D0F",   // background
    950: "#0A0A0C",   // background-deep
  },

  // ── Light neutral scale ───────────────────────────────────────────────
  light: {
    background:      "#F5F5F5",   // primary canvas
    "background-deep": "#EBEBEB", // deepest layer
    surface:         "#FFFFFF",   // panels, cards
    "surface-raised": "#F0F0F0",  // elevated panels
    foreground:      "#1A1A1A",   // primary text
    "foreground-muted": "#6B6B6B",// secondary text
    "foreground-dim": "#A3A3A3",  // disabled / placeholder
    border:          "#D9D9D9",   // default border
    "border-subtle": "#E8E8E8",   // low-contrast divider
  },

  // ── Electric green accent (dark mode only — functional, ≤10% surface) ─
  green: {
    hover:   "#1FFF8F",   // hover state
    DEFAULT: "#00E676",   // primary accent
    border:  "#00C853",   // emphasis borders
    soft:    "#0F3F2A",   // subtle highlight backgrounds
    dim:     "#00E67680", // low-priority indicators (50% opacity)
  },

  // ── Department accent colors (theme-independent) ──────────────────────
  // Light = tinted background chip/badge
  // Main  = icon, label, chart, tag color
  // Dark  = deep-mode tinted surface / text-on-dark use
  departments: {
    marketing: {
      light: "#EEF2FF",
      main:  "#4F46E5",
      dark:  "#1E1B4B",
    },
    branding: {
      light: "#FFF7ED",
      main:  "#EA580C",
      dark:  "#431407",
    },
    product: {
      light: "#E0F2FE",
      main:  "#0284C7",
      dark:  "#0C2D4A",
    },
    sales: {
      light: "#ECFDF5",
      main:  "#059669",
      dark:  "#022C22",
    },
    sustainability: {
      light: "#F0FDFA",
      main:  "#0D9488",
      dark:  "#042F2E",
    },
    scouting: {
      light: "#FFF1F2",
      main:  "#E11D48",
      dark:  "#4C0519",
    },
    operations: {
      light: "#F4F4F5",
      main:  "#52525B",
      dark:  "#18181B",
    },
    finance: {
      light: "#FFFBEB",
      main:  "#B45309",
      dark:  "#451A03",
    },
    hr: {
      light: "#FDF4FF",
      main:  "#A21CAF",
      dark:  "#3B0764",
    },
  },

  // ── Status signals (system use only — not decorative) ─────────────────
  success: {
    DEFAULT: "#22C55E",
    muted:   "#14532D",
    text:    "#4ADE80",
  },
  warning: {
    DEFAULT: "#F59E0B",
    muted:   "#78350F",
    text:    "#FCD34D",
  },
  error: {
    DEFAULT: "#EF4444",
    muted:   "#7F1D1D",
    text:    "#F87171",
  },
} as const;

export type ColorScale = typeof colorTokens;
