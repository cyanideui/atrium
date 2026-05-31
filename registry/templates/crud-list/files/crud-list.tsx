"use client"

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BulkActionsBar } from "@/components/ui/bulk-actions-bar"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@/components/ui/icon"
import { Pagination } from "@/components/ui/pagination"
import { SavedFilters, type SavedFilter } from "@/components/ui/saved-filters"
import { SearchField } from "@/components/ui/search-field"
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import * as React from "react"
import {
  Add01Icon,
  Edit02Icon,
  Copy01Icon,
  Download04Icon,
  Delete02Icon,
  PackageIcon,
  FilterIcon,
} from "@hugeicons/core-free-icons"

/**
 * CRUD List template — search + filters + saved presets + bulk actions +
 * sticky table + pagination + empty state. Swap ALL_ORDERS for your data.
 */

interface Order {
  id: string
  customer: string
  email: string
  date: string
  status: "success" | "warning" | "critical" | "info"
  statusLabel: string
  amount: string
}

const ALL_ORDERS: Order[] = [
  { id: "1234", customer: "Acme Corporation", email: "ap@acme.com", date: "May 28", status: "success", statusLabel: "Paid", amount: "$1,240.00" },
  { id: "1235", customer: "Globex Industries", email: "billing@globex.com", date: "May 28", status: "warning", statusLabel: "Pending", amount: "$850.00" },
  { id: "1236", customer: "Initech LLC", email: "finance@initech.com", date: "May 27", status: "critical", statusLabel: "Failed", amount: "$2,100.00" },
  { id: "1237", customer: "Umbrella Corp", email: "ar@umbrella.com", date: "May 27", status: "success", statusLabel: "Paid", amount: "$3,450.00" },
  { id: "1238", customer: "Stark Enterprises", email: "ap@stark.io", date: "May 26", status: "info", statusLabel: "Processing", amount: "$920.00" },
  { id: "1239", customer: "Wayne Industries", email: "billing@wayne.com", date: "May 26", status: "success", statusLabel: "Paid", amount: "$1,720.00" },
  { id: "1240", customer: "Hooli", email: "finance@hooli.io", date: "May 25", status: "warning", statusLabel: "Pending", amount: "$680.00" },
  { id: "1241", customer: "Pied Piper", email: "ar@piedpiper.com", date: "May 25", status: "success", statusLabel: "Paid", amount: "$420.00" },
  { id: "1242", customer: "Wonka Inc", email: "billing@wonka.com", date: "May 24", status: "critical", statusLabel: "Failed", amount: "$5,180.00" },
]

const SAVED_FILTERS: SavedFilter[] = [
  { id: "all", label: "All orders" },
  { id: "needs-review", label: "Needs review" },
  { id: "high-value", label: "High value" },
  { id: "this-week", label: "This week" },
]

// @atrium:if next
export default function OrdersPage() {
// @atrium:endif
// @atrium:if vite-react-router
export function OrdersPage() {
// @atrium:endif
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState("all")
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(1)
  const pageSize = 6

  const filtered = React.useMemo(() => {
    let rows = ALL_ORDERS
    if (filter === "needs-review") rows = rows.filter((r) => r.status === "warning" || r.status === "critical")
    if (filter === "high-value") rows = rows.filter((r) => parseFloat(r.amount.replace(/[^\d.]/g, "")) >= 2000)
    if (query) {
      const q = query.toLowerCase()
      rows = rows.filter(
        (r) =>
          r.customer.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.id.includes(q),
      )
    }
    return rows
  }, [query, filter])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  const allOnPageSelected = visible.length > 0 && visible.every((r) => selected.includes(r.id))
  const someOnPageSelected = visible.some((r) => selected.includes(r.id))

  const togglePage = () => {
    if (allOnPageSelected) {
      setSelected((s) => s.filter((id) => !visible.some((r) => r.id === id)))
    } else {
      const ids = visible.map((r) => r.id)
      setSelected((s) => Array.from(new Set([...s, ...ids])))
    }
  }

  const toggleRow = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">Sales</div>
          <h1 className="m-0 text-[22px] font-semibold tracking-tight text-ink">Orders</h1>
          <p className="mt-1 max-w-[640px] text-[13px] text-ink-3">
            Search, filter, and bulk-edit orders. Saved presets snap to the views you use most.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leading={<Icon icon={Download04Icon} size="sm" />}>Export</Button>
          <Button leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
        </div>
      </header>

      <section className="flex flex-wrap items-center gap-2">
        <div className="min-w-0 flex-1">
          <SearchField value={query} onChange={setQuery} placeholder="Search by customer, email, or order #…" />
        </div>
        <SavedFilters filters={SAVED_FILTERS} value={filter} onChange={setFilter} />
        <Button variant="secondary" leading={<Icon icon={FilterIcon} size="sm" />}>More filters</Button>
      </section>

      {selected.length > 0 && (
        <BulkActionsBar
          count={selected.length}
          onDismiss={() => setSelected([])}
          actions={
            <ButtonGroup>
              <Button variant="secondary" size="sm" leading={<Icon icon={Edit02Icon} size="sm" />}>Edit</Button>
              <Button variant="secondary" size="sm" leading={<Icon icon={Copy01Icon} size="sm" />}>Duplicate</Button>
              <Button variant="secondary" size="sm" leading={<Icon icon={Download04Icon} size="sm" />}>Export</Button>
            </ButtonGroup>
          }
          destructive={
            <Button variant="secondary" tone="critical" size="sm" leading={<Icon icon={Delete02Icon} size="sm" />}>
              Delete
            </Button>
          }
        />
      )}

      <div className="overflow-hidden rounded-md border border-hairline bg-canvas">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allOnPageSelected ? true : someOnPageSelected ? "indeterminate" : false}
                  onCheckedChange={togglePage}
                  aria-label="Select all on page"
                />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableEmpty
                colSpan={6}
                icon={<Icon icon={PackageIcon} size={24} />}
                title="No orders match"
                description={
                  query
                    ? `Nothing found for "${query}". Try a different search or clear the filter.`
                    : "No orders in this view yet. Create one to get started."
                }
              >
                {query ? (
                  <Button variant="secondary" size="sm" onClick={() => setQuery("")}>Clear search</Button>
                ) : (
                  <Button size="sm" leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
                )}
              </TableEmpty>
            ) : (
              visible.map((row) => (
                <TableRow key={row.id} selected={selected.includes(row.id)}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                      aria-label={`Select order ${row.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-[12.5px] tabular-nums text-ink-2">#{row.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" name={row.customer} />
                      <div className="flex flex-col leading-tight">
                        <span className="text-ink">{row.customer}</span>
                        <span className="text-[11.5px] text-ink-3">{row.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-ink-3">{row.date}</TableCell>
                  <TableCell>
                    <Badge tone={row.status}>{row.statusLabel}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{row.amount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className={cn("flex items-center justify-between", visible.length === 0 && "hidden")}>
        <div className="text-[12px] text-ink-3">
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </div>
        <Pagination page={page} total={pageCount} onChange={setPage} />
      </div>
    </div>
  )
}
