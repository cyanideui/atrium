import { Avatar, AvatarGroup } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function AvatarGroupPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Avatar Group"
        status="stable"
        description="Overlapping avatars with -8px overlap and a +N overflow counter."
      />

      <Section title="Default">
        <Demo
          code={`<AvatarGroup>
  <Avatar name="John Doe" tone="ink" />
  <Avatar name="Anna Smith" tone="info" />
  <Avatar name="Mike K" tone="success" />
</AvatarGroup>`}
        >
          <AvatarGroup>
            <Avatar name="John Doe" tone="ink" />
            <Avatar name="Anna Smith" tone="info" />
            <Avatar name="Mike K" tone="success" />
          </AvatarGroup>
        </Demo>
      </Section>

      <Section title="With overflow counter">
        <Demo code={`<AvatarGroup max={3}>...8 children...</AvatarGroup>`}>
          <AvatarGroup max={3}>
            <Avatar name="John Doe" tone="ink" />
            <Avatar name="Anna Smith" tone="info" />
            <Avatar name="Mike K" tone="success" />
            <Avatar name="Rae L" tone="warning" />
            <Avatar name="Zoe N" tone="new" />
            <Avatar name="Eli W" tone="attention" />
            <Avatar name="Tom B" tone="critical" />
          </AvatarGroup>
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo code={`<AvatarGroup size="lg">...`}>
          <AvatarGroup size="sm">
            <Avatar name="J D" tone="ink" />
            <Avatar name="A S" tone="info" />
            <Avatar name="M K" tone="success" />
          </AvatarGroup>
          <AvatarGroup size="md">
            <Avatar name="J D" tone="ink" />
            <Avatar name="A S" tone="info" />
            <Avatar name="M K" tone="success" />
          </AvatarGroup>
          <AvatarGroup size="lg">
            <Avatar name="J D" tone="ink" />
            <Avatar name="A S" tone="info" />
            <Avatar name="M K" tone="success" />
          </AvatarGroup>
        </Demo>
      </Section>
    </div>
  )
}
