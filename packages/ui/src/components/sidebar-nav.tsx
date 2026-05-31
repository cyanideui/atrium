import * as React from "react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Badge } from "./badge"
import { Icon } from "./icon"
import { Tooltip } from "./tooltip"

/**
 * <SidebarNav> — design.md §5.30
 * App-shell sidebar pattern. Composable: use Section for groups,
 * Item for individual links, Parent for collapsible groups with children.
 *
 * Pure layout — wire to your router by providing `as` (e.g. NavLink) or
 * by handling clicks yourself via onClick + active prop.
 *
 * **Collapse awareness.** When rendered inside a collapsed `<DocSidebar>`
 * (or any consumer that provides `<SidebarCollapseContext.Provider value>`),
 * Items render icon-only with auto-tooltips, Section titles hide, and Parent
 * groups flatten to their leading icon. Standalone usage (no provider)
 * always renders the expanded form.
 */

const SidebarCollapseContext = React.createContext(false)

export interface SidebarCollapseProviderProps {
  collapsed: boolean
  children: React.ReactNode
}

/** Wrap a `<SidebarNav>` tree with this to make it collapse-aware. Only
 *  needed when consumers want to drive collapse from outside the library
 *  app-shell. `<DocSidebar>` already provides this internally. */
export function SidebarCollapseProvider({ collapsed, children }: SidebarCollapseProviderProps) {
  return (
    <SidebarCollapseContext.Provider value={collapsed}>{children}</SidebarCollapseContext.Provider>
  )
}

function useCollapsed() {
  return React.useContext(SidebarCollapseContext)
}

export const SidebarNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...rest }, ref) => {
  const collapsed = useCollapsed()
  return (
    <nav
      ref={ref}
      aria-label="Primary"
      data-collapsed={collapsed || undefined}
      className={cn(
        "flex h-full w-full flex-col gap-2 px-2 py-3",
        // Tighter horizontal padding when collapsed so 32px buttons sit centered in the 56px rail.
        collapsed && "px-0",
        className
      )}
      {...rest}
    >
      {children}
    </nav>
  )
})
SidebarNav.displayName = "SidebarNav"

export interface SidebarNavSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  /** Optional action revealed on section hover (e.g. "+" to add). */
  action?: React.ReactNode
}

export const SidebarNavSection = ({
  title,
  action,
  className,
  children,
  ...rest
}: SidebarNavSectionProps) => {
  const collapsed = useCollapsed()
  return (
    <div className={cn("group/section flex flex-col", className)} {...rest}>
      {title && !collapsed && (
        <div className="mb-1 flex items-center gap-1 px-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          <span className="flex-1 truncate">{title}</span>
          {action && (
            <span className="opacity-0 transition-opacity duration-[var(--dur-fast)] group-hover/section:opacity-100">
              {action}
            </span>
          )}
        </div>
      )}
      {/* When collapsed, render a 1-px hairline divider between sections so the
          icon stack stays scannable (Notion / Linear pattern). */}
      {collapsed && title && <div aria-hidden className="mx-3 my-1 h-px bg-hairline first:hidden" />}
      <ul className={cn("flex flex-col gap-px", collapsed && "items-center")}>{children}</ul>
    </div>
  )
}
SidebarNavSection.displayName = "SidebarNavSection"

export interface SidebarNavItemProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "title"> {
  active?: boolean
  href?: string
  leading?: React.ReactNode
  badge?: React.ReactNode | number
  /** Action revealed on item hover (e.g. star/unpin). */
  trailing?: React.ReactNode
  /** Render as a different element (e.g. NavLink from react-router). */
  as?: React.ElementType
  /** Indent the row — used by nested children. */
  indent?: boolean
  /** Tooltip label shown when collapsed. Defaults to children if a string. */
  collapsedLabel?: React.ReactNode
}

