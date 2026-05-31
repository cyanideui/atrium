import { Avatar, Badge, WorkflowTimeline, WorkflowTimelineItem } from "@cyanideui/ui"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

type Tone = "default" | "success" | "warning" | "critical" | "info"

interface AuditEntry {
  actor: string
  action: string
  at: string
  tone?: Tone
  badge?: string
}

const ENTRIES: AuditEntry[] = [
  { actor: "Jane Cooper", action: "created the order", at: "May 28, 2026 · 9:14 a.m." },
  { actor: "System", action: "captured payment of $332.18", at: "May 28, 2026 · 9:14 a.m.", tone: "success", badge: "Paid" },
  { actor: "Marcus Lee", action: "updated the shipping address", at: "May 28, 2026 · 11:02 a.m." },
  { actor: "System", action: "flagged for manual review", at: "May 28, 2026 · 11:03 a.m.", tone: "warning", badge: "Review" },
  { actor: "Priya Patel", action: "approved and shipped via FedEx", at: "May 28, 2026 · 2:42 p.m.", tone: "info", badge: "Shipped" },
]

export function AuditLogBlock() {
  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Audit log"
        status="stable"
        description="Chronological activity feed on the WorkflowTimeline primitive — actor, action, timestamp, and optional tone badge per entry. Density-aware (press D to cycle): the event rhythm tightens in compact modes. Use for record history, audit trails, and change logs."
      />

      <Section title="Preview">
        <section className="rounded-md border border-hairline bg-canvas">
          <header className="border-b border-hairline px-4 py-2.5">
            <h2 className="m-0 text-[13px] font-semibold text-ink">Activity</h2>
          </header>
          <div className="p-4">
            <WorkflowTimeline>
              {ENTRIES.map((entry, i) => (
                <WorkflowTimelineItem
                  key={i}
                  status={i === ENTRIES.length - 1 ? "active" : "complete"}
                  isLast={i === ENTRIES.length - 1}
                  title={
                    <span className="flex items-center gap-2">
                      <Avatar size="sm" name={entry.actor} />
                      <span>
                        <span className="font-semibold text-ink">{entry.actor}</span>{" "}
                        <span className="font-normal text-ink-2">{entry.action}</span>
                      </span>
                    </span>
                  }
                  meta={entry.at}
                  badge={entry.badge ? <Badge tone={entry.tone ?? "default"} size="sm">{entry.badge}</Badge> : undefined}
                />
              ))}
            </WorkflowTimeline>
          </div>
        </section>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add audit-log`} />
      </Section>
    </>
  )
}
