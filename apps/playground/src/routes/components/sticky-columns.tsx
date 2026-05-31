import {
  Checkbox,
  Badge,
  StickyTable,
  StickyColumn,
  Button,
  Icon,
} from "@atrium/ui"
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"

const ROWS = Array.from({ length: 8 }).map((_, i) => ({
  id: `WM-${100 + i}`,
  name: `Wireless Mouse ${i + 1}`,
  category: "Electronics",
  vendor: "Acme Corp",
  warehouse: "Warehouse A",
  cost: `$${(15 + i).toFixed(2)}`,
  price: `$${(29 + i).toFixed(2)}`,
  margin: `${(48 - i).toFixed(0)}%`,
  stock: 142 - i * 4,
  status: i % 3 === 0 ? ("warning" as const) : ("success" as const),
}))

const cellBase =
  "h-11 px-4 align-middle text-[13px] tabular-nums text-ink-2"
const headBase =
  "h-9 px-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-ink-3 bg-surface"

export function StickyColumnsPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Sticky Table Columns"
        status="stable"
        description="Freeze the first and last columns during horizontal scroll. Edge shadows fade in to indicate hidden content. Offsets compute automatically — just set side='left'|'right' and width."
      />

      <Section title="Frozen left + right" description="Scroll horizontally to see the effect.">
        <StickyTable>
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                <StickyColumn as="th" side="left" width={44}>
                  <Checkbox />
                </StickyColumn>
                <StickyColumn as="th" side="left" width={220}>
                  Product
                </StickyColumn>
                <th className={headBase} style={{ minWidth: 140 }}>
                  Category
                </th>
                <th className={headBase} style={{ minWidth: 140 }}>
                  Vendor
                </th>
                <th className={headBase} style={{ minWidth: 160 }}>
                  Warehouse
                </th>
                <th className={cellBase + " text-right h-9 text-[11px] font-semibold uppercase tracking-wider text-ink-3 bg-surface"} style={{ minWidth: 100 }}>
                  Cost
                </th>
                <th className={cellBase + " text-right h-9 text-[11px] font-semibold uppercase tracking-wider text-ink-3 bg-surface"} style={{ minWidth: 100 }}>
                  Price
                </th>
                <th className={cellBase + " text-right h-9 text-[11px] font-semibold uppercase tracking-wider text-ink-3 bg-surface"} style={{ minWidth: 100 }}>
                  Margin
                </th>
                <th className={cellBase + " text-right h-9 text-[11px] font-semibold uppercase tracking-wider text-ink-3 bg-surface"} style={{ minWidth: 100 }}>
                  Stock
                </th>
                <th className={headBase} style={{ minWidth: 120 }}>
                  Status
                </th>
                <StickyColumn as="th" side="right" width={56}>
                  <span className="sr-only">Actions</span>
                </StickyColumn>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id} className="hover:bg-surface/60 transition-colors">
                  <StickyColumn side="left" width={44}>
                    <Checkbox />
                  </StickyColumn>
                  <StickyColumn side="left" width={220} className="font-medium text-ink">
                    {r.name}
                  </StickyColumn>
                  <td className={cellBase}>{r.category}</td>
                  <td className={cellBase}>{r.vendor}</td>
                  <td className={cellBase}>{r.warehouse}</td>
                  <td className={cellBase + " text-right"}>{r.cost}</td>
                  <td className={cellBase + " text-right"}>{r.price}</td>
                  <td className={cellBase + " text-right"}>{r.margin}</td>
                  <td className={cellBase + " text-right"}>{r.stock}</td>
                  <td className={cellBase}>
                    <Badge tone={r.status} size="sm">
                      {r.status === "warning" ? "Low stock" : "In stock"}
                    </Badge>
                  </td>
                  <StickyColumn side="right" width={56}>
                    <Button variant="tertiary" size="micro" leading={<Icon icon={MoreHorizontalIcon} size="sm" />}>
                      <span className="sr-only">More</span>
                    </Button>
                  </StickyColumn>
                </tr>
              ))}
            </tbody>
          </table>
        </StickyTable>
      </Section>
    </div>
  )
}
