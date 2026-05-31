import * as React from "react"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <Stepper> — design.md §5.16
 * Horizontal numbered steps with connector lines. Polaris/Linear-style.
 */

export interface StepperStep {
  label: React.ReactNode
  description?: React.ReactNode
}

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "children"> {
  steps: StepperStep[]
  /** 0-based index of the current step. */
  current: number
}

export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ className, steps, current, ...rest }, ref) => (
    <ol
      ref={ref}
      className={cn("flex items-start gap-2", className)}
      {...rest}
    >
      {steps.map((step, i) => {
        const isComplete = i < current
        const isActive = i === current
        const isLast = i === steps.length - 1
        return (
          <React.Fragment key={i}>
            <li className="flex flex-col items-center gap-1.5 min-w-0 flex-shrink-0">
              <div
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-pill text-[12px] font-semibold tabular-nums",
                  "transition-[background-color,border-color,color] duration-[var(--dur-base)]",
                  isComplete && "bg-ink text-canvas",
                  isActive && "bg-ink text-canvas ring-4 ring-ink/10",
                  !isComplete && !isActive && "border-[1.5px] border-hairline-strong text-ink-3"
                )}
              >
                {isComplete ? <Icon icon={Tick02Icon} size={14} strokeWidth={2.5} /> : i + 1}
              </div>
              <div className="text-center max-w-[120px]">
                <div className={cn(
                  "text-[12px] font-medium leading-tight",
                  isActive ? "text-ink" : isComplete ? "text-ink-2" : "text-ink-3"
                )}>{step.label}</div>
                {step.description && (
                  <div className="mt-0.5 text-[11px] leading-tight text-ink-3">{step.description}</div>
                )}
              </div>
            </li>
            {!isLast && (
              <div
                aria-hidden
                className={cn(
                  "mt-3.5 h-px flex-1 self-start transition-colors duration-[var(--dur-base)]",
                  isComplete ? "bg-ink" : "bg-hairline-strong"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </ol>
  )
)
Stepper.displayName = "Stepper"
