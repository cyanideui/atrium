import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "../lib/cn"

/**
 * <Progress> — design.md §5.17
 * Two patterns: linear bar (Radix-based) and segmented steps + circular ring.
 */

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  tone?: "default" | "success" | "warning" | "critical" | "info"
  size?: "sm" | "md" | "lg"
}

const trackSizes: Record<NonNullable<ProgressProps["size"]>, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
}

const fillTone: Record<NonNullable<ProgressProps["tone"]>, string> = {
  default: "bg-ink",
  success: "bg-success",
  warning: "bg-warning",
  critical: "bg-error",
  info: "bg-info",
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, tone = "default", size = "md", ...rest }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn(
      "relative w-full overflow-hidden rounded-pill bg-surface-2",
      trackSizes[size],
      className
    )}
    {...rest}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full transition-transform duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        fillTone[tone]
      )}
      style={{ transform: `translateX(-${100 - Math.min(100, Math.max(0, value))}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = "Progress"

/**
 * <ProgressSegmented> — N cells, filled left-to-right.
 */
export interface ProgressSegmentedProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number
  current: number
  tone?: ProgressProps["tone"]
}

export const ProgressSegmented = React.forwardRef<HTMLDivElement, ProgressSegmentedProps>(
  ({ className, steps, current, tone = "default", ...rest }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={steps}
      aria-valuenow={current}
      className={cn("flex items-center gap-1", className)}
      {...rest}
    >
      {Array.from({ length: steps }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-pill transition-colors duration-[var(--dur-base)]",
            i < current ? fillTone[tone] : "bg-surface-2"
          )}
        />
      ))}
    </div>
  )
)
ProgressSegmented.displayName = "ProgressSegmented"

/**
 * <ProgressCircle> — circular ring with optional centered label.
 */
export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  size?: number
  stroke?: number
  tone?: ProgressProps["tone"]
  label?: React.ReactNode
}

const ringStroke: Record<NonNullable<ProgressProps["tone"]>, string> = {
  default: "var(--ink)",
  success: "var(--success)",
  warning: "var(--warning)",
  critical: "var(--error)",
  info: "var(--info)",
}

export const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(
  ({ className, value, size = 64, stroke = 6, tone = "default", label, ...rest }, ref) => {
    const radius = (size - stroke) / 2
    const c = 2 * Math.PI * radius
    const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...rest}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringStroke[tone]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: `stroke-dashoffset var(--dur-slide) var(--ease-standard)` }}
          />
        </svg>
        {label !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold tabular-nums text-ink">
            {label}
          </div>
        )}
      </div>
    )
  }
)
ProgressCircle.displayName = "ProgressCircle"
