import * as React from "react"
import {
  Search01Icon,
  ArrowDown01Icon,
  Notification03Icon,
  HelpCircleIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Tooltip } from "@/components/ui/tooltip"
import { useDocShell } from "@/components/ui/doc-shell"
import { SidebarCollapseProvider } from "@/components/ui/sidebar-nav"
import { Kbd, KbdShortcut } from "@/components/ui/kbd"
import { useScrollOverlay } from "@/lib/use-scroll-overlay"

/**
 * <DocSidebar> — outer sidebar element for <DocShell>. Lays out:
 *   <DocSidebarBrand>      — top row, workspace switcher
 *   <DocSidebarSearch>     — opens command palette
 *   ...children            — typically <SidebarNav> with sections + items
 *   <DocSidebarFooter>     — user button + bell + help
 *
 * Sidebar bg is var(--surface) so it merges with the page bg. The content
 * card on the right is the only "lifted" element.
 *
 * Includes a floating collapse toggle on the sidebar's right edge — Notion
 * style. The button sticks halfway between the sidebar and the content card
 * and is always visible regardless of what's inside the content area.
 */

export const DocSidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...rest }, ref) => {
    const { collapsed } = useDocShell()
    return (
      <aside
        ref={ref}
        data-collapsed={collapsed || undefined}
        className={cn(
          "relative flex h-screen flex-col bg-surface text-ink-2",
          className
        )}
        {...rest}
      >
        {children}
      </aside>
    )
  }
)
DocSidebar.displayName = "DocSidebar"

export interface DocSidebarBrandProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "name"> {
  /** Logo content (typically a 1–2 char letter or small icon). */
  logo?: React.ReactNode
  /** Workspace name. */
  name: React.ReactNode
  /** Subtitle (email / member count / "Free plan"). */
  meta?: React.ReactNode
  /** Show the chevron-down hint. Default false — only set true when wired
   *  to a workspace dropdown via <Popover>. */
  hasDropdown?: boolean
}

export const DocSidebarBrand = React.forwardRef<HTMLButtonElement, DocSidebarBrandProps>(
  ({ className, logo, name, meta, hasDropdown = false, ...rest }, ref) => {
    const { collapsed } = useDocShell()

    const button = (
      <button
        ref={ref}
        type="button"
        aria-haspopup={hasDropdown ? "menu" : undefined}
        className={cn(
          "group relative flex h-10 cursor-pointer items-center gap-2.5 rounded-sm",
          "transition-[background-color] duration-[var(--dur-fast)]",
          "hover:bg-surface-2",
          collapsed
            ? "mx-auto mt-2 w-10 justify-center px-0"
            : "mx-2 mt-2 px-2",
          className
        )}
        {...rest}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-ink text-canvas text-[12px] font-semibold">
          {logo}
        </span>
        {!collapsed && (
          <>
            <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
              <span className="truncate text-[13px] font-semibold text-ink">{name}</span>
              {meta && <span className="truncate text-[11px] text-ink-3">{meta}</span>}
            </span>
            {hasDropdown && (
              <Icon icon={ArrowDown01Icon} size={14} className="shrink-0 text-ink-3" aria-hidden />
            )}
          </>
        )}
      </button>
    )

    return collapsed ? (
      <Tooltip content={name} side="right">
        {button}
      </Tooltip>
    ) : (
      button
    )
  }
)
DocSidebarBrand.displayName = "DocSidebarBrand"

export interface DocSidebarSearchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string
  /** Keycap label, e.g. "⌘K". Hidden when collapsed. */
  shortcut?: React.ReactNode
}

export const DocSidebarSearch = React.forwardRef<HTMLButtonElement, DocSidebarSearchProps>(
  ({ className, placeholder = "Search", shortcut = "⌘K", ...rest }, ref) => {
    const { collapsed } = useDocShell()

    const button = (
      <button
        ref={ref}
        type="button"
        className={cn(
          // Polaris-style chrome — same gradient + insets as <Button variant="secondary">.
          "ds-sb-search flex cursor-pointer items-center gap-2 rounded-sm border text-[13px] text-ink-3",
          "transition-[background,border-color,color] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
          collapsed
            ? "mx-auto my-1.5 h-8 w-8 justify-center"
            : "mx-3 my-1.5 h-8 px-2.5",
          className
        )}
        {...rest}
      >
        <Icon icon={Search01Icon} size={14} className="shrink-0" aria-hidden />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{placeholder}</span>
            {shortcut && (
              <KbdShortcut size="sm" className="shrink-0">{shortcut}</KbdShortcut>
            )}
          </>
        )}
      </button>
    )

    return collapsed ? (
      <Tooltip
        content={
          <span className="inline-flex items-center gap-2">
            {placeholder}
            {shortcut && <span className="text-[10px] opacity-80">{shortcut}</span>}
          </span>
        }
        side="right"
      >
        {button}
      </Tooltip>
    ) : (
      button
    )
  }
)
DocSidebarSearch.displayName = "DocSidebarSearch"

