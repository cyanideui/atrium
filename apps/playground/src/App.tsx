import { Routes, Route, Outlet } from "react-router-dom"
import * as React from "react"
import { Toaster, DocBody, RouteLoading, DensityRoot, useDensityHotkey } from "@cyanideui/ui"
import { PlaygroundShell } from "./components/playground-shell"
import { PlaygroundCommandPalette } from "./components/playground-command-palette"
import { GlobalCheatsheet } from "./hooks/use-global-cheatsheet"
import { useTheme } from "./hooks/use-theme"
import { useShortcutToasts } from "./hooks/use-shortcut-toasts"

// Eager — Intro is the landing page; render-blocking is fine.
import { IntroPage } from "./routes/intro"
import { TodoPage } from "./routes/components/_todo"

/**
 * Lazy route loaders. Each becomes its own JS chunk, slashing the initial
 * bundle and bringing first paint well under 500 KB.
 *
 * Naming convention: routes export their page as a named export (e.g.
 * `export function ButtonPage() { … }`). The `lazyNamed()` helper unwraps
 * a named export so React.lazy gets the `default` it expects.
 */
function lazyNamed<T extends Record<string, React.ComponentType<unknown>>>(
  loader: () => Promise<T>,
  name: keyof T
) {
  return React.lazy(() =>
    loader().then((mod) => ({ default: mod[name] }))
  )
}

const ColorPage = lazyNamed(() => import("./routes/foundations/color"), "ColorPage")
const TypographyPage = lazyNamed(() => import("./routes/foundations/typography"), "TypographyPage")
const SpacingPage = lazyNamed(() => import("./routes/foundations/spacing"), "SpacingPage")
const IconsPage = lazyNamed(() => import("./routes/foundations/icons"), "IconsPage")
const DensityPage = lazyNamed(() => import("./routes/foundations/density"), "DensityPage")

const ButtonPage = lazyNamed(() => import("./routes/components/button"), "ButtonPage")
const ButtonGroupPage = lazyNamed(() => import("./routes/components/button-group"), "ButtonGroupPage")
const SegmentedControlPage = lazyNamed(() => import("./routes/components/segmented-control"), "SegmentedControlPage")
const InputPage = lazyNamed(() => import("./routes/components/input"), "InputPage")
const SearchFieldPage = lazyNamed(() => import("./routes/components/search-field"), "SearchFieldPage")
const MoneyFieldPage = lazyNamed(() => import("./routes/components/money-field"), "MoneyFieldPage")
const SwitchPage = lazyNamed(() => import("./routes/components/switch"), "SwitchPage")
const CheckboxPage = lazyNamed(() => import("./routes/components/checkbox"), "CheckboxPage")
const BadgePage = lazyNamed(() => import("./routes/components/badge"), "BadgePage")
const BannerPage = lazyNamed(() => import("./routes/components/banner"), "BannerPage")
const SpinnerPage = lazyNamed(() => import("./routes/components/spinner"), "SpinnerPage")
const ModalPage = lazyNamed(() => import("./routes/components/modal"), "ModalPage")
const TablePage = lazyNamed(() => import("./routes/components/table"), "TablePage")
const DropdownMenuPage = lazyNamed(() => import("./routes/components/dropdown-menu"), "DropdownMenuPage")
const CardPage = lazyNamed(() => import("./routes/components/card"), "CardPage")

