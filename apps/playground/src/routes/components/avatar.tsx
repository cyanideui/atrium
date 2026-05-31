import { Avatar } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function AvatarPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Avatar"
        status="stable"
        description="Single-user primitive. Image with initials fallback. Five sizes, eight tonal palettes."
      />

      <Section title="Sizes">
        <Demo
          code={`<Avatar size="xs" name="John Doe" />
<Avatar size="sm" name="John Doe" />
<Avatar size="md" name="John Doe" />
<Avatar size="lg" name="John Doe" />
<Avatar size="xl" name="John Doe" />`}
        >
          <Avatar size="xs" name="John Doe" />
          <Avatar size="sm" name="John Doe" />
          <Avatar size="md" name="John Doe" />
          <Avatar size="lg" name="John Doe" />
          <Avatar size="xl" name="John Doe" />
        </Demo>
      </Section>

      <Section title="Tones">
        <Demo
          code={`<Avatar tone="ink" name="John Doe" />
<Avatar tone="info" name="Anna S" />
<Avatar tone="success" name="Mike K" />
<Avatar tone="warning" name="Rae L" />
<Avatar tone="critical" name="Tom B" />
<Avatar tone="new" name="Zoe N" />
<Avatar tone="attention" name="Eli W" />
<Avatar tone="readonly" name="Sam P" />`}
        >
          <Avatar tone="ink" name="John Doe" />
          <Avatar tone="info" name="Anna S" />
          <Avatar tone="success" name="Mike K" />
          <Avatar tone="warning" name="Rae L" />
          <Avatar tone="critical" name="Tom B" />
          <Avatar tone="new" name="Zoe N" />
          <Avatar tone="attention" name="Eli W" />
          <Avatar tone="readonly" name="Sam P" />
        </Demo>
      </Section>

      <Section title="With status indicator">
        <Demo code={`<Avatar name="John Doe" status="success" />`}>
          <Avatar name="John Doe" status="success" />
          <Avatar name="John Doe" status="warning" />
          <Avatar name="John Doe" status="critical" />
          <Avatar name="John Doe" status="info" />
        </Demo>
      </Section>

      <Section title="Image with fallback">
        <Demo code={`<Avatar src="/broken.jpg" name="John Doe" size="lg" />`}>
          <Avatar src="https://i.pravatar.cc/40?img=12" name="John Doe" size="lg" />
          <Avatar src="https://broken-url-on-purpose" name="John Doe" size="lg" />
          <Avatar size="lg" />
        </Demo>
      </Section>
    </div>
  )
}
