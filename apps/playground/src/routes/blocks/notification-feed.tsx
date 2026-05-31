import * as React from "react"
import { Button, Icon, cn } from "@cyanideui/ui"
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  ShoppingBag01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

type NotifTone = "default" | "success" | "warning" | "info"
interface Notification {
  id: string
  icon: IconSvgElement
  tone: NotifTone
  title: string
  body?: string
  at: string
  group: "Today" | "Earlier"
  read?: boolean
}

const INITIAL: Notification[] = [
  { id: "1", icon: ShoppingBag01Icon, tone: "info", title: "New order #1248 from Acme Corp", body: "$3,450.00 · 4 line items", at: "12m ago", group: "Today" },
  { id: "2", icon: CheckmarkCircle02Icon, tone: "success", title: "Payment captured for #1247", at: "1h ago", group: "Today" },
  { id: "3", icon: AlertCircleIcon, tone: "warning", title: "Order #1245 flagged for review", body: "Address mismatch", at: "3h ago", group: "Today", read: true },
  { id: "4", icon: Mail01Icon, tone: "default", title: "Weekly summary is ready", at: "Yesterday", group: "Earlier", read: true },
]

const TONE_BG: Record<NotifTone, string> = {
  default: "bg-surface-2 text-ink-2",
  success: "bg-tone-success-bg text-tone-success-fg",
  warning: "bg-tone-warning-bg text-tone-warning-fg",
  info: "bg-tone-info-bg text-tone-info-fg",
}

export function NotificationFeedBlock() {
  const [items, setItems] = React.useState(INITIAL)
  const unread = items.filter((i) => !i.read).length
  const markAllRead = () => setItems((p) => p.map((i) => ({ ...i, read: true })))
  const markRead = (id: string) => setItems((p) => p.map((i) => (i.id === id ? { ...i, read: true } : i)))
  const groups = ["Today", "Earlier"] as const

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Notification feed"
        status="stable"
        description="Scrollable notification list grouped by recency — icon, title, timestamp, unread dot per item, with a mark-all-read header. Use in a popover/drawer or as a standalone panel."
      />

      <Section title="Preview" description="Click a notification to mark it read.">
        <div className="flex justify-center rounded-md border border-hairline bg-surface p-6">
          <section className="flex w-full max-w-[400px] flex-col overflow-hidden rounded-md border border-hairline bg-canvas">
            <header className="flex items-center justify-between gap-2 border-b border-hairline px-4 py-2.5">
              <div className="flex items-center gap-2">
                <h2 className="m-0 text-[13px] font-semibold text-ink">Notifications</h2>
                {unread > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-pill bg-ink px-1 text-[10px] font-semibold tabular-nums text-canvas">{unread}</span>
                )}
              </div>
              <Button variant="tertiary" size="sm" onClick={markAllRead} disabled={unread === 0}>Mark all read</Button>
            </header>
            <div className="max-h-[360px] overflow-y-auto">
              {groups.map((group) => {
                const gi = items.filter((i) => i.group === group)
                if (gi.length === 0) return null
                return (
                  <div key={group}>
                    <div className="sticky top-0 z-[1] bg-canvas/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-4 backdrop-blur-[3px]">{group}</div>
                    {gi.map((n) => (
                      <button key={n.id} type="button" onClick={() => markRead(n.id)} className={cn("flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors duration-[var(--dur-fast)] hover:bg-surface", !n.read && "bg-info-tint/40")}>
                        <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-pill", TONE_BG[n.tone])}>
                          <Icon icon={n.icon} size={14} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] leading-snug text-ink">{n.title}</span>
                          {n.body && <span className="mt-0.5 block truncate text-[12px] text-ink-3">{n.body}</span>}
                          <span className="mt-0.5 block text-[11px] text-ink-4">{n.at}</span>
                        </span>
                        {!n.read && <span aria-label="Unread" className="mt-1.5 h-2 w-2 shrink-0 rounded-pill bg-info" />}
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add notification-feed`} />
      </Section>
    </>
  )
}
