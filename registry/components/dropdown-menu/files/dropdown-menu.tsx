import * as React from "react"
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"

/**
 * <DropdownMenu> — design.md §5.15
 * shadcn/Radix style with grouped items, dividers, danger zone, keyboard shortcuts.
 *
 * Layout: each item is a 3-cell flex row → [icon (16)] [label (1fr)] [shortcut (auto, right-aligned)].
 * Animation: scoped to opacity + transform-origin (no slide) to avoid flicker on open.
 */

export const DropdownMenu = DropdownPrimitive.Root
export const DropdownMenuTrigger = DropdownPrimitive.Trigger
export const DropdownMenuPortal = DropdownPrimitive.Portal

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownPrimitive.Portal>
    <DropdownPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={8}
      className={cn(
        "z-50 min-w-[200px] overflow-hidden rounded-md border border-hairline bg-canvas p-1 shadow-elev-3",
        // Origin per side keeps the scale-in pivot near the trigger.
        "data-[side=top]:origin-bottom data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left",
        // Animate from the trigger's edge — fade + slide in the direction the
        // menu is opening. side=bottom (most common) slides DOWN from the trigger.
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[side=top]:data-[state=open]:slide-in-from-bottom-2",
        "data-[side=bottom]:data-[state=open]:slide-in-from-top-2",
        "data-[side=left]:data-[state=open]:slide-in-from-right-2",
        "data-[side=right]:data-[state=open]:slide-in-from-left-2",
        "data-[side=top]:data-[state=closed]:slide-out-to-bottom-2",
        "data-[side=bottom]:data-[state=closed]:slide-out-to-top-2",
        "data-[side=left]:data-[state=closed]:slide-out-to-right-2",
        "data-[side=right]:data-[state=closed]:slide-out-to-left-2",
        "duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        className
      )}
      {...props}
    />
  </DropdownPrimitive.Portal>
))
DropdownMenuContent.displayName = "DropdownMenuContent"

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Item> {
  tone?: "default" | "critical"
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, tone = "default", leading, trailing, children, ...props }, ref) => (
  <DropdownPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex h-8 cursor-pointer select-none items-center gap-2 rounded-sm pl-2 pr-2 text-[13px] outline-none",
      "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
      "focus:bg-surface data-[highlighted]:bg-surface",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      tone === "default"
        ? "text-ink-2 focus:text-ink data-[highlighted]:text-ink"
        : "text-error focus:bg-error-tint data-[highlighted]:bg-error-tint",
      className
    )}
    {...props}
  >
    {leading && (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center">
        {leading}
      </span>
    )}
    {children}
    {trailing && <span className="ml-auto shrink-0 pl-2">{trailing}</span>}
  </DropdownPrimitive.Item>
))
DropdownMenuItem.displayName = "DropdownMenuItem"

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-hairline", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export const DropdownMenuGroup = DropdownPrimitive.Group

/**
 * <DropdownMenuShortcut> — kbd-style label rendered on the **right edge** of
 * an item. Use as a sibling of the item's label text:
 *
 *   <DropdownMenuItem leading={<Icon icon={Edit02Icon} />}>
 *     Edit
 *     <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
 *   </DropdownMenuItem>
 *
 * Implementation note: this element pulls itself out of the label flow by
 * absolute-positioning to the row's right edge. Putting it inside the label
 * span (the previous behavior) made `ml-auto` push only against the span,
 * not the row — which is why the shortcut hugged the label.
 */
export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto pl-4 font-mono text-[11px] tracking-wider text-ink-3",
      className
    )}
    {...props}
  />
)
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"
