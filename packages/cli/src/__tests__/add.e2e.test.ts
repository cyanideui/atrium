import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { mkdtempSync, writeFileSync, rmSync, existsSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { addCommand } from "../commands/add.js"
import { __resetRegistryCache } from "../lib/registry.js"

/**
 * End-to-end: run `add shell-doc` against the real local registry and
 * assert the files land correctly transformed. Points ATRIUM_REGISTRY at
 * the repo's registry/ dir.
 */

const REGISTRY = resolve(__dirname, "../../../../registry")

let dir: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "atrium-e2e-"))
  process.env.ATRIUM_REGISTRY = `file:${REGISTRY}`
  __resetRegistryCache()
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
  delete process.env.ATRIUM_REGISTRY
  __resetRegistryCache()
})

describe("add shell-doc (e2e, Next.js)", () => {
  it("writes all files, transitive hooks included, transformed for Next.js", async () => {
    writeFileSync(join(dir, "package.json"), JSON.stringify({ dependencies: { next: "15.0.0" } }))

    await addCommand("shell-doc", {
      cwd: dir,
      framework: "next",
      yes: true,
      overwrite: true,
    })

    // Shell files
    expect(existsSync(join(dir, "src/components/app-shell.tsx"))).toBe(true)
    expect(existsSync(join(dir, "src/components/shell-providers.tsx"))).toBe(true)
    expect(existsSync(join(dir, "src/components/command-palette.tsx"))).toBe(true)
    expect(existsSync(join(dir, "src/components/nav-link-item.tsx"))).toBe(true)
    expect(existsSync(join(dir, "src/lib/nav.ts"))).toBe(true)

    // Transitive hooks
    expect(existsSync(join(dir, "src/hooks/use-theme.ts"))).toBe(true)
    expect(existsSync(join(dir, "src/hooks/use-shortcut-toasts.tsx"))).toBe(true)
    expect(existsSync(join(dir, "src/hooks/use-global-cheatsheet.tsx"))).toBe(true)

    // Next.js transform applied
    const navLink = readFileSync(join(dir, "src/components/nav-link-item.tsx"), "utf8")
    expect(navLink).toContain("next/link")
    expect(navLink).not.toContain("react-router-dom")
    expect(navLink).not.toContain("@atrium:")

    // Manifest recorded
    const manifest = JSON.parse(readFileSync(join(dir, ".atrium/manifest.json"), "utf8"))
    expect(manifest.framework).toBe("next")
    expect(manifest.items.map((i: { name: string }) => i.name)).toContain("shell-doc")
  })
})

describe("add shell-doc (e2e, Vite)", () => {
  it("applies the react-router transform", async () => {
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({ dependencies: { vite: "5.0.0", "react-router-dom": "6.0.0" } }),
    )

    await addCommand("shell-doc", {
      cwd: dir,
      framework: "vite-react-router",
      yes: true,
      overwrite: true,
    })

    const navLink = readFileSync(join(dir, "src/components/nav-link-item.tsx"), "utf8")
    expect(navLink).toContain("react-router-dom")
    expect(navLink).not.toContain("next/link")
    expect(navLink).not.toContain("@atrium:")
  })
})

describe("add template-dashboard (e2e)", () => {
  it("Next.js gets a default export", async () => {
    writeFileSync(join(dir, "package.json"), JSON.stringify({ dependencies: { next: "15.0.0" } }))
    await addCommand("template-dashboard", {
      cwd: dir,
      framework: "next",
      yes: true,
      overwrite: true,
    })
    const file = readFileSync(join(dir, "src/pages/dashboard.tsx"), "utf8")
    expect(file).toContain("export default function DashboardPage")
    expect(file).not.toContain("export function DashboardPage")
    expect(file).not.toContain("@atrium:")
  })

  it("Vite gets a named export", async () => {
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({ dependencies: { vite: "5.0.0", "react-router-dom": "6.0.0" } }),
    )
    await addCommand("template-dashboard", {
      cwd: dir,
      framework: "vite-react-router",
      yes: true,
      overwrite: true,
    })
    const file = readFileSync(join(dir, "src/pages/dashboard.tsx"), "utf8")
    expect(file).toContain("export function DashboardPage")
    expect(file).not.toContain("export default")
    expect(file).not.toContain("@atrium:")
  })
})

describe("bundled registry resolution", () => {
  it("resolves from dist/registry when pointed there (simulates the published bundle)", async () => {
    // In a real install, getRegistryBase() returns the dist/registry path
    // next to the built CLI. Under vitest we run from src/, so import.meta.url
    // points at source — we can't exercise the implicit default. Instead we
    // point explicitly at the built bundle to prove that path is valid and
    // self-contained (no monorepo registry/ needed).
    const bundled = resolve(__dirname, "../../dist/registry")
    const { existsSync } = await import("node:fs")
    if (!existsSync(join(bundled, "index.json"))) {
      // Build not run yet — skip rather than fail the unit suite.
      return
    }

    process.env.ATRIUM_REGISTRY = `file:${bundled}`
    __resetRegistryCache()
    writeFileSync(join(dir, "package.json"), JSON.stringify({ dependencies: { next: "15.0.0" } }))

    await addCommand("hook-theme", { cwd: dir, framework: "next", yes: true, overwrite: true })
    expect(existsSync(join(dir, "src/hooks/use-theme.ts"))).toBe(true)
  })
})
