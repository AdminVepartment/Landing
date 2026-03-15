/**
 * Icon System — Vepartment
 *
 * Source: lucide-react only. No inline SVGs. No other icon libraries.
 * Import always from this barrel — never directly from lucide-react.
 *
 * Usage:
 *   import { IconCheck, IconCpu } from "@/components/icons"
 *
 * Naming: all exports prefixed with "Icon".
 * Stroke: 1.5px (lucide default) — matches Vepartment stroke language.
 *
 * To add a new icon:
 *   1. Find name at https://lucide.dev
 *   2. Add export below with "Icon" prefix alias in the correct category
 */

export {
  // ── Navigation ────────────────────────────────────────────────────────
  ArrowLeft        as IconArrowLeft,
  ArrowRight       as IconArrowRight,
  ArrowUp          as IconArrowUp,
  ArrowDown        as IconArrowDown,
  ArrowUpRight     as IconArrowUpRight,
  ArrowDownLeft    as IconArrowDownLeft,
  ChevronLeft      as IconChevronLeft,
  ChevronRight     as IconChevronRight,
  ChevronUp        as IconChevronUp,
  ChevronDown      as IconChevronDown,
  ChevronsLeft     as IconChevronsLeft,
  ChevronsRight    as IconChevronsRight,
  ChevronsUpDown   as IconChevronsUpDown,
  ExternalLink     as IconExternalLink,
  Home             as IconHome,
  Menu             as IconMenu,
  PanelLeft        as IconPanelLeft,
  PanelRight       as IconPanelRight,
  SidebarOpen      as IconSidebarOpen,
  SidebarClose     as IconSidebarClose,
  LayoutGrid       as IconLayoutGrid,
  LayoutList       as IconLayoutList,
  Columns2         as IconColumns,
  Rows2            as IconRows,

  // ── Actions ───────────────────────────────────────────────────────────
  Check            as IconCheck,
  X                as IconX,
  Plus             as IconPlus,
  Minus            as IconMinus,
  Trash2           as IconTrash,
  Edit2            as IconEdit,
  Pencil           as IconPencil,
  Copy             as IconCopy,
  Clipboard        as IconClipboard,
  ClipboardCheck   as IconClipboardCheck,
  Download         as IconDownload,
  Upload           as IconUpload,
  Search           as IconSearch,
  Filter           as IconFilter,
  SortAsc          as IconSortAsc,
  SortDesc         as IconSortDesc,
  RefreshCw        as IconRefresh,
  RotateCcw        as IconUndo,
  RotateCw         as IconRedo,
  Move             as IconMove,
  Maximize2        as IconMaximize,
  Minimize2        as IconMinimize,
  Expand           as IconExpand,
  Shrink           as IconShrink,
  Pin              as IconPin,
  PinOff           as IconPinOff,
  Lock             as IconLock,
  Unlock           as IconUnlock,
  ZoomIn           as IconZoomIn,
  ZoomOut          as IconZoomOut,

  // ── Status / Feedback ─────────────────────────────────────────────────
  AlertCircle      as IconAlertCircle,
  AlertTriangle    as IconAlertTriangle,
  CheckCircle2     as IconCheckCircle,
  Info             as IconInfo,
  XCircle          as IconXCircle,
  Loader2          as IconLoader,
  CircleDot        as IconCircleDot,
  Circle           as IconCircle,
  CircleOff        as IconCircleOff,
  Dot              as IconDot,
  BadgeCheck       as IconBadgeCheck,
  BadgeAlert       as IconBadgeAlert,
  ShieldCheck      as IconShieldCheck,
  ShieldAlert      as IconShieldAlert,
  ShieldX          as IconShieldX,

  // ── System / OS / Infrastructure ──────────────────────────────────────
  Cpu              as IconCpu,
  Server           as IconServer,
  Database         as IconDatabase,
  HardDrive        as IconHardDrive,
  HardDriveDownload as IconHardDriveDownload,
  Network          as IconNetwork,
  Wifi             as IconWifi,
  WifiOff          as IconWifiOff,
  Cloud            as IconCloud,
  CloudOff         as IconCloudOff,
  CloudUpload      as IconCloudUpload,
  CloudDownload    as IconCloudDownload,
  Globe            as IconGlobe,
  Binary           as IconBinary,
  Code2            as IconCode,
  CodeXml          as IconCodeXml,
  Terminal         as IconTerminal,
  SquareTerminal   as IconSquareTerminal,
  Braces           as IconBraces,
  Brackets         as IconBrackets,
  Hash             as IconHash,
  Variable         as IconVariable,
  Workflow         as IconWorkflow,
  GitBranch        as IconGitBranch,
  GitMerge         as IconGitMerge,
  GitPullRequest   as IconGitPullRequest,
  GitCommit        as IconGitCommit,
  Webhook          as IconWebhook,
  Activity         as IconActivity,
  Gauge            as IconGauge,
  BarChart2        as IconBarChart,
  BarChart3        as IconBarChart3,
  LineChart        as IconLineChart,
  PieChart         as IconPieChart,
  Radio            as IconRadio,
  Signal           as IconSignal,
  Rss              as IconRss,
  Zap              as IconZap,

  // ── Departments / Modules ─────────────────────────────────────────────
  Building2        as IconBuilding,
  Briefcase        as IconBriefcase,
  FolderKanban     as IconKanban,
  LayoutDashboard  as IconDashboard,
  Boxes            as IconBoxes,
  Box              as IconBox,
  Layers           as IconLayers,
  Layers2          as IconLayers2,
  Component        as IconComponent,
  Puzzle           as IconPuzzle,
  Blocks           as IconBlocks,
  AppWindow        as IconAppWindow,
  MonitorDot       as IconMonitor,
  Laptop           as IconLaptop,
  Tablet           as IconTablet,
  Smartphone       as IconSmartphone,
  Bot              as IconBot,
  BrainCircuit     as IconBrain,
  Sparkles         as IconSparkles,
  Wand2            as IconWand,
  ScanLine         as IconScan,
  Crosshair        as IconCrosshair,
  Focus            as IconFocus,
  Target           as IconTarget,
  Siren            as IconSiren,
  ShieldEllipsis   as IconShieldEllipsis,

  // ── People / Org ──────────────────────────────────────────────────────
  User             as IconUser,
  Users            as IconUsers,
  UserPlus         as IconUserPlus,
  UserMinus        as IconUserMinus,
  UserCheck        as IconUserCheck,
  UserX            as IconUserX,
  UserCog          as IconUserCog,
  CircleUser       as IconUserCircle,
  Contact          as IconContact,
  Crown            as IconCrown,
  Award            as IconAward,

  // ── UI Controls ───────────────────────────────────────────────────────
  Eye              as IconEye,
  EyeOff           as IconEyeOff,
  Save             as IconSave,
  RefreshCw        as IconRefreshCw,
  Settings         as IconSettings,
  Settings2        as IconSettings2,
  SlidersHorizontal as IconSliders,
  ToggleLeft       as IconToggleOff,
  ToggleRight      as IconToggleOn,
  Bell             as IconBell,
  BellOff          as IconBellOff,
  BellRing         as IconBellRing,
  Star             as IconStar,
  Bookmark         as IconBookmark,
  Share2           as IconShare,
  MoreHorizontal   as IconMoreHorizontal,
  MoreVertical     as IconMoreVertical,
  Ellipsis         as IconEllipsis,
  GripVertical     as IconGripVertical,
  GripHorizontal   as IconGripHorizontal,
  Grab             as IconGrab,

  // ── File / Data ───────────────────────────────────────────────────────
  File             as IconFile,
  FileText         as IconFileText,
  FileCode2        as IconFileCode,
  FileJson2        as IconFileJson,
  FileSpreadsheet  as IconFileSpreadsheet,
  FileCog          as IconFileCog,
  FileCheck2       as IconFileCheck,
  FileX2           as IconFileX,
  FilePlus2        as IconFilePlus,
  FileMinus2       as IconFileMinus,
  Folder           as IconFolder,
  FolderOpen       as IconFolderOpen,
  FolderPlus       as IconFolderPlus,
  FolderTree       as IconFolderTree,
  Image            as IconImage,
  Link             as IconLink,
  Link2Off         as IconLinkOff,
  Table2           as IconTable,
  Sheet            as IconSheet,

  // ── Time ──────────────────────────────────────────────────────────────
  Clock            as IconClock,
  Clock3           as IconClock3,
  Timer            as IconTimer,
  TimerOff         as IconTimerOff,
  Calendar         as IconCalendar,
  CalendarDays     as IconCalendarDays,
  CalendarCheck2   as IconCalendarCheck,
  History          as IconHistory,
  Hourglass        as IconHourglass,

  // ── Communication ─────────────────────────────────────────────────────
  Mail             as IconMail,
  MailOpen         as IconMailOpen,
  MessageSquare    as IconMessage,
  MessageSquarePlus as IconMessagePlus,
  MessagesSquare   as IconMessages,
  Phone            as IconPhone,
  PhoneCall        as IconPhoneCall,
  PhoneOff         as IconPhoneOff,
  Video            as IconVideo,
  VideoOff         as IconVideoOff,
  Mic              as IconMic,
  MicOff           as IconMicOff,
  Send             as IconSend,
  Reply            as IconReply,
  Forward          as IconForward,
  AtSign           as IconAt,

  // ── Finance / Commerce ────────────────────────────────────────────────
  TrendingUp       as IconTrendingUp,
  TrendingDown     as IconTrendingDown,
  DollarSign       as IconDollar,
  CreditCard       as IconCreditCard,
  Receipt          as IconReceipt,
  Wallet           as IconWallet,
  Package          as IconPackage,
  Package2         as IconPackage2,
  Truck            as IconTruck,
  ShoppingCart     as IconCart,

  // ── Misc ──────────────────────────────────────────────────────────────
  Sun              as IconSun,
  Moon             as IconMoon,
  Tag              as IconTag,
  Tags             as IconTags,
  Flag             as IconFlag,
  FlagOff          as IconFlagOff,
  Key              as IconKey,
  KeyRound         as IconKeyRound,
  QrCode           as IconQrCode,
  Fingerprint      as IconFingerprint,
  Power            as IconPower,
  PowerOff         as IconPowerOff,
  Plug             as IconPlug,
  PlugZap          as IconPlugZap,
  Slash            as IconSlash,
  BookOpenCheck    as IconBookOpenCheck,
  Rocket           as IconRocket,
  CircleCheckBig   as IconCircleCheckBig,

  // ── Vepartment System — Core concepts ─────────────────────────────────
  Play             as IconPlay,           // Run / Execution / Trigger
  PlayCircle       as IconPlayCircle,     // Trigger (circular)
  Archive          as IconArchive,        // Artifact / stored output
  Scale            as IconScale,          // Policy / governance balance
  Compass          as IconCompass,        // Strategy / direction
  Map              as IconMap,            // Domain / planning map
  Lightbulb        as IconLightbulb,      // Innovation / Insight
  Cog              as IconCog,            // Worker Agent config

  // ── Vepartment — Agent System ──────────────────────────────────────────
  BookUser         as IconBookUser,       // Agent Directory
  Wrench           as IconWrench,         // Worker Agent (WRK)
  ClipboardList    as IconClipboardList,  // Agent Task / Audit Log

  // ── Vepartment — Knowledge System ─────────────────────────────────────
  BookOpen         as IconBookOpen,       // Knowledge Base
  Library          as IconLibrary,        // Knowledge collection
  AlignLeft        as IconAlignLeft,      // Context / prompt context

  // ── Vepartment — Workflow & Automation ────────────────────────────────
  ArrowRightLeft   as IconArrowRightLeft, // Pipeline / data flow
  Repeat2          as IconRepeat2,        // Loop / repeated process

  // ── Vepartment — Governance & Control ────────────────────────────────
  ThumbsUp         as IconThumbsUp,       // Approval
  ScrollText       as IconScrollText,     // Audit Log / system history
  Shield           as IconShield,         // Security (plain)

  // ── Vepartment — Monitoring & Health ─────────────────────────────────
  Heart            as IconHeart,          // System Health
  Percent          as IconPercent,        // Confidence Score

  // ── Vepartment — Output & Reports ────────────────────────────────────
  FileBarChart2    as IconFileBarChart,   // Report / compiled insights
} from "lucide-react";

// Re-export custom Vepartment SVG icons (HAS system + brand icons)
export * from "./vepartment";

// Re-export the base type for sizing/styling
export type { LucideProps as IconProps } from "lucide-react";
