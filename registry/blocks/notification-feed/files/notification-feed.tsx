// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { NotificationBadge } from "@/components/ui/notification-badge"
import { cn } from "@/lib/utils"
import * as React from "react"
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  ShoppingBag01Icon,
  Mail01Icon,
  Notification03Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

/**
 * NotificationFeed — a scrollable list of notifications grouped by recency,
 * each with an icon/avatar, title, timestamp, and an unread dot. Header has a
 * "mark all read" action. Use inside a popover/drawer or as a standalone panel.
 *
 * Swap NOTIFICATIONS for your data; wire markAllRead / per-item read to your API.
 */

type NotifTone = "default" | "success" | "warning" | "info"

interface Notification {
  id: string
  icon: IconSvgElement
  tone: NotifTone
  title: React.ReactNode
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

export function NotificationFeed() {
  const [items, setItems] = React.useState(INITIAL)
  const unread = items.filter((i) => !i.read).length

  const markAllRead = () => setItems((prev) => prev.map((i) => ({ ...i, read: true })))
  const markRead = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)))

  const groups = ["Today", "Earlier"] as const

  return (
    <Card className="flex w-full max-w-[400px] flex-col">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="relative inline-grid h-7 w-7 place-items-center rounded-md bg-surface-2 text-ink-2">
            <Icon icon={Notification03Icon} size={15} />
            <NotificationBadge count={unread} />
          </span>
          <CardTitle>Notifications</CardTitle>
        </div>
        <Button variant="tertiary" size="sm" onClick={markAllRead} disabled={unread === 0}>
          Mark all read
        </Button>
      </CardHeader>

      <div className="ds-scroll-overlay max-h-[360px] overflow-y-auto">
        {groups.map((group) => {
          const groupItems = items.filter((i) => i.group === group)
          if (groupItems.length === 0) return null
          return (
            <div key={group}>
              <div className="sticky top-0 z-[1] bg-canvas/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-4 backdrop-blur-[3px]">
                {group}
              </div>
              {groupItems.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-2.5 text-left",
                    "transition-colors duration-[var(--dur-fast)] hover:bg-surface",
                    !n.read && "bg-info-tint/40",
                  )}
                >
                  <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-pill", TONE_BG[n.tone])} aria-hidden>
                    <Icon icon={n.icon} size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] leading-snug text-ink">{n.title}</span>
                    {n.body && <span className="mt-0.5 block truncate text-[12px] text-ink-3">{n.body}</span>}
                    <span className="mt-0.5 block text-[11px] text-ink-4">{n.at}</span>
                  </span>
                  {!n.read && (
                    <>
                      <span className="sr-only">Unread</span>
                      <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-pill bg-info" />
                    </>
                  )}
                </button>
              ))}
            </div>
          )
        })}
      </div>

      <footer className="border-t border-hairline px-4 py-2 text-center">
        <a href="#" className="text-[12px] font-medium text-ink-3 no-underline hover:text-ink">
          View all notifications
        </a>
      </footer>
    </Card>
  )
}
