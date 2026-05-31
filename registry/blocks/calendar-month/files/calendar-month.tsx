// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import * as React from "react"
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons"

/**
 * CalendarMonth — a month grid with event chips per day. Navigable by month,
 * highlights today, dims out-of-month days, and shows up to 3 events per cell
 * with a "+N more" overflow. Use for schedules, content calendars, bookings.
 *
 * Swap EVENTS (keyed by ISO date) for your data. Pure date math — no calendar
 * library needed.
 */

type EventTone = "default" | "success" | "warning" | "info"

interface CalEvent {
  title: string
  tone?: EventTone
}

const TONE_CHIP: Record<EventTone, string> = {
  default: "bg-surface-2 text-ink-2",
  success: "bg-tone-success-bg text-tone-success-fg",
  warning: "bg-tone-warning-bg text-tone-warning-fg",
  info: "bg-tone-info-bg text-tone-info-fg",
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function isoKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

// Demo events anchored to "today" so the sample always shows something.
const today = new Date()
const rel = (offset: number) => {
  const d = new Date(today)
  d.setDate(today.getDate() + offset)
  return isoKey(d)
}
const EVENTS: Record<string, CalEvent[]> = {
  [rel(0)]: [{ title: "Standup", tone: "info" }, { title: "Ship v1.2", tone: "success" }],
  [rel(1)]: [{ title: "Design review" }],
  [rel(2)]: [{ title: "Invoice due", tone: "warning" }, { title: "1:1 with Jane" }, { title: "Deploy" }, { title: "Retro" }],
  [rel(-3)]: [{ title: "Sprint start", tone: "info" }],
}

export function CalendarMonth() {
  const [cursor, setCursor] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const { cells, monthLabel } = React.useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const first = new Date(year, month, 1)
    const startOffset = first.getDay()
    const start = new Date(year, month, 1 - startOffset)
    const out: Date[] = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      out.push(d)
    }
    return {
      cells: out,
      monthLabel: cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" }),
    }
  }, [cursor])

  const todayKey = isoKey(today)
  const shift = (delta: number) => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1))

  return (
    <section className="overflow-hidden rounded-md border border-hairline bg-canvas">
      <header className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
        <h2 className="m-0 text-[13px] font-semibold text-ink">{monthLabel}</h2>
        <div className="flex items-center gap-1">
          <Button variant="tertiary" size="sm" aria-label="Previous month" onClick={() => shift(-1)}>
            <Icon icon={ArrowLeft02Icon} size="sm" />
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>
            Today
          </Button>
          <Button variant="tertiary" size="sm" aria-label="Next month" onClick={() => shift(1)}>
            <Icon icon={ArrowRight02Icon} size="sm" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-7 border-b border-hairline bg-surface">
        {WEEKDAYS.map((w) => (
          <div key={w} className="px-2 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-ink-4">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          const key = isoKey(d)
          const inMonth = d.getMonth() === cursor.getMonth()
          const isToday = key === todayKey
          const events = EVENTS[key] ?? []
          const shown = events.slice(0, 3)
          const extra = events.length - shown.length
          return (
            <div
              key={i}
              className={cn(
                "min-h-[88px] border-b border-r border-hairline p-1.5 last:border-r-0 [&:nth-child(7n)]:border-r-0",
                !inMonth && "bg-surface/40",
              )}
            >
              <div className="mb-1 flex justify-end">
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-pill px-1 text-[11.5px] tabular-nums",
                    isToday ? "bg-ink font-semibold text-canvas" : inMonth ? "text-ink-2" : "text-ink-4",
                  )}
                >
                  {d.getDate()}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                {shown.map((e, j) => (
                  <span
                    key={j}
                    className={cn("truncate rounded-xs px-1 py-0.5 text-[10.5px] font-medium", TONE_CHIP[e.tone ?? "default"])}
                  >
                    {e.title}
                  </span>
                ))}
                {extra > 0 && <span className="px-1 text-[10.5px] text-ink-4">+{extra} more</span>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
