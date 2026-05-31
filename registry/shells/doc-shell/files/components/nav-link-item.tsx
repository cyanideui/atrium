import * as React from "react"
// @atrium:if next
import Link from "next/link"
import { usePathname } from "next/navigation"
// @atrium:endif
// @atrium:if vite-react-router
import { NavLink, useMatch, useResolvedPath } from "react-router-dom"
// @atrium:endif
import { SidebarNavItem, type SidebarNavItemProps } from "@atrium/ui"

/**
 * Bridge between the router and the router-agnostic <SidebarNavItem>.
 * The whole row IS the link (correct semantics + full hover area).
 *
 * Usage:
 *   <NavLinkItem to="/orders" leading={...}>Orders</NavLinkItem>
 */
export interface NavLinkItemProps
  extends Omit<SidebarNavItemProps, "as" | "active" | "href"> {
  to: string
  /** Match on exact path (default: true for "/", false otherwise). */
  end?: boolean
}

// @atrium:if next
export const NavLinkItem = React.forwardRef<HTMLAnchorElement, NavLinkItemProps>(
  ({ to, end, ...rest }, ref) => {
    const pathname = usePathname()
    const isEnd = end ?? to === "/"
    const active = isEnd ? pathname === to : pathname.startsWith(to)
    return (
      <SidebarNavItem
        ref={ref}
        as={Link}
        href={to}
        active={active}
        {...rest}
      />
    )
  },
)
NavLinkItem.displayName = "NavLinkItem"
// @atrium:endif

// @atrium:if vite-react-router
export const NavLinkItem = React.forwardRef<HTMLAnchorElement, NavLinkItemProps>(
  ({ to, end, ...rest }, ref) => {
    const resolved = useResolvedPath(to)
    const match = useMatch({ path: resolved.pathname, end: end ?? to === "/" })
    return (
      <SidebarNavItem
        ref={ref}
        as={NavLink}
        // @ts-expect-error — `to` is a NavLink prop, not on SidebarNavItem's own props
        to={to}
        end={end ?? to === "/"}
        active={!!match}
        {...rest}
      />
    )
  },
)
NavLinkItem.displayName = "NavLinkItem"
// @atrium:endif
