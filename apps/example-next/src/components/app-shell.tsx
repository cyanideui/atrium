"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DocShell,
  DocSidebar,
  DocSidebarBrand,
  DocSidebarSearch,
  DocSidebarNav,
  DocSidebarFooter,
  DocSidebarUser,
  DocSidebarBellAction,
  DocContent,
  DocBody,
  PageShell,
  PageShellAction,
  Breadcrumbs,
  SidebarNav,
  SidebarNavSection,
  SidebarNavItem,
  Avatar,
  Icon,
} from "@cyanideui/ui"
import {
  HomeIcon,
  ShoppingBag01Icon,
  Settings02Icon,
  Moon02Icon,
  Sun02Icon,
} from "@hugeicons/core-free-icons"

interface NavLink {
  label: string
  href: string
  icon: typeof HomeIcon
}

const NAV: NavLink[] = [
  { label: "Dashboard", href: "/", icon: HomeIcon },
  { label: "Orders", href: "/orders", icon: ShoppingBag01Icon },
  { label: "Settings", href: "/settings", icon: Settings02Icon },
]

const BREADCRUMBS: Record<string, { label: string }[]> = {
  "/": [{ label: "Dashboard" }],
  "/orders": [{ label: "Sales" }, { label: "Orders" }],
  "/settings": [{ label: "Account" }, { label: "Settings" }],
}

/**
 * Atrium DocShell wired with Next.js App Router. Sidebar uses next/link;
 * active state derived from `usePathname()`.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const breadcrumb = BREADCRUMBS[pathname] ?? [{ label: "Page" }]

  return (
    <DocShell defaultBodyWidth="full">
      <DocSidebar>
        <Link href="/" className="block no-underline">
          <DocSidebarBrand logo="A" name="Atrium UI" meta="Next.js example" />
        </Link>

        <DocSidebarSearch placeholder="Search…" />

        <DocSidebarNav>
          <SidebarNav className="px-0 py-0 gap-3">
            <SidebarNavSection title="Workspace">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="block no-underline">
                  <SidebarNavItem
                    active={pathname === item.href}
                    leading={<Icon icon={item.icon} size={16} />}
                  >
                    {item.label}
                  </SidebarNavItem>
                </Link>
              ))}
            </SidebarNavSection>
          </SidebarNav>
        </DocSidebarNav>

        <DocSidebarFooter>
          <DocSidebarUser
            avatar={<Avatar size="sm" name="Jane Cooper" />}
            name="Jane Cooper"
            meta="Admin"
          />
          <DocSidebarBellAction dot />
        </DocSidebarFooter>
      </DocSidebar>

      <DocContent pulseKey={pathname}>
        <PageShell
          breadcrumb={<Breadcrumbs items={breadcrumb} />}
          appBarActions={<ThemeToggle />}
        >
          <DocBody className="px-10 pb-24 pt-10" centeredMaxWidth={1080}>
            {children}
          </DocBody>
        </PageShell>
      </DocContent>
    </DocShell>
  )
}

/**
 * Minimal theme toggle. In a real app, hoist this into a context provider
 * + sync to localStorage. Here it's the bare wire-up so you can flip
 * between light and dark without leaving the page.
 */
function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <PageShellAction
      icon={<Icon icon={theme === "dark" ? Sun02Icon : Moon02Icon} size={14} />}
      label={theme === "dark" ? "Light mode" : "Dark mode"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    />
  )
}
