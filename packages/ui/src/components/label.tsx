import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "../lib/cn"

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 text-[13px] font-medium leading-none text-ink select-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
    {required && (
      <span aria-hidden className="text-error">
        *
      </span>
    )}
  </LabelPrimitive.Root>
))
Label.displayName = "Label"
