import { defineConfig } from "tsup"

/**
 * Build configuration.
 *
 * Three entry points:
 *   - `src/index.ts`            → the main `@cyanideui/ui` import. Re-exports
 *                                  everything for one-stop convenience.
 *   - `src/command-palette.ts`  → `@cyanideui/ui/command-palette` subpath.
 *                                  Pulls cmdk (~30 KB) only when imported.
 *   - `src/date-picker.ts`      → `@cyanideui/ui/date-picker` subpath. Pulls
 *                                  react-day-picker (~80 KB) only when imported.
 *
 * Bundle-size-conscious consumers can opt out of the heavy components by
 * importing the rest of the library from the main entry and using subpath
 * imports for the heavy ones — the main bundle then tree-shakes them out.
 *
 * `splitting: true` produces shared chunks across entries so common deps
 * (Radix primitives, our cn helper, Icon, etc.) aren't duplicated.
 */
export default defineConfig({
  entry: [
    "src/index.ts",
    "src/command-palette.ts",
    "src/date-picker.ts",
  ],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
})
