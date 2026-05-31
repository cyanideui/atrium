import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * <ImportPreview> — design.md §5.26
 * Top: 4-stat row (total / valid / warnings / errors).
 * Middle: pageable table with row-level status.
 * Bottom: primary CTA "Import N rows", disabled when errors exist.
 *
 * Headless-ish: consumer provides the rows + columns + render functions.
 * The component handles the layout, summary tiles, and CTA logic.
 */

export interface ImportPreviewSummary {
  total: number
  valid: number
  warnings: number
  errors: number
}

export interface ImportPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  summary: ImportPreviewSummary
  /** Children render the table (or any custom preview body). */
  children?: React.ReactNode
  /** CTA label — default: "Import N rows". */
  ctaLabel?: React.ReactNode
  /** Called when the user clicks the CTA. */
  onImport?: () => void
  /** Disable the CTA explicitly (in addition to the auto-disable on errors). */
  disabled?: boolean
  /** Override the auto-disable-on-errors behavior. */
  importWithErrors?: boolean
  /** Optional secondary action (e.g. cancel / edit mapping). */
  secondaryAction?: React.ReactNode
}

export function ImportPreview({
  className,
  summary,
  children,
  ctaLabel,
  onImport,
  disabled,
  importWithErrors,
  secondaryAction,
  ...rest
}: ImportPreviewProps) {
  const blocked = !importWithErrors && summary.errors > 0
  const finalDisabled = disabled || blocked
  const importable = summary.total - summary.errors

  return (
    <div className={cn("flex flex-col gap-4", className)} {...rest}>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Tile label="Total" value={summary.total} tone="default" />
        <Tile label="Valid" value={summary.valid} tone="success" />
        <Tile label="Warnings" value={summary.warnings} tone="warning" />
        <Tile label="Errors" value={summary.errors} tone="critical" />
      </div>

      {children && (
        <div className="overflow-hidden rounded-md border border-hairline bg-canvas">
          {children}
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        {secondaryAction}
        <button
          type="button"
          disabled={finalDisabled}
          onClick={onImport}
          className={cn(
            "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-3.5 text-[13px] font-semibold",
            "border border-ink bg-gradient-to-b from-[#404040] to-ink text-canvas",
            "transition-[background,opacity,transform] duration-[var(--dur-base)]",
            "[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.20),inset_0_-1px_0_0_rgba(0,0,0,0.30)]",
            "hover:from-[#2e2e2e] hover:to-[#0d0d0d] active:translate-y-px",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {ctaLabel ?? `Import ${importable} ${importable === 1 ? "row" : "rows"}`}
        </button>
      </div>
    </div>
  )
}

function Tile({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "default" | "success" | "warning" | "critical"
}) {
  const valueColor = {
    default: "text-ink",
    success: "text-success",
    warning: "text-warning",
    critical: "text-error",
  }[tone]
  return (
    <div className="rounded-md border border-hairline bg-canvas p-3">
      <div className={cn("text-[24px] font-semibold tabular-nums leading-none", valueColor)}>
        {value.toLocaleString()}
      </div>
      <div className="mt-1.5 text-[12px] text-ink-3">{label}</div>
    </div>
  )
}

/* Convenience badge to use inside the table's status column. */
export interface ImportRowStatusBadgeProps {
  status: "ready" | "warning" | "error"
  children?: React.ReactNode
}

export function ImportRowStatusBadge({ status, children }: ImportRowStatusBadgeProps) {
  if (status === "ready")
    return (
      <Badge tone="success" size="sm">
        {children ?? "Ready"}
      </Badge>
    )
  if (status === "warning")
    return (
      <Badge tone="warning" size="sm">
        {children ?? "Warning"}
      </Badge>
    )
  return (
    <Badge tone="critical" size="sm">
      {children ?? "Error"}
    </Badge>
  )
}