export const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  (
    {
      className,
      active,
      href,
      leading,
      badge,
      trailing,
      as,
      indent,
      collapsedLabel,
      children,
      ...rest
    },
    ref
  ) => {
    const collapsed = useCollapsed()
    const Tag = (as ?? "a") as React.ElementType
    const renderedBadge =
      typeof badge === "number" ? (
        <Badge size="sm" tone="readonly" dotless>
          {badge}
        </Badge>
      ) : (
        badge
      )

    const link = (
      <Tag
        ref={ref}
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative flex h-8 cursor-pointer items-center gap-2 rounded-sm text-[13px]",
          "transition-[background-color,color] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
          collapsed
            ? "h-8 w-8 justify-center px-0"
            : "px-2",
          active
            ? "bg-surface-2 font-medium text-ink"
            : "text-ink-2 hover:bg-surface-2 hover:text-ink",
          className
        )}
        {...rest}
      >
        {leading && (
          <span
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center",
              active ? "text-ink" : "text-ink-3 group-hover/item:text-ink"
            )}
          >
            {leading}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1 truncate">{children}</span>
            {renderedBadge && <span className="ml-auto shrink-0">{renderedBadge}</span>}
            {trailing && (
              <span className="ml-auto shrink-0 opacity-0 transition-opacity duration-[var(--dur-fast)] group-hover/item:opacity-100">
                {trailing}
              </span>
            )}
          </>
        )}
        {/* When collapsed: keep a tiny dot indicator if there's an unread badge. */}
        {collapsed && renderedBadge && (
          <span
            aria-hidden
            className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-pill bg-info ring-[1.5px] ring-surface"
          />
        )}
      </Tag>
    )

    const tooltipLabel = collapsedLabel ?? (typeof children === "string" ? children : null)

    return (
      <li className="group/item">
        {collapsed && tooltipLabel ? (
          <Tooltip content={tooltipLabel} side="right">
            {link}
          </Tooltip>
        ) : (
          link
        )}
      </li>
    )
  }
)
SidebarNavItem.displayName = "SidebarNavItem"

/**
 * <SidebarNavParent> — collapsible group with children.
 * Animates expand/collapse via max-height + ease-standard, 200ms.
 *
 * When the surrounding sidebar is collapsed, this flattens to the leading
 * icon only — clicking opens a tooltip-list popover would be the natural
 * upgrade, but for now collapsed sidebars stay flat (the user can expand
 * the sidebar with `B` to drill in).
 */
export interface SidebarNavParentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  leading?: React.ReactNode
  /** Initially expanded? */
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Children (typically <SidebarNavItem>s). */
  children: React.ReactNode
}

export const SidebarNavParent = React.forwardRef<HTMLDivElement, SidebarNavParentProps>(
  ({ className, title, leading, defaultOpen = false, open: controlled, onOpenChange, children, ...rest }, ref) => {
    const collapsed = useCollapsed()
    const [internal, setInternal] = React.useState(defaultOpen)
    const isControlled = controlled !== undefined
    const isOpen = isControlled ? !!controlled : internal
    const setOpen = (v: boolean) => {
      if (!isControlled) setInternal(v)
      onOpenChange?.(v)
    }

    if (collapsed) {
      // Flatten — show only the leading icon, with the title as a tooltip.
      const tooltipTitle = typeof title === "string" ? title : "Group"
      return (
        <div ref={ref} className={cn("flex flex-col items-center", className)} {...rest}>
          <Tooltip content={tooltipTitle} side="right">
            <button
              type="button"
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-ink-2",
                "transition-[background-color,color] duration-[var(--dur-fast)]",
                "hover:bg-surface-2 hover:text-ink"
              )}
              aria-label={tooltipTitle}
            >
              {leading ?? <Icon icon={ArrowRight01Icon} size={14} />}
            </button>
          </Tooltip>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...rest}>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setOpen(!isOpen)}
          className={cn(
            "group/parent flex h-8 cursor-pointer items-center gap-1.5 rounded-sm px-2 text-[13px] text-ink-2",
            "transition-[background-color,color] duration-[var(--dur-fast)]",
            "hover:bg-surface-2 hover:text-ink"
          )}
        >
          <span
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center text-ink-3 transition-transform duration-[var(--dur-base)] ease-[var(--ease-standard)]",
              isOpen && "rotate-90"
            )}
            aria-hidden
          >
            <Icon icon={ArrowRight01Icon} size={10} />
          </span>
          {leading && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center text-ink-3 group-hover/parent:text-ink">
              {leading}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-left">{title}</span>
        </button>
        <div
          className={cn(
            "overflow-hidden transition-[max-height,margin-top] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
            "ml-[18px] border-l border-hairline pl-1",
            isOpen ? "mt-0.5 max-h-[1000px]" : "mt-0 max-h-0"
          )}
        >
          <ul className="flex flex-col gap-px py-0.5">{children}</ul>
        </div>
      </div>
    )
  }
)
SidebarNavParent.displayName = "SidebarNavParent"
