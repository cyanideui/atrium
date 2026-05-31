import * as React from "react"
import {
  Button,
  ButtonGroup,
  DensityProvider,
  Input,
  Label,
  SearchField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  useDensity,
  type Density,
} from "@atrium/ui"
import { PageHeader, Section } from "../../components/page-shell"

/**
 * Density showcase — visual side-by-side of all three density modes.
 *
 * Pattern:
 *   - One row per "control family" (forms, table, buttons).
 *   - Each row renders the same component three times wrapped in
 *     <DensityProvider density="compact-plus|compact|comfortable">.
 *   - The wrapper is the only thing that changes; everything else is
 *     identical so the height/padding/type-scale deltas are obvious.
 *
 * Reviewers can also press `D` to cycle the global density and watch
 * EVERY page in the playground reflow at once. The local previews on
 * this page are anchored to specific densities via <DensityProvider>,
 * so they don't move when the global mode changes.
 */

const DENSITIES: Density[] = ["compact-plus", "compact", "comfortable"]

interface RowProps {
  title: string
  description?: string
  children: (density: Density) => React.ReactNode
}

function DensityRow({ title, description, children }: RowProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h3 className="m-0 text-[13px] font-semibold text-ink">{title}</h3>
          {description && (
            <p className="m-0 mt-0.5 text-[12px] text-ink-3">{description}</p>
          )}
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {DENSITIES.map((d) => (
          <DensityProvider key={d} density={d} className="rounded-md border border-hairline bg-canvas p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
                {d.replace("-", " ")}
              </span>
              <Badge tone={d === "compact-plus" ? "info" : d === "comfortable" ? "success" : "default"}>
                {d}
              </Badge>
            </div>
            {children(d)}
          </DensityProvider>
        ))}
      </div>
    </div>
  )
}

function GlobalDensityIndicator() {
  const { density } = useDensity()
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas px-2.5 py-1.5 text-[12px]">
      <span className="text-ink-3">Global density:</span>
      <Badge tone={density === "compact-plus" ? "info" : density === "comfortable" ? "success" : "default"}>
        {density}
      </Badge>
      <span className="text-ink-4">— press <kbd className="rounded-xs border border-hairline-strong bg-surface px-1 font-mono text-[10.5px]">D</kbd> to cycle</span>
    </div>
  )
}

export function DensityPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Foundations"
        title="Density"
        description="Three rhythm modes — compact-plus (dense ERP), compact (Notion / Linear scale, default), and comfortable (touch-friendly). Heights, gaps, paddings, and type all scale; radii stay fixed so the visual identity stays consistent."
      />

      <Section
        title="Switching modes"
        description="Three ways to apply a density. Use whichever fits your wiring."
      >
        <div className="flex flex-col gap-3">
          <GlobalDensityIndicator />
          <div className="rounded-md border border-hairline bg-canvas p-4">
            <ol className="m-0 flex list-decimal flex-col gap-2 pl-5 text-[13px] text-ink-2">
              <li>
                <strong>Global</strong> — wrap your app in <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">{`<DensityRoot>`}</code> and call <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">useDensityHotkey()</code> for the <kbd className="rounded-xs border border-hairline-strong bg-surface px-1 font-mono text-[11px]">D</kbd> shortcut. The playground does this in <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">App.tsx</code>.
              </li>
              <li>
                <strong>Scoped</strong> — wrap a subtree in <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">{`<DensityProvider density="compact">`}</code> to override the global mode for that branch only. Useful for "compact summary table inside a comfortable settings page".
              </li>
              <li>
                <strong>Manual</strong> — drop one of the classes <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">.ds-density-compact-plus</code> / <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">.ds-density-compact</code> / <code className="rounded-xs bg-surface px-1 font-mono text-[12px]">.ds-density-comfortable</code> on any element. No React context needed — pure CSS variable cascade.
              </li>
            </ol>
          </div>
        </div>
      </Section>

      <Section
        title="Forms"
        description="Inputs, search fields, selects all reflow. Notice the type scale step subtly with the height."
      >
        <DensityRow title="Input + Select + SearchField (size=md)">
          {() => (
            <div className="flex flex-col gap-2.5">
              <div>
                <Label className="mb-1 block">Customer</Label>
                <Input placeholder="Acme Corporation" defaultValue="Acme Corporation" />
              </div>
              <div>
                <Label className="mb-1 block">Status</Label>
                <Select defaultValue="paid">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Search</Label>
                <SearchField placeholder="Search invoices…" />
              </div>
            </div>
          )}
        </DensityRow>
      </Section>

      <Section
        title="Table"
        description="Row + header heights both scale. Comfortable gives breathing room, compact-plus crams more rows on screen."
      >
        <DensityRow title="Five rows of orders">
          {() => (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "1234", customer: "Acme", amount: "$1,240" },
                  { id: "1235", customer: "Globex", amount: "$850" },
                  { id: "1236", customer: "Initech", amount: "$2,100" },
                  { id: "1237", customer: "Umbrella", amount: "$3,450" },
                  { id: "1238", customer: "Stark", amount: "$920" },
                ].map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-[12.5px] tabular-nums text-ink-2">
                      #{r.id}
                    </TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell className="text-right tabular-nums">{r.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DensityRow>
      </Section>

      <Section
        title="Toolbar"
        description="Buttons and switches reflow with density too — toolbars compress in compact-plus and breathe in comfortable. Action affordances stay legible because the scale is gentler than the form scale (4 px steps vs 8 px)."
      >
        <DensityRow title="Toolbar with buttons + switch">
          {() => (
            <div className="flex flex-col gap-3">
              <ButtonGroup>
                <Button variant="secondary" size="sm">All</Button>
                <Button variant="secondary" size="sm">Open</Button>
                <Button variant="secondary" size="sm">Closed</Button>
              </ButtonGroup>
              <div className="flex items-center justify-between rounded-sm border border-hairline bg-surface px-3 py-2">
                <span className="text-[12.5px] text-ink-2">Show archived</span>
                <Switch />
              </div>
            </div>
          )}
        </DensityRow>
      </Section>

      <Section
        title="Scoped override — nesting"
        description="A compact-plus table inside a comfortable settings page. The DensityProvider scopes the override to its subtree only; everything outside stays roomy."
      >
        <DensityProvider density="comfortable" className="rounded-md border border-hairline bg-canvas p-4">
          <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
            Comfortable settings shell
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Label className="mb-1 block">Workspace name</Label>
              <Input defaultValue="Acme Workspace" />
            </div>
            <div className="rounded-sm border border-hairline">
              <DensityProvider density="compact-plus">
                <div className="border-b border-hairline px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-3 bg-surface">
                  Audit log (compact-plus)
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>When</TableHead>
                      <TableHead>Actor</TableHead>
                      <TableHead>Event</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["09:42", "jane@acme", "Updated invoice #1234"],
                      ["09:40", "ops@acme", "Created webhook"],
                      ["09:38", "jane@acme", "Approved refund #998"],
                      ["09:35", "system",  "Daily reconciliation OK"],
                    ].map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-mono text-[12px] tabular-nums text-ink-3">{row[0]}</TableCell>
                        <TableCell className="text-ink-2">{row[1]}</TableCell>
                        <TableCell>{row[2]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DensityProvider>
            </div>
          </div>
        </DensityProvider>
      </Section>
    </div>
  )
}
