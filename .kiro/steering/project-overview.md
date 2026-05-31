# Atrium UI — Project Overview

Authoritative quick-reference for this repo. The full spec/changelog lives in `design.md` (keep it updated). Consumer docs live in `README.md` + `STARTER.md`.

## What this is

**Atrium UI** — a React component library / design system (brand name "Atrium UI"),
published under the npm **scope `@cyanideui`** (the scope must equal the GitHub org name
for GitHub Packages). pnpm monorepo.

- Repo: https://github.com/cyanideui/atrium — **PUBLIC**
- `gh` CLI authed as `Joyblacke`; public-npm account is `cyanide-atrium`.

## Packages

| Path | Name | Version | Registry | Purpose |
|---|---|---|---|---|
| `packages/ui/` | `@cyanideui/ui` | 1.0.0 | **GitHub Packages** (scoped) | The component library (59 components) |
| `packages/cli/` | `cyanideui` | 0.1.2 | **public npmjs.com** (unscoped) | Scaffolding CLI — so `npx cyanideui` is tokenless like `npx shadcn` |
| `apps/playground/` | `@cyanideui/playground` | — | not published | Showcase site (Vite + React Router) |
| `apps/example-next/` | `@cyanideui/example-next` | — | not published | Next.js 15 reference consumer |
| `registry/` (repo root) | — | — | served from raw-GitHub | shadcn-style copy-paste registry |

## Registry architecture (the important mental model)

There are **two distinct things** on the internet, updated differently:

1. **The CLI** (`cyanideui` on npm) — updated only by a `npm publish` / release tag.
2. **The component source** (`registry/**`) — read **live** from
   `https://raw.githubusercontent.com/cyanideui/atrium/main/registry`. Updated by a plain
   `git push` to `main`. No republish needed for component edits.

When a user runs `npx cyanideui add button`, the CLI fetches component code from the **live
raw-GitHub URL** (default in `packages/cli/src/lib/registry.ts`), with the npm-bundled
`dist/registry/**` as an offline fallback. So day-to-day component changes ship via git push;
republishing the CLI is only for CLI-logic changes or refreshing the bundled fallback.

Registry currently has **69 items**: 59 components, 4 templates, 1 shell, 3 hooks, 2 lib.
Everything is pure copy-paste: imports use `@/lib/utils` and `@/components/ui/*`, never
`@cyanideui/ui`. Name resolution has a prefix fallback: `add button` → `component-button`,
`add dashboard` → `template-dashboard`.

### Registry generators (run via `node`, in order)
1. `scripts/generate-component-registry.mjs` — components → `registry/components/<name>/{meta.json, files/*}`, rewrites `../lib/cn` → `@/lib/utils`, `./x` → `@/components/ui/x`, computes npm + transitive registry deps.
2. `scripts/rewrite-registry-imports.mjs` — converts shell/template/hook items off `@cyanideui/ui` to local `@/` aliases.
3. `scripts/build-registry-index.mjs` — writes `registry/index.json`.

## Verification gates (all must be green)

- `pnpm --filter @cyanideui/ui build` + `test` (54 tests)
- `pnpm --filter cyanideui build` + `test` (19 tests)
- `pnpm typecheck` (all 4 packages)
- `pnpm --filter @cyanideui/playground build`
- `pnpm --filter @cyanideui/example-next build`

CI (`.github/workflows/ci.yml`) runs all of these on push/PR to `main`.
