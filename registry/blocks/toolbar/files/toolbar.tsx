import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import * as React from "react"
import {
  Add01Icon,
  Download04Icon,
  MoreHorizontalIcon,
  Edit02Icon,
  Copy01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons"

/**
 * Toolbar — a compact action bar: a title/count on the left, a primary +
 * secondary action cluster on the right, and an overflow menu for the rest.
 * Lighter than PageHeader; use it above a list, panel, or card body.
 *
 * Prop-driven. The demo export shows a typical configuration.
 */

export interface ToolbarProps {
  title?: React.ReactNode
  /** Small count/meta after the title (e.g. "24 items"). */
  count?: React.ReactNode
  /** Left-aligned slot (e.g. a search field or segmented control). */
  leading?: React.ReactNode
  /** Right-aligned action cluster. */
  children?: React.ReactNode
}

export function Toolbar({ title, count, leading, children }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-hairline px-3 py-2">
      {(title || count != null) && (
        <div className="flex items-baseline gap-2">
          {title && <span className="text-[13px] font-semibold text-ink">{title}</span>}
          {count != null && <span className="text-[12px] tabular-nums text-ink-3">{count}</span>}
        </div>
      )}
      {leading}
      <div className="ml-auto flex items-center gap-2">{children}</div>
    </div>
  )
}

/** Demo usage — delete once you've wired your own toolbar. */
export function ToolbarDemo() {
  return (
    <div className="rounded-md border border-hairline bg-canvas">
      <Toolbar title="Orders" count="24 items">
        <Button variant="secondary" size="sm" leading={<Icon icon={Download04Icon} size="sm" />}>
          Export
        </Button>
        <Button size="sm" leading={<Icon icon={Add01Icon} size="sm" />}>New</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="tertiary" size="sm" aria-label="More actions">
              <Icon icon={MoreHorizontalIcon} size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem leading={<Icon icon={Edit02Icon} size="sm" />}>Rename view</DropdownMenuItem>
            <DropdownMenuItem leading={<Icon icon={Copy01Icon} size="sm" />}>Duplicate view</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem tone="critical" leading={<Icon icon={Delete02Icon} size="sm" />}>
              Delete view
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Toolbar>
      <div className="px-3 py-10 text-center text-[13px] text-ink-3">Your content goes here.</div>
    </div>
  )
}
