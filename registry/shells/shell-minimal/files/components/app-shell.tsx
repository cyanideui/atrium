// @atrium:if next
"use client"
// @atrium:endif

import { Icon } from "@/components/ui/icon"
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import * as React from "react"
// @atrium:if next
import Link from "next/link"
import { usePathname } from "next/navigation"
// @atrium:endif
// @atrium:if vite-react-router
import { Link, useLocation } from "react-router-dom"
// @atrium:endif
import { Moon02Icon, Sun02Icon } from "@hugeicons/core-free-icons"
import { NAV, type NavEntry } from "../lib/nav"
import { useTheme } from "../hooks/use-theme"

/**
 * Minimal app shell — a sticky topbar (brand + horizontal nav + theme
 * toggle) over a centered content container. No sidebar. Use it for simpler
 * apps, marketing-adjacent dashboards, or anything that doesn't need the full
 * DocShell.
 *
 * EDIT:
 *   - Brand (logo + name) in the <header> below.
 *   - Routes in src/lib/nav.ts.
 */

// @atrium:if next
function useCurrentPath() {
  return usePathname()
}
// @atrium:endif
// @atrium:if vite-react-router
function useCurrentPath() {
  return useLocation().pathname
}
// @atrium:endif

function TopNavLink({ entry, active }: { entry: NavEntry; active: boolean }) {
  const className = cn(
    "inline-flex h-8 items-center gap-1.5 rounded-sm px-2.5 text-[13px] font-medium",
    "transition-colors duration-[var(--dur-fast)]",
    active ? "bg-surface-2 text-ink" : "text-ink-3 hover:bg-surface hover:text-ink",
  )
  const inner = (
    <>
      {entry.icon && <Icon icon={entry.icon} size={15} />}
      {entry.label}
    </>
  )
  // @atrium:if next
  return (
    <Link href={entry.path} className={cn(className, "no-underline")}>
      {inner}
    </Link>
  )
  // @atrium:endif
  // @atrium:if vite-react-router
  return (
    <Link to={entry.path} className={cn(className, "no-underline")}>
      {inner}
    </Link>
  )
  // @atrium:endif
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useCurrentPath()
  const isActive = (path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path))

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header
        className={cn(
          "sticky top-0 z-30 flex h-14 shrink-0 items-center gap-4 px-4 sm:px-6",
          "border-b border-hairline bg-canvas/85 backdrop-blur-[3px] backdrop-saturate-150",
        )}
      >
        {/* Brand — edit logo + name */}
        {/* @atrium:if next */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Brand />
        </Link>
        {/* @atrium:endif */}
        {/* @atrium:if vite-react-router */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Brand />
        </Link>
        {/* @atrium:endif */}

        <nav className="flex items-center gap-0.5" aria-label="Primary">
          {NAV.map((entry) => (
            <TopNavLink key={entry.path} entry={entry} active={isActive(entry.path)} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}

function Brand() {
  return (
    <>
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink text-[13px] font-bold text-canvas">
        A
      </span>
      <span className="text-[14px] font-semibold text-ink">Your App</span>
    </>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <Tooltip content={theme === "dark" ? "Light mode (T)" : "Dark mode (T)"} side="bottom">
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle theme"
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-ink-3",
          "transition-[background-color,color,transform] duration-[var(--dur-fast)]",
          "hover:bg-surface hover:text-ink active:scale-95",
        )}
      >
        <Icon icon={theme === "dark" ? Sun02Icon : Moon02Icon} size={15} />
      </button>
    </Tooltip>
  )
}
