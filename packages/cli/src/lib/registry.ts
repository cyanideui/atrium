import { readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import type { RegistryIndex, RegistryItem } from "../types.js"

/**
 * Registry source resolution.
 *
 * Default: the PUBLIC raw-GitHub registry. Since the repo is public, these
 * URLs need no auth — this is what makes consumption tokenless (shadcn-style).
 *
 * Fallbacks / overrides:
 *   - ATRIUM_REGISTRY=file:./registry      → local dev against the monorepo
 *   - ATRIUM_REGISTRY=file:<dist/registry> → the copy bundled in the package
 *
 * A `file:` (or bare path) base reads from the filesystem. An `http(s)`
 * base fetches over the network.
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** Public raw-GitHub registry root (repo is public → no auth needed). */
const PUBLIC_REGISTRY =
  "https://raw.githubusercontent.com/cyanideui/atrium/main/registry"

/** The registry bundled alongside the built CLI (dist/registry), used as an
 *  offline fallback when the network/raw URL is unavailable. */
function bundledRegistryPath(): string {
  return join(__dirname, "registry")
}

export function getRegistryBase(): string {
  if (process.env.ATRIUM_REGISTRY) return process.env.ATRIUM_REGISTRY
  return PUBLIC_REGISTRY
}

/** Bundled fallback path — used by callers if the public fetch fails. */
export function getBundledRegistryBase(): string {
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

/**
 * Resolve a user-typed name to a registry entry. Tries the exact name
 * first, then friendly prefixes so `add button` finds `component-button`,
 * `add dashboard` finds `template-dashboard`, etc.
 */
function resolveEntry(index: RegistryIndex, name: string) {
  const exact = index.items.find((i) => i.name === name)
  if (exact) return exact
  const prefixes = ["component-", "template-", "shell-", "hook-", "block-", "lib-"]
  for (const p of prefixes) {
    const hit = index.items.find((i) => i.name === `${p}${name}`)
    if (hit) return hit
  }
  return undefined
}

export async function fetchItem(name: string): Promise<RegistryItem> {
  const index = await fetchIndex()
  const entry = resolveEntry(index, name)
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
  const entry = resolveEntry(index, name)
  if (!entry) throw new Error(`Unknown registry item: "${name}"`)
  return entry.path
}
