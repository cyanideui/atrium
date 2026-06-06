import * as React from "react"
import { cn } from "../lib/cn"

/**
 * <NotificationBadge> — transitions.dev "Notification badge pop-in" (§motion)
 *
 * A small count/dot badge that pops in (diagonal slide + spring overshoot)
 * when it first appears or when the count increases. Render it as a positioned
 * child of a relatively-positioned trigger (bell icon, nav item, avatar).
 *
 * Reduced motion: the `.ds-badge-pop` animation collapses to 0ms via the
 * global rule, so the badge simply appears in place.
 *
 * Pattern:
 *   <span className="relative">
 *     <BellIcon />
 *     <NotificationBadge count={3} />
 *   </span>
 */

export interface NotificationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Numeric count. 0 (or undefined with no `dot`) renders nothing. */
  count?: number
  /** Cap the displayed number, e.g. max={99} → "99+". */
  max?: number
  /** Render a bare dot (no number). Overrides `count` display. */
  dot?: boolean
  tone?: "critical" | "info" | "success" | "warning"
}

const TONE: Record<NonNullable<NotificationBadgeProps["tone"]>, string> = {
  critical: "bg-critical text-white",
  info: "bg-info text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
}

export const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  ({ className, count = 0, max = 99, dot, tone = "critical", ...rest }, ref) => {
    // Re-trigger the pop whenever the count increases (or first becomes visible).
    const [animateKey, setAnimateKey] = React.useState(0)
    const prev = React.useRef(count)
    React.useEffect(() => {
      if (count > prev.current) setAnimateKey((k) => k + 1)
      prev.current = count
    }, [count])

    if (!dot && count <= 0) return null
    const label = dot ? "" : count > max ? `${max}+` : String(count)

    return (
      <span
        ref={ref}
        key={animateKey}
        aria-hidden
        className={cn(
          "ds-badge-pop pointer-events-none absolute -right-1.5 -top-1.5 flex items-center justify-center rounded-pill border-2 border-canvas font-semibold tabular-nums",
          dot ? "h-2.5 w-2.5" : "h-[18px] min-w-[18px] px-1 text-[10px] leading-none",
          TONE[tone],
          className,
        )}
        {...rest}
      >
        {label}
      </span>
    )
  },
)
NotificationBadge.displayName = "NotificationBadge"
