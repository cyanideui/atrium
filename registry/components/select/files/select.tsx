import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import {
  ArrowDown01Icon,
  Tick02Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

/**
 * <Select> — design.md §5.4
 * Same surface as Input. Trailing chevron. Built on Radix Select.
 */

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

const triggerSizes = {
  sm: "px-2.5 text-xs",
  md: "px-3 text-[13px]",
  lg: "px-3.5 text-sm",
} as const

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  size?: keyof typeof triggerSizes
}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size = "md", style, ...rest }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    style={{ height: `var(--density-form-h-${size})`, ...style }}
    className={cn(
      "ds-trigger",
      "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border text-ink",
      "transition-[color,background,box-shadow,border-color] duration-[var(--dur-base)]",
      "disabled:cursor-not-allowed disabled:text-ink-4 disabled:border-hairline",
      "aria-invalid:border-error",
      "data-[placeholder]:text-ink-4 [&>span]:line-clamp-1",
      triggerSizes[size],
      className
    )}
    {...rest}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon icon={ArrowDown01Icon} size="sm" className="opacity-70" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...rest }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...rest}
  >
    <Icon icon={ArrowUp01Icon} size="sm" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...rest }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...rest}
  >
    <Icon icon={ArrowDown01Icon} size="sm" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...rest }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-hairline bg-canvas p-1 text-ink shadow-elev-3",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[side=top]:data-[state=open]:slide-in-from-bottom-2",
        "data-[side=bottom]:data-[state=open]:slide-in-from-top-2",
        "duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      )}
      {...rest}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = "SelectContent"

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...rest }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3",
      className
    )}
    {...rest}
  />
))
SelectLabel.displayName = "SelectLabel"

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...rest }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex h-8 cursor-pointer select-none items-center gap-2 rounded-sm px-2 pr-7 text-[13px] outline-none",
      "transition-colors duration-[var(--dur-fast)]",
      "focus:bg-surface data-[highlighted]:bg-surface text-ink-2 focus:text-ink data-[highlighted]:text-ink",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...rest}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon icon={Tick02Icon} size={12} strokeWidth={2.5} />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
SelectItem.displayName = "SelectItem"

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...rest }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-hairline", className)}
    {...rest}
  />
))
SelectSeparator.displayName = "SelectSeparator"
