# Release & Publishing Flow

How to ship new versions. Full prose lives in `PUBLISHING.md`; this is the operational checklist.

## Two registries, two packages

| Package | Registry | Auth in CI |
|---|---|---|
| `@cyanideui/ui` (library, scoped) | GitHub Packages | auto `GITHUB_TOKEN` (`packages: write`) |
| `cyanideui` (CLI, unscoped) | public npmjs.com | repo secret **`NPM_TOKEN`** |

`NPM_TOKEN` is set (repo → Settings → Secrets → Actions). It's a **granular access token**
for npm user `cyanide-atrium` with read+write on package `cyanideui`. Granular write tokens
**bypass interactive 2FA/OTP** — that's why CI can publish unattended. Tokens expire
(~90 days); regenerate at npmjs.com and update the `NPM_TOKEN` secret when it does.

## The release flow (automated — preferred)

Releases publish via `.github/workflows/release.yml` on a **version tag push**:

```bash
# 1. Bump version(s): packages/cli/package.json and/or packages/ui/package.json
#    (CLI --version is injected from package.json at build time via tsup define,
#     so it can't drift — just bump package.json.)
# 2. Commit + push to main
git add -A && git commit -m "release: vX.Y.Z"
git push origin main
# 3. Tag + push the tag → triggers the Release workflow
git tag vX.Y.Z
git push origin vX.Y.Z
```

The workflow: install → build+test library → build+test CLI → typecheck → publish
`@cyanideui/ui` (GitHub Packages) → publish `cyanideui` (public npm). A broken build/test
gates the publish. It can also be run manually from the Actions tab (`workflow_dispatch`).

Each publish step is **skip-if-exists**: if that version is already published (npm versions
are immutable), it prints a `::warning::` and continues instead of failing the whole run.
So re-tagging won't hard-fail on the already-published library.

Watch a run: `gh run list --repo cyanideui/atrium --workflow=release.yml` then
`gh run watch <id> --repo cyanideui/atrium --exit-status`.

## npm rules to remember

- **Versions are immutable.** Never try to republish an existing version — bump first.
- `npm publish --dry-run` does NOT authenticate; the only true token test is a real publish
  of a new version.
- Published CLI versions so far: `0.1.0`, `0.1.1` (no-op bump), `0.1.2` (real: `--version` fix).

## Manual publish (fallback, from a dev machine)

CLI to public npm (account `cyanide-atrium`). Plain `npm publish` FAILS with **E403** if the
account has 2FA — you must supply a code or use a token:

```bash
cd packages/cli
# option 1: live authenticator code (use --ignore-scripts so the rebuild doesn't expire the OTP)
npm publish --ignore-scripts --otp=123456
# option 2: granular write token via a temp .npmrc using an env var (never write the raw token to disk)
```

Library to GitHub Packages: see `PUBLISHING.md` (needs a PAT with `write:packages`).

## Component-only changes do NOT need a release

Editing `registry/**` (or regenerating it) ships to users on the next `git push origin main`
— the CLI reads the live raw-GitHub URL. Only republish the CLI for CLI-logic changes or to
refresh the bundled offline fallback. See `project-overview.md` → Registry architecture.
