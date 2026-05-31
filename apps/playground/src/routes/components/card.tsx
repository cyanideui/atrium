import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardBody,
  CardFooter,
  Button,
  Badge,
  KeyValueList,
  KeyValue,
  Icon,
} from "@cyanideui/ui"
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function CardPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Card"
        status="stable"
        description="The system's surface primitive. Every panel, summary, and detail section is a Card: an optional header (title + action), a body, and an optional footer — with hairline dividers between."
      />

      <Section title="Anatomy" description="Header (title + right-aligned action), body, footer.">
        <Demo
          code={`<Card>
  <CardHeader>
    <CardTitle>Customer</CardTitle>
    <CardAction>
      <Button variant="tertiary" size="sm" aria-label="Actions">
        <Icon icon={MoreHorizontalIcon} size="sm" />
      </Button>
    </CardAction>
  </CardHeader>
  <CardBody>…</CardBody>
  <CardFooter>
    <Button variant="secondary">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-[400px]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Customer</CardTitle>
                <Badge tone="success" size="sm">Active</Badge>
              </div>
              <CardAction>
                <Button variant="tertiary" size="sm" aria-label="Actions">
                  <Icon icon={MoreHorizontalIcon} size="sm" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardBody>
              <CardDescription className="mb-3">Account summary for Acme Corporation.</CardDescription>
              <KeyValueList className="text-ink-2">
                <KeyValue label="Customer since" value="Mar 2024" />
                <KeyValue label="Total spend" value="$48,210" />
                <KeyValue label="Open orders" value="3" />
              </KeyValueList>
            </CardBody>
            <CardFooter>
              <Button variant="secondary" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>
        </Demo>
      </Section>

      <Section title="Flush content" description="Omit CardBody and drop a flush element (like a Table) directly under the header — the Card clips it to the rounded corners.">
        <Demo
          code={`<Card>
  <CardHeader><CardTitle>Line items</CardTitle></CardHeader>
  <Table fixed>…</Table>
</Card>`}
        >
          <Card className="w-full max-w-[400px]">
            <CardHeader>
              <CardTitle>Plan</CardTitle>
            </CardHeader>
            <CardBody className="py-8 text-center text-[13px] text-ink-3">
              Body padding comes from <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">CardBody</code>.
            </CardBody>
          </Card>
        </Demo>
      </Section>

      <Section title="KeyValue list" description="The label→value pattern for detail panels. Inline (default) or stacked.">
        <Demo
          code={`<KeyValueList>
  <KeyValue label="Method" value="Visa ···· 4242" />
  <KeyValue label="Authorized" value="$332.18" />
</KeyValueList>`}
        >
          <div className="grid w-full max-w-[480px] gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Inline</CardTitle></CardHeader>
              <CardBody>
                <KeyValueList className="text-ink-2">
                  <KeyValue label="Method" value="Visa ···· 4242" />
                  <KeyValue label="Authorized" value="$332.18" />
                  <KeyValue label="Captured" value="$332.18" />
                </KeyValueList>
              </CardBody>
            </Card>
            <Card>
              <CardHeader><CardTitle>Stacked</CardTitle></CardHeader>
              <CardBody>
                <KeyValueList layout="stacked" className="text-ink-2">
                  <KeyValue label="Shipping address" value="123 Market St, Springfield" />
                  <KeyValue label="Billing address" value="Same as shipping" />
                </KeyValueList>
              </CardBody>
            </Card>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
