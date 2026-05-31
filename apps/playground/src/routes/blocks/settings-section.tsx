import * as React from "react"
import { Button, Input, Label, Switch, Textarea } from "@cyanideui/ui"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-4">{children}</div>
}

function SettingsSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
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

export function SettingsSectionBlock() {
  const [name, setName] = React.useState("Jane Cooper")
  const [bio, setBio] = React.useState("Operations lead at Acme.")
  const [emailNotifications, setEmailNotifications] = React.useState(true)

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Settings section"
        status="stable"
        description="Labeled form section — title + description header over field rows, plus a RowToggle for boolean settings. Compose several down a settings page."
      />

      <Section title="Preview">
        <div className="flex flex-col gap-4 rounded-md border border-hairline bg-surface p-6">
          <SettingsSection title="Identity" description="How you appear across the app.">
            <FieldRow>
              <Label htmlFor="demo-name">Display name</Label>
              <Input id="demo-name" value={name} onChange={(e) => setName(e.target.value)} />
            </FieldRow>
            <FieldRow>
              <Label htmlFor="demo-bio">Bio</Label>
              <Textarea id="demo-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </FieldRow>
          </SettingsSection>

          <SettingsSection title="Notifications" description="Choose where activity shows up.">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-ink">Email notifications</span>
                <span className="text-[12px] text-ink-3">Order updates, mentions, and weekly summaries.</span>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
          </SettingsSection>

          <div className="flex justify-end gap-2">
            <Button variant="secondary">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add settings-section`} />
      </Section>
    </>
  )
}
