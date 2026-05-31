import * as React from "react"
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

/**
 * <Pagination> — design.md §5.13
 * Ghost buttons, tinted active page, ellipsis for skipped ranges.
 */

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  page: number
  total: number
  /** Number of sibling pages to show on each side of the current page. */
  siblings?: number
  onChange?: (page: number) => void
}

function buildPages(page: number, total: number, siblings = 1): (number | "…")[] {
  const window = siblings * 2 + 5 // first + last + current + siblings + 2 ellipses
  if (total <= window) return Array.from({ length: total }, (_, i) => i + 1)

  const left = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)
  const showLeftEllipsis = left > 2
  const showRightEllipsis = right < total - 1

  const out: (number | "…")[] = [1]
  if (showLeftEllipsis) out.push("…")
  for (let i = left; i <= right; i++) out.push(i)
  if (showRightEllipsis) out.push("…")
  out.push(total)
  return out
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, total, siblings = 1, onChange, ...rest }, ref) => {
    const pages = buildPages(page, total, siblings)
    const go = (p: number) => {
      if (p < 1 || p > total || p === page) return
      onChange?.(p)
    }
    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("flex items-center gap-1", className)}
        {...rest}
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-sm text-ink-2",
            "transition-colors duration-[var(--dur-fast)]",
            "hover:bg-surface hover:text-ink disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          <Icon icon={ArrowLeft02Icon} size="sm" />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e-${i}`} className="px-1 text-[13px] text-ink-3" aria-hidden>…</span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === page ? "page" : undefined}
              onClick={() => go(p)}
              className={cn(
                "inline-flex h-8 min-w-8 items-center justify-center rounded-sm px-2 text-[13px] tabular-nums",
                "transition-colors duration-[var(--dur-fast)]",
                p === page
                  ? "bg-ink/10 font-semibold text-ink"
                  : "text-ink-2 hover:bg-surface hover:text-ink"
              )}
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= total}
          onClick={() => go(page + 1)}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-sm text-ink-2",
            "transition-colors duration-[var(--dur-fast)]",
            "hover:bg-surface hover:text-ink disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          <Icon icon={ArrowRight02Icon} size="sm" />
        </button>
      </nav>
    )
  }
)
Pagination.displayName = "Pagination"
