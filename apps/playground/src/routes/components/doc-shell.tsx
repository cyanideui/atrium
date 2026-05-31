import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  DocShell,
  DocSidebar,
  DocSidebarBrand,
  DocSidebarSearch,
  DocSidebarNav,
  DocSidebarFooter,
  DocSidebarUser,
  DocSidebarBellAction,
  DocSidebarHelpAction,
  DocContent,
  DocBody,
  PageShell,
  PageShellAction,
  SidebarNav,
  SidebarNavSection,
  SidebarNavItem,
  SidebarNavParent,
  Breadcrumbs,
  Button,
  Badge,
  Avatar,
  AutoSaveStatus,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  Kbd,
} from "@atrium/ui"
import {
  Add01Icon,
  Analytics01Icon,
  ShoppingBag01Icon,
  ChartLineData01Icon,
  Invoice03Icon,
  UserMultiple02Icon,
  CreditCardIcon,
  PackageIcon,
  Store01Icon,
  TruckIcon,
  File02Icon,
  Settings02Icon,
  Logout03Icon,
  ArrowLeft02Icon,
  Tick02Icon,
  Moon02Icon,
  HelpCircleIcon,
  StarIcon,
  Notification03Icon,
} from "@hugeicons/core-free-icons"

const ORDERS = [
  { id: "1234", customer: "Acme Corporation", date: "Jan 12, 2025", status: "success" as const, statusLabel: "Paid", amount: "$1,240.00" },
  { id: "1235", customer: "Globex Industries", date: "Jan 11, 2025", status: "warning" as const, statusLabel: "Pending", amount: "$850.00" },
  { id: "1236", customer: "Initech LLC", date: "Jan 11, 2025", status: "critical" as const, statusLabel: "Failed", amount: "$2,100.00" },
  { id: "1237", customer: "Umbrella Corp", date: "Jan 10, 2025", status: "success" as const, statusLabel: "Paid", amount: "$3,450.00" },
  { id: "1238", customer: "Stark Enterprises", date: "Jan 10, 2025", status: "info" as const, statusLabel: "Processing", amount: "$920.00" },
  { id: "1239", customer: "Wayne Industries", date: "Jan 9, 2025", status: "success" as const, statusLabel: "Paid", amount: "$1,720.00" },
  { id: "1240", customer: "Wonka Inc", date: "Jan 9, 2025", status: "warning" as const, statusLabel: "Pending", amount: "$680.00" },
  { id: "1241", customer: "Hooli", date: "Jan 8, 2025", status: "success" as const, statusLabel: "Paid", amount: "$2,940.00" },
]

const KPIS = [
  { label: "Total revenue", value: "$124,592", trend: "↑ 12.5% vs last week", up: true },
  { label: "Orders", value: "1,847", trend: "↑ 8.2%", up: true },
  { label: "Pending", value: "342", trend: "↓ 2.1%", up: false },
  { label: "Fulfillment", value: "98.2%", trend: "↑ 0.4%", up: true },
]

function PinAction() {
  return (
    <Tooltip content="Unpin" side="top">
      <span className="flex h-4 w-4 items-center justify-center rounded-xs text-warning hover:bg-hairline">
        <Icon icon={StarIcon} size={12} className="fill-warning" />
      </span>
    </Tooltip>
  )
}

function AddPinnedAction() {
  return (
    <Tooltip content="Add to pinned" side="top">
      <button
        type="button"
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-xs text-ink-3 hover:bg-hairline hover:text-ink"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Icon icon={Add01Icon} size={12} />
      </button>
    </Tooltip>
  )
}

function BrandMenu() {
  return (
    <PopoverContent align="start" className="min-w-[260px] p-1" sideOffset={4}>
      <div className="px-2 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        Workspaces
      </div>
      <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] hover:bg-surface">
        <span className="flex h-5 w-5 items-center justify-center rounded-xs bg-ink text-canvas text-[10px] font-semibold">A</span>
        <span className="flex-1">
          <span className="block font-medium text-ink leading-tight">Acme Corp</span>
          <span className="block text-[11px] text-ink-3 leading-tight">john@acme.com</span>
        </span>
        <Icon icon={Tick02Icon} size={12} strokeWidth={2.5} className="text-ink" />
      </button>
      <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] hover:bg-surface">
        <span className="flex h-5 w-5 items-center justify-center rounded-xs bg-info text-canvas text-[10px] font-semibold">G</span>
        <span className="flex-1">
          <span className="block font-medium text-ink leading-tight">Globex Industries</span>
          <span className="block text-[11px] text-ink-3 leading-tight">2 members</span>
        </span>
      </button>
      <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ink-2 hover:bg-surface hover:text-ink">
        <Icon icon={Add01Icon} size={14} />
        Add workspace
      </button>
      <div className="my-1 h-px bg-hairline" />
      <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ink-2 hover:bg-surface hover:text-ink">
        <Icon icon={Settings02Icon} size={14} />
        Workspace settings
      </button>
    </PopoverContent>
  )
}

