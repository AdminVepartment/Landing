/**
 * Vepartment Custom Icons
 *
 * Geometric SVG icons unique to the Vepartment platform — not available in lucide-react.
 * Stroke language: 1.5px stroke, butt caps, miter joins (Vepartment brand spec).
 * ViewBox: 24×24. Interface matches lucide-react LucideProps for interoperability.
 *
 * Categories:
 *   HAS           — Human Agency Scale progression (5 levels + system master)
 *   Departments   — Platform department identity icons
 *   Domains       — Workflow domain icons
 */

import * as React from "react";

interface VIcon extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

function VIconBase({
  size = 24,
  strokeWidth = 1.5,
  children,
  className,
  ...props
}: VIcon & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HAS — Human Agency Scale
// Progressive geometric icons representing AI autonomy level.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * HAS 1 — Insight
 * AI provides insight only. Human retains full control.
 * Visual: circle bounded inside a square — contained, read-only.
 */
export const IconHAS1Insight = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <circle cx="12" cy="12" r="5" />
  </VIconBase>
);
export const IconHAS1 = IconHAS1Insight;

/**
 * HAS 2 — Suggestion
 * AI suggests actions. Human decides whether to act.
 * Visual: circle (AI) with right-pointing triangle (suggested direction).
 */
export const IconHAS2Suggestion = (props: VIcon) => (
  <VIconBase {...props}>
    <circle cx="8" cy="12" r="5" />
    <path d="M15 9L20 12L15 15Z" />
  </VIconBase>
);
export const IconHAS2 = IconHAS2Suggestion;

/**
 * HAS 3 — Assist
 * Human and AI collaborate. Shared execution.
 * Visual: square (human) connected to circle (AI) by a line — partnership.
 */
export const IconHAS3Assist = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="2" y="8" width="8" height="8" />
    <line x1="10" y1="12" x2="14" y2="12" />
    <circle cx="18" cy="12" r="4" />
  </VIconBase>
);
export const IconHAS3 = IconHAS3Assist;

/**
 * HAS 4 — Execute
 * AI performs tasks with human oversight.
 * Visual: square with outbound arrow — AI taking action, expanding outward.
 */
export const IconHAS4Execute = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="2" y="6" width="12" height="12" />
    <path d="M16 12H22" />
    <path d="M19 9L22 12L19 15" />
  </VIconBase>
);
export const IconHAS4 = IconHAS4Execute;

/**
 * HAS 5 — Autonomous
 * AI self-operates. Minimal human intervention.
 * Visual: square center with orbital dots at cardinal points — self-sustaining.
 */
export const IconHAS5Autonomous = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="8" y="8" width="8" height="8" />
    <circle cx="12" cy="3"  r="1.5" fill="currentColor" stroke="none" />
    <circle cx="21" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="21" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="3"  cy="12" r="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);
export const IconHAS5 = IconHAS5Autonomous;

/**
 * HAS System (master icon)
 * Represents the full HAS progression as a whole.
 * Visual: stacked horizontal bars of increasing width — escalating autonomy.
 */
export const IconHASSystem = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="19" width="5"  height="2" />
    <rect x="3" y="14" width="9"  height="2" />
    <rect x="3" y="9"  width="14" height="2" />
    <rect x="3" y="4"  width="18" height="2" />
  </VIconBase>
);

// ─────────────────────────────────────────────────────────────────────────────
// Department Icons
// Outer square (18×18 at 3,3) + inner geometric motif = department identity.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Marketing — amplification and outreach.
 * Visual: square with megaphone (rect body + trapezoidal cone).
 */
export const IconMarketing = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    {/* Mouthpiece */}
    <rect x="6" y="10" width="4" height="4" />
    {/* Cone — trapezoid flaring right */}
    <polygon points="10,10 18,6 18,18 10,14" />
  </VIconBase>
);

/**
 * Branding — identity and brand core.
 * Visual: square → circle → inner square (concentric, nested identity layers).
 */
export const IconBranding = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <circle cx="12" cy="12" r="6" />
    <rect x="9" y="9" width="6" height="6" />
  </VIconBase>
);

/**
 * Product — product modules and features.
 * Visual: square with three inner module squares in triangular arrangement.
 */
export const IconProduct = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <rect x="6"   y="6"  width="5" height="5" />
    <rect x="13"  y="6"  width="5" height="5" />
    <rect x="9.5" y="13" width="5" height="5" />
  </VIconBase>
);

