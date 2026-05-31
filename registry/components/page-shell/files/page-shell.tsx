import * as React from "react"
import {
  SidebarLeft01Icon,
  SidebarRight01Icon,
  ArrowExpand01Icon,
  ArrowShrink02Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Tooltip } from "@/components/ui/tooltip"
import { useOptionalDocShell } from "@/components/ui/doc-shell"

/**
 * <PageShell> — design.md §4.4 (unified in v3.16)
 *
 * The single page-header component. Renders two sticky bars + a body:
 *
 *   ┌─ AppBar      [⇤ toggle] [breadcrumb]                  [width] [actions…]
 *   ├─ Banner      (optional, non-sticky)
 *   ├─ PageHeader  Title · Metadata · Subtitle      [secondary] [primary]
 *   ├─ Tabs        (optional, sticky)
 *   └─ Body        (slot — children)
 *
 * **Inside `<DocShell>`:** AppBar renders with built-in sidebar toggle, the
 * `breadcrumb` slot, the built-in width toggle, and consumer-supplied
 * `appBarActions`.
 *
 * **Outside `<DocShell>`:** AppBar is omitted; only the page header + tabs +
 * body render. Lets you reuse the same component in print pages, modals-as-
 * pages, or any non-app-shell layout.
 *
 * `<PageShell>` does NOT introduce its own scroll container — sticky bars
 * pin to the closest scrolling ancestor (`<DocContent>` provides one). This
 * keeps composition predictable.
 */

const APP_BAR_H = 44
const PAGE_HEADER_TOP_WITH_APPBAR = APP_BAR_H

export interface PageShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  // ---------- App-bar slot (rendered only inside <DocShell>) ----------
  /** Element rendered in the app bar after the sidebar toggle. Typically a
   *  `<Breadcrumbs>`. */
  breadcrumb?: React.ReactNode
  /** Right-side cluster of icon buttons / triggers. Compose with
   *  `<PageShellAction>`. */
  appBarActions?: React.ReactNode
  /** Override the leading slot in the app bar (defaults to a sidebar toggle).
   *  Pass `null` to hide the toggle entirely. */
  appBarLeading?: React.ReactNode
  /** Hide the built-in width toggle in the app bar. Default: false. */
  hideWidthToggle?: boolean

  // ---------- Page-header slot (rendered when title is set) -----
  /** Page title. Omit to render only the app bar (useful for layouts where
   *  the page body provides its own header). */
  title?: React.ReactNode
  subtitle?: React.ReactNode
  /** Inline status / metadata to the right of the title (auto-save, last
   *  edited, etc.). */
  metadata?: React.ReactNode
  /** Single primary action — far right of the title row. */
  primaryAction?: React.ReactNode
  /** Optional secondary actions, rendered to the left of the primary. */
  secondaryActions?: React.ReactNode
  /** Optional banner above the title block. Non-sticky — scrolls away. */
  banner?: React.ReactNode
  /** Tabs row — sticky, sits just below the page header. */
  tabs?: React.ReactNode
}

export const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  (
    {
      className,
      breadcrumb,
      appBarActions,
      appBarLeading,
      hideWidthToggle = false,
      title,
      subtitle,
      metadata,
      primaryAction,
      secondaryActions,
      banner,
      tabs,
      children,
      ...rest
    },
    ref
  ) => {
    const shell = useOptionalDocShell()
    const inDocShell = !!shell
    const rootRef = React.useRef<HTMLDivElement | null>(null)

    // Find the closest scrolling ancestor and observe its scrollTop so the
    // page header can fade its bottom hairline + soft shadow in.
    const [scrolled, setScrolled] = React.useState(false)
    React.useEffect(() => {
      const el = rootRef.current
      if (!el) return
      let parent: HTMLElement | null = el.parentElement
      while (parent) {
        const overflow = getComputedStyle(parent).overflowY
        if (overflow === "auto" || overflow === "scroll" || parent === document.body) break
        parent = parent.parentElement
      }
      const target: HTMLElement | (Window & typeof globalThis) = parent ?? window
      const handler = () => {
        const top =
          target === window
            ? window.scrollY
            : (target as HTMLElement).scrollTop
        setScrolled(top > 8)
      }
      handler()
      target.addEventListener("scroll", handler, { passive: true } as AddEventListenerOptions)
      return () =>
        target.removeEventListener(
          "scroll",
          handler as EventListener
        )
    }, [])

    // Combine the forwarded ref + the local ref.
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    return (
      <div
        ref={setRefs}
        className={cn("flex w-full flex-col", className)}
        {...rest}
      >
        {/* ---------- AppBar ---------- */}
        {inDocShell && (
          <header
            style={{ height: APP_BAR_H }}
            className={cn(
              "sticky top-0 z-30 flex shrink-0 items-center gap-2 px-4",
              "border-b border-hairline bg-canvas/85",
              "backdrop-blur-[3px] backdrop-saturate-150"
            )}
          >
            {appBarLeading !== null && (appBarLeading ?? <BuiltInSidebarToggle />)}
            {breadcrumb && <div className="min-w-0">{breadcrumb}</div>}
            <div className="flex-1" />
            <div className="flex shrink-0 items-center gap-0.5">
              {!hideWidthToggle && <BuiltInWidthToggle />}
              {appBarActions}
            </div>
          </header>
        )}

        {/* ---------- Banner (non-sticky) ---------- */}
        {banner && <div className="px-8 pt-5">{banner}</div>}

        {/* ---------- Page header ---------- */}
        {/* When tabs are provided, the tabs row becomes the sticky element
            (Notion pattern) and the page header scrolls away with the body.
            When no tabs, the page header is the sticky element. */}
        {title && (
          <PageHeaderInner
            title={title}
            subtitle={subtitle}
            metadata={metadata}
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
            sticky={!tabs}
            stickyTop={inDocShell ? PAGE_HEADER_TOP_WITH_APPBAR : 0}
            scrolled={scrolled}
          />
        )}
        {/* ---------- Tabs (sticky when present) ---------- */}
        {tabs && (
          <div
            data-scrolled={scrolled || undefined}
            style={{ top: inDocShell ? PAGE_HEADER_TOP_WITH_APPBAR : 0 }}
            className={cn(
              "sticky z-10 bg-canvas px-8",
              "border-b border-hairline",
              "transition-[box-shadow] duration-[var(--dur-base)]",
              "data-[scrolled]:[box-shadow:0_1px_0_0_rgba(0,0,0,0.02)]"
            )}
          >
            {tabs}
          </div>
        )}

        {/* ---------- Body ---------- */}
        {children && <div className="min-h-0">{children}</div>}
      </div>
    )
  }
)
PageShell.displayName = "PageShell"

