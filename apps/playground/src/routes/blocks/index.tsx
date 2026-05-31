import { Link } from "react-router-dom"
import { Icon, cn } from "@cyanideui/ui"
import {
  ChartUpIcon,
  TableIcon,
  File01Icon,
  StickyNote01Icon,
  Settings02Icon,
  WorkflowSquare01Icon,
  FilterIcon,
  Album02Icon,
  ArrowRight02Icon,
  UserMultiple02Icon,
  CursorMagicSelection01Icon,
  Notification03Icon,
  CheckListIcon,
  DollarCircleIcon,
  SearchList01Icon,
  ChartLineData01Icon,
  CloudUploadIcon,
  Comment01Icon,
  Calendar03Icon,
  Drag01Icon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import type { IconSvgElement } from "@hugeicons/react"

interface BlockEntry {
  title: string
  path: string
  icon: IconSvgElement
  description: string
}

const BLOCKS: BlockEntry[] = [
  { title: "Stat cards", path: "/blocks/stat-cards", icon: ChartUpIcon, description: "KPI tile row with trend + sparkline." },
  { title: "Data table", path: "/blocks/data-table", icon: TableIcon, description: "Search, filters, selection, bulk actions, pagination." },
  { title: "Page header", path: "/blocks/page-header", icon: File01Icon, description: "Breadcrumbs + title + actions + tabs." },
  { title: "Empty state", path: "/blocks/empty-state", icon: StickyNote01Icon, description: "Full-section zero-data layout." },
  { title: "Settings section", path: "/blocks/settings-section", icon: Settings02Icon, description: "Labeled form section + row toggles." },
  { title: "Audit log", path: "/blocks/audit-log", icon: WorkflowSquare01Icon, description: "Chronological activity feed." },
  { title: "Filter bar", path: "/blocks/filter-bar", icon: FilterIcon, description: "Search + saved views + tags + date range." },
  { title: "Detail card", path: "/blocks/detail-card", icon: Album02Icon, description: "Key/value panel with inline edit." },
  { title: "Auth card", path: "/blocks/auth-card", icon: UserMultiple02Icon, description: "Sign-in card with SSO + email/password." },
  { title: "Toolbar", path: "/blocks/toolbar", icon: CursorMagicSelection01Icon, description: "Compact action bar + overflow menu." },
  { title: "Notification feed", path: "/blocks/notification-feed", icon: Notification03Icon, description: "Grouped notifications with unread state." },
  { title: "Form section", path: "/blocks/form-section", icon: CheckListIcon, description: "Validated form with inline errors." },
  { title: "Pricing cards", path: "/blocks/pricing-cards", icon: DollarCircleIcon, description: "Tiered plan cards with feature lists." },
  { title: "Command menu", path: "/blocks/command-menu-trigger", icon: SearchList01Icon, description: "⌘K trigger + palette for non-shell apps." },
  { title: "Metric comparison", path: "/blocks/metric-comparison", icon: ChartLineData01Icon, description: "This-period vs last-period with delta bars." },
  { title: "File list", path: "/blocks/file-list", icon: CloudUploadIcon, description: "Uploaded files with progress + remove." },
  { title: "Comment thread", path: "/blocks/comment-thread", icon: Comment01Icon, description: "Comments + reply composer." },
  { title: "Wizard", path: "/blocks/wizard", icon: ChartUpIcon, description: "Multi-step flow with validation gating." },
  { title: "Calendar (month)", path: "/blocks/calendar-month", icon: Calendar03Icon, description: "Month grid with event chips." },
  { title: "Kanban board", path: "/blocks/kanban-board", icon: Drag01Icon, description: "Draggable status columns." },
  { title: "Team members", path: "/blocks/team-members", icon: UserMultiple02Icon, description: "Roster with role select + invite." },
  { title: "Invoice summary", path: "/blocks/invoice-summary", icon: DollarCircleIcon, description: "Line items + subtotal/tax/total." },
]

export function BlocksIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Blocks"
        description="Composed, drop-in sections built from the component primitives. Copy-paste via the CLI — each lands in src/components/blocks/ importing your local @/components/ui/*."
      />

      <Section>
        <div className="grid gap-3 sm:grid-cols-2">
          {BLOCKS.map((b) => (
            <Link
              key={b.path}
              to={b.path}
              className={cn(
                "group flex items-start gap-3 rounded-md border border-hairline bg-canvas p-4 no-underline",
                "transition-[border-color,background-color] duration-[var(--dur-fast)]",
                "hover:border-hairline-strong hover:bg-surface",
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-2 text-ink-2">
                <Icon icon={b.icon} size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                  {b.title}
                  <Icon
                    icon={ArrowRight02Icon}
                    size={14}
                    className="text-ink-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:text-ink-2"
                  />
                </div>
                <p className="mt-0.5 text-[12.5px] text-ink-3">{b.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
