import { Badge } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

const TONES = [
  "default",
  "success",
  "warning",
  "critical",
  "info",
  "attention",
  "new",
  "readonly",
] as const

export function BadgePage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Badge"
        status="stable"
        description="Polaris-style: rounded rectangle, leading status dot, sentence case. 8 tones."
      />

      <Section title="Tones">
        <Demo
          code={`<Badge tone="success">Paid</Badge>
<Badge tone="warning">Pending</Badge>
<Badge tone="critical">Failed</Badge>
<Badge tone="info">Processing</Badge>
<Badge tone="attention">Watch</Badge>
<Badge tone="new">New</Badge>
<Badge tone="readonly">Draft</Badge>
<Badge tone="default">Other</Badge>`}
        >
          {TONES.map((t) => (
            <Badge key={t} tone={t}>
              {t === "readonly" ? "Read-only" : t.charAt(0).toUpperCase() + t.slice(1)}
            </Badge>
          ))}
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo code={`<Badge size="sm" tone="success">Small</Badge>
<Badge size="md" tone="success">Medium</Badge>
<Badge size="lg" tone="success">Large</Badge>`}>
          <Badge size="sm" tone="success">
            Small
          </Badge>
          <Badge size="md" tone="success">
            Medium
          </Badge>
          <Badge size="lg" tone="success">
            Large
          </Badge>
        </Demo>
      </Section>

      <Section title="Without leading dot">
        <Demo code={`<Badge tone="info" dotless>Dotless</Badge>`}>
          <Badge tone="info" dotless>
            Dotless
          </Badge>
          <Badge tone="success" dotless>
            Synced
          </Badge>
        </Demo>
      </Section>

      <Section title="Domain mapping (ERP)">
        <div className="overflow-hidden rounded-md border border-hairline bg-canvas">
          {[
            ["Paid", "success"],
            ["Pending", "warning"],
            ["Failed", "critical"],
            ["Processing", "info"],
            ["Draft", "readonly"],
            ["In stock", "success"],
            ["Low stock", "attention"],
            ["Out of stock", "critical"],
            ["New order", "new"],
          ].map(([label, tone]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-hairline px-4 py-2.5 text-[13px] last:border-0"
            >
              <span className="text-ink-2">{label}</span>
              <Badge tone={tone as (typeof TONES)[number]}>{label}</Badge>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
