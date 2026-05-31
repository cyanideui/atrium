# Publishing Atrium

Both packages publish to **GitHub Packages** (private npm registry tied to your GitHub org). The registry travels *inside* the `@atrium/cli` package, so a private source repo is fine — consumers never fetch from GitHub raw URLs.

## Prerequisites

1. A GitHub org/user whose name matches the package scope. The packages are scoped `@atrium/*`, so your GitHub account/org must be named **`atrium`**. If it isn't, either:
   - rename the scope in both `package.json` files (`@atrium/ui` → `@youraccount/ui`, etc.), or
   - create an `atrium` org.
2. A GitHub Personal Access Token (classic) with `write:packages` + `read:packages` scopes.

## One-time setup

Create `~/.npmrc` (or repo-root `.npmrc`, gitignored) with:

```
@atrium:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

Update the `repository.url` in both `packages/ui/package.json` and `packages/cli/package.json` to your real repo (currently a placeholder `github.com/atrium/atrium`).

## Pre-flight: dry-run (already verified)

Before any real publish, both packages were validated with `npm publish --dry-run`:
- `@atrium/ui` — 18 files, 170 KB, includes `dist/` (bundle + subpath entries) + `src/styles/`.
- `@atrium/cli` — 26 files, 34 KB, includes `dist/index.js` (bin) + the bundled `dist/registry/**` (all 8 items + index.json).
- The `bin` path is `dist/index.js` (no `./` prefix — npm rejects the prefixed form, which would silently drop the `atrium` command).

Re-run anytime with:
```bash
cd packages/ui  && npm publish --dry-run
cd packages/cli && npm publish --dry-run
```

## Publish steps

From the repo root:

```bash
# 1. Make sure everything is green
pnpm --filter @atrium/ui build
pnpm --filter @atrium/ui test
pnpm --filter @atrium/cli build      # also rebuilds + bundles the registry
pnpm --filter @atrium/cli test
pnpm typecheck

# 2. Publish the library first (the CLI's generated files depend on it)
cd packages/ui
pnpm publish --no-git-checks         # prepublishOnly runs test + build

# 3. Publish the CLI
cd ../cli
pnpm publish --no-git-checks         # prepublishOnly runs test + build
```

Both packages have a `prepublishOnly` script that re-runs tests + build, so a broken release can't ship.

## Consuming the published packages

In a consumer project, create `.npmrc`:

```
@atrium:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

Then:

```bash
pnpm add @atrium/ui @hugeicons/core-free-icons @hugeicons/react
pnpm dlx @atrium/cli add shell-doc
```

> **Note:** `pnpm dlx @atrium/cli` works once published, because the registry is bundled in the package — no extra config, no network call to a registry server.

## Versioning

- `@atrium/ui` follows SemVer. Breaking token/component changes bump major.
- `@atrium/cli` versions independently (the registry content lives with it).
- Registry items carry their own `version` in `meta.json` — bump these when a starter changes so `atrium diff` (future) can detect drift.

## Cold-start verification (already done in dev)

Before each release, the tarball cold-start was validated:
1. `pnpm pack` both packages.
2. `npm install` both tarballs into a fresh project outside the monorepo.
3. Run the installed CLI: `node node_modules/@atrium/cli/dist/index.js add shell-doc --yes`.
4. `tsc --noEmit` the generated files against the installed `@atrium/ui` → **0 errors**.

This proves the published artifacts are self-contained and API-correct.
