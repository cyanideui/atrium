import { readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import type { RegistryIndex, RegistryItem } from "../types.js"

/**
 * Registry source resolution.
 *
 * Default: the registry bundled INSIDE this published package at
 * `dist/registry/`. This is the key decision for a private-repo setup —
 * the registry travels with the npm package, so the CLI works offline,
 * without auth, regardless of whether the source repo is public.
 *
 * Override with ATRIUM_REGISTRY for local dev against the monorepo:
 *   ATRIUM_REGISTRY=file:./registry atrium add shell-doc
 *
 * A `file:` (or bare path) base reads from the filesystem. An `http(s)`
 * base fetches over the network (kept for a future public-registry mode).
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** The registry bundled alongside the built CLI (dist/registry). */
function bundledRegistryPath(): string {
  return join(__dirname, "registry")
}

export function getRegistryBase(): string {
  if (process.env.ATRIUM_REGISTRY) return process.env.ATRIUM_REGISTRY
  return `file:${bundledRegistryPath()}`
}

function isFileBase(base: string): boolean {
  return (
    base.startsWith("file:") ||
    base.startsWith(".") ||
    base.startsWith("/") ||
    /^[A-Za-z]:[\\/]/.test(base)
  )
}

function fileBasePath(base: string): string {
  return base.startsWith("file:") ? base.slice("file:".length) : base
}

async function readSource(base: string, relPath: string): Promise<string> {
  if (isFileBase(base)) {
    const full = join(fileBasePath(base), relPath)
    if (!existsSync(full)) {
      throw new Error(`Registry file not found: ${full}`)
    }
    return readFile(full, "utf8")
  }
  const url = `${base.replace(/\/$/, "")}/${relPath}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} — ${res.status} ${res.statusText}`)
  }
  return res.text()
}

let cachedIndex: RegistryIndex | null = null

/** Test-only: clear the cached index so a different base can be used. */
export function __resetRegistryCache(): void {
  cachedIndex = null
}

export async function fetchIndex(): Promise<RegistryIndex> {
  if (cachedIndex) return cachedIndex
  const base = getRegistryBase()
  const raw = await readSource(base, "index.json")
  cachedIndex = JSON.parse(raw) as RegistryIndex
  return cachedIndex
}

export async function fetchItem(name: string): Promise<RegistryItem> {
  const index = await fetchIndex()
  const entry = index.items.find((i) => i.name === name)
  if (!entry) {
    throw new Error(
      `Unknown registry item: "${name}". Run \`atrium list\` to see what's available.`,
    )
  }
  const base = getRegistryBase()
  const raw = await readSource(base, `${entry.path}/meta.json`)
  return JSON.parse(raw) as RegistryItem
}

/** Read a raw file from an item's `files/` dir. */
export async function fetchItemFile(itemPath: string, fromRel: string): Promise<string> {
  const base = getRegistryBase()
  return readSource(base, `${itemPath}/files/${fromRel}`)
}

/** Look up the registry path ("shells/doc-shell") for an item name. */
export async function itemPath(name: string): Promise<string> {
  const index = await fetchIndex()
  const entry = index.items.find((i) => i.name === name)
  if (!entry) throw new Error(`Unknown registry item: "${name}"`)
  return entry.path
}