const AvatarPage = lazyNamed(() => import("./routes/components/avatar"), "AvatarPage")
const AvatarGroupPage = lazyNamed(() => import("./routes/components/avatar-group"), "AvatarGroupPage")
const SkeletonPage = lazyNamed(() => import("./routes/components/skeleton"), "SkeletonPage")
const EmptyStatePage = lazyNamed(() => import("./routes/components/empty-state"), "EmptyStatePage")
const KeycapPage = lazyNamed(() => import("./routes/components/keycap"), "KeycapPage")
const ProgressPage = lazyNamed(() => import("./routes/components/progress"), "ProgressPage")
const PaginationPage = lazyNamed(() => import("./routes/components/pagination"), "PaginationPage")
const BreadcrumbsPage = lazyNamed(() => import("./routes/components/breadcrumbs"), "BreadcrumbsPage")
const TabsPage = lazyNamed(() => import("./routes/components/tabs"), "TabsPage")
const TooltipPage = lazyNamed(() => import("./routes/components/tooltip"), "TooltipPage")
const PopoverPage = lazyNamed(() => import("./routes/components/popover"), "PopoverPage")
const AccordionPage = lazyNamed(() => import("./routes/components/accordion"), "AccordionPage")
const DrawerPage = lazyNamed(() => import("./routes/components/drawer"), "DrawerPage")

const SelectPage = lazyNamed(() => import("./routes/components/select"), "SelectPage")
const TextareaPage = lazyNamed(() => import("./routes/components/textarea"), "TextareaPage")
const ChoiceListPage = lazyNamed(() => import("./routes/components/choice-list"), "ChoiceListPage")
const NumberStepperPage = lazyNamed(() => import("./routes/components/number-stepper"), "NumberStepperPage")
const FloatingLabelPage = lazyNamed(() => import("./routes/components/floating-label"), "FloatingLabelPage")
const ChipPage = lazyNamed(() => import("./routes/components/chip"), "ChipPage")
const ChipInputPage = lazyNamed(() => import("./routes/components/chip-input"), "ChipInputPage")
const FileUploadPage = lazyNamed(() => import("./routes/components/file-upload"), "FileUploadPage")

const InlineEditPage = lazyNamed(() => import("./routes/components/inline-edit"), "InlineEditPage")
const StickyColumnsPage = lazyNamed(() => import("./routes/components/sticky-columns"), "StickyColumnsPage")
const BulkActionsPage = lazyNamed(() => import("./routes/components/bulk-actions"), "BulkActionsPage")
const SavedFiltersPage = lazyNamed(() => import("./routes/components/saved-filters"), "SavedFiltersPage")
const SparklinesPage = lazyNamed(() => import("./routes/components/sparklines"), "SparklinesPage")

const StepperPage = lazyNamed(() => import("./routes/components/stepper"), "StepperPage")
const PageShellComponentPage = lazyNamed(() => import("./routes/components/page-shell"), "PageShellComponentPage")
const SidebarNavComponentPage = lazyNamed(() => import("./routes/components/sidebar-nav"), "SidebarNavComponentPage")
const AutoSavePage = lazyNamed(() => import("./routes/components/auto-save"), "AutoSavePage")

const DocShellPreviewPage = lazyNamed(() => import("./routes/components/doc-shell-preview"), "DocShellPreviewPage")
const DocShellPage = lazyNamed(() => import("./routes/components/doc-shell"), "DocShellPage")

const ToastPage = lazyNamed(() => import("./routes/components/toast"), "ToastPage")
const ShortcutHintPage = lazyNamed(() => import("./routes/components/shortcut-hint"), "ShortcutHintPage")
const CommandPaletteShowcase = lazyNamed(() => import("./routes/components/command-palette"), "CommandPaletteShowcase")
const CheatsheetPage = lazyNamed(() => import("./routes/components/cheatsheet"), "CheatsheetPage")
const WorkflowTimelinePage = lazyNamed(() => import("./routes/components/workflow-timeline"), "WorkflowTimelinePage")
const ImportPreviewPage = lazyNamed(() => import("./routes/components/import-preview"), "ImportPreviewPage")
const DatePickerPage = lazyNamed(() => import("./routes/components/date-picker"), "DatePickerPage")

const DashboardTemplate = lazyNamed(() => import("./routes/templates/dashboard"), "DashboardTemplate")
const CrudListTemplate = lazyNamed(() => import("./routes/templates/crud-list"), "CrudListTemplate")
const SettingsTemplate = lazyNamed(() => import("./routes/templates/settings"), "SettingsTemplate")
const DetailTemplate = lazyNamed(() => import("./routes/templates/detail"), "DetailTemplate")