/**
 * Sales — conversion and revenue flow.
 * Visual: square with rightward arrow inside.
 */
export const IconSales = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <polyline points="13.5,8.5 17,12 13.5,15.5" />
  </VIconBase>
);

/**
 * Sustainability — environmental cycle and circular economy.
 * Visual: square with near-complete circular arrow (300° arc + arrowhead).
 */
export const IconSustainability = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    {/* ~300° clockwise arc: top (12,8) → lower-left (8.5,14) */}
    <path d="M12 8A4 4 0 1 1 8.5 14" />
    {/* Arrowhead at arc end, tangent to clockwise direction */}
    <polyline points="7.5,12.3 8.5,14 9.5,15.7" />
  </VIconBase>
);

/**
 * Scouting — discovery and exploration.
 * Visual: square with target (concentric circles) + diagonal pointer line.
 */
export const IconScouting = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <circle cx="10" cy="10" r="4" />
    <circle cx="10" cy="10" r="1.5" />
    {/* Pointer extending to corner */}
    <line x1="13" y1="13" x2="18" y2="18" />
  </VIconBase>
);

/**
 * Operations — operational systems and processes.
 * Visual: square with hub-and-spoke node network (3 satellites + center hub).
 */
export const IconOperations = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    {/* Center hub */}
    <circle cx="12" cy="12" r="2" />
    {/* Satellite nodes */}
    <circle cx="12" cy="7"  r="1.5" />
    <circle cx="17" cy="16" r="1.5" />
    <circle cx="7"  cy="16" r="1.5" />
    {/* Spokes */}
    <line x1="12"  y1="10"   x2="12"  y2="8.5" />
    <line x1="13.7" y1="13.7" x2="15.6" y2="14.6" />
    <line x1="10.3" y1="13.7" x2="8.4"  y2="14.6" />
  </VIconBase>
);

/**
 * Finance (Department) — financial structure and reporting.
 * Visual: square with three ascending vertical bar chart.
 */
export const IconFinanceDept = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    {/* Three ascending bars, anchored to base */}
    <rect x="6"    y="15" width="3" height="4" />
    <rect x="10.5" y="11" width="3" height="8" />
    <rect x="15"   y="7"  width="3" height="12" />
  </VIconBase>
);

/**
 * HR / Talent — people and collaboration.
 * Visual: square with two overlapping circles (Venn — people intersecting).
 */
export const IconHRTalent = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <circle cx="9"  cy="12" r="3.5" />
    <circle cx="15" cy="12" r="3.5" />
  </VIconBase>
);

// ─────────────────────────────────────────────────────────────────────────────
// Domain Icons (Workflow Domains)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Campaign — message broadcast and outreach.
 * Visual: left square body + triangle pointing outward right (broadcast horn).
 */
export const IconCampaign = (props: VIcon) => (
  <VIconBase {...props}>
    {/* Square body */}
    <rect x="3" y="7" width="11" height="10" />
    {/* Triangle pointing right — amplification */}
    <polygon points="14,7 21,12 14,17" />
  </VIconBase>
);

/**
 * Content — media and documents.
 * Visual: three stacked equal-height rectangles.
 */
export const IconContent = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="4" y="4"  width="16" height="4" />
    <rect x="4" y="10" width="16" height="4" />
    <rect x="4" y="16" width="16" height="4" />
  </VIconBase>
);

/**
 * Performance — analytics and metrics.
 * Visual: square frame with upward polyline graph inside.
 */
export const IconPerformance = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <polyline points="6,17 9,13 12,10 15,8 18,6" />
  </VIconBase>
);

/**
 * Customer Insights — user understanding.
 * Visual: center circle with 8 radial lines extending outward.
 */
export const IconCustomerInsights = (props: VIcon) => (
  <VIconBase {...props}>
    <circle cx="12" cy="12" r="4" />
    <line x1="12"  y1="8"    x2="12"  y2="3"  />
    <line x1="14.8" y1="9.2"  x2="17"  y2="7"  />
    <line x1="16"  y1="12"   x2="21"  y2="12" />
    <line x1="14.8" y1="14.8" x2="17"  y2="17" />
    <line x1="12"  y1="16"   x2="12"  y2="21" />
    <line x1="9.2"  y1="14.8" x2="7"   y2="17" />
    <line x1="8"   y1="12"   x2="3"   y2="12" />
    <line x1="9.2"  y1="9.2"  x2="7"   y2="7"  />
  </VIconBase>
);

