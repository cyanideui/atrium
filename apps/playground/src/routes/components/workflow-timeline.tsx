import { Button, WorkflowTimeline, WorkflowTimelineItem, Badge, DensityProvider } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function WorkflowTimelinePage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Workflow Timeline"
        status="stable"
        description="Vertical event timeline with status dots, dotted connectors for pending steps, solid line for completed. Inspired by Linear's run history."
      />

      <Section title="Order fulfillment example">
        <Demo
          code={`<WorkflowTimeline>
  <WorkflowTimelineItem status="complete" title="Order placed" meta="May 13, 09:42 AM" badge={<Badge tone="success" size="sm">Paid</Badge>}>
    Customer placed order via website.
  </WorkflowTimelineItem>
  <WorkflowTimelineItem status="active" title="Packing" meta="May 13, 11:15 AM">
    Items being picked and packed. ETA 2:00 PM.
  </WorkflowTimelineItem>
  <WorkflowTimelineItem status="pending" title="Shipped" isLast>
    Tracking number generated once package leaves warehouse.
  </WorkflowTimelineItem>
</WorkflowTimeline>`}
        >
          <div className="w-full max-w-md">
            <WorkflowTimeline>
              <WorkflowTimelineItem
                status="complete"
                title="Order placed"
                meta="May 13, 09:42 AM"
                badge={<Badge tone="success" size="sm">Paid</Badge>}
              >
                Customer placed order via website. Payment processed successfully.
              </WorkflowTimelineItem>
              <WorkflowTimelineItem
                status="active"
                title="Packing"
                meta="May 13, 11:15 AM"
                badge={<Badge tone="info" size="sm">In progress</Badge>}
              >
                Items being picked and packed. Estimated completion: 2:00 PM.{" "}
                <Button variant="plain" size="sm">View pick list</Button>
              </WorkflowTimelineItem>
              <WorkflowTimelineItem
                status="pending"
                title="Shipped"
                meta="Pending"
                isLast
              >
                Tracking number will be generated once package leaves warehouse.
              </WorkflowTimelineItem>
            </WorkflowTimeline>
          </div>
        </Demo>
      </Section>

      <Section
        title="Density modes"
        description="The event rhythm scales with density (press D to cycle globally, or scope a region with <DensityProvider>). Dots stay the same size; only the vertical spacing tightens. The comfortable mode matches the original spacing."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {(["compact-plus", "compact", "comfortable"] as const).map((d) => (
            <div key={d} className="rounded-md border border-hairline bg-canvas p-4">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">{d}</div>
              <DensityProvider density={d}>
                <WorkflowTimeline>
                  <WorkflowTimelineItem status="complete" title="Order placed" meta="09:42" />
                  <WorkflowTimelineItem status="complete" title="Payment received" meta="09:42" />
                  <WorkflowTimelineItem status="active" title="Packing" meta="11:15" />
                  <WorkflowTimelineItem status="pending" title="Shipped" isLast />
                </WorkflowTimeline>
              </DensityProvider>
            </div>
          ))}
        </div>
      </Section>

      <Section title="With a failed step">
        <Demo code={`<WorkflowTimelineItem status="failed" title="Payment failed" badge={<Badge tone="critical">Failed</Badge>}>...`}>
          <div className="w-full max-w-md">
            <WorkflowTimeline>
              <WorkflowTimelineItem status="complete" title="Order placed" meta="May 13, 09:42 AM">
                Order received.
              </WorkflowTimelineItem>
              <WorkflowTimelineItem
                status="failed"
                title="Payment failed"
                meta="May 13, 09:43 AM"
                badge={<Badge tone="critical" size="sm">Card declined</Badge>}
              >
                Stripe returned: insufficient_funds. Customer has been notified.
              </WorkflowTimelineItem>
              <WorkflowTimelineItem status="pending" title="Retry" isLast>
                Awaiting customer payment update.
              </WorkflowTimelineItem>
            </WorkflowTimeline>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
