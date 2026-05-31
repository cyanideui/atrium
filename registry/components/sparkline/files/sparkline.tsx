import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * <Sparkline> — design.md §5.27
 * Inline SVG, smooth line, filled area at low opacity. Color-aware.
 */

export interface SparklineProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children"> {
  data: number[]
  width?: number
  height?: number
  /** Stroke width in px. */
  strokeWidth?: number
  /** Color tone. Defaults to ink. */
  tone?: "default" | "success" | "warning" | "critical" | "info"
  /** Show an end-point dot. */
  showEnd?: boolean
}

const TONE: Record<NonNullable<SparklineProps["tone"]>, string> = {
  default:  "var(--ink)",
  success:  "var(--success)",
  warning:  "var(--warning)",
  critical: "var(--error)",
  info:     "var(--info)",
}

function buildPath(data: number[], w: number, h: number, padding = 2) {
  if (data.length === 0) return { line: "", area: "" }
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = (w - padding * 2) / Math.max(data.length - 1, 1)
  const points = data.map((v, i) => {
    const x = padding + i * stepX
    const y = padding + (1 - (v - min) / range) * (h - padding * 2)
    return [x, y] as const
  })

  // Smooth path using Catmull-Rom -> cubic Bézier conversion.
  const line = points.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x.toFixed(2)} ${y.toFixed(2)}`
    const [px, py] = arr[i - 1]!
    const [nx, ny] = arr[Math.min(i + 1, arr.length - 1)]!
    const [ppx, ppy] = arr[Math.max(i - 2, 0)]!
    const cp1x = px + (x - ppx) / 6
    const cp1y = py + (y - ppy) / 6
    const cp2x = x - (nx - px) / 6
    const cp2y = y - (ny - py) / 6
    return `${acc} C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${x.toFixed(2)} ${y.toFixed(2)}`
  }, "")

  const area = `${line} L ${points[points.length - 1]![0].toFixed(2)} ${(h - padding).toFixed(2)} L ${points[0]![0].toFixed(2)} ${(h - padding).toFixed(2)} Z`
  const last = points[points.length - 1]!
  return { line, area, last }
}

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  ({ className, data, width = 80, height = 24, strokeWidth = 1.5, tone = "default", showEnd = false, ...rest }, ref) => {
    const { line, area, last } = buildPath(data, width, height)
    const color = TONE[tone]
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cn("inline-block align-middle", className)}
        aria-hidden
        {...rest}
      >
        <path d={area} fill={color} fillOpacity={0.08} />
        <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        {showEnd && last && (
          <circle cx={last[0]} cy={last[1]} r={2.25} fill={color} />
        )}
      </svg>
    )
  }
)
Sparkline.displayName = "Sparkline"
