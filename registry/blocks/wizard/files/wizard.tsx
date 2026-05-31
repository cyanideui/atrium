// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/ui/stepper"
import * as React from "react"

/**
 * Wizard — a multi-step flow shell built on <Stepper>. Owns the current-step
 * index, renders the active step's content, and wires Back / Next / Finish
 * with per-step validation gating (Next is disabled until the step is valid).
 *
 * Replace STEPS + the step bodies + validate() with your flow. The shell logic
 * (navigation, gating, progress) is the reusable part.
 */

const STEPS = [
  { label: "Account", description: "Your details" },
  { label: "Workspace", description: "Name it" },
  { label: "Invite", description: "Optional" },
  { label: "Done", description: "Review" },
]

interface WizardData {
  name: string
  email: string
  workspace: string
  invite: string
}

export function Wizard({ onFinish }: { onFinish?: (data: WizardData) => void }) {
  const [step, setStep] = React.useState(0)
  const [data, setData] = React.useState<WizardData>({ name: "", email: "", workspace: "", invite: "" })
  const set = (k: keyof WizardData, v: string) => setData((p) => ({ ...p, [k]: v }))

  // Per-step validity — Next/Finish is gated on this.
  const stepValid = React.useMemo(() => {
    switch (step) {
      case 0:
        return data.name.trim() !== "" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)
      case 1:
        return data.workspace.trim() !== ""
      default:
        return true
    }
  }, [step, data])

  const isLast = step === STEPS.length - 1
  const back = () => setStep((s) => Math.max(0, s - 1))
  const next = () => {
    if (!stepValid) return
    if (isLast) onFinish?.(data)
    else setStep((s) => Math.min(STEPS.length - 1, s + 1))
  }

  return (
    <section className="flex flex-col gap-6 rounded-md border border-hairline bg-canvas p-5">
      <Stepper steps={STEPS} current={step} />

      <div className="min-h-[140px]">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="wz-name">Full name</Label>
              <Input id="wz-name" value={data.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="wz-email">Email</Label>
              <Input id="wz-email" type="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="grid gap-1.5">
            <Label htmlFor="wz-ws">Workspace name</Label>
            <Input id="wz-ws" value={data.workspace} onChange={(e) => set("workspace", e.target.value)} placeholder="Acme Inc." />
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-1.5">
            <Label htmlFor="wz-invite">Invite a teammate (optional)</Label>
            <Input id="wz-invite" type="email" value={data.invite} onChange={(e) => set("invite", e.target.value)} placeholder="teammate@acme.com" />
          </div>
        )}
        {step === 3 && (
          <dl className="m-0 flex flex-col gap-2 text-[13px]">
            {[
              ["Name", data.name || "—"],
              ["Email", data.email || "—"],
              ["Workspace", data.workspace || "—"],
              ["Invite", data.invite || "none"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-hairline pb-2 last:border-0">
                <dt className="text-ink-3">{k}</dt>
                <dd className="m-0 font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={back} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={next} disabled={!stepValid}>
          {isLast ? "Finish" : "Next"}
        </Button>
      </div>
    </section>
  )
}
