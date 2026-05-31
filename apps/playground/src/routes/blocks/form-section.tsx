import * as React from "react"
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  cn,
} from "@cyanideui/ui"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

interface Values { name: string; email: string; role: string; notes: string }

function Field({ label, htmlFor, error, hint, required, children }: { label: React.ReactNode; htmlFor: string; error?: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}{required && <span className="ml-0.5 text-error">*</span>}</Label>
      {children}
      {error ? <p className="m-0 text-[12px] text-error">{error}</p> : hint ? <p className="m-0 text-[12px] text-ink-3">{hint}</p> : null}
    </div>
  )
}

export function FormSectionBlock() {
  const [values, setValues] = React.useState<Values>({ name: "", email: "", role: "", notes: "" })
  const [errors, setErrors] = React.useState<Partial<Record<keyof Values, string>>>({})
  const [busy, setBusy] = React.useState(false)
  const set = (k: keyof Values, v: string) => { setValues((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined })) }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Partial<Record<keyof Values, string>> = {}
    if (!values.name.trim()) next.name = "Name is required."
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) next.email = "Enter a valid email address."
    if (!values.role) next.role = "Pick a role."
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    window.setTimeout(() => setBusy(false), 700)
  }

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Form section"
        status="stable"
        description="Validated form scaffold — titled section, labelled fields with inline error messages, and a submit/cancel footer with a busy state. Includes a <Field> helper (label + control + error)."
      />

      <Section title="Preview" description="Submit with empty fields to see inline validation.">
        <div className="max-w-[480px]">
          <form onSubmit={submit} className="flex flex-col rounded-md border border-hairline bg-canvas" noValidate>
            <div className="border-b border-hairline px-5 py-3">
              <h2 className="m-0 text-[14px] font-semibold text-ink">Invite a teammate</h2>
              <p className="mt-0.5 text-[12.5px] text-ink-3">They&apos;ll get an email to join your workspace.</p>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <Field label="Full name" htmlFor="d-name" required error={errors.name}>
                <Input id="d-name" value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} className={cn(errors.name && "border-error focus-visible:ring-error")} />
              </Field>
              <Field label="Email" htmlFor="d-email" required error={errors.email} hint="We'll send the invite here.">
                <Input id="d-email" type="email" value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} className={cn(errors.email && "border-error focus-visible:ring-error")} />
              </Field>
              <Field label="Role" htmlFor="d-role" required error={errors.role}>
                <Select value={values.role} onValueChange={(v) => set("role", v)}>
                  <SelectTrigger id="d-role" aria-invalid={!!errors.role}><SelectValue placeholder="Select a role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Note" htmlFor="d-notes" hint="Optional — included in the invite email.">
                <Textarea id="d-notes" rows={3} value={values.notes} onChange={(e) => set("notes", e.target.value)} />
              </Field>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-hairline px-5 py-3">
              <Button type="button" variant="secondary" disabled={busy}>Cancel</Button>
              <Button type="submit" loading={busy}>Send invite</Button>
            </div>
          </form>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add form-section`} />
      </Section>
    </>
  )
}
