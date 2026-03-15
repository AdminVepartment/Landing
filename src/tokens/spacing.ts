/**
 * Design Tokens — Spacing, Border Radius & Shadows
 * Vepartment spatial system.
 *
 * Spacing: 4px base grid (matches Figma default).
 * Radius:  Sharp edges by default. 0px is the standard.
 *          Micro-radius (2px) is the maximum for interactive elements.
 *          Never exceed 4px. No rounding in structural frames or icons.
 * Shadows: Not used for elevation — borders define structure.
 *          Shadows are reserved for floating layers (popovers, tooltips).
 */

export const spacingTokens = {
  // ── Base scale (4px grid) ─────────────────────────────────────────────
  0:    "0px",
  px:   "1px",
  0.5:  "0.125rem",   //  2px
  1:    "0.25rem",    //  4px
  1.5:  "0.375rem",   //  6px
  2:    "0.5rem",     //  8px
  2.5:  "0.625rem",   // 10px
  3:    "0.75rem",    // 12px
  3.5:  "0.875rem",   // 14px
  4:    "1rem",       // 16px
  5:    "1.25rem",    // 20px
  6:    "1.5rem",     // 24px
  7:    "1.75rem",    // 28px
  8:    "2rem",       // 32px
  9:    "2.25rem",    // 36px
  10:   "2.5rem",     // 40px
  11:   "2.75rem",    // 44px
  12:   "3rem",       // 48px
  14:   "3.5rem",     // 56px
  16:   "4rem",       // 64px
  20:   "5rem",       // 80px
  24:   "6rem",       // 96px
  28:   "7rem",       // 112px
  32:   "8rem",       // 128px
  36:   "9rem",       // 144px
  40:   "10rem",      // 160px
  44:   "11rem",      // 176px
  48:   "12rem",      // 192px
  56:   "14rem",      // 224px
  64:   "16rem",      // 256px
  72:   "18rem",      // 288px
  80:   "20rem",      // 320px
  96:   "24rem",      // 384px
} as const;

export const borderRadiusTokens = {
  // Vepartment edge language — sharp by default
  none:    "0px",      // default — all structural elements
  sm:      "1px",      // barely perceptible — rarely used
  DEFAULT: "0px",
  md:      "2px",      // micro-radius — maximum for interactive elements
  lg:      "2px",      // same as md — 2px is the cap
  xl:      "4px",      // absolute maximum — use only with justification
  "2xl":   "4px",
  "3xl":   "4px",
  full:    "9999px",   // pill — status indicators, avatar, toggle only
} as const;

export const shadowTokens = {
  // Elevation is defined by borders, not shadows.
  // Use shadows only for floating layers that break out of the grid.
  none:  "none",
  sm:    "0 1px 4px 0 rgb(0 0 0 / 0.4)",                                          // tooltip, small popover
  md:    "0 4px 12px 0 rgb(0 0 0 / 0.5)",                                         // panel, dropdown
  lg:    "0 8px 24px 0 rgb(0 0 0 / 0.6), 0 1px 4px 0 rgb(0 0 0 / 0.4)",          // modal, command palette
  xl:    "0 16px 40px 0 rgb(0 0 0 / 0.7), 0 2px 8px 0 rgb(0 0 0 / 0.5)",         // overlay, sheet
} as const;
