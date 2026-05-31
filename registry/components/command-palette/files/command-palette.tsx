import * as React from "react"
import { Command } from "cmdk"
import { Search01Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Kbd, KbdShortcut } from "@/components/ui/kbd"

/**
 * <CommandPalette> — design.md §5.31
 * Centered modal palette wired through cmdk. Opens on ⌘K (or via the consumer's
 * own state). Provides:
 *   • Real fuzzy search via cmdk's filter
 *   • Grouped results (CommandGroup) with optional `count` badge + sticky heading
 *   • Active-row chevron on the highlighted item
 *   • Soft open animation (160 ms scale 0.96 → 1, ease-emphasis)
 *   • Keyboard navigation (↑↓ Enter Esc)
 *
 * Usage:
 *   const [open, setOpen] = useState(false)
 *   useEffect(() => {
 *     const onKey = (e) => {
 *       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
 *         e.preventDefault()
 *         setOpen((o) => !o)
 *       }
 *     }
 *     window.addEventListener("keydown", onKey)
 *     return () => window.removeEventListener("keydown", onKey)
 *   }, [])
 *
 *   <CommandPalette open={open} onOpenChange={setOpen}>
 *     <CommandPaletteInput placeholder="Type a command…" />
 *     <CommandPaletteList>
 *       <CommandPaletteEmpty>No results.</CommandPaletteEmpty>
 *       <CommandPaletteGroup heading="Pages" count={3}>
 *         <CommandPaletteItem onSelect={() => navigate("/orders")}>Orders</CommandPaletteItem>
 *       </CommandPaletteGroup>
 *     </CommandPaletteList>
 *   </CommandPalette>
 */

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Optional label for screen readers. */
  label?: string
  children: React.ReactNode
  /** Override the default `shouldFilter`. */
  shouldFilter?: boolean
}

export function CommandPalette({
  open,
  onOpenChange,
  label = "Command palette",
  children,
  shouldFilter = true,
}: CommandPaletteProps) {
  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label={label}
      shouldFilter={shouldFilter}
    >
      <div
        className={cn(
          "fixed left-1/2 top-[88px] z-40 w-[520px] max-w-[calc(100vw-32px)] -translate-x-1/2",
          "overflow-hidden border border-hairline bg-canvas shadow-elev-4 [border-radius:6px]",
          // Soft open: 160 ms ease-emphasis, scale 0.96 → 1 plus 4 px translateY.
          // Replaces the abrupt 35 ms snap with a calmer, Linear-style settle.
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=open]:zoom-in-[0.96]",
          "data-[state=open]:slide-in-from-top-1",
          "data-[state=open]:duration-[160ms]",
          "data-[state=open]:ease-[var(--ease-emphasis)]",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "data-[state=closed]:zoom-out-95",
          "data-[state=closed]:duration-[80ms]"
        )}
      >
        {children}
      </div>
    </Command.Dialog>
  )
}

export const CommandPaletteInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Command.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2.5 border-b border-hairline px-3.5">
    <Icon icon={Search01Icon} size={15} className="shrink-0 text-ink-3" aria-hidden />
    <Command.Input
      ref={ref}
      className={cn(
        "h-11 w-full bg-transparent text-[13.5px] text-ink placeholder:text-ink-4 outline-none",
        className
      )}
      {...props}
    />
    <Kbd size="sm">esc</Kbd>
  </div>
))
CommandPaletteInput.displayName = "CommandPaletteInput"

export const CommandPaletteList = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Command.List>
>(({ className, ...props }, ref) => (
  <Command.List
    ref={ref}
    className={cn(
      "ds-scroll-overlay max-h-[320px] overflow-y-auto overflow-x-hidden p-1",
      className
    )}
    {...props}
  />
))
CommandPaletteList.displayName = "CommandPaletteList"

export const CommandPaletteEmpty = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Command.Empty>
>(({ className, ...props }, ref) => (
  <Command.Empty
    ref={ref}
    className={cn("px-4 py-8 text-center text-[13px] text-ink-3", className)}
    {...props}
  />
))
CommandPaletteEmpty.displayName = "CommandPaletteEmpty"