/**
 * Product Development — build process.
 * Visual: central square connected by lines to 4 smaller satellite squares.
 */
export const IconProductDev = (props: VIcon) => (
  <VIconBase {...props}>
    {/* Center */}
    <rect x="9" y="9" width="6" height="6" />
    {/* Top */}
    <rect x="10" y="2" width="4" height="4" />
    <line x1="12" y1="6"  x2="12" y2="9"  />
    {/* Right */}
    <rect x="18" y="10" width="4" height="4" />
    <line x1="18" y1="12" x2="15" y2="12" />
    {/* Bottom */}
    <rect x="10" y="18" width="4" height="4" />
    <line x1="12" y1="18" x2="12" y2="15" />
    {/* Left */}
    <rect x="2" y="10" width="4" height="4" />
    <line x1="6"  y1="12" x2="9"  y2="12" />
  </VIconBase>
);

/**
 * E-commerce — digital commerce.
 * Visual: square frame with simplified shopping cart structure inside.
 */
export const IconEcommerce = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    {/* Cart handle + body */}
    <path d="M6 8H8L10 14H17L18.5 10H10" />
    {/* Wheels */}
    <circle cx="11" cy="17" r="1" />
    <circle cx="16" cy="17" r="1" />
  </VIconBase>
);

/**
 * Inventory — stored resources.
 * Visual: three stacked rectangles tapering inward upward (warehouse tiers).
 */
export const IconInventory = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="4" y="16" width="16" height="4" />
    <rect x="5" y="11" width="14" height="4" />
    <rect x="6" y="6"  width="12" height="4" />
  </VIconBase>
);

/**
 * Archive Box — stored knowledge.
 * Visual: box lid + box body + inner square (contents).
 */
export const IconArchiveBox = (props: VIcon) => (
  <VIconBase {...props}>
    {/* Lid */}
    <rect x="2" y="4" width="20" height="4" />
    {/* Body */}
    <rect x="3" y="8" width="18" height="12" />
    {/* Stored content square */}
    <rect x="9" y="12" width="6" height="5" />
  </VIconBase>
);

/**
 * Trend Analysis — trend detection.
 * Visual: X/Y axes + diagonal upward trend line with arrowhead.
 */
export const IconTrendAnalysis = (props: VIcon) => (
  <VIconBase {...props}>
    {/* Axes */}
    <line x1="5" y1="4"  x2="5"  y2="19" />
    <line x1="5" y1="19" x2="20" y2="19" />
    {/* Trend line */}
    <line x1="6" y1="17" x2="18" y2="6"  />
    {/* Arrowhead at trend line top */}
    <polyline points="15.5,5 18,6 17,8.5" />
  </VIconBase>
);

/**
 * Innovation Lab — experimentation and new ideas.
 * Visual: square lab base + triangle spark/flame above (ignition moment).
 */
export const IconInnovationLab = (props: VIcon) => (
  <VIconBase {...props}>
    {/* Triangle spark above */}
    <polygon points="12,3 17,12 7,12" />
    {/* Lab body */}
    <rect x="4" y="13" width="16" height="8" />
  </VIconBase>
);

/**
 * Social & Messaging — social network nodes.
 * Visual: square frame with three circle nodes forming a connected network triangle.
 */
export const IconSocialMessaging = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="3" y="3" width="18" height="18" />
    <circle cx="9"  cy="9"  r="2" />
    <circle cx="15" cy="9"  r="2" />
    <circle cx="12" cy="16" r="2" />
    <line x1="9"  y1="9"  x2="15" y2="9"  />
    <line x1="15" y1="9"  x2="12" y2="16" />
    <line x1="12" y1="16" x2="9"  y2="9"  />
  </VIconBase>
);

// ─────────────────────────────────────────────────────────────────────────────
// Ori — Vepartment Operations Agent (mascot & system icons)
// "Ori" = Origin. The starting point of all operations.
// A geometric entity with just enough anthropomorphic geometry to create
// connection — diamond silhouette, two square eyes, status pulse heartbeat.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * VOA network icon — used for system diagrams and technical contexts.
 * Diamond core + 4 connected satellite nodes.
 */
