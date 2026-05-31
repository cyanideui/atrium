import { useState } from "react"
import { Checkbox, Label } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function CheckboxPage() {
  const [a, setA] = useState<boolean | "indeterminate">(true)
  const [b, setB] = useState<boolean | "indeterminate">("indeterminate")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Checkbox"
        status="stable"
        description="Three sizes. Five tone variants. Supports indeterminate state for table 'select all' headers."
      />

      <Section title="Sizes">
        <Demo code={`<Checkbox size="sm" defaultChecked />
<Checkbox size="md" defaultChecked />
<Checkbox size="lg" defaultChecked />`}>
          <div className="flex items-center gap-3">
            <Checkbox size="sm" defaultChecked />
            <Checkbox size="md" defaultChecked />
            <Checkbox size="lg" defaultChecked />
          </div>
        </Demo>
      </Section>

      <Section title="States">
        <Demo
          code={`<Checkbox checked={a} onCheckedChange={setA} />
<Checkbox checked={b} onCheckedChange={setB} /> // indeterminate
<Checkbox disabled />
<Checkbox disabled defaultChecked />`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="c-a" checked={a} onCheckedChange={setA} />
              <Label htmlFor="c-a">Checked</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="c-b" checked={b} onCheckedChange={setB} />
              <Label htmlFor="c-b">Indeterminate (click to toggle)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="c-d" disabled />
              <Label htmlFor="c-d" className="opacity-50">
                Disabled
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="c-dc" disabled defaultChecked />
              <Label htmlFor="c-dc" className="opacity-50">
                Disabled checked
              </Label>
            </div>
          </div>
        </Demo>
      </Section>

      <Section title="Tones">
        <Demo
          code={`<Checkbox tone="default" defaultChecked />
<Checkbox tone="success" defaultChecked />
<Checkbox tone="warning" defaultChecked />
<Checkbox tone="critical" defaultChecked />
<Checkbox tone="info" defaultChecked />`}
        >
          <Checkbox tone="default" defaultChecked />
          <Checkbox tone="success" defaultChecked />
          <Checkbox tone="warning" defaultChecked />
          <Checkbox tone="critical" defaultChecked />
          <Checkbox tone="info" defaultChecked />
        </Demo>
      </Section>
    </div>
  )
}
