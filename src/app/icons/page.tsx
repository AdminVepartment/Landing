import { Frame, Block } from "@/components/showcase/frame";
import {
  // Navigation
  IconArrowLeft, IconArrowRight, IconArrowUp, IconArrowDown,
  IconArrowUpRight, IconArrowDownLeft,
  IconChevronLeft, IconChevronRight, IconChevronUp, IconChevronDown,
  IconChevronsLeft, IconChevronsRight, IconChevronsUpDown,
  IconExternalLink, IconHome, IconMenu,
  IconPanelLeft, IconPanelRight, IconSidebarOpen, IconSidebarClose,
  IconLayoutGrid, IconLayoutList, IconColumns, IconRows,
  // Actions
  IconCheck, IconX, IconPlus, IconMinus, IconTrash, IconEdit, IconPencil,
  IconCopy, IconClipboard, IconClipboardCheck,
  IconDownload, IconUpload, IconSearch, IconFilter,
  IconSortAsc, IconSortDesc, IconRefresh, IconUndo, IconRedo,
  IconMove, IconMaximize, IconMinimize, IconExpand, IconShrink,
  IconPin, IconPinOff, IconLock, IconUnlock, IconZoomIn, IconZoomOut,
  // Status
  IconAlertCircle, IconAlertTriangle, IconCheckCircle, IconInfo,
  IconXCircle, IconLoader, IconCircleDot, IconCircle, IconCircleOff,
  IconDot, IconBadgeCheck, IconBadgeAlert,
  IconShieldCheck, IconShieldAlert, IconShieldX,
  // System / OS
  IconCpu, IconServer, IconDatabase, IconHardDrive, IconHardDriveDownload,
  IconNetwork, IconWifi, IconWifiOff,
  IconCloud, IconCloudOff, IconCloudUpload, IconCloudDownload,
  IconGlobe, IconBinary, IconCode, IconCodeXml, IconTerminal, IconSquareTerminal,
  IconBraces, IconBrackets, IconHash, IconVariable,
  IconWorkflow, IconGitBranch, IconGitMerge, IconGitPullRequest, IconGitCommit,
  IconWebhook, IconActivity, IconGauge,
  IconBarChart, IconBarChart3, IconLineChart, IconPieChart,
  IconRadio, IconSignal, IconRss, IconZap,
  // Departments / Modules
  IconBuilding, IconBriefcase, IconKanban, IconDashboard,
  IconBoxes, IconBox, IconLayers, IconLayers2,
  IconComponent, IconPuzzle, IconBlocks, IconAppWindow, IconMonitor,
  IconBot, IconBrain, IconSparkles, IconWand,
  IconScan, IconCrosshair, IconFocus, IconTarget, IconSiren, IconShieldEllipsis,
  // People / Org
  IconUser, IconUsers, IconUserPlus, IconUserMinus,
  IconUserCheck, IconUserX, IconUserCog, IconUserCircle, IconContact,
  IconCrown, IconAward,
  // UI Controls
  IconEye, IconEyeOff, IconSettings, IconSettings2, IconSliders,
  IconToggleOff, IconToggleOn,
  IconBell, IconBellOff, IconBellRing,
  IconStar, IconBookmark, IconShare,
  IconMoreHorizontal, IconMoreVertical, IconEllipsis,
  IconGripVertical, IconGripHorizontal, IconGrab,
  // Files / Data
  IconFile, IconFileText, IconFileCode, IconFileJson, IconFileSpreadsheet,
  IconFileCog, IconFileCheck, IconFileX, IconFilePlus, IconFileMinus,
  IconFolder, IconFolderOpen, IconFolderPlus, IconFolderTree,
  IconImage, IconLink, IconLinkOff, IconTable, IconSheet,
  // Time
  IconClock, IconClock3, IconTimer, IconTimerOff,
  IconCalendar, IconCalendarDays, IconCalendarCheck, IconHistory, IconHourglass,
  // Communication
  IconMail, IconMailOpen, IconMessage, IconMessagePlus, IconMessages,
  IconPhone, IconPhoneCall, IconPhoneOff,
  IconVideo, IconVideoOff, IconMic, IconMicOff,
  IconSend, IconReply, IconForward, IconAt,
  // Finance
  IconTrendingUp, IconTrendingDown, IconDollar, IconCreditCard,
  IconReceipt, IconWallet, IconPackage, IconPackage2, IconTruck, IconCart,
  // Misc
  IconSun, IconMoon, IconTag, IconTags, IconFlag, IconFlagOff,
  IconKey, IconKeyRound, IconQrCode, IconFingerprint,
  IconPower, IconPowerOff, IconPlug, IconPlugZap, IconSlash,

  // ── Vepartment system — lucide mappings ───────────────────────────────
  IconPlay, IconPlayCircle, IconArchive, IconScale, IconCompass, IconMap,
  IconLightbulb, IconCog, IconBookUser, IconWrench, IconClipboardList,
  IconBookOpen, IconLibrary, IconAlignLeft,
  IconArrowRightLeft, IconRepeat2,
  IconThumbsUp, IconScrollText, IconShield,
  IconHeart, IconPercent, IconFileBarChart,

  // ── Vepartment custom SVG icons (HAS) ────────────────────────────────
  IconHAS1Insight, IconHAS2Suggestion, IconHAS3Assist, IconHAS4Execute, IconHAS5Autonomous, IconHASSystem,
  // ── Vepartment custom SVG icons (Departments) ─────────────────────────
  IconMarketing, IconBranding, IconProduct, IconSales, IconSustainability,
  IconScouting, IconOperations, IconFinanceDept, IconHRTalent,
  // ── Vepartment custom SVG icons (Domains) ─────────────────────────────
  IconCampaign, IconContent, IconPerformance, IconCustomerInsights,
  IconProductDev, IconEcommerce, IconInventory, IconArchiveBox,
  IconTrendAnalysis, IconInnovationLab,
} from "@/components/icons";

