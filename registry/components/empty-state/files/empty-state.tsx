import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * <EmptyState> — design.md §5.11
 * Centered card with optional icon, title, description, and CTA.
 */

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Action(s) shown below the description. */
  action?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full max-w-[420px] flex-col items-center justify-center px-6 py-12 text-center",
        className
      )}
      {...rest}
    >
      {icon && (
        <div className="mb-3 flex h-14 w-14 items-center justify-center text-[40px] leading-none text-ink-3">
          {icon}
        </div>
      )}
      <div className="text-base font-semibold text-ink">{title}</div>
      {description && (
        <p className="mt-1.5 text-[13px] text-ink-3">{description}</p>
      )}
      {action && <div className="mt-4 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"
