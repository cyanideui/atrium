import * as React from "react"
import {
  CommandPalette,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  Icon,
  KbdShortcut,
} from "@cyanideui/ui"
import {
  Search01Icon,
  DashboardSquare01Icon,
  ShoppingBag01Icon,
  Settings02Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

export function CommandMenuTriggerBlock() {
  // NOTE: the playground already binds ⌘K globally, so this demo opens via the
  // trigger button only (the installed block wires its own ⌘K hotkey).
  const [open, setOpen] = React.useState(false)
  const run = (fn: () => void) => { setOpen(false); fn() }

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Command menu trigger"
        status="stable"
        description="Search-styled trigger button that opens the command palette, plus the ⌘K / Ctrl+K hotkey wiring. Matches the system's sidebar search chrome. For apps that don't use the full DocShell (which already bundles a palette)."
      />

      <Section title="Preview" description="Click the trigger to open the palette. The installed block also binds ⌘K.">
        <div className="rounded-md border border-hairline bg-canvas p-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ds-sb-search flex h-8 w-full max-w-[280px] cursor-pointer items-center gap-2 rounded-sm border px-2.5 text-[13px] text-ink-3 transition-[background,border-color,color] duration-[var(--dur-base)] ease-[var(--ease-standard)]"
          >
            <Icon icon={Search01Icon} size={14} className="shrink-0" aria-hidden />
            <span className="flex-1 truncate text-left">Search…</span>
            <KbdShortcut size="sm" className="shrink-0">⌘K</KbdShortcut>
          </button>

          <CommandPalette open={open} onOpenChange={setOpen}>
            <CommandPaletteInput placeholder="Type a command or search…" />
            <CommandPaletteList>
              <CommandPaletteEmpty>No results.</CommandPaletteEmpty>
              <CommandPaletteGroup heading="Go to">
                <CommandPaletteItem leading={<Icon icon={DashboardSquare01Icon} size={14} />} value="dashboard" onSelect={() => run(() => {})}>Dashboard</CommandPaletteItem>
                <CommandPaletteItem leading={<Icon icon={ShoppingBag01Icon} size={14} />} value="orders" onSelect={() => run(() => {})}>Orders</CommandPaletteItem>
                <CommandPaletteItem leading={<Icon icon={Settings02Icon} size={14} />} value="settings" onSelect={() => run(() => {})}>Settings</CommandPaletteItem>
              </CommandPaletteGroup>
              <CommandPaletteGroup heading="Actions">
                <CommandPaletteItem leading={<Icon icon={Add01Icon} size={14} />} shortcut="N" value="new order" onSelect={() => run(() => {})}>New order</CommandPaletteItem>
              </CommandPaletteGroup>
            </CommandPaletteList>
          </CommandPalette>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add command-menu-trigger`} />
      </Section>
    </>
  )
}
