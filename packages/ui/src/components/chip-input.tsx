import * as React from "react"
import { MultiplicationSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <ChipInput> — design.md §5.19a
 * Multi-value input. Type → Enter or comma to add a chip. Backspace removes last.
 */

export interface ChipInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "size"> {
  size?: "sm" | "md" | "lg"
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  /** Keys that commit the current draft as a chip. */
  commitKeys?: string[]
  /** Validate or transform a candidate before adding. Return null to reject. */
  transform?: (raw: string) => string | null
  /** Placeholder shown when no chips exist. */
  placeholder?: string
}

/* ChipInput uses `min-height` (not fixed height) so multi-row chip wrap
 * works. We bind min-height to the density form vars so dense modes get
 * compact wrappers, comfortable mode gets roomier ones. Inner chip heights
 * remain a constant fraction of the wrapper height (handled inline below). */
const sizes = {
  sm: { wrap: "text-xs",     gap: "gap-1.5", chip: "h-5 px-1.5 text-[11px]" },
  md: { wrap: "text-[13px]", gap: "gap-2",   chip: "h-6 px-2 text-[12px]" },
  lg: { wrap: "text-sm",     gap: "gap-2",   chip: "h-7 px-2 text-[13px]" },
} as const

export const ChipInput = React.forwardRef<HTMLInputElement, ChipInputProps>(
  (
    {
      className,
      size = "md",
      value: controlled,
      defaultValue = [],
      onChange,
      commitKeys = ["Enter", ","],
      transform,
      placeholder,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isControlled = controlled !== undefined
    const [internal, setInternal] = React.useState<string[]>(defaultValue ?? [])
    const chips = isControlled ? (controlled as string[]) : internal
    const [draft, setDraft] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const setChips = (next: string[]) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    }

    const addChip = (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) return
      const final = transform ? transform(trimmed) : trimmed
      if (!final) return
      if (chips.includes(final)) return
      setChips([...chips, final])
      setDraft("")
    }

    const removeChipAt = (i: number) => {
      const next = chips.slice()
      next.splice(i, 1)
      setChips(next)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (commitKeys.includes(e.key)) {
        e.preventDefault()
        addChip(draft)
      } else if (e.key === "Backspace" && draft === "" && chips.length > 0) {
        e.preventDefault()
        removeChipAt(chips.length - 1)
      }
    }

    const s = sizes[size]
    return (
      <div
        onClick={() => inputRef.current?.focus()}
        style={{ minHeight: `var(--density-form-h-${size})` }}
        className={cn(
          "flex w-full flex-wrap items-center rounded-md border border-hairline-strong bg-canvas p-1.5",
          "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
          "transition-[border-color,box-shadow] duration-[var(--dur-base)]",
          "focus-within:border-ink focus-within:ring-1 focus-within:ring-ink",
          "hover:border-ink-3",
          disabled && "cursor-not-allowed bg-surface text-ink-4",
          s.wrap,
          s.gap,
          className
        )}
      >
        {chips.map((chip, i) => (
          <span
            key={`${chip}-${i}`}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-pill border border-hairline-strong bg-canvas font-medium text-ink",
              s.chip
            )}
          >
            {chip}
            <button
              type="button"
              tabIndex={-1}
              aria-label={`Remove ${chip}`}
              onClick={(e) => {
                e.stopPropagation()
                removeChipAt(i)
              }}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-pill text-ink-3 transition-colors hover:bg-black/10 hover:text-error dark:hover:bg-white/10"
            >
              <Icon icon={MultiplicationSignIcon} size={10} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addChip(draft)}
          disabled={disabled}
          placeholder={chips.length === 0 ? placeholder : undefined}
          className="min-w-[80px] flex-1 border-0 bg-transparent p-0 text-ink placeholder:text-ink-4 focus:outline-none disabled:cursor-not-allowed"
          {...rest}
        />
      </div>
    )
  }
)
ChipInput.displayName = "ChipInput"
