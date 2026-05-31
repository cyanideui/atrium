import { Input, Label } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function InputPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Input"
        status="stable"
        description="Bordered surface, 1px hairline-strong on canvas. Focus → 1px ink + ring."
      />

      <Section title="Sizes">
        <Demo
          code={`<Input size="sm" placeholder="Small (28px)" />
<Input size="md" placeholder="Medium (36px) — default" />
<Input size="lg" placeholder="Large (40px)" />`}
        >
          <div className="flex w-full flex-col gap-3">
            <Input size="sm" placeholder="Small (28px)" />
            <Input size="md" placeholder="Medium (36px) — default" />
            <Input size="lg" placeholder="Large (40px)" />
          </div>
        </Demo>
      </Section>

      <Section title="States">
        <Demo
          code={`<Input placeholder="Default" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Invalid" aria-invalid />`}
        >
          <div className="flex w-full flex-col gap-3">
            <Input placeholder="Default" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Invalid" aria-invalid />
          </div>
        </Demo>
      </Section>

      <Section title="With label & help text">
        <Demo
          code={`<div className="space-y-1.5">
  <Label htmlFor="api-key" required>API key</Label>
  <Input id="api-key" placeholder="sk-..." />
  <p className="text-[12px] text-ink-3">Used for server-to-server authentication. Keep it secret.</p>
</div>`}
        >
          <div className="w-full max-w-sm space-y-1.5">
            <Label htmlFor="api-key" required>
              API key
            </Label>
            <Input id="api-key" placeholder="sk-..." />
            <p className="text-[12px] text-ink-3">
              Used for server-to-server authentication. Keep it secret.
            </p>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
