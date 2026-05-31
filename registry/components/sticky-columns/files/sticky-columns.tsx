import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Sticky-column helpers — design.md §5.3
 *
 * Why this is harder than it looks:
 *   - <table> defaults to `border-collapse: collapse`, which DROPS sticky on
 *     <th>/<td>. We must use `border-collapse: separate` and re-create the
 *     row dividers via `border-bottom` on cells.
 *   - The scroll container needs `overflow-x: auto` AND must NOT be the same
 *     as the table itself.
 *   - Each frozen column needs an explicit `left` (or `right`) offset matching
 *     the cumulative width of frozen cells before it. We compute that
 *     automatically by walking each row at mount + on resize.
 *   - Edge shadows MUST anchor to the inner edge of the frozen group, not to
 *     the scroll container's edge — otherwise they paint on top of the frozen
 *     columns themselves and clip cell content during scroll.
 *
 * Usage:
 *   <StickyTable>
 *     <table>
 *       <thead><tr>
 *         <StickyColumn as="th" side="left" width={44}><Checkbox /></StickyColumn>
 *         <StickyColumn as="th" side="left" width={200}>Product</StickyColumn>
 *         <th>Category</th> ... <th>Stock</th>
 *         <StickyColumn as="th" side="right" width={56}>Actions</StickyColumn>
 *       </tr></thead>
 *       <tbody>
 *         <tr>
 *           <StickyColumn side="left" width={44}><Checkbox /></StickyColumn>
 *           <StickyColumn side="left" width={200}>Wireless Mouse</StickyColumn>
 *           ...
 *         </tr>
 *       </tbody>
 *     </table>
 *   </StickyTable>
 */

function computeStickyOffsets(scroller: HTMLElement) {
  const rows = scroller.querySelectorAll<HTMLTableRowElement>("tr")
  rows.forEach((row) => {
    const leftCells = Array.from(
      row.querySelectorAll<HTMLElement>('[data-sticky-side="left"]')
    )
    const rightCellsRaw = Array.from(
      row.querySelectorAll<HTMLElement>('[data-sticky-side="right"]')
    )
    const rightCells = rightCellsRaw.slice().reverse()

    // Left side: walk in DOM order, accumulate widths.
    let leftOffset = 0
    leftCells.forEach((cell, i) => {
      cell.style.left = `${leftOffset}px`
      leftOffset += cell.getBoundingClientRect().width
      // Mark only the LAST left-frozen cell so the edge shadow attaches to it.
      cell.toggleAttribute("data-sticky-edge-left", i === leftCells.length - 1)
    })

    // Right side: walk in REVERSE DOM order.
    let rightOffset = 0
    rightCells.forEach((cell, i) => {
      cell.style.right = `${rightOffset}px`
      rightOffset += cell.getBoundingClientRect().width
      // Mark only the FIRST right-frozen cell (i.e. the leftmost of the
      // right-frozen group) so the edge shadow attaches to it.
      cell.toggleAttribute("data-sticky-edge-right", i === rightCells.length - 1)
    })
  })
}