export interface CommandPaletteGroupProps
  extends Omit<React.ComponentProps<typeof Command.Group>, "heading"> {
  heading?: React.ReactNode
  /** Optional count rendered after the heading (e.g. "Forms (14)"). */
  count?: number
}

export const CommandPaletteGroup = React.forwardRef<
  HTMLDivElement,
  CommandPaletteGroupProps
>(({ className, heading, count, ...props }, ref) => {
  // We render the heading ourselves (instead of via cmdk's `heading` prop) so
  // we can: (a) make it sticky, (b) tack on a count badge, and (c) blur its
  // background while items scroll under it.
  const renderedHeading =
    heading == null ? undefined : (
      <div
        className={cn(
          "sticky top-0 z-[1] flex items-center gap-1.5",
          "bg-canvas/85 backdrop-blur-[3px]",
          "px-2 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3"
        )}
      >
        <span className="truncate">{heading}</span>
        {typeof count === "number" && (
          <span className="font-medium tabular-nums text-ink-4">{count}</span>
        )}
      </div>
    )

  return (
    <Command.Group
      ref={ref}
      // Pass empty heading so cmdk doesn't render its own. We render ours
      // manually above the items. Use the heading text as the group's `value`
      // for filtering / scoring.
      heading={typeof heading === "string" ? heading : undefined}
      className={cn(
        "px-1 pb-1 pt-0.5",
        // Hide the cmdk-provided heading — we render our own sticky version above.
        "[&>[cmdk-group-heading]]:hidden",
        className
      )}
      {...props}
    >
      {renderedHeading}
      {props.children}
    </Command.Group>
  )
})
CommandPaletteGroup.displayName = "CommandPaletteGroup"

export const CommandPaletteSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Command.Separator>
>(({ className, ...props }, ref) => (
  <Command.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-hairline", className)}
    {...props}
  />
))
CommandPaletteSeparator.displayName = "CommandPaletteSeparator"

export interface CommandPaletteItemProps extends React.ComponentProps<typeof Command.Item> {
  /** Leading icon. */
  leading?: React.ReactNode
  /** Trailing keycap shortcut. */
  shortcut?: React.ReactNode
}

export const CommandPaletteItem = React.forwardRef<
  HTMLDivElement,
  CommandPaletteItemProps
>(({ className, children, leading, shortcut, ...props }, ref) => (
  <Command.Item
    ref={ref}
    className={cn(
      "group/item relative flex h-9 cursor-pointer select-none items-center gap-2.5 rounded-sm px-2 text-[13px] text-ink-2",
      // No transition on the row's bg/color — instant hover & keyboard snap
      // for a Raycast-grade responsive feel on dense lists.
      "data-[selected=true]:bg-surface data-[selected=true]:text-ink",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  >
    {leading && (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center text-ink-3 group-data-[selected=true]/item:text-ink">
        {leading}
      </span>
    )}
    <span className="min-w-0 flex-1 truncate">{children}</span>

    {/* Right-edge slot — single source of truth.
        Items WITH a shortcut: show only the keycap (the shortcut already
        tells the user how to invoke). The keycap brightens on selection.
        Items WITHOUT a shortcut: show the active-row chevron, fading in only
        when the row is highlighted — the chevron telegraphs "Enter to go". */}
    {shortcut ? (
      <span aria-hidden className="shrink-0 group-data-[selected=true]/item:text-ink">
        {typeof shortcut === "string" ? (
          <KbdShortcut size="sm">{shortcut}</KbdShortcut>
        ) : (
          shortcut
        )}
      </span>
    ) : (
      <span
        aria-hidden
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center text-ink-3",
          "opacity-0 -translate-x-1 transition-[opacity,transform] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
          "group-data-[selected=true]/item:opacity-100 group-data-[selected=true]/item:translate-x-0"
        )}
      >
        <Icon icon={ArrowRight02Icon} size={12} />
      </span>
    )}
  </Command.Item>
))
CommandPaletteItem.displayName = "CommandPaletteItem"

/* Tiny footer for showing nav hints. */
export function CommandPaletteFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 border-t border-hairline bg-surface px-3.5 py-1.5 text-[10.5px] text-ink-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
