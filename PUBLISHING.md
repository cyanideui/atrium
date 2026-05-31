# Publishing Cyanide UI

Two packages, two registries:

| Package | Registry | Why |
|---|---|---|
| `@cyanideui/ui` (library) | GitHub Packages (scoped) | Versioned install; can stay access-controlled |
| `cyanideui` (CLI) | **public npmjs.com** (unscoped) | So `pnpm dlx cyanideui` is tokenless, like `npx shadcn` |

The registry (component source) is fetched from the **public raw-GitHub URL** — no auth, since the repo is public. So the *consumer* experience is fully tokenless: `pnpm dlx cyanideui add button` needs nothing.

- Repo: https://github.com/cyanideui/atrium (public)
- Public CLI: https://www.npmjs.com/package/cyanideui — **published, `cyanideui@0.1.0` live**

---

## Publishing the public CLI (`cyanideui`) to npmjs.com

One-time:
1. Create a free account at https://www.npmjs.com
2. `npm login` (or create an **automation token** at npmjs.com → Access Tokens for CI)

Publish:
```bash
pnpm --filter cyanideui build      # bundles the registry into dist/
cd packages/cli
npm publish                         # publishConfig already targets public npm + public access
```

> **2FA note:** if your npm account has 2FA enabled, plain `npm publish` fails with
> `E403 ... Two-factor authentication ... required`. Either pass a live code with
> `npm publish --otp=123456`, or publish with a **granular access token** that has
> write access (granular tokens bypass the interactive OTP). The token route is also
> what CI uses — see `NPM_TOKEN` below.

Verify: https://www.npmjs.com/package/cyanideui

For CI auto-publish, add an `NPM_TOKEN` secret (repo → Settings → Secrets → Actions) — the Release workflow uses it.

## Releasing (automated — recommended)

Future releases publish automatically via GitHub Actions (`.github/workflows/release.yml`) on a version tag. No manual token handling — the workflow uses the built-in `GITHUB_TOKEN`, which carries `packages: write` for the org.

```bash
# 1. Bump the version in packages/ui/package.json and/or packages/cli/package.json
#    (and registry item meta.json versions if their content changed)

# 2. Commit the bump
git add -A && git commit -m "release: v1.0.1"

# 3. Tag + push — this triggers the Release workflow
git tag v1.0.1
git push origin main --tags
```

The workflow then: installs → builds + tests the library and CLI → typechecks → publishes `@cyanideui/ui` then `@cyanideui/cli` to GitHub Packages. Watch it under the repo's **Actions** tab. A broken build/test gates the publish.

## Releasing (manual — fallback)

If you need to publish from your machine (e.g. CI is down):

## Prerequisites

A GitHub Personal Access Token (classic) with `write:packages` + `read:packages` scopes, with access to the `cyanideui` org. Your default `gh` token does NOT have `write:packages` — generate a dedicated one:

1. https://github.com/settings/tokens → **Generate new token (classic)**
2. Scopes: `write:packages`, `read:packages` (and `repo`, auto-selected)
3. If the org enforces SSO, click **Authorize** for `cyanideui` next to the token.

## Pre-flight: dry-run (verified)

Both packages assemble cleanly:
- `@cyanideui/ui` — 18 files; `dist/` bundle + subpath entries + `src/styles/`.
- `@cyanideui/cli` — 26 files; `dist/index.js` bin + bundled `dist/registry/**` (8 items).
- `bin` path is `dist/index.js` (no `./` — npm rejects the prefixed form).

Re-run anytime:
```bash
cd packages/ui  && npm publish --dry-run
cd packages/cli && npm publish --dry-run
```

## One-time auth setup

Create `~/.npmrc` (your home dir — NOT the repo; the repo's `.npmrc` is gitignored):

```
@cyanideui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_YOUR_WRITE_PACKAGES_TOKEN
```

## Publish

From the repo root, **library first** (the CLI's generated files depend on it):

```bash
pnpm --filter @cyanideui/ui build
pnpm --filter @cyanideui/cli build      # also rebuilds + bundles the registry

cd packages/ui  && pnpm publish --no-git-checks
cd ../cli       && pnpm publish --no-git-checks
```

`prepublishOnly` re-runs tests + build on each, so a broken release can't ship.

Verify on GitHub: https://github.com/orgs/cyanideui/packages

## Consuming the published packages

In a consumer project, create `.npmrc`:

```
@cyanideui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_A_READ_PACKAGES_TOKEN
```

Then:

```bash
pnpm add @cyanideui/ui @hugeicons/core-free-icons @hugeicons/react
pnpm dlx @cyanideui/cli add shell-doc
```

`pnpm dlx @cyanideui/cli` works because the registry is bundled in the package — no registry server, no extra config beyond the read token.

## Versioning

- `@cyanideui/ui` follows SemVer. Breaking token/component changes bump major.
- `@cyanideui/cli` versions independently (the registry content lives with it).
- Registry items carry their own `version` in `meta.json`.
