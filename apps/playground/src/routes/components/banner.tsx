import { Banner, Button } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function BannerPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Banner"
        status="stable"
        description="Inline persistent alert. 4 tones, optional title, actions, dismiss control."
      />

      <Section title="Tones">
        <div className="flex flex-col gap-3">
          <Banner tone="info" title="Heads up">
            3 imports are pending review.
          </Banner>
          <Banner tone="success" title="Inventory synced">
            240 products updated successfully.
          </Banner>
          <Banner tone="warning" title="Trial ending">
            Your trial expires in 3 days.
          </Banner>
          <Banner tone="critical" title="Sync failed">
            2 products could not be updated. Review and retry.
          </Banner>
        </div>
      </Section>

      <Section title="With actions" description="Trailing button cluster for primary + secondary actions.">
        <Demo
          code={`<Banner
  tone="warning"
  title="Trial ending"
  actions={
    <>
      <Button size="sm" variant="primary" tone="warning">Upgrade</Button>
      <Button size="sm" variant="tertiary">Learn more</Button>
    </>
  }
>
  Your trial expires in 3 days.
</Banner>`}
        >
          <Banner
            tone="warning"
            title="Trial ending"
            className="w-full"
            actions={
              <>
                <Button size="sm" variant="primary" tone="warning">
                  Upgrade
                </Button>
                <Button size="sm" variant="tertiary">
                  Learn more
                </Button>
              </>
            }
          >
            Your trial expires in 3 days.
          </Banner>
        </Demo>
      </Section>

      <Section title="Dismissable">
        <Demo
          code={`<Banner tone="info" onDismiss={() => alert("dismissed")} title="Tip">
  You can drag and drop CSV files into the import zone.
</Banner>`}
        >
          <Banner
            tone="info"
            title="Tip"
            className="w-full"
            onDismiss={() => alert("dismissed")}
          >
            You can drag and drop CSV files into the import zone.
          </Banner>
        </Demo>
      </Section>

      <Section title="Compact (no title)">
        <Demo code={`<Banner tone="success" density="compact" iconless>Saved</Banner>`}>
          <Banner tone="success" density="compact" className="w-full" iconless>
            Saved
          </Banner>
        </Demo>
      </Section>
    </div>
  )
}
