// @ts-check
/**
 * Rewrites `@cyanideui/ui` imports in the shell/template/hook registry items
 * to consumer-local `@/` aliases, so those items are pure copy-paste (no
 * installed library needed). Also rewrites the registry `meta.json` deps:
 * drops `@cyanideui/ui` from npm deps and adds the matching `component-*` /
 * `lib-*` registry deps so the CLI pulls them transitively.
 *
 * Builds the export→file map by scanning packages/ui/src/components/*.tsx
 * for `export ... Name`. Multi-symbol files (e.g. select.tsx exports
 * Select, SelectTrigger, ...) all map to the same component item.
 *
 * Run: node scripts/rewrite-registry-imports.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs"
import { join, resolve, dirname, basename } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, "..")
const COMP_SRC = join(repoRoot, "packages/ui/src/components")
const REG = join(repoRoot, "registry")

// --- Build symbol → component-file map ---
/** @type {Record<string, string>} */
const symbolToComponent = {}
for (const f of readdirSync(COMP_SRC).filter((x) => x.endsWith(".tsx"))) {
  const name = basename(f, ".tsx")
  const content = readFileSync(join(COMP_SRC, f), "utf8")
  // Match exported const/function/class + re-exported names.
  const re = /export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g
  let m
  while ((m = re.exec(content))) symbolToComponent[m[1]] = name
}
// cn + hooks live in lib.
symbolToComponent["cn"] = "__lib_utils__"

// Items to rewrite: every shell/template/hook registry file.
const TARGET_DIRS = ["shells", "templates", "hooks"]

/** Parse the named imports out of a `import { a, b } from "@cyanideui/ui"` block. */
function parseCyanideImports(content) {
  const re = /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*"@cyanideui\/ui"/g
  const symbols = []
  let m
  while ((m = re.exec(content))) {
    for (const part of m[1].split(",")) {
      const s = part.replace(/\btype\b/, "").trim()
      if (s) symbols.push(s.replace(/\s+as\s+.+$/, "").trim())
    }
  }
  return symbols
}

let filesChanged = 0
let metasChanged = 0

for (const td of TARGET_DIRS) {
  const base = join(REG, td)
  if (!existsSync(base)) continue
  for (const itemId of readdirSync(base)) {
    const itemDir = join(base, itemId)
    const filesDir = join(itemDir, "files")
    if (!existsSync(filesDir)) continue

    /** @type {Set<string>} component-/lib- registry deps to add to meta */
    const newRegistryDeps = new Set()

    // Walk every file in the item recursively.
    const stack = [filesDir]
    while (stack.length) {
      const cur = stack.pop()
      for (const entry of readdirSync(cur, { withFileTypes: true })) {
        const full = join(cur, entry.name)
        if (entry.isDirectory()) {
          stack.push(full)
          continue
        }
        if (!/\.(tsx?|ts)$/.test(entry.name)) continue
        let content = readFileSync(full, "utf8")
        if (!content.includes('@cyanideui/ui')) continue

        const symbols = parseCyanideImports(content)
        if (symbols.length === 0) continue

        // Group symbols by their target component file.
        /** @type {Record<string,string[]>} */
        const byComponent = {}
        const libUtilSymbols = []
        for (const sym of symbols) {
          const comp = symbolToComponent[sym]
          if (!comp) {
            // Unknown symbol — leave a marker so we notice.
            console.warn(`  ? unmapped symbol "${sym}" in ${td}/${itemId}`)
            continue
          }
          if (comp === "__lib_utils__") {
            libUtilSymbols.push(sym)
            newRegistryDeps.add("lib-utils")
          } else {
            ;(byComponent[comp] ??= []).push(sym)
            newRegistryDeps.add(`component-${comp}`)
          }
        }

        // Build replacement import lines.
        const lines = []
        for (const [comp, syms] of Object.entries(byComponent).sort()) {
          lines.push(`import { ${syms.join(", ")} } from "@/components/ui/${comp}"`)
        }
        if (libUtilSymbols.length) {
          lines.push(`import { ${libUtilSymbols.join(", ")} } from "@/lib/utils"`)
        }

        // Replace the original @cyanideui/ui import block(s) with our lines.
        content = content.replace(
          /import\s*(?:type\s*)?\{[^}]*\}\s*from\s*"@cyanideui\/ui"\s*\n/g,
          "",
        )
        // Insert the new imports after the first import line (or at top).
        const firstImportIdx = content.indexOf("import ")
        content =
          content.slice(0, firstImportIdx) +
          lines.join("\n") +
          "\n" +
          content.slice(firstImportIdx)

        writeFileSync(full, content, "utf8")
        filesChanged++
      }
    }

    // Update meta.json: drop @cyanideui/ui from npm, merge registry deps.
    const metaPath = join(itemDir, "meta.json")
    if (existsSync(metaPath) && newRegistryDeps.size) {
      const meta = JSON.parse(readFileSync(metaPath, "utf8"))
      meta.dependencies ??= {}
      meta.dependencies.npm = (meta.dependencies.npm ?? []).filter(
        (d) => d !== "@cyanideui/ui",
      )
      const existing = new Set(meta.dependencies.registry ?? [])
      for (const d of newRegistryDeps) existing.add(d)
      meta.dependencies.registry = [...existing].sort()
      writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8")
      metasChanged++
    }
  }
}

console.log(`[rewrite-registry-imports] rewrote ${filesChanged} file(s), updated ${metasChanged} meta(s)`)
