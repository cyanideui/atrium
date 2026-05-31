import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

/**
 * Vitest config — smoke-test layer for the library.
 *
 * Scope:
 *   - One test file per critical component verifying it renders without
 *     crashing, accepts core props, and fires basic interactions.
 *   - Hook tests for useDensity, useTheme, useShortcutToasts.
 *
 * NOT in scope (yet):
 *   - Visual regression / pixel diffs (would need Playwright + screenshot infra).
 *   - Full a11y audits (axe-core in CI is the right next step).
 *
 * jsdom environment because Radix primitives + cmdk both rely on DOM APIs
 * (ResizeObserver, getBoundingClientRect, etc.). We polyfill the missing
 * ones in `vitest.setup.ts`.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: false,
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "dist"],
  },
})
