import { Link } from "react-router-dom"
import { Icon, cn } from "@cyanideui/ui"
import {
  CursorMagicSelection01Icon,
  PaintBoardIcon,
  SparklesIcon,
  PuzzleIcon,
  Layers01Icon,
  ArrowRight02Icon,
  FlashIcon,
  CodeIcon,
  Moon02Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { CodeBlock } from "../components/code-block"

const STATS = [
  { value: "65", label: "components" },
  { value: "22", label: "blocks" },
  { value: "5", label: "templates" },
  { value: "2", label: "shells" },
]

interface NavCard {
  title: string
  desc: string
  to: string
  icon: IconSvgElement
}

const EXPLORE: NavCard[] = [
  { title: "Foundations", desc: "Color, type, spacing, density, motion", to: "/foundations/color", icon: PaintBoardIcon },
  { title: "Motion", desc: "Token-driven transitions, reduced-motion safe", to: "/foundations/motion", icon: FlashIcon },
  { title: "Components", desc: "65 primitives — buttons, forms, overlays, tables", to: "/components/button", icon: CursorMagicSelection01Icon },
  { title: "Blocks", desc: "Composed, drop-in sections", to: "/blocks", icon: PuzzleIcon },
  { title: "Templates", desc: "Full-page reference screens", to: "/templates/dashboard", icon: Layers01Icon },
  { title: "Iconography", desc: "hugeicons, Stroke Rounded only", to: "/foundations/icons", icon: SparklesIcon },
]

export function IntroPage() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <header className="relative mb-9 overflow-hidden rounded-2xl border border-hairline bg-gradient-to-b from-canvas to-surface p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background:radial-gradient(var(--hairline)_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-3">
            <span className="h-1.5 w-1.5 rounded-pill bg-tone-success-fg" />
            Atrium UI · v1.3
          </div>
          <h1 className="m-0 max-w-[640px] text-[32px] font-semibold leading-tight tracking-tight text-ink">
            A calm, content-first component library for ERP &amp; admin apps.
          </h1>
          <p className="m-0 mt-3 max-w-[600px] text-[15px] leading-relaxed text-ink-2">
            Built with shadcn/ui patterns, Tailwind v4, and hugeicons. Inspired by Notion's calm
            surfaces, Shopify Polaris's compact chrome, and Linear's precision motion.
          </p>

          {/* Stat chips */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline gap-1.5 rounded-lg border border-hairline bg-canvas px-3 py-2"
              >
                <span className="text-[18px] font-semibold tabular-nums text-ink">{s.value}</span>
                <span className="text-[12px] text-ink-3">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- Explore grid ---------- */}
      <h2 className="mb-3 text-[15px] font-semibold text-ink">Explore</h2>
      <div className="mb-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {EXPLORE.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className={cn(
              "group flex items-start gap-3 rounded-xl border border-hairline bg-canvas p-4 no-underline",
              "transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-hairline-strong hover:shadow-elev-1",
            )}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2 transition-colors duration-[var(--dur-base)] group-hover:bg-ink group-hover:text-canvas">
              <Icon icon={c.icon} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                {c.title}
                <Icon
                  icon={ArrowRight02Icon}
                  size={14}
                  className="text-ink-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5 group-hover:text-ink-2"
                />
              </div>
              <p className="mt-0.5 text-[12.5px] text-ink-3">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ---------- Quick start ---------- */}
      <h2 className="mb-3 text-[15px] font-semibold text-ink">Quick start</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-hairline bg-canvas p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-surface-2 text-ink-2">
              <Icon icon={PuzzleIcon} size={13} />
            </span>
            <h3 className="m-0 text-[13.5px] font-semibold text-ink">Copy-paste (shadcn-style)</h3>
          </div>
          <p className="m-0 mb-3 text-[12.5px] text-ink-3">
            No token, no install. The CLI copies real source into your project.
          </p>
          <CodeBlock language="bash" code={`npx cyanideui add button table modal`} />
        </div>

        <div className="rounded-xl border border-hairline bg-canvas p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-surface-2 text-ink-2">
              <Icon icon={CodeIcon} size={13} />
            </span>
            <h3 className="m-0 text-[13.5px] font-semibold text-ink">Use as a library</h3>
          </div>
          <p className="m-0 mb-3 text-[12.5px] text-ink-3">
            Import from the package and pull in the token stylesheet.
          </p>
          <CodeBlock
            language="tsx"
            code={`import { Button } from "@cyanideui/ui"
import "@cyanideui/ui/styles/globals.css"`}
          />
        </div>
      </div>

      {/* ---------- Footer tips ---------- */}
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-hairline bg-surface px-4 py-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-canvas text-ink-2">
            <Icon icon={Moon02Icon} size={14} />
          </span>
          <p className="m-0 text-[12.5px] text-ink-3">
            Press <Kbd>T</Kbd> to toggle theme, <Kbd>D</Kbd> to cycle density, <Kbd>⌘K</Kbd> for the
            command palette.
          </p>
        </div>
        <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-hairline bg-surface px-4 py-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-canvas text-ink-2">
            <Icon icon={SparklesIcon} size={14} />
          </span>
          <p className="m-0 text-[12.5px] text-ink-3">
            Components are scaffolded in <code className="font-mono text-[11.5px]">packages/ui/src/components</code> — pages hot-reload on save.
          </p>
        </div>
      </div>
    </div>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-xs border border-hairline-strong bg-canvas px-1 font-mono text-[11px] text-ink-2">
      {children}
    </kbd>
  )
}
