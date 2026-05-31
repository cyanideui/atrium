import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Framework, Manifest, ManifestEntry } from "../types.js"

const MANIFEST_REL = ".atrium/manifest.json"

export function readManifest(cwd: string): Manifest | null {
  const path = join(cwd, MANIFEST_REL)
  if (!existsSync(path)) return null
  try {
    return JSON.parse(readFileSync(path, "utf8")) as Manifest
  } catch {
    return null
  }
}

export function writeManifest(cwd: string, manifest: Manifest): void {
  const path = join(cwd, MANIFEST_REL)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(manifest, null, 2) + "\n", "utf8")
}

export function recordItem(
  cwd: string,
  framework: Framework,
  entry: ManifestEntry,
): void {
  const existing = readManifest(cwd) ?? {
    schemaVersion: 1,
    framework,
    items: [],
  }
  // Replace any prior record of the same item.
  existing.framework = framework
  existing.items = existing.items.filter((i) => i.name !== entry.name)
  existing.items.push(entry)
  writeManifest(cwd, existing)
}
