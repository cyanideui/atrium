import { useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  InlineEdit,
} from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function InlineEditPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Mouse", price: "29.00", stock: "142" },
    { id: 2, name: "USB-C Cable", price: "12.50", stock: "89" },
    { id: 3, name: "Mechanical Keyboard", price: "149.00", stock: "12" },
  ])

  const update = (id: number, key: "name" | "price" | "stock", value: string) =>
    setProducts((p) => p.map((row) => (row.id === id ? { ...row, [key]: value } : row)))

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Inline Edit"
        status="stable"
        description="Spreadsheet-style cell editor. Click a value to edit. Enter commits, Esc cancels, Tab moves to the next."
      />

      <Section title="Inside a table" description="Click any cell to edit. Enter commits, Esc cancels. The cell itself never resizes.">
        <Demo
          code={`<TableCell className="p-1">
  <InlineEdit value={row.price} align="right" onCommit={(v) => update(row.id, "price", v)} />
</TableCell>`}
        >
          <div className="w-full rounded-md border border-hairline bg-canvas">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="px-2 py-1">
                      <InlineEdit value={p.name} onCommit={(v) => update(p.id, "name", v)} />
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <InlineEdit
                        value={p.price}
                        align="right"
                        textClassName="tabular-nums"
                        onCommit={(v) => update(p.id, "price", v)}
                      />
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <InlineEdit
                        value={p.stock}
                        align="right"
                        textClassName="tabular-nums"
                        onCommit={(v) => update(p.id, "stock", v)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Demo>
      </Section>

      <Section title="Empty value placeholder">
        <Demo code={`<InlineEdit value="" onCommit={...} />`}>
          <div className="w-full max-w-xs rounded-md border border-hairline bg-canvas p-2">
            <InlineEdit value="" onCommit={() => {}} />
          </div>
        </Demo>
      </Section>
    </div>
  )
}
