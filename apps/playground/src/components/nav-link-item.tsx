import * as React from "react"
import { NavLink, useMatch, useResolvedPath } from "react-router-dom"
import { SidebarNavItem, type SidebarNavItemProps } from "@cyanideui/ui"

/**
 * Bridge between react-router and the router-agnostic <SidebarNavItem>.
 * Uses useMatch to detect active state, then renders <SidebarNavItem> with
 * `as={NavLink}` so the entire row IS the link (correct semantics + hover area).
 *
 * Usage:
 *   <NavLinkItem to="/components/button" leading={...}>Button</NavLinkItem>
 */
export interface NavLinkItemProps extends Omit<SidebarNavItemProps, "as" | "active" | "href"> {
  to: string
  /** Match on exact path (default: true for "/", false otherwise). */
  end?: boolean
}

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
  }
)
NavLinkItem.displayName = "NavLinkItem"
