"use client"

import { Toaster, DensityRoot } from "@atrium/ui"

/**
 * Minimal client-side provider wrapper. Mount once at the root layout.
 *
 * If you add more global UI singletons (a global command palette,
 * theme provider, query client, auth context), put them here.
 *
 * `<DensityRoot>` reads / writes `data-density` on `<html>` and persists
 * to localStorage. To wire the `D` hotkey too, add a small client
 * component that calls `useDensityHotkey()` (omitted here so the
 * example stays minimal — the keyboard shortcut is opt-in).
 */
export function ShellProviders({ children }: { children: React.ReactNode }) {
  return (
    <DensityRoot>
      <Toaster position="top-center" />
      {children}
    </DensityRoot>
  )
}
