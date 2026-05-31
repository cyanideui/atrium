import { Icon } from "@/components/ui/icon"
import { Sparkline } from "@/components/ui/sparkline"
import { cn } from "@/lib/utils"
import { ArrowUpRight01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

/**
 * StatCards — a responsive row of KPI tiles, each with a value, a trend
 * delta, and an inline sparkline. Drop it at the top of any overview screen.
 *
 * Swap the STATS array for your real metrics.
 */

interface Stat {
  label: string
  value: string
  delta: string
  up: boolean
  spark: number[]
}

const STATS: Stat[] = [
  { label: "Total revenue", value: "$124,592", delta: "+12.5%", up: true, spark: [12, 15, 14, 18, 22, 20, 24, 28, 27, 32, 30, 36] },
  { label: "Orders", value: "1,847", delta: "+8.2%", up: true, spark: [40, 38, 42, 45, 48, 47, 50, 52, 51, 55, 58, 60] },
  { label: "Pending", value: "342", delta: "−2.1%", up: false, spark: [80, 75, 78, 72, 70, 68, 65, 62, 60, 58, 55, 52] },
  { label: "Fulfillment", value: "98.2%", delta: "+0.4%", up: true, spark: [94, 95, 95, 96, 96, 97, 97, 98, 98, 98, 98, 98] },
]

export function StatCards() {
  return (
    <section aria-label="Key metrics" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-2 rounded-md border border-hairline bg-canvas p-4"
        >
          <div className="flex items-baseline justify-between gap-2">
            <div className="min-w-0 truncate text-[12px] uppercase tracking-wider text-ink-3">
              {stat.label}
            </div>
            <div
              className={cn(
                "inline-flex shrink-0 items-center gap-0.5 text-[12px] font-medium tabular-nums",
                stat.up ? "text-success" : "text-error",
              )}
            >
              <Icon icon={stat.up ? ArrowUpRight01Icon : ArrowDown01Icon} size={12} />
              {stat.delta}
            </div>
          </div>
          <div className="text-[24px] font-semibold tabular-nums tracking-tight text-ink">
            {stat.value}
          </div>
          <Sparkline
            data={stat.spark}
            tone={stat.up ? "success" : "critical"}
            height={32}
            className="-mx-1"
          />
        </div>
      ))}
    </section>
  )
}
