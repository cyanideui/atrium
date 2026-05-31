import pc from "picocolors"
import prompts from "prompts"
import { fetchItem, itemPath, fetchItemFile } from "../lib/registry.js"
import { detectFramework, frameworkLabel } from "../lib/framework.js"
import { applyTransform, hasUnresolvedMarkers } from "../lib/transform.js"
import { writeFileSafe } from "../lib/files.js"
import { recordItem } from "../lib/manifest.js"
import { detectPackageManager, missingDeps, printDepInstructions } from "../lib/deps.js"
import type { Framework, RegistryItem } from "../types.js"

export interface AddOptions {
  cwd: string
  overwrite?: boolean
  dryRun?: boolean
  framework?: Framework
  /** Suppress the interactive "apply?" confirmation (used by init). */
  yes?: boolean
}

/**
 * Resolve an item + its transitive registry deps into install order
 * (deps first, so a shell's hooks land before the shell references them).
 */
async function resolveOrder(name: string): Promise<RegistryItem[]> {
  const ordered: RegistryItem[] = []
  const seen = new Set<string>()

  async function visit(itemName: string) {
    if (seen.has(itemName)) return
    seen.add(itemName)
    const item = await fetchItem(itemName)
    for (const dep of item.dependencies?.registry ?? []) {
      await visit(dep)
    }
    ordered.push(item)
  }

  await visit(name)
  return ordered
}

export async function addCommand(name: string, opts: AddOptions): Promise<void> {
  const cwd = opts.cwd

  const framework = opts.framework ?? detectFramework(cwd)
  if (!framework) {
    console.error(
      pc.red(
        "Could not detect your framework (Next.js or Vite). Run inside a project, or pass --framework.",
      ),
    )
    process.exitCode = 1
    return
  }

  console.log(pc.dim(`Detected: ${frameworkLabel(framework)}`))

  const items = await resolveOrder(name)

  // Filter items that don't support this framework.
  const unsupported = items.filter((i) => !i.frameworks.includes(framework))
  if (unsupported.length > 0) {
    console.error(
      pc.red(
        `These items don't support ${frameworkLabel(framework)}: ${unsupported
          .map((i) => i.name)
          .join(", ")}`,
      ),
    )
    process.exitCode = 1
    return
  }

  // Collect every npm dep across the resolved items.
  const allNpmDeps = new Set<string>()
  for (const item of items) {
    for (const dep of item.dependencies?.npm ?? []) allNpmDeps.add(dep)
  }
  const pm = detectPackageManager(cwd)
  const missing = missingDeps(cwd, [...allNpmDeps])

  // Plan summary.
  console.log(pc.bold(`\n${name}`) + pc.dim(` → ${items.length} item(s)`))
  for (const item of items) {
    console.log(pc.dim(`  • ${item.name} v${item.version}`))
    for (const file of item.files) {
      console.log(pc.dim(`      ${file.to}`))
    }
  }

  if (!opts.yes && !opts.dryRun) {
    const { go } = await prompts({
      type: "confirm",
      name: "go",
      message: "Apply?",
      initial: true,
    })
    if (!go) {
      console.log(pc.dim("Aborted."))
      return
    }
  }

  // Copy each item's files.
  for (const item of items) {
    const path = await itemPath(item.name)
    const written: string[] = []
    for (const file of item.files) {
      const raw = await fetchItemFile(path, file.from)
      const transformed = applyTransform(raw, framework)
      if (hasUnresolvedMarkers(transformed)) {
        console.error(
          pc.red(`  ! ${file.to} still has unresolved @atrium markers — skipping`),
        )
        continue
      }
      const decision = await writeFileSafe(cwd, file.to, transformed, {
        overwrite: opts.overwrite,
        dryRun: opts.dryRun,
      })
      if (decision !== "skipped") written.push(file.to)
    }

    if (!opts.dryRun && written.length > 0) {
      recordItem(cwd, framework, {
        name: item.name,
        version: item.version,
        addedAt: new Date().toISOString(),
        files: written,
      })
    }
  }

  // Dep instructions + per-item post-install notes.
  printDepInstructions(pm, missing)

  const notes = items.flatMap((i) => i.postInstall ?? [])
  if (notes.length > 0) {
    console.log(pc.bold("\n  Next steps:"))
    for (const note of notes) console.log(pc.dim(`    • ${note}`))
    console.log("")
  }
}
