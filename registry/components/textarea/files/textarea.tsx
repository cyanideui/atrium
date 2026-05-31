import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * <Textarea> — design.md §5.4
 * Same surface as Input. Optional character counter via `maxLength` + `showCount`.
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Render a "X / max" counter in the bottom-right when maxLength is set. */
  showCount?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showCount, maxLength, value, defaultValue, onChange, ...rest }, ref) => {
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState(String(defaultValue ?? ""))
    const len = isControlled ? String(value ?? "").length : internal.length

    const showCounter = showCount && typeof maxLength === "number"
    const ratio = showCounter ? len / maxLength : 0
    const tone =
      ratio >= 1 ? "text-error" : ratio >= 0.9 ? "text-warning" : "text-ink-3"

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={(e) => {
            if (!isControlled) setInternal(e.target.value)
            onChange?.(e)
          }}
          className={cn(
            "flex w-full min-h-[88px] resize-y bg-canvas text-ink placeholder:text-ink-4",
            "rounded-md border border-hairline-strong px-3 py-2 text-[13px] leading-relaxed",
            "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
            "transition-[color,box-shadow,border-color] duration-[var(--dur-base)]",
            "focus-visible:outline-none focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink",
            "hover:border-ink-3",
            "disabled:cursor-not-allowed disabled:bg-surface disabled:text-ink-4 disabled:border-hairline",
            "aria-invalid:border-error aria-invalid:focus-visible:ring-error",
            showCounter && "pb-7",
            className
          )}
          {...rest}
        />
        {showCounter && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-2 right-2.5 text-[11px] tabular-nums",
              tone
            )}
          >
            {len} / {maxLength}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
