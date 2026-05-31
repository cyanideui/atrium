import * as React from "react"
import {
  shortcutToast,
  useDensity,
  useOptionalDocShell,
  type Density,
} from "@atrium/ui"
import {
  Sun02Icon,
  Moon02Icon,
  Minimize02Icon,
  Maximize02Icon,
  Menu09Icon,
  SidebarLeft01Icon,
  SidebarRight01Icon,
  ArrowExpand01Icon,
  ArrowShrink02Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { useTheme } from "./use-theme"

/**
 * Shortcut toasts — confirms a global hotkey landed.
 *
 * Strategy: per-mode "previous value" ref. We toast only when the
 * observed value DIFFERS from the previously stored value. The ref
 * starts undefined; on the very first effect run we just stash the
 * value (no toast), and any later change fires a chip.
 *
 * This is more robust than a "first-paint boolean" because:
 *   1. `useRef` survives `<React.StrictMode>` double-mounting in dev.
 *      A boolean flag would be flipped by the first cycle and then
 *      fire toasts on the second mount because the state arrived
 *      "again" (same value, but the guard had already been tripped).
 *   2. It naturally guards against re-renders that don't actually
 *      change the value — the comparison is against the last value
 *      we toasted, not against "did this hook ever run?"
 *
 * Each mode owns a stable Sonner toast `id` so cycling fast replaces
 * an in-flight chip instead of stacking them up.
 */

const DENSITY_ICON: Record<Density, IconSvgElement> = {
  "compact-plus": Menu09Icon,
  compact: Minimize02Icon,
  comfortable: Maximize02Icon,
}

const DENSITY_LABEL: Record<Density, string> = {
  "compact-plus": "Compact+",
  compact: "Compact",
  comfortable: "Comfortable",
}

export function useShortcutToasts() {
  const { theme } = useTheme()
  const { density } = useDensity()
  const shell = useOptionalDocShell()

  // Previous-value refs. `undefined` means "we haven't observed this yet,
  // so the next observation is just the initial state — don't toast".
  const prevTheme = React.useRef<typeof theme | undefined>(undefined)
  const prevDensity = React.useRef<Density | undefined>(undefined)
  const prevCollapsed = React.useRef<boolean | undefined>(undefined)
  const prevWidth = React.useRef<"centered" | "full" | undefined>(undefined)

  React.useEffect(() => {
    if (prevTheme.current === undefined) {
      prevTheme.current = theme
      return
    }
    if (prevTheme.current === theme) return
    prevTheme.current = theme
    shortcutToast({
      id: "shortcut:theme",
      icon: theme === "dark" ? Moon02Icon : Sun02Icon,
      label: theme === "dark" ? "Dark mode" : "Light mode",
      shortcut: "T",
    })
  }, [theme])

  React.useEffect(() => {
    if (prevDensity.current === undefined) {
      prevDensity.current = density
      return
    }
    if (prevDensity.current === density) return
    prevDensity.current = density
    shortcutToast({
      id: "shortcut:density",
      icon: DENSITY_ICON[density],
      label: DENSITY_LABEL[density],
      shortcut: "D",
    })
  }, [density])

  React.useEffect(() => {
    if (!shell) return
    if (prevCollapsed.current === undefined) {
      prevCollapsed.current = shell.collapsed
      return
    }
    if (prevCollapsed.current === shell.collapsed) return
    prevCollapsed.current = shell.collapsed
    shortcutToast({
      id: "shortcut:sidebar",
      icon: shell.collapsed ? SidebarRight01Icon : SidebarLeft01Icon,
      label: shell.collapsed ? "Sidebar collapsed" : "Sidebar expanded",
      shortcut: "B",
    })
  }, [shell?.collapsed]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!shell) return
    if (prevWidth.current === undefined) {
      prevWidth.current = shell.bodyWidth
      return
    }
    if (prevWidth.current === shell.bodyWidth) return
    prevWidth.current = shell.bodyWidth
    shortcutToast({
      id: "shortcut:width",
      icon: shell.bodyWidth === "centered" ? ArrowShrink02Icon : ArrowExpand01Icon,
      label: shell.bodyWidth === "centered" ? "Centered width" : "Full width",
      shortcut: "W",
    })
  }, [shell?.bodyWidth]) // eslint-disable-line react-hooks/exhaustive-deps
}
