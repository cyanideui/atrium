import { useState } from "react"
import {
  SidebarNav,
  SidebarNavSection,
  SidebarNavItem,
  SidebarNavParent,
  Icon,
} from "@cyanideui/ui"
import {
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  UserMultiple02Icon,
  PackageIcon,
  Analytics01Icon,
  Settings02Icon,
  HelpCircleIcon,
  Notification03Icon,
  StarIcon,
  Add01Icon,
  Invoice03Icon,
  CreditCardIcon,
  Store01Icon,
  TruckIcon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SidebarNavComponentPage() {
  const [active, setActive] = useState("orders")

  const item = (id: string, label: string, icon: typeof DashboardSquare01Icon, badge?: number | string, trailing?: React.ReactNode, indent?: boolean) => (
    <SidebarNavItem
      key={id}
      active={active === id}
      onClick={(e) => {
        e.preventDefault()
        setActive(id)
      }}
      leading={<Icon icon={icon} size={indent ? 14 : 16} />}
      badge={badge}
      trailing={trailing}
      indent={indent}
      href="#"
    >
      {label}
    </SidebarNavItem>
  )

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Sidebar Nav"
        status="stable"
        description="App-shell navigation primitive. Composable: SidebarNav + Section + Item + Parent. v3.14 dropped the active rail; the surface-2 fill + bold text is the new active cue (Notion-style)."
      />

      <Section title="Default">
        <Demo
          code={`<SidebarNav>
  <SidebarNavSection title="Overview">
    <SidebarNavItem active leading={<Icon ... />}>Dashboard</SidebarNavItem>
    ...
  </SidebarNavSection>
</SidebarNav>`}
        >
          <div className="w-[260px] overflow-hidden rounded-md border border-hairline bg-canvas">
            <SidebarNav>
              <SidebarNavSection title="Overview">
                {item("dashboard", "Dashboard", DashboardSquare01Icon)}
                {item("orders", "Orders", ShoppingBag01Icon, 12)}
                {item("customers", "Customers", UserMultiple02Icon)}
                {item("analytics", "Analytics", Analytics01Icon)}
              </SidebarNavSection>
              <SidebarNavSection title="Inventory">
                {item("products", "Products", PackageIcon, 3)}
                {item("notifications", "Notifications", Notification03Icon, "New")}
              </SidebarNavSection>
              <SidebarNavSection title="Settings">
                {item("settings", "General", Settings02Icon)}
                {item("help", "Help", HelpCircleIcon)}
              </SidebarNavSection>
            </SidebarNav>
          </div>
        </Demo>
      </Section>

      <Section
        title="With section action + item trailing slot"
        description="Hover the Pinned section header for the + button, hover items for the unpin star."
      >
        <Demo
          code={`<SidebarNavSection title="Pinned" action={<button><Icon icon={Add01Icon} size={12} /></button>}>
  <SidebarNavItem trailing={<button><Icon icon={StarIcon} className="fill-warning" size={12} /></button>}>
    ...
  </SidebarNavItem>
</SidebarNavSection>`}
        >
          <div className="w-[260px] overflow-hidden rounded-md border border-hairline bg-canvas">
            <SidebarNav>
              <SidebarNavSection
                title="Pinned"
                action={
                  <button
                    type="button"
                    className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-xs text-ink-3 hover:bg-hairline hover:text-ink"
                  >
                    <Icon icon={Add01Icon} size={12} />
                  </button>
                }
              >
                {item(
                  "pin-1",
                  "Inventory overview",
                  Analytics01Icon,
                  undefined,
                  <span className="flex h-4 w-4 items-center justify-center text-warning">
                    <Icon icon={StarIcon} size={12} className="fill-warning" />
                  </span>
                )}
                {item(
                  "pin-2",
                  "Orders pipeline",
                  ShoppingBag01Icon,
                  12,
                  undefined
                )}
              </SidebarNavSection>
            </SidebarNav>
          </div>
        </Demo>
      </Section>

      <Section title="With collapsible parent" description="Use SidebarNavParent for grouped navigation.">
        <Demo
          code={`<SidebarNavParent title="Sales" leading={<Icon icon={ShoppingBag01Icon} />} defaultOpen>
  <SidebarNavItem indent leading={<Icon icon={Invoice03Icon} size={14} />}>Orders</SidebarNavItem>
  <SidebarNavItem indent leading={<Icon icon={UserMultiple02Icon} size={14} />}>Customers</SidebarNavItem>
</SidebarNavParent>`}
        >
          <div className="w-[260px] overflow-hidden rounded-md border border-hairline bg-canvas">
            <SidebarNav>
              <SidebarNavSection title="Modules">
                <SidebarNavParent
                  title="Sales"
                  leading={<Icon icon={ShoppingBag01Icon} size={16} />}
                  defaultOpen
                >
                  {item("p-orders", "Orders", Invoice03Icon, undefined, undefined, true)}
                  {item("p-customers", "Customers", UserMultiple02Icon, undefined, undefined, true)}
                  {item("p-payments", "Payments", CreditCardIcon, undefined, undefined, true)}
                </SidebarNavParent>
                <SidebarNavParent
                  title="Inventory"
                  leading={<Icon icon={PackageIcon} size={16} />}
                >
                  {item("p-prod", "Products", PackageIcon, undefined, undefined, true)}
                  {item("p-wh", "Warehouses", Store01Icon, undefined, undefined, true)}
                </SidebarNavParent>
                {item("suppliers", "Suppliers", TruckIcon)}
              </SidebarNavSection>
            </SidebarNav>
          </div>
        </Demo>
      </Section>

      <Section title="Without leading icons">
        <Demo code={`<SidebarNavItem active>...`}>
          <div className="w-[260px] overflow-hidden rounded-md border border-hairline bg-canvas">
            <SidebarNav>
              <SidebarNavSection title="Components">
                <SidebarNavItem active href="#">
                  Button
                </SidebarNavItem>
                <SidebarNavItem href="#">Badge</SidebarNavItem>
                <SidebarNavItem href="#">Banner</SidebarNavItem>
                <SidebarNavItem href="#">Modal</SidebarNavItem>
              </SidebarNavSection>
            </SidebarNav>
          </div>
        </Demo>
      </Section>
    </div>
  )
}