function UserMenu() {
  return (
    <PopoverContent align="start" side="top" className="min-w-[240px] p-1" sideOffset={4}>
      <div className="px-2 pb-0.5 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        John Doe
      </div>
      <div className="px-2 pb-1.5 text-[11px] text-ink-3">john@acme.com</div>
      <div className="my-0.5 h-px bg-hairline" />
      <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ink-2 hover:bg-surface hover:text-ink">
        <Icon icon={UserMultiple02Icon} size={14} />
        My profile
      </button>
      <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ink-2 hover:bg-surface hover:text-ink">
        <Icon icon={Moon02Icon} size={14} />
        <span className="flex-1">Toggle theme</span>
        <Kbd size="sm">T</Kbd>
      </button>
      <div className="my-0.5 h-px bg-hairline" />
      <button className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-error hover:bg-tone-critical-bg">
        <Icon icon={Logout03Icon} size={14} />
        Sign out
      </button>
    </PopoverContent>
  )
}

export function DocShellPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState("orders-pipeline")

  const navItem = (id: string, label: string, icon: typeof PackageIcon, badge?: number | string) => (
    <SidebarNavItem
      key={id}
      active={active === id}
      onClick={(e) => {
        e.preventDefault()
        setActive(id)
      }}
      leading={<Icon icon={icon} size={16} />}
      badge={badge}
      href="#"
    >
      {label}
    </SidebarNavItem>
  )

  const childItem = (id: string, label: string, icon: typeof PackageIcon, badge?: React.ReactNode) => (
    <SidebarNavItem
      key={id}
      active={active === id}
      onClick={(e) => {
        e.preventDefault()
        setActive(id)
      }}
      leading={<Icon icon={icon} size={14} />}
      badge={badge}
      href="#"
      indent
    >
      {label}
    </SidebarNavItem>
  )

  return (
    <DocShell>
      <DocSidebar>
        <Popover>
          <PopoverTrigger asChild>
            <DocSidebarBrand
              hasDropdown
              logo="A"
              name="Acme Corp"
              meta="john@acme.com"
            />
          </PopoverTrigger>
          <BrandMenu />
        </Popover>
        <DocSidebarSearch onClick={() => alert("Open command palette (⌘K)")} />
        <DocSidebarNav>
          <SidebarNav className="px-0 py-0 gap-2">
            <SidebarNavSection title="Pinned" action={<AddPinnedAction />}>
              <SidebarNavItem
                href="#"
                active={active === "inv-overview"}
                onClick={(e) => {
                  e.preventDefault()
                  setActive("inv-overview")
                }}
                leading={<Icon icon={Analytics01Icon} size={16} />}
                trailing={<PinAction />}
              >
                Inventory overview
              </SidebarNavItem>
              <SidebarNavItem
                href="#"
                active={active === "orders-pipeline"}
                onClick={(e) => {
                  e.preventDefault()
                  setActive("orders-pipeline")
                }}
                leading={<Icon icon={ShoppingBag01Icon} size={16} />}
                badge={12}
                trailing={<PinAction />}
              >
                Orders pipeline
              </SidebarNavItem>
              <SidebarNavItem
                href="#"
                active={active === "q1-report"}
                onClick={(e) => {
                  e.preventDefault()
                  setActive("q1-report")
                }}
                leading={<Icon icon={ChartLineData01Icon} size={16} />}
                trailing={<PinAction />}
              >
                Q1 financial report
              </SidebarNavItem>
            </SidebarNavSection>

            <SidebarNavSection title="Sales">
              <SidebarNavParent
                title="Sales"
                leading={<Icon icon={ShoppingBag01Icon} size={16} />}
                defaultOpen
              >
                {childItem("orders", "Orders", Invoice03Icon)}
                {childItem("customers", "Customers", UserMultiple02Icon)}
                {childItem("invoices", "Invoices", Invoice03Icon, <span className="h-1.5 w-1.5 rounded-pill bg-info" />)}
                {childItem("payments", "Payments", CreditCardIcon)}
              </SidebarNavParent>
            </SidebarNavSection>

            <SidebarNavSection title="Inventory">
              <SidebarNavParent
                title="Inventory"
                leading={<Icon icon={PackageIcon} size={16} />}
              >
                {childItem("products", "Products", PackageIcon)}
                {childItem("warehouses", "Warehouses", Store01Icon)}
                {childItem("transfers", "Stock transfers", PackageIcon)}
              </SidebarNavParent>
              {navItem("suppliers", "Suppliers", TruckIcon)}
              {navItem("reports", "Reports", File02Icon)}
            </SidebarNavSection>

            <SidebarNavSection title="Settings">
              {navItem("settings-general", "General", Settings02Icon)}
              {navItem("settings-team", "Team & permissions", UserMultiple02Icon)}
              {navItem("settings-billing", "Billing", CreditCardIcon)}
            </SidebarNavSection>
          </SidebarNav>
        </DocSidebarNav>

        <DocSidebarFooter>
          <Popover>
            <PopoverTrigger asChild>
              <DocSidebarUser
                avatar={<Avatar name="John Doe" size="sm" tone="ink" />}
                name="John Doe"
                meta="Admin"
              />
            </PopoverTrigger>
            <UserMenu />
          </Popover>
          <DocSidebarBellAction dot />
          <DocSidebarHelpAction />
        </DocSidebarFooter>
      </DocSidebar>

      <DocContent>
        <PageShell
          breadcrumb={
            <Breadcrumbs
              items={[
                { label: "Sales", href: "#" },
                { label: "Orders", href: "#" },
                { label: "Orders pipeline" },
              ]}
            />
          }
          appBarActions={
            <>
              <PageShellAction
                icon={<Icon icon={Notification03Icon} size={14} />}
                label="Notifications"
                dot
              />
              <PageShellAction
                icon={<Icon icon={HelpCircleIcon} size={14} />}
                label="Help"
              />
            </>
          }
          title="Orders pipeline"
          subtitle="Track open orders across all warehouses. Last synced 2 minutes ago."
          metadata={<AutoSaveStatus state="saved" savedAt="just now" />}
          secondaryActions={
            <>
              <Button
                variant="tertiary"
                size="sm"
                leading={<Icon icon={ArrowLeft02Icon} size={14} />}
                onClick={() => navigate("/")}
              >
                Back to docs
              </Button>
              <Button variant="secondary" size="sm">
                Export
              </Button>
            </>
          }
          primaryAction={<Button size="sm">+ New order</Button>}
        >
          <DocBody>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-md border border-hairline p-3.5">
                <div className="text-[24px] font-semibold tabular-nums text-ink leading-none">{k.value}</div>
                <div className="mt-1 text-[12px] text-ink-3">{k.label}</div>
                <div className={`mt-1.5 text-[12px] ${k.up ? "text-success" : "text-error"}`}>{k.trend}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-8 mb-2 text-[18px] font-semibold text-ink">Recent orders</h2>
          <div className="overflow-hidden rounded-md border border-hairline">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-surface">
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-3">Order</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-3">Customer</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-3">Date</th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-3">Status</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-ink-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-hairline transition-colors hover:bg-surface/60">
                    <td className="px-3 py-2.5 font-medium text-ink">#{o.id}</td>
                    <td className="px-3 py-2.5">{o.customer}</td>
                    <td className="px-3 py-2.5 text-ink-3">{o.date}</td>
                    <td className="px-3 py-2.5">
                      <Badge tone={o.status} size="sm">
                        {o.statusLabel}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-8 mb-2 text-[18px] font-semibold text-ink">About this layout</h2>
          <p className="mb-3 max-w-2xl text-[14px] text-ink-2">
            This is the Notion-style app shell — sidebar merged with the page background, content card on the right. Press <Kbd size="sm">B</Kbd> to collapse the sidebar (hover icons for tooltips). Press <Kbd size="sm">W</Kbd> to toggle centered/full-width body.
          </p>
          <p className="mb-3 max-w-2xl text-[14px] text-ink-2">
            Click "Acme Corp" at the top of the sidebar for the workspace switcher, or "John Doe" at the bottom for personal settings.
          </p>
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="mb-3 max-w-2xl text-[14px] text-ink-2">
              Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet purus a metus tristique consectetur ut sed leo. Curabitur ut elit a augue iaculis ornare.
            </p>
          ))}
        </DocBody>
        </PageShell>
      </DocContent>
    </DocShell>
  )
}
