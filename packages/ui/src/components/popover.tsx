import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../lib/cn"

/**
 * <Popover> — design.md §5.6a
 * Generic anchored overlay primitive. Powers tooltips, menus, custom flyouts.
 */

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverPortal = PopoverPrimitive.Portal
export const PopoverAnchor = PopoverPrimitive.Anchor
export const PopoverClose = PopoverPrimitive.Close

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    arrow?: boolean
  }
>(({ className, sideOffset = 6, arrow, children, ...rest }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={8}
      className={cn(
        "z-50 min-w-[200px] rounded-md border border-hairline bg-canvas p-3 shadow-elev-3",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[side=top]:data-[state=open]:slide-in-from-bottom-2",
        "data-[side=bottom]:data-[state=open]:slide-in-from-top-2",
        "data-[side=left]:data-[state=open]:slide-in-from-right-2",
        "data-[side=right]:data-[state=open]:slide-in-from-left-2",
        "duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        className
      )}
      {...rest}
    >
      {children}
      {arrow && <PopoverPrimitive.Arrow className="fill-canvas stroke-hairline" width={12} height={6} />}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = "PopoverContent"
