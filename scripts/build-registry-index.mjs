// @ts-check
/**
 * Walks `registry/<category>/<item>/meta.json`, validates each, and emits
 * `registry/index.json` — the browseable index the CLI fetches first.
 *
 * Run via `pnpm build:registry` (root package.json).
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs"
import { join, resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

// Resolve the registry dir relative to THIS script (repo-root/scripts/),
// so it works regardless of the cwd it's invoked from (root or packages/cli).
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..", "registry")
const CATEGORIES = ["shells", "templates", "blocks", "hooks"]
const REQUIRED_FIELDS = ["name", "category", "title", "description", "version", "frameworks", "files"]

/** @type {import("../packages/cli/src/types").RegistryIndexEntry[]} */
const items = []
const errors = []

for (const category of CATEGORIES) {
  const catDir = join(ROOT, category)
  if (!existsSync(catDir)) continue

  for (const itemId of readdirSync(catDir)) {
    const itemDir = join(catDir, itemId)
    if (!statSync(itemDir).isDirectory()) continue

    const metaPath = join(itemDir, "meta.json")
    if (!existsSync(metaPath)) {
      errors.push(`${category}/${itemId}: missing meta.json`)
      continue
    }

    let meta
    try {
      meta = JSON.parse(readFileSync(metaPath, "utf8"))
    } catch (e) {
      errors.push(`${category}/${itemId}: invalid JSON — ${e.message}`)
      continue
    }

    for (const field of REQUIRED_FIELDS) {
      if (meta[field] === undefined) {
        errors.push(`${category}/${itemId}: meta.json missing "${field}"`)
      }
    }

    if (meta.category !== category) {
      errors.push(
        `${category}/${itemId}: meta.category "${meta.category}" doesn't match folder "${category}"`,
      )
    }

    // Verify every declared file exists under files/.
    for (const file of meta.files ?? []) {
      const filePath = join(itemDir, "files", file.from)
      if (!existsSync(filePath)) {
        errors.push(`${category}/${itemId}: declared file not found — files/${file.from}`)
      }
    }

    items.push({
      name: meta.name,
      category: meta.category,
      title: meta.title,
      description: meta.description,
      version: meta.version,
      path: `${category}/${itemId}`,
    })
  }
}

if (errors.length > 0) {
  console.error("[registry] validation failed:\n" + errors.map((e) => "  - " + e).join("\n"))
  process.exit(1)
}

items.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))

const index = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  items,
}

writeFileSync(join(ROOT, "index.json"), JSON.stringify(index, null, 2) + "\n", "utf8")
console.log(`[registry] wrote index.json with ${items.length} item${items.length === 1 ? "" : "s"}`)
