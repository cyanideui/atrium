import pc from "picocolors"
import { fetchIndex } from "../lib/registry.js"
import type { RegistryCategory } from "../types.js"

const CATEGORY_TITLES: Record<RegistryCategory, string> = {
  shells: "SHELLS",
  templates: "TEMPLATES",
  blocks: "BLOCKS",
  hooks: "HOOKS",
}

const CATEGORY_ORDER: RegistryCategory[] = ["shells", "templates", "blocks", "hooks"]

export async function listCommand(categoryFilter?: string): Promise<void> {
  const index = await fetchIndex()

  const byCategory = new Map<RegistryCategory, typeof index.items>()
  for (const item of index.items) {
    const arr = byCategory.get(item.category) ?? []
    arr.push(item)
    byCategory.set(item.category, arr)
  }

  let printed = 0
  for (const cat of CATEGORY_ORDER) {
    if (categoryFilter && !cat.startsWith(categoryFilter)) continue
    const items = byCategory.get(cat)
    if (!items || items.length === 0) continue

    console.log("\n" + pc.bold(CATEGORY_TITLES[cat]))
    const nameWidth = Math.max(...items.map((i) => i.name.length))
    for (const item of items) {
      const name = pc.cyan(item.name.padEnd(nameWidth))
      const version = pc.dim(item.version)
      console.log(`  ${name}  ${version}  ${item.title}`)
    }
    printed += items.length
  }

  if (printed === 0) {
    console.log(pc.yellow("\n  No items found."))
  } else {
    console.log(pc.dim(`\n  Add one with:  atrium add <name>\n`))
  }
}
