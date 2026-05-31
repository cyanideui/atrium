import { useState } from "react"
import { ChipInput, Label } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ChipInputPage() {
  const [tags, setTags] = useState<string[]>(["electronics", "accessories"])
  const [emails, setEmails] = useState<string[]>([])

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Chip Input (Tag Input)"
        status="stable"
        description="Multi-value field. Type → Enter or comma to add. Backspace on empty input removes the last chip."
      />

      <Section title="Default">
        <Demo
          code={`<ChipInput value={tags} onChange={setTags} placeholder="Add a tag…" />`}
        >
          <div className="w-full max-w-md space-y-1.5">
            <Label htmlFor="tags">Tags</Label>
            <ChipInput
              id="tags"
              value={tags}
              onChange={setTags}
              placeholder="Add a tag…"
            />
          </div>
        </Demo>
      </Section>

      <Section
        title="With validation (transform)"
        description="Reject candidates that don't look like an email; lowercase the rest."
      >
        <Demo
          code={`<ChipInput
  value={emails}
  onChange={setEmails}
  transform={(raw) => /\\S+@\\S+\\.\\S+/.test(raw) ? raw.toLowerCase() : null}
  placeholder="Add an email…"
/>`}
        >
          <div className="w-full max-w-md space-y-1.5">
            <Label htmlFor="emails">Notify</Label>
            <ChipInput
              id="emails"
              value={emails}
              onChange={setEmails}
              transform={(raw) =>
                /\S+@\S+\.\S+/.test(raw) ? raw.toLowerCase() : null
              }
              placeholder="Add email and press Enter…"
            />
          </div>
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo code={`<ChipInput size="sm" />`}>
          <div className="w-full max-w-md space-y-3">
            <ChipInput size="sm" defaultValue={["a", "b"]} placeholder="Small" />
            <ChipInput size="md" defaultValue={["c"]} placeholder="Medium" />
            <ChipInput size="lg" defaultValue={[]} placeholder="Large" />
          </div>
        </Demo>
      </Section>
    </div>
  )
}
