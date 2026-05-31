# AGENTS.md — Atrium UI

Vendor-neutral context for AI coding agents (Cursor, Codex, Copilot, Gemini CLI,
Windsurf, Zed, Antigravity, Claude Code, Kiro, …). Human docs: `README.md` + `STARTER.md`.
Authoritative spec/changelog: `design.md` (keep it updated).

> Tool-specific mirrors: `CLAUDE.md` and `GEMINI.md` point here; Kiro reads
> `.kiro/steering/*.md` (same content, split into three files).

## What this is

**Atrium UI** — a React component library / design system (brand "Atrium UI"), published
under the npm **scope `@cyanideui`** (the scope must equal the GitHub org name for GitHub
Packages — this intentional mismatch is not a bug, don't "fix" it). pnpm monorepo.

- Repo: https://github.com/cyanideui/atrium — **PUBLIC**
- `gh` CLI authed as `Joyblacke`; public-npm account is `cyanide-atrium`.

## Packages

| Path | Name | Version | Registry | Purpose |
|---|---|---|---|---|
| `packages/ui/` | `@cyanideui/ui` | 1.0.0 | GitHub Packages (scoped) | Component library (59 components) |
| `packages/cli/` | `cyanideui` | 0.1.2 | public npmjs.com (unscoped) | Scaffolding CLI — `npx cyanideui` tokenless like `npx shadcn` |
| `apps/playground/` | `@cyanideui/playground` | — | not published | Showcase (Vite + React Router) |
| `apps/example-next/` | `@cyanideui/example-next` | — | not published | Next.js 15 reference consumer |
| `registry/` (root) | — | — | served from raw-GitHub | shadcn-style copy-paste registry |

## Build & test commands

Run from repo root (pnpm workspace). Call scripts directly with `node` where noted.

```bash
pnpm --filter @cyanideui/ui build        # library
pnpm --filter @cyanideui/ui test         # 54 tests
pnpm --filter cyanideui build            # CLI (also rebuilds + bundles the registry)
pnpm --filter cyanideui test             # 19 tests
pnpm typecheck                           # all 4 packages
pnpm --filter @cyanideui/playground build
pnpm --filter @cyanideui/example-next build
node scripts/build-registry-index.mjs    # regenerate registry/index.json
```

All of the above must be green. CI (`.github/workflows/ci.yml`) runs them on push/PR to `main`.

## Registry architecture (key mental model)

Two distinct things on the internet, updated differently:

1. **The CLI** (`cyanideui` on npm) — changes only via `npm publish` / a release tag.
2. **The component source** (`registry/**`) — read **live** from
   `https://raw.githubusercontent.com/cyanideui/atrium/main/registry`. Ships on a plain
   `git push origin main`. **No CLI republish needed for component edits.**

`npx cyanideui add button` fetches code from the live raw-GitHub URL (default in
`packages/cli/src/lib/registry.ts`); the npm-bundled `dist/registry/**` is an offline
fallback. Registry has **78 items** (59 components, 4 templates, 2 shells, 8 blocks, 3 hooks,
2 lib), all pure copy-paste using `@/lib/utils` + `@/components/ui/*` (never `@cyanideui/ui`).
Prefix-fallback resolution: `add button` → `component-button`, `add dashboard` →
`template-dashboard`, `add data-table` → `block-data-table`.

Registry generators (run in order via `node`):
1. `scripts/generate-component-registry.mjs` — components → `registry/components/<name>/{meta.json, files/*}`; rewrites `../lib/cn` → `@/lib/utils`, `./x` → `@/components/ui/x`; computes deps.
2. `scripts/rewrite-registry-imports.mjs` — shell/template/hook items off `@cyanideui/ui` to `@/` aliases.
3. `scripts/build-registry-index.mjs` — writes `registry/index.json`.

## Release & publishing

Automated via `.github/workflows/release.yml` on a **version-tag push**:

```bash
# 1. bump version in packages/cli/package.json and/or packages/ui/package.json
#    (CLI --version is injected from package.json at build time, so just bump the file)
# 2. commit + push
git add -A && git commit -m "release: vX.Y.Z" && git push origin main
# 3. tag + push → triggers Release workflow
git tag vX.Y.Z && git push origin vX.Y.Z
```

- CLI → public npm, authed by repo secret **`NPM_TOKEN`** (granular write token, bypasses 2FA).
- Library → GitHub Packages, authed by the auto `GITHUB_TOKEN`.
- Each publish step is **skip-if-exists** (npm versions are immutable) — re-tagging won't hard-fail.
- Manual run available from the Actions tab (`workflow_dispatch`).
- Watch: `gh run list --repo cyanideui/atrium` then `gh run watch <id> --repo cyanideui/atrium --exit-status`.
- Published CLI: `0.1.0`, `0.1.1` (no-op), `0.1.2` (real: `--version` fix).

## Conventions & boundaries (do / don't)

- **Consumer docs use `npx cyanideui ...`** (universal). The monorepo's own scripts use `pnpm` — that's correct, don't conflate them.
- **Do NOT rename** the `@atrium:if` / `@atrium:endif` markers in registry source — they're internal framework-block transform syntax (`packages/cli/src/lib/transform.ts`), not package refs.
- **Brand "Atrium UI" + scope `@cyanideui`** are intentionally different. Leave as-is.
- **Credentials never through chat.** Refuse to handle `npm login` / OTP / raw tokens. If a user pastes a secret, treat it as compromised: use only if explicitly told, then tell them to revoke + rotate. Pass tokens via env var into a temp `.npmrc` and delete it; never commit secrets.
- **Always update `design.md`** (authoritative spec/changelog) after changes; keep `README.md`, `STARTER.md`, `PUBLISHING.md` in sync.
- For up-to-date third-party library docs, prefer Context7 MCP (if available) or web search over stale assumptions.

## Environment gotchas (Windows / PowerShell)

- `git` writes to **stderr**, which PowerShell shows as red "NativeCommandError" **even on success**. Trust the real output line (`main -> main`, `* [new tag]`), not the red text.
- Use `;` not `&&` to chain; keep inline `node -e` to one line.
- **Root `package.json` is often open in the editor and its buffer reverts disk writes** — do NOT rely on editing it. Committed state is `erp-ds-monorepo@3.9.0` (minified). Call scripts directly: `node scripts/build-registry-index.mjs` (this is also why CI calls the script directly, not a pnpm script).
- CI/Release actions pinned to current majors: `actions/checkout@v6`, `actions/setup-node@v6`, `pnpm/action-setup@v6` (Node 24). `pnpm/action-setup@v6` reads the pnpm version from `packageManager` (`pnpm@10.32.1`) — keep that field.
