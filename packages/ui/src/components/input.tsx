import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

/**
 * <Input> — design.md §5.4 (bordered style)
 * Bordered surface, 1px hairline-strong, focus → 1px ink + ring.
 */

const inputBase = cva(
  [
    "flex w-full bg-canvas text-ink placeholder:text-ink-4",
    "rounded-md border border-hairline-strong",
    "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
    "transition-[color,box-shadow,border-color] duration-[var(--dur-base)]",
    "focus-visible:outline-none focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink",
    "hover:border-ink-3",
    "disabled:cursor-not-allowed disabled:bg-surface disabled:text-ink-4 disabled:border-hairline",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      size: {
        sm: "px-2.5 text-xs",
        md: "px-3 text-[13px]",
        lg: "px-3.5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputBase> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", size = "md", style, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      style={{ height: `var(--density-form-h-${size})`, ...style }}
      className={cn(inputBase({ size }), className)}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { inputBase as inputVariants }
