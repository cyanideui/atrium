import * as React from "react"

/**
 * useReducedMotion — subscribes to the OS/browser
 * `prefers-reduced-motion: reduce` setting.
 *
 * CSS transitions/animations already collapse to 0ms via the global rule in
 * globals.css. This hook is for **JS-driven** motion (e.g. the count-up tween
 * in <AnimatedNumber>) that CSS can't reach — so the component can skip the
 * tween and jump straight to the final value when motion is disabled.
 *
 * SSR-safe: defaults to `false` (animated) on the server and during the first
 * client render, then syncs on mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    // Safari <14 uses addListener.
    if (mq.addEventListener) mq.addEventListener("change", onChange)
    else mq.addListener(onChange)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange)
      else mq.removeListener(onChange)
    }
  }, [])

  return reduced
}
