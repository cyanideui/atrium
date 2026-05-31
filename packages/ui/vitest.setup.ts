import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

/**
 * Test setup — polyfills + cleanup.
 *
 * Why polyfills?
 *   Radix primitives use ResizeObserver and IntersectionObserver to track
 *   sizing. jsdom doesn't ship them. We provide minimal stubs so tests
 *   render without throwing.
 *
 *   matchMedia is needed by useTheme's "prefers-color-scheme: dark" check.
 *
 *   scrollIntoView is called by cmdk when navigating items.
 */

// ResizeObserver
class ResizeObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverPolyfill as unknown as typeof ResizeObserver

// IntersectionObserver
class IntersectionObserverPolyfill {
  root = null
  rootMargin = ""
  thresholds = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver =
  IntersectionObserverPolyfill as unknown as typeof IntersectionObserver

// matchMedia
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// scrollIntoView (jsdom doesn't ship it)
if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function () {}
}

// PointerEvent — Radix uses pointer events; jsdom only ships MouseEvent.
if (typeof window !== "undefined" && !window.PointerEvent) {
  // @ts-expect-error — minimal stub
  window.PointerEvent = class PointerEvent extends MouseEvent {}
}

// hasPointerCapture / releasePointerCapture — Radix's internal pointer logic.
if (typeof Element !== "undefined") {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = function () {
      return false
    }
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = function () {}
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = function () {}
  }
}

// Auto-cleanup the rendered tree after each test.
afterEach(() => {
  cleanup()
})
