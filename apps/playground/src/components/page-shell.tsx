import * as React from "react"
import { cn } from "@atrium/ui"
import { CodeBlock } from "./code-block"

/**
 * Showcase page shell. Provides title, eyebrow, description, and a Section helper.
 * (Distinct from the future <PageShell> *component* in @atrium/ui.)
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
    <header className="mb-8 ds-prose">
      {eyebrow && (
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          {eyebrow}
        </div>
      )}
      <div className="flex items-baseline gap-3">
        <h1>{title}</h1>
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
      {description && <p className="text-[14px]">{description}</p>}
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
    <section className="mb-10">
      {title && (
        <h2 className="mb-1 text-base font-semibold text-ink">{title}</h2>
      )}
      {description && (
        <p className="mb-3 max-w-[720px] text-[13px] text-ink-3">
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
  className,
  align = "start",
}: {
  children: React.ReactNode
  code?: string
  className?: string
  align?: "start" | "center"
}) {
  return (
    <div className="mt-2">
      <div
        className={cn(
          "flex flex-wrap gap-3 rounded-md border border-hairline bg-canvas p-6",
          align === "center" && "items-center justify-center",
          className
        )}
      >
        {children}
      </div>
      {code && <CodeBlock code={code} />}
    </div>
  )
}
