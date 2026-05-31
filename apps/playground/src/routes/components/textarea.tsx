import { Textarea, Label } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function TextareaPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Textarea"
        status="stable"
        description="Same surface as Input. Optional character counter that turns warning at 90% and error at 100%."
      />

      <Section title="Default">
        <Demo
          code={`<Label htmlFor="notes">Notes</Label>
<Textarea id="notes" placeholder="Add a note…" />`}
        >
          <div className="w-full max-w-md space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add a note…" />
          </div>
        </Demo>
      </Section>

      <Section title="With character counter">
        <Demo
          code={`<Textarea
  maxLength={200}
  showCount
  defaultValue="Bulk order — packaged in 4 boxes."
/>`}
        >
          <div className="w-full max-w-md">
            <Textarea
              maxLength={200}
              showCount
              defaultValue="Bulk order — packaged in 4 boxes."
            />
          </div>
        </Demo>
      </Section>

      <Section title="Approaching limit (warning at 90%)">
        <Demo code={`<Textarea maxLength={50} showCount defaultValue="..." />`}>
          <div className="w-full max-w-md">
            <Textarea
              maxLength={50}
              showCount
              defaultValue="Approaching the maximum length warning"
            />
          </div>
        </Demo>
      </Section>

      <Section title="Disabled">
        <Demo code={`<Textarea disabled defaultValue="..." />`}>
          <div className="w-full max-w-md">
            <Textarea
              disabled
              defaultValue="Read-only example."
            />
          </div>
        </Demo>
      </Section>
    </div>
  )
}
