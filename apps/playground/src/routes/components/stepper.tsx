import { useState } from "react"
import { Stepper, Button, ButtonGroup } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

const STEPS = [
  { label: "Details" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Review" },
]

export function StepperPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Stepper / Wizard"
        status="stable"
        description="Horizontal numbered steps with connector lines. Active step highlighted with a soft ring. Completed steps show a check."
      />

      <Section title="Default">
        <Demo
          code={`<Stepper steps={[
  { label: "Details" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Review" },
]} current={1} />`}
        >
          <div className="w-full">
            <Stepper steps={STEPS} current={step} />
            <ButtonGroup className="mt-6 justify-end" align="end">
              <Button variant="secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                Back
              </Button>
              <Button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>
                Next
              </Button>
            </ButtonGroup>
          </div>
        </Demo>
      </Section>

      <Section title="With descriptions">
        <Demo
          code={`<Stepper steps={[
  { label: "Details", description: "Customer info" },
  ...
]} current={2} />`}
        >
          <div className="w-full">
            <Stepper
              steps={[
                { label: "Details", description: "Customer info" },
                { label: "Shipping", description: "Address & method" },
                { label: "Payment", description: "Choose how to pay" },
                { label: "Review", description: "Confirm and place" },
              ]}
              current={2}
            />
          </div>
        </Demo>
      </Section>

      <Section title="All complete">
        <Demo code={`<Stepper steps={...} current={4} />`}>
          <div className="w-full">
            <Stepper steps={STEPS} current={4} />
          </div>
        </Demo>
      </Section>
    </div>
  )
}
