import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "../lib/cn"

/**
 * <Tabs> — design.md §5.5
 * Underline style. Active tab gets a 2px ink underline.
 */

export const Tabs = TabsPrimitive.Root

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...rest }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center gap-1 border-b border-hairline",
      className
    )}
    {...rest}
  />
))
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...rest }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex h-10 cursor-pointer items-center justify-center px-3 text-[13px] font-medium",
      "text-ink-3 transition-colors duration-[var(--dur-fast)]",
      "hover:text-ink-2",
      "data-[state=active]:text-ink",
      // Underline indicator — pseudo-element so it doesn't shift layout.
      "after:absolute after:left-2 after:right-2 after:-bottom-px after:h-0.5 after:rounded-pill after:bg-ink",
      "after:scale-x-0 after:origin-center after:transition-transform after:duration-[var(--dur-base)] after:ease-[var(--ease-standard)]",
      "data-[state=active]:after:scale-x-100",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1 focus-visible:ring-offset-canvas",
      className
    )}
    {...rest}
  />
))
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...rest }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none",
      "data-[state=inactive]:hidden",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-[var(--dur-fast)]",
      className
    )}
    {...rest}
  />
))
TabsContent.displayName = "TabsContent"
