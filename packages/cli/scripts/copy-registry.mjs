// @ts-check
/**
 * Postbuild: copy the monorepo's `registry/` into the CLI's `dist/registry/`
 * so the registry ships INSIDE the published npm package. This is what lets
 * the CLI work with a private source repo — the files travel with the
 * package, no network or auth needed.
 *
 * Also regenerates index.json first (via the root script) so the bundled
 * copy is always current.
 */
import { cpSync, existsSync, rmSync, mkdirSync } from "node:fs"
import { resolve, join } from "node:path"

const cliRoot = resolve(process.cwd())
const repoRoot = resolve(cliRoot, "../..")
const srcRegistry = join(repoRoot, "registry")
const destRegistry = join(cliRoot, "dist", "registry")

if (!existsSync(srcRegistry)) {
  console.error(`[copy-registry] source registry not found at ${srcRegistry}`)
  process.exit(1)
}

if (!existsSync(join(srcRegistry, "index.json"))) {
  console.error(
    "[copy-registry] registry/index.json missing — run `pnpm build:registry` at the repo root first.",
  )
  process.exit(1)
}

rmSync(destRegistry, { recursive: true, force: true })
mkdirSync(destRegistry, { recursive: true })
cpSync(srcRegistry, destRegistry, { recursive: true })

console.log(`[copy-registry] bundled registry → dist/registry`)
