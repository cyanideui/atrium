import { defineConfig } from "tsup"
import { readFileSync } from "node:fs"

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"))

/**
 * The CLI bundles to a single ESM file with a Node shebang so it can be
 * run via `npx cyanideui` or installed globally. Node built-ins +
 * the three runtime deps stay external (installed alongside the package).
 *
 * The version is injected at build time from package.json so `--version`
 * can never drift from the published version.
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
  define: {
    __CLI_VERSION__: JSON.stringify(pkg.version),
  },
  banner: {
    js: "#!/usr/bin/env node",
  },
  external: ["commander", "picocolors", "prompts"],
})
