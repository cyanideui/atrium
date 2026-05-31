// @atrium:if next
"use client"
// @atrium:endif

import { DensityRoot, useDensityHotkey } from "@/components/ui/density"
import { Toaster } from "@/components/ui/toaster"
import * as React from "react"
import { AppShell } from "./app-shell"
import { useTheme } from "../hooks/use-theme"

/**
 * Root provider + chrome wrapper for the minimal shell. Mount once at your
 * app root:
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
 *   - <AppShell> — the topbar + content chrome
 */
export function ShellProviders({ children }: { children: React.ReactNode }) {
  return (
    <DensityRoot>
      <ShellInner>{children}</ShellInner>
    </DensityRoot>
  )
}

function ShellInner({ children }: { children: React.ReactNode }) {
  useDensityHotkey()
  useThemeHotkey()

  return (
    <>
      <Toaster position="top-center" />
      <AppShell>{children}</AppShell>
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
