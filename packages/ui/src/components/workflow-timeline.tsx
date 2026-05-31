import * as React from "react"
import { cn } from "../lib/cn"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./icon"

/**
 * <WorkflowTimeline> — design.md §5.24
 * Vertical event timeline with status dots + dotted connectors. Linear-ish.
 *
 * Use <WorkflowTimelineItem> per row. Statuses: complete · active · pending · failed.
 *
 * Density-aware: the per-event vertical rhythm (`--density-timeline-pb`) and
 * the dot-to-content gap (`--density-timeline-gap`) scale with the active
 * density mode. The original spacing is the `comfortable` value; `compact`
 * (default) and `compact-plus` tighten it. The status-dot size stays fixed so
 * the visual identity is constant across modes.
 */

export type WorkflowStatus = "complete" | "active" | "pending" | "failed"

export const WorkflowTimeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, children, ...rest }, ref) => (
  <ol
    ref={ref}
    className={cn("relative flex flex-col", className)}
    {...rest}
  >
    {children}
  </ol>
))
WorkflowTimeline.displayName = "WorkflowTimeline"

export interface WorkflowTimelineItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
  status: WorkflowStatus
  title: React.ReactNode
  /** Trailing meta (timestamp, ID, etc.) shown next to the title. */
  meta?: React.ReactNode
  /** Status badge or chip rendered under the title row. */
  badge?: React.ReactNode
  /** Hide the connector line. Use on the last item, or set automatically via isLast. */
  isLast?: boolean
}

const STATUS_DOT: Record<WorkflowStatus, string> = {
  complete: "bg-ink text-canvas",
  active: "bg-info text-canvas",
  pending: "bg-canvas border-[1.5px] border-hairline-strong",
  failed: "bg-error text-canvas",
}

export const WorkflowTimelineItem = React.forwardRef<HTMLLIElement, WorkflowTimelineItemProps>(
  ({ className, status, title, meta, badge, isLast, children, ...rest }, ref) => (
    <li
      ref={ref}
      style={{ gap: "var(--density-timeline-gap)", paddingBottom: isLast ? 0 : "var(--density-timeline-pb)" }}
      className={cn("relative flex", className)}
      {...rest}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-pill",
            STATUS_DOT[status]
          )}
        >
          {status === "complete" && (
            <Icon icon={Tick02Icon} size={10} strokeWidth={2.5} />
          )}
          {status === "active" && (
            <span aria-hidden className="absolute inset-0 animate-ping rounded-pill bg-info opacity-50" />
          )}
        </div>
        {!isLast && (
          <span
            aria-hidden
            className={cn(
              "absolute left-1/2 top-[20px] -translate-x-1/2",
              "h-full w-px",
              status === "complete"
                ? "bg-hairline-strong"
                : "[background-image:repeating-linear-gradient(to_bottom,var(--hairline-strong)_0,var(--hairline-strong)_3px,transparent_3px,transparent_6px)]"
            )}
          />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[14px] font-medium text-ink">{title}</span>
          {meta && <span className="text-[12px] text-ink-3">· {meta}</span>}
          {badge && <span className="ml-auto">{badge}</span>}
        </div>
        {children && <div className="mt-1 text-[13px] text-ink-2">{children}</div>}
      </div>
    </li>
  )
)
WorkflowTimelineItem.displayName = "WorkflowTimelineItem"
