import * as React from "react"
import { MultiplicationSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <BulkActionsBar> — design.md §5.23
 * Appears above tables when rows are selected. Non-destructive actions
 * grouped together; destructive actions isolated with a divider.
 */

export interface BulkActionsBarProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
  /** Cluster of non-destructive actions (Edit, Copy, Export). */
  actions?: React.ReactNode
  /** Single destructive action, isolated by a divider. */
  destructive?: React.ReactNode
  /** Show ✕ to clear selection. Receives the dismiss handler. */
  onDismiss?: () => void
  /** Custom label, defaults to "{N} selected". */
  label?: React.ReactNode
}

export const BulkActionsBar = React.forwardRef<HTMLDivElement, BulkActionsBarProps>(
  ({ className, count, actions, destructive, onDismiss, label, ...rest }, ref) => (
    <div
      ref={ref}
      role="region"
      aria-label="Bulk actions"
      className={cn(
        "flex items-center gap-3 rounded-md border border-hairline bg-surface px-3 py-2",
        "animate-in fade-in-0 slide-in-from-top-1 duration-[var(--dur-base)]",
        className
      )}
      {...rest}
    >
      <span className="text-[12px] font-medium text-ink tabular-nums">
        {label ?? `${count} selected`}
      </span>
      {actions && (
        <div className="flex items-center gap-1">{actions}</div>
      )}
      {destructive && (
        <>
          <span aria-hidden className="mx-1 h-4 w-px bg-hairline" />
          {destructive}
        </>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Clear selection"
          className={cn(
            "ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm text-ink-3",
            "transition-[background-color,color,transform] duration-[var(--dur-fast)]",
            "hover:bg-canvas hover:text-ink active:scale-95"
          )}
        >
          <Icon icon={MultiplicationSignIcon} size="sm" />
        </button>
      )}
    </div>
  )
)
BulkActionsBar.displayName = "BulkActionsBar"
