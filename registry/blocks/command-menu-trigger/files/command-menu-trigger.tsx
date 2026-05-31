// @atrium:if next
"use client"
// @atrium:endif

import {
  CommandPalette,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
} from "@/components/ui/command-palette"
import { Icon } from "@/components/ui/icon"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import * as React from "react"
import {
  Search01Icon,
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  Settings02Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons"

/**
 * CommandMenuTrigger — a search-styled trigger button that opens the command
 * palette, plus the ⌘K / Ctrl+K hotkey wiring. Drop it in a topbar or sidebar
 * for apps that don't use the full DocShell (which already bundles a palette).
 *
 * Replace the palette items with your routes/actions; wire onSelect to your
 * router. The trigger is keyboard-accessible and shows the ⌘K hint.
 */

export function CommandMenuTrigger({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const run = (fn: () => void) => {
    setOpen(false)
    fn()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group flex h-8 w-full max-w-[260px] items-center gap-2 rounded-md border border-hairline-strong bg-canvas px-2.5 text-[13px] text-ink-4",
          "transition-colors duration-[var(--dur-fast)] hover:border-ink-3 hover:text-ink-3",
          className,
        )}
      >
        <Icon icon={Search01Icon} size={15} className="shrink-0" aria-hidden />
        <span className="flex-1 text-left">Search…</span>
        <Kbd size="sm">⌘K</Kbd>
      </button>

      <CommandPalette open={open} onOpenChange={setOpen}>
        <CommandPaletteInput placeholder="Type a command or search…" />
        <CommandPaletteList>
          <CommandPaletteEmpty>No results.</CommandPaletteEmpty>
          <CommandPaletteGroup heading="Go to">
            <CommandPaletteItem
              leading={<Icon icon={DashboardSquare01Icon} size={14} />}
              value="dashboard home"
              onSelect={() => run(() => console.log("navigate /"))}
            >
              Dashboard
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={ShoppingBag01Icon} size={14} />}
              value="orders"
              onSelect={() => run(() => console.log("navigate /orders"))}
            >
              Orders
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={Settings02Icon} size={14} />}
              value="settings"
              onSelect={() => run(() => console.log("navigate /settings"))}
            >
              Settings
            </CommandPaletteItem>
          </CommandPaletteGroup>
          <CommandPaletteGroup heading="Actions">
            <CommandPaletteItem
              leading={<Icon icon={Add01Icon} size={14} />}
              shortcut="N"
              value="new order create"
              onSelect={() => run(() => console.log("new order"))}
            >
              New order
            </CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>
    </>
  )
}
