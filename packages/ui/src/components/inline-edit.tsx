import * as React from "react"
import { cn } from "../lib/cn"

/**
 * <InlineEdit> — design.md §5.3
 * Spreadsheet-style cell editor. Excel-feel: no layout shift when toggling
 * between rest and edit. Both states render at the exact same dimensions —
 * only the border + bg + caret appear/disappear.
 *
 * Implementation key: a single <span>-like rest state and <input> edit state
 * with identical box model. We use a wrapping <div> that holds either the
 * static text or the input, both styled with the same padding, font-size,
 * and line-height. The "border" is a 1px transparent ring at rest and turns
 * solid when editing.
 *
 * Commit: blur or Enter. Cancel: Esc.
 */

export interface InlineEditProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur" | "size"> {
  value: string
  onCommit?: (next: string) => void
  /** Right-align (common for numerics). */
  align?: "left" | "right" | "center"
  /** Extra classes for both states (e.g. tabular-nums). */
  textClassName?: string
}

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
}

export const InlineEdit = React.forwardRef<HTMLInputElement, InlineEditProps>(
  (
    { className, value, onCommit, align = "left", textClassName, disabled, placeholder, ...rest },
    ref
  ) => {
    const [draft, setDraft] = React.useState(value)
    const [editing, setEditing] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    React.useEffect(() => {
      if (!editing) setDraft(value)
    }, [value, editing])

    const enterEdit = () => {
      if (disabled) return
      setEditing(true)
      requestAnimationFrame(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      })
    }

    const commit = () => {
      setEditing(false)
      if (draft !== value) onCommit?.(draft)
    }

    const cancel = () => {
      setEditing(false)
      setDraft(value)
    }

    /*
     * The shared box. Both states use the same dimensions so toggling never
     * shifts layout:
     *   - 28px height (matches a compact table row's text line-height + padding)
     *   - 8px horizontal padding
     *   - 1px border (transparent at rest, ink when editing)
     *   - same font-size (inherited from cell)
     */
    const sharedBox = cn(
      "relative flex h-7 w-full items-center rounded-sm",
      "border border-transparent px-2 text-[13px] leading-none",
      "transition-[border-color,background-color,box-shadow] duration-[var(--dur-fast)]",
      alignClass[align],
      textClassName
    )

    if (editing) {
      return (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              commit()
            } else if (e.key === "Escape") {
              e.preventDefault()
              cancel()
            }
          }}
          className={cn(
            sharedBox,
            "border-ink bg-canvas text-ink ring-1 ring-ink outline-none",
            // Pull text alignment into the input
            align === "right" && "text-right",
            align === "center" && "text-center",
            className
          )}
          {...rest}
        />
      )
    }

    return (
      <button
        type="button"
        disabled={disabled}
        onClick={enterEdit}
        // onFocus also enters edit so Tab navigation keeps the user "in" the grid.
        onFocus={(e) => {
          // Only auto-edit when focus came via keyboard (Tab), not after a click
          // that already entered edit mode.
          if (!editing && e.target.matches(":focus-visible")) {
            enterEdit()
          }
        }}
        className={cn(
          sharedBox,
          "cursor-text text-ink",
          "hover:border-hairline-strong",
          "focus-visible:border-hairline-strong focus-visible:outline-none",
          disabled && "cursor-not-allowed text-ink-4",
          className
        )}
      >
        <span className={cn("block w-full truncate", alignClass[align])}>
          {value || <span className="text-ink-4">{placeholder ?? "—"}</span>}
        </span>
      </button>
    )
  }
)
InlineEdit.displayName = "InlineEdit"
