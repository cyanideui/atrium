import { Spinner, Button } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SpinnerPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Spinner"
        status="stable"
        description="Standalone loading indicator. 4 sizes. Used inside Button loading state."
      />

      <Section title="Sizes">
        <Demo code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`} align="center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </Demo>
      </Section>

      <Section title="Tones">
        <Demo
          code={`<Spinner tone="default" />
<Spinner tone="muted" />
<Spinner tone="success" />
<Spinner tone="warning" />
<Spinner tone="critical" />
<Spinner tone="info" />`}
          align="center"
        >
          <Spinner tone="default" />
          <Spinner tone="muted" />
          <Spinner tone="success" />
          <Spinner tone="warning" />
          <Spinner tone="critical" />
          <Spinner tone="info" />
        </Demo>
      </Section>

      <Section title="Inside a Button">
        <Demo code={`<Button loading>Saving…</Button>`}>
          <Button loading>Saving…</Button>
          <Button variant="secondary" loading>
            Saving…
          </Button>
          <Button variant="primary" tone="critical" loading>
            Deleting…
          </Button>
        </Demo>
      </Section>

      <Section title="Centered in a region">
        <Demo
          code={`<div className="flex items-center justify-center p-12">
  <Spinner size="lg" tone="muted" />
</div>`}
        >
          <div className="flex h-32 w-full items-center justify-center">
            <Spinner size="lg" tone="muted" />
          </div>
        </Demo>
      </Section>
    </div>
  )
}