export const IconVOA = (props: VIcon) => (
  <VIconBase {...props}>
    <rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <line x1="12" y1="6.35"  x2="12" y2="3" />
    <line x1="17.65" y1="12" x2="21" y2="12" />
    <line x1="12" y1="17.65" x2="12" y2="21" />
    <line x1="6.35" y1="12"  x2="3"  y2="12" />
    <rect x="10.5" y="1.5"  width="3" height="3" />
    <rect x="19.5" y="10.5" width="3" height="3" />
    <rect x="10.5" y="19.5" width="3" height="3" />
    <rect x="1.5"  y="10.5" width="3" height="3" />
  </VIconBase>
);

/**
 * Ori — mascot avatar (small icon size).
 * Diamond: 1px stroke. Face details: 0.75px. Eyes: filled rects.
 * Light, refined, breathes at any size.
 */
export const IconOri = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="9" y1="10.5" x2="11" y2="10" />
      <line x1="13" y1="10" x2="15" y2="10.5" />
      <line x1="10" y1="14" x2="12" y2="15" />
      <line x1="12" y1="15" x2="14" y2="14" />
    </g>
    <rect x="9.5" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — large mascot for empty states and welcome screens.
 * Face only, fills more of the viewBox. Same light stroke weights.
 */
export const IconOriLarge = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="4" y="4" width="16" height="16" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="8" y1="10.5" x2="10.5" y2="10" />
      <line x1="13.5" y1="10" x2="16" y2="10.5" />
      <line x1="9.5" y1="14.5" x2="12" y2="15.5" />
      <line x1="12" y1="15.5" x2="14.5" y2="14.5" />
    </g>
    <rect x="8.5" y="11" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="13.5" y="11" width="2" height="2" fill="currentColor" stroke="none" />
  </VIconBase>
);

// ─────────────────────────────────────────────────────────────────────────────
// Ori Expressions
//
// Ori reacts to context with different facial expressions.
// All share the same diamond silhouette. Mood comes from brow angle,
// eye shape, and mouth geometry.
//
// Usage: pick the expression that matches what Ori is doing.
//   Confident  → giving a directive or summary
//   Focused    → processing a task
//   Calm       → showing system info, idle state
//   Thinking   → planning, strategizing
//   Determined → executing, running tasks
//   Watching   → monitoring, checking status
//   Excited    → reporting good results, success
//   Curious    → exploring, discovering something new
//
// Construction rules:
//   Diamond:  x="6.5" y="6.5" w=11 h=11, rotate(45 12 12), 1px stroke
//   Eyes:     filled rects, no stroke                         — shape varies
//   Brows:    0.75px lines above eyes                         — angle = mood
//   Mouth:    0.75px lines below eyes                         — shape = tone
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ori — Confident.
 * Use when: giving directives, presenting summaries, confirming actions.
 * Straight level brows (in command). Wider eyes. Confident dash mouth.
 */
export const IconOriConfident = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="8.5" y1="10" x2="11" y2="10" />
      <line x1="13" y1="10" x2="15.5" y2="10" />
      <line x1="10.5" y1="14.5" x2="13.5" y2="14.5" />
    </g>
    <rect x="9" y="11" width="2" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13" y="11" width="2" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — Focused.
 * Use when: processing tasks, busy working, loading data.
 * Slight inward brows (concentration). Compact eyes. Neutral mouth.
 */
export const IconOriFocused = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="9" y1="10.5" x2="11" y2="10.5" />
      <line x1="13" y1="10.5" x2="15" y2="10.5" />
      <line x1="10.5" y1="14" x2="13.5" y2="14" />
    </g>
    <rect x="9.5" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — Calm.
 * Use when: idle, showing system info, stable states, welcome screens.
 * Flat level brows. Tall solid eyes. Long calm mouth.
 */
export const IconOriCalm = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="9" y1="10.5" x2="11" y2="10.5" />
      <line x1="13" y1="10.5" x2="15" y2="10.5" />
      <line x1="10" y1="14.5" x2="14" y2="14.5" />
    </g>
    <rect x="9.5" y="11" width="1.5" height="2" fill="currentColor" stroke="none" />
    <rect x="13" y="11" width="1.5" height="2" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — Thinking.
 * Use when: planning, strategizing, weighing options.
 * One brow raised (pondering). Offset eyes. Angled contemplative mouth.
 */
