import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { cn } from "../lib/cn"
import { Icon } from "./icon"

/**
 * <Accordion> — design.md §5.18
 * Borderless, only inner hairline dividers. Smooth height transition.
 */

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...rest }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-hairline last:border-0", className)}
    {...rest}
  />
))
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...rest }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 cursor-pointer items-center justify-between py-3.5 text-left text-[14px] font-medium text-ink",
        "transition-colors duration-[var(--dur-fast)] hover:text-ink",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className
      )}
      {...rest}
    >
      {children}
      <Icon
        icon={ArrowDown01Icon}
        size="md"
        className="shrink-0 text-ink-3 transition-transform duration-[var(--dur-base)] ease-[var(--ease-standard)] group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...rest }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-[13px] leading-relaxed text-ink-2",
      "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      className
    )}
    {...rest}
  >
    <div className="pb-4 pr-6">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"
