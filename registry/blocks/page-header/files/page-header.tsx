import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as React from "react"
import { Add01Icon, Download04Icon } from "@hugeicons/core-free-icons"

/**
 * PageHeader — a composed screen header: breadcrumbs, eyebrow, title +
 * subtitle, an actions cluster, and an optional sticky tab row.
 *
 * Prop-driven so you can reuse it across screens. The demo export at the
 * bottom shows a typical configuration — delete it once you wire your own.
 */

export interface PageHeaderProps {
  /** Small uppercase label above the title. */
  eyebrow?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  /** Right-aligned action cluster (buttons, menus). */
  actions?: React.ReactNode
  /** Tab definitions. When provided, renders a Tabs row below the header. */
  tabs?: { value: string; label: React.ReactNode }[]
  tabValue?: string
  onTabChange?: (value: string) => void
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
  tabs,
  tabValue,
  onTabChange,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              {eyebrow}
            </div>
          )}
          <h1 className="m-0 text-[22px] font-semibold tracking-tight text-ink">{title}</h1>
          {subtitle && <p className="mt-1 max-w-[640px] text-[13px] text-ink-3">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {tabs && tabs.length > 0 && (
        <Tabs value={tabValue} onValueChange={onTabChange} className="mt-1">
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </header>
  )
}

/** Demo usage — delete once you've wired your own header. */
export function PageHeaderDemo() {
  const [tab, setTab] = React.useState("all")
  return (
    <PageHeader
      eyebrow="Sales"
      title="Orders"
      subtitle="Search, filter, and bulk-edit orders across every channel."
      breadcrumbs={[{ label: "Sales", href: "#" }, { label: "Orders" }]}
      tabs={[
        { value: "all", label: "All" },
        { value: "open", label: "Open" },
        { value: "paid", label: "Paid" },
      ]}
      tabValue={tab}
      onTabChange={setTab}
      actions={
        <>
          <Button variant="secondary" leading={<Icon icon={Download04Icon} size="sm" />}>
            Export
          </Button>
          <Button leading={<Icon icon={Add01Icon} size="sm" />}>New order</Button>
        </>
      }
    />
  )
}
