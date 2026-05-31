import * as React from "react"

/**
 * Theme — module-level shared state.
 *
 * Earlier this hook just used `useState`, which meant every call site
 * (App hotkey, sidebar toggle, command palette, toast notifier, …) had
 * its OWN copy of the theme value. The DOM stayed in sync because the
 * side effect always wrote `<html class="dark">`, but React state in
 * other hook instances never updated — and effects depending on `theme`
 * (like the new toast notifier) never fired.
 *
 * Fix: a tiny external store + `useSyncExternalStore` so every
 * `useTheme()` caller subscribes to the same value. One toggle → every
 * subscriber re-renders, every effect runs.
 */

const STORAGE_KEY = "atrium.theme"

export type Theme = "light" | "dark"

function getInitial(): Theme {
  if (typeof window === "undefined") return "light"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark") return stored
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

let current: Theme = getInitial()
const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
function getSnapshot(): Theme {
  return current
}
/** SSR fallback (Next.js example app, etc.). */
function getServerSnapshot(): Theme {
  return "light"
}

function applyToDom(next: Theme) {
  if (typeof document === "undefined") return
  document.documentElement.classList.toggle("dark", next === "dark")
}
function persist(next: Theme) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
}

// Sync the DOM once on first import so the very first paint matches the
// stored / preferred theme — even before any component mounts.
applyToDom(current)

function setTheme(next: Theme) {
  if (next === current) return
  current = next
  applyToDom(next)
  persist(next)
  for (const l of listeners) l()
}

export function useTheme() {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const toggle = React.useCallback(
    () => setTheme(current === "dark" ? "light" : "dark"),
    [],
  )
  return { theme, setTheme, toggle }
}