export const IconOriThinking = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="9" y1="10.5" x2="11" y2="10.5" />
      <line x1="13" y1="10" x2="15" y2="9.5" />
      <line x1="10.5" y1="14.5" x2="13.5" y2="14" />
    </g>
    <rect x="9.5" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13" y="10.5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — Determined.
 * Use when: executing tasks, running operations, pushing through.
 * Inward-angled brows (drive). Tall alert eyes. Split firm mouth.
 */
export const IconOriDetermined = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="9" y1="10.5" x2="11" y2="10" />
      <line x1="13" y1="10" x2="15" y2="10.5" />
      <line x1="10" y1="14" x2="11.5" y2="14" />
      <line x1="12.5" y1="14" x2="14" y2="14" />
    </g>
    <rect x="9.5" y="10.5" width="1.5" height="2" fill="currentColor" stroke="none" />
    <rect x="13" y="10.5" width="1.5" height="2" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — Watching.
 * Use when: monitoring status, checking health, scanning logs.
 * Sharp wide brows. Narrow scanning eyes. Thin neutral mouth.
 */
export const IconOriWatching = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="8.5" y1="10" x2="11" y2="10" />
      <line x1="13" y1="10" x2="15.5" y2="10" />
      <line x1="10.5" y1="14.5" x2="13.5" y2="14.5" />
    </g>
    <rect x="9" y="11" width="2" height="1" fill="currentColor" stroke="none" />
    <rect x="13" y="11" width="2" height="1" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — Excited.
 * Use when: reporting success, good metrics, task completed, celebrating.
 * Raised brows (open, upbeat). Wide eyes. Big chevron smile.
 */
export const IconOriExcited = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="9" y1="10" x2="11" y2="9.5" />
      <line x1="13" y1="9.5" x2="15" y2="10" />
      <line x1="9" y1="14" x2="12" y2="15.5" />
      <line x1="12" y1="15.5" x2="15" y2="14" />
    </g>
    <rect x="9.5" y="10.5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13" y="10.5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Ori — Curious.
 * Use when: exploring, discovering something new, asking questions.
 * Asymmetric brows (intrigued). Offset eyes. Open square "o" mouth.
 */
export const IconOriCurious = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    <rect x="6.5" y="6.5" width="11" height="11" transform="rotate(45 12 12)" />
    <g strokeWidth="0.75">
      <line x1="9" y1="9.5" x2="11" y2="10" />
      <line x1="13" y1="10.5" x2="15" y2="10.5" />
    </g>
    <rect x="9.5" y="10.5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="11" y="13.5" width="2" height="2" fill="none" strokeWidth="0.75" />
  </VIconBase>
);

// ─────────────────────────────────────────────────────────────────────────────
// Agent Characters
//
// Each character has a unique head shape and personality.
// All share the same stroke weights (1px outline, 0.75px face details)
// and geometric construction rules from Ori.
//
//   Ori   ◇  Diamond    — Operations Agent (exists above)
//   Rex   □  Square     — Supervisor (structured, commanding)
//   Pix   ⊡  Notched sq — Worker (compact, industrious)
//   Vig   ⬠  Pentagon   — Monitor (vigilant, shield-like)
//   Lux   △  Triangle   — Strategist (elevated, directional)
//   Zyn   ⬡  Hexagon    — Innovator (experimental, faceted)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Rex — Supervisor character.
 * Square head = structured, stable, authoritative.
 * Wide confident eyes. Firm straight mouth. Command presence.
 */
export const IconRex = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Square head */}
    <rect x="4" y="4" width="16" height="16" />
    <g strokeWidth="0.75">
      {/* Level brows — authority */}
      <line x1="7.5" y1="10" x2="10.5" y2="10" />
      <line x1="13.5" y1="10" x2="16.5" y2="10" />
      {/* Firm straight mouth */}
      <line x1="9.5" y1="15.5" x2="14.5" y2="15.5" />
    </g>
    {/* Wide square eyes */}
    <rect x="8" y="11" width="2.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13.5" y="11" width="2.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Pix — Worker character.
 * Small square with corner notch = compact, industrious, tool-like.
 * Small focused eyes. Neutral working mouth.
 */
export const IconPix = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Square head with top-right notch — tool/utility mark */}
    <path d="M4 4H17L20 7V20H4Z" fill="none" />
    <g strokeWidth="0.75">
      {/* Slight inward brows — focused */}
      <line x1="8" y1="10.5" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10.5" />
      {/* Small working mouth */}
      <line x1="10.5" y1="15" x2="13.5" y2="15" />
    </g>
    {/* Compact square eyes */}
    <rect x="8.5" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="14" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Vig — Monitor character.
 * Pentagon/shield head = vigilant, protective, watchful.
 * Narrow scanning eyes. Alert expression.
 */