type IconEntry = { name: string; Icon: React.ElementType };

const iconGroups: { label: string; icons: IconEntry[] }[] = [
  // ── Existing groups ────────────────────────────────────────────────────
  {
    label: "Navigation & Layout",
    icons: [
      { name: "ArrowLeft",      Icon: IconArrowLeft },
      { name: "ArrowRight",     Icon: IconArrowRight },
      { name: "ArrowUp",        Icon: IconArrowUp },
      { name: "ArrowDown",      Icon: IconArrowDown },
      { name: "ArrowUpRight",   Icon: IconArrowUpRight },
      { name: "ArrowDownLeft",  Icon: IconArrowDownLeft },
      { name: "ChevronLeft",    Icon: IconChevronLeft },
      { name: "ChevronRight",   Icon: IconChevronRight },
      { name: "ChevronUp",      Icon: IconChevronUp },
      { name: "ChevronDown",    Icon: IconChevronDown },
      { name: "ChevronsLeft",   Icon: IconChevronsLeft },
      { name: "ChevronsRight",  Icon: IconChevronsRight },
      { name: "ChevronsUpDown", Icon: IconChevronsUpDown },
      { name: "ExternalLink",   Icon: IconExternalLink },
      { name: "Home",           Icon: IconHome },
      { name: "Menu",           Icon: IconMenu },
      { name: "PanelLeft",      Icon: IconPanelLeft },
      { name: "PanelRight",     Icon: IconPanelRight },
      { name: "SidebarOpen",    Icon: IconSidebarOpen },
      { name: "SidebarClose",   Icon: IconSidebarClose },
      { name: "LayoutGrid",     Icon: IconLayoutGrid },
      { name: "LayoutList",     Icon: IconLayoutList },
      { name: "Columns",        Icon: IconColumns },
      { name: "Rows",           Icon: IconRows },
    ],
  },
  {
    label: "Actions",
    icons: [
      { name: "Check",           Icon: IconCheck },
      { name: "X",               Icon: IconX },
      { name: "Plus",            Icon: IconPlus },
      { name: "Minus",           Icon: IconMinus },
      { name: "Trash",           Icon: IconTrash },
      { name: "Edit",            Icon: IconEdit },
      { name: "Pencil",          Icon: IconPencil },
      { name: "Copy",            Icon: IconCopy },
      { name: "Clipboard",       Icon: IconClipboard },
      { name: "ClipboardCheck",  Icon: IconClipboardCheck },
      { name: "Download",        Icon: IconDownload },
      { name: "Upload",          Icon: IconUpload },
      { name: "Search",          Icon: IconSearch },
      { name: "Filter",          Icon: IconFilter },
      { name: "SortAsc",         Icon: IconSortAsc },
      { name: "SortDesc",        Icon: IconSortDesc },
      { name: "Refresh",         Icon: IconRefresh },
      { name: "Undo",            Icon: IconUndo },
      { name: "Redo",            Icon: IconRedo },
      { name: "Move",            Icon: IconMove },
      { name: "Maximize",        Icon: IconMaximize },
      { name: "Minimize",        Icon: IconMinimize },
      { name: "Expand",          Icon: IconExpand },
      { name: "Shrink",          Icon: IconShrink },
      { name: "Pin",             Icon: IconPin },
      { name: "PinOff",          Icon: IconPinOff },
      { name: "Lock",            Icon: IconLock },
      { name: "Unlock",          Icon: IconUnlock },
      { name: "ZoomIn",          Icon: IconZoomIn },
      { name: "ZoomOut",         Icon: IconZoomOut },
    ],
  },
  {
    label: "Status & Feedback",
    icons: [
      { name: "AlertCircle",   Icon: IconAlertCircle },
      { name: "AlertTriangle", Icon: IconAlertTriangle },
      { name: "CheckCircle",   Icon: IconCheckCircle },
      { name: "Info",          Icon: IconInfo },
      { name: "XCircle",       Icon: IconXCircle },
      { name: "Loader",        Icon: IconLoader },
      { name: "CircleDot",     Icon: IconCircleDot },
      { name: "Circle",        Icon: IconCircle },
      { name: "CircleOff",     Icon: IconCircleOff },
      { name: "Dot",           Icon: IconDot },
      { name: "BadgeCheck",    Icon: IconBadgeCheck },
      { name: "BadgeAlert",    Icon: IconBadgeAlert },
      { name: "ShieldCheck",   Icon: IconShieldCheck },
      { name: "ShieldAlert",   Icon: IconShieldAlert },
      { name: "ShieldX",       Icon: IconShieldX },
    ],
  },
  {
    label: "System / OS / Infrastructure",
    icons: [
      { name: "Cpu",             Icon: IconCpu },
      { name: "Server",          Icon: IconServer },
      { name: "Database",        Icon: IconDatabase },
      { name: "HardDrive",       Icon: IconHardDrive },
      { name: "HardDriveDown",   Icon: IconHardDriveDownload },
      { name: "Network",         Icon: IconNetwork },
      { name: "Wifi",            Icon: IconWifi },
      { name: "WifiOff",         Icon: IconWifiOff },
      { name: "Cloud",           Icon: IconCloud },
      { name: "CloudOff",        Icon: IconCloudOff },
      { name: "CloudUpload",     Icon: IconCloudUpload },
      { name: "CloudDownload",   Icon: IconCloudDownload },
      { name: "Globe",           Icon: IconGlobe },
      { name: "Binary",          Icon: IconBinary },
      { name: "Code",            Icon: IconCode },
      { name: "CodeXml",         Icon: IconCodeXml },
      { name: "Terminal",        Icon: IconTerminal },
      { name: "SqTerminal",      Icon: IconSquareTerminal },
      { name: "Braces",          Icon: IconBraces },
      { name: "Brackets",        Icon: IconBrackets },
      { name: "Hash",            Icon: IconHash },
      { name: "Variable",        Icon: IconVariable },
      { name: "Workflow",        Icon: IconWorkflow },
      { name: "GitBranch",       Icon: IconGitBranch },
      { name: "GitMerge",        Icon: IconGitMerge },
      { name: "GitPR",           Icon: IconGitPullRequest },
      { name: "GitCommit",       Icon: IconGitCommit },
      { name: "Webhook",         Icon: IconWebhook },
      { name: "Activity",        Icon: IconActivity },
      { name: "Gauge",           Icon: IconGauge },
      { name: "BarChart",        Icon: IconBarChart },
      { name: "BarChart3",       Icon: IconBarChart3 },
      { name: "LineChart",       Icon: IconLineChart },
      { name: "PieChart",        Icon: IconPieChart },
      { name: "Radio",           Icon: IconRadio },
      { name: "Signal",          Icon: IconSignal },
      { name: "Rss",             Icon: IconRss },
      { name: "Zap",             Icon: IconZap },
    ],
  },
  {
    label: "Departments / Modules / AI",
    icons: [
      { name: "Building",        Icon: IconBuilding },
      { name: "Briefcase",       Icon: IconBriefcase },
      { name: "Kanban",          Icon: IconKanban },
      { name: "Dashboard",       Icon: IconDashboard },
      { name: "Boxes",           Icon: IconBoxes },
      { name: "Box",             Icon: IconBox },
      { name: "Layers",          Icon: IconLayers },
      { name: "Layers2",         Icon: IconLayers2 },
      { name: "Component",       Icon: IconComponent },
      { name: "Puzzle",          Icon: IconPuzzle },
      { name: "Blocks",          Icon: IconBlocks },
      { name: "AppWindow",       Icon: IconAppWindow },
      { name: "Monitor",         Icon: IconMonitor },
      { name: "Bot",             Icon: IconBot },
      { name: "Brain",           Icon: IconBrain },
      { name: "Sparkles",        Icon: IconSparkles },
      { name: "Wand",            Icon: IconWand },
      { name: "Scan",            Icon: IconScan },
      { name: "Crosshair",       Icon: IconCrosshair },
      { name: "Focus",           Icon: IconFocus },
      { name: "Target",          Icon: IconTarget },
      { name: "Siren",           Icon: IconSiren },
      { name: "ShieldEllipsis",  Icon: IconShieldEllipsis },
    ],
  },
  {
    label: "People & Org",
    icons: [
      { name: "User",        Icon: IconUser },
      { name: "Users",       Icon: IconUsers },
      { name: "UserPlus",    Icon: IconUserPlus },
      { name: "UserMinus",   Icon: IconUserMinus },
      { name: "UserCheck",   Icon: IconUserCheck },
      { name: "UserX",       Icon: IconUserX },
      { name: "UserCog",     Icon: IconUserCog },
      { name: "UserCircle",  Icon: IconUserCircle },
      { name: "Contact",     Icon: IconContact },
      { name: "Crown",       Icon: IconCrown },
      { name: "Award",       Icon: IconAward },
    ],
  },
  {
    label: "UI Controls",
    icons: [
      { name: "Eye",           Icon: IconEye },
      { name: "EyeOff",        Icon: IconEyeOff },
      { name: "Settings",      Icon: IconSettings },
      { name: "Settings2",     Icon: IconSettings2 },
      { name: "Sliders",       Icon: IconSliders },
      { name: "ToggleOff",     Icon: IconToggleOff },
      { name: "ToggleOn",      Icon: IconToggleOn },
      { name: "Bell",          Icon: IconBell },
      { name: "BellOff",       Icon: IconBellOff },
      { name: "BellRing",      Icon: IconBellRing },
      { name: "Star",          Icon: IconStar },
      { name: "Bookmark",      Icon: IconBookmark },
      { name: "Share",         Icon: IconShare },
      { name: "MoreH",         Icon: IconMoreHorizontal },
      { name: "MoreV",         Icon: IconMoreVertical },
      { name: "Ellipsis",      Icon: IconEllipsis },
      { name: "GripV",         Icon: IconGripVertical },
      { name: "GripH",         Icon: IconGripHorizontal },
      { name: "Grab",          Icon: IconGrab },
    ],
  },
  {
    label: "Files & Data",
    icons: [
      { name: "File",          Icon: IconFile },
      { name: "FileText",      Icon: IconFileText },
      { name: "FileCode",      Icon: IconFileCode },
      { name: "FileJson",      Icon: IconFileJson },
      { name: "FileSheet",     Icon: IconFileSpreadsheet },
      { name: "FileCog",       Icon: IconFileCog },
      { name: "FileCheck",     Icon: IconFileCheck },
      { name: "FileX",         Icon: IconFileX },
      { name: "FilePlus",      Icon: IconFilePlus },
      { name: "FileMinus",     Icon: IconFileMinus },
      { name: "Folder",        Icon: IconFolder },
      { name: "FolderOpen",    Icon: IconFolderOpen },
      { name: "FolderPlus",    Icon: IconFolderPlus },
      { name: "FolderTree",    Icon: IconFolderTree },
      { name: "Image",         Icon: IconImage },
      { name: "Link",          Icon: IconLink },
      { name: "LinkOff",       Icon: IconLinkOff },
      { name: "Table",         Icon: IconTable },
      { name: "Sheet",         Icon: IconSheet },
    ],
  },
  {
    label: "Time",
    icons: [
      { name: "Clock",          Icon: IconClock },
      { name: "Clock3",         Icon: IconClock3 },
      { name: "Timer",          Icon: IconTimer },
      { name: "TimerOff",       Icon: IconTimerOff },
      { name: "Calendar",       Icon: IconCalendar },
      { name: "CalendarDays",   Icon: IconCalendarDays },
      { name: "CalendarCheck",  Icon: IconCalendarCheck },
      { name: "History",        Icon: IconHistory },
      { name: "Hourglass",      Icon: IconHourglass },
    ],
  },
  {
    label: "Communication",
    icons: [
      { name: "Mail",         Icon: IconMail },
      { name: "MailOpen",     Icon: IconMailOpen },
      { name: "Message",      Icon: IconMessage },
      { name: "MessagePlus",  Icon: IconMessagePlus },
      { name: "Messages",     Icon: IconMessages },
      { name: "Phone",        Icon: IconPhone },
      { name: "PhoneCall",    Icon: IconPhoneCall },
      { name: "PhoneOff",     Icon: IconPhoneOff },
      { name: "Video",        Icon: IconVideo },
      { name: "VideoOff",     Icon: IconVideoOff },
      { name: "Mic",          Icon: IconMic },
      { name: "MicOff",       Icon: IconMicOff },
      { name: "Send",         Icon: IconSend },
      { name: "Reply",        Icon: IconReply },
      { name: "Forward",      Icon: IconForward },
      { name: "At",           Icon: IconAt },
    ],
  },
  {
    label: "Finance & Commerce",
    icons: [
      { name: "TrendingUp",   Icon: IconTrendingUp },
      { name: "TrendingDown", Icon: IconTrendingDown },
      { name: "Dollar",       Icon: IconDollar },
      { name: "CreditCard",   Icon: IconCreditCard },
      { name: "Receipt",      Icon: IconReceipt },
      { name: "Wallet",       Icon: IconWallet },
      { name: "Package",      Icon: IconPackage },
      { name: "Package2",     Icon: IconPackage2 },
      { name: "Truck",        Icon: IconTruck },
      { name: "Cart",         Icon: IconCart },
    ],
  },
  {
    label: "Misc & System",
    icons: [
      { name: "Sun",         Icon: IconSun },
      { name: "Moon",        Icon: IconMoon },
      { name: "Tag",         Icon: IconTag },
      { name: "Tags",        Icon: IconTags },
      { name: "Flag",        Icon: IconFlag },
      { name: "FlagOff",     Icon: IconFlagOff },
      { name: "Key",         Icon: IconKey },
      { name: "KeyRound",    Icon: IconKeyRound },
      { name: "QrCode",      Icon: IconQrCode },
      { name: "Fingerprint", Icon: IconFingerprint },
      { name: "Power",       Icon: IconPower },
      { name: "PowerOff",    Icon: IconPowerOff },
      { name: "Plug",        Icon: IconPlug },
      { name: "PlugZap",     Icon: IconPlugZap },
      { name: "Slash",       Icon: IconSlash },
    ],
  },

  // ── Vepartment Platform Icons ──────────────────────────────────────────

  {
    label: "Core System (Workspace / Vepartment / Domain / Agent)",
    icons: [
      { name: "Workspace",    Icon: IconLayoutGrid },
      { name: "Vepartment",   Icon: IconComponent },
      { name: "Domain",       Icon: IconMap },
      { name: "Agent",        Icon: IconBot },
      { name: "Run",          Icon: IconPlay },
      { name: "Artifact",     Icon: IconArchive },
      { name: "Signal",       Icon: IconActivity },
      { name: "Policy",       Icon: IconScale },
    ],
  },
  {
    label: "Operational Layers (Foundation → Innovation)",
    icons: [
      { name: "Foundation",   Icon: IconLayers },
      { name: "Strategy",     Icon: IconCompass },
      { name: "Execution",    Icon: IconPlay },
      { name: "Monitoring",   Icon: IconGauge },
      { name: "Growth",       Icon: IconTrendingUp },
      { name: "Innovation",   Icon: IconLightbulb },
    ],
  },
  {
    label: "Agent System",
    icons: [
      { name: "AgentDir",     Icon: IconBookUser },
      { name: "WorkerAgent",  Icon: IconWrench },
      { name: "MgrAgent",     Icon: IconCrown },
      { name: "GovAgent",     Icon: IconScale },
      { name: "AgentNetwork", Icon: IconNetwork },
      { name: "AgentTask",    Icon: IconClipboardList },
      { name: "AgentMemory",  Icon: IconBrain },
      { name: "AgentConfig",  Icon: IconCog },
    ],
  },
  {
    label: "Knowledge System",
    icons: [
      { name: "KnowledgeBase", Icon: IconBookOpen },
      { name: "KnowLibrary",   Icon: IconLibrary },
      { name: "Dataset",       Icon: IconDatabase },
      { name: "VectorStore",   Icon: IconBinary },
      { name: "Context",       Icon: IconAlignLeft },
      { name: "Sources",       Icon: IconFolderOpen },
    ],
  },
  {
    label: "Workflow & Automation",
    icons: [
      { name: "Workflow",     Icon: IconWorkflow },
      { name: "Pipeline",     Icon: IconArrowRightLeft },
      { name: "Automation",   Icon: IconZap },
      { name: "Trigger",      Icon: IconPlayCircle },
      { name: "Loop",         Icon: IconRepeat2 },
    ],
  },
  {
    label: "Governance & Control",
    icons: [
      { name: "Approval",     Icon: IconThumbsUp },
      { name: "AuditLog",     Icon: IconScrollText },
      { name: "Compliance",   Icon: IconShieldCheck },
      { name: "Permissions",  Icon: IconKey },
      { name: "Security",     Icon: IconShield },
    ],
  },
  {
    label: "Monitoring & Metrics",
    icons: [
      { name: "KPI",          Icon: IconGauge },
      { name: "Trend",        Icon: IconTrendingUp },
      { name: "Alert",        Icon: IconBell },
      { name: "Health",       Icon: IconHeart },
      { name: "Confidence",   Icon: IconPercent },
    ],
  },
  {
    label: "Output & Artifacts",
    icons: [
      { name: "Document",     Icon: IconFileText },
      { name: "Table",        Icon: IconTable },
      { name: "Report",       Icon: IconFileBarChart },
      { name: "Dashboard",    Icon: IconDashboard },
      { name: "Export",       Icon: IconDownload },
    ],
  },
  {
    label: "Interaction",
    icons: [
      { name: "Chat",         Icon: IconMessage },
      { name: "Prompt",       Icon: IconTerminal },
      { name: "Command",      Icon: IconSquareTerminal },
      { name: "Search",       Icon: IconSearch },
      { name: "Filter",       Icon: IconFilter },
    ],
  },
];

