import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * <Badge> — design.md §5.7 (Polaris-style: rounded rect, leading dot, sentence case)
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm font-medium leading-none whitespace-nowrap",
  {
    variants: {
      tone: {
        default:   "bg-tone-default-bg text-tone-default-fg",
        success:   "bg-tone-success-bg text-tone-success-fg",
        warning:   "bg-tone-warning-bg text-tone-warning-fg",
        critical:  "bg-tone-critical-bg text-tone-critical-fg",
        info:      "bg-tone-info-bg text-tone-info-fg",
        attention: "bg-tone-attention-bg text-tone-attention-fg",
        new:       "bg-tone-new-bg text-tone-new-fg",
        readonly:  "bg-tone-readonly-bg text-tone-readonly-fg",
      },
      size: {
        sm: "h-5 px-2 text-[11px]",
        md: "h-6 px-2 text-xs",
        lg: "h-7 px-2.5 text-[13px]",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Hide the leading dot for purely typographic contexts. */
  dotless?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, size, dotless, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ tone, size }), className)}
      {...rest}
    >
      {!dotless && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-pill bg-current opacity-70"
        />
      )}
      {children}
    </span>
  )
)
Badge.displayName = "Badge"

export { badgeVariants }
