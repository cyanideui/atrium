import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Density mode — the global rhythm of rows, forms, and gaps.
 *
 *   • compact-plus  — denser-than-compact, for high-volume operators
 *                     (logistics dashboards, audit logs). 36 px rows.
 *   • compact       — default. Notion / Linear scale. 44 px rows.
 *   • comfortable   — touch-friendly, extra whitespace. 52 px rows.
 *
 * Three ways to apply a density:
 *
 *   1. **Global** — set `data-density` on `<html>` (or any ancestor) and
 *      every component below picks it up via CSS variable cascade. The
 *      library exports `<DensityRoot>` and `useDensityHotkey()` to wire
 *      the `D` hotkey + persistence in one line.
 *
 *      function App() {
 *        useDensityHotkey()
 *        return <DensityRoot defaultDensity="compact"> {...} </DensityRoot>
 *      }
 *
 *   2. **Scoped** — wrap a subtree with `<DensityProvider density="compact">`
 *      to override the global mode for that branch only. Useful for
 *      "compact summary table inside a comfortable settings page".
 *
 *      <DensityProvider density="compact-plus">
 *        <Table>...</Table>
 *      </DensityProvider>
 *
 *   3. **Manual** — just drop one of the three classes on any element:
 *      `ds-density-compact-plus`, `ds-density-compact`, `ds-density-comfortable`.
 *      The class redefines the `--density-*` CSS variables for its subtree;
 *      no React context required. Use this when you can't add a wrapper.
 *
 * Behavior across the three approaches:
 *   - All three set the same CSS vars, so components don't care which one
 *     wrote them — the cascade picks up the closest scope.
 *   - `<DensityProvider>` ALSO publishes a React context, so descendants
 *     can read the active density via `useDensity()` if they need to
 *     branch on it (rare — most components just consume the CSS vars).
 *
 * ---
 *
 * Why three levels?
 *   Real ERP power users want denser-than-compact (think SAP, NetSuite,
 *   audit dashboards). Casual users want comfortable. Two levels forced a
 *   compromise; three lets each user community land where they want.
 */

export type Density = "compact-plus" | "compact" | "comfortable"

export const DEFAULT_DENSITY: Density = "compact"
export const DENSITIES: Density[] = ["compact-plus", "compact", "comfortable"]

const STORAGE_KEY = "atrium.density"

interface DensityContextValue {
  density: Density
  setDensity: (next: Density) => void
  cycle: () => void
}

const DensityContext = React.createContext<DensityContextValue | null>(null)

/**
 * Read the active density from the surrounding `<DensityProvider>`. If no
 * provider exists, falls back to `compact`. Components rarely need this —
 * prefer reading the CSS vars (`--density-row-h`, etc.) directly.
 */
export function useDensity(): DensityContextValue {
  const ctx = React.useContext(DensityContext)
  if (ctx) return ctx
  return {
    density: DEFAULT_DENSITY,
    setDensity: () => {},
    cycle: () => {},
  }
}

export interface DensityProviderProps {
  /** Density mode for this subtree. Defaults to `compact`. */
  density?: Density
  /** Render as a different element than the default `<div>`. */
  as?: keyof React.JSX.IntrinsicElements
  /** Extra classes on the wrapper. */
  className?: string
  children: React.ReactNode
}

/**
 * Scopes a density mode to its subtree by adding the matching
 * `ds-density-{density}` class to the wrapper element. Useful when you
 * want a region of your app to override the global density (e.g. a dense
 * audit table inside a roomy settings page).
 *
 * Re-publishes the mode through React context so descendants can read it
 * via `useDensity()` if they need to branch on it.
 */
export function DensityProvider({
  density = DEFAULT_DENSITY,
  as = "div",
  className,
  children,
}: DensityProviderProps) {
  const value = React.useMemo<DensityContextValue>(
    () => ({
      density,
      setDensity: () => {
        // eslint-disable-next-line no-console
        console.warn(
          "[atrium] <DensityProvider density=...> is fixed. Use <DensityRoot> + useDensityHotkey() if you need a mutable global density.",
        )
      },
      cycle: () => {},
    }),
    [density],
  )

  const Component = as as React.ElementType
  return (
    <DensityContext.Provider value={value}>
      <Component className={cn(`ds-density-${density}`, className)}>{children}</Component>
    </DensityContext.Provider>
  )
}
DensityProvider.displayName = "DensityProvider"

/* ---------- Global mode (mutable) ---------- */

interface DensityRootProps {
  /** Initial density. Reads from localStorage if not provided. */
  defaultDensity?: Density
  /** Children that should respond to the global density. */
  children: React.ReactNode
  /** Persistence key. Defaults to `atrium.density`. */
  storageKey?: string
}

/**
 * Top-level density root. Reads the persisted mode from localStorage,
 * sets `data-density` on `<html>`, exposes `setDensity` / `cycle` to
 * descendants via context, and persists changes.
 *
 * Combine with `useDensityHotkey()` to wire the `D` shortcut.
 */
export function DensityRoot({
  defaultDensity = DEFAULT_DENSITY,
  storageKey = STORAGE_KEY,
  children,
}: DensityRootProps) {
  const [density, setDensityState] = React.useState<Density>(() => {
    if (typeof window === "undefined") return defaultDensity
    const stored = window.localStorage.getItem(storageKey)
    if (stored && (DENSITIES as string[]).includes(stored)) return stored as Density
    return defaultDensity
  })

  // Apply to <html> so every component down the tree picks it up via the
  // [data-density] selector in tokens.css. We always set the attribute (not
  // remove on default) so the cascade is consistent.
  React.useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.setAttribute("data-density", density)
  }, [density])

  // Persist
  React.useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(storageKey, density)
    } catch {
      /* ignore (private mode, quota, etc.) */
    }
  }, [density, storageKey])

  const setDensity = React.useCallback((next: Density) => {
    setDensityState(next)
  }, [])

  const cycle = React.useCallback(() => {
    setDensityState((prev) => {
      const i = DENSITIES.indexOf(prev)
      const next = DENSITIES[(i + 1) % DENSITIES.length] ?? DEFAULT_DENSITY
      return next
    })
  }, [])

  const value = React.useMemo<DensityContextValue>(
    () => ({ density, setDensity, cycle }),
    [density, setDensity, cycle],
  )

  return <DensityContext.Provider value={value}>{children}</DensityContext.Provider>
}
DensityRoot.displayName = "DensityRoot"

/**
 * Wires the `D` hotkey to cycle the global density. Skips while typing,
 * skips when modifier keys are held (so Cmd-D / Ctrl-D bookmarks still
 * work). Mount once near the top of your app inside a `<DensityRoot>`.
 */
export function useDensityHotkey() {
  const { cycle } = useDensity()
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "d" || e.key === "D") {
        e.preventDefault()
        cycle()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [cycle])
}
