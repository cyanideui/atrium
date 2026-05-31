import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Composable <Table> primitives — design.md §5.3
 * Compact density. No vertical borders. Row separation via 1px hairline.
 */

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    /**
     * Use `table-layout: fixed` — column widths come from the header / explicit
     * `<col>`/`width` and never recompute from body content. Essential for
     * inline-edit grids: without it, swapping a cell's text for an input
     * re-measures the column and the table visibly shifts. Pair with widths on
     * your `<TableHead>`s.
     */
    fixed?: boolean
  }
>(({ className, fixed, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom border-collapse text-[13px] tabular-nums text-ink",
        fixed && "table-fixed",
        // Round the first/last cells of the first row so a `bg-surface` header
        // doesn't paint past a rounded parent. Pure CSS, no JS needed.
        "[&_thead_tr:first-child_th:first-child]:rounded-tl-md",
        "[&_thead_tr:first-child_th:last-child]:rounded-tr-md",
        "[&_tbody_tr:last-child_td:first-child]:rounded-bl-md",
        "[&_tbody_tr:last-child_td:last-child]:rounded-br-md",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("sticky top-0 z-10 bg-surface", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
))
TableBody.displayName = "TableBody"

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t border-hairline bg-surface font-medium", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <tr
    ref={ref}
    data-selected={selected || undefined}
    className={cn(
      "border-b border-hairline transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
      "hover:bg-surface/60",
      "data-[selected=true]:bg-info-tint data-[selected=true]:hover:bg-info-tint",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    style={{ height: "var(--density-head-h)" }}
    className={cn(
      "px-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-ink-3",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    style={{ height: "var(--density-row-h)" }}
    className={cn("px-4 align-middle text-ink-2", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-xs text-ink-3", className)} {...props} />
))
TableCaption.displayName = "TableCaption"

/**
 * <TableEmpty> — design.md §5.3
 *
 * Renders a centered placeholder spanning all columns when a table has no
 * rows. Drop-in replacement for the bare `<TableBody>` body content. Pair
 * with an action slot (e.g. "Add your first record") and an icon.
 *
 *   <Table>
 *     <TableHeader>…</TableHeader>
 *     <TableBody>
 *       {rows.length > 0 ? (
 *         rows.map(r => <TableRow key={r.id}>…</TableRow>)
 *       ) : (
 *         <TableEmpty colSpan={5} title="No orders yet" description="…">
 *           <Button>+ New order</Button>
 *         </TableEmpty>
 *       )}
 *     </TableBody>
 *   </Table>
 */
export interface TableEmptyProps
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "title"> {
  colSpan: number
  /** Optional leading icon (typically an Icon at size 24-32). */
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  /** Action(s) — usually a primary button. */
  children?: React.ReactNode
}

export const TableEmpty = React.forwardRef<HTMLTableRowElement, TableEmptyProps>(
  ({ className, colSpan, icon, title, description, children, ...rest }, ref) => (
    <tr
      ref={ref}
      className={cn("hover:bg-transparent", className)}
      {...rest}
    >
      <td colSpan={colSpan} className="px-6 py-16 text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-2.5">
          {icon && (
            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-md bg-surface text-ink-3">
              {icon}
            </div>
          )}
          {title && (
            <div className="text-[14px] font-semibold text-ink">{title}</div>
          )}
          {description && (
            <p className="m-0 text-[12.5px] leading-relaxed text-ink-3">
              {description}
            </p>
          )}
          {children && <div className="mt-2 flex items-center gap-2">{children}</div>}
        </div>
      </td>
    </tr>
  )
)
TableEmpty.displayName = "TableEmpty"
