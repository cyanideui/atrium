import * as React from "react"
import { Button, Input, Label, Stepper } from "@cyanideui/ui"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

const STEPS = [
  { label: "Account", description: "Your details" },
  { label: "Workspace", description: "Name it" },
  { label: "Invite", description: "Optional" },
  { label: "Done", description: "Review" },
]
interface WizardData { name: string; email: string; workspace: string; invite: string }

export function WizardBlock() {
  const [step, setStep] = React.useState(0)
  const [data, setData] = React.useState<WizardData>({ name: "", email: "", workspace: "", invite: "" })
  const set = (k: keyof WizardData, v: string) => setData((p) => ({ ...p, [k]: v }))
  const stepValid = React.useMemo(() => {
    switch (step) {
      case 0: return data.name.trim() !== "" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)
      case 1: return data.workspace.trim() !== ""
      default: return true
    }
  }, [step, data])
  const isLast = step === STEPS.length - 1
  const next = () => { if (!stepValid) return; if (!isLast) setStep((s) => s + 1) }

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Wizard"
        status="stable"
        description="Multi-step flow shell built on <Stepper> — owns the step index, renders the active step, and wires Back / Next / Finish with per-step validation gating (Next disabled until valid)."
      />
      <Section title="Preview" description="Next is disabled until each step validates (step 1 needs a name + valid email; step 2 needs a workspace).">
        <div className="max-w-[560px]">
          <section className="flex flex-col gap-6 rounded-md border border-hairline bg-canvas p-5">
            <Stepper steps={STEPS} current={step} />
            <div className="min-h-[140px]">
              {step === 0 && (
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1.5"><Label htmlFor="d-name">Full name</Label><Input id="d-name" value={data.name} onChange={(e) => set("name", e.target.value)} /></div>
                  <div className="grid gap-1.5"><Label htmlFor="d-email">Email</Label><Input id="d-email" type="email" value={data.email} onChange={(e) => set("email", e.target.value)} /></div>
                </div>
              )}
              {step === 1 && <div className="grid gap-1.5"><Label htmlFor="d-ws">Workspace name</Label><Input id="d-ws" value={data.workspace} onChange={(e) => set("workspace", e.target.value)} placeholder="Acme Inc." /></div>}
              {step === 2 && <div className="grid gap-1.5"><Label htmlFor="d-inv">Invite a teammate (optional)</Label><Input id="d-inv" type="email" value={data.invite} onChange={(e) => set("invite", e.target.value)} placeholder="teammate@acme.com" /></div>}
              {step === 3 && (
                <dl className="m-0 flex flex-col gap-2 text-[13px]">
                  {[["Name", data.name || "—"], ["Email", data.email || "—"], ["Workspace", data.workspace || "—"], ["Invite", data.invite || "none"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-hairline pb-2 last:border-0">
                      <dt className="text-ink-3">{k}</dt><dd className="m-0 font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button variant="secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
              <Button onClick={next} disabled={!stepValid}>{isLast ? "Finish" : "Next"}</Button>
            </div>
          </section>
        </div>
      </Section>
      <Section title="Install"><CodeBlock language="bash" code={`npx cyanideui add wizard`} /></Section>
    </>
  )
}
