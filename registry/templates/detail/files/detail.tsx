"use client"

import { AutoSaveStatus } from "@/components/ui/auto-save-status"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Banner } from "@/components/ui/banner"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardAction, CardBody } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerBody } from "@/components/ui/drawer"
import { Icon } from "@/components/ui/icon"
import { KeyValueList, KeyValue } from "@/components/ui/key-value"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { WorkflowTimeline, WorkflowTimelineItem } from "@/components/ui/workflow-timeline"
import {
  Edit02Icon,
  Mail01Icon,
  Call02Icon,
  ArrowRight02Icon,
  SidebarRight01Icon,
} from "@hugeicons/core-free-icons"

/**
 * Detail template — record detail page with summary cards + workflow
 * timeline + drawer inspector. Built on the Card, KeyValue, and Table
 * primitives. Swap TIMELINE / LINE_ITEMS for real data.
 */

const TIMELINE = [
  { status: "complete" as const, title: "Order placed", meta: "May 28, 2026 · 9:14 a.m." },
  { status: "complete" as const, title: "Payment received", meta: "May 28, 2026 · 9:14 a.m." },
  { status: "complete" as const, title: "Picked from warehouse", meta: "May 28, 2026 · 2:42 p.m." },
  { status: "active" as const, title: "Shipped via FedEx", meta: "Tracking #FX-9938-2210" },
  { status: "pending" as const, title: "Delivered" },
]

const LINE_ITEMS = [
  { sku: "WM-001", name: "Wireless Mouse — black", qty: 2, price: "$58.00" },
  { sku: "KB-203", name: "Mechanical Keyboard 75%", qty: 1, price: "$149.00" },
  { sku: "DS-024", name: "USB-C dock — 8-port", qty: 1, price: "$89.00" },
]

// @atrium:if next
export default function DetailPage() {
// @atrium:endif
// @atrium:if vite-react-router
export function DetailPage() {
// @atrium:endif
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
            <h1 className="m-0 text-[22px] font-semibold tracking-tight text-ink">Order #1234</h1>
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
                    Every state change recorded for this order — useful for audits, support, and reconciliation.
                  </p>
                  <WorkflowTimeline>
                    {TIMELINE.map((step, i) => (
                      <WorkflowTimelineItem key={i} status={step.status} title={step.title} meta={step.meta} />
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
        Estimated delivery has been bumped from May 31 to May 30. Confirm with the warehouse if capacity allows.
      </Banner>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Line items</CardTitle>
            </CardHeader>
            <Table fixed>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[110px]">SKU</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="w-[64px] text-right">Qty</TableHead>
                  <TableHead className="w-[110px] text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LINE_ITEMS.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-mono text-[12.5px] tabular-nums text-ink-3">{item.sku}</TableCell>
                    <TableCell className="truncate text-ink">{item.name}</TableCell>
                    <TableCell className="text-right tabular-nums">{item.qty}</TableCell>
                    <TableCell className="text-right tabular-nums">{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Totals breakdown — one labeled row each, right-aligned. */}
            <div className="flex flex-col gap-1.5 border-t border-hairline px-4 py-3 text-[13px]">
              <div className="flex justify-between text-ink-2">
                <span>Subtotal</span>
                <span className="tabular-nums">$296.00</span>
              </div>
              <div className="flex justify-between text-ink-2">
                <span>Tax</span>
                <span className="tabular-nums">$24.18</span>
              </div>
              <div className="flex justify-between text-ink-2">
                <span>Shipping</span>
                <span className="tabular-nums">$12.00</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-hairline pt-2 text-[14px] font-semibold text-ink">
                <span>Total</span>
                <span className="tabular-nums">$332.18</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow</CardTitle>
              <CardAction>
                <Button variant="tertiary" size="sm" trailing={<Icon icon={ArrowRight02Icon} size="sm" />}>
                  View full timeline
                </Button>
              </CardAction>
            </CardHeader>
            <CardBody>
              <WorkflowTimeline>
                {TIMELINE.map((step, i) => (
                  <WorkflowTimelineItem key={i} status={step.status} title={step.title} meta={step.meta} />
                ))}
              </WorkflowTimeline>
            </CardBody>
          </Card>
        </div>

        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex items-center gap-3">
                <Avatar size="md" name="Acme Corporation" />
                <div className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate text-[14px] font-semibold text-ink">Acme Corporation</span>
                  <span className="truncate text-[12px] text-ink-3">ap@acme.com</span>
                </div>
              </div>
              <KeyValueList className="mt-3 text-ink-2">
                <KeyValue label="Customer since" value="Mar 2024" />
                <KeyValue label="Total spend" value="$48,210" />
                <KeyValue label="Open orders" value="3" />
              </KeyValueList>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" size="sm" leading={<Icon icon={Mail01Icon} size="sm" />}>Email</Button>
                <Button variant="secondary" size="sm" leading={<Icon icon={Call02Icon} size="sm" />}>Call</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardBody>
              <KeyValueList className="text-ink-2">
                <KeyValue label="Method" value="Visa ···· 4242" />
                <KeyValue label="Authorized" value="$332.18" />
                <KeyValue label="Captured" value="$332.18" />
                <KeyValue label="Refunded" value="$0.00" />
              </KeyValueList>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  )
}
