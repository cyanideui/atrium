import * as React from "react"
import { DayPicker, type DayPickerProps } from "react-day-picker"
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

/**
 * <DatePicker> — design.md §5.21
 * Wraps react-day-picker (v10) with our token-based styling so the calendar
 * matches the rest of the system.
 *
 * Modes:
 *   <DatePicker mode="single" selected={date} onSelect={setDate} />
 *   <DatePicker mode="range"  selected={{ from, to }} onSelect={setRange} />
 *   <DatePicker mode="multiple" selected={dates} onSelect={setDates} />
 *
 * Variants:
 *   • <DatePicker variant="card"> — bordered card with elev-1 shadow (default).
 *   • <DatePicker variant="bare"> — no chrome, for embedding inside Popover.
 *
 * Range selection (`resetOnSelect`): we opt into rdp's reset behavior so the
 * flow is predictable —
 *   1st click → sets `from` (clears `to`)
 *   2nd click → sets `to` (auto-ordered if earlier than `from`)
 *   3rd click → starts a fresh range from the clicked day
 * Without it, rdp keeps *extending* the existing range on every later click.
 *
 * Layout strategy (after multiple iterations — see §1c gotchas):
 *   We override visuals only via CSS custom properties + targeted .ds-datepicker
 *   .rdp-* rules in globals.css. We do NOT override structural classNames
 *   (root, month_grid, weekdays, week, day) because doing so collapsed the
 *   layout. We use navLayout="around" so the prev/next chevrons sit on either
 *   side of the month name.
 */

export type DatePickerProps = DayPickerProps & {
  /** card (bordered + shadow) | bare (no chrome — for inside Popover) */
  variant?: "card" | "bare"
}

export function DatePicker({
  mode = "single",
  variant = "card",
  className,
  ...rest
}: DatePickerProps) {
  return (
    <div
      className={cn(
        "ds-datepicker inline-block p-3 text-ink",
        variant === "card" && "rounded-md border border-hairline bg-canvas shadow-elev-1",
        className,
      )}
    >
      <DayPicker
        animate
        showOutsideDays
        navLayout="around"
        components={{
          Chevron: ({ orientation }) => (
            <Icon
              icon={orientation === "right" ? ArrowRight02Icon : ArrowLeft02Icon}
              size={14}
            />
          ),
        }}
        // Predictable range flow (from → to → reset). Consumers can still
        // override by passing their own resetOnSelect.
        {...(mode === "range" ? { resetOnSelect: true } : {})}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mode={mode as any}
        {...rest}
      />
    </div>
  )
}
DatePicker.displayName = "DatePicker"
