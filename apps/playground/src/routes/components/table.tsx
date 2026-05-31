import { useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
  Badge,
} from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

const ORDERS = [
  { id: "1234", customer: "Acme Corporation", date: "Jan 12, 2025", status: "success" as const, statusLabel: "Paid", amount: "$1,240.00" },
  { id: "1235", customer: "Globex Industries", date: "Jan 11, 2025", status: "warning" as const, statusLabel: "Pending", amount: "$850.00" },
  { id: "1236", customer: "Initech LLC", date: "Jan 11, 2025", status: "critical" as const, statusLabel: "Failed", amount: "$2,100.00" },
  { id: "1237", customer: "Umbrella Corp", date: "Jan 10, 2025", status: "success" as const, statusLabel: "Paid", amount: "$3,450.00" },
  { id: "1238", customer: "Stark Enterprises", date: "Jan 10, 2025", status: "info" as const, statusLabel: "Processing", amount: "$920.00" },
]

export function TablePage() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allChecked = selected.size === ORDERS.length
  const someChecked = selected.size > 0 && !allChecked

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Table"
        status="stable"
        description="Compact density, no vertical borders, hairline row separators, sticky header. tnum applied automatically."
      />

      <Section title="Default" description="With selection, status badges, and tabular numerics.">
        <Demo
          code={`<Table>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>`}
        >
          <div className="w-full rounded-md border border-hairline bg-canvas">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allChecked ? true : someChecked ? "indeterminate" : false}
                      onCheckedChange={(v) => {
                        if (v) setSelected(new Set(ORDERS.map((o) => o.id)))
                        else setSelected(new Set())
                      }}
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
                {ORDERS.map((o) => (
                  <TableRow key={o.id} selected={selected.has(o.id)}>
                    <TableCell>
                      <Checkbox
                        checked={selected.has(o.id)}
                        onCheckedChange={() => toggle(o.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-ink">#{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell className="text-ink-3">{o.date}</TableCell>
                    <TableCell>
                      <Badge tone={o.status} size="sm">
                        {o.statusLabel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{o.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
