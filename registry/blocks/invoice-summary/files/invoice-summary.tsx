import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardAction, CardFooter } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Download04Icon } from "@hugeicons/core-free-icons"

/**
 * InvoiceSummary — a line-item table with a subtotal / tax / total breakdown
 * and a footer CTA. Use for invoices, order summaries, checkout review.
 *
 * Swap LINE_ITEMS + the rates for your data. Totals are computed from the
 * items, so they stay correct when you edit the source.
 */

interface LineItem {
  description: string
  qty: number
  unit: number
}

const LINE_ITEMS: LineItem[] = [
  { description: "Pro plan — annual", qty: 1, unit: 288 },
  { description: "Additional seats", qty: 4, unit: 24 },
  { description: "Priority support", qty: 1, unit: 99 },
]

const TAX_RATE = 0.08
const money = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export function InvoiceSummary() {
  const subtotal = LINE_ITEMS.reduce((sum, i) => sum + i.qty * i.unit, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  return (
    <Card className="w-full max-w-[520px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Invoice #INV-2048</CardTitle>
          <Badge tone="success" size="sm">Paid</Badge>
        </div>
        <CardAction>
          <Button variant="secondary" size="sm" leading={<Icon icon={Download04Icon} size="sm" />}>
            PDF
          </Button>
        </CardAction>
      </CardHeader>

      <Table fixed>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="w-[56px] text-right">Qty</TableHead>
            <TableHead className="w-[96px] text-right">Unit</TableHead>
            <TableHead className="w-[104px] text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LINE_ITEMS.map((item) => (
            <TableRow key={item.description}>
              <TableCell className="truncate text-ink">{item.description}</TableCell>
              <TableCell className="text-right tabular-nums">{item.qty}</TableCell>
              <TableCell className="text-right tabular-nums">{money(item.unit)}</TableCell>
              <TableCell className="text-right tabular-nums">{money(item.qty * item.unit)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-1.5 border-t border-hairline px-4 py-3 text-[13px]">
        <div className="flex justify-between text-ink-2">
          <span>Subtotal</span>
          <span className="tabular-nums">{money(subtotal)}</span>
        </div>
        <div className="flex justify-between text-ink-2">
          <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
          <span className="tabular-nums">{money(tax)}</span>
        </div>
        <div className="mt-1 flex justify-between border-t border-hairline pt-2 text-[14px] font-semibold text-ink">
          <span>Total</span>
          <span className="tabular-nums">{money(total)}</span>
        </div>
      </div>

      <CardFooter>
        <Button variant="secondary">Send receipt</Button>
        <Button>Download invoice</Button>
      </CardFooter>
    </Card>
  )
}
