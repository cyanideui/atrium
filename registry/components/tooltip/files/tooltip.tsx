import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

/**
 * <Tooltip> — design.md §5.6
 * shadcn/Radix style with arrow. Dark bg, 12px label, 6px arrow.
 */

export const TooltipProvider = TooltipPrimitive.Provider
export const TooltipRoot = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger
export const TooltipPortal = TooltipPrimitive.Portal

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...rest }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-xs rounded-sm bg-ink px-2 py-1.5 text-[12px] font-medium text-canvas shadow-elev-2",
        "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
        "data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[side=top]:data-[state=delayed-open]:slide-in-from-bottom-1",
        "data-[side=bottom]:data-[state=delayed-open]:slide-in-from-top-1",
        "data-[side=left]:data-[state=delayed-open]:slide-in-from-right-1",
        "data-[side=right]:data-[state=delayed-open]:slide-in-from-left-1",
        "duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
        className
      )}
      {...rest}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-ink" width={10} height={5} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = "TooltipContent"

/**
 * <Tooltip> — sugar around Provider + Root + Trigger + Content.
 * Use the primitives above for full control (delayDuration, controlled open, etc.).
 */
export interface TooltipProps {
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delay?: number
  children: React.ReactElement
}

export function Tooltip({
  content,
  side = "top",
  align = "center",
  delay = 250,
  children,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
