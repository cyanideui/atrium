"use client"

import * as React from "react"
// @atrium:if next
import Link from "next/link"
import { usePathname } from "next/navigation"
// @atrium:endif
// @atrium:if vite-react-router
import { Link, useLocation } from "react-router-dom"
// @atrium:endif
import {
  DocShell,
  DocSidebar,
  DocSidebarBrand,
  DocSidebarSearch,
  DocSidebarNav,
  DocSidebarFooter,
  DocSidebarUser,
  DocContent,
  PageShell,
  PageShellAction,
  PageShellDivider,
  Breadcrumbs,
  SidebarNav,
  SidebarNavSection,
  SidebarNavParent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon,
  Kbd,
} from "@cyanideui/ui"
import {
  Settings02Icon,
  Moon02Icon,
  Sun02Icon,
  HelpCircleIcon,
  PuzzleIcon,
} from "@hugeicons/core-free-icons"
import { NAV, type NavEntry } from "../lib/nav"
import { useTheme } from "../hooks/use-theme"
import { useShortcutToasts } from "../hooks/use-shortcut-toasts"
import { NavLinkItem } from "./nav-link-item"

/**
 * The app shell — sidebar on the left, content card on the right with a
 * sticky topbar. This is the playground's chrome, emptied of content.
 *
 * EDIT:
 *   - Brand (logo + name) in <DocSidebarBrand> below.
 *   - Routes in src/lib/nav.ts.
 *   - App-bar actions (theme toggle, help) in <AppBarActions>.
 */

interface AppShellProps {
  children: React.ReactNode
  onOpenCommandPalette: () => void
  onOpenCheatsheet: () => void
}

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

function Entry({ label, path, icon }: NavEntry) {
  return (
    <NavLinkItem to={path} leading={icon ? <Icon icon={icon} size={16} /> : undefined}>
      {label}
    </NavLinkItem>
  )
}

interface BreadcrumbHit {
  section: string
  category?: string
  label: string
}

function findBreadcrumb(pathname: string): BreadcrumbHit | null {
  for (const section of NAV) {
    if (section.entries) {
      const hit = section.entries.find((e) => e.path === pathname)
      if (hit) return { section: section.title, label: hit.label }
    }
    if (section.categories) {
      for (const cat of section.categories) {
        const hit = cat.entries.find((e) => e.path === pathname)
        if (hit) return { section: section.title, category: cat.title, label: hit.label }
      }
    }
  }
  return null
}

function AppBarActions({ onOpenCheatsheet }: { onOpenCheatsheet: () => void }) {
  const { theme, toggle } = useTheme()
  return (
    <>
      <PageShellAction
        icon={<Icon icon={theme === "dark" ? Sun02Icon : Moon02Icon} size={14} />}
        label={theme === "dark" ? "Light mode (T)" : "Dark mode (T)"}
        onClick={toggle}
      />
      <PageShellAction
        icon={<Icon icon={HelpCircleIcon} size={14} />}
        label="Keyboard shortcuts (?)"
        onClick={onOpenCheatsheet}
      />
      <PageShellDivider />
    </>
  )
}

export function AppShell({ children, onOpenCommandPalette, onOpenCheatsheet }: AppShellProps) {
  const pathname = useCurrentPath()

  // Fire shortcut-confirm toasts. Mounted here so it sits inside <DocShell>.
  useShortcutToasts()

  const activeCategory = React.useMemo(() => {
    for (const section of NAV) {
      if (!section.categories) continue
      for (const cat of section.categories) {
        if (cat.entries.some((e) => e.path === pathname)) return cat.title
      }
    }
    return null
  }, [pathname])

  const crumb = React.useMemo(() => findBreadcrumb(pathname), [pathname])

  const breadcrumbItems = React.useMemo(() => {
    if (!crumb) return [{ label: "Home" }]
    const base: { label: string }[] = [{ label: crumb.section }]
    if (crumb.category) base.push({ label: crumb.category })
    base.push({ label: crumb.label })
    return base
  }, [crumb])

  return (
    <DocShell defaultBodyWidth="centered">
      <DocSidebar>
        {/* @atrium:if next */}
        <Link href="/" className="block no-underline">
          <DocSidebarBrand logo="A" name="Your App" meta="Workspace" />
        </Link>
        {/* @atrium:endif */}
        {/* @atrium:if vite-react-router */}
        <Link to="/" className="block no-underline">
          <DocSidebarBrand logo="A" name="Your App" meta="Workspace" />
        </Link>
        {/* @atrium:endif */}

        <DocSidebarSearch placeholder="Search…" onClick={onOpenCommandPalette} />

        <DocSidebarNav>
          <SidebarNav className="px-0 py-0 gap-3">
            {NAV.map((section) => (
              <SidebarNavSection key={section.title} title={section.title}>
                {section.entries?.map((e) => (
                  <Entry key={e.path} {...e} />
                ))}
                {section.categories?.map((cat) => (
                  <SidebarNavParent
                    key={cat.title}
                    title={cat.title}
                    leading={<Icon icon={cat.icon ?? PuzzleIcon} size={16} />}
                    defaultOpen={activeCategory === cat.title}
                  >
                    {cat.entries.map((e) => (
                      <NavLinkItem
                        key={e.path}
                        to={e.path}
                        indent
                        leading={e.icon ? <Icon icon={e.icon} size={14} /> : undefined}
                      >
                        {e.label}
                      </NavLinkItem>
                    ))}
                  </SidebarNavParent>
                ))}
              </SidebarNavSection>
            ))}
          </SidebarNav>
        </DocSidebarNav>

        <DocSidebarFooter>
          <Popover>
            <PopoverTrigger asChild>
              <DocSidebarUser
                avatar={
                  <span className="flex h-6 w-6 items-center justify-center rounded-pill bg-ink text-canvas">
                    <Icon icon={Settings02Icon} size={12} />
                  </span>
                }
                name="Settings"
                meta="Theme & shortcuts"
              />
            </PopoverTrigger>
            <SettingsMenu onOpenCheatsheet={onOpenCheatsheet} />
          </Popover>
        </DocSidebarFooter>
      </DocSidebar>

      <DocContent pulseKey={pathname}>
        <PageShell
          breadcrumb={<Breadcrumbs items={breadcrumbItems} />}
          appBarActions={<AppBarActions onOpenCheatsheet={onOpenCheatsheet} />}
        >
          {children}
        </PageShell>
      </DocContent>
    </DocShell>
  )
}

function SettingsMenu({ onOpenCheatsheet }: { onOpenCheatsheet: () => void }) {
  const { theme, toggle } = useTheme()
  return (
    <PopoverContent align="start" side="top" className="min-w-[240px] p-1" sideOffset={4}>
      <div className="px-2 pb-0.5 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        Settings
      </div>
      <button
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ink-2 transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-ink"
      >
        <Icon icon={theme === "dark" ? Sun02Icon : Moon02Icon} size={14} />
        <span className="flex-1">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        <Kbd size="sm">T</Kbd>
      </button>
      <button
        type="button"
        onClick={onOpenCheatsheet}
        className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ink-2 transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-ink"
      >
        <Icon icon={HelpCircleIcon} size={14} />
        <span className="flex-1">Keyboard shortcuts</span>
        <Kbd size="sm">?</Kbd>
      </button>
    </PopoverContent>
  )
}
