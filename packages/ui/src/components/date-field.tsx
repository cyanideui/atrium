import * as React from "react"
import { Calendar03Icon, MultiplicationSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { DatePicker } from "./date-picker"
import type { DateRange } from "react-day-picker"

/**
 * <DateField> — design.md §5.21
 * Input-shaped trigger that opens a <DatePicker> in a Popover. Uses the same
 * surface as <Input> (bordered, 8px radius, focus ring) so it sits naturally
 * in form rows.
 *
 * Modes:
 *   <DateField mode="single" value={date} onChange={setDate} />
 *   <DateField mode="range"  value={range} onChange={setRange} />
 */

type Single = {
  mode?: "single"
  value?: Date | null
  onChange?: (value: Date | null) => void
}

type Range = {
  mode: "range"
  value?: DateRange | null
  onChange?: (value: DateRange | null) => void
}

export type DateFieldProps = (Single | Range) & {
  className?: string
  size?: "sm" | "md" | "lg"
  placeholder?: string
  disabled?: boolean
  /** Accessible label for the trigger button. */
  label?: string
  /** Localised formatter override. */
  formatDate?: (date: Date) => string
  /** Localised formatter for the range. */
  formatRange?: (range: DateRange) => string
  /** Show a clear button when a value is set. */
  clearable?: boolean
  id?: string
}

const sizeClasses = {
  sm: "text-xs",
  md: "text-[13px]",
  lg: "text-sm",
} as const

const defaultFormatDate = (d: Date) =>
  d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })

const defaultFormatRange = (r: DateRange) => {
  if (!r.from) return ""
  if (!r.to) return defaultFormatDate(r.from)
  // Same year — collapse the year on the start
  const sameYear = r.from.getFullYear() === r.to.getFullYear()
  const startFmt = sameYear
    ? r.from.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : defaultFormatDate(r.from)
  return `${startFmt} – ${defaultFormatDate(r.to)}`
}

export function DateField(props: DateFieldProps) {
  const {
    className,
    size = "md",
    placeholder = "Pick a date",
    disabled,
    label = "Open date picker",
    formatDate = defaultFormatDate,
    formatRange = defaultFormatRange,
    clearable,
    id,
  } = props

  const [open, setOpen] = React.useState(false)

  const display = React.useMemo(() => {
    if (props.mode === "range") {
      const v = props.value
      if (!v?.from) return null
      return formatRange(v)
    }
    const v = props.value as Date | null | undefined
    return v ? formatDate(v) : null
  }, [props, formatDate, formatRange])

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (props.mode === "range") {
      props.onChange?.(null)
    } else {
      props.onChange?.(null)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-label={label}
          style={{ height: `var(--density-form-h-${size})` }}
          className={cn(
            "ds-trigger",
            "group flex w-full cursor-pointer items-center gap-2 rounded-md border px-3 text-left text-ink",
            "transition-[background,border-color,box-shadow] duration-[var(--dur-base)]",
            "disabled:cursor-not-allowed disabled:text-ink-4 disabled:border-hairline",
            sizeClasses[size],
            className
          )}
        >
          <Icon icon={Calendar03Icon} size="sm" className="text-ink-3" aria-hidden />
          <span className={cn("flex-1 truncate", !display && "text-ink-4")}>
            {display ?? placeholder}
          </span>
          {clearable && display && !disabled && (
            <span
              role="button"
              aria-label="Clear date"
              onClick={handleClear}
              className="flex h-4 w-4 items-center justify-center rounded-xs text-ink-3 transition-colors hover:bg-surface hover:text-ink"
            >
              <Icon icon={MultiplicationSignIcon} size={12} />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {props.mode === "range" ? (
          <DatePicker
            variant="bare"
            mode="range"
            numberOfMonths={2}
            selected={props.value ?? undefined}
            onSelect={(r) => {
              props.onChange?.(r ?? null)
              if (r?.from && r?.to) setOpen(false)
            }}
          />
        ) : (
          <DatePicker
            variant="bare"
            mode="single"
            selected={(props.value as Date | null | undefined) ?? undefined}
            onSelect={(d) => {
              props.onChange?.(d ?? null)
              if (d) setOpen(false)
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
