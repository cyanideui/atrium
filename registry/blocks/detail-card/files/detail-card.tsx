// @atrium:if next
"use client"
// @atrium:endif

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import { InlineEdit } from "@/components/ui/inline-edit"
import * as React from "react"
import {
  MoreHorizontalIcon,
  Edit02Icon,
  Copy01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons"

/**
 * DetailCard — a key/value detail panel with a header (title + status badge +
 * actions menu) over editable rows. Values are inline-editable via InlineEdit.
 * Use for record summaries: customer, payment, shipping, metadata, etc.
 *
 * Layout: each row is a fixed two-column grid (label | value). The value
 * column width is stable, so clicking into edit never shifts the layout —
 * spreadsheet feel.
 *
 * Swap the initial FIELDS for your data and wire onCommit to a mutation.
 */

interface Field {
  key: string
  label: string
  value: string
  /** Render as a read-only row (no inline edit). */
  readOnly?: boolean
}

const INITIAL_FIELDS: Field[] = [
  { key: "name", label: "Customer", value: "Acme Corporation" },
  { key: "email", label: "Email", value: "ap@acme.com" },
  { key: "since", label: "Customer since", value: "Mar 2024", readOnly: true },
  { key: "spend", label: "Total spend", value: "$48,210" },
  { key: "open", label: "Open orders", value: "3" },
]

export function DetailCard() {
  const [fields, setFields] = React.useState(INITIAL_FIELDS)

  const commit = (key: string, next: string) =>
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value: next } : f)))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Customer</CardTitle>
          <Badge tone="success" size="sm">Active</Badge>
        </div>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="tertiary" size="sm" aria-label="Card actions">
                <Icon icon={MoreHorizontalIcon} size="sm" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem leading={<Icon icon={Edit02Icon} size="sm" />}>Edit</DropdownMenuItem>
              <DropdownMenuItem leading={<Icon icon={Copy01Icon} size="sm" />}>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem tone="critical" leading={<Icon icon={Delete02Icon} size="sm" />}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <dl className="m-0 flex flex-col divide-y divide-hairline">
        {fields.map((f) => (
          <div
            key={f.key}
            className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)] items-center gap-3 px-3 py-px"
          >
            <dt className="truncate py-2 pl-1 text-[12.5px] text-ink-3">{f.label}</dt>
            <dd className="m-0 min-w-0">
              {f.readOnly ? (
                <span className="block truncate px-2 py-2 text-[12.5px] font-medium text-ink">
                  {f.value}
                </span>
              ) : (
                <InlineEdit
                  value={f.value}
                  onCommit={(next) => commit(f.key, next)}
                  textClassName="text-[12.5px] font-medium text-ink"
                />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
