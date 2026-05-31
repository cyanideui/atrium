"use client"

import { DensityRoot, useDensityHotkey } from "@/components/ui/density"
import { Toaster } from "@/components/ui/toaster"
import * as React from "react"
import { AppShell } from "./app-shell"
import { CommandPalette } from "./command-palette"
import { GlobalCheatsheet } from "../hooks/use-global-cheatsheet"
import { useTheme } from "../hooks/use-theme"

/**
 * Root provider + chrome wrapper. Mount once at your app root:
 *
 *   Next.js (src/app/layout.tsx):
 *     <body><ShellProviders>{children}</ShellProviders></body>
 *
 *   Vite (src/App.tsx):
 *     <ShellProviders><Routes>…</Routes></ShellProviders>
 *
 * Owns:
 *   - <DensityRoot> — density mode state + persistence (the D hotkey)
 *   - <Toaster> — toast singleton (top-center)
 *   - <GlobalCheatsheet> — ? hotkey → shortcuts modal
 *   - <CommandPalette> — ⌘K / Ctrl+K
 *   - <AppShell> — the sidebar + content card chrome
 *
 * Note the split: <DensityRoot> is the OUTER component so the hooks below
 * (which read density context) sit inside it. Putting useDensityHotkey()
 * in the same component that renders <DensityRoot> would read the no-op
 * fallback — provider scope bug.
 */
export function ShellProviders({ children }: { children: React.ReactNode }) {
  return (
    <DensityRoot>
      <ShellInner>{children}</ShellInner>
    </DensityRoot>
  )
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const [cheatsheetOpen, setCheatsheetOpen] = React.useState(false)
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  useDensityHotkey()
  useThemeHotkey()
  useCommandPaletteHotkey(setPaletteOpen)

  return (
    <>
      <Toaster position="top-center" />
      <GlobalCheatsheet open={cheatsheetOpen} onOpenChange={setCheatsheetOpen} />
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onOpenCheatsheet={() => setCheatsheetOpen(true)}
      />
      <AppShell
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenCheatsheet={() => setCheatsheetOpen(true)}
      >
        {children}
      </AppShell>
    </>
  )
}

/** T hotkey — toggle theme. Skipped while typing. */
function useThemeHotkey() {
  const { toggle } = useTheme()
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "t" || e.key === "T") {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toggle])
}

/** ⌘K / Ctrl+K — toggle command palette. */
function useCommandPaletteHotkey(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [setOpen])
}
