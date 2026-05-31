import { defineConfig } from "tsup"

/**
 * The CLI bundles to a single ESM file with a Node shebang so it can be
 * run via `pnpm dlx @cyanideui/cli` or installed globally. Node built-ins +
 * the three runtime deps stay external (installed alongside the package).
 */
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  platform: "node",
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  external: ["commander", "picocolors", "prompts"],
})
