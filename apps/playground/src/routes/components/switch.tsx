import { useState } from "react"
import { Switch, Label } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SwitchPage() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Switch"
        status="stable"
        description="Renamed from Toggle in v3.9 for Polaris alignment. 32×18 track, 14px knob, ease-emphasis bounce."
      />

      <Section title="Default">
        <Demo
          code={`const [enabled, setEnabled] = useState(true)
<Switch checked={enabled} onCheckedChange={setEnabled} />`}
        >
          <div className="flex items-center gap-3">
            <Switch checked={a} onCheckedChange={setA} id="s-a" />
            <Label htmlFor="s-a">Notifications enabled</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={b} onCheckedChange={setB} id="s-b" />
            <Label htmlFor="s-b">Dark mode auto</Label>
          </div>
        </Demo>
      </Section>

      <Section title="Tones" description="Tone overrides the on-state track color.">
        <Demo
          code={`<Switch tone="success" defaultChecked />
<Switch tone="warning" defaultChecked />
<Switch tone="critical" defaultChecked />
<Switch tone="info" defaultChecked />`}
        >
          <Switch tone="default" defaultChecked />
          <Switch tone="success" defaultChecked />
          <Switch tone="warning" defaultChecked />
          <Switch tone="critical" defaultChecked />
          <Switch tone="info" defaultChecked />
        </Demo>
      </Section>

      <Section title="Disabled">
        <Demo code={`<Switch disabled />\n<Switch disabled defaultChecked />`}>
          <Switch disabled />
          <Switch disabled defaultChecked />
        </Demo>
      </Section>
    </div>
  )
}
