import { Icon } from "@/components/ui/icon"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowUpRight01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

/**
 * MetricComparison — compares this-period vs last-period metrics. Each row
 * shows the current value, the prior value, a signed delta, and a bar scaled
 * to the metric's share of the group max. Use for "this month vs last month"
 * style summaries.
 *
 * Swap METRICS for your data; `goodWhenUp` flips the delta color for metrics
 * where down is better (e.g. churn, cost).
 */

interface Metric {
  label: string
  current: number
  previous: number
  format?: (n: number) => string
  goodWhenUp?: boolean
}

const fmtCurrency = (n: number) => `$${n.toLocaleString()}`
const fmtNumber = (n: number) => n.toLocaleString()

const METRICS: Metric[] = [
  { label: "Revenue", current: 124592, previous: 110800, format: fmtCurrency, goodWhenUp: true },
  { label: "Orders", current: 1847, previous: 1706, format: fmtNumber, goodWhenUp: true },
  { label: "Avg. order value", current: 67, previous: 65, format: fmtCurrency, goodWhenUp: true },
  { label: "Refund rate", current: 2, previous: 3, format: (n) => `${n}%`, goodWhenUp: false },
]

function pct(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : 100
  return ((current - previous) / previous) * 100
}

export function MetricComparison() {
  const max = Math.max(...METRICS.map((m) => m.current))

  return (
    <section className="rounded-md border border-hairline bg-canvas">
      <header className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
        <h2 className="m-0 text-[13px] font-semibold text-ink">This month vs last</h2>
        <span className="text-[11px] uppercase tracking-wider text-ink-4">May vs Apr</span>
      </header>
      <ul className="m-0 flex list-none flex-col divide-y divide-hairline p-0">
        {METRICS.map((m) => {
          const delta = pct(m.current, m.previous)
          const up = delta >= 0
          const good = up === (m.goodWhenUp ?? true)
          const fmt = m.format ?? fmtNumber
          return (
            <li key={m.label} className="flex flex-col gap-1.5 px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] text-ink-2">{m.label}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-[12px] font-medium tabular-nums",
                    good ? "text-success" : "text-error",
                  )}
                >
                  <Icon icon={up ? ArrowUpRight01Icon : ArrowDown01Icon} size={12} aria-hidden />
                  {up ? "+" : ""}
                  {delta.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[18px] font-semibold tabular-nums tracking-tight text-ink">
                  {fmt(m.current)}
                </span>
                <span className="text-[12px] tabular-nums text-ink-4">from {fmt(m.previous)}</span>
              </div>
              <Progress value={(m.current / max) * 100} tone={good ? "success" : "critical"} size="sm" />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
