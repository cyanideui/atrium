import * as React from "react"
import {
  Badge,
  Button,
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
  align?: "left" | "right"
}

const INITIAL_FIELDS: Field[] = [
  { key: "name", label: "Customer", value: "Acme Corporation" },
  { key: "email", label: "Email", value: "ap@acme.com" },
  { key: "since", label: "Customer since", value: "Mar 2024" },
  { key: "spend", label: "Total spend", value: "$48,210", align: "right" },
  { key: "open", label: "Open orders", value: "3", align: "right" },
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

      <Section title="Preview" description="Click any value to edit it inline.">
        <div className="max-w-[420px]">
          <section className="rounded-md border border-hairline bg-canvas">
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
            <dl className="flex flex-col divide-y divide-hairline">
              {fields.map((f) => (
                <div key={f.key} className="flex items-center justify-between gap-3 px-4 py-1.5">
                  <dt className="text-[12.5px] text-ink-3">{f.label}</dt>
                  <dd className="m-0 min-w-0 max-w-[60%] flex-1">
                    <InlineEdit
                      value={f.value}
                      onCommit={(next) => commit(f.key, next)}
                      align={f.align ?? "right"}
                      textClassName="text-[12.5px] font-medium text-ink"
                    />
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
