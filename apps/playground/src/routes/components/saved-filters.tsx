import { useState } from "react"
import { SavedFilters } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SavedFiltersPage() {
  const [active, setActive] = useState("active")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Saved Filters"
        status="stable"
        description="Compact dropdown for switching between filter presets. Active preset shown as the trigger label."
      />

      <Section title="Default">
        <Demo
          code={`<SavedFilters value={preset} onChange={setPreset} filters={[
  { id: "all", label: "All orders" },
  { id: "active", label: "Active orders" },
  { id: "pending", label: "Pending review" },
  { id: "high-value", label: "High value (≥$500)" },
]} />`}
        >
          <SavedFilters
            value={active}
            onChange={setActive}
            filters={[
              { id: "all", label: "All orders" },
              { id: "active", label: "Active orders" },
              { id: "pending", label: "Pending review" },
              { id: "high-value", label: "High value (≥$500)" },
            ]}
          />
          <span className="ml-2 text-[12px] text-ink-3">
            active: <code className="text-ink">{active}</code>
          </span>
        </Demo>
      </Section>

      <Section title="With save-current footer">
        <Demo
          code={`<SavedFilters ... onSaveCurrent={() => alert("save")} />`}
        >
          <SavedFilters
            defaultValue="active"
            onSaveCurrent={() => alert("Open save preset modal")}
            filters={[
              { id: "all", label: "All orders" },
              { id: "active", label: "Active orders" },
              { id: "pending", label: "Pending review" },
            ]}
          />
        </Demo>
      </Section>
    </div>
  )
}
