// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import * as React from "react"

/**
 * FormSection — a validated form scaffold: a titled section, labelled fields
 * with inline error messages, and a submit/cancel footer with a busy state.
 * Includes a <Field> helper that wires label + control + error together.
 *
 * Replace the demo fields + validate() with your schema (or a library like
 * zod / react-hook-form). The Field wrapper works with any control.
 */

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: React.ReactNode
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </Label>
      {children}
      {error ? (
        <p className="m-0 text-[12px] text-error">{error}</p>
      ) : hint ? (
        <p className="m-0 text-[12px] text-ink-3">{hint}</p>
      ) : null}
    </div>
  )
}

interface FormValues {
  name: string
  email: string
  role: string
  notes: string
}

export function FormSection({
  onSubmit,
  onCancel,
}: {
  onSubmit?: (values: FormValues) => void
  onCancel?: () => void
}) {
  const [values, setValues] = React.useState<FormValues>({ name: "", email: "", role: "", notes: "" })
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormValues, string>>>({})
  const [busy, setBusy] = React.useState(false)

  const set = (key: keyof FormValues, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (v: FormValues) => {
    const next: Partial<Record<keyof FormValues, string>> = {}
    if (!v.name.trim()) next.name = "Name is required."
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) next.email = "Enter a valid email address."
    if (!v.role) next.role = "Pick a role."
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setBusy(true)
    // Simulate an async save — replace with your mutation.
    window.setTimeout(() => {
      setBusy(false)
      onSubmit?.(values)
    }, 700)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col rounded-md border border-hairline bg-canvas"
      noValidate
    >
      <div className="border-b border-hairline px-5 py-3">
        <h2 className="m-0 text-[14px] font-semibold text-ink">Invite a teammate</h2>
        <p className="mt-0.5 text-[12.5px] text-ink-3">They&apos;ll get an email to join your workspace.</p>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <Field label="Full name" htmlFor="fs-name" required error={errors.name}>
          <Input
            id="fs-name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={cn(errors.name && "border-error focus-visible:ring-error")}
          />
        </Field>

        <Field label="Email" htmlFor="fs-email" required error={errors.email} hint="We'll send the invite here.">
          <Input
            id="fs-email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={cn(errors.email && "border-error focus-visible:ring-error")}
          />
        </Field>

        <Field label="Role" htmlFor="fs-role" required error={errors.role}>
          <Select value={values.role} onValueChange={(v) => set("role", v)}>
            <SelectTrigger id="fs-role" aria-invalid={!!errors.role}>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Note" htmlFor="fs-notes" hint="Optional — included in the invite email.">
          <Textarea
            id="fs-notes"
            rows={3}
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-hairline px-5 py-3">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button type="submit" loading={busy}>
          Send invite
        </Button>
      </div>
    </form>
  )
}
