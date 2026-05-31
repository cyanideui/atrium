import * as React from "react"

/**
 * useScrollOverlay — drives the `.ds-scroll-overlay` CSS class.
 *
 * Returns a ref to attach to your scroll container plus a `pulse()` trigger
 * for Bonus 2 (one-shot color flash on the scrollbar thumb when new content
 * appears, e.g. infinite scroll, route change).
 *
 * Behaviour:
 *   - Sets `data-scrolling="true"` on the element while the user is actively
 *     scrolling, then clears it after `idleMs` (default 300 ms) of no scroll
 *     events. The CSS fades the thumb in/out on this attribute.
 *   - `pulse()` sets `data-pulse="true"` for 800 ms, playing the
 *     `ds-scroll-pulse` keyframes once.
 *
 * Usage:
 *   const { ref, pulse } = useScrollOverlay()
 *   useEffect(() => { pulse() }, [routeKey])
 *   return <div ref={ref} className="ds-scroll-overlay overflow-auto">…</div>
 */
export interface UseScrollOverlayOptions {
  /** Idle delay before the scrollbar fades back out. Default 300 ms. */
  idleMs?: number
}

export interface UseScrollOverlayReturn<E extends HTMLElement = HTMLElement> {
  ref: React.MutableRefObject<E | null>
  pulse: () => void
}

export function useScrollOverlay<E extends HTMLElement = HTMLElement>(
  { idleMs = 300 }: UseScrollOverlayOptions = {}
): UseScrollOverlayReturn<E> {
  const ref = React.useRef<E | null>(null)
  const idleTimer = React.useRef<number | null>(null)
  const pulseTimer = React.useRef<number | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      el.setAttribute("data-scrolling", "true")
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
      idleTimer.current = window.setTimeout(() => {
        el.removeAttribute("data-scrolling")
      }, idleMs)
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      el.removeEventListener("scroll", onScroll)
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
    }
  }, [idleMs])

  const pulse = React.useCallback(() => {
    const el = ref.current
    if (!el) return
    // Force a reflow so the animation restarts even if it's already playing.
    el.removeAttribute("data-pulse")
    void el.offsetWidth
    el.setAttribute("data-pulse", "true")
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current)
    pulseTimer.current = window.setTimeout(() => {
      el.removeAttribute("data-pulse")
    }, 850)
  }, [])

  React.useEffect(
    () => () => {
      if (pulseTimer.current) window.clearTimeout(pulseTimer.current)
    },
    []
  )

  return { ref, pulse }
}
