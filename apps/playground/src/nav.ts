/**
 * Sidebar navigation map for the playground.
 * Top-level sections render as <SidebarNavSection>. Component categories render
 * as nested <SidebarNavParent>s inside the "Components" section so users can
 * collapse the categories they're not working in.
 */
import type { IconSvgElement } from "@hugeicons/react"
import {
  HomeIcon,
  PaintBoardIcon,
  TextIcon,
  RulerIcon,
  SparklesIcon,
  Minimize02Icon,
  CursorMagicSelection01Icon,
  PlusSignSquareIcon,
  AlertCircleIcon,
  Layers01Icon,
  TableIcon,
  ArrowRight01Icon,
  PuzzleIcon,
  // Component-level icons
  Tick02Icon,
  Search01Icon,
  DollarCircleIcon,
  ToggleOnIcon,
  CheckmarkSquare02Icon,
  RadioIcon,
  ArrowDown01Icon,
  TextAlignLeftIcon,
  PlusMinus01Icon,
  Calendar03Icon,
  TagIcon,
  CloudUploadIcon,
  TextSquareIcon,
  CircleArrowDataTransferDiagonalIcon,
  Notification03Icon,
  Loading03Icon,
  StickyNote01Icon,
  ChartLineData01Icon,
  Square01Icon,
  SearchList01Icon,
  Database01Icon,
  RotateClockwiseIcon,
  Edit02Icon,
  ArrowRight02Icon,
  CheckListIcon,
  FilterIcon,
  ChartUpIcon,
  Album02Icon,
  File01Icon,
  LayoutLeftIcon,
  Folder01Icon,
  UserMultiple02Icon,
  Settings02Icon,
  Activity01Icon,
  KeyboardIcon,
  ImageDone01Icon,
  WorkflowSquare01Icon,
  ListViewIcon,
  Drag01Icon,
  Comment01Icon,
} from "@hugeicons/core-free-icons"

export type NavStatus = "done" | "todo"

export interface NavEntry {
  label: string
  path: string
  status: NavStatus
  icon?: IconSvgElement
}

export interface NavCategory {
  title: string
  icon?: IconSvgElement
  entries: NavEntry[]
}

export interface NavSection {
  /** Section title rendered as the SidebarNavSection title */
  title: string
  /** Flat entries (e.g. Get started, Foundations) */
  entries?: NavEntry[]
  /** Nested categories rendered as collapsible parents (Components only) */
  categories?: NavCategory[]
}

