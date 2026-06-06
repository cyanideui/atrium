import * as React from "react"
import { cn } from "@/lib/utils"
import { useDocShell } from "@/components/ui/doc-shell"
import { useScrollOverlay } from "@/lib/use-scroll-overlay"

/**
 * <DocContent> — wraps the right-hand content card. Listens to scroll inside
 * the card so <DocPageHeader> can pick up a `data-scrolled` attribute and
 * fade in its bottom hairline.
 *
 * Visual tokens:
 *   - 8px gap between sidebar and card (--shell-gap)
 *   - 5px corner radius on the card (matches new sidebar items)
 *   - elev-1 shadow + 1px hairline border
 */

const ScrolledContext = React.createContext(false)

export interface DocContentProps extends React.HTMLAttributes<HTMLElement> {
  /** When this value changes, pulse the scrollbar thumb once (Bonus 2 —
   *  good for telegraphing route changes / new content loads). */
  pulseKey?: string | number
}

export const DocContent = React.forwardRef<HTMLElement, DocContentProps>(
  ({ className, children, pulseKey, ...rest }, ref) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null)
    const overlay = useScrollOverlay<HTMLDivElement>()
    const [scrolled, setScrolled] = React.useState(false)

    // Combine the local cardRef and the overlay ref so both see the same node.
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        cardRef.current = node
        overlay.ref.current = node
      },
      [overlay.ref]
    )

    React.useEffect(() => {
      const el = cardRef.current
      if (!el) return
      const handler = () => setScrolled(el.scrollTop > 8)
      el.addEventListener("scroll", handler, { passive: true })
      return () => el.removeEventListener("scroll", handler)
    }, [])

    // Bonus 2 — pulse on key change.
    React.useEffect(() => {
      if (pulseKey === undefined) return
      overlay.pulse()
    }, [pulseKey]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <main ref={ref} className={cn("min-w-0 overflow-hidden p-2", className)} {...rest}>
        <div
          ref={setRefs}
          data-scrolled={scrolled || undefined}
          className={cn(
            "ds-scroll-overlay relative h-full overflow-x-hidden overflow-y-auto rounded-md border border-hairline bg-canvas shadow-elev-1",
            "[border-radius:5px]",
            "[scroll-behavior:smooth]"
          )}
        >
          <ScrolledContext.Provider value={scrolled}>{children}</ScrolledContext.Provider>
        </div>
      </main>
    )
  }
)
DocContent.displayName = "DocContent"

function useScrolled() {
  return React.useContext(ScrolledContext)
}

export interface DocPageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode
  subtitle?: React.ReactNode
  /** Breadcrumb element rendered to the right of the sidebar-toggle. */
  breadcrumb?: React.ReactNode
  /** Inline status (auto-save, last-edited) rendered next to the title. */
  metadata?: React.ReactNode
  /** Right-aligned actions cluster. */
  actions?: React.ReactNode
  /** Whether to render the centered/full width toggle next to actions. */
  showWidthToggle?: boolean
}

/**
 * @deprecated Use `<PageShell>` instead. `<DocPageHeader>` will be removed in
 * v3.17. The unified `<PageShell>` covers everything this did plus a sticky
 * shell-level app bar, banners, and tabs.
 */
export const DocPageHeader = React.forwardRef<HTMLElement, DocPageHeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      breadcrumb,
      metadata,
      actions,
      showWidthToggle = true,
      ...rest
    },
    ref
  ) => {
    const scrolled = useScrolled()
    const { bodyWidth, setBodyWidth } = useDocShell()

    return (
      <header
        ref={ref}
        data-scrolled={scrolled || undefined}
        className={cn(
          "sticky top-0 z-20 bg-canvas px-8 pb-3.5 pt-4",
          "border-b border-transparent transition-[border-color,box-shadow] duration-[var(--dur-base)]",
          "data-[scrolled]:border-b-hairline data-[scrolled]:[box-shadow:0_1px_0_0_rgba(0,0,0,0.02)]",
          className
        )}
        {...rest}
      >
        {breadcrumb && (
          <div className="mb-1 text-[12px] text-ink-3">{breadcrumb}</div>
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="m-0 text-[22px] font-semibold leading-tight tracking-tight text-ink">
                {title}
              </h1>
              {metadata && <div className="flex items-center gap-2 text-[12px] text-ink-3">{metadata}</div>}
            </div>
            {subtitle && <p className="mt-1 max-w-2xl text-[13px] text-ink-3">{subtitle}</p>}
          </div>
          {(actions || showWidthToggle) && (
            <div className="flex shrink-0 items-center gap-2">
              {showWidthToggle && (
                <div className="inline-flex h-7 items-center gap-0.5 rounded-sm bg-surface p-0.5">
                  <button
                    type="button"
                    onClick={() => setBodyWidth("centered")}
                    aria-pressed={bodyWidth === "centered"}
                    className={cn(
                      "h-6 cursor-pointer rounded-xs px-2 text-[12px]",
                      "transition-[background-color,color] duration-[var(--dur-fast)]",
                      bodyWidth === "centered"
                        ? "bg-canvas text-ink shadow-elev-1"
                        : "text-ink-3 hover:text-ink-2"
                    )}
                  >
                    Centered
                  </button>
                  <button
                    type="button"
                    onClick={() => setBodyWidth("full")}
                    aria-pressed={bodyWidth === "full"}
                    className={cn(
                      "h-6 cursor-pointer rounded-xs px-2 text-[12px]",
                      "transition-[background-color,color] duration-[var(--dur-fast)]",
                      bodyWidth === "full"
                        ? "bg-canvas text-ink shadow-elev-1"
                        : "text-ink-3 hover:text-ink-2"
                    )}
                  >
                    Full width
                  </button>
                </div>
              )}
              {actions}
            </div>
          )}
        </div>
      </header>
    )
  }
)
DocPageHeader.displayName = "DocPageHeader"

export interface DocBodyProps extends React.HTMLAttributes<HTMLElement> {
  /** Override the shell's bodyWidth for this page (uncontrolled). */
  width?: "centered" | "full"
  /** Max-width applied when in centered mode. Default `720px` (Notion's). */
  centeredMaxWidth?: string | number
}

export const DocBody = React.forwardRef<HTMLElement, DocBodyProps>(
  ({ className, width: override, centeredMaxWidth = 720, children, style, ...rest }, ref) => {
    const { bodyWidth } = useDocShell()
    const w = override ?? bodyWidth
    const centeredW =
      typeof centeredMaxWidth === "number" ? `${centeredMaxWidth}px` : centeredMaxWidth
    // CSS can't transition max-width to/from `none`, so "full" animates to a
    // large viewport-relative value the container caps — the content grows
    // smoothly to fill (transitions.dev "card resize" feel) and stops at the
    // real width. 100vw always covers the content column on any display while
    // staying an animatable length. Keep mx-auto in both modes so it expands
    // symmetrically from center. Reduced motion → transition collapses to 0ms.
    const mergedStyle: React.CSSProperties = {
      maxWidth: w === "centered" ? centeredW : "100vw",
      ...style,
    }
    return (
      <section
        ref={ref}
        data-width={w}
        style={mergedStyle}
        className={cn(
          "mx-auto px-8 pb-24",
          "transition-[max-width,padding-top] duration-[var(--dur-slide)] ease-[var(--ease-emphasis)]",
          w === "centered" ? "pt-12" : "pt-8",
          className
        )}
        {...rest}
      >
        {children}
      </section>
    )
  }
)
DocBody.displayName = "DocBody"
