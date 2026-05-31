/**
 * @atrium/ui — public API
 * Source of truth: design.md
 */

// Utilities
export { cn } from "./lib/cn"
export {
  useScrollOverlay,
  type UseScrollOverlayOptions,
  type UseScrollOverlayReturn,
} from "./lib/use-scroll-overlay"

// Foundations
export { Icon, ICON_SIZES, type IconSize, type IconProps } from "./components/icon"

// Actions
export { Button, buttonVariants, type ButtonProps } from "./components/button"
export { ButtonGroup, type ButtonGroupProps } from "./components/button-group"
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedOption,
  type SegmentedSize,
} from "./components/segmented-control"

// Forms
export { Input, inputVariants, type InputProps } from "./components/input"
export { SearchField, type SearchFieldProps } from "./components/search-field"
export { MoneyField, type MoneyFieldProps } from "./components/money-field"
export { Switch, type SwitchProps } from "./components/switch"
export { Checkbox, type CheckboxProps } from "./components/checkbox"
export { Label, type LabelProps } from "./components/label"
export { Textarea, type TextareaProps } from "./components/textarea"
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  type SelectTriggerProps,
} from "./components/select"
export {
  ChoiceList,
  type ChoiceListProps,
  type ChoiceListSingleProps,
  type ChoiceListMultipleProps,
  type Choice,
} from "./components/choice-list"
export { NumberStepper, type NumberStepperProps } from "./components/number-stepper"
export { FloatingLabelInput, type FloatingLabelInputProps } from "./components/floating-label-input"
export { Chip, ClickableChip, chipVariants, type ChipProps, type ClickableChipProps } from "./components/chip"
export { ChipInput, type ChipInputProps } from "./components/chip-input"
export { FileUpload, type FileUploadProps } from "./components/file-upload"

// Feedback
export { Spinner, type SpinnerProps } from "./components/spinner"
export { Badge, badgeVariants, type BadgeProps } from "./components/badge"
export { Banner, bannerVariants, type BannerProps } from "./components/banner"
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonTable,
  SkeletonList,
  SkeletonCard,
  type SkeletonProps,
  type SkeletonTextProps,
  type SkeletonAvatarProps,
  type SkeletonButtonProps,
  type SkeletonTableProps,
  type SkeletonListProps,
  type SkeletonCardProps,
  type SkeletonAnimation,
} from "./components/skeleton"
export {
  RouteLoading,
  type RouteLoadingProps,
  type RouteLoadingPattern,
} from "./components/route-loading"
export { EmptyState, type EmptyStateProps } from "./components/empty-state"
export {
  Progress,
  ProgressSegmented,
  ProgressCircle,
  type ProgressProps,
  type ProgressSegmentedProps,
  type ProgressCircleProps,
} from "./components/progress"

// Overlays
export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalClose,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  type ModalContentProps,
} from "./components/modal"
export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  type DrawerContentProps,
} from "./components/drawer"
export {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  Tooltip,
  type TooltipProps,
} from "./components/tooltip"
export {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
} from "./components/popover"
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  type DropdownMenuItemProps,
} from "./components/dropdown-menu"

// Navigation
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs"
export { Breadcrumbs, type BreadcrumbsProps, type BreadcrumbItem } from "./components/breadcrumbs"
export { Pagination, type PaginationProps } from "./components/pagination"

// Data display
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableEmpty,
  type TableEmptyProps,
} from "./components/table"
export { InlineEdit, type InlineEditProps } from "./components/inline-edit"
export { StickyTable, StickyColumn, type StickyColumnProps } from "./components/sticky-columns"
export { BulkActionsBar, type BulkActionsBarProps } from "./components/bulk-actions-bar"
export {
  SavedFilters,
  type SavedFiltersProps,
  type SavedFilter,
} from "./components/saved-filters"
export { Sparkline, type SparklineProps } from "./components/sparkline"

// Navigation / shell
export { Stepper, type StepperProps, type StepperStep } from "./components/stepper"
export {
  PageShell,
  PageShellAction,
  PageShellDivider,
  type PageShellProps,
  type PageShellActionProps,
} from "./components/page-shell"
export {
  SidebarNav,
  SidebarNavSection,
  SidebarNavItem,
  SidebarNavParent,
  SidebarCollapseProvider,
  type SidebarNavSectionProps,
  type SidebarNavItemProps,
  type SidebarNavParentProps,
  type SidebarCollapseProviderProps,
} from "./components/sidebar-nav"
export {
  AutoSaveStatus,
  type AutoSaveStatusProps,
  type AutoSaveState,
} from "./components/auto-save-status"

// Misc
export { Avatar, avatarVariants, type AvatarProps } from "./components/avatar"
export { AvatarGroup, type AvatarGroupProps } from "./components/avatar-group"
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/accordion"
export {
  Kbd,
  KbdGroup,
  KbdShortcut,
  kbdVariants,
  // Deprecated aliases — new code should import `Kbd` / `KbdGroup`.
  Keycap,
  KeycapGroup,
  keycapVariants,
  type KbdProps,
  type KbdShortcutProps,
  type KeycapProps,
} from "./components/kbd"


// App shell — Notion-style layout
export {
  DocShell,
  useDocShell,
  useOptionalDocShell,
  type DocShellProps,
} from "./components/doc-shell"
export {
  DocSidebar,
  DocSidebarBrand,
  DocSidebarSearch,
  DocSidebarNav,
  DocSidebarFooter,
  DocSidebarUser,
  DocSidebarFooterAction,
  DocSidebarBellAction,
  DocSidebarHelpAction,
  type DocSidebarBrandProps,
  type DocSidebarSearchProps,
  type DocSidebarUserProps,
  type DocSidebarFooterActionProps,
} from "./components/doc-shell-sidebar"
export {
  DocContent,
  DocPageHeader,
  DocBody,
  type DocContentProps,
  type DocPageHeaderProps,
  type DocBodyProps,
} from "./components/doc-shell-content"

// Density — global mode + scoped override + hotkey
export {
  DensityProvider,
  DensityRoot,
  useDensity,
  useDensityHotkey,
  DENSITIES,
  DEFAULT_DENSITY,
  type Density,
  type DensityProviderProps,
} from "./components/density"


// Power-user / app-shell helpers
export { Toaster, toast, type ToasterProps } from "./components/toaster"
export {
  ShortcutHint,
  shortcutToast,
  type ShortcutHintProps,
  type ShortcutHintTone,
  type ShortcutToastOptions,
} from "./components/shortcut-hint"
export {
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteSeparator,
  CommandPaletteItem,
  CommandPaletteFooter,
  type CommandPaletteProps,
  type CommandPaletteGroupProps,
  type CommandPaletteItemProps,
} from "./components/command-palette"
export {
  KeyboardCheatsheet,
  useCheatsheetHotkey,
  type KeyboardCheatsheetProps,
  type CheatsheetGroup,
  type CheatsheetShortcut,
} from "./components/keyboard-cheatsheet"
export {
  WorkflowTimeline,
  WorkflowTimelineItem,
  type WorkflowStatus,
  type WorkflowTimelineItemProps,
} from "./components/workflow-timeline"
export {
  ImportPreview,
  ImportRowStatusBadge,
  type ImportPreviewProps,
  type ImportPreviewSummary,
  type ImportRowStatusBadgeProps,
} from "./components/import-preview"


// Date / time
export { DatePicker, type DatePickerProps } from "./components/date-picker"
export { DateField, type DateFieldProps } from "./components/date-field"
export type { DateRange } from "react-day-picker"
