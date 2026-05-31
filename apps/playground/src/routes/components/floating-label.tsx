import { FloatingLabelInput } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function FloatingLabelPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Floating Label Input"
        status="stable"
        description="Material-style label that floats up and notches the outline on focus or when filled."
      />

      <Section title="States">
        <Demo
          code={`<FloatingLabelInput label="Email" />
<FloatingLabelInput label="Email" defaultValue="hi@example.com" />
<FloatingLabelInput label="Email" error="Please enter a valid email" />
<FloatingLabelInput label="Email" disabled defaultValue="locked@example.com" />`}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <FloatingLabelInput label="Default — empty" />
            <FloatingLabelInput
              label="Filled value"
              defaultValue="Filled value"
            />
            <FloatingLabelInput
              label="Email"
              defaultValue="not-an-email"
              error="Please enter a valid email address"
            />
            <FloatingLabelInput
              label="Disabled"
              disabled
              defaultValue="Cannot edit"
            />
          </div>
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo
          code={`<FloatingLabelInput size="sm" label="Small" />
<FloatingLabelInput size="md" label="Default" />
<FloatingLabelInput size="lg" label="Large" />`}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <FloatingLabelInput size="sm" label="Small (40px)" />
            <FloatingLabelInput size="md" label="Default (48px)" />
            <FloatingLabelInput size="lg" label="Large (56px)" />
          </div>
        </Demo>
      </Section>

      <Section title="With help text">
        <Demo code={`<FloatingLabelInput label="API key" helpText="Keep it secret." />`}>
          <FloatingLabelInput
            label="API key"
            helpText="Keep this token private — anyone with it can call your API."
            className="max-w-md"
          />
        </Demo>
      </Section>
    </div>
  )
}
