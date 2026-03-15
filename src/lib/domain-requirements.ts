// ── Layer unlock requirements per domain type ──────────────────────────────
// Each domain type defines what data/configuration is needed per layer.
// When all requirements in a layer are fulfilled, the next layer unlocks.

export const LAYER_ORDER = [
  "foundation",
  "strategy",
  "execution",
  "monitoring",
  "growth",
  "innovation",
] as const;

export type LayerSlug = (typeof LAYER_ORDER)[number];

export interface LayerRequirement {
  key: string;
  label: string;
  description: string;
}

export type DomainRequirementsConfig = Record<LayerSlug, LayerRequirement[]>;

// ── Social & Messaging ──────────────────────────────────────────────────────

const socialMessaging: DomainRequirementsConfig = {
  foundation: [
    { key: "brand-guidelines", label: "Brand Guidelines", description: "Upload or define your brand voice, tone, and visual guidelines" },
    { key: "compliance-rules", label: "Compliance Rules", description: "Set content compliance policies and approval requirements" },
    { key: "knowledge-base", label: "Knowledge Base", description: "Connect knowledge sources for agent context assembly" },
  ],
  strategy: [
    { key: "brand-objectives", label: "Brand Objectives", description: "Define measurable brand goals and KPIs" },
    { key: "audience-data", label: "Audience Data", description: "Connect audience demographics and segmentation data" },
    { key: "platform-selection", label: "Platform Selection", description: "Select at least one social media platform to target" },
  ],
  execution: [
    { key: "strategy-brief", label: "Strategy Brief", description: "Approved strategy document from Strategy layer" },
    { key: "asset-library", label: "Asset Library", description: "Connect brand asset library for content creation" },
    { key: "publishing-schedule", label: "Publishing Schedule", description: "Define content publishing cadence and schedule" },
  ],
  monitoring: [
    { key: "quality-thresholds", label: "Quality Thresholds", description: "Set minimum quality scores for content approval" },
    { key: "compliance-policies", label: "Compliance Policies", description: "Define brand alignment and compliance check rules" },
  ],
  growth: [
    { key: "platform-analytics", label: "Platform Analytics", description: "Connect platform analytics for engagement tracking" },
    { key: "growth-targets", label: "Growth Targets", description: "Define audience growth and engagement targets" },
  ],
  innovation: [
    { key: "industry-feeds", label: "Industry Feeds", description: "Connect trend monitoring and industry news sources" },
  ],
};

// ── Campaign Planning ───────────────────────────────────────────────────────

const campaignPlanning: DomainRequirementsConfig = {
  foundation: [
    { key: "campaign-policies", label: "Campaign Policies", description: "Define campaign approval workflows and budget rules" },
    { key: "brand-book", label: "Brand Book", description: "Upload brand standards for campaign alignment" },
    { key: "compliance-framework", label: "Compliance Framework", description: "Set regulatory and legal compliance requirements" },
  ],
  strategy: [
    { key: "campaign-objectives", label: "Campaign Objectives", description: "Define campaign goals, audience, and success metrics" },
    { key: "market-research", label: "Market Research", description: "Connect market research data and competitor analysis" },
    { key: "budget-allocation", label: "Budget Allocation", description: "Set campaign budget and allocation strategy" },
  ],
  execution: [
    { key: "campaign-brief", label: "Campaign Brief", description: "Approved campaign strategy from Strategy layer" },
    { key: "creative-assets", label: "Creative Assets", description: "Upload or generate campaign creative materials" },
    { key: "channel-setup", label: "Channel Setup", description: "Configure campaign distribution channels" },
  ],
  monitoring: [
    { key: "performance-kpis", label: "Performance KPIs", description: "Define campaign performance tracking metrics" },
    { key: "alert-thresholds", label: "Alert Thresholds", description: "Set performance alert thresholds and escalation rules" },
  ],
  growth: [
    { key: "conversion-tracking", label: "Conversion Tracking", description: "Connect conversion and attribution tracking" },
    { key: "optimization-rules", label: "Optimization Rules", description: "Define automated optimization triggers and rules" },
  ],
  innovation: [
    { key: "experiment-framework", label: "Experiment Framework", description: "Define A/B testing and experiment methodology" },
  ],
};

// ── Default (generic fallback for new domains) ──────────────────────────────

const defaultDomain: DomainRequirementsConfig = {
  foundation: [
    { key: "operational-rules", label: "Operational Rules", description: "Define core operational policies and governance rules" },
    { key: "knowledge-sources", label: "Knowledge Sources", description: "Connect relevant knowledge bases and documentation" },
  ],
  strategy: [
    { key: "objectives", label: "Strategic Objectives", description: "Define measurable objectives and key results" },
    { key: "target-data", label: "Target Data", description: "Connect relevant data sources for strategy planning" },
  ],
  execution: [
    { key: "action-plan", label: "Action Plan", description: "Approved strategy document from Strategy layer" },
    { key: "resources", label: "Resources", description: "Connect required tools, assets, and integrations" },
  ],
  monitoring: [
    { key: "quality-rules", label: "Quality Rules", description: "Define output quality standards and review criteria" },
  ],
  growth: [
    { key: "analytics", label: "Analytics Connection", description: "Connect performance analytics and tracking" },
  ],
  innovation: [
    { key: "feeds", label: "Innovation Feeds", description: "Connect trend and industry monitoring sources" },
  ],
};

// ── Registry ────────────────────────────────────────────────────────────────

const DOMAIN_REQUIREMENTS: Record<string, DomainRequirementsConfig> = {
  "social-messaging": socialMessaging,
  "campaign-planning": campaignPlanning,
};

export function getRequirementsForDomain(domainSlug: string): DomainRequirementsConfig {
  return DOMAIN_REQUIREMENTS[domainSlug] ?? defaultDomain;
}
