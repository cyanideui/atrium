# Gotchas & Conventions

Hard-won lessons. Read before editing — these have bitten previous sessions.

## Environment (Windows / PowerShell)

- Shell is PowerShell on Windows. `git` writes progress to **stderr**, which PowerShell
  surfaces as red "NativeCommandError" text **even on success**. Always check the actual
  output line (e.g. `main -> main`, `* [new tag]`) and the exit behavior — don't trust the
  red text alone.
- Avoid `&&` chaining; use `;` in PowerShell. Keep inline `node -e` / `-Command` to one line.
- Use `node scripts/<x>.mjs` directly rather than relying on root package.json scripts (see below).

## Root package.json reverts disk writes (KNOWN ISSUE)

The root `package.json` is usually **open in the editor**, and its buffer **overwrites disk
writes** — edits don't persist. Do NOT rely on editing it.

- What's actually committed (`git show HEAD:package.json`): `erp-ds-monorepo@3.9.0`, minified,
  with scripts: `dev, dev:next(? )`, `build, build:ui, build:playground, preview, typecheck, clean`.
  The committed file does **not** reliably contain `build:registry` / `release` convenience scripts.
- The editor buffer sometimes shows a different prettified `atrium-monorepo@1.0.0` variant —
  that's the volatile buffer, not disk.
- **Therefore:** call scripts directly, e.g. `node scripts/build-registry-index.mjs`. CI does
  this too (the CI registry step calls `node scripts/build-registry-index.mjs`, not a pnpm script),
  which is why an earlier "pnpm build:registry" CI step failed with exit 254.

## Naming & branding

- Brand stays **"Atrium UI"**. npm **scope is `@cyanideui`** (scope must equal GitHub org for
  GitHub Packages). These intentionally differ — don't "fix" it.
- The `@atrium:if` / `@atrium:endif` transform markers in registry source are **internal syntax**
  (framework-block transforms in `packages/cli/src/lib/transform.ts`), NOT package references.
  Do NOT rename them to `@cyanideui`.

## Consumer commands

- Docs use **`npx cyanideui ...`** (universal, shadcn-like). pnpm/yarn/bun are noted as alternatives.
- The monorepo's OWN scripts correctly use `pnpm` — that's different from consumer-facing docs.

## Credentials — NEVER through the agent

- The agent must refuse to handle `npm login`, OTP codes, or raw tokens echoed in chat.
- If a user pastes a token/secret, treat it as **compromised**: use it if explicitly asked, then
  tell them to revoke + rotate it immediately. Store secrets directly in GitHub, never in chat.
- When a token must be used locally, pass it via an **env var into a temp `.npmrc`** and delete
  the file right after — never write the raw token to disk or commit it.

## CI / GitHub Actions

- Actions pinned to current majors: `actions/checkout@v6`, `actions/setup-node@v6`,
  `pnpm/action-setup@v6` (all run on Node 24; clears the Node-20 deprecation warning).
- `pnpm/action-setup@v6` reads the pnpm version from `packageManager` in package.json
  (`pnpm@10.32.1`) — keep that field present.
- Node version for jobs: `node-version: 22`.

## Always update docs after changes

`design.md` is the authoritative spec/changelog — update it. Also keep `README.md`,
`STARTER.md`, and `PUBLISHING.md` in sync with behavior changes.

## Use Context7 for library docs

When you need up-to-date docs for a third-party library/framework, prefer the Context7 MCP
(if available) or web search over stale assumptions.
