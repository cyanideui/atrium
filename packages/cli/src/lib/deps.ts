import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import pc from "picocolors"

export type PackageManager = "pnpm" | "npm" | "yarn"

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn"
  if (existsSync(join(cwd, "package-lock.json"))) return "npm"
  return "pnpm"
}

/** Which of the requested npm deps are NOT already in package.json. */
export function missingDeps(cwd: string, deps: string[]): string[] {
  const pkgPath = join(cwd, "package.json")
  if (!existsSync(pkgPath)) return deps
  let installed: Record<string, string> = {}
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"))
    installed = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }
  } catch {
    return deps
  }
  // `react` is a peer everyone has — never flag it as missing noise.
  return deps.filter((d) => d !== "react" && d !== "react-dom" && !installed[d])
}

export function installCommand(pm: PackageManager, deps: string[]): string {
  if (deps.length === 0) return ""
  const list = deps.join(" ")
  switch (pm) {
    case "pnpm":
      return `pnpm add ${list}`
    case "yarn":
      return `yarn add ${list}`
    case "npm":
      return `npm install ${list}`
  }
}

/**
 * We DON'T auto-run installs (network + lockfile risk). Instead we print
 * the exact command for the user to run. Safer + transparent.
 */
export function printDepInstructions(pm: PackageManager, deps: string[]): void {
  if (deps.length === 0) return
  console.log(pc.yellow("\n  Install missing dependencies:"))
  console.log(pc.bold(`    ${installCommand(pm, deps)}\n`))
}
