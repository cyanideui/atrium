import * as React from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/lib/use-reduced-motion"

/**
 * <AnimatedNumber> — transitions.dev "Number pop-in / count-up" (§motion)
 *
 * Tweens a numeric value when it changes — ideal for KPI tiles, metric deltas,
 * totals. Two presentation modes:
 *   • mode="count" (default) — counts up/down to the new value over `duration`
 *     using requestAnimationFrame + an ease-out curve.
 *   • mode="pop" — keeps the value instant but plays a per-digit flip/blur
 *     (the `.ds-digit` keyframe) so the number "rolls" into place.
 *
 * Reduced motion: respected at the JS level. When the user has motion
 * disabled, the value is set instantly with no tween and no digit animation —
 * `useReducedMotion()` gates both paths (CSS alone can't stop a rAF tween).
 *
 * Formatting: pass `format` to control rendering (e.g. currency). Defaults to
 * `toLocaleString()`. Always renders tabular-nums so width stays stable.
 */

export interface AnimatedNumberProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  value: number
  /** Animation style. "count" tweens the value; "pop" flips digits in place. */
  mode?: "count" | "pop"
  /** Tween duration in ms (count mode). Defaults to 600. */
  duration?: number
  /** Decimal places to render. Defaults to 0. */
  decimals?: number
  /** Custom formatter — receives the (possibly mid-tween) number. */
  format?: (n: number) => string
  /** Content rendered before the animated digits (e.g. "$"). */
  leading?: React.ReactNode
  /** Content rendered after the animated digits (e.g. "%"). */
  trailing?: React.ReactNode
  /** Count up from 0 on first mount (count mode). Combine with a changing
   *  `key` to replay on demand. Default false (animate only on value change). */
  animateOnMount?: boolean
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export const AnimatedNumber = React.forwardRef<HTMLSpanElement, AnimatedNumberProps>(
  (
    { className, value, mode = "count", duration = 600, decimals = 0, format, leading, trailing, animateOnMount = false, ...rest },
    ref,
  ) => {
    const reduced = useReducedMotion()
    const fmt = React.useCallback(
      (n: number) => (format ? format(n) : n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })),
      [format, decimals],
    )

    // When animating on mount (count mode), start the display at 0 so the first
    // tween actually has distance to travel.
    const [display, setDisplay] = React.useState(animateOnMount && mode === "count" && !reduced ? 0 : value)
    const fromRef = React.useRef(animateOnMount && mode === "count" && !reduced ? 0 : value)
    const rafRef = React.useRef<number | null>(null)
    const firstRender = React.useRef(true)

    // COUNT mode: rAF tween from previous value → new value.
    React.useEffect(() => {
      if (mode !== "count") return
      // On first paint: tween from 0 if animateOnMount, otherwise snap to value.
      if (firstRender.current) {
        firstRender.current = false
        if (!animateOnMount || reduced || duration <= 0) {
          fromRef.current = value
          setDisplay(value)
          return
        }
        // fall through to run the mount tween (from 0 → value)
      } else if (reduced || duration <= 0) {
        fromRef.current = value
        setDisplay(value)
        return
      }
      const from = fromRef.current
      const delta = value - from
      if (delta === 0) return
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        setDisplay(from + delta * easeOutCubic(t))
        if (t < 1) rafRef.current = requestAnimationFrame(tick)
        else fromRef.current = value
      }
      rafRef.current = requestAnimationFrame(tick)
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }, [value, duration, mode, reduced, animateOnMount])

    // POP mode tracks first-render so initial mount doesn't animate.
    React.useEffect(() => {
      if (mode === "pop") firstRender.current = false
    }, [mode, value])

    if (mode === "pop") {
      const str = fmt(value)
      const animate = !reduced && !firstRender.current
      return (
        <span
          ref={ref}
          className={cn("inline-flex tabular-nums", className)}
          {...rest}
        >
          {leading}
          {/* key on value forces a fresh mount → digits replay the pop. */}
          <span key={value} className="inline-flex overflow-hidden">
            {[...str].map((ch, i) => (
              <span
                key={i}
                className={animate ? "ds-digit" : "inline-block"}
                style={animate ? { animationDelay: `${i * 30}ms` } : undefined}
              >
                {ch}
              </span>
            ))}
          </span>
          {trailing}
        </span>
      )
    }

    // COUNT mode.
    const rounded = decimals > 0 ? display : Math.round(display)
    return (
      <span ref={ref} className={cn("tabular-nums", className)} {...rest}>
        {leading}
        {fmt(rounded)}
        {trailing}
      </span>
    )
  },
)
AnimatedNumber.displayName = "AnimatedNumber"
