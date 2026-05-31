// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"

/**
 * SettingsSection — a labeled form section: a title + description header over
 * a stack of field rows, plus a RowToggle for boolean settings. Compose
 * several of these down a settings page.
 *
 * The demo export shows a typical profile section — delete it once wired.
 */

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4 rounded-md border border-hairline bg-canvas p-5">
      <div>
        <h2 className="m-0 text-[14px] font-semibold text-ink">{title}</h2>
        {description && <p className="mt-1 text-[12.5px] text-ink-3">{description}</p>}
      </div>
      {children}
    </section>
  )
}

/** A label + control row that stacks on mobile, two-column on larger screens. */
export function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-4">
      {children}
    </div>
  )
}

/** A label/description on the left, a Switch on the right. */
export function RowToggle({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-ink">{label}</span>
        {description && <span className="text-[12px] text-ink-3">{description}</span>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

/** Demo usage — delete once you've wired your own sections. */
export function SettingsSectionDemo() {
  const [name, setName] = React.useState("Jane Cooper")
  const [bio, setBio] = React.useState("Operations lead at Acme.")
  const [emailNotifications, setEmailNotifications] = React.useState(true)

  return (
    <div className="flex flex-col gap-4">
      <SettingsSection title="Identity" description="How you appear across the app.">
        <FieldRow>
          <Label htmlFor="settings-name">Display name</Label>
          <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="settings-bio">Bio</Label>
          <Textarea id="settings-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
        </FieldRow>
      </SettingsSection>

      <SettingsSection title="Notifications" description="Choose where activity shows up.">
        <RowToggle
          label="Email notifications"
          description="Order updates, mentions, and weekly summaries."
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
      </SettingsSection>

      <div className="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  )
}
