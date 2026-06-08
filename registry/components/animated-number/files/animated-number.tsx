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
 * Replay: combine `animateOnMount` with a changing React `key` to re-fire the
 * animation on demand (the playground Play buttons remount via key).
 *
 * Reduced motion: respected at the JS level. When the user has motion
 * disabled, the value is set instantly with no tween and no digit animation —
 * `useReducedMotion()` gates both paths (CSS alone can't stop a rAF tween).
 *
 * Formatting: pass `format` to control rendering (e.g. currency). Defaults to
 * `toLocaleString()`. Always renders tabular-nums so width stays stable.
 *
 * Implementation note: animation triggers are derived from the initial state
 * and from value-vs-previous comparisons only — never from a "first render"
 * ref mutated inside an effect. That keeps it correct under React StrictMode,
 * whose double-invoked effects would otherwise cancel the mount animation.
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
  /** Animate on first mount (count up from 0 / pop the digits). Combine with a
   *  changing `key` to replay on demand. Default false (animate only when the
   *  value changes after mount). */
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

    // Whether a mount animation is wanted (count tweens from 0, pop flips).
    const mountAnimate = animateOnMount && !reduced

    /* ---------------- COUNT mode ---------------- */
    // Seed the display at 0 when we want a mount count-up so the first tween
    // has distance to travel; otherwise start settled at `value`.
    const [display, setDisplay] = React.useState(
      mountAnimate && mode === "count" ? 0 : value,
    )
    // `from` for the next tween. Only updated when a tween settles, so a
    // StrictMode-cancelled mount tween restarts from the same origin (no snap).
    const fromRef = React.useRef(mountAnimate && mode === "count" ? 0 : value)

    React.useEffect(() => {
      if (mode !== "count") {
        // keep display in sync (unused by pop render, but cheap + correct)
        fromRef.current = value
        setDisplay(value)
        return
      }
      const from = fromRef.current
      if (reduced || duration <= 0 || from === value) {
        fromRef.current = value
        setDisplay(value)
        return
      }
      const delta = value - from
      const start = performance.now()
      let raf = 0
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        setDisplay(from + delta * easeOutCubic(t))
        if (t < 1) raf = requestAnimationFrame(tick)
        else fromRef.current = value
      }
      raf = requestAnimationFrame(tick)
      return () => {
        if (raf) cancelAnimationFrame(raf)
      }
    }, [value, duration, mode, reduced])

    /* ---------------- POP mode ---------------- */
    // `popToken` keys the digit container so each change remounts it → the CSS
    // digit-pop animation re-fires. Seeded to 1 when animating on mount.
    const [popToken, setPopToken] = React.useState(mountAnimate && mode === "pop" ? 1 : 0)
    const prevValueRef = React.useRef(value)

    React.useEffect(() => {
      if (mode !== "pop" || reduced) {
        prevValueRef.current = value
        return
      }
      if (value !== prevValueRef.current) {
        prevValueRef.current = value
        setPopToken((t) => t + 1)
      }
    }, [value, mode, reduced])

    if (mode === "pop") {
      const str = fmt(value)
      const animating = popToken > 0
      return (
        <span ref={ref} className={cn("inline-flex tabular-nums", className)} {...rest}>
          {leading}
          {/* key on popToken forces a fresh mount → digits replay the pop. */}
          <span key={popToken} className="inline-flex overflow-hidden">
            {[...str].map((ch, i) => (
              <span
                key={i}
                className={animating ? "ds-digit" : "inline-block"}
                style={animating ? { animationDelay: `${i * 30}ms` } : undefined}
              >
                {ch}
              </span>
            ))}
          </span>
          {trailing}
        </span>
      )
    }

    // COUNT mode render.
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
