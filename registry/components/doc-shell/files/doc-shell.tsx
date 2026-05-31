import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * <DocShell> — Notion-style app shell. design.md §4.5 (new in v3.14).
 *
 * Outer flex grid that holds the sidebar (merged with the page bg) and a
 * content card (rounded canvas) on the right. Provides collapse state to
 * its descendants so toggle controls anywhere in the tree work.
 */

interface DocShellContextValue {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  toggle: () => void
  /** Body width — centered (720px) or full. Lifted here so DocPageHeader's
   *  width-toggle and DocBody's max-width stay in sync. */
  bodyWidth: "centered" | "full"
  setBodyWidth: (w: "centered" | "full") => void
}

const DocShellContext = React.createContext<DocShellContextValue | null>(null)

export function useDocShell() {
  const ctx = React.useContext(DocShellContext)
  if (!ctx) {
    throw new Error("useDocShell must be used within <DocShell>")
  }
  return ctx
}

/**
 * Same as `useDocShell` but returns `null` when called outside `<DocShell>`.
 * Use in components (e.g. `<PageShell>`) that should work both inside and
 * outside the app-shell layout.
 */
export function useOptionalDocShell() {
  return React.useContext(DocShellContext)
}

export interface DocShellProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (v: boolean) => void
  defaultBodyWidth?: "centered" | "full"
  bodyWidth?: "centered" | "full"
  onBodyWidthChange?: (w: "centered" | "full") => void
}

export const DocShell = React.forwardRef<HTMLDivElement, DocShellProps>(
  (
    {
      className,
      children,
      defaultCollapsed = false,
      collapsed: cCollapsed,
      onCollapsedChange,
      defaultBodyWidth = "full",
      bodyWidth: cBody,
      onBodyWidthChange,
      ...rest
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed)
    const [internalBody, setInternalBody] = React.useState<"centered" | "full">(defaultBodyWidth)
    const collapsed = cCollapsed ?? internalCollapsed
    const bodyWidth = cBody ?? internalBody
    const setCollapsed = (v: boolean) => {
      if (cCollapsed === undefined) setInternalCollapsed(v)
      onCollapsedChange?.(v)
    }
    const setBodyWidth = (w: "centered" | "full") => {
      if (cBody === undefined) setInternalBody(w)
      onBodyWidthChange?.(w)
    }

    const value = React.useMemo<DocShellContextValue>(
      () => ({ collapsed, setCollapsed, toggle: () => setCollapsed(!collapsed), bodyWidth, setBodyWidth }),
      [collapsed, bodyWidth] // eslint-disable-line react-hooks/exhaustive-deps
    )

    // Keyboard: B toggles sidebar, W toggles width — but skip while typing.
    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        const t = e.target as HTMLElement | null
        if (
          t &&
          (t.tagName === "INPUT" ||
            t.tagName === "TEXTAREA" ||
            t.isContentEditable)
        )
          return
        if (e.key === "b" || e.key === "B") {
          e.preventDefault()
          setCollapsed(!collapsed)
        } else if (e.key === "w" || e.key === "W") {
          e.preventDefault()
          setBodyWidth(bodyWidth === "centered" ? "full" : "centered")
        }
      }
      window.addEventListener("keydown", handler)
      return () => window.removeEventListener("keydown", handler)
    }, [collapsed, bodyWidth]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <DocShellContext.Provider value={value}>
        <div
          ref={ref}
          data-collapsed={collapsed || undefined}
          className={cn(
            "group/shell grid h-screen overflow-hidden bg-surface text-ink",
            // Grid-template-columns animated via CSS variable so children don't reflow abruptly.
            "[grid-template-columns:var(--ds-sidebar-w,260px)_1fr]",
            "[transition:grid-template-columns_var(--dur-slide)_var(--ease-standard)]",
            "data-[collapsed]:[--ds-sidebar-w:56px]",
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </DocShellContext.Provider>
    )
  }
)
DocShell.displayName = "DocShell"