const BlocksIndex = lazyNamed(() => import("./routes/blocks/index"), "BlocksIndex")
const StatCardsBlock = lazyNamed(() => import("./routes/blocks/stat-cards"), "StatCardsBlock")
const DataTableBlock = lazyNamed(() => import("./routes/blocks/data-table"), "DataTableBlock")
const PageHeaderBlock = lazyNamed(() => import("./routes/blocks/page-header"), "PageHeaderBlock")
const EmptyStateBlock = lazyNamed(() => import("./routes/blocks/empty-state"), "EmptyStateBlock")
const SettingsSectionBlock = lazyNamed(() => import("./routes/blocks/settings-section"), "SettingsSectionBlock")
const AuditLogBlock = lazyNamed(() => import("./routes/blocks/audit-log"), "AuditLogBlock")
const FilterBarBlock = lazyNamed(() => import("./routes/blocks/filter-bar"), "FilterBarBlock")
const DetailCardBlock = lazyNamed(() => import("./routes/blocks/detail-card"), "DetailCardBlock")
const AuthCardBlock = lazyNamed(() => import("./routes/blocks/auth-card"), "AuthCardBlock")
const ToolbarBlock = lazyNamed(() => import("./routes/blocks/toolbar"), "ToolbarBlock")
const NotificationFeedBlock = lazyNamed(() => import("./routes/blocks/notification-feed"), "NotificationFeedBlock")
const FormSectionBlock = lazyNamed(() => import("./routes/blocks/form-section"), "FormSectionBlock")
const PricingCardsBlock = lazyNamed(() => import("./routes/blocks/pricing-cards"), "PricingCardsBlock")
const CommandMenuTriggerBlock = lazyNamed(() => import("./routes/blocks/command-menu-trigger"), "CommandMenuTriggerBlock")
const MetricComparisonBlock = lazyNamed(() => import("./routes/blocks/metric-comparison"), "MetricComparisonBlock")
const FileListBlock = lazyNamed(() => import("./routes/blocks/file-list"), "FileListBlock")
const CommentThreadBlock = lazyNamed(() => import("./routes/blocks/comment-thread"), "CommentThreadBlock")
const WizardBlock = lazyNamed(() => import("./routes/blocks/wizard"), "WizardBlock")
const CalendarMonthBlock = lazyNamed(() => import("./routes/blocks/calendar-month"), "CalendarMonthBlock")
const KanbanBoardBlock = lazyNamed(() => import("./routes/blocks/kanban-board"), "KanbanBoardBlock")

/** Playground chrome — DocShell wrapping the route's content via Outlet. */
function DocsLayout({
  onOpenCheatsheet,
  onOpenCommandPalette,
}: {
  onOpenCheatsheet: () => void
  onOpenCommandPalette: () => void
}) {
  return (
    <PlaygroundShell
      onOpenCheatsheet={onOpenCheatsheet}
      onOpenCommandPalette={onOpenCommandPalette}
    >
      {/* Mounted inside <DocShell> so the sidebar/width toasts can read
          collapse + body-width state via useOptionalDocShell(). */}
      <ShortcutToasts />
      <DocBody className="px-10 pb-24 pt-10" centeredMaxWidth={920}>
        <React.Suspense fallback={<RouteLoading pattern="list" />}>
          <Outlet />
        </React.Suspense>
      </DocBody>
    </PlaygroundShell>
  )
}

function ShortcutToasts() {
  useShortcutToasts()
  return null
}

/** Global T hotkey — toggle theme. Skipped while typing. */
function useThemeHotkey() {
  const { toggle } = useTheme()
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "t" || e.key === "T") {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toggle])
}

/** Global ⌘K / Ctrl+K hotkey — toggle the command palette. */
function useCommandPaletteHotkey(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [setOpen])
}

