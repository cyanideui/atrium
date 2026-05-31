import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { MultiplicationSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <Chip> — design.md §5.19
 * Standalone non-interactive label primitive.
 *
 * <ClickableChip> — same shape, interactive (toggle / removable / suggestion).
 */

const chipVariants = cva(
  "inline-flex shrink-0 select-none items-center gap-1.5 rounded-md font-medium",
  {
    variants: {
      size: {
        sm: "h-6 px-2 text-[12px]",
        md: "h-7 px-2.5 text-[13px]",
        lg: "h-8 px-3 text-[13px]",
      },
      variant: {
        soft:    "bg-surface-2 text-ink",
        outline: "border border-hairline-strong bg-canvas text-ink",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "soft",
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  leading?: React.ReactNode
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, size, variant, leading, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(chipVariants({ size, variant }), className)}
      {...rest}
    >
      {leading && <span className="-ml-0.5 flex items-center">{leading}</span>}
      {children}
    </span>
  )
)
Chip.displayName = "Chip"

/* ---------- CLICKABLE CHIP ---------- */
export interface ClickableChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof chipVariants> {
  leading?: React.ReactNode
  /** Selected/pressed state (toggle chips). */
  pressed?: boolean
  /** When provided, renders a trailing × that calls onRemove. */
  onRemove?: () => void
}

export const ClickableChip = React.forwardRef<HTMLButtonElement, ClickableChipProps>(
  (
    { className, size, variant = "outline", leading, pressed, onRemove, children, onClick, ...rest },
    ref
  ) => {
    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation()
      onRemove?.()
    }
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        onClick={onClick}
        className={cn(
          chipVariants({ size, variant }),
          "cursor-pointer transition-colors duration-[var(--dur-fast)]",
          variant === "outline"
            ? "hover:border-ink-3 hover:bg-surface aria-pressed:bg-ink aria-pressed:text-canvas aria-pressed:border-ink"
            : "hover:bg-surface aria-pressed:bg-ink aria-pressed:text-canvas",
          "active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...rest}
      >
        {leading && <span className="-ml-0.5 flex items-center">{leading}</span>}
        {children}
        {onRemove && (
          <span
            role="button"
            tabIndex={-1}
            aria-label="Remove"
            onClick={handleRemove}
            className={cn(
              "-mr-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-pill",
              "transition-colors duration-[var(--dur-fast)]",
              "hover:bg-black/10 hover:text-error dark:hover:bg-white/10"
            )}
          >
            <Icon icon={MultiplicationSignIcon} size={12} />
          </span>
        )}
      </button>
    )
  }
)
ClickableChip.displayName = "ClickableChip"

export { chipVariants }
