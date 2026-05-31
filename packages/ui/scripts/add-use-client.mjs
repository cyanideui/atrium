// @ts-check
/**
 * Postbuild: prepend `"use client"` to every emitted JS chunk so the
 * library is treated as a client module by React Server Components
 * (Next.js App Router). tsup's `banner.js` option gets stripped by
 * treeshaking, so we patch each output file directly.
 *
 * Pure-prop primitives (Badge, Sparkline, etc.) still render server-side —
 * Next.js inserts a client boundary at the import site, which is the
 * correct behavior for a UI library that internally uses React state,
 * context, and Radix primitives.
 *
 * Walks every `.js` file in `dist/` (including subpath entry chunks like
 * `command-palette.js`, `date-picker.js`, and any shared chunks from
 * `splitting: true`).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { resolve, join } from "node:path"

const DIST = resolve(process.cwd(), "dist")
const DIRECTIVE = '"use client";\n'

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) yield* walk(full)
    else if (name.endsWith(".js")) yield full
  }
}

let patched = 0
let alreadyOk = 0
for (const file of walk(DIST)) {
  const current = readFileSync(file, "utf8")
  if (current.startsWith(DIRECTIVE.trim())) {
    alreadyOk++
    continue
  }
  writeFileSync(file, DIRECTIVE + current, "utf8")
  patched++
}

console.log(
  `[postbuild] prepended "use client" to ${patched} file${patched === 1 ? "" : "s"} ` +
    `(${alreadyOk} already had it)`,
)
