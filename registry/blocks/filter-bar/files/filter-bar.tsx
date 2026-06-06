// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { ChipInput } from "@/components/ui/chip-input"
import { Collapsible } from "@/components/ui/motion"
import { DateField } from "@/components/ui/date-field"
import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { SavedFilters, type SavedFilter } from "@/components/ui/saved-filters"
import { SearchField } from "@/components/ui/search-field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import * as React from "react"
import type { DateRange } from "react-day-picker"
import { FilterIcon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

/**
 * FilterBar — a horizontal filter row: full-text search, saved-view presets,
 * a tag/chip filter, and a date-range field. Sits above a table or list.
 *
 * All state is local and self-contained — lift it up or wire it to a query
 * as needed.
 */

const SAVED_VIEWS: SavedFilter[] = [
  { id: "all", label: "All records" },
  { id: "mine", label: "Assigned to me" },
  { id: "recent", label: "Updated this week" },
  { id: "flagged", label: "Flagged" },
]

export interface FilterBarProps {
  onChange?: (state: {
    query: string
    view: string
    tags: string[]
    range: DateRange | null
  }) => void
}

export function FilterBar({ onChange }: FilterBarProps) {
  const [query, setQuery] = React.useState("")
  const [view, setView] = React.useState("all")
  const [tags, setTags] = React.useState<string[]>([])
  const [range, setRange] = React.useState<DateRange | null>(null)
  const [more, setMore] = React.useState(false)

  // Keep the latest onChange in a ref so the effect below depends only on the
  // filter *values* — not on onChange's identity. Without this, passing an
  // inline `onChange={...}` would re-run the effect on every render.
  const onChangeRef = React.useRef(onChange)
  React.useEffect(() => {
    onChangeRef.current = onChange
  })
  React.useEffect(() => {
    onChangeRef.current?.({ query, view, tags, range })
  }, [query, view, tags, range])

  return (
    <div>
      <section className="flex flex-wrap items-center gap-2">
        <div className="min-w-[200px] flex-1">
          <SearchField value={query} onChange={setQuery} placeholder="Search…" />
        </div>
        <SavedFilters filters={SAVED_VIEWS} value={view} onChange={setView} />
        <div className="min-w-[180px]">
          <ChipInput value={tags} onChange={setTags} placeholder="Add tags…" />
        </div>
        <div className="min-w-[220px]">
          <DateField mode="range" value={range} onChange={setRange} placeholder="Date range" clearable />
        </div>
        <Button
          variant="secondary"
          leading={<Icon icon={FilterIcon} size="sm" />}
          trailing={<Icon icon={ArrowDown01Icon} size="sm" className={cn("transition-transform duration-[var(--dur-base)]", more && "rotate-180")} />}
          aria-expanded={more}
          onClick={() => setMore((m) => !m)}
        >
          More
        </Button>
      </section>

      {/* Advanced filters reveal smoothly via <Collapsible> (grid-rows). */}
      <Collapsible open={more}>
        <div className="mt-3 grid gap-3 border-t border-hairline pt-3 sm:grid-cols-3">
          <div className="grid gap-1.5">
            <Label htmlFor="fb-status">Status</Label>
            <Select defaultValue="any">
              <SelectTrigger id="fb-status" size="sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="fb-owner">Owner</Label>
            <Select defaultValue="anyone">
              <SelectTrigger id="fb-owner" size="sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="anyone">Anyone</SelectItem>
                <SelectItem value="me">Me</SelectItem>
                <SelectItem value="team">My team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="fb-priority">Priority</Label>
            <Select defaultValue="any">
              <SelectTrigger id="fb-priority" size="sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Collapsible>
    </div>
  )
}
