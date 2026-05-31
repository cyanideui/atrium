import { useState } from "react"
import { Chip, ClickableChip, Icon } from "@atrium/ui"
import { Tag01Icon } from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ChipPage() {
  const [filters, setFilters] = useState<string[]>(["sale", "in-stock"])
  const toggle = (v: string) =>
    setFilters((f) => (f.includes(v) ? f.filter((x) => x !== v) : [...f, v]))

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Chip / Clickable Chip"
        status="stable"
        description="Standalone label primitive (Chip) and interactive variant (ClickableChip) for filters, tags, suggestions."
      />

      <Section title="Variants" description="Soft (default) or outlined.">
        <Demo
          code={`<Chip>Electronics</Chip>
<Chip variant="outline">Wireless</Chip>
<Chip leading={<Icon icon={Tag01Icon} size={14} />}>Tagged</Chip>`}
        >
          <Chip>Electronics</Chip>
          <Chip variant="outline">Wireless</Chip>
          <Chip leading={<Icon icon={Tag01Icon} size={14} />}>Tagged</Chip>
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo code={`<Chip size="sm">Small</Chip>`}>
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
        </Demo>
      </Section>

      <Section title="Clickable — toggle (filter chips)">
        <Demo
          code={`<ClickableChip pressed={selected.includes("sale")} onClick={() => toggle("sale")}>On sale</ClickableChip>`}
        >
          {[
            ["sale", "On sale"],
            ["in-stock", "In stock"],
            ["new", "New arrivals"],
            ["clearance", "Clearance"],
          ].map(([v, l]) => (
            <ClickableChip
              key={v as string}
              pressed={filters.includes(v as string)}
              onClick={() => toggle(v as string)}
            >
              {l as string}
            </ClickableChip>
          ))}
        </Demo>
      </Section>

      <Section title="Clickable — removable">
        <Demo
          code={`<ClickableChip onRemove={() => alert("removed")}>Active filter</ClickableChip>`}
        >
          <ClickableChip onRemove={() => alert("removed")}>Status: paid</ClickableChip>
          <ClickableChip onRemove={() => alert("removed")}>Date: last 30 days</ClickableChip>
          <ClickableChip onRemove={() => alert("removed")} variant="soft">
            Soft variant
          </ClickableChip>
        </Demo>
      </Section>
    </div>
  )
}
