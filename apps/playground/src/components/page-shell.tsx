import * as React from "react"
import { cn } from "@cyanideui/ui"
import { CodeBlock } from "./code-block"

/**
 * Showcase page shell — the shared chrome for every component reference page.
 * Polishing these three primitives upgrades all ~55 component pages at once
 * while keeping them uniform (the point of reference docs).
 *
 * (Distinct from the future <PageShell> *component* in @cyanideui/ui.)
 */

export function PageHeader({
  eyebrow,
  title,
  description,
  status,
}: {
  eyebrow?: string
  title: string
  description?: React.ReactNode
  status?: "stable" | "beta" | "todo"
}) {
  return (
    <header className="mb-9 border-b border-hairline pb-6">
      {eyebrow && (
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          {eyebrow}
        </div>
      )}
      <div className="flex items-center gap-3">
        <h1 className="m-0 text-[28px] font-semibold tracking-tight text-ink">{title}</h1>
        {status && (
          <span
            className={cn(
              "rounded-pill px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider",
              status === "stable" && "bg-tone-success-bg text-tone-success-fg",
              status === "beta" && "bg-tone-attention-bg text-tone-attention-fg",
              status === "todo" && "bg-tone-readonly-bg text-tone-readonly-fg"
            )}
          >
            {status}
          </span>
        )}
      </div>
      {description && (
        <p className="m-0 mt-2.5 max-w-[680px] text-[14.5px] leading-relaxed text-ink-2">
          {description}
        </p>
      )}
    </header>
  )
}

export function Section({
  title,
  description,
  children,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="mb-11">
      {title && (
        <h2 className="m-0 mb-1 text-[15px] font-semibold text-ink">{title}</h2>
      )}
      {description && (
        <p className="m-0 mb-3.5 max-w-[680px] text-[13px] leading-relaxed text-ink-3">
          {description}
        </p>
      )}
      {children}
    </section>
  )
}

export function Demo({
  children,
  code,
  language,
  className,
  align = "start",
  /** Render the preview on the faint dotted "stage" backdrop. Default false (plain canvas). */
  stage = false,
}: {
  children: React.ReactNode
  code?: string
  language?: "tsx" | "ts" | "css" | "html" | "bash" | "json"
  className?: string
  align?: "start" | "center"
  stage?: boolean
}) {
  return (
    <div className="mt-2">
      {/* Preview surface — unified with the code block below into one card. */}
      <div
        className={cn(
          "flex flex-wrap gap-3 border border-hairline bg-canvas p-6",
          code ? "rounded-t-xl" : "rounded-xl",
          align === "center" && "items-center justify-center",
          stage &&
            "bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] [background-size:14px_14px]",
          className
        )}
      >
        {children}
      </div>
      {code && <CodeBlock code={code} language={language} flush />}
    </div>
  )
}
