import { Breadcrumbs } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function BreadcrumbsPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Breadcrumbs"
        status="stable"
        description="Chevron separators. Current page in ink, links in ink-3 → ink on hover."
      />

      <Section title="Default">
        <Demo
          code={`<Breadcrumbs items={[
  { label: "Inventory", href: "/inventory" },
  { label: "Products", href: "/inventory/products" },
  { label: "Edit SKU" },
]} />`}
        >
          <Breadcrumbs
            items={[
              { label: "Inventory", href: "/inventory" },
              { label: "Products", href: "/inventory/products" },
              { label: "Edit SKU" },
            ]}
          />
        </Demo>
      </Section>

      <Section title="Two-level">
        <Demo
          code={`<Breadcrumbs items={[
  { label: "Orders", href: "/orders" },
  { label: "#1234" },
]} />`}
        >
          <Breadcrumbs
            items={[
              { label: "Orders", href: "/orders" },
              { label: "#1234" },
            ]}
          />
        </Demo>
      </Section>

      <Section title="With renderLink (e.g. react-router)">
        <Demo
          code={`<Breadcrumbs
  items={...}
  renderLink={(item, child) => <Link to={item.href!}>{child}</Link>}
/>`}
        >
          <Breadcrumbs
            items={[
              { label: "Settings", href: "/settings" },
              { label: "Team", href: "/settings/team" },
              { label: "Permissions" },
            ]}
          />
        </Demo>
      </Section>
    </div>
  )
}