/**
 * <DocSidebarNav> — scrollable region between Search and Footer.
 * Hosts <SidebarNav> + <SidebarNavSection> + <SidebarNavItem> + <SidebarNavParent>.
 * Provides the SidebarCollapseContext so children of <DocSidebar> auto-collapse
 * along with the shell.
 */
export const DocSidebarNav = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => {
    const { collapsed } = useDocShell()
    const overlay = useScrollOverlay<HTMLDivElement>()
    // Combine the forwarded ref with the overlay ref.
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        overlay.ref.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [overlay.ref, ref]
    )
    return (
      <div
        ref={setRefs}
        className={cn(
          "ds-scroll-overlay min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1.5 pb-3 pt-1",
          collapsed && "px-0",
          className
        )}
        // When collapsed, reserved scrollbar gutter (~10 px on the right
        // edge) shifts the centered icon stack left of true center. The
        // bar still paints on hover/scroll without the gutter; we just
        // skip the reserve so 32 px buttons sit centered in the 56 px rail.
        data-no-scroll-gutter={collapsed || undefined}
        {...rest}
      >
        <SidebarCollapseProvider collapsed={collapsed}>{children}</SidebarCollapseProvider>
      </div>
    )
  }
)
DocSidebarNav.displayName = "DocSidebarNav"

/**
 * <DocSidebarFooter> — bottom row. Includes user button + bell + help slots.
 * Use <DocSidebarUser> + <DocSidebarFooterAction> to populate.
 */
export const DocSidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => {
    const { collapsed } = useDocShell()
    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center gap-0.5 border-t border-hairline px-2 py-1.5",
          collapsed && "flex-col gap-1 px-1 py-1.5",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    )
  }
)
DocSidebarFooter.displayName = "DocSidebarFooter"

export interface DocSidebarUserProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title" | "name"> {
  /** Avatar content (typically <Avatar>). */
  avatar: React.ReactNode
  /** User's display name. */
  name: React.ReactNode
  /** Role / email shown beneath the name. */
  meta?: React.ReactNode
}

export const DocSidebarUser = React.forwardRef<HTMLButtonElement, DocSidebarUserProps>(
  ({ className, avatar, name, meta, ...rest }, ref) => {
    const { collapsed } = useDocShell()

    const button = (
      <button
        ref={ref}
        type="button"
        aria-haspopup="menu"
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-sm",
          "transition-[background-color] duration-[var(--dur-fast)]",
          "hover:bg-surface-2",
          collapsed ? "h-8 w-8 justify-center p-0" : "min-w-0 flex-1 px-1.5 py-1 text-left",
          className
        )}
        {...rest}
      >
        <span className="shrink-0">{avatar}</span>
        {!collapsed && (
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="truncate text-[12px] font-medium text-ink">{name}</span>
            {meta && <span className="truncate text-[11px] text-ink-3">{meta}</span>}
          </span>
        )}
      </button>
    )

    return collapsed ? (
      <Tooltip content={name} side="right">
        {button}
      </Tooltip>
    ) : (
      button
    )
  }
)
DocSidebarUser.displayName = "DocSidebarUser"

/**
 * <DocSidebarFooterAction> — small icon button with optional notification dot.
 * Use for Notifications / Help / etc. in the footer cluster.
 */
export interface DocSidebarFooterActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  label: string
  /** Show a notification dot in the corner. */
  dot?: boolean
}

export const DocSidebarFooterAction = React.forwardRef<HTMLButtonElement, DocSidebarFooterActionProps>(
  ({ className, icon, label, dot, ...rest }, ref) => {
    const button = (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(
          "relative flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-ink-3",
          "transition-[background-color,color] duration-[var(--dur-fast)]",
          "hover:bg-surface-2 hover:text-ink",
          className
        )}
        {...rest}
      >
        {icon}
        {dot && (
          <span
            aria-hidden
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-pill bg-info ring-[1.5px] ring-surface"
          />
        )}
      </button>
    )

    return (
      <Tooltip content={label} side="top">
        {button}
      </Tooltip>
    )
  }
)
DocSidebarFooterAction.displayName = "DocSidebarFooterAction"

/* Convenience presets matching the HTML preview. */
export const DocSidebarBellAction = React.forwardRef<
  HTMLButtonElement,
  Omit<DocSidebarFooterActionProps, "icon" | "label">
>((props, ref) => (
  <DocSidebarFooterAction
    ref={ref}
    label="Notifications"
    icon={<Icon icon={Notification03Icon} size={16} />}
    {...props}
  />
))
DocSidebarBellAction.displayName = "DocSidebarBellAction"

export const DocSidebarHelpAction = React.forwardRef<
  HTMLButtonElement,
  Omit<DocSidebarFooterActionProps, "icon" | "label">
>((props, ref) => (
  <DocSidebarFooterAction
    ref={ref}
    label="Help & docs"
    icon={<Icon icon={HelpCircleIcon} size={16} />}
    {...props}
  />
))
DocSidebarHelpAction.displayName = "DocSidebarHelpAction"