// ── Custom geometric icons ─────────────────────────────────────────────────────

const hasIcons: IconEntry[] = [
  { name: "HAS 1 · Insight",    Icon: IconHAS1Insight },
  { name: "HAS 2 · Suggest",    Icon: IconHAS2Suggestion },
  { name: "HAS 3 · Assist",     Icon: IconHAS3Assist },
  { name: "HAS 4 · Execute",    Icon: IconHAS4Execute },
  { name: "HAS 5 · Autonomous", Icon: IconHAS5Autonomous },
  { name: "HAS System",         Icon: IconHASSystem },
];

const departmentIcons: IconEntry[] = [
  { name: "Marketing",     Icon: IconMarketing },
  { name: "Branding",      Icon: IconBranding },
  { name: "Product",       Icon: IconProduct },
  { name: "Sales",         Icon: IconSales },
  { name: "Sustainability",Icon: IconSustainability },
  { name: "Scouting",      Icon: IconScouting },
  { name: "Operations",    Icon: IconOperations },
  { name: "Finance",       Icon: IconFinanceDept },
  { name: "HR / Talent",   Icon: IconHRTalent },
];

const domainIcons: IconEntry[] = [
  { name: "Campaign",          Icon: IconCampaign },
  { name: "Content",           Icon: IconContent },
  { name: "Performance",       Icon: IconPerformance },
  { name: "Cust. Insights",    Icon: IconCustomerInsights },
  { name: "Product Dev",       Icon: IconProductDev },
  { name: "E-commerce",        Icon: IconEcommerce },
  { name: "Inventory",         Icon: IconInventory },
  { name: "Archive Box",       Icon: IconArchiveBox },
  { name: "Trend Analysis",    Icon: IconTrendAnalysis },
  { name: "Innovation Lab",    Icon: IconInnovationLab },
];

