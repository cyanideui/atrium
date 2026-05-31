"use client"

import * as React from "react"
// @atrium:if next
import { useRouter } from "next/navigation"
// @atrium:endif
// @atrium:if vite-react-router
import { useNavigate } from "react-router-dom"
// @atrium:endif
import {
  CommandPalette as Palette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteFooter,
  CommandPaletteSeparator,
  Icon,
  Kbd,
  useDensity,
} from "@cyanideui/ui"
import {
  HomeIcon,
  Moon02Icon,
  Sun02Icon,
  HelpCircleIcon,
  PuzzleIcon,
  Maximize02Icon,
  Minimize02Icon,
} from "@hugeicons/core-free-icons"
import { NAV, type NavEntry } from "../lib/nav"
import { useTheme } from "../hooks/use-theme"

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenCheatsheet: () => void
}

export function CommandPalette({ open, onOpenChange, onOpenCheatsheet }: CommandPaletteProps) {
  // @atrium:if next
  const router = useRouter()
  const navigate = (path: string) => router.push(path)
  // @atrium:endif
  // @atrium:if vite-react-router
  const navigate = useNavigate()
  // @atrium:endif
  const { theme, toggle } = useTheme()
  const { density, cycle: cycleDensity } = useDensity()

  const go = (path: string) => {
    onOpenChange(false)
    navigate(path)
  }

  const groups = React.useMemo(() => {
    const out: { heading: string; entries: NavEntry[] }[] = []
    for (const section of NAV) {
      if (section.entries) out.push({ heading: section.title, entries: section.entries })
      if (section.categories) {
        for (const cat of section.categories) {
          out.push({ heading: `${section.title} · ${cat.title}`, entries: cat.entries })
        }
      }
    }
    return out
  }, [])

  return (
    <Palette open={open} onOpenChange={onOpenChange}>
      <CommandPaletteInput placeholder="Search…" />
      <CommandPaletteList>
        <CommandPaletteEmpty>No results.</CommandPaletteEmpty>

        {groups.map((g, i) => (
          <React.Fragment key={g.heading}>
            <CommandPaletteGroup heading={g.heading} count={g.entries.length}>
              {g.entries.map((e) => (
                <CommandPaletteItem
                  key={e.path}
                  leading={<Icon icon={e.icon ?? PuzzleIcon} size={14} />}
                  value={`${g.heading} ${e.label}`}
                  onSelect={() => go(e.path)}
                >
                  {e.label}
                </CommandPaletteItem>
              ))}
            </CommandPaletteGroup>
            {i < groups.length - 1 && <CommandPaletteSeparator />}
          </React.Fragment>
        ))}

        <CommandPaletteSeparator />

        <CommandPaletteGroup heading="Actions">
          <CommandPaletteItem
            leading={<Icon icon={theme === "dark" ? Sun02Icon : Moon02Icon} size={14} />}
            shortcut="T"
            value="toggle theme dark light mode"
            onSelect={() => {
              onOpenChange(false)
              toggle()
            }}
          >
            {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          </CommandPaletteItem>
          <CommandPaletteItem
            leading={<Icon icon={density === "comfortable" ? Minimize02Icon : Maximize02Icon} size={14} />}
            shortcut="D"
            value="cycle density compact comfortable spacing"
            onSelect={() => {
              onOpenChange(false)
              cycleDensity()
            }}
          >
            {density === "compact-plus"
              ? "Density: compact-plus → compact"
              : density === "compact"
                ? "Density: compact → comfortable"
                : "Density: comfortable → compact-plus"}
          </CommandPaletteItem>
          <CommandPaletteItem
            leading={<Icon icon={HelpCircleIcon} size={14} />}
            shortcut="?"
            value="open keyboard shortcuts cheatsheet help"
            onSelect={() => {
              onOpenChange(false)
              onOpenCheatsheet()
            }}
          >
            Open keyboard shortcuts
          </CommandPaletteItem>
          <CommandPaletteItem
            leading={<Icon icon={HomeIcon} size={14} />}
            value="go home dashboard"
            onSelect={() => go("/")}
          >
            Go to home
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
    </Palette>
  )
}
