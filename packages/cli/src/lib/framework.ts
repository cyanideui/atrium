import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Framework } from "../types.js"

/**
 * Detect the consumer's framework from their project files.
 *
 *   - Next.js: a `next` dependency or a next.config.*
 *   - Vite + React Router: a `vite` dep + `react-router-dom` dep
 *
 * Returns null when undetectable (the caller then prompts).
 */
export function detectFramework(cwd: string): Framework | null {
  const pkgPath = join(cwd, "package.json")
  let deps: Record<string, string> = {}
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"))
      deps = { ...pkg.dependencies, ...pkg.devDependencies }
    } catch {
      /* ignore malformed package.json */
    }
  }

  const hasNextConfig =
    existsSync(join(cwd, "next.config.js")) ||
    existsSync(join(cwd, "next.config.mjs")) ||
    existsSync(join(cwd, "next.config.ts"))

  if (deps.next || hasNextConfig) return "next"

  const hasViteConfig =
    existsSync(join(cwd, "vite.config.js")) ||
    existsSync(join(cwd, "vite.config.ts"))

  if ((deps.vite || hasViteConfig) && deps["react-router-dom"]) {
    return "vite-react-router"
  }

  // Vite without react-router — still treat as the vite path; the user can
  // add react-router after.
  if (deps.vite || hasViteConfig) return "vite-react-router"

  return null
}

export function frameworkLabel(fw: Framework): string {
  return fw === "next" ? "Next.js (App Router)" : "Vite + React Router"
}
