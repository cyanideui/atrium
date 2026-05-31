import type { IconSvgElement } from "@hugeicons/react"
import {
  HomeIcon,
  ShoppingBag01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons"

/**
 * App navigation config.
 *
 * EDIT THIS FILE to set your routes. The shell reads it to render the
 * sidebar nav, build breadcrumbs, and populate the command palette.
 *
 * Structure:
 *   - `entries` — flat links rendered directly under the section title.
 *   - `categories` — collapsible groups (each with its own entries).
 */

export interface NavEntry {
  label: string
  path: string
  icon?: IconSvgElement
}

export interface NavCategory {
  title: string
  icon?: IconSvgElement
  entries: NavEntry[]
}

export interface NavSection {
  title: string
  entries?: NavEntry[]
  categories?: NavCategory[]
}

export const NAV: NavSection[] = [
  {
    title: "Workspace",
    entries: [
      { label: "Dashboard", path: "/", icon: HomeIcon },
      { label: "Orders", path: "/orders", icon: ShoppingBag01Icon },
      { label: "Settings", path: "/settings", icon: Settings02Icon },
    ],
  },
  // Example of a collapsible category — uncomment + adapt:
  //
  // {
  //   title: "Reports",
  //   categories: [
  //     {
  //       title: "Sales",
  //       icon: ChartIcon,
  //       entries: [
  //         { label: "Revenue", path: "/reports/revenue" },
  //         { label: "Forecast", path: "/reports/forecast" },
  //       ],
  //     },
  //   ],
  // },
]
