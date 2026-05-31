import * as React from "react"
import {
  shortcutToast,
  useDensity,
  useOptionalDocShell,
  type Density,
} from "@cyanideui/ui"
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
 * Each mode owns a stable Sonner toast id so cycling fast replaces an
 * in-flight chip instead of stacking. The first observation per mode is
 * skipped (via a "previous value" ref) so mounting the app doesn't fire a
 * chip on first paint just because the state has its initial value.
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