export const NAV: NavSection[] = [
  {
    title: "Get started",
    entries: [
      { label: "Introduction", path: "/", status: "done", icon: HomeIcon },
    ],
  },
  {
    title: "Foundations",
    entries: [
      { label: "Color tokens", path: "/foundations/color", status: "done", icon: PaintBoardIcon },
      { label: "Typography", path: "/foundations/typography", status: "done", icon: TextIcon },
      { label: "Spacing & radius", path: "/foundations/spacing", status: "done", icon: RulerIcon },
      { label: "Iconography", path: "/foundations/icons", status: "done", icon: SparklesIcon },
      { label: "Density", path: "/foundations/density", status: "done", icon: Minimize02Icon },
    ],
  },
  {
    title: "Components",
    categories: [
      {
        title: "Actions",
        icon: CursorMagicSelection01Icon,
        entries: [
          { label: "Button", path: "/components/button", status: "done", icon: CursorMagicSelection01Icon },
          { label: "Button Group", path: "/components/button-group", status: "done", icon: PlusSignSquareIcon },
          { label: "Dropdown Menu", path: "/components/dropdown-menu", status: "done", icon: ListViewIcon },
          { label: "Segmented Control", path: "/components/segmented-control", status: "done", icon: ToggleOnIcon },
          { label: "Chip / Clickable Chip", path: "/components/chip", status: "done", icon: TagIcon },
        ],
      },
      {
        title: "Forms",
        icon: TextIcon,
        entries: [
          { label: "Input", path: "/components/input", status: "done", icon: TextIcon },
          { label: "Search Field", path: "/components/search-field", status: "done", icon: Search01Icon },
          { label: "Money Field", path: "/components/money-field", status: "done", icon: DollarCircleIcon },
          { label: "Switch", path: "/components/switch", status: "done", icon: ToggleOnIcon },
          { label: "Checkbox", path: "/components/checkbox", status: "done", icon: CheckmarkSquare02Icon },
          { label: "Choice List", path: "/components/choice-list", status: "done", icon: RadioIcon },
          { label: "Select", path: "/components/select", status: "done", icon: ArrowDown01Icon },
          { label: "Textarea", path: "/components/textarea", status: "done", icon: TextAlignLeftIcon },
          { label: "Number Stepper", path: "/components/number-stepper", status: "done", icon: PlusMinus01Icon },
          { label: "Date Picker", path: "/components/date-picker", status: "done", icon: Calendar03Icon },
          { label: "Tag / Chip Input", path: "/components/chip-input", status: "done", icon: TagIcon },
          { label: "File Upload", path: "/components/file-upload", status: "done", icon: CloudUploadIcon },
          { label: "Floating Label Input", path: "/components/floating-label", status: "done", icon: TextSquareIcon },
        ],
      },
      {
        title: "Feedback",
        icon: AlertCircleIcon,
        entries: [
          { label: "Badge", path: "/components/badge", status: "done", icon: Tick02Icon },
          { label: "Banner", path: "/components/banner", status: "done", icon: AlertCircleIcon },
          { label: "Spinner", path: "/components/spinner", status: "done", icon: Loading03Icon },
          { label: "Tooltip", path: "/components/tooltip", status: "done", icon: StickyNote01Icon },
          { label: "Toast", path: "/components/toast", status: "done", icon: Notification03Icon },
          { label: "Empty State", path: "/components/empty-state", status: "done", icon: StickyNote01Icon },
          { label: "Skeleton", path: "/components/skeleton", status: "done", icon: Database01Icon },
          { label: "Auto-Save Status", path: "/components/auto-save", status: "done", icon: RotateClockwiseIcon },
        ],
      },
      {
        title: "Overlays",
        icon: Layers01Icon,
        entries: [
          { label: "Modal", path: "/components/modal", status: "done", icon: Square01Icon },
          { label: "Drawer", path: "/components/drawer", status: "done", icon: Layers01Icon },
          { label: "Popover", path: "/components/popover", status: "done", icon: Square01Icon },
          { label: "Command Palette", path: "/components/command-palette", status: "done", icon: SearchList01Icon },
          { label: "Keyboard Cheatsheet", path: "/components/cheatsheet", status: "done", icon: KeyboardIcon },
          { label: "Shortcut Hint", path: "/components/shortcut-hint", status: "done", icon: KeyboardIcon },
        ],
      },
      {
        title: "Data display",
        icon: TableIcon,
        entries: [
          { label: "Table", path: "/components/table", status: "done", icon: TableIcon },
          { label: "Inline Edit", path: "/components/inline-edit", status: "done", icon: Edit02Icon },
          { label: "Sticky Columns", path: "/components/sticky-columns", status: "done", icon: Drag01Icon },
          { label: "Bulk Actions Bar", path: "/components/bulk-actions", status: "done", icon: CheckListIcon },
          { label: "Saved Filters", path: "/components/saved-filters", status: "done", icon: FilterIcon },
          { label: "Pagination", path: "/components/pagination", status: "done", icon: ArrowRight02Icon },
          { label: "Sparklines", path: "/components/sparklines", status: "done", icon: ChartLineData01Icon },
          { label: "Workflow Timeline", path: "/components/workflow-timeline", status: "done", icon: WorkflowSquare01Icon },
          { label: "Import Preview", path: "/components/import-preview", status: "done", icon: CircleArrowDataTransferDiagonalIcon },
        ],
      },
      {
        title: "Navigation",
        icon: ArrowRight01Icon,
        entries: [
          { label: "Tabs", path: "/components/tabs", status: "done", icon: Folder01Icon },
          { label: "Breadcrumbs", path: "/components/breadcrumbs", status: "done", icon: ArrowRight02Icon },
          { label: "Stepper / Wizard", path: "/components/stepper", status: "done", icon: ChartUpIcon },
          { label: "Sidebar Nav", path: "/components/sidebar-nav", status: "done", icon: LayoutLeftIcon },
          { label: "Page Shell", path: "/components/page-shell", status: "done", icon: File01Icon },
          { label: "Doc Shell (App Layout)", path: "/components/doc-shell", status: "done", icon: LayoutLeftIcon },
        ],
      },
      {
        title: "Misc",
        icon: PuzzleIcon,
        entries: [
          { label: "Avatar", path: "/components/avatar", status: "done", icon: ImageDone01Icon },
          { label: "Avatar Group", path: "/components/avatar-group", status: "done", icon: UserMultiple02Icon },
          { label: "Accordion", path: "/components/accordion", status: "done", icon: Album02Icon },
          { label: "Progress", path: "/components/progress", status: "done", icon: Activity01Icon },
          { label: "Keycap", path: "/components/keycap", status: "done", icon: KeyboardIcon },
        ],
      },
    ],
  },
  {
    title: "Templates",
    entries: [
      { label: "Dashboard", path: "/templates/dashboard", status: "done", icon: ChartUpIcon },
      { label: "CRUD List", path: "/templates/crud-list", status: "done", icon: TableIcon },
      { label: "Settings", path: "/templates/settings", status: "done", icon: Settings02Icon },
      { label: "Record Detail", path: "/templates/detail", status: "done", icon: File01Icon },
    ],
  },
  {
    title: "Blocks",
    entries: [
      { label: "Overview", path: "/blocks", status: "done", icon: PuzzleIcon },
      { label: "Stat cards", path: "/blocks/stat-cards", status: "done", icon: ChartUpIcon },
      { label: "Data table", path: "/blocks/data-table", status: "done", icon: TableIcon },
      { label: "Page header", path: "/blocks/page-header", status: "done", icon: File01Icon },
      { label: "Empty state", path: "/blocks/empty-state", status: "done", icon: StickyNote01Icon },
      { label: "Settings section", path: "/blocks/settings-section", status: "done", icon: Settings02Icon },
      { label: "Audit log", path: "/blocks/audit-log", status: "done", icon: WorkflowSquare01Icon },
      { label: "Filter bar", path: "/blocks/filter-bar", status: "done", icon: FilterIcon },
      { label: "Detail card", path: "/blocks/detail-card", status: "done", icon: Album02Icon },
      { label: "Auth card", path: "/blocks/auth-card", status: "done", icon: UserMultiple02Icon },
      { label: "Toolbar", path: "/blocks/toolbar", status: "done", icon: CursorMagicSelection01Icon },
      { label: "Notification feed", path: "/blocks/notification-feed", status: "done", icon: Notification03Icon },
      { label: "Form section", path: "/blocks/form-section", status: "done", icon: CheckListIcon },
      { label: "Pricing cards", path: "/blocks/pricing-cards", status: "done", icon: DollarCircleIcon },
      { label: "Command menu", path: "/blocks/command-menu-trigger", status: "done", icon: SearchList01Icon },
      { label: "Metric comparison", path: "/blocks/metric-comparison", status: "done", icon: ChartLineData01Icon },
      { label: "File list", path: "/blocks/file-list", status: "done", icon: CloudUploadIcon },
      { label: "Comment thread", path: "/blocks/comment-thread", status: "done", icon: Comment01Icon },
      { label: "Wizard", path: "/blocks/wizard", status: "done", icon: ChartUpIcon },
      { label: "Calendar (month)", path: "/blocks/calendar-month", status: "done", icon: Calendar03Icon },
      { label: "Kanban board", path: "/blocks/kanban-board", status: "done", icon: Drag01Icon },
    ],
  },
]