export const IconVig = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Shield/pentagon head — point at bottom */}
    <path d="M4 4H20V14L12 21L4 14Z" fill="none" />
    <g strokeWidth="0.75">
      {/* Sharp wide brows — scanning */}
      <line x1="7" y1="8.5" x2="10.5" y2="8.5" />
      <line x1="13.5" y1="8.5" x2="17" y2="8.5" />
      {/* Thin neutral mouth */}
      <line x1="10" y1="13.5" x2="14" y2="13.5" />
    </g>
    {/* Narrow scanning eyes — wide but short */}
    <rect x="7.5" y="9.5" width="3" height="1" fill="currentColor" stroke="none" />
    <rect x="13.5" y="9.5" width="3" height="1" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Lux — Strategist character.
 * Upward triangle head = elevated, directional, forward-thinking.
 * Thoughtful expression. Eyes sit high in the shape.
 */
export const IconLux = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Triangle head — pointing up */}
    <polygon points="12,2 22,20 2,20" fill="none" />
    <g strokeWidth="0.75">
      {/* Angled thoughtful brows */}
      <line x1="8.5" y1="13.5" x2="10.5" y2="13" />
      <line x1="13.5" y1="13" x2="15.5" y2="13.5" />
      {/* Contemplative small mouth */}
      <line x1="10.5" y1="17" x2="13.5" y2="17" />
    </g>
    {/* Eyes — positioned in upper third of triangle */}
    <rect x="9" y="14" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13.5" y="14" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Zyn — Innovator character.
 * Hexagon head = faceted, multi-perspective, experimental.
 * Asymmetric curious expression. Open to new things.
 */
export const IconZyn = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Hexagon head — flat top and bottom */}
    <polygon points="7,3 17,3 21,12 17,21 7,21 3,12" fill="none" />
    <g strokeWidth="0.75">
      {/* Asymmetric brows — curious */}
      <line x1="7.5" y1="9" x2="10" y2="9.5" />
      <line x1="14" y1="9.5" x2="16.5" y2="9" />
      {/* Small open square mouth — discovery */}
    </g>
    {/* Eyes — slightly different sizes for asymmetry */}
    <rect x="8" y="10.5" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="14" y="10.5" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    {/* Open "o" mouth */}
    <rect x="11" y="14.5" width="2" height="2" fill="none" strokeWidth="0.75" />
  </VIconBase>
);

/**
 * Nox — Enforcer character.
 * Inverted triangle head = top-heavy, imposing, rule-driven.
 * Stern narrow eyes. Firm flat mouth. Governs policy.
 */
export const IconNox = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Inverted triangle — authority bearing down */}
    <polygon points="2,4 22,4 12,22" fill="none" />
    <g strokeWidth="0.75">
      {/* Stern flat brows */}
      <line x1="8" y1="8.5" x2="11" y2="8.5" />
      <line x1="13" y1="8.5" x2="16" y2="8.5" />
      {/* Firm flat mouth */}
      <line x1="10" y1="14" x2="14" y2="14" />
    </g>
    {/* Narrow stern eyes */}
    <rect x="8.5" y="9.5" width="2.5" height="1" fill="currentColor" stroke="none" />
    <rect x="13" y="9.5" width="2.5" height="1" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Kel — Connector character.
 * Horizontal diamond (wide lozenge) = bridging, linking, relational.
 * Warm wide-set eyes. Gentle open smile. Routes data between agents.
 */
export const IconKel = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Wide horizontal diamond */}
    <polygon points="12,4 22,12 12,20 2,12" fill="none" />
    <g strokeWidth="0.75">
      {/* Soft arched brows */}
      <line x1="6.5" y1="10.5" x2="9" y2="10" />
      <line x1="15" y1="10" x2="17.5" y2="10.5" />
      {/* Gentle smile */}
      <line x1="10" y1="14" x2="12" y2="15" />
      <line x1="12" y1="15" x2="14" y2="14" />
    </g>
    {/* Wide-set round eyes */}
    <rect x="7" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="15.5" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Rho — Analyst character.
 * Tall rectangle (portrait) = methodical, data-oriented, deep.
 * Focused downcast eyes. Small precise mouth. Processes numbers.
 */
