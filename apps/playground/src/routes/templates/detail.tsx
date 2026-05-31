import * as React from "react"
import {
  AutoSaveStatus,
  Avatar,
  Badge,
  Banner,
  Breadcrumbs,
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  Icon,
  WorkflowTimeline,
  WorkflowTimelineItem,
} from "@cyanideui/ui"
import {
  Edit02Icon,
  Mail01Icon,
  PhoneOff01Icon,
  ArrowRight02Icon,
  SidebarRight01Icon,
} from "@hugeicons/core-free-icons"

/**
 * Detail template 鈥?record detail page with summary cards + workflow
 * timeline + drawer inspector for related records.
 *
 * Pattern:
 *   - Breadcrumb + title row at top with status badge + autosave indicator.
 *   - 2-column grid: left main column (summary, line items, history),
 *     right rail (customer card, payment card).
 *   - "View details" button on the timeline opens a Drawer with the full
 *     activity log 鈥?keeps the page itself short.
 */

const TIMELINE = [
  { status: "complete" as const, title: "Order placed", meta: "May 28, 2026 路 9:14 a.m." },
  { status: "complete" as const, title: "Payment received", meta: "May 28, 2026 路 9:14 a.m." },
  { status: "complete" as const, title: "Picked from warehouse", meta: "May 28, 2026 路 2:42 p.m." },
  { status: "active" as const, title: "Shipped via FedEx", meta: "Tracking #FX-9938-2210" },
  { status: "pending" as const, title: "Delivered" },
]

const LINE_ITEMS = [
  { sku: "WM-001", name: "Wireless Mouse 鈥?black", qty: 2, price: "$58.00" },
  { sku: "KB-203", name: "Mechanical Keyboard 75%", qty: 1, price: "$149.00" },
  { sku: "DS-024", name: "USB-C dock 鈥?8-port", qty: 1, price: "$89.00" },
]

export function DetailTemplate() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <Breadcrumbs
          items={[
            { label: "Sales", href: "#" },
            { label: "Orders", href: "#" },
            { label: "#1234" },
          ]}
        />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <h1 className="m-0 text-[22px] font-semibold tracking-tight text-ink">
              Order #1234
            </h1>
            <Badge tone="info">Processing</Badge>
            <AutoSaveStatus state="saved" savedAt="2 minutes ago" />
          </div>
          <div className="flex items-center gap-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary" leading={<Icon icon={SidebarRight01Icon} size="sm" />}>
                  View activity
                </Button>
              </DrawerTrigger>
              <DrawerContent side="right" width={520}>
                <DrawerHeader>
                  <DrawerTitle>Activity log</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <p className="m-0 mb-3 text-[13px] text-ink-3">
                    Every state change recorded for this order 鈥?useful for audits, support, and
                    reconciliation.
                  </p>
                  <WorkflowTimeline>
                    {TIMELINE.map((step, i) => (
                      <WorkflowTimelineItem
                        key={i}
                        status={step.status}
                        title={step.title}
                        meta={step.meta}
                      />
                    ))}
                  </WorkflowTimeline>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            <Button leading={<Icon icon={Edit02Icon} size="sm" />}>Edit</Button>
          </div>
        </div>
      </header>

      <Banner tone="info" title="Customer requested expedited shipping">
        Estimated delivery has been bumped from May 31 to May 30. Confirm with the warehouse if
        capacity allows.
      </Banner>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          <Card title="Line items">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-hairline text-[11px] uppercase tracking-wider text-ink-3">
                  <th className="px-3 py-2 text-left font-semibold">SKU</th>
                  <th className="px-3 py-2 text-left font-semibold">Item</th>
                  <th className="px-3 py-2 text-right font-semibold">Qty</th>
                  <th className="px-3 py-2 text-right font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {LINE_ITEMS.map((item) => (
                  <tr key={item.sku} className="border-b border-hairline last:border-b-0">
                    <td className="px-3 py-2.5 font-mono text-[12.5px] tabular-nums text-ink-3">
                      {item.sku}
                    </td>
                    <td className="px-3 py-2.5 text-ink">{item.name}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{item.qty}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-3 py-3 text-right text-[12.5px] text-ink-3">
                    Subtotal 路 Tax 路 Shipping
                  </td>
                  <td className="px-3 py-3 text-right text-[12.5px] tabular-nums text-ink-3">
                    $296.00 路 $24.18 路 $12.00
                  </td>
                </tr>
                <tr className="border-t border-hairline">
                  <td colSpan={3} className="px-3 py-3 text-right text-[14px] font-semibold text-ink">
                    Total
                  </td>
                  <td className="px-3 py-3 text-right text-[14px] font-semibold tabular-nums text-ink">
                    $332.18
                  </td>
                </tr>
              </tfoot>
            </table>
          </Card>

          <Card
            title="Workflow"
            action={
              <Button
                variant="tertiary"
                size="sm"
                trailing={<Icon icon={ArrowRight02Icon} size="sm" />}
              >
                View full timeline
              </Button>
            }
          >
            <WorkflowTimeline>
              {TIMELINE.map((step, i) => (
                <WorkflowTimelineItem
                  key={i}
                  status={step.status}
                  title={step.title}
                  meta={step.meta}
                />
              ))}
            </WorkflowTimeline>
          </Card>
        </div>

        {/* Right rail */}
        <aside className="flex flex-col gap-6">
          <Card title="Customer">
            <div className="flex items-center gap-3">
              <Avatar size="md" name="Acme Corporation" />
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-[14px] font-semibold text-ink">
                  Acme Corporation
                </span>
                <span className="truncate text-[12px] text-ink-3">ap@acme.com</span>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-1.5 text-[12.5px] text-ink-2">
              <KV label="Customer since" value="Mar 2024" />
              <KV label="Total spend" value="$48,210" />
              <KV label="Open orders" value="3" />
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" size="sm" leading={<Icon icon={Mail01Icon} size="sm" />}>
                Email
              </Button>
              <Button variant="secondary" size="sm" leading={<Icon icon={PhoneOff01Icon} size="sm" />}>
                Call
              </Button>
            </div>
          </Card>

          <Card title="Payment">
            <div className="flex flex-col gap-1.5 text-[12.5px] text-ink-2">
              <KV label="Method" value="Visa 鈥⑩€⑩€⑩€?4242" />
              <KV label="Authorized" value="$332.18" />
              <KV label="Captured" value="$332.18" />
              <KV label="Refunded" value="$0.00" />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function Card({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-md border border-hairline bg-canvas">
      <header className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
        <h2 className="m-0 text-[13px] font-semibold text-ink">{title}</h2>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  )
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink-3">{label}</span>
      <span className="font-medium tabular-nums text-ink">{value}</span>
    </div>
  )
}
