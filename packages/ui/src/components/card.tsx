import * as React from "react"
import { cn } from "../lib/cn"

/**
 * <Card> — design.md §5.34
 *
 * The system's surface primitive. Every panel, summary card, and detail
 * section is a Card. Replaces the hand-rolled
 * `<section className="rounded-md border border-hairline bg-canvas">` +
 * `<header className="border-b …">` + `<div className="p-4">` pattern that had
 * drifted across templates and blocks.
 *
 * Anatomy:
 *   <Card>
 *     <CardHeader>
 *       <CardTitle>Customer</CardTitle>
 *       <CardAction><Button …/></CardAction>   // right-aligned
 *     </CardHeader>
 *     <CardBody>…</CardBody>
 *     <CardFooter>…</CardFooter>
 *   </Card>
 *
 * Header + footer carry hairline dividers; body owns the padding. Use
 * `<Card padded={false}>` semantics by simply omitting <CardBody> and placing
 * a flush element (e.g. a <Table>) directly.
 */

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-md border border-hairline bg-canvas", className)}
      {...props}
    />
  ),
)
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5",
        className,
      )}
      {...props}
    />
  ),
)
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("m-0 text-[13px] font-semibold text-ink", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("m-0 text-[12.5px] text-ink-3", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

/** Right-aligned slot in a CardHeader (buttons, menus, badges). */
export const CardAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex shrink-0 items-center gap-1.5", className)} {...props} />
  ),
)
CardAction.displayName = "CardAction"

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
  ),
)
CardBody.displayName = "CardBody"

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-2 border-t border-hairline px-4 py-3",
        className,
      )}
      {...props}
    />
  ),
)
CardFooter.displayName = "CardFooter"
