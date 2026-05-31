import { Button, Icon } from "@cyanideui/ui"
import { Add01Icon, Delete02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ButtonPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Button"
        status="stable"
        description="Separates shape (variant) from intent (tone). Polaris-aligned API."
      />

      <Section
        title="Variants"
        description="Variant controls the shape: primary, secondary, tertiary, plain."
      >
        <Demo
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="plain">Plain link</Button>`}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="plain">Plain link</Button>
        </Demo>
      </Section>

      <Section
        title="Tones"
        description="Tone controls the intent. Same component, layered color treatment for each variant."
      >
        <Demo
          code={`<Button tone="default">Default</Button>
<Button tone="critical">Critical</Button>
<Button tone="success">Success</Button>
<Button tone="warning">Warning</Button>
<Button tone="info">Info</Button>`}
        >
          <Button tone="default">Default</Button>
          <Button tone="critical">Critical</Button>
          <Button tone="success">Success</Button>
          <Button tone="warning">Warning</Button>
          <Button tone="info">Info</Button>
        </Demo>
      </Section>

      <Section
        title="Sizes"
        description="micro · sm · md (default) · lg"
      >
        <Demo
          code={`<Button size="micro">Micro</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <Button size="micro">Micro</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Demo>
      </Section>

      <Section title="With icons">
        <Demo
          code={`<Button leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
<Button variant="secondary" trailing={<Icon icon={ArrowRight02Icon} size="sm" />}>Continue</Button>
<Button variant="tertiary" tone="critical" leading={<Icon icon={Delete02Icon} size="sm" />}>Delete</Button>`}
        >
          <Button leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
          <Button variant="secondary" trailing={<Icon icon={ArrowRight02Icon} size="sm" />}>
            Continue
          </Button>
          <Button
            variant="tertiary"
            tone="critical"
            leading={<Icon icon={Delete02Icon} size="sm" />}
          >
            Delete
          </Button>
        </Demo>
      </Section>

      <Section
        title="States"
        description="Loading replaces the leading slot with a spinner and disables the button."
      >
        <Demo
          code={`<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>
<Button variant="secondary" loading>Saving…</Button>`}
        >
          <Button loading>Saving…</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" loading>
            Saving…
          </Button>
        </Demo>
      </Section>

      <Section title="Full matrix" description="Variant × tone reference grid.">
        <div className="space-y-3">
          {(["primary", "secondary", "tertiary", "plain"] as const).map((variant) => (
            <div key={variant} className="rounded-md border border-hairline bg-canvas p-4">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                {variant}
              </div>
              <div className="flex flex-wrap gap-2">
                {(["default", "critical", "success", "warning", "info"] as const).map((tone) => (
                  <Button key={tone} variant={variant} tone={tone}>
                    {tone}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
