import { useState } from "react"
import {
  BulkActionsBar,
  Button,
  Icon,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
} from "@cyanideui/ui"
import { Edit02Icon, Copy01Icon, Download02Icon, Delete02Icon } from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

const ROWS = [
  { id: "1234", customer: "Acme Corporation", amount: "$1,240.00" },
  { id: "1235", customer: "Globex Industries", amount: "$850.00" },
  { id: "1236", customer: "Initech LLC", amount: "$2,100.00" },
  { id: "1237", customer: "Umbrella Corp", amount: "$3,450.00" },
]

export function BulkActionsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const allChecked = selected.size === ROWS.length
  const someChecked = selected.size > 0 && !allChecked

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Bulk Actions Bar"
        status="stable"
        description="Appears above a table when rows are selected. Non-destructive actions grouped, destructive actions isolated by a divider."
      />

      <Section title="With table selection" description="Tick the checkboxes to reveal the bar.">
        <div className="w-full space-y-2">
          {selected.size > 0 && (
            <BulkActionsBar
              count={selected.size}
              onDismiss={() => setSelected(new Set())}
              actions={
                <>
                  <Button variant="tertiary" size="sm" leading={<Icon icon={Edit02Icon} size="sm" />}>
                    Edit
                  </Button>
                  <Button variant="tertiary" size="sm" leading={<Icon icon={Copy01Icon} size="sm" />}>
                    Copy
                  </Button>
                  <Button variant="tertiary" size="sm" leading={<Icon icon={Download02Icon} size="sm" />}>
                    Export
                  </Button>
                </>
              }
              destructive={
                <Button variant="tertiary" tone="critical" size="sm" leading={<Icon icon={Delete02Icon} size="sm" />}>
                  Delete
                </Button>
              }
            />
          )}
          <div className="rounded-md border border-hairline bg-canvas">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allChecked ? true : someChecked ? "indeterminate" : false}
                      onCheckedChange={(v) => {
                        setSelected(v ? new Set(ROWS.map((r) => r.id)) : new Set())
                      }}
                    />
                  </TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.map((r) => (
                  <TableRow key={r.id} selected={selected.has(r.id)}>
                    <TableCell>
                      <Checkbox
                        checked={selected.has(r.id)}
                        onCheckedChange={(v) => {
                          setSelected((s) => {
                            const n = new Set(s)
                            if (v) n.add(r.id)
                            else n.delete(r.id)
                            return n
                          })
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-ink">#{r.id}</TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell className="text-right tabular-nums">{r.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Section>

      <Section title="Always visible (3 selected)">
        <Demo code={`<BulkActionsBar count={3} actions={...} destructive={...} onDismiss={...} />`}>
          <BulkActionsBar
            className="w-full"
            count={3}
            onDismiss={() => alert("clear")}
            actions={
              <>
                <Button variant="tertiary" size="sm">
                  Edit
                </Button>
                <Button variant="tertiary" size="sm">
                  Copy
                </Button>
                <Button variant="tertiary" size="sm">
                  Export
                </Button>
              </>
            }
            destructive={
              <Button variant="tertiary" tone="critical" size="sm">
                Delete
              </Button>
            }
          />
        </Demo>
      </Section>
    </div>
  )
}
