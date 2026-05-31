import * as React from "react"
import { Breadcrumbs, Button, Icon, Tabs, TabsList, TabsTrigger } from "@cyanideui/ui"
import { Add01Icon, Download04Icon } from "@hugeicons/core-free-icons"
import { PageHeader as ShowcaseHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

export function PageHeaderBlock() {
  const [tab, setTab] = React.useState("all")
  return (
    <>
      <ShowcaseHeader
        eyebrow="Blocks"
        title="Page header"
        status="stable"
        description="Composed screen header — breadcrumbs, eyebrow, title + subtitle, an actions cluster, and an optional tab row. Prop-driven and reusable across screens."
      />

      <Section title="Preview">
        <div className="rounded-md border border-hairline bg-canvas p-6">
          <header className="flex flex-col gap-3">
            <Breadcrumbs items={[{ label: "Sales", href: "#" }, { label: "Orders" }]} />
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">Sales</div>
                <h1 className="m-0 text-[22px] font-semibold tracking-tight text-ink">Orders</h1>
                <p className="mt-1 max-w-[640px] text-[13px] text-ink-3">
                  Search, filter, and bulk-edit orders across every channel.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="secondary" leading={<Icon icon={Download04Icon} size="sm" />}>Export</Button>
                <Button leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
              </div>
            </div>
            <Tabs value={tab} onValueChange={setTab} className="mt-1">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>
            </Tabs>
          </header>
        </div>
      </Section>

      <Section title="Install" description="Copy-paste into your project via the CLI. Ships a prop-driven <PageHeader /> plus a demo.">
        <CodeBlock language="bash" code={`npx cyanideui add page-header`} />
      </Section>
    </>
  )
}
