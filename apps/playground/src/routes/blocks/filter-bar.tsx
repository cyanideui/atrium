import * as React from "react"
import {
  Button,
  ChipInput,
  DateField,
  Icon,
  SavedFilters,
  SearchField,
  type SavedFilter,
  type DateRange,
} from "@cyanideui/ui"
import { FilterIcon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

const SAVED_VIEWS: SavedFilter[] = [
  { id: "all", label: "All records" },
  { id: "mine", label: "Assigned to me" },
  { id: "recent", label: "Updated this week" },
  { id: "flagged", label: "Flagged" },
]

export function FilterBarBlock() {
  const [query, setQuery] = React.useState("")
  const [view, setView] = React.useState("all")
  const [tags, setTags] = React.useState<string[]>(["priority"])
  const [range, setRange] = React.useState<DateRange | null>(null)

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Filter bar"
        status="stable"
        description="Horizontal filter row — full-text search, saved-view presets, a tag/chip filter, and a date-range field. Sits above a table or list."
      />

      <Section title="Preview">
        <div className="rounded-md border border-hairline bg-canvas p-6">
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
            <Button variant="secondary" leading={<Icon icon={FilterIcon} size="sm" />}>More</Button>
          </section>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add filter-bar`} />
      </Section>
    </>
  )
}
