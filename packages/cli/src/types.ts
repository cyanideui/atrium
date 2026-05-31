/** Supported target frameworks for code transforms. */
export type Framework = "next" | "vite-react-router"

export type RegistryCategory = "shells" | "templates" | "blocks" | "hooks" | "components" | "lib"

/** A single file an item copies into the consumer's project. */
export interface RegistryFile {
  /** Path relative to the item's `files/` dir in the registry. */
  from: string
  /** Path relative to the consumer's project root. */
  to: string
}

/** Declared dependencies an item needs. */
export interface RegistryDeps {
  /** npm packages added to the consumer's package.json if missing. */
  npm?: string[]
  /** Other registry items pulled in transitively (by `name`). */
  registry?: string[]
}

/** Tailwind wiring hints surfaced to the user after install. */
export interface RegistryTailwind {
  globalsImport?: string
  sourcePath?: string
}

/** The full per-item manifest (`meta.json`). */
export interface RegistryItem {
  name: string
  category: RegistryCategory
  title: string
  description: string
  version: string
  frameworks: Framework[]
  files: RegistryFile[]
  dependencies?: RegistryDeps
  tailwind?: RegistryTailwind
  /** Human-readable next steps printed after the item is added. */
  postInstall?: string[]
}

/** A summary row in `index.json`. */
export interface RegistryIndexEntry {
  name: string
  category: RegistryCategory
  title: string
  description: string
  version: string
  /** Path relative to the registry root, e.g. "shells/doc-shell". */
  path: string
}

export interface RegistryIndex {
  schemaVersion: number
  generatedAt: string
  items: RegistryIndexEntry[]
}

/** Recorded in the consumer's `.atrium/manifest.json`. */
export interface ManifestEntry {
  name: string
  version: string
  addedAt: string
  files: string[]
}

export interface Manifest {
  schemaVersion: number
  framework: Framework
  items: ManifestEntry[]
}
