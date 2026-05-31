import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Tick02Icon, MinusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <Checkbox> — design.md §5.4
 * Sizes 14 / 16 / 18. Tone variants. Supports indeterminate.
 */

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md" | "lg"
  tone?: "default" | "success" | "warning" | "critical" | "info"
}

const sizeClasses: Record<NonNullable<CheckboxProps["size"]>, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-[18px] w-[18px]",
}

const toneClasses: Record<NonNullable<CheckboxProps["tone"]>, string> = {
  default:  "data-[state=checked]:bg-ink data-[state=checked]:border-ink data-[state=indeterminate]:bg-ink data-[state=indeterminate]:border-ink focus-visible:ring-ink",
  success:  "data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success focus-visible:ring-success",
  warning:  "data-[state=checked]:bg-warning data-[state=checked]:border-warning data-[state=indeterminate]:bg-warning data-[state=indeterminate]:border-warning focus-visible:ring-warning",
  critical: "data-[state=checked]:bg-error data-[state=checked]:border-error data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error focus-visible:ring-error",
  info:     "data-[state=checked]:bg-info data-[state=checked]:border-info data-[state=indeterminate]:bg-info data-[state=indeterminate]:border-info focus-visible:ring-info",
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "md", tone = "default", ...rest }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "ds-checkbox peer shrink-0 rounded-xs border border-hairline-strong",
      "transition-[background,border-color,box-shadow] duration-[var(--dur-base)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
      "disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      toneClasses[tone],
      className
    )}
    {...rest}
  >
    <CheckboxPrimitive.Indicator
      forceMount
      className={cn(
        "flex items-center justify-center text-canvas",
        "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-emphasis)]",
        "data-[state=unchecked]:scale-50 data-[state=unchecked]:opacity-0",
        "data-[state=checked]:scale-100 data-[state=checked]:opacity-100",
        "data-[state=indeterminate]:scale-100 data-[state=indeterminate]:opacity-100"
      )}
    >
      {rest.checked === "indeterminate" ? (
        <Icon icon={MinusSignIcon} size={10} strokeWidth={3} />
      ) : (
        <Icon icon={Tick02Icon} size={10} strokeWidth={3} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = "Checkbox"
