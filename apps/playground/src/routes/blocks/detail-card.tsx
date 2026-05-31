import * as React from "react"
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  InlineEdit,
} from "@cyanideui/ui"
import { MoreHorizontalIcon, Edit02Icon, Copy01Icon, Delete02Icon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

interface Field {
  key: string
  label: string
  value: string
  readOnly?: boolean
}

const INITIAL_FIELDS: Field[] = [
  { key: "name", label: "Customer", value: "Acme Corporation" },
  { key: "email", label: "Email", value: "ap@acme.com" },
  { key: "since", label: "Customer since", value: "Mar 2024", readOnly: true },
  { key: "spend", label: "Total spend", value: "$48,210" },
  { key: "open", label: "Open orders", value: "3" },
]

export function DetailCardBlock() {
  const [fields, setFields] = React.useState(INITIAL_FIELDS)
  const commit = (key: string, next: string) =>
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value: next } : f)))

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Detail card"
        status="stable"
        description="Key/value detail panel with a header (title + status badge + actions menu) over inline-editable rows. Use for record summaries: customer, payment, shipping, metadata."
      />

      <Section title="Preview" description="Click any value to edit it inline. The value column stays fixed — editing never shifts the layout.">
        <div className="max-w-[420px]">
          <section className="overflow-hidden rounded-md border border-hairline bg-canvas">
            <header className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
              <div className="flex items-center gap-2">
                <h2 className="m-0 text-[13px] font-semibold text-ink">Customer</h2>
                <Badge tone="success" size="sm">Active</Badge>
              </div>
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
                  <DropdownMenuItem tone="critical" leading={<Icon icon={Delete02Icon} size="sm" />}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
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
          </section>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add detail-card`} />
      </Section>
    </>
  )
}
