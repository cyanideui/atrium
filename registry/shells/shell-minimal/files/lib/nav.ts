import type { IconSvgElement } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons"

/**
 * Top-bar navigation for the minimal shell. Edit this to set your routes —
 * the header renders one link per entry and highlights the active one.
 */

export interface NavEntry {
  label: string
  path: string
  icon?: IconSvgElement
}

export const NAV: NavEntry[] = [
  { label: "Dashboard", path: "/", icon: DashboardSquare01Icon },
  { label: "Orders", path: "/orders", icon: ShoppingBag01Icon },
  { label: "Customers", path: "/customers", icon: UserGroupIcon },
  { label: "Settings", path: "/settings", icon: Settings02Icon },
]
