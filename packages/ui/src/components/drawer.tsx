import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { MultiplicationSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <Drawer> — design.md §5.9
 * Right-side panel, 480px default, slide-in from right. Built on Radix Dialog.
 */

export const Drawer = DialogPrimitive.Root
export const DrawerTrigger = DialogPrimitive.Trigger
export const DrawerPortal = DialogPrimitive.Portal
export const DrawerClose = DialogPrimitive.Close

const overlayBase =
  "fixed inset-0 z-40 bg-black/25 backdrop-blur-[3px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-[var(--dur-base)]"

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn(overlayBase, className)} {...props} />
))
DrawerOverlay.displayName = "DrawerOverlay"

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "right" | "left"
  width?: number | string
  hideClose?: boolean
}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, side = "right", width = 480, hideClose, style, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed top-0 z-40 flex h-full flex-col border-hairline bg-canvas shadow-elev-4",
        side === "right" ? "right-0 border-l" : "left-0 border-r",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        side === "right"
          ? "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
          : "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        "duration-[var(--dur-slide)] ease-[var(--ease-emphasis)]",
        className
      )}
      style={{ width, maxWidth: "100vw", ...style }}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close
          aria-label="Close"
          className={cn(
            "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-sm text-ink-3",
            "transition-[background-color,color,transform] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
            "hover:bg-surface hover:text-ink active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          )}
        >
          <Icon icon={MultiplicationSignIcon} size="md" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"


export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex shrink-0 items-start gap-4 border-b border-hairline p-5 pr-12",
      className
    )}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-base font-semibold text-ink", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mt-0.5 text-[13px] text-ink-3", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export const DrawerBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 overflow-y-auto p-5 text-[13px] text-ink-2", className)} {...props} />
)
DrawerBody.displayName = "DrawerBody"

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex shrink-0 items-center justify-end gap-2 border-t border-hairline bg-surface p-3.5",
      className
    )}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"