function IconTile({ name, Icon }: IconEntry) {
  return (
    <div className="flex flex-col items-center gap-2 border border-border bg-transparent p-3 hover:border-border-subtle hover:bg-surface transition-colors">
      <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
      <span className="text-label-sm text-foreground-dim text-center leading-tight">{name}</span>
    </div>
  );
}

export default function IconsPage() {
  return (
    <Frame
      group="07 · Icons"
      title="Icons"
      description="lucide-react + custom Vepartment SVGs · 1.5px stroke · import via @/components/icons"
    >
      {/* ── Size scale ────────────────────────────────────────────────── */}
      <Block label="Size Scale">
        <div className="flex flex-wrap items-end gap-8">
          {[
            { size: "h-3 w-3",  label: "12px" },
            { size: "h-4 w-4",  label: "16px — default" },
            { size: "h-5 w-5",  label: "20px" },
            { size: "h-6 w-6",  label: "24px" },
            { size: "h-8 w-8",  label: "32px" },
          ].map((s) => (
            <div key={s.size} className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center border border-border p-3">
                <IconCpu className={s.size} strokeWidth={1.5} />
              </div>
              <span className="text-label-md text-foreground-dim">{s.label}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* ── HAS icons — highlighted section ──────────────────────────── */}
      <Block
        label="HAS — Human Agency Scale"
        hint="Custom geometric icons. Each level increases AI autonomy. Import via @/components/icons"
      >
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {hasIcons.map((icon) => (
            <div
              key={icon.name}
              className="flex flex-col items-center gap-3 border border-primary/30 bg-surface p-4 hover:border-primary transition-colors"
            >
              <icon.Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              <span className="text-label-sm text-foreground-muted text-center leading-tight">{icon.name}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Department icons ─────────────────────────────────────────── */}
      <Block
        label="Department Icons"
        hint="Custom geometric icons for Vepartment departments. Square outer frame + inner motif."
      >
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {departmentIcons.map((icon) => (
            <div
              key={icon.name}
              className="flex flex-col items-center gap-3 border border-border bg-surface p-4 hover:border-foreground-dim transition-colors"
            >
              <icon.Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              <span className="text-label-sm text-foreground-muted text-center leading-tight">{icon.name}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Domain icons ──────────────────────────────────────────────── */}
      <Block
        label="Domain Icons (Workflows)"
        hint="Custom geometric icons for Vepartment workflow domains."
      >
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {domainIcons.map((icon) => (
            <div
              key={icon.name}
              className="flex flex-col items-center gap-3 border border-border bg-surface p-4 hover:border-foreground-dim transition-colors"
            >
              <icon.Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              <span className="text-label-sm text-foreground-muted text-center leading-tight">{icon.name}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* ── All icon groups ───────────────────────────────────────────── */}
      {iconGroups.map((group) => (
        <Block key={group.label} label={group.label}>
          <div className="grid grid-cols-6 gap-1 sm:grid-cols-8 lg:grid-cols-12">
            {group.icons.map((icon) => (
              <IconTile key={icon.name} {...icon} />
            ))}
          </div>
        </Block>
      ))}

      {/* ── Usage ─────────────────────────────────────────────────────── */}
      <Block label="Usage" hint="Always import from the barrel — never directly from lucide-react">
        <pre className="border border-border bg-surface px-6 py-5 text-code-md overflow-x-auto">
{`// lucide-based icons
import { IconPlay, IconArchive, IconScale } from "@/components/icons";

// HAS icons (Human Agency Scale)
import { IconHAS1Insight, IconHAS3Assist, IconHASSystem } from "@/components/icons";
import { IconHAS1, IconHAS2, IconHAS3, IconHAS4, IconHAS5 } from "@/components/icons"; // short aliases

// Department icons
import { IconMarketing, IconBranding, IconProduct, IconSales } from "@/components/icons";
import { IconSustainability, IconScouting, IconOperations } from "@/components/icons";
import { IconFinanceDept, IconHRTalent } from "@/components/icons";

// Domain icons
import { IconCampaign, IconContent, IconPerformance } from "@/components/icons";
import { IconCustomerInsights, IconProductDev, IconEcommerce } from "@/components/icons";
import { IconInventory, IconArchiveBox, IconTrendAnalysis, IconInnovationLab } from "@/components/icons";

// In JSX — all accept same props as lucide icons:
<IconHAS3Assist className="h-5 w-5" strokeWidth={1.5} />
<IconMarketing size={24} strokeWidth={1.5} />`}
        </pre>
      </Block>
    </Frame>
  );
}
