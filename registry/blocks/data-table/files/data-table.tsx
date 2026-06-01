// @atrium:if next
"use client"
// @atrium:endif

import { Badge } from "@/components/ui/badge"
import { BulkActionsBar } from "@/components/ui/bulk-actions-bar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@/components/ui/icon"
import { Pagination } from "@/components/ui/pagination"
import { SavedFilters, type SavedFilter } from "@/components/ui/saved-filters"
import { SearchField } from "@/components/ui/search-field"
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import * as React from "react"
import {
  Add01Icon,
  Edit02Icon,
  Copy01Icon,
  Download04Icon,
  Delete02Icon,
  PackageIcon,
} from "@hugeicons/core-free-icons"

/**
 * DataTable — a complete table experience: search + saved-view presets,
 * selection with a bulk-actions bar, an empty state, and pagination. The
 * filtering/selection/paging logic is client-side and ready to wire to a
 * query.
 *
 * Replace the Row type + ROWS with your data; the rest is reusable.
 */

interface Row {
  id: string
  name: string
  email: string
  date: string
  status: "success" | "warning" | "critical" | "info"
  statusLabel: string
  amount: string
}

const ROWS: Row[] = [
  { id: "1234", name: "Acme Corporation", email: "ap@acme.com", date: "May 28", status: "success", statusLabel: "Paid", amount: "$1,240.00" },
  { id: "1235", name: "Globex Industries", email: "billing@globex.com", date: "May 28", status: "warning", statusLabel: "Pending", amount: "$850.00" },
  { id: "1236", name: "Initech LLC", email: "finance@initech.com", date: "May 27", status: "critical", statusLabel: "Failed", amount: "$2,100.00" },
  { id: "1237", name: "Umbrella Corp", email: "ar@umbrella.com", date: "May 27", status: "success", statusLabel: "Paid", amount: "$3,450.00" },
  { id: "1238", name: "Stark Enterprises", email: "ap@stark.io", date: "May 26", status: "info", statusLabel: "Processing", amount: "$920.00" },
  { id: "1239", name: "Wayne Industries", email: "billing@wayne.com", date: "May 26", status: "success", statusLabel: "Paid", amount: "$1,720.00" },
  { id: "1240", name: "Hooli", email: "finance@hooli.io", date: "May 25", status: "warning", statusLabel: "Pending", amount: "$680.00" },
  { id: "1241", name: "Pied Piper", email: "ar@piedpiper.com", date: "May 25", status: "success", statusLabel: "Paid", amount: "$420.00" },
]

const SAVED_VIEWS: SavedFilter[] = [
  { id: "all", label: "All" },
  { id: "needs-review", label: "Needs review" },
  { id: "high-value", label: "High value" },
]

export function DataTable() {
  const [query, setQuery] = React.useState("")
  const [view, setView] = React.useState("all")
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(1)
  const pageSize = 5

  const filtered = React.useMemo(() => {
    let rows = ROWS
    if (view === "needs-review") rows = rows.filter((r) => r.status === "warning" || r.status === "critical")
    if (view === "high-value") rows = rows.filter((r) => parseFloat(r.amount.replace(/[^\d.]/g, "")) >= 2000)
    if (query) {
      const q = query.toLowerCase()
      rows = rows.filter(
        (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.id.includes(q),
      )
    }
    return rows
  }, [query, view])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  const allOnPage = visible.length > 0 && visible.every((r) => selected.includes(r.id))
  const someOnPage = visible.some((r) => selected.includes(r.id))

  const togglePage = () => {
    if (allOnPage) {
      setSelected((s) => s.filter((id) => !visible.some((r) => r.id === id)))
    } else {
      setSelected((s) => Array.from(new Set([...s, ...visible.map((r) => r.id)])))
    }
  }
  const toggleRow = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-wrap items-center gap-2">
        <div className="min-w-0 flex-1">
          <SearchField value={query} onChange={setQuery} placeholder="Search by name, email, or ID…" />
        </div>
        <SavedFilters filters={SAVED_VIEWS} value={view} onChange={setView} />
        <Button leading={<Icon icon={Add01Icon} size="sm" />}>New</Button>
      </section>

      {selected.length > 0 && (
        <BulkActionsBar
          count={selected.length}
          onDismiss={() => setSelected([])}
          actions={
            <>
              <Button variant="tertiary" size="sm" leading={<Icon icon={Edit02Icon} size="sm" />}>Edit</Button>
              <Button variant="tertiary" size="sm" leading={<Icon icon={Copy01Icon} size="sm" />}>Duplicate</Button>
              <Button variant="tertiary" size="sm" leading={<Icon icon={Download04Icon} size="sm" />}>Export</Button>
            </>
          }
          destructive={
            <Button variant="tertiary" tone="critical" size="sm" leading={<Icon icon={Delete02Icon} size="sm" />}>
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
                  checked={allOnPage ? true : someOnPage ? "indeterminate" : false}
                  onCheckedChange={togglePage}
                  aria-label="Select all on page"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableEmpty
                colSpan={5}
                icon={<Icon icon={PackageIcon} size={24} />}
                title="No records match"
                description={query ? `Nothing found for "${query}".` : "No records in this view yet."}
              >
                {query ? (
                  <Button variant="secondary" size="sm" onClick={() => setQuery("")}>Clear search</Button>
                ) : (
                  <Button size="sm" leading={<Icon icon={Add01Icon} size="sm" />}>New</Button>
                )}
              </TableEmpty>
            ) : (
              visible.map((row) => (
                <TableRow key={row.id} selected={selected.includes(row.id)}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                      aria-label={`Select ${row.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col leading-tight">
                      <span className="text-ink">{row.name}</span>
                      <span className="text-[11.5px] text-ink-3">{row.email}</span>
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