/* ---------------- Internal: the page-header itself ---------------- */

function PageHeaderInner({
  title,
  subtitle,
  metadata,
  primaryAction,
  secondaryActions,
  sticky,
  stickyTop,
  scrolled,
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  metadata?: React.ReactNode
  primaryAction?: React.ReactNode
  secondaryActions?: React.ReactNode
  sticky: boolean
  stickyTop: number
  scrolled: boolean
}) {
  return (
    <header
      data-scrolled={scrolled || undefined}
      style={sticky ? { top: stickyTop } : undefined}
      className={cn(
        "z-20 bg-canvas px-8 pt-5 pb-4",
        sticky && "sticky border-b border-transparent",
        "transition-[border-color,box-shadow] duration-[var(--dur-base)]",
        sticky &&
          "data-[scrolled]:border-b-hairline data-[scrolled]:[box-shadow:0_1px_0_0_rgba(0,0,0,0.02)]"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="m-0 text-[22px] font-semibold leading-tight tracking-tight text-ink">
              {title}
            </h1>
            {metadata && (
              <div className="flex items-center gap-2 text-[12px] text-ink-3">
                {metadata}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 max-w-[640px] text-[13px] text-ink-3">{subtitle}</p>
          )}
        </div>
        {(secondaryActions || primaryAction) && (
          <div className="flex shrink-0 items-center gap-2">
            {secondaryActions}
            {primaryAction}
          </div>
        )}
      </div>
    </header>
  )
}

/* ---------------- Built-in app-bar controls ---------------- */

function BuiltInSidebarToggle() {
  const shell = useOptionalDocShell()
  if (!shell) return null
  const label = shell.collapsed ? "Expand sidebar (B)" : "Collapse sidebar (B)"
  return (
    <Tooltip content={label} side="bottom">
      <button
        type="button"
        onClick={shell.toggle}
        aria-label={shell.collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-ink-3",
          "transition-[background-color,color,transform] duration-[var(--dur-fast)]",
          "hover:bg-surface hover:text-ink active:scale-95"
        )}
      >
        <Icon
          icon={shell.collapsed ? SidebarRight01Icon : SidebarLeft01Icon}
          size={14}
        />
      </button>
    </Tooltip>
  )
}

function BuiltInWidthToggle() {
  const shell = useOptionalDocShell()
  if (!shell) return null
  const isCentered = shell.bodyWidth === "centered"
  const label = isCentered ? "Switch to full width (W)" : "Switch to centered (W)"
  return (
    <Tooltip content={label} side="bottom">
      <button
        type="button"
        onClick={() => shell.setBodyWidth(isCentered ? "full" : "centered")}
        aria-label="Toggle body width"
        className={cn(
          "flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-ink-3",
          "transition-[background-color,color,transform] duration-[var(--dur-fast)]",
          "hover:bg-surface hover:text-ink active:scale-95"
        )}
      >
        <Icon icon={isCentered ? ArrowExpand01Icon : ArrowShrink02Icon} size={14} />
      </button>
    </Tooltip>
  )
}

/* =================================================================
 * <PageShellAction> — generic icon-button used in the appBarActions slot.
 * Renders a button (or anchor) with built-in tooltip + aria-label, plus
 * an optional notification dot.
 * ================================================================= */

export interface PageShellActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  icon: React.ReactNode
  label: string
  /** Render as an `<a href>` instead of a button. */
  href?: string
  /** Show a small unread/new indicator in the corner. */
  dot?: boolean
}

const actionClasses = cn(
  "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-ink-3",
  "transition-[background-color,color,transform] duration-[var(--dur-fast)]",
  "hover:bg-surface hover:text-ink active:scale-95"
)

export const PageShellAction = React.forwardRef<HTMLButtonElement, PageShellActionProps>(
  ({ icon, label, href, dot, className, ...rest }, ref) => {
    const dotEl = dot ? (
      <span
        aria-hidden
        className="absolute right-1 top-1 h-1.5 w-1.5 rounded-pill bg-info ring-[1.5px] ring-canvas"
      />
    ) : null

    if (href) {
      return (
        <Tooltip content={label} side="bottom">
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            className={cn(actionClasses, className)}
          >
            {icon}
            {dotEl}
          </a>
        </Tooltip>
      )
    }

    return (
      <Tooltip content={label} side="bottom">
        <button
          ref={ref}
          type="button"
          aria-label={label}
          className={cn(actionClasses, className)}
          {...rest}
        >
          {icon}
          {dotEl}
        </button>
      </Tooltip>
    )
  }
)
PageShellAction.displayName = "PageShellAction"

/** Vertical divider for separating clusters in the appBarActions slot. */
export function PageShellDivider() {
  return <span className="mx-1 h-4 w-px bg-hairline" aria-hidden />
}
