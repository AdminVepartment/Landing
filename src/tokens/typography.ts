/**
 * Design Tokens — Typography
 * Vepartment type system.
 *
 * IBM Plex Sans  → all UI text (headers, body, labels)
 * IBM Plex Mono  → data values, code, system labels, metadata
 *
 * Scale is optimized for dense information interfaces, not marketing.
 * Line heights are tight. Letter spacing is controlled.
 * Uppercase OS labels carry tracking — everything else does not.
 */

export const typographyTokens = {
  fontFamily: {
    sans: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
    mono: "IBM Plex Mono, ui-monospace, monospace",
  },

  fontSize: {
    "2xs": "0.625rem",    // 10px
    xs:    "0.6875rem",   // 11px
    sm:    "0.75rem",     // 12px
    base:  "0.8125rem",   // 13px
    md:    "0.875rem",    // 14px
    lg:    "1rem",        // 16px
    xl:    "1.125rem",    // 18px
    "2xl": "1.25rem",     // 20px
    "3xl": "1.5rem",      // 24px
  },

  fontWeight: {
    regular:  "400",
    medium:   "500",
    semibold: "600",
    bold:     "700",
  },

  lineHeight: {
    none:    "1",
    tight:   "1.2",
    snug:    "1.35",
    normal:  "1.5",
    relaxed: "1.6",
  },

  letterSpacing: {
    tighter: "-0.03em",
    tight:   "-0.01em",
    normal:  "0em",
    wide:    "0.04em",
    wider:   "0.08em",
    widest:  "0.12em",
  },

  // ── Named text styles — maps to Figma text styles & CSS utility classes ─
  textStyles: {
    // OS structural labels — uppercase, tracked, IBM Plex Sans
    // Use for: section headers, column labels, module category tags
    "os-title-lg": { fontSize: "0.75rem",   fontWeight: "600", lineHeight: "1.2", letterSpacing: "0.08em",  textTransform: "uppercase", fontFamily: "sans" },
    "os-title-md": { fontSize: "0.6875rem", fontWeight: "600", lineHeight: "1.2", letterSpacing: "0.08em",  textTransform: "uppercase", fontFamily: "sans" },
    "os-title-sm": { fontSize: "0.625rem",  fontWeight: "600", lineHeight: "1.2", letterSpacing: "0.12em",  textTransform: "uppercase", fontFamily: "sans" },

    // Module & panel headers — IBM Plex Sans, no tracking
    // Use for: module names, panel titles, primary headings
    "module-lg":   { fontSize: "1.25rem",   fontWeight: "500", lineHeight: "1.2",  fontFamily: "sans" },
    "module-md":   { fontSize: "1rem",      fontWeight: "500", lineHeight: "1.2",  fontFamily: "sans" },
    "module-sm":   { fontSize: "0.875rem",  fontWeight: "500", lineHeight: "1.35", fontFamily: "sans" },

    // Body text — IBM Plex Sans
    // Use for: descriptions, paragraphs, general interface copy
    "body-lg":     { fontSize: "0.875rem",  fontWeight: "400", lineHeight: "1.5",  fontFamily: "sans" },
    "body-md":     { fontSize: "0.8125rem", fontWeight: "400", lineHeight: "1.5",  fontFamily: "sans" },
    "body-sm":     { fontSize: "0.75rem",   fontWeight: "400", lineHeight: "1.5",  fontFamily: "sans" },

    // Data values — IBM Plex Mono
    // Use for: metrics, counts, IDs, config values, status strings
    "data-lg":     { fontSize: "0.875rem",  fontWeight: "400", lineHeight: "1.5",  fontFamily: "mono" },
    "data-md":     { fontSize: "0.8125rem", fontWeight: "400", lineHeight: "1.5",  fontFamily: "mono" },
    "data-sm":     { fontSize: "0.75rem",   fontWeight: "400", lineHeight: "1.5",  fontFamily: "mono" },

    // System labels — IBM Plex Mono, small
    // Use for: metadata, timestamps, version strings, attribute keys
    "label-lg":    { fontSize: "0.75rem",   fontWeight: "400", lineHeight: "1.2",  fontFamily: "mono" },
    "label-md":    { fontSize: "0.6875rem", fontWeight: "400", lineHeight: "1.2",  fontFamily: "mono" },
    "label-sm":    { fontSize: "0.625rem",  fontWeight: "400", lineHeight: "1.2",  fontFamily: "mono" },

    // Code blocks — IBM Plex Mono
    "code-lg":     { fontSize: "0.875rem",  fontWeight: "400", lineHeight: "1.6",  fontFamily: "mono" },
    "code-md":     { fontSize: "0.8125rem", fontWeight: "400", lineHeight: "1.6",  fontFamily: "mono" },
    "code-sm":     { fontSize: "0.75rem",   fontWeight: "400", lineHeight: "1.6",  fontFamily: "mono" },
  },
} as const;
