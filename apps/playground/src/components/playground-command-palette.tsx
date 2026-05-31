import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteFooter,
  CommandPaletteSeparator,
  Icon,
  Kbd,
} from "@atrium/ui"
import {
  HomeIcon,
  Moon02Icon,
  Sun02Icon,
  HelpCircleIcon,
  GithubIcon,
  PuzzleIcon,
  Maximize02Icon,
  Minimize02Icon,
} from "@hugeicons/core-free-icons"
import { NAV } from "../nav"
import { useTheme } from "../hooks/use-theme"
import { useDensity } from "../hooks/use-density"

export interface PlaygroundCommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenCheatsheet: () => void
}

export function PlaygroundCommandPalette({
  open,
  onOpenChange,
  onOpenCheatsheet,
}: PlaygroundCommandPaletteProps) {
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()
  const { density, cycle: cycleDensity } = useDensity()

  const go = (path: string) => {
    onOpenChange(false)
    navigate(path)
  }

  // Flatten NAV into [section, entries[]] pairs for grouped rendering.
  const groups = React.useMemo(() => {
    const out: { heading: string; entries: typeof NAV[number]["entries"] }[] = []
    for (const section of NAV) {
      if (section.entries) {
        out.push({ heading: section.title, entries: section.entries })
      }
      if (section.categories) {
        for (const cat of section.categories) {
          out.push({ heading: `${section.title} · ${cat.title}`, entries: cat.entries })
        }
      }
    }
    return out
  }, [])

  // Total Action items (used for the Actions group count badge below).
  const ACTION_COUNT = 5

  return (
    <CommandPalette open={open} onOpenChange={onOpenChange}>
      <CommandPaletteInput placeholder="Search components, foundations, templates…" />
      <CommandPaletteList>
        <CommandPaletteEmpty>No results.</CommandPaletteEmpty>

        {groups.map((g, i) => (
          <React.Fragment key={g.heading}>
            <CommandPaletteGroup heading={g.heading} count={g.entries?.length}>
              {g.entries?.map((e) => (
                <CommandPaletteItem
                  key={e.path}
                  leading={
                    e.icon ? (
                      <Icon icon={e.icon} size={14} />
                    ) : (
                      <Icon icon={PuzzleIcon} size={14} />
                    )
                  }
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

        <CommandPaletteGroup heading="Actions" count={ACTION_COUNT}>
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
            value="cycle density compact-plus compact comfortable spacing"
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
            value="go home introduction"
            onSelect={() => go("/")}
          >
            Go to introduction
          </CommandPaletteItem>
          <CommandPaletteItem
            leading={<Icon icon={GithubIcon} size={14} />}
            value="open github repository source"
            onSelect={() => {
              onOpenChange(false)
              window.open("https://github.com", "_blank", "noreferrer")
            }}
          >
            Open GitHub repository
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
  )
}
