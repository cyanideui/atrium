import { useState } from "react"
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
  Copy01Icon,
  Tick02Icon,
  CheckmarkCircle02Icon,
  Github01Icon,
  BookOpen01Icon,
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

/* ---- inline copy-to-clipboard command line ---- */
function CommandLine({ command, comment }: { command: string; comment?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="flex items-center gap-2 rounded-lg border border-hairline bg-surface px-3 py-2">
      <span className="select-none font-mono text-[12px] text-ink-4">$</span>
      <code className="flex-1 truncate font-mono text-[12.5px] text-ink">
        {command}
        {comment && <span className="ml-2 text-ink-4"># {comment}</span>}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy command"
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-ink-3",
          "transition-[background-color,color,transform] duration-[var(--dur-fast)] hover:bg-surface-2 hover:text-ink active:scale-95",
        )}
      >
        <Icon icon={copied ? Tick02Icon : Copy01Icon} size={13} />
      </button>
    </div>
  )
}

/* ---- numbered onboarding step ---- */
function Step({
  n,
  title,
  children,
  last,
}: {
  n: number
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {/* connector rail */}
      {!last && <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-hairline" />}
      <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-pill border border-hairline bg-canvas text-[13px] font-semibold tabular-nums text-ink">
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <h3 className="m-0 mb-2 text-[14px] font-semibold text-ink">{title}</h3>
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  )
}

export function IntroPage() {
  const [path, setPath] = useState<"copy" | "lib">("copy")

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

          <div className="mt-5 max-w-[440px]">
            <CommandLine command="npx cyanideui init" comment="scaffold + add the shell" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5 rounded-lg border border-hairline bg-canvas px-3 py-2">
                <span className="text-[18px] font-semibold tabular-nums text-ink">{s.value}</span>
                <span className="text-[12px] text-ink-3">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ---------- Get started (path toggle) ---------- */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-[15px] font-semibold text-ink">Get started</h2>
        <div className="inline-flex rounded-lg border border-hairline bg-surface p-0.5">
          {[
            { id: "copy" as const, label: "Copy-paste" },
            { id: "lib" as const, label: "Install library" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setPath(t.id)}
              aria-pressed={path === t.id}
              className={cn(
                "rounded-md px-3 py-1 text-[12.5px] font-medium transition-colors duration-[var(--dur-fast)]",
                path === t.id ? "bg-canvas text-ink shadow-elev-1" : "text-ink-3 hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-9 rounded-xl border border-hairline bg-canvas p-6">
        {path === "copy" ? (
          <>
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-hairline bg-tone-success-bg/40 px-3.5 py-2.5">
              <Icon icon={CheckmarkCircle02Icon} size={16} className="mt-0.5 shrink-0 text-tone-success-fg" />
              <p className="m-0 text-[12.5px] leading-relaxed text-ink-2">
                <span className="font-medium text-ink">Recommended.</span> No token, no install, no{" "}
                <code className="font-mono text-[11.5px]">.npmrc</code>. The CLI copies real source into
                your <code className="font-mono text-[11.5px]">src/</code> — the code becomes yours to edit, just like shadcn/ui.
              </p>
            </div>

            <Step n={1} title="Scaffold a base app">
              <p className="m-0 text-[12.5px] text-ink-3">Any Tailwind v4 + React app works — Next.js or Vite.</p>
              <CommandLine command="npx create-next-app@latest my-app --ts --app --tailwind" />
            </Step>

            <Step n={2} title="Add the shell (or individual pieces)">
              <p className="m-0 text-[12.5px] text-ink-3">
                <code className="font-mono text-[11.5px]">shell-doc</code> copies the full chrome — sidebar, topbar,
                command palette, shortcuts — plus every component it needs. Or add primitives one at a time.
              </p>
              <CommandLine command="npx cyanideui add shell-doc" />
              <CommandLine command="npx cyanideui add button table modal" comment="or just what you need" />
            </Step>

            <Step n={3} title="Install the npm deps the CLI prints">
              <p className="m-0 text-[12.5px] text-ink-3">
                Copied files use Radix, cva, clsx, hugeicons. The CLI lists the exact set after each add.
              </p>
              <CommandLine command="npm install clsx tailwind-merge class-variance-authority @radix-ui/react-dialog" />
            </Step>

            <Step n={4} title="Wire Tailwind tokens">
              <p className="m-0 text-[12.5px] text-ink-3">
                Add one import to your Tailwind entry CSS. No <code className="font-mono text-[11.5px]">@source</code> needed —
                the components now live in your own <code className="font-mono text-[11.5px]">src/</code>.
              </p>
              <CodeBlock language="css" code={`@import "@cyanideui/ui/styles/globals.css";`} />
            </Step>

            <Step n={5} title="Mount the providers & run" last>
              <p className="m-0 text-[12.5px] text-ink-3">
                Wrap your root in <code className="font-mono text-[11.5px]">{`<ShellProviders>`}</code> (theme, density,
                toasts, palette), then start the dev server.
              </p>
              <CommandLine command="npm run dev" />
            </Step>
          </>
        ) : (
          <>
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-hairline bg-surface px-3.5 py-2.5">
              <Icon icon={CodeIcon} size={16} className="mt-0.5 shrink-0 text-ink-2" />
              <p className="m-0 text-[12.5px] leading-relaxed text-ink-2">
                Prefer a versioned install? The library publishes to GitHub Packages. This path needs a{" "}
                <code className="font-mono text-[11.5px]">read:packages</code> token + <code className="font-mono text-[11.5px]">.npmrc</code>.
                Most consumers should prefer copy-paste.
              </p>
            </div>

            <Step n={1} title="Install the package">
              <CommandLine command="pnpm add @cyanideui/ui" />
            </Step>

            <Step n={2} title="Import the token stylesheet">
              <p className="m-0 text-[12.5px] text-ink-3">Pull tokens + base styles into your Tailwind entry.</p>
              <CodeBlock language="css" code={`@import "@cyanideui/ui/styles/globals.css";\n@source "../../node_modules/@cyanideui/ui/dist";`} />
            </Step>

            <Step n={3} title="Use components" last>
              <CodeBlock
                language="tsx"
                code={`import { Button, Badge, Modal } from "@cyanideui/ui"

export function Toolbar() {
  return <Button variant="primary" tone="critical">Delete</Button>
}`}
              />
            </Step>
          </>
        )}
      </div>

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

      {/* ---------- Browse the registry ---------- */}
      <h2 className="mb-3 text-[15px] font-semibold text-ink">Browse everything in the registry</h2>
      <div className="mb-9 rounded-xl border border-hairline bg-canvas p-5">
        <p className="m-0 mb-3 text-[12.5px] text-ink-3">
          List every shell, template, block, and component you can copy in — served live from the public repo
          (no auth, no registry server).
        </p>
        <div className="max-w-[420px]">
          <CommandLine command="npx cyanideui list" comment="shells | templates | blocks | hooks" />
        </div>
      </div>

      {/* ---------- Footer tips + links ---------- */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="flex items-center gap-2.5 rounded-lg border border-hairline bg-surface px-4 py-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-canvas text-ink-2">
            <Icon icon={Moon02Icon} size={14} />
          </span>
          <p className="m-0 text-[12.5px] text-ink-3">
            Press <Kbd>T</Kbd> for theme, <Kbd>D</Kbd> for density, <Kbd>⌘K</Kbd> for the command palette.
          </p>
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border border-hairline bg-surface px-4 py-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-canvas text-ink-2">
            <Icon icon={SparklesIcon} size={14} />
          </span>
          <p className="m-0 text-[12.5px] text-ink-3">
            Every effect respects <code className="font-mono text-[11.5px]">prefers-reduced-motion</code> automatically.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="https://github.com/cyanideui/atrium"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-canvas px-3.5 py-2 text-[12.5px] font-medium text-ink-2 no-underline transition-colors duration-[var(--dur-base)] hover:border-hairline-strong hover:text-ink"
        >
          <Icon icon={Github01Icon} size={15} /> GitHub repository
        </a>
        <Link
          to="/foundations/color"
          className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-canvas px-3.5 py-2 text-[12.5px] font-medium text-ink-2 no-underline transition-colors duration-[var(--dur-base)] hover:border-hairline-strong hover:text-ink"
        >
          <Icon icon={BookOpen01Icon} size={15} /> Read the foundations
        </Link>
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
