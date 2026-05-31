import { useState } from "react"
import { NumberStepper, Label } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function NumberStepperPage() {
  const [qty, setQty] = useState(1)

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Number Stepper"
        status="stable"
        description="Bordered group with divider lines. Compact, tactile increment/decrement."
      />

      <Section title="Default">
        <Demo
          code={`const [qty, setQty] = useState(1)
<NumberStepper value={qty} onChange={setQty} min={0} max={99} />`}
        >
          <div className="flex items-center gap-3">
            <Label htmlFor="qty">Quantity</Label>
            <NumberStepper id="qty" value={qty} onChange={setQty} min={0} max={99} />
          </div>
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo code={`<NumberStepper size="sm" />`}>
          <NumberStepper size="sm" defaultValue={5} />
          <NumberStepper size="md" defaultValue={5} />
          <NumberStepper size="lg" defaultValue={5} />
        </Demo>
      </Section>

      <Section title="With min/max bounds (disables at edges)">
        <Demo code={`<NumberStepper defaultValue={0} min={0} max={5} />`}>
          <NumberStepper defaultValue={0} min={0} max={5} />
        </Demo>
      </Section>

      <Section title="Custom step">
        <Demo code={`<NumberStepper defaultValue={50} step={10} />`}>
          <NumberStepper defaultValue={50} step={10} />
        </Demo>
      </Section>

      <Section title="Disabled">
        <Demo code={`<NumberStepper disabled defaultValue={5} />`}>
          <NumberStepper disabled defaultValue={5} />
        </Demo>
      </Section>
    </div>
  )
}
