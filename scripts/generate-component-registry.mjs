// @ts-check
/**
 * Generates copy-paste registry items for every library component +
 * lib helper. Reads packages/ui/src/components/*.tsx, rewrites imports to
 * consumer-style aliases, computes npm + registry dependency graphs, and
 * writes registry/components/<name>/ and registry/lib/<name>/.
 *
 * Import rewrites:
 *   ../lib/cn                  → @/lib/utils      (cn lives in utils, shadcn convention)
 *   ../lib/use-scroll-overlay  → @/lib/use-scroll-overlay
 *   ./<other-component>        → @/components/ui/<other-component>
 *
 * Run: node scripts/generate-component-registry.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs"
import { join, resolve, dirname, basename } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, "..")
const SRC = join(repoRoot, "packages/ui/src/components")
const LIB_SRC = join(repoRoot, "packages/ui/src/lib")
const REG = join(repoRoot, "registry")

// npm packages a component may import → declared as the item's npm deps.
const NPM_IMPORT_RE = /from\s+"(@radix-ui\/[a-z-]+|class-variance-authority|clsx|tailwind-merge|cmdk|sonner|date-fns|react-day-picker|@hugeicons\/[a-z-]+)"/g

// Map a library source string → consumer-aliased version + collect dep names.
function rewrite(content) {
  const registryDeps = new Set()
  let out = content

  // ../lib/cn → @/lib/utils  (and the named import `cn` stays `cn`)
  if (/from\s+"\.\.\/lib\/cn"/.test(out)) {
    out = out.replace(/from\s+"\.\.\/lib\/cn"/g, 'from "@/lib/utils"')
    registryDeps.add("lib-utils")
  }
  if (/from\s+"\.\.\/lib\/use-scroll-overlay"/.test(out)) {
    out = out.replace(/from\s+"\.\.\/lib\/use-scroll-overlay"/g, 'from "@/lib/use-scroll-overlay"')
    registryDeps.add("lib-use-scroll-overlay")
  }
  if (/from\s+"\.\.\/lib\/use-reduced-motion"/.test(out)) {
    out = out.replace(/from\s+"\.\.\/lib\/use-reduced-motion"/g, 'from "@/lib/use-reduced-motion"')
    registryDeps.add("lib-use-reduced-motion")
  }

  // ./<component> → @/components/ui/<component>
  out = out.replace(/from\s+"\.\/([a-z0-9-]+)"/g, (_m, name) => {
    registryDeps.add(`component-${name}`)
    return `from "@/components/ui/${name}"`
  })

  return { out, registryDeps }
}

function npmDepsOf(content) {
  const deps = new Set()
  let m
  NPM_IMPORT_RE.lastIndex = 0
  while ((m = NPM_IMPORT_RE.exec(content))) deps.add(m[1])
  // Everything needs react as a peer.
  return [...deps].sort()
}

// ---- clean prior generated items ----
for (const sub of ["components", "lib"]) {
  const dir = join(REG, sub)
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true })
}

let count = 0

// ---- lib helpers ----
const libItems = [
  { id: "lib-utils", file: "cn.ts", to: "src/lib/utils.ts", title: "cn() utility", src: join(LIB_SRC, "cn.ts") },
  { id: "lib-use-scroll-overlay", file: "use-scroll-overlay.ts", to: "src/lib/use-scroll-overlay.ts", title: "useScrollOverlay hook", src: join(LIB_SRC, "use-scroll-overlay.ts") },
  { id: "lib-use-reduced-motion", file: "use-reduced-motion.ts", to: "src/lib/use-reduced-motion.ts", title: "useReducedMotion hook", src: join(LIB_SRC, "use-reduced-motion.ts") },
]
for (const item of libItems) {
  const raw = readFileSync(item.src, "utf8")
  const { out } = rewrite(raw)
  const dir = join(REG, "lib", item.id.replace(/^lib-/, ""))
  mkdirSync(join(dir, "files"), { recursive: true })
  const outName = basename(item.to)
  writeFileSync(join(dir, "files", outName), out, "utf8")
  writeFileSync(
    join(dir, "meta.json"),
    JSON.stringify(
      {
        name: item.id,
        category: "lib",
        title: item.title,
        description: `Library helper: ${item.title}.`,
        version: "1.0.0",
        frameworks: ["next", "vite-react-router"],
        files: [{ from: outName, to: item.to }],
        dependencies: { npm: npmDepsOf(raw) },
      },
      null,
      2,
    ) + "\n",
    "utf8",
  )
  count++
}

// ---- components ----
const compFiles = readdirSync(SRC).filter((f) => f.endsWith(".tsx"))
for (const f of compFiles) {
  const name = basename(f, ".tsx")
  const raw = readFileSync(join(SRC, f), "utf8")
  const { out, registryDeps } = rewrite(raw)
  const dir = join(REG, "components", name)
  mkdirSync(join(dir, "files"), { recursive: true })
  writeFileSync(join(dir, "files", f), out, "utf8")
  writeFileSync(
    join(dir, "meta.json"),
    JSON.stringify(
      {
        name: `component-${name}`,
        category: "components",
        title: name,
        description: `<${name}> component (copy-paste source).`,
        version: "1.0.0",
        frameworks: ["next", "vite-react-router"],
        files: [{ from: f, to: `src/components/ui/${f}` }],
        dependencies: {
          npm: npmDepsOf(raw),
          registry: [...registryDeps].sort(),
        },
      },
      null,
      2,
    ) + "\n",
    "utf8",
  )
  count++
}

console.log(`[generate-component-registry] wrote ${count} items (${compFiles.length} components + ${libItems.length} lib)`)
