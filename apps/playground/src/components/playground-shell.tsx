import * as React from "react"
import { Link, useLocation } from "react-router-dom"
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
} from "@atrium/ui"
import {
  Settings02Icon,
  Moon02Icon,
  Sun02Icon,
  HelpCircleIcon,
  PuzzleIcon,
  GithubIcon,
} from "@hugeicons/core-free-icons"
import { NAV } from "../nav"
import { useTheme } from "../hooks/use-theme"
import { NavLinkItem } from "./nav-link-item"

interface PlaygroundShellProps {
  children: React.ReactNode
  /** Open the global cheatsheet from the app-bar help button. */
  onOpenCheatsheet: () => void
  /** Open the command palette from the sidebar search button or ⌘K. */
  onOpenCommandPalette: () => void
}

/**
 * Renders one nav entry. Adds the "todo" badge for stub pages.
 */
function Entry({
  label,
  path,
  status,
  icon,
  indent,
}: {
  label: string
  path: string
  status: "done" | "todo"
  icon?: React.ComponentProps<typeof Icon>["icon"]
  indent?: boolean
}) {
  return (
    <NavLinkItem
      to={path}
      indent={indent}
      leading={icon ? <Icon icon={icon} size={indent ? 14 : 16} /> : undefined}
      badge={
        status === "todo" ? (
          <span className="rounded-pill bg-tone-readonly-bg px-1.5 py-px text-[10px] font-medium uppercase tracking-wider text-tone-readonly-fg">
            todo
          </span>
        ) : undefined
      }
    >
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

function PlaygroundAppBarActions({
  onOpenCheatsheet,
}: {
  onOpenCheatsheet: () => void
}) {
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
      <PageShellAction
        icon={<Icon icon={GithubIcon} size={14} />}
        label="GitHub"
        href="https://github.com"
      />
    </>
  )
}

export function PlaygroundShell({
  children,
  onOpenCheatsheet,
  onOpenCommandPalette,
}: PlaygroundShellProps) {
  const location = useLocation()

  // Auto-open the Components category that contains the active route, so users
  // landing on /components/button see "Actions" pre-expanded.
  const activeCategory = React.useMemo(() => {
    const path = location.pathname
    for (const section of NAV) {
      if (!section.categories) continue
      for (const cat of section.categories) {
        if (cat.entries.some((e) => e.path === path)) return cat.title
      }
    }
    return null
  }, [location.pathname])

  const crumb = React.useMemo(
    () => findBreadcrumb(location.pathname),
    [location.pathname]
  )

  const breadcrumbItems = React.useMemo(() => {
    if (!crumb) return [{ label: "Introduction" }]
    const base: { label: string }[] = [{ label: crumb.section }]
    if (crumb.category) base.push({ label: crumb.category })
    base.push({ label: crumb.label })
    return base
  }, [crumb])

  return (
    <DocShell defaultBodyWidth="centered">
      <DocSidebar>
        <Link to="/" className="block no-underline">
          <DocSidebarBrand logo="A" name="Atrium UI" meta="Design System" />
        </Link>

        <DocSidebarSearch
          placeholder="Search components…"
          onClick={onOpenCommandPalette}
        />

        <DocSidebarNav>
          <SidebarNav className="px-0 py-0 gap-3">
            {NAV.map((section) => (
              <SidebarNavSection key={section.title} title={section.title}>
                {section.entries?.map((e) => (
                  <Entry key={e.path} {...e} />
                ))}
                {section.categories?.map((cat) => {
                  const shouldOpen = activeCategory === cat.title
                  return (
                    <SidebarNavParent
                      key={cat.title}
                      title={cat.title}
                      leading={
                        cat.icon ? (
                          <Icon icon={cat.icon} size={16} />
                        ) : (
                          <Icon icon={PuzzleIcon} size={16} />
                        )
                      }
                      defaultOpen={shouldOpen}
                    >
                      {cat.entries.map((e) => (
                        <Entry key={e.path} {...e} indent />
                      ))}
                    </SidebarNavParent>
                  )
                })}
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

      <DocContent pulseKey={location.pathname}>
        <PageShell
          breadcrumb={<Breadcrumbs items={breadcrumbItems} />}
          appBarActions={
            <PlaygroundAppBarActions onOpenCheatsheet={onOpenCheatsheet} />
          }
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
      <div className="my-0.5 h-px bg-hairline" />
      <a
        href="/design.md"
        className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ink-2 transition-colors duration-[var(--dur-fast)] hover:bg-surface hover:text-ink"
      >
        <Icon icon={HelpCircleIcon} size={14} />
        Read design.md
      </a>
    </PopoverContent>
  )
}
