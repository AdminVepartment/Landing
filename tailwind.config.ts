import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ─── Breakpoints (match Figma frame sizes) ────────────────────────────
    screens: {
      sm:  "640px",
      md:  "768px",
      lg:  "1024px",
      xl:  "1280px",
      "2xl": "1536px",
    },
    extend: {
      // ─── Color tokens ────────────────────────────────────────────────────
      // Semantic tokens map to CSS custom properties in globals.css.
      // Always prefer these over raw hex or palette values.
      colors: {
        // Core structure
        background:  "hsl(var(--background))",
        "background-deep": "hsl(var(--background-deep))",
        surface:     "hsl(var(--surface))",
        "surface-raised": "hsl(var(--surface-raised))",

        // Text
        foreground:  "hsl(var(--foreground))",
        "foreground-muted": "hsl(var(--foreground-muted))",
        "foreground-dim":   "hsl(var(--foreground-dim))",

        // Borders
        border:      "hsl(var(--border))",
        "border-subtle": "hsl(var(--border-subtle))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",

        // Accent — electric green #00E676 — functional use only, ≤10% surface
        // Use for: active state, selected, primary action, focus ring, HAS indicator
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover:      "#1FFF8F",   // hover state
          border:     "#00C853",   // emphasis border
          soft:       "#0F3F2A",   // subtle background highlight
        },

        // shadcn/ui structural tokens
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Status signals
        success: {
          DEFAULT:    "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT:    "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT:    "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },

        // Department accent colors — icons, labels, charts, tags only (≤10% surface)
        // Usage: text-dept-marketing, bg-dept-marketing/light, border-dept-marketing/dark
        "dept-marketing": {
          DEFAULT: "hsl(var(--dept-marketing-main))",
          light:   "hsl(var(--dept-marketing-light))",
          dark:    "hsl(var(--dept-marketing-dark))",
        },
        "dept-branding": {
          DEFAULT: "hsl(var(--dept-branding-main))",
          light:   "hsl(var(--dept-branding-light))",
          dark:    "hsl(var(--dept-branding-dark))",
        },
        "dept-product": {
          DEFAULT: "hsl(var(--dept-product-main))",
          light:   "hsl(var(--dept-product-light))",
          dark:    "hsl(var(--dept-product-dark))",
        },
        "dept-sales": {
          DEFAULT: "hsl(var(--dept-sales-main))",
          light:   "hsl(var(--dept-sales-light))",
          dark:    "hsl(var(--dept-sales-dark))",
        },
        "dept-sustainability": {
          DEFAULT: "hsl(var(--dept-sustainability-main))",
          light:   "hsl(var(--dept-sustainability-light))",
          dark:    "hsl(var(--dept-sustainability-dark))",
        },
        "dept-scouting": {
          DEFAULT: "hsl(var(--dept-scouting-main))",
          light:   "hsl(var(--dept-scouting-light))",
          dark:    "hsl(var(--dept-scouting-dark))",
        },
        "dept-operations": {
          DEFAULT: "hsl(var(--dept-operations-main))",
          light:   "hsl(var(--dept-operations-light))",
          dark:    "hsl(var(--dept-operations-dark))",
        },
        "dept-finance": {
          DEFAULT: "hsl(var(--dept-finance-main))",
          light:   "hsl(var(--dept-finance-light))",
          dark:    "hsl(var(--dept-finance-dark))",
        },
        "dept-hr": {
          DEFAULT: "hsl(var(--dept-hr-main))",
          light:   "hsl(var(--dept-hr-light))",
          dark:    "hsl(var(--dept-hr-dark))",
        },
      },

      // ─── Border radius — Vepartment edge language ─────────────────────
      // Sharp edges are the default. Rounding communicates exception, not norm.
      // Never exceed 4px. Never use rounded-xl/2xl/3xl for structural elements.
      borderRadius: {
        none:  "0px",      // structural default — frames, icons, dividers
        sm:    "1px",      // barely perceptible
        DEFAULT: "0px",
        md:    "2px",      // micro-radius — interactive elements max
        lg:    "2px",      // same as md (--radius resolves to this)
        xl:    "4px",      // absolute maximum — use sparingly
        "2xl": "4px",
        "3xl": "4px",
        full:  "9999px",   // pill — status dots, toggles, avatar only
      },

      // ─── Typography ───────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1.2" }],    // 10px
        "xs":  ["0.6875rem", { lineHeight: "1.2" }],    // 11px — override Tailwind default
      },

      // ─── Spacing extensions ───────────────────────────────────────────
      spacing: {
        "4.5": "1.125rem",   // 18px
        "13":  "3.25rem",    // 52px
        "15":  "3.75rem",    // 60px
        "18":  "4.5rem",     // 72px
      },

      // ─── Animation tokens ────────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-4px)", opacity: "0" },
          to:   { transform: "translateY(0)",    opacity: "1" },
        },
      },
      animation: {
        "accordion-down":    "accordion-down 0.2s ease-out",
        "accordion-up":      "accordion-up 0.2s ease-out",
        "fade-in":           "fade-in 0.1s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.1s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
