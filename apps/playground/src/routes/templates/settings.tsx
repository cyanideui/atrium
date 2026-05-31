import * as React from "react"
import {
  AutoSaveStatus,
  Avatar,
  Button,
  ChoiceList,
  Icon,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@atrium/ui"
import { Camera01Icon } from "@hugeicons/core-free-icons"

/**
 * Settings template — tabbed sectioned form with autosave. Drop-in for
 * `/settings`, `/account`, `/workspace/preferences`, etc.
 *
 * Pattern:
 *   - Tabs for top-level sections (Profile, Notifications, Security…).
 *   - Each tab is a sectioned form. Each section is a card with a title +
 *     optional description, then field rows.
 *   - AutoSaveStatus pill on the right of the page header.
 *   - Bottom-of-tab "Save changes" sticky footer is OPT-IN — most settings
 *     pages prefer per-section autosave. We default to autosave here.
 */

export function SettingsTemplate() {
  const [autosave, setAutosave] = React.useState<"saved" | "saving" | "error">("saved")
  const [name, setName] = React.useState("Jane Cooper")
  const [email, setEmail] = React.useState("jane@acme.com")
  const [bio, setBio] = React.useState("Operations lead at Acme. Coffee, spreadsheets, and a soft spot for ledgers.")
  const [timezone, setTimezone] = React.useState("America/New_York")
  const [emailNotifications, setEmailNotifications] = React.useState(true)
  const [pushNotifications, setPushNotifications] = React.useState(false)
  const [digest, setDigest] = React.useState("daily")
  const [twoFa, setTwoFa] = React.useState(true)
  const [sessions, setSessions] = React.useState("active")

  // Mock autosave: every state change triggers a "saving" pulse.
  React.useEffect(() => {
    setAutosave("saving")
    const t = window.setTimeout(() => setAutosave("saved"), 600)
    return () => window.clearTimeout(t)
  }, [name, email, bio, timezone, emailNotifications, pushNotifications, digest, twoFa, sessions])

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
            Account
          </div>
          <h1 className="m-0 text-[22px] font-semibold tracking-tight text-ink">Settings</h1>
          <p className="mt-1 max-w-[640px] text-[13px] text-ink-3">
            Manage your profile, notifications, and security. Changes save automatically.
          </p>
        </div>
        <AutoSaveStatus state={autosave} savedAt="just now" />
      </header>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-4 flex flex-col gap-4">
          <SettingsSection
            title="Identity"
            description="How you appear across the app."
          >
            <div className="flex items-center gap-4">
              <Avatar size="lg" name={name} />
              <Button variant="secondary" leading={<Icon icon={Camera01Icon} size="sm" />}>
                Change photo
              </Button>
              <Button variant="tertiary" tone="critical">
                Remove
              </Button>
            </div>

            <FieldRow>
              <Label htmlFor="settings-name">Display name</Label>
              <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
            </FieldRow>

            <FieldRow>
              <Label htmlFor="settings-email">Email</Label>
              <Input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FieldRow>

            <FieldRow>
              <Label htmlFor="settings-bio">Bio</Label>
              <Textarea id="settings-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </FieldRow>
          </SettingsSection>

          <SettingsSection
            title="Localization"
            description="Affects timestamps, currencies, and numbers across the app."
          >
            <FieldRow>
              <Label htmlFor="settings-tz">Time zone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="settings-tz" className="w-[280px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Berlin">Berlin</SelectItem>
                  <SelectItem value="Asia/Singapore">Singapore</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>
          </SettingsSection>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-4 flex flex-col gap-4">
          <SettingsSection
            title="Channels"
            description="Choose where activity shows up. You can change these per project later."
          >
            <RowToggle
              label="Email notifications"
              description="Order updates, mentions, and weekly summaries."
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
            <RowToggle
              label="Push notifications"
              description="Real-time activity in your browser when you're online."
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </SettingsSection>

          <SettingsSection title="Email digest">
            <ChoiceList
              variant="card"
              tone="info"
              value={digest}
              onChange={setDigest}
              choices={[
                { value: "off", label: "Off", description: "Don't send a digest." },
                { value: "daily", label: "Daily", description: "One summary email at 9 a.m. local time." },
                { value: "weekly", label: "Weekly", description: "One summary email Monday morning." },
              ]}
            />
          </SettingsSection>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-4 flex flex-col gap-4">
          <SettingsSection
            title="Two-factor authentication"
            description="Required for accounts on the Pro plan and above."
          >
            <RowToggle
              label="Authenticator app"
              description="Use a TOTP code from your phone when signing in."
              checked={twoFa}
              onCheckedChange={setTwoFa}
              tone="success"
            />
          </SettingsSection>

          <SettingsSection title="Sessions">
            <ChoiceList
              variant="plain"
              value={sessions}
              onChange={setSessions}
              choices={[
                { value: "active", label: "Sign me out after 30 minutes of inactivity" },
                { value: "extended", label: "Stay signed in for 7 days", description: "Recommended for trusted devices only." },
                { value: "always", label: "Always stay signed in" },
              ]}
            />
          </SettingsSection>
        </TabsContent>

        {/* Billing — placeholder */}
        <TabsContent value="billing" className="mt-4">
          <SettingsSection title="Billing" description="Coming soon — managed via the workspace owner.">
            <p className="m-0 text-[13px] text-ink-3">
              Billing tab is intentionally minimal in this template. Drop your invoice list and
              payment method form into this slot.
            </p>
          </SettingsSection>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SettingsSection({
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
        {description && (
          <p className="mt-1 text-[12.5px] text-ink-3">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-4">{children}</div>
}

function RowToggle({
  label,
  description,
  checked,
  onCheckedChange,
  tone = "default",
}: {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
  tone?: "default" | "success" | "warning" | "critical" | "info"
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-ink">{label}</span>
        {description && <span className="text-[12px] text-ink-3">{description}</span>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} tone={tone} />
    </div>
  )
}
