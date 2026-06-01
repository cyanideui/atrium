import * as React from "react"
import {
  CheckmarkCircle02Icon,
  Clock01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <AutoSaveStatus> — design.md §5.28
 * Small status pill for "Saved" / "Saving…" / "Save failed" near a page title.
 * Linear-inspired. Click handler fires only in the "error" state for retry.
 */

export type AutoSaveState = "saved" | "saving" | "error"

export interface AutoSaveStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  state: AutoSaveState
  /** Called when the user clicks the failed pill to retry. */
  onRetry?: () => void
  /** Override the default labels. */
  labels?: Partial<Record<AutoSaveState, React.ReactNode>>
  /** Override the timestamp shown after "Saved". */
  savedAt?: React.ReactNode
}

const CONFIG = {
  saved:  { icon: CheckmarkCircle02Icon, tone: "text-success", label: "Saved" },
  saving: { icon: Clock01Icon,           tone: "text-warning", label: "Saving…" },
  error:  { icon: AlertCircleIcon,       tone: "text-error",   label: "Save failed" },
} as const

export const AutoSaveStatus = React.forwardRef<HTMLDivElement, AutoSaveStatusProps>(
  ({ className, state, onRetry, labels, savedAt, ...rest }, ref) => {
    const c = CONFIG[state]
    const label = labels?.[state] ?? c.label

    const inner = (
      <>
        <Icon
          icon={c.icon}
          size={14}
          className={cn(c.tone, state === "saving" && "animate-spin motion-reduce:animate-none")}
          aria-hidden
        />
        <span className={state === "error" ? "text-error" : "text-ink-3"}>{label}</span>
        {state === "saved" && savedAt && (
          <span className="text-ink-4">· {savedAt}</span>
        )}
      </>
    )

    if (state === "error" && onRetry) {
      return (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 rounded-sm px-1.5 py-0.5 text-[12px]",
            "transition-colors duration-[var(--dur-fast)] hover:bg-surface",
            className
          )}
        >
          {inner}
        </button>
      )
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live={state === "saving" ? "polite" : undefined}
        className={cn("inline-flex items-center gap-1.5 text-[12px]", className)}
        {...rest}
      >
        {inner}
      </div>
    )
  }
)
AutoSaveStatus.displayName = "AutoSaveStatus"
