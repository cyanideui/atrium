import * as React from "react"
import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

/**
 * <NumberStepper> — design.md §5.20
 * Bordered group, divider lines between -, input, +. Compact tactile increment.
 */

export interface NumberStepperProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue" | "onChange" | "type"> {
  size?: "sm" | "md" | "lg"
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

/* Number-stepper sizing — heights flow from `--density-form-h-{sm,md,lg}`
 * so the whole control reflows when density changes. Buttons are square
 * (height === width via aspect-square), so we don't hardcode w-* either. */
const sizeClasses = {
  sm: { wrap: "text-xs",       input: "w-12" },
  md: { wrap: "text-[13px]",   input: "w-14" },
  lg: { wrap: "text-sm",       input: "w-16" },
} as const

export const NumberStepper = React.forwardRef<HTMLInputElement, NumberStepperProps>(
  (
    {
      className,
      size = "md",
      value: controlled,
      defaultValue = 0,
      min,
      max,
      step = 1,
      onChange,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isControlled = controlled !== undefined
    const [internal, setInternal] = React.useState<number>(defaultValue ?? 0)
    const value = isControlled ? (controlled as number) : internal

    const clamp = (n: number) => {
      let v = n
      if (typeof min === "number") v = Math.max(min, v)
      if (typeof max === "number") v = Math.min(max, v)
      return v
    }

    const set = (next: number) => {
      const v = clamp(next)
      if (!isControlled) setInternal(v)
      onChange?.(v)
    }

    const dec = () => set(value - step)
    const inc = () => set(value + step)
    const decDisabled = disabled || (typeof min === "number" && value <= min)
    const incDisabled = disabled || (typeof max === "number" && value >= max)

    const s = sizeClasses[size]

    return (
      <div
        style={{ height: `var(--density-form-h-${size})` }}
        className={cn(
          "inline-flex items-center overflow-hidden rounded-md border border-hairline-strong bg-canvas",
          "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
          "transition-[border-color,box-shadow] duration-[var(--dur-base)]",
          "focus-within:border-ink focus-within:ring-1 focus-within:ring-ink",
          "hover:border-ink-3",
          disabled && "cursor-not-allowed bg-surface text-ink-4",
          s.wrap,
          className
        )}
      >
        <button
          type="button"
          aria-label="Decrement"
          disabled={decDisabled}
          onClick={dec}
          className={cn(
            "relative flex h-full aspect-square shrink-0 cursor-pointer items-center justify-center text-ink-2",
            "transition-colors duration-[var(--dur-fast)]",
            "hover:bg-surface hover:text-ink active:bg-surface-2",
            "disabled:pointer-events-none disabled:opacity-40",
            // Inset divider on the right edge — 60% tall, vertically centered.
            "after:pointer-events-none after:absolute after:right-0 after:top-1/2 after:h-[60%] after:w-px after:-translate-y-1/2 after:bg-hairline",
          )}
        >
          <Icon icon={MinusSignIcon} size="sm" />
        </button>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^\d-]/g, ""))
            if (!Number.isNaN(n)) set(n)
          }}
          className={cn(
            "h-full border-0 bg-transparent text-center tabular-nums focus:outline-none",
            s.input
          )}
          {...rest}
        />
        <button
          type="button"
          aria-label="Increment"
          disabled={incDisabled}
          onClick={inc}
          className={cn(
            "relative flex h-full aspect-square shrink-0 cursor-pointer items-center justify-center text-ink-2",
            "transition-colors duration-[var(--dur-fast)]",
            "hover:bg-surface hover:text-ink active:bg-surface-2",
            "disabled:pointer-events-none disabled:opacity-40",
            // Inset divider on the left edge — mirrors the decrement button.
            "before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:h-[60%] before:w-px before:-translate-y-1/2 before:bg-hairline",
          )}
        >
          <Icon icon={PlusSignIcon} size="sm" />
        </button>
      </div>
    )
  }
)
NumberStepper.displayName = "NumberStepper"
