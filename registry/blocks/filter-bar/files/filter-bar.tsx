// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { ChipInput } from "@/components/ui/chip-input"
import { DateField } from "@/components/ui/date-field"
import { Icon } from "@/components/ui/icon"
import { SavedFilters, type SavedFilter } from "@/components/ui/saved-filters"
import { SearchField } from "@/components/ui/search-field"
import * as React from "react"
import type { DateRange } from "react-day-picker"
import { FilterIcon } from "@hugeicons/core-free-icons"

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

  React.useEffect(() => {
    onChange?.({ query, view, tags, range })
  }, [query, view, tags, range, onChange])

  return (
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
      <Button variant="secondary" leading={<Icon icon={FilterIcon} size="sm" />}>
        More
      </Button>
    </section>
  )
}
