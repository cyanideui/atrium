import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-current border-t-transparent motion-reduce:animate-none motion-reduce:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-5 w-5 border-2",
        lg: "h-8 w-8 border-[2.5px]",
        xl: "h-11 w-11 border-[3px]",
      },
      tone: {
        default: "text-ink",
        muted: "text-ink-3",
        critical: "text-error",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
        inverse: "text-canvas",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  }
)

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label. Defaults to "Loading". */
  label?: string
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size, tone, label = "Loading", className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size, tone }), className)}
        {...rest}
      >
        <span className="sr-only">{label}</span>
      </span>
    )
  }
)
Spinner.displayName = "Spinner"
