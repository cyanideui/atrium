import * as React from "react"
import { Icon, cn } from "@cyanideui/ui"
import type { IconSvgElement } from "@hugeicons/react"

/**
 * Shared presentation primitives for the polished Foundations + overview pages.
 * Playground-only — these style the docs site, not the library.
 *
 *   <FoundationHero>  — eyebrow + title + status + lead + optional chip row
 *   <FoundationGroup> — icon + heading + hint, groups a set of cards
 *   <ShowcaseCard>    — titled card with a dotted "stage" for live demos
 *   <MetaChip>        — small token / stat chip
 */

export function FoundationHero({
  eyebrow,
  title,
  status = "stable",
  lead,
  children,
}: {
  eyebrow: string
  title: string
  status?: "stable" | "beta" | "todo"
  lead: React.ReactNode
  /** Optional chip row / extra content under the lead. */
  children?: React.ReactNode
}) {
  return (
    <header className="mb-7">
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        {eyebrow}
      </div>
      <div className="flex items-baseline gap-3">
        <h1 className="m-0 text-[26px] font-semibold tracking-tight text-ink">{title}</h1>
        <span
          className={cn(
            "rounded-pill px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider",
            status === "stable" && "bg-tone-success-bg text-tone-success-fg",
            status === "beta" && "bg-tone-attention-bg text-tone-attention-fg",
            status === "todo" && "bg-tone-readonly-bg text-tone-readonly-fg",
          )}
        >
          {status}
        </span>
      </div>
      <p className="m-0 mt-2 max-w-[680px] text-[14px] leading-relaxed text-ink-2">{lead}</p>
      {children && <div className="mt-4">{children}</div>}
    </header>
  )
}

export function FoundationGroup({
  icon,
  title,
  hint,
  children,
  className,
}: {
  icon: IconSvgElement
  title: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("mb-9", className)}>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-surface-2 text-ink-2">
          <Icon icon={icon} size={15} />
        </span>
        <div className="flex items-baseline gap-2">
          <h2 className="m-0 text-[15px] font-semibold text-ink">{title}</h2>
          {hint && <span className="text-[12px] text-ink-4">{hint}</span>}
        </div>
      </div>
      {children}
    </section>
  )
}

export function ShowcaseCard({
  title,
  desc,
  tag,
  footer,
  stage = true,
  children,
  className,
  onClick,
}: {
  title?: string
  desc?: string
  tag?: string
  footer?: React.ReactNode
  /** Render the demo on the dotted "stage" backdrop (default true). */
  stage?: boolean
  children: React.ReactNode
  className?: string
  /** When set, the whole card becomes a clickable button (pointer + keyboard). */
  onClick?: () => void
}) {
  const interactive = !!onClick
  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-hairline bg-canvas",
        "transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-hairline-strong hover:shadow-elev-1",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
    >
      {(title || tag) && (
        <div className="flex items-start justify-between gap-3 px-4 pt-3.5">
          <div className="min-w-0">
            {title && <h3 className="m-0 text-[13.5px] font-semibold text-ink">{title}</h3>}
            {desc && <p className="m-0 mt-0.5 text-[12px] leading-snug text-ink-3">{desc}</p>}
          </div>
          {tag && (
            <span className="shrink-0 rounded-pill bg-surface-2 px-2 py-0.5 font-mono text-[10px] font-medium text-ink-3">
              {tag}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "flex flex-1 items-center justify-center p-5",
          (title || tag) && "mx-4 mt-3 rounded-lg border border-dashed border-hairline",
          stage &&
            "bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] [background-size:14px_14px]",
        )}
      >
        {children}
      </div>
      {footer && (
        <div className="mt-3 flex items-center gap-1.5 border-t border-hairline px-4 py-2 text-[11px] text-ink-4">
          {footer}
        </div>
      )}
    </div>
  )
}

export function MetaChip({
  label,
  value,
  tone = "neutral",
}: {
  label: string
  value: string
  tone?: "neutral" | "info" | "attention"
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-canvas py-1 pl-1.5 pr-2.5 text-[11.5px]">
      <span
        className={cn(
          "rounded px-1.5 py-0.5 font-mono text-[10.5px] font-medium",
          tone === "neutral" && "bg-surface-2 text-ink-2",
          tone === "info" && "bg-tone-info-bg text-tone-info-fg",
          tone === "attention" && "bg-tone-attention-bg text-tone-attention-fg",
        )}
      >
        {value}
      </span>
      <code className="font-mono text-ink-3">{label}</code>
    </span>
  )
}
