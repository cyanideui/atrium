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
  /**
   * Match on exact path. Defaults to `true` so each item only highlights on its
   * own route — important for index routes like `/blocks`, which would otherwise
   * prefix-match every `/blocks/*` child and light up alongside them. Pass
   * `end={false}` for a parent item that should stay active on its sub-routes.
   */
  end?: boolean
}

export const NavLinkItem = React.forwardRef<HTMLAnchorElement, NavLinkItemProps>(
  ({ to, end, ...rest }, ref) => {
    const resolved = useResolvedPath(to)
    const isEnd = end ?? true
    const match = useMatch({ path: resolved.pathname, end: isEnd })
    return (
      <SidebarNavItem
        ref={ref}
        as={NavLink}
        // @ts-expect-error — `to` is a NavLink prop, not on SidebarNavItem's own props
        to={to}
        end={isEnd}
        active={!!match}
        {...rest}
      />
    )
  }
)
NavLinkItem.displayName = "NavLinkItem"
