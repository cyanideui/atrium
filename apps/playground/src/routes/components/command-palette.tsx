import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteSeparator,
  CommandPaletteFooter,
  Icon,
  Kbd,
} from "@cyanideui/ui"
import {
  HomeIcon,
  ShoppingBag01Icon,
  UserMultiple02Icon,
  PackageIcon,
  Settings02Icon,
  ChartLineData01Icon,
  Add01Icon,
  Logout03Icon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function CommandPaletteShowcase() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Command Palette"
        status="stable"
        description="cmdk-backed palette with grouped results, fuzzy search, and keyboard navigation. Press ⌘K (or click below) to open."
      />

      <Section title="Try it">
        <Demo
          code={`const [open, setOpen] = useState(false)
useEffect(() => {
  const onKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setOpen(o => !o)
    }
  }
  window.addEventListener("keydown", onKey)
  return () => window.removeEventListener("keydown", onKey)
}, [])

<CommandPalette open={open} onOpenChange={setOpen}>
  <CommandPaletteInput placeholder="Type a command…" />
  <CommandPaletteList>
    <CommandPaletteEmpty>No results.</CommandPaletteEmpty>
    <CommandPaletteGroup heading="Pages">
      <CommandPaletteItem onSelect={() => navigate("/orders")}>Orders</CommandPaletteItem>
    </CommandPaletteGroup>
  </CommandPaletteList>
</CommandPalette>`}
        >
          <Button onClick={() => setOpen(true)}>
            Open command palette
          </Button>
          <span className="text-[12px] text-ink-3">
            …or press <Kbd mod size="sm" /> <Kbd size="sm">K</Kbd>
          </span>
        </Demo>
      </Section>

      <CommandPalette open={open} onOpenChange={setOpen}>
        <CommandPaletteInput placeholder="Type a command or search…" />
        <CommandPaletteList>
          <CommandPaletteEmpty>No results found.</CommandPaletteEmpty>

          <CommandPaletteGroup heading="Pages">
            <CommandPaletteItem
              leading={<Icon icon={HomeIcon} size={14} />}
              onSelect={() => go("/")}
            >
              Introduction
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={ShoppingBag01Icon} size={14} />}
              onSelect={() => go("/components/button")}
              shortcut="↵"
            >
              Button
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={UserMultiple02Icon} size={14} />}
              onSelect={() => go("/components/avatar")}
            >
              Avatar
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={PackageIcon} size={14} />}
              onSelect={() => go("/components/file-upload")}
            >
              File Upload
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={ChartLineData01Icon} size={14} />}
              onSelect={() => go("/components/sparklines")}
            >
              Sparklines
            </CommandPaletteItem>
          </CommandPaletteGroup>

          <CommandPaletteSeparator />

          <CommandPaletteGroup heading="Actions">
            <CommandPaletteItem
              leading={<Icon icon={Add01Icon} size={14} />}
              onSelect={() => alert("Create new order")}
              shortcut="⌘⇧P"
            >
              Create new order
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={Settings02Icon} size={14} />}
              onSelect={() => alert("Settings")}
            >
              Open settings
            </CommandPaletteItem>
            <CommandPaletteItem
              leading={<Icon icon={Logout03Icon} size={14} />}
              onSelect={() => alert("Sign out")}
            >
              Sign out
            </CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
        <CommandPaletteFooter>
          <span className="flex items-center gap-1">
            <Kbd size="sm">↑</Kbd>
            <Kbd size="sm">↓</Kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <Kbd size="sm">↵</Kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <Kbd size="sm">esc</Kbd>
            close
          </span>
        </CommandPaletteFooter>
      </CommandPalette>
    </div>
  )
}
