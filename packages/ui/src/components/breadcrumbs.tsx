import * as React from "react"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <Breadcrumbs> — design.md §5.14
 * Chevron separators, ink-3 links, ink current page.
 */

export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
}

export interface BreadcrumbsProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[]
  /** Override the link renderer (e.g. for react-router's <NavLink>). */
  renderLink?: (item: BreadcrumbItem, child: React.ReactNode) => React.ReactNode
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, renderLink, ...rest }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("flex items-center text-[13px]", className)}
      {...rest}
    >
      <ol className="flex items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          const labelClass = cn(
            "transition-colors duration-[var(--dur-fast)]",
            isLast
              ? "font-medium text-ink"
              : "text-ink-3 hover:text-ink"
          )
          const inner = isLast ? (
            <span aria-current="page" className={labelClass}>
              {item.label}
            </span>
          ) : item.href ? (
            renderLink ? (
              renderLink(item, <span className={labelClass}>{item.label}</span>)
            ) : (
              <a href={item.href} className={labelClass}>
                {item.label}
              </a>
            )
          ) : (
            <span className={labelClass}>{item.label}</span>
          )
          return (
            <li key={i} className="flex items-center gap-1">
              {inner}
              {!isLast && (
                <Icon
                  icon={ArrowRight02Icon}
                  size="sm"
                  className="text-ink-4"
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
)
Breadcrumbs.displayName = "Breadcrumbs"