export function App() {
  // <DensityRoot> publishes the density context. Anything that calls
  // useDensity() — including useDensityHotkey() — has to live BELOW it
  // in the tree, not next to it. We put the actual app body in
  // <AppShell> so it can read the context. (Without this split, pressing
  // D in App's hook block would call the no-op fallback returned by
  // useDensity() when no provider is found in ancestors.)
  return (
    <DensityRoot>
      <AppShell />
    </DensityRoot>
  )
}

function AppShell() {
  const [cheatsheetOpen, setCheatsheetOpen] = React.useState(false)
  const [paletteOpen, setPaletteOpen] = React.useState(false)
  useThemeHotkey()
  useCommandPaletteHotkey(setPaletteOpen)
  // Cycles compact-plus → compact → comfortable on the `D` hotkey.
  useDensityHotkey()

  return (
    <>
      <Toaster position="top-center" />
      <GlobalCheatsheet open={cheatsheetOpen} onOpenChange={setCheatsheetOpen} />
      <PlaygroundCommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onOpenCheatsheet={() => setCheatsheetOpen(true)}
      />
      <Routes>
        {/* Full-screen layout demos — escape the playground chrome. */}
        <Route
          path="/preview/doc-shell"
          element={
            <React.Suspense fallback={null}>
              <DocShellPage />
            </React.Suspense>
          }
        />

        {/* Everything else lives inside the docs chrome. */}
        <Route
          element={
            <DocsLayout
              onOpenCheatsheet={() => setCheatsheetOpen(true)}
              onOpenCommandPalette={() => setPaletteOpen(true)}
            />
          }
        >
          <Route path="/" element={<IntroPage />} />
          <Route path="/foundations/color" element={<ColorPage />} />
          <Route path="/foundations/typography" element={<TypographyPage />} />
          <Route path="/foundations/spacing" element={<SpacingPage />} />
          <Route path="/foundations/icons" element={<IconsPage />} />
          <Route path="/foundations/density" element={<DensityPage />} />

          <Route path="/components/button" element={<ButtonPage />} />
          <Route path="/components/button-group" element={<ButtonGroupPage />} />
          <Route path="/components/segmented-control" element={<SegmentedControlPage />} />
          <Route path="/components/input" element={<InputPage />} />
          <Route path="/components/search-field" element={<SearchFieldPage />} />
          <Route path="/components/money-field" element={<MoneyFieldPage />} />
          <Route path="/components/switch" element={<SwitchPage />} />
          <Route path="/components/checkbox" element={<CheckboxPage />} />
          <Route path="/components/badge" element={<BadgePage />} />
          <Route path="/components/banner" element={<BannerPage />} />
          <Route path="/components/spinner" element={<SpinnerPage />} />
          <Route path="/components/modal" element={<ModalPage />} />
          <Route path="/components/table" element={<TablePage />} />
          <Route path="/components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="/components/card" element={<CardPage />} />

          <Route path="/components/avatar" element={<AvatarPage />} />
          <Route path="/components/avatar-group" element={<AvatarGroupPage />} />
          <Route path="/components/skeleton" element={<SkeletonPage />} />
          <Route path="/components/empty-state" element={<EmptyStatePage />} />
          <Route path="/components/keycap" element={<KeycapPage />} />
          <Route path="/components/progress" element={<ProgressPage />} />
          <Route path="/components/pagination" element={<PaginationPage />} />
          <Route path="/components/breadcrumbs" element={<BreadcrumbsPage />} />
          <Route path="/components/tabs" element={<TabsPage />} />
          <Route path="/components/tooltip" element={<TooltipPage />} />
          <Route path="/components/popover" element={<PopoverPage />} />
          <Route path="/components/accordion" element={<AccordionPage />} />
          <Route path="/components/drawer" element={<DrawerPage />} />

          <Route path="/components/select" element={<SelectPage />} />
          <Route path="/components/textarea" element={<TextareaPage />} />
          <Route path="/components/choice-list" element={<ChoiceListPage />} />
          <Route path="/components/number-stepper" element={<NumberStepperPage />} />
          <Route path="/components/floating-label" element={<FloatingLabelPage />} />
          <Route path="/components/chip" element={<ChipPage />} />
          <Route path="/components/chip-input" element={<ChipInputPage />} />
          <Route path="/components/file-upload" element={<FileUploadPage />} />

          <Route path="/components/inline-edit" element={<InlineEditPage />} />
          <Route path="/components/sticky-columns" element={<StickyColumnsPage />} />
          <Route path="/components/bulk-actions" element={<BulkActionsPage />} />
          <Route path="/components/saved-filters" element={<SavedFiltersPage />} />
          <Route path="/components/sparklines" element={<SparklinesPage />} />

          <Route path="/components/stepper" element={<StepperPage />} />
          <Route path="/components/page-shell" element={<PageShellComponentPage />} />
          <Route path="/components/sidebar-nav" element={<SidebarNavComponentPage />} />
          <Route path="/components/auto-save" element={<AutoSavePage />} />
          <Route path="/components/doc-shell" element={<DocShellPreviewPage />} />

          <Route path="/components/toast" element={<ToastPage />} />
          <Route path="/components/shortcut-hint" element={<ShortcutHintPage />} />
          <Route path="/components/command-palette" element={<CommandPaletteShowcase />} />
          <Route path="/components/cheatsheet" element={<CheatsheetPage />} />
          <Route path="/components/workflow-timeline" element={<WorkflowTimelinePage />} />
          <Route path="/components/import-preview" element={<ImportPreviewPage />} />
          <Route path="/components/date-picker" element={<DatePickerPage />} />

          {/* Templates */}
          <Route path="/templates/dashboard" element={<DashboardTemplate />} />
          <Route path="/templates/crud-list" element={<CrudListTemplate />} />
          <Route path="/templates/settings" element={<SettingsTemplate />} />
          <Route path="/templates/detail" element={<DetailTemplate />} />

          {/* Blocks */}
          <Route path="/blocks" element={<BlocksIndex />} />
          <Route path="/blocks/stat-cards" element={<StatCardsBlock />} />
          <Route path="/blocks/data-table" element={<DataTableBlock />} />
          <Route path="/blocks/page-header" element={<PageHeaderBlock />} />
          <Route path="/blocks/empty-state" element={<EmptyStateBlock />} />
          <Route path="/blocks/settings-section" element={<SettingsSectionBlock />} />
          <Route path="/blocks/audit-log" element={<AuditLogBlock />} />
          <Route path="/blocks/filter-bar" element={<FilterBarBlock />} />
          <Route path="/blocks/detail-card" element={<DetailCardBlock />} />
          <Route path="/blocks/auth-card" element={<AuthCardBlock />} />
          <Route path="/blocks/toolbar" element={<ToolbarBlock />} />
          <Route path="/blocks/notification-feed" element={<NotificationFeedBlock />} />
          <Route path="/blocks/form-section" element={<FormSectionBlock />} />
          <Route path="/blocks/pricing-cards" element={<PricingCardsBlock />} />
          <Route path="/blocks/command-menu-trigger" element={<CommandMenuTriggerBlock />} />
          <Route path="/blocks/metric-comparison" element={<MetricComparisonBlock />} />
          <Route path="/blocks/file-list" element={<FileListBlock />} />
          <Route path="/blocks/comment-thread" element={<CommentThreadBlock />} />
          <Route path="/blocks/wizard" element={<WizardBlock />} />
          <Route path="/blocks/calendar-month" element={<CalendarMonthBlock />} />
          <Route path="/blocks/kanban-board" element={<KanbanBoardBlock />} />

          {/* Catch-all for stub pages */}
          <Route path="/components/*" element={<TodoPage />} />
        </Route>
      </Routes>
    </>
  )
}
