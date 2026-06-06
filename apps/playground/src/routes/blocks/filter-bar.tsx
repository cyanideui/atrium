import * as React from "react"
import {
  Button,
  ChipInput,
  Collapsible,
  DateField,
  Icon,
  Label,
  SavedFilters,
  SearchField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SavedFilter,
  type DateRange,
} from "@cyanideui/ui"
import { FilterIcon, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"
import { cn } from "@cyanideui/ui"

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
  const [more, setMore] = React.useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Filter bar"
        status="stable"
        description="Horizontal filter row — full-text search, saved-view presets, a tag/chip filter, and a date-range field. The More button reveals an advanced-filter panel via <Collapsible>."
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
          <Collapsible open={more} className="mt-0">
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
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add filter-bar`} />
      </Section>
    </>
  )
}