export const IconRho = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Tall rectangle head */}
    <rect x="5" y="2" width="14" height="20" />
    <g strokeWidth="0.75">
      {/* Slight inward brows — concentration */}
      <line x1="8" y1="9" x2="10.5" y2="8.5" />
      <line x1="13.5" y1="8.5" x2="16" y2="9" />
      {/* Small precise mouth */}
      <line x1="10.5" y1="16" x2="13.5" y2="16" />
    </g>
    {/* Tall narrow eyes — reading data */}
    <rect x="8.5" y="10" width="1.5" height="2.5" fill="currentColor" stroke="none" />
    <rect x="14" y="10" width="1.5" height="2.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Axe — Executor character.
 * Arrow/chevron head (pointing right) = action, forward motion, speed.
 * Determined sharp eyes. Set jaw mouth. Drives execution.
 */
export const IconAxe = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Arrow/chevron pointing right */}
    <polygon points="2,4 16,4 22,12 16,20 2,20" fill="none" />
    <g strokeWidth="0.75">
      {/* Determined forward brows */}
      <line x1="6" y1="10" x2="9" y2="9.5" />
      <line x1="12" y1="9.5" x2="15" y2="10" />
      {/* Set jaw — two dashes */}
      <line x1="8" y1="14.5" x2="10.5" y2="14.5" />
      <line x1="11.5" y1="14.5" x2="14" y2="14.5" />
    </g>
    {/* Sharp forward eyes */}
    <rect x="7" y="10.5" width="2" height="1.5" fill="currentColor" stroke="none" />
    <rect x="12" y="10.5" width="2" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Sol — Guide character.
 * Circle head = approachable, holistic, warm, complete.
 * Kind round eyes. Soft smile. Onboards and teaches.
 */
export const IconSol = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Circle head */}
    <circle cx="12" cy="12" r="10" fill="none" />
    <g strokeWidth="0.75">
      {/* Gentle arched brows */}
      <line x1="7.5" y1="9.5" x2="10" y2="9" />
      <line x1="14" y1="9" x2="16.5" y2="9.5" />
      {/* Warm smile */}
      <line x1="9" y1="14.5" x2="12" y2="16" />
      <line x1="12" y1="16" x2="15" y2="14.5" />
    </g>
    {/* Kind round-ish eyes */}
    <rect x="8" y="10" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="14" y="10" width="2" height="2" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Flux — Automator character.
 * Parallelogram head = motion, flow, continuous processing.
 * Alert horizontal eyes. Moving forward mouth. Runs pipelines.
 */
export const IconFlux = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Parallelogram — sense of motion */}
    <polygon points="6,3 22,3 18,21 2,21" fill="none" />
    <g strokeWidth="0.75">
      {/* Forward-leaning brows */}
      <line x1="8" y1="9.5" x2="11" y2="9" />
      <line x1="14" y1="9" x2="17" y2="9.5" />
      {/* Dash mouth — in motion */}
      <line x1="9" y1="15" x2="14" y2="15" />
    </g>
    {/* Alert horizontal eyes */}
    <rect x="8.5" y="10.5" width="2.5" height="1" fill="currentColor" stroke="none" />
    <rect x="14" y="10.5" width="2.5" height="1" fill="currentColor" stroke="none" />
  </VIconBase>
);

/**
 * Cog — Builder character.
 * Cross/plus head = constructive, modular, assembles systems.
 * Steady focused eyes. Neutral builder mouth.
 */
export const IconCogAgent = (props: VIcon) => (
  <VIconBase {...props} strokeWidth={1}>
    {/* Plus/cross shape */}
    <polygon points="8,2 16,2 16,8 22,8 22,16 16,16 16,22 8,22 8,16 2,16 2,8 8,8" fill="none" />
    <g strokeWidth="0.75">
      {/* Level steady brows */}
      <line x1="8.5" y1="10" x2="11" y2="10" />
      <line x1="13" y1="10" x2="15.5" y2="10" />
      {/* Neutral builder mouth */}
      <line x1="10" y1="15" x2="14" y2="15" />
    </g>
    {/* Steady square eyes */}
    <rect x="9" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
    <rect x="13.5" y="11" width="1.5" height="1.5" fill="currentColor" stroke="none" />
  </VIconBase>
);
