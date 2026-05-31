import { Icon } from "@cyanideui/ui"
import {
  DashboardSquare01Icon,
  Search01Icon,
  Notification03Icon,
  Calendar03Icon,
  ShoppingBag01Icon,
  UserMultiple02Icon,
  PackageIcon,
  Settings02Icon,
  HelpCircleIcon,
  Logout03Icon,
  SidebarLeft01Icon,
  Analytics01Icon,
  CreditCardIcon,
  DeliveryTruck01Icon,
  File02Icon,
  TruckIcon,
  Store01Icon,
  PackageReceiveIcon,
  Invoice03Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

const SIDEBAR_ICONS = [
  { name: "Dashboard", icon: DashboardSquare01Icon },
  { name: "Search", icon: Search01Icon },
  { name: "Notifications", icon: Notification03Icon },
  { name: "Calendar", icon: Calendar03Icon },
  { name: "Orders", icon: ShoppingBag01Icon },
  { name: "Customers", icon: UserMultiple02Icon },
  { name: "Products", icon: PackageIcon },
  { name: "Inventory", icon: PackageReceiveIcon },
  { name: "Warehouse", icon: Store01Icon },
  { name: "Suppliers", icon: TruckIcon },
  { name: "Shipping", icon: DeliveryTruck01Icon },
  { name: "Returns", icon: PackageReceiveIcon },
  { name: "Invoices", icon: Invoice03Icon },
  { name: "Payments", icon: CreditCardIcon },
  { name: "Reports", icon: File02Icon },
  { name: "Analytics", icon: Analytics01Icon },
  { name: "Users / Team", icon: UserGroupIcon },
  { name: "Settings", icon: Settings02Icon },
  { name: "Help", icon: HelpCircleIcon },
  { name: "Sign out", icon: Logout03Icon },
  { name: "Collapse", icon: SidebarLeft01Icon },
]

export function IconsPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        description="hugeicons Stroke Rounded variant only. Wrapped in a <Icon> component that locks strokeWidth to 1.75."
      />

      <Section title="Sizes">
        <div className="flex flex-wrap items-end gap-6 rounded-md border border-hairline bg-canvas p-6">
          {(["sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Icon icon={DashboardSquare01Icon} size={s} className="text-ink" />
              <span className="font-mono text-[11px] text-ink-3">{s}</span>
            </div>
          ))}
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Icon } from "@cyanideui/ui"
import { DashboardSquare01Icon } from "@hugeicons/core-free-icons"

<Icon icon={DashboardSquare01Icon} size="md" />`}
        />
      </Section>

      <Section title="Sidebar set" description="The 21 icons mapped to ERP nav slots in design.md §3.">
        <div className="grid grid-cols-2 gap-2 rounded-md border border-hairline bg-canvas p-3 md:grid-cols-3 lg:grid-cols-4">
          {SIDEBAR_ICONS.map((i) => (
            <div
              key={i.name}
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-ink-2 hover:bg-surface"
            >
              <Icon icon={i.icon} size="md" className="text-ink-3" />
              {i.name}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
