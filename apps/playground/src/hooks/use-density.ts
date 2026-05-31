/**
 * Backwards-compatible re-export of the library's density API.
 *
 * The playground used to own `useDensity()`, the `D` hotkey listener, and
 * the localStorage plumbing. All of that now lives in `@cyanideui/ui` so any
 * consumer (Next.js example app, future ERP shells) gets the same wiring
 * for free. This file is kept as a thin alias so existing imports across
 * the playground keep working without a global rename.
 */
export {
  DensityProvider,
  DensityRoot,
  useDensity,
  useDensityHotkey,
  DENSITIES,
  DEFAULT_DENSITY,
  type Density,
} from "@cyanideui/ui"
