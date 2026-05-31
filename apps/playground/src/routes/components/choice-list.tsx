import { useState } from "react"
import { ChoiceList } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ChoiceListPage() {
  const [single, setSingle] = useState("paid")
  const [multi, setMulti] = useState<string[]>(["electronics"])
  const [plan, setPlan] = useState("pro")
  const [perms, setPerms] = useState<string[]>(["read", "write"])

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Choice List"
        status="stable"
        description="Grouped radios (single-select) or checkboxes (multi-select) with shared label, descriptions, and tone-aware highlights. Two visual variants: plain rows or bordered cards."
      />

      <Section
        title="Single (radio) — plain"
        description="Default variant. Hover lifts the row bg."
      >
        <Demo
          code={`<ChoiceList
  label="Status filter"
  value={status}
  onChange={setStatus}
  choices={[
    { value: "all", label: "All orders" },
    { value: "paid", label: "Paid only" },
    { value: "pending", label: "Pending review", description: "Awaiting customer payment" },
  ]}
/>`}
        >
          <ChoiceList
            label="Status filter"
            value={single}
            onChange={setSingle}
            choices={[
              { value: "all", label: "All orders" },
              { value: "paid", label: "Paid only" },
              { value: "pending", label: "Pending review", description: "Awaiting customer payment" },
              { value: "failed", label: "Failed" },
            ]}
          />
          <div className="w-full text-[12px] text-ink-3">
            Selected: <span className="font-mono text-ink">{single}</span>
          </div>
        </Demo>
      </Section>

      <Section
        title="Single — card variant"
        description="Each row is a bordered surface that lights up on selection. Tone drives the active border + soft tinted wash."
      >
        <Demo
          code={`<ChoiceList
  variant="card"
  tone="info"
  label="Plan"
  value={plan}
  onChange={setPlan}
  choices={[
    { value: "free", label: "Free", description: "Up to 3 projects, community support" },
    { value: "pro", label: "Pro", description: "Unlimited projects, priority support" },
    { value: "enterprise", label: "Enterprise", description: "SSO, SLA, and dedicated success manager" },
  ]}
/>`}
        >
          <ChoiceList
            variant="card"
            tone="info"
            label="Plan"
            value={plan}
            onChange={setPlan}
            className="w-full max-w-md"
            choices={[
              { value: "free", label: "Free", description: "Up to 3 projects, community support" },
              { value: "pro", label: "Pro", description: "Unlimited projects, priority support" },
              { value: "enterprise", label: "Enterprise", description: "SSO, SLA, and dedicated success manager" },
            ]}
          />
          <div className="w-full text-[12px] text-ink-3">
            Selected: <span className="font-mono text-ink">{plan}</span>
          </div>
        </Demo>
      </Section>

      <Section
        title="Multiple (checkbox) — plain"
        description="Checkboxes share the same chrome family — gradient at rest, solid tone bg when checked."
      >
        <Demo
          code={`<ChoiceList
  type="multiple"
  label="Categories"
  value={selected}
  onChange={setSelected}
  choices={[...]}
/>`}
        >
          <ChoiceList
            type="multiple"
            label="Categories"
            helpText="Select all that apply"
            value={multi}
            onChange={setMulti}
            choices={[
              { value: "electronics", label: "Electronics" },
              { value: "accessories", label: "Accessories" },
              { value: "apparel", label: "Apparel" },
              { value: "discontinued", label: "Discontinued", description: "Will not be re-stocked", disabled: true },
            ]}
          />
          <div className="w-full text-[12px] text-ink-3">
            Selected: <span className="font-mono text-ink">{JSON.stringify(multi)}</span>
          </div>
        </Demo>
      </Section>

      <Section
        title="Multiple — card variant + success tone"
        description="Card layout works for multiple-select too. Selected rows gain a tone-driven border and tinted wash."
      >
        <Demo
          code={`<ChoiceList
  type="multiple"
  variant="card"
  tone="success"
  label="Permissions"
  value={perms}
  onChange={setPerms}
  choices={[
    { value: "read", label: "Read", description: "View resources" },
    { value: "write", label: "Write", description: "Create and update resources" },
    { value: "admin", label: "Admin", description: "Full access including delete and billing" },
  ]}
/>`}
        >
          <ChoiceList
            type="multiple"
            variant="card"
            tone="success"
            label="Permissions"
            value={perms}
            onChange={setPerms}
            className="w-full max-w-md"
            choices={[
              { value: "read", label: "Read", description: "View resources" },
              { value: "write", label: "Write", description: "Create and update resources" },
              { value: "admin", label: "Admin", description: "Full access including delete and billing" },
            ]}
          />
          <div className="w-full text-[12px] text-ink-3">
            Selected: <span className="font-mono text-ink">{JSON.stringify(perms)}</span>
          </div>
        </Demo>
      </Section>

      <Section title="All tones (single, card)">
        <Demo>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {(["default", "info", "success", "warning", "critical"] as const).map((tone) => (
              <ChoiceList
                key={tone}
                variant="card"
                tone={tone}
                label={tone.charAt(0).toUpperCase() + tone.slice(1)}
                defaultValue="b"
                choices={[
                  { value: "a", label: "Option A" },
                  { value: "b", label: "Option B", description: "Currently selected" },
                ]}
              />
            ))}
          </div>
        </Demo>
      </Section>
    </div>
  )
}