export const StickyTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, onScroll, ...rest }, ref) => {
  const innerRef = React.useRef<HTMLDivElement | null>(null)
  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

  React.useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const recalc = () => computeStickyOffsets(el)
    recalc()
    const obs = new ResizeObserver(recalc)
    obs.observe(el)
    el.querySelectorAll<HTMLElement>("[data-sticky-side]").forEach((c) =>
      obs.observe(c)
    )
    window.addEventListener("resize", recalc)
    return () => {
      obs.disconnect()
      window.removeEventListener("resize", recalc)
    }
  })

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget
    // Show the left-edge shadow once we've scrolled past the left-frozen group.
    const left = Math.min(el.scrollLeft / 16, 1)
    // Show the right-edge shadow while there's still hidden content on the right.
    const right = Math.min(
      Math.max(el.scrollWidth - el.clientWidth - el.scrollLeft, 0) / 16,
      1
    )
    el.style.setProperty("--sticky-shadow-l", String(left))
    el.style.setProperty("--sticky-shadow-r", String(right))
    onScroll?.(e)
  }

  return (
    <div
      ref={innerRef}
      onScroll={handleScroll}
      className={cn(
        "relative w-full overflow-x-auto rounded-md border border-hairline bg-canvas",
        // Required for sticky on <td>/<th> to work.
        "[&_table]:border-separate [&_table]:border-spacing-0",
        // Re-create row dividers since border-collapse:collapse is gone.
        "[&_tbody_td]:border-b [&_tbody_td]:border-hairline",
        "[&_thead_th]:border-b [&_thead_th]:border-hairline",
        // CSS vars driven by JS in handleScroll.
        "[--sticky-shadow-l:0]",
        "[--sticky-shadow-r:0]",
        // Edge shadows attach to the LAST left-frozen / FIRST right-frozen
        // cells via ::after / ::before. They live INSIDE the cell so they
        // travel with it on horizontal scroll and never paint on top of the
        // frozen group itself.
        "[&_[data-sticky-edge-left]]:after:pointer-events-none",
        "[&_[data-sticky-edge-left]]:after:content-['']",
        "[&_[data-sticky-edge-left]]:after:absolute",
        "[&_[data-sticky-edge-left]]:after:top-0",
        "[&_[data-sticky-edge-left]]:after:bottom-0",
        "[&_[data-sticky-edge-left]]:after:right-[-12px]",
        "[&_[data-sticky-edge-left]]:after:w-3",
        "[&_[data-sticky-edge-left]]:after:bg-gradient-to-r",
        "[&_[data-sticky-edge-left]]:after:from-black/[0.06]",
        "[&_[data-sticky-edge-left]]:after:to-transparent",
        "[&_[data-sticky-edge-left]]:after:opacity-[var(--sticky-shadow-l)]",
        "[&_[data-sticky-edge-left]]:after:transition-opacity",

        "[&_[data-sticky-edge-right]]:before:pointer-events-none",
        "[&_[data-sticky-edge-right]]:before:content-['']",
        "[&_[data-sticky-edge-right]]:before:absolute",
        "[&_[data-sticky-edge-right]]:before:top-0",
        "[&_[data-sticky-edge-right]]:before:bottom-0",
        "[&_[data-sticky-edge-right]]:before:left-[-12px]",
        "[&_[data-sticky-edge-right]]:before:w-3",
        "[&_[data-sticky-edge-right]]:before:bg-gradient-to-l",
        "[&_[data-sticky-edge-right]]:before:from-black/[0.06]",
        "[&_[data-sticky-edge-right]]:before:to-transparent",
        "[&_[data-sticky-edge-right]]:before:opacity-[var(--sticky-shadow-r)]",
        "[&_[data-sticky-edge-right]]:before:transition-opacity",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
StickyTable.displayName = "StickyTable"

export interface StickyColumnProps extends React.HTMLAttributes<HTMLElement> {
  side: "left" | "right"
  /** Render as `th` for headers, `td` for cells. */
  as?: "th" | "td"
  /** Width to apply (px). Required for layout stability. */
  width?: number
}

export const StickyColumn = React.forwardRef<HTMLElement, StickyColumnProps>(
  ({ className, side, as = "td", width, style, children, ...rest }, ref) => {
    const Tag = as as React.ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          // `position: sticky` already creates its own containing block, so
          // the edge-shadow pseudos pin to the cell. Don't add `relative`
          // alongside — it overrides `sticky` and breaks the pin entirely.
          "sticky z-[5]",
          // Header inherits the surface bg from <thead>; we re-apply it here
          // since border-separate breaks bg inheritance from <tr>.
          as === "th" ? "bg-surface" : "bg-canvas",
          // Match the cell metrics from our base <Table>: 11/13px text, padding.
          as === "th"
            ? "px-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-ink-3"
            : "px-4 align-middle text-ink-2",
          className
        )}
        data-sticky-side={side}
        style={{
          height: as === "th" ? "var(--density-head-h)" : "var(--density-row-h)",
          ...(width && { width, minWidth: width, maxWidth: width }),
          ...style,
        }}
        {...rest}
      >
        {children}
      </Tag>
    )
  }
)
StickyColumn.displayName = "StickyColumn"
