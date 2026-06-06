import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Motion primitives — small, token-driven transitions adapted from
 * transitions.dev. All collapse to an instant state under
 * `prefers-reduced-motion: reduce` via the global rule in globals.css (the
 * `.ds-*` classes here only ever drive CSS transitions/animations).
 */

/* ============================================================
 * <Swap> — #4 text-state swap / #8 icon swap
 * Cross-fades between two children (active ↔ inactive) with a blur. Stacks
 * both in a single grid cell and toggles `data-hidden`. Use `variant="icon"`
 * for the scale+rotate flavor, `variant="text"` for the vertical-shift flavor.
 * ============================================================ */
export interface SwapProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When true, show `children`; when false, show `alt`. */
  active: boolean
  /** The element shown when `active` is true. */
  children: React.ReactNode
  /** The element shown when `active` is false. */
  alt: React.ReactNode
  variant?: "text" | "icon"
}

export const Swap = React.forwardRef<HTMLSpanElement, SwapProps>(
  ({ className, active, children, alt, variant = "text", ...rest }, ref) => (
    <span ref={ref} className={cn("ds-swap", className)} data-variant={variant} {...rest}>
      <span data-hidden={!active}>{children}</span>
      <span data-hidden={active} aria-hidden={!active ? undefined : true}>
        {alt}
      </span>
    </span>
  ),
)
Swap.displayName = "Swap"

/* ============================================================
 * <Collapsible> — #7 panel reveal
 * Animates open/close via CSS grid-template-rows 0fr↔1fr (height-auto-safe).
 * Content fades + rises on reveal. Reduced motion → instant via global rule.
 * ============================================================ */
export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, open, children, ...rest }, ref) => (
    <div
      ref={ref}
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid transition-[grid-template-rows] duration-[var(--dur-slide)] ease-[var(--ease-emphasis)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className,
      )}
      {...rest}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  ),
)
Collapsible.displayName = "Collapsible"

/* ============================================================
 * <ShimmerText> — #16 masked gradient sweep
 * For ephemeral "thinking / processing" labels. Loops, so it MUST be guarded;
 * the global reduced-motion rule hard-stops the sweep and falls back to a
 * flat ink-3 color. Keep usage to transient states, not persistent labels.
 * ============================================================ */
export interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export const ShimmerText = React.forwardRef<HTMLSpanElement, ShimmerTextProps>(
  ({ className, children, ...rest }, ref) => (
    <span ref={ref} className={cn("ds-shimmer-text", className)} {...rest}>
      {children}
    </span>
  ),
)
ShimmerText.displayName = "ShimmerText"

/* ============================================================
 * <Reveal> — #13/#14 content reveal (rise + de-blur)
 * Wrap any content to have it rise into place on mount. For staggered text
 * lines, render multiple <Reveal> with increasing `delay`.
 * ============================================================ */
export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger delay in ms. */
  delay?: number
  /** Render as a different element (default div). */
  as?: "div" | "span" | "p" | "li"
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ className, delay = 0, as = "div", style, children, ...rest }, ref) => {
    const Tag = as as React.ElementType
    return (
      <Tag
        ref={ref}
        className={cn("ds-reveal", className)}
        style={{ animationDelay: delay ? `${delay}ms` : undefined, ...style }}
        {...rest}
      >
        {children}
      </Tag>
    )
  },
)
Reveal.displayName = "Reveal"
