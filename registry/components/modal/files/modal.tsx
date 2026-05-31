import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { MultiplicationSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

/**
 * <Modal> — design.md §5.8
 * Built on Radix Dialog. radius-lg + elev-4 + scale-in.
 */

export const Modal = DialogPrimitive.Root
export const ModalTrigger = DialogPrimitive.Trigger
export const ModalPortal = DialogPrimitive.Portal
export const ModalClose = DialogPrimitive.Close

const overlayBase =
  "fixed inset-0 z-40 bg-black/25 backdrop-blur-[3px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:duration-[35ms] data-[state=closed]:duration-[35ms]"

export const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn(overlayBase, className)} {...props} />
))
ModalOverlay.displayName = "ModalOverlay"

const sizeClasses = {
  sm: "max-w-[480px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
  xl: "max-w-[960px]",
} as const

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: keyof typeof sizeClasses
  hideClose?: boolean
}

export const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size = "sm", hideClose, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-40 w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2",
        "rounded-lg border border-hairline bg-canvas shadow-elev-4",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        "data-[state=open]:duration-[35ms] data-[state=closed]:duration-[35ms]",
        "ease-[var(--ease-emphasis)]",
        sizeClasses[size],
        className
      )}
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
  </ModalPortal>
))
ModalContent.displayName = "ModalContent"

export const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-5 pb-2 pt-4", className)} {...props} />
)

export const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-base font-semibold text-ink", className)}
    {...props}
  />
))
ModalTitle.displayName = "ModalTitle"

export const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-[13px] text-ink-2", className)}
    {...props}
  />
))
ModalDescription.displayName = "ModalDescription"

export const ModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-5 pb-4 text-[13px] text-ink-2", className)} {...props} />
)

export const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-end gap-2 border-t border-hairline bg-surface px-5 py-3 rounded-b-lg",
      className
    )}
    {...props}
  />
)
