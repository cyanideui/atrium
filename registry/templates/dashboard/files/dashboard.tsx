// @atrium:if next
"use client"
// @atrium:endif

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Sparkline } from "@/components/ui/sparkline"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  ArrowUpRight01Icon,
  ArrowDown01Icon,
  Add01Icon,
  Download04Icon,
} from "@hugeicons/core-free-icons"

/**
 * Dashboard template — drop-in ERP overview page.
 *   1. Page header (title + primary actions)
 *   2. KPI tile row (4 metrics, each with sparkline + delta)
 *   3. Recent activity table
 *
 * Swap KPIS / ORDERS for real data and you're done.
 */

interface Kpi {
  label: string
  value: string
  delta: string
  up: boolean
  spark: number[]
}

const KPIS: Kpi[] = [
  { label: "Total revenue", value: "$124,592", delta: "+12.5%", up: true, spark: [12, 15, 14, 18, 22, 20, 24, 28, 27, 32, 30, 36] },
  { label: "Orders", value: "1,847", delta: "+8.2%", up: true, spark: [40, 38, 42, 45, 48, 47, 50, 52, 51, 55, 58, 60] },
  { label: "Pending", value: "342", delta: "−2.1%", up: false, spark: [80, 75, 78, 72, 70, 68, 65, 62, 60, 58, 55, 52] },
  { label: "Fulfillment", value: "98.2%", delta: "+0.4%", up: true, spark: [94, 95, 95, 96, 96, 97, 97, 98, 98, 98, 98, 98] },
]

const ORDERS = [
  { id: "1234", customer: "Acme Corporation", date: "May 28", status: "success", statusLabel: "Paid", amount: "$1,240.00" },
  { id: "1235", customer: "Globex Industries", date: "May 28", status: "warning", statusLabel: "Pending", amount: "$850.00" },
  { id: "1236", customer: "Initech LLC", date: "May 27", status: "critical", statusLabel: "Failed", amount: "$2,100.00" },
  { id: "1237", customer: "Umbrella Corp", date: "May 27", status: "success", statusLabel: "Paid", amount: "$3,450.00" },
  { id: "1238", customer: "Stark Enterprises", date: "May 26", status: "info", statusLabel: "Processing", amount: "$920.00" },
  { id: "1239", customer: "Wayne Industries", date: "May 26", status: "success", statusLabel: "Paid", amount: "$1,720.00" },
] as const

// @atrium:if next
export default function DashboardPage() {
// @atrium:endif
// @atrium:if vite-react-router
export function DashboardPage() {
// @atrium:endif
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
            Overview
          </div>
          <h1 className="m-0 text-[24px] font-semibold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 max-w-[640px] text-[13px] text-ink-3">
            KPI tiles with inline sparklines, plus a recent-activity table.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leading={<Icon icon={Download04Icon} size="sm" />}>
            Export
          </Button>
          <Button leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
        </div>
      </header>

      <section aria-label="Key metrics" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <KpiTile key={kpi.label} kpi={kpi} />
        ))}
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-base font-semibold text-ink">Recent orders</h2>
          <Button variant="tertiary" size="sm">View all</Button>
        </div>
        <div className="overflow-hidden rounded-md border border-hairline bg-canvas">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-[12.5px] tabular-nums text-ink-2">#{o.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" name={o.customer} />
                      <span>{o.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-ink-3">{o.date}</TableCell>
                  <TableCell>
                    <Badge tone={o.status as "success" | "warning" | "critical" | "info"}>
                      {o.statusLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{o.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}

function KpiTile({ kpi }: { kpi: Kpi }) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-hairline bg-canvas p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-[12px] uppercase tracking-wider text-ink-3">{kpi.label}</div>
        <div
          className={cn(
            "inline-flex items-center gap-0.5 text-[12px] font-medium tabular-nums",
            kpi.up ? "text-success" : "text-error",
          )}
        >
          <Icon icon={kpi.up ? ArrowUpRight01Icon : ArrowDown01Icon} size={12} />
          {kpi.delta}
        </div>
      </div>
      <div className="text-[24px] font-semibold tabular-nums tracking-tight text-ink">{kpi.value}</div>
      <Sparkline data={kpi.spark} tone={kpi.up ? "success" : "critical"} height={32} className="-mx-1" />
    </div>
  )
}
