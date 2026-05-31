# Atrium UI v1.0.0

> A calm, content-first React component library for ERP and admin apps.
> **Inspiration:** Notion (information density & calm surfaces), Shopify Polaris (button chrome & compact tables), Linear (precision motion & keyboard-first interactions).
> **Stack:** shadcn/ui + Tailwind CSS v4 + hugeicons (Stroke Rounded).
> **Package:** `@cyanideui/ui`. Repo: `ledger-ui`. Workspace folders stay at `packages/ui/` and `apps/playground/` for now.

> **Changelog v1.0.0 — Renamed from `@erp-ds/ui` to `@cyanideui/ui`, four templates, route code-splitting, Next.js reference consumer**
>
> Renamed the entire project from "ERP Design System" to **Atrium UI**. The name reflects what the system is for — admin / ERP screens, where business records (the literal "ledger") are the primary content. Version reset to **1.0.0** to mark the first stable release under the new name.
>
> **Rename**
> - Package `@erp-ds/ui` → **`@cyanideui/ui`** (left room for `@ledger-ui/icons`, `@ledger-ui/charts` later).
> - Package `@erp-ds/playground` → **`@cyanideui/playground`**.
> - Monorepo `erp-ds-monorepo` → **`atrium-monorepo`**.
> - Sidebar brand "ERP DS" → **"Atrium UI"**, logo "DS" → "L".
> - localStorage keys `erp-ds.theme` / `erp-ds.density` → **`atrium.theme`** / **`atrium.density`**.
> - 70 source files updated via codemod. Workspace folders kept as `packages/ui/` and `apps/playground/` (zero churn vs. zero benefit).
> - **CSS class prefix stays `ds-*`** (`.ds-btn`, `.ds-radio`, `.ds-segmented-pill`, etc.). The prefix means "design system" generically, isn't user-facing, and renaming would touch ~50 internal selectors with no public-API benefit.
>
> **Next.js 15 reference consumer (new)**
> - Added `apps/example-next/` — a real Next.js 15 App Router app that consumes `@cyanideui/ui` as a workspace dependency. Three pages (`/` dashboard, `/orders` CRUD list, `/settings` tabbed form), wired through `next/link` + `usePathname()` for active-state, with `<DocShell>` + `<PageShell>` driving the layout.
> - **`"use client"` banner on the published bundle.** A postbuild script (`packages/ui/scripts/add-use-client.mjs`) prepends `"use client";` to `dist/index.js`. Without it, RSC server components that import from `@cyanideui/ui` fail with `createContext is not a function` because Next.js treats the bundle as a server module by default. With it, Next.js inserts the client boundary at the import site and consumer pages don't need their own `"use client"` directive — server components can render Atrium primitives like `<Badge>`, `<Sparkline>`, `<Table>` server-side without per-component opt-in.
> - **Tailwind v4 `@source` requirement.** Tailwind only scans the consumer's `src/` by default, so utility classes used inside `@cyanideui/ui` (compoundVariants, gap-*, h-*, etc.) wouldn't be generated. The Next example's `globals.css` adds `@source "../../../../packages/ui/src"` to point at the real source. For non-monorepo consumers, point at `node_modules/@cyanideui/ui/dist` instead.
> - Build verified: `pnpm --filter @cyanideui/example-next build` → all three pages prerendered as static HTML.
> - New root scripts: `pnpm dev:next` (runs at http://localhost:3000), `pnpm build:next`.
>
> **Four app templates (was: 1)**
> - **Dashboard** — KPI tiles + sparklines + recent-orders table (already shipped in v3.15).
> - **CRUD List (new)** — search + saved filter presets + bulk actions bar + sticky table + pagination + empty state. The reference for any "list of records" screen.
> - **Settings (new)** — tabbed sectioned form (Profile / Notifications / Security / Billing) with per-section autosave indicator. Uses the new `<ChoiceList variant="card">` for choice fields.
> - **Record Detail (new)** — breadcrumb + status badge + 2-column grid (line items + workflow timeline on the left, customer + payment cards on the right) + Drawer-based activity log inspector.
> - All four are at `apps/playground/src/routes/templates/*.tsx`. Drop the file into a consumer app, swap data sources, ship.
>
> **Performance pass 2 — route code-splitting**
> - Every showcase route now loads via `React.lazy()` + `<Suspense fallback={<RouteLoading pattern="list" />}>`.
> - **First paint chunk: 815 KB → unchanged** (Library + Radix + cmdk + react-day-picker still ship in `index-*.js`; necessary for the shell). **But every route after first paint is now 2–6 KB instead of bundled into the main chunk.** Total chunk count: 50+ tiny route files vs. one giant index.
> - Helper `lazyNamed(loader, name)` unwraps named exports so React.lazy gets a default. No need to add `export default` to every route file.
> - The `<RouteLoading>` skeleton (added in v3.23) is now actively used as the Suspense fallback, with `pattern="list"` as the safe default.
>
> **A11y spot-check pass**
> - Audited every icon-only button across the library: `<Banner>` close, `<Drawer>`/`<Modal>` close, `<DateField>` clear, `<ChipInput>` remove, `<NumberStepper>` increment/decrement, `<BulkActionsBar>` dismiss, `<Pagination>` prev/next, `<PageShellAction>`, `<DocSidebarFooterAction>`, `<SearchField>` clear, `<FileUpload>` remove. All have explicit `aria-label`s.
> - All `nav` regions labeled (`Primary`, `Pagination`, `Breadcrumb`).
> - Live regions: `<RouteLoading>` has `role="status" aria-live="polite"`, `<Spinner>` has `role="status"`, toasts use Sonner's built-in `aria-live`. `<BulkActionsBar>` has `role="region" aria-label="Bulk actions"`.
> - No findings worth shipping a fix for.
>
> **Builds**
> - `pnpm --filter @cyanideui/ui build` — green (197 KB ESM, 75 KB DTS, postbuild prepends `"use client"`).
> - `pnpm --filter @cyanideui/playground build` — green (3.6 s).
> - `pnpm --filter @cyanideui/example-next build` — green (Next.js 15, all 3 routes prerendered static).
>
> **Consolidation round (foundation polish)**
>
> A focused round of structural cleanup and infrastructure work — no new components, no new templates, no new visual treatments. Goal: take the system from "feature-complete" to "feature-complete + safe to maintain".
>
> **Scratch cleanup**
> - Removed `comparison.html`, `choice-list-comparison.html`, `layout-preview.html` from repo root — leftovers from earlier visual exploration rounds. The decisions they validated already shipped.
>
> **CSS layer reorganization**
> - Wrapped every `.ds-*` component class in `globals.css` inside `@layer components`. Tailwind v4 layer order is `base → components → utilities`; unlayered rules win over every layer regardless of specificity. Component classes were unlayered before, which is the root cause of the recurring "Unlayered CSS overrides Tailwind utilities" gotcha (`.ds-radio` background was beating `data-[state=checked]:bg-{tone}` Tailwind utility, etc.).
> - Now Tailwind utilities on the SAME element can override component class properties on state (`data-[state=…]`, `aria-[…]`, hover, etc.) without `!` workarounds. The `@layer base` block at the bottom (resets, body, scrollbar, focus, cursors) keeps its existing scope.
> - Keyframes stay unlayered (they don't participate in cascade).
> - Net effect: a whole class of cascade bugs is now structurally prevented, not just patched case-by-case.
>
> **Bundle splitting — subpath entries**
> - Added two opt-in subpath imports to keep the heavy components from bloating consumers that don't use them:
>   - `@cyanideui/ui/command-palette` — pulls cmdk (~30 KB) only when imported.
>   - `@cyanideui/ui/date-picker` — pulls react-day-picker (~80 KB) only when imported.
> - Main `@cyanideui/ui` entry still re-exports everything for one-stop convenience. Bundle-size-conscious consumers who only need basic primitives use the main entry; those who need a date picker or command palette opt in via the subpath. The bundler tree-shakes the rest.
> - tsup `splitting: true` produces shared chunks across entries so common deps (Radix primitives, our `cn` helper, Icon, etc.) aren't duplicated.
> - **Library bundle**: main `index.js` 200 KB → 188 KB (the heavy components are now in their own chunks, not the main bundle).
> - Postbuild script (`scripts/add-use-client.mjs`) updated to walk every emitted `.js` file in `dist/` so each chunk gets the `"use client"` directive — including subpath entries and shared chunks.
>
> **Test infrastructure (new)**
> - Vitest 2 + React Testing Library + jsdom set up in `packages/ui/`. Pinned to v2 so it stays compatible with Vite 5 across the workspace.
> - **54 smoke tests across 13 components / hooks**, covering the canonical contract (renders, accepts core props, fires basic interactions, density vars in inline styles where applicable):
>   - Components: `<Button>`, `<Input>`, `<Switch>`, `<Checkbox>`, `<Badge>`, `<Modal>`, `<Select>`, `<Table>`, `<DatePicker>`, `<DateField>`, `<CommandPalette>`, `<Toaster>`, `<ShortcutHint>`.
>   - Hooks: `useDensity`, `<DensityProvider>` scoping, `<DensityRoot>` cycle/persist/DOM sync, `useDensity` no-op fallback outside a provider.
> - `vitest.setup.ts` polyfills the jsdom-missing APIs Radix + cmdk both need: `ResizeObserver`, `IntersectionObserver`, `matchMedia`, `Element.scrollIntoView`, `Element.hasPointerCapture`/`releasePointerCapture`/`setPointerCapture`, `PointerEvent`. Test boilerplate stays minimal as a result.
> - Added `pnpm --filter @cyanideui/ui test` script. Future component additions get a smoke test as part of the §1b Component Readiness Checklist.
>
> **Publish path**
> - `packages/ui/CHANGELOG.md` (new) — first stable release notes + migration guide from `@erp-ds/ui`.
> - `prepublishOnly: "pnpm test && pnpm build"` script gates `pnpm publish` on a green test run + clean build. No more risk of publishing a broken release.
> - `.github/workflows/ci.yml` — lightweight CI that runs build + test + typecheck for the library, plus playground + Next.js example builds. Triggers on push + PR to main.
>
> **Verification**
> - `pnpm --filter @cyanideui/ui build` — green (188 KB main + small subpath chunks, 6 emitted files all carrying `"use client"`).
> - `pnpm --filter @cyanideui/ui test` — 54 / 54 passing.
> - `pnpm --filter @cyanideui/playground build` — green (3.24 s).
> - `pnpm --filter @cyanideui/example-next build` — green.
>
> **`@cyanideui/cli` + copy-paste registry (new)**
>
> A shadcn-style scaffolding system so new apps can adopt the playground's chrome in one command. The CLI copies **source files** into the consumer's repo — they own the code, no version lock.
>
> **Registry** (`registry/` at repo root)
> - Static, file-based. `git push` is the publish step. CLI fetches `registry/index.json` then per-item `meta.json` + files. v1 hosts via GitHub raw URLs; `ATRIUM_REGISTRY=file:./registry` overrides for local dev + tests.
> - **14 → 4 items shipped in v1** (scoped to "shell + hooks" per the actual need, not the full template catalog):
>   - `shell-doc` — the playground chrome, emptied of content: sidebar (brand, search, nav, footer) + content card + sticky topbar (breadcrumbs + theme toggle + settings popover) + command palette + keyboard cheatsheet + shortcut toasts.
>   - `hook-theme` — `useTheme()` external store
>   - `hook-shortcut-toasts` — the T/D/B/W confirmation chips
>   - `hook-cheatsheet` — `?` hotkey modal
> - `meta.json` per item declares files, npm deps, transitive registry deps, and post-install notes. `scripts/build-registry-index.mjs` validates every meta + declared file path and emits `index.json`. Run via `pnpm build:registry`.
>
> **Framework-aware transforms**
> - Registry source files wrap framework-specific lines in `// @atrium:if next` / `// @atrium:endif` (and JSX-comment `{/* @atrium:if … */}`) block markers. The CLI keeps the block matching the target framework and strips the rest — markers included. One source file → correct Next.js or Vite + React Router output.
> - Block-based, not token-interpolation: a block survives whole or is removed whole. The CLI refuses to write a file that still has unresolved markers.
> - v1 supports **Next.js (App Router)** and **Vite + React Router**.
>
> **CLI** (`@cyanideui/cli`, published as a bin)
> - `atrium init` — guides framework setup + Tailwind wiring, then runs `add shell-doc`.
> - `atrium add <item>` — resolves transitive registry deps (hooks land before the shell that references them), detects the framework, transforms + writes files, records the add in `.atrium/manifest.json`, prints missing npm deps + post-install notes. Flags: `--overwrite`, `--dry-run`, `--framework`.
> - `atrium list [category]` — browse the registry.
> - Built with tsup → single ESM bin (15 KB), deps: commander + prompts + picocolors.
>
> **Why the playground shell wasn't rewired to consume the registry**
> - Considered making the playground import the generic `shell-doc` (single source of truth). Rejected: the playground's shell has showcase-specific behavior (component-category nav, "todo" badges, doc-specific palette) that the generic starter deliberately omits. The registry shell is a *generic extraction*, not a replacement. Forcing the playground onto it would strip its showcase features. Templates (genuinely identical across uses) would be the right candidate for shared-source; the shell is not.
>
> **Tests**: 15 CLI tests (transform block logic incl. JSX comments + error cases, framework detection, e2e `add shell-doc` for both Next.js and Vite asserting transformed output + manifest). `packages/ui` tests excluded from the production `tsc` typecheck (they're vitest-only; jest-dom matchers are runtime-registered).
>
> **Docs**: new `STARTER.md` (new-app walkthrough, both frameworks), `packages/cli/README.md` (command reference), README "Starting a new app" section + repo-layout update. CI workflow runs registry build + CLI build + CLI test.
>
> **Verification (registry round)**
> - `pnpm build:registry` — index.json with 4 items, all validated.
> - `pnpm --filter @cyanideui/cli build` — green (15 KB bin).
> - `pnpm --filter @cyanideui/cli test` — 15 / 15 passing.
> - `pnpm typecheck` — clean across all 4 packages.
> - `pnpm --filter @cyanideui/ui test` — 54 / 54 still passing.
> - Playground + example-next builds — both green.
>
> **Publish prep + template expansion + cold-start (new)**
>
> Took the registry/CLI from "works in the monorepo sandbox" to "publishable + validated as a real npm artifact".
>
> **Registry now bundles inside the CLI package**
> - Re-architected source resolution: the default registry is `dist/registry/` *inside the published `@cyanideui/cli`*, not a GitHub raw URL. A postbuild step (`scripts/copy-registry.mjs`) copies `registry/` into `dist/registry/` on every CLI build. **This is the key decision for a private source repo** — the registry files travel with the npm package, so the CLI works offline, with no auth, regardless of repo visibility. `ATRIUM_REGISTRY=file:…` still overrides for dev.
>
> **Four templates promoted to registry items (4 → 8 items total)**
> - `template-dashboard`, `template-crud-list`, `template-settings`, `template-detail` — ported from `apps/playground/src/routes/templates/`, with `// @atrium:if next/vite` blocks switching the export style (`export default function` for Next.js pages vs named `export function` for Vite routes). Fixed the mojibake corruption that had crept into the detail template's comments.
>
> **`--yes` flag** added to `atrium add` for non-interactive automation (and the cold-start test).
>
> **True cold-start validation**
> - `pnpm pack`'d both packages, `npm install`'d the tarballs into a fresh project *outside the monorepo*, ran the **installed** CLI (`node node_modules/@cyanideui/cli/dist/index.js add shell-doc --yes`), and ran `tsc --noEmit` on the generated files against the installed `@cyanideui/ui`.
> - **Caught a real bug**: `nav-link-item.tsx`'s Next.js branch had a defensive `@ts-expect-error` on `href={to}` — but `<SidebarNavItem>` already accepts `href`, so the directive was unused and *errors* under strict TS. Removed it from the Next block (kept it in the Vite block, where `to` genuinely isn't a known prop). Re-verified: **`tsc --noEmit` → 0 errors** on the generated files. This is the strongest cold-start signal — fresh project, packed tarballs, generated code, clean compile.
> - Confirmed the CLI tarball contains `dist/registry/**` (all 8 items + index.json), and that the installed CLI resolves the bundled registry with zero config.
>
> **Publishing** — both packages set `publishConfig.registry = https://npm.pkg.github.com` (GitHub Packages, private) + `access: restricted` + `prepublishOnly: test && build`. `PUBLISHING.md` documents the full flow (org/scope requirement, PAT setup, `.npmrc`, publish order: ui before cli).
>
> **Verification (publish round)**
> - `pnpm --filter @cyanideui/cli test` — 18 / 18 passing (added template export-style + bundled-registry-resolution cases).
> - Cold-start `tsc --noEmit` on generated files — **0 errors** against the packed `@cyanideui/ui`.
> - `pnpm typecheck` — clean across all 4 packages.
> - Library + playground + example-next builds — all green.
>
> **Density mode — three levels, public API, and form-wide reflow (new in this round)**
>
> Up until now, density mode only resized the table — form heights, gaps, padding, and type were frozen. The `D` hotkey lived in the playground as a one-off, not in the library. This round upgrades density into a real first-class system.
>
> **Three levels (was: two)**
> - `compact-plus` (new) — 36 px rows, 28 px form-md, 24 px form-sm. For high-volume operators (audit logs, logistics, finance terminals).
> - `compact` (default) — unchanged. 44 px rows, 36 px form-md.
> - `comfortable` — unchanged. 52 px rows, 40 px form-md.
> - The `D` hotkey now **cycles** all three: `compact-plus → compact → comfortable → compact-plus`.
>
> **Tokens scale on five axes (was: heights only)**
> - Heights (rows + form-h-{sm,md,lg}) — unchanged.
> - **Gaps** — `--density-gap-{xs,sm,md,lg}` — `2/4/6/8 px` (compact-plus) → `4/6/8/12 px` (compact) → `6/8/12/16 px` (comfortable).
> - **Paddings** — `--density-pad-x` / `--density-pad-y` for section/card containers.
> - **Type scale** — `--density-text-{xs,sm,md}` — small bumps that, paired with the height changes, make comfortable feel genuinely roomier without looking blown up.
> - **Timeline rhythm** — `--density-timeline-pb` (event vertical spacing) + `--density-timeline-gap` (dot-to-content) — `12/8 px` (compact-plus) → `16/10 px` (compact) → `24/12 px` (comfortable = original). Consumed by `<WorkflowTimeline>` and the `audit-log` block.
> - Radii — and fixed glyphs like the timeline status dot — stay constant across modes so the visual identity holds.
>
> **Form components reflow (was: hardcoded h-7/h-9/h-10)**
> - **Wired to `--density-form-h-{sm,md,lg}`**: `<Input>`, `<SearchField>`, `<MoneyField>`, `<NumberStepper>`, `<ChipInput>`, `<DateField>`, `<SelectTrigger>`, `<SavedFilters>` trigger, `<FloatingLabelInput>` (the label re-centers via transform so it holds at any height).
> - **`<SegmentedControl>`** reflows on its own `--density-seg-h-{sm,md,lg}` scale (the compact values match its original 22/30/38 px, so the default look is unchanged).
> - **Buttons reflow on `--density-btn-h-{micro,sm,md,lg}`** — initially we kept buttons on a fixed scale, with the rationalization that "action affordances should stay legible across all densities". The Density showcase showed this was wrong: a side-by-side density preview that renders three identical button rows isn't a density preview, it's a misleading screenshot. Buttons now scale, just less aggressively than form fields (4 px steps vs 8 px), so toolbars compress in compact-plus without becoming unreadable.
> - **`<Switch>` reflows on `--density-switch-{track-w,track-h,thumb-size,thumb-translate}`** — the thumb-translate token is also applied via `data-[state=checked]:translate-x-[var(--…)]` so the slide distance scales with the track.
> - The `plain` button variant (text link) stays at `height: auto` because it isn't shaped like a button. All other variants pick up the density height.
> - The change is internal: every component still accepts the same `size="sm|md|lg"` prop. We just resolve the height through `var(--density-{form,btn}-h-${size})` instead of hardcoding it.
>
> **Public API — `<DensityProvider>`, `<DensityRoot>`, `useDensity()`, `useDensityHotkey()`**
> - Moved the playground's `useDensity()` hook into the library at `packages/ui/src/components/density.tsx` and exported a richer set of primitives:
>   - `<DensityRoot>` — top-level provider that owns the global mode, persists to localStorage, sets `data-density` on `<html>`, and exposes `density / setDensity / cycle` via context.
>   - `<DensityProvider density="compact-plus">` — scoped override for any subtree (a "dense audit log inside a roomy settings page" pattern). Sets `ds-density-{density}` class on the wrapper element so CSS variable cascade does the rest.
>   - `useDensity()` — read the active density and `setDensity` / `cycle` controls. Falls back to `compact` if no provider is mounted.
>   - `useDensityHotkey()` — wires the `D` shortcut to `cycle()`. Mount once near the top of your app inside a `<DensityRoot>`.
> - **Three application paths**: global (`<DensityRoot>` + `[data-density]` on `<html>`), scoped (`<DensityProvider>`), or manual (`.ds-density-*` class on any element). All three set the same CSS vars so the cascade works the same regardless of how the mode was applied.
> - Old `apps/playground/src/hooks/use-density.ts` becomes a thin re-export of the library API for backwards compatibility — no other call sites changed.
>
> **Foundations / Density showcase page (new)**
> - `/foundations/density` renders the same component three times wrapped in `<DensityProvider>` for each mode, side by side. Forms, table, toolbar — reviewers can finally see the impact without pressing `D` and squinting.
> - Last section demos a `compact-plus` audit log nested inside a `comfortable` settings shell, proving scoped override actually works.
>
> **Shortcut toasts (new) — promoted to library as `<ShortcutHint>` (component 53)**
> - **Library component:** `<ShortcutHint icon={...} label="..." shortcut="K" tone="default|info|success|warning|critical" hideShortcut?>` — a compact pill chip, ~32 px tall, auto-width, single line. Shape: `[icon 14] · label · | · <Kbd>K</Kbd>`. Hairline border + soft `shadow-elev-2`. Five tones available (default neutral + four token-driven tints). Pure visual primitive — no state, no Radix, no portal.
> - **Library helper:** `shortcutToast({ id, icon, label, shortcut, tone?, duration? })` — fires the chip via Sonner with `unstyled: true` so the global toaster's 360 px card frame is skipped (the chip paints alone). Default 1500 ms duration. Stable `id` per call site dedups against in-flight toasts.
> - **Why two pieces, not one:** `<ShortcutHint>` is reusable beyond toasts — drop into empty states, inline help, hover hints. `shortcutToast()` is the toast-specific wiring. Same split as `<Toaster>` / `toast()`.
> - **Playground integration** — every global shortcut (`T` / `D` / `B` / `W`) now fires a `shortcutToast()` from `apps/playground/src/hooks/use-shortcut-toasts.tsx`. Hook observes mode changes via `useTheme()`, `useDensity()`, `useOptionalDocShell()` and fires the matching chip. First-paint guarded so initial mount doesn't fire chips, deduped per mode so cycling fast replaces in-flight toasts.
> - **Icons per mode** (in the playground hook, not the library):
>   - Theme → `Sun02Icon` / `Moon02Icon`
>   - Density → `Menu09Icon` (compact-plus) / `Minimize02Icon` (compact) / `Maximize02Icon` (comfortable)
>   - Sidebar → `SidebarLeft01Icon` / `SidebarRight01Icon`
>   - Width → `ArrowShrink02Icon` / `ArrowExpand01Icon`
> - **Showcase page** at `/components/shortcut-hint` — anatomy, tones, hideShortcut variant, and three "Fire chip" buttons demoing the toast helper.
> - **Component count: 52 → 53 stable.**
>
> **`useTheme` rebuilt around a module-level store + `useSyncExternalStore`**
> - The old hook used `useState`, which gave every call site its own copy of the theme value. The DOM stayed in sync because the effect always wrote `<html class="dark">`, but React state in other hook instances never updated — so effects depending on `theme` (like the new toast notifier) never fired.
> - New hook is a tiny module-level external store: every `useTheme()` caller subscribes to the same value. One toggle → every subscriber re-renders, every effect runs. Same fix pattern would apply to any hook that owns shared global state across multiple call sites — also added to §1c Known Gotchas.
>
> **Next.js example app picks up density too**
> - `apps/example-next/src/components/shell-providers.tsx` now wraps `<DensityRoot>` around the Toaster — RSC server components stay fine because `<DensityRoot>` is in the `"use client"` bundle and the wrapper itself is a client component.
>
> **Date Picker — selected day no longer grows**
> - Selected dates were rendering visibly larger than neighbours because react-day-picker's upstream stylesheet sets `font-size: large` AND `font-weight: bold` on `.rdp-selected` — both bumping the cell size to ~18 px and chunkier weight while neighbours stay at 12.5 px. Our overrides only touched `font-weight` on the inner button, never the cell.
> - **Fix**: explicit `font-size: inherit; font-weight: inherit` on `.rdp-selected` (cell) AND `.rdp-selected .rdp-day_button` (button) so digits stay 12.5 px / 400-weight just like neighbours. Our component-specific rules below still set the *button* font-weight where the actual selected pill lives. Single mode + range mode both fixed.
>
> **Gradient chrome propagated to form triggers (new in this round)**
> - **`<SavedFilters>` trigger**, **`<DateField>` trigger**, **`<SelectTrigger>`** all now use a shared `.ds-trigger` CSS class — same Polaris-style gradient + 1 px hairline-strong border + inset bottom highlight + outset bottom shadow as `<Button variant="secondary">`, `<Switch>` track, `<SegmentedControl>` pill, `<DocSidebarSearch>`, `<Checkbox>`, and `<Radio>`.
> - Off-state default (gradient applied at rest, not only on hover). Hover deepens to `linear-gradient(180deg, #f6f6f7 0%, #ebecee 100%)`. `[data-state="open"]` swaps to a flat `#ebecee` + inset top shadow so the trigger reads as "held down" while its panel is open. Disabled gets the flat `--surface` treatment with no chrome.
> - Dark mode mirrors the Button family: `linear-gradient(180deg, #2a2a2e 0%, #1f1f22 100%)` with reversed inset highlights.
> - Focus uses `outline: 2px solid var(--ink); outline-offset: 1px` (not Tailwind ring) — the gradient's `box-shadow` would have eaten a `box-shadow`-based focus ring. Same approach as `<Button>`.
> - Removed redundant Tailwind utilities from each component: `bg-canvas`, `shadow-[inset_0_1px_0_…]`, `hover:bg-surface`, `hover:border-ink-3`, `focus-visible:ring-1 focus-visible:ring-ink`, `data-[state=open]:ring-1 data-[state=open]:ring-ink`. The class handles all four states (rest / hover / open / disabled) plus dark mode in one declaration.
> - `<DocSidebarSearch>` keeps its own `.ds-sb-search` class (same gradient, but uses an `:active` state instead of `[data-state="open"]` — it isn't a Radix trigger). Spec stays unified: any "button-like" trigger that opens an overlay uses `.ds-trigger`; any "button-like" trigger that fires an action (like the sidebar search opening the command palette) uses `.ds-sb-search`.
>
> **Component count: 53 of 53 stable** — `<ShortcutHint>` (+ `shortcutToast()` helper) added in this round. All components from `design.md` §5 ship.
>
> **Changelog v3.23 — Density mode + Table empty + Loading patterns + Dark-mode audit**
>
> Path 2 work — finishing the polish queue from §10.
>
> **Density mode (`D` hotkey)**
> - New CSS variables in `tokens.css`: `--density-row-h`, `--density-head-h`, `--density-cell-py`, `--density-form-h*`. `:root` defaults to compact (44 px rows, 36 px headers); `[data-density="comfortable"]` bumps each by ~4–8 px for breathing room on dense ERP screens.
> - **`<Table>` and `<StickyColumn>`** picked up the vars via `style={{ height: 'var(--density-row-h)' }}`. Switching density now reflows every Table/StickyColumn across the playground.
> - **Playground `useDensity()` hook** at `apps/playground/src/hooks/use-density.ts` — toggles `<html data-density="comfortable">` on the `D` hotkey, persists to localStorage, ignores modifier combos, skips while typing.
> - Wired into the cheatsheet (new entry: "Toggle density (compact ↔ comfortable)") and the playground command palette (Actions group bumped from 4 → 5 items).
>
> **`<TableEmpty>` (new)**
> - Empty-state row that spans all columns and centers an icon + title + description + actions block. Drop-in replacement for the bare `<TableBody>` content when `rows.length === 0`.
> - Pairs with the existing `<EmptyState>` (which is page-level) — `<TableEmpty>` is table-level, lives inside `<TableBody>`.
>
> **`<RouteLoading>` (new)**
> - Five drop-in skeleton scaffolds for the common route patterns: `dashboard` (KPIs + table), `list` (header + table), `detail` (title + 2-column form), `form` (sectioned form), `card`. Pass `pattern="..."` and the helper composes the right primitive skeletons.
> - Pair with `<DocContent pulseKey={pathname}>` (already wired in the playground) so the scrollbar pulses on the loading-to-loaded transition.
> - Lives at `packages/ui/src/components/route-loading.tsx`. Exports `RouteLoading` + types from `@cyanideui/ui`.
>
> **Dark-mode audit (spot-fixes done)**
> - Spot-checked Banner, EmptyState, Skeleton (shimmer), ProgressCircle, Table selected rows, dropdown items — all token-driven and dark-aware. The previous v3.18 / v3.21 audits caught the bulk; this pass confirmed no further regressions.
> - The remaining `inset 0 1px 0 rgba(0,0,0,0.02)` shadows on Input / Select / Textarea / SearchField / SavedFilters / NumberStepper / MoneyField / DateField / ChipInput / ChoiceList card surfaces are subtle enough that they don't read as bugs in dark mode (where the bg is already dark) — left them as-is.
>
> **Component count**: **52 of 52 stable** (TableEmpty + RouteLoading added; both have no `todo` showcase pages — they're embedded in the existing Table and Skeleton showcases).
>
> **Changelog v3.22 — Gradient family expansion + scrollbar overlay + Kbd primitives**
>
> A long polish pass that propagates the Polaris-style gradient chrome (already present on Buttons) to the rest of the form family, plus a few quality-of-life improvements to the command palette and a brand-new overlay scrollbar treatment.
>
> **Gradient chrome — Polaris parity**
> - **`<Switch>`** rebuilt around `.ds-switch` + `.ds-switch-thumb` CSS classes. Off-state track is `linear-gradient(180deg, #efeeec 0%, #e5e3df 100%)` with an inset top shadow so it reads "pressed". On state swaps to a tone-driven gradient: `default` → near-black, `success` → green, `warning` → orange, `critical` → red, `info` → blue. Thumb has its own gradient + inset highlight + drop shadow so it reads as a porcelain knob in any state. Dark mode flips both.
> - **`<SegmentedControl>`** — sliding pill picks up `.ds-segmented-pill` chrome with the same gradient + inset highlight + 1px hairline border as `<Button variant="secondary">`. Replaces the previous flat `bg-canvas` + elev-1 shadow.
> - **`<DocSidebarSearch>`** — flat `bg-surface-2` swapped for `.ds-sb-search` chrome (gradient + 1px border + insets), so the search trigger reads as a real button instead of an inert search field. Hover deepens the gradient. Margin nudged from `mx-2` → `mx-3` so the bar reads slightly inset from the panel edges.
> - **`<Checkbox>`** picked up the same Polaris-style off-state chrome via `.ds-checkbox` (gradient + inset shadow). Border thickness unified from `border-[1.25px]` → `border` (1 px) to match the family.
> - **`<ChoiceList>` radio — Direction B (filled-on-checked).** Off state: 18×18 hollow ring (1.5 px hairline-strong border) over a clean `--canvas` surface. On state: entire 18×18 fills with the tone color (default → ink, info → info, etc.) with an inset top highlight + bottom shadow so it reads as a pressed surface. Indicator dot is 10×10, with a **radial gradient** (`#ffffff 0% → #e8e8ea 50% → #a8a4a0 100%`) plus inset top highlight and tiny drop shadow, so it reads as a porcelain bead with proper rim falloff. Centered via flex on the Item itself (was `absolute inset-0` which drifted by half-pixels with the 1.5 px border).
> - **`<ChoiceList>` variants & tones.** New `variant="plain" | "card"` and `tone="default | success | warning | critical | info"`. Card variant gives each row a 1 px hairline border, a hover that deepens to `--ink-3`, and a tone-driven active state (border + soft tinted wash). Plain variant gets a subtle `bg-surface/60` hover on the entire row.
>
> **Date picker — range fix**
> - The selected range was visually growing the row because the day_button was 32×32 (full cell). Reverted to **28×28 button inside the 32×32 cell**, with the **cell** painting the surface-2 band instead of the button. Range edges paint a hard-edge half-gradient on the cell so adjacent cells join cleanly into a continuous band. Single-day range still renders as a clean pill. Result: ink pills float on a continuous surface-2 band — the canonical Notion / Linear range look.
>
> **Command palette polish**
> - **Outer radius** `rounded-lg` (12 px) → `[border-radius:6px]` for a tighter, less floating feel.
> - **Width** 640 → 520 px. **Top anchor** 120 → 88 px. **List max-height** 400 → 320 px. **Item rows** 40 → 36 px. **Input row** 48 → 44 px. Closer to a Linear / Raycast feel.
> - **Right-edge slot — single source.** Each item shows **either** a keycap shortcut **or** an active-row chevron, never both. The chevron only renders for items without a `shortcut`, fading in on the highlighted row. Killed the "shortcut + arrow" double-affordance noise.
> - **Sticky group headings** while scrolling — translucent `bg-canvas/85` + 3 px backdrop blur. Notion / Raycast / GitHub pattern.
> - **Count badges on group headings** (`Forms 14`, etc.) via the new `count` prop on `<CommandPaletteGroup>`.
> - **Soft open animation** — `35 ms snap` → `160 ms ease-emphasis settle` (`fade-in-0 zoom-in-[0.96] slide-in-from-top-1`). Close stays fast at 80 ms.
> - **Instant highlight** — dropped the row's hover/keyboard-nav transitions entirely. Per design.md §2.7 dense lists should use no transition (or `--dur-fast` at most). The 150 ms crossfade I'd introduced felt mushy when arrowing through.
> - **Light scrollbar** through the new `.ds-scroll-overlay` class.
>
> **Kbd primitives — file rename + new helpers**
> - **`<Keycap>` / `<KeycapGroup>`** renamed to **`<Kbd>` / `<KbdGroup>`** (matches the HTML `<kbd>` element). File moved from `keycap.tsx` → `kbd.tsx`. Old names re-exported as `@deprecated` aliases — existing code keeps working.
> - **New `<KbdShortcut>`** primitive — parses a shortcut string (`"⌘K"`, `"⌘+⇧+P"`, `"Ctrl+K"`, `"Esc"`, `"↵"`) into individual styled keys joined by `<KbdGroup>`'s `+` separator. Used internally by `<DocSidebarSearch>` and `<CommandPaletteItem>` so consumers can pass plain strings and get proper key combos for free.
> - **All raw `<kbd>` elements swapped to `<Kbd>`** across the lib + playground (search field's `/`, cheatsheet shortcut grids, sidebar search trigger, command palette `esc`, doc-shell preview, doc-shell demo, playground settings menu).
>
> **Overlay scrollbar — Notion / Linear / Raycast style**
> - New `.ds-scroll-overlay` utility class. Hidden at rest, fades in on `:hover` or `[data-scrolling="true"]`. After ~300 ms idle, fades out. `scrollbar-gutter: stable` keeps the layout from shifting.
> - **Bonus 1**: thumb darkens to `--ink-3` on hover and on `:active` drag the inner transparent border shrinks (visible thumb gets fatter — Linear's grippy pattern).
> - **Bonus 2**: `data-pulse="true"` plays a one-shot 800 ms keyframe (hairline-strong → info → transparent). Triggered by the new `<DocContent pulseKey={...}>` prop on every route change in the playground.
> - **`useScrollOverlay()`** hook returns `{ ref, pulse }` for any scrollable container.
> - Wired into `<DocContent>`, `<DocSidebarNav>`, and `<CommandPaletteList>`.
>
> **Modal sizing (rolled back)**
> - The v3.21 → v3.22 modal compaction (`sm 480 → 400`, `md 560 → 480`, etc.) was reverted. Modals stay at the original `480 / 560 / 720 / 960` widths with `rounded-lg`. Reason: confirmation/quick-edit dialogs already need that space, and the compaction was driven by a misread question (the user wanted the **command palette** smaller, not the modal).
>
> **Toaster doubled fix**
> - Both `App.tsx` AND the toast showcase page were mounting `<Toaster>`, leading to one container per position. Removed the showcase-page mount; `<Toaster>` is now a true singleton at the App root, position `top-center`.
>
> **Overlay tint + blur**
> - Modal, Drawer, CommandPalette, KeyboardCheatsheet, and the `<PageShell>` app bar all dropped from 4 px → **3 px** blur (`backdrop-blur-[3px]`). Uniform `bg-black/25` overlay tint everywhere except the app bar (which uses `bg-canvas/85` for the frosted-glass effect).
>
> **§1c Known Gotchas — three new entries**
> - "Toaster mounted twice → toasts split between top-center and top-right" — global UI singletons (Toaster, GlobalCheatsheet, CommandPalette) belong at the App root only.
> - "Tailwind `[&_*]` selectors don't match portaled siblings" — when a third-party library (cmdk) portals an overlay outside its wrapper, descendant selectors won't reach it. Use a global CSS rule on the element's own data-attribute instead.
> - "Unlayered CSS overrides Tailwind `@layer utilities`" — `.ds-radio { background: var(--canvas); }` was beating the `data-[state=checked]:bg-{tone}` Tailwind class because unlayered rules win over layered ones regardless of specificity. Move base styles into Tailwind classes (`bg-canvas` directly on the element) instead of writing them in unlayered global CSS.
>
> **Changelog v3.21 — Command palette polish (visual + motion + light compaction)**
>
> **Command palette — light compaction**
> - **Width** 640 → **560 px** (~12% trim, matches the v3.20 attempt the user revised toward).
> - **Top anchor** 120 → **88 px** — closer to the user's focal area, less floating-in-space feel.
> - **Item row** 40 → **36 px** — moderate density bump. Text stays at 13 px and paddings stay the same so labels still breathe.
> - **Input row, footer, fonts, paddings, group headings** all unchanged. The previous v3.20 compaction tried to shrink everything; this pass only adjusts the three dimensions that actually felt loose.
>
> **Command palette polish (visual + motion)**
>
> **Visual**
> - **6 px outer radius.** Outer container moved from `rounded-lg` (12 px) to a custom `[border-radius:6px]` for a tighter, less floating feel.
> - **Right-side slot is now single-source.** Each item shows **either** a keycap shortcut **or** an active-row chevron — never both. The chevron only renders for items without a `shortcut`, fading in on the highlighted row. The keycap stays visible at rest in `--ink-4` and brightens to `--ink-2` on selection. This kills the "shortcut + arrow" double-affordance noise (Raycast pattern: shortcut implies action; chevron telegraphs "Enter to go").
> - **Sticky group headings** while scrolling. As you scroll past a section, its heading pins to the top of the list area with a translucent `bg-canvas/85` + 3 px backdrop blur, so you always know which section you're in. Notion / Raycast / GitHub use this pattern.
> - **Count badges on group headings** (`Forms 14`, `Components · Actions 5`, etc.). Helps the user gauge whether a group is worth scanning. Rendered after the heading text in `text-ink-4` `tabular-nums`.
> - **Active-row chevron** — a small `→` glyph fades in on the right edge of the highlighted row only. Telegraphs "press Enter to navigate" without taking permanent space. Animates `opacity 0 → 1` plus a 4 px `translateX` settle on selection (`var(--dur-base)` `var(--ease-standard)`).
> - **Light scrollbar** — `[scrollbar-width:thin]` + 6 px webkit thumb in `var(--hairline-strong)`. Matches the rest of the system (sidebar nav, table). Default chunky scrollbar was visually loud.
>
> **Motion**
> - **Open animation softened.** Replaced the abrupt `35 ms fade-in-0 zoom-in-95` snap with a calmer `160 ms ease-emphasis` settle: `fade-in-0 zoom-in-[0.96] slide-in-from-top-1`. Closer to Linear's overlay feel — present without being pushy. Close stays fast at `80 ms` so dismissals don't feel laggy.
> - **Smooth highlight crossfade.** Item bg/text transitions on `var(--dur-base)` `var(--ease-standard)` instead of swapping instantly when the user keyboard-navigates or hovers. Subtle, but it makes the palette feel deliberate instead of jittery.
> - **Leading icon transitions to active.** Icon color glides from `--ink-3` to `--ink` over `var(--dur-base)` along with the row, so the highlighted row's icon doesn't pop in.
>
> **API**
> - `<CommandPaletteGroup count={...}>` — new optional prop. Use it to render the per-group count badge.
> - `CommandPaletteGroupProps` is now exported alongside the other types.
>
> **Changelog v3.20 — Sidebar search horizontal nudge**
>
> - **`<DocSidebarSearch>` margin** bumped from `mx-2` → `mx-3`. Visually the search bar now sits slightly inset from the brand row above and the nav items below — reads as part of the sidebar group instead of butting up against the panel edges. Height, text size, icon size, and kbd badge unchanged.
> - **Command palette compaction reverted.** The v3.20 compaction (560 px wide, 32 px items, 13 px text → 12.5 px) was rolled back to the v3.19 sizing — palette readability beat density on review.
>
> **Changelog v3.19 — Date picker rewrite + 3 px blur + segmented control radius**
>
> - **Date picker rewritten on top of `navLayout="around"`.** The previous iterations kept fighting react-day-picker v10's nav layout — the default `inset-end` mode places `.rdp-nav` absolutely at `top:0; right:0` over the caption, which is why the prev/next chevrons were overlapping the month name (and why my custom `.rdp-nav` overrides kept introducing new bugs). The fix: pass `navLayout="around"` to `<DayPicker>` and stop overriding `.rdp-nav` / `.rdp-button_*` positions. The library now puts the chevrons on either side of the month caption, where they belong.
> - **`<DatePicker>` simplified.** All structural classNames overrides removed — we set CSS custom properties (`--rdp-day-height`, `--rdp-day_button-border-radius`, `--rdp-accent-color`, etc.) and write a small set of targeted `.ds-datepicker .rdp-*` rules in `globals.css`. The day_button now fills the entire 32×32 cell so range edges read as a continuous band instead of disconnected pills.
> - **Range middle days** keep the library's default cell-level half-fill gradient (`linear-gradient(90deg, transparent 50%, surface-2 50%)` on the start cell, mirrored on the end), then we paint the day_button solid `--ink` on top. This produces the canonical Notion / Linear range look — start and end pills tucked into a continuous band.
> - **Overlay blur dropped from 4 px to 3 px** across all overlays and the app bar. The 3 px setting reads as "barely there", which is closer to Linear's overlay than Notion's heavier blur. Updated:
>   - `Modal`, `Drawer` overlays → `backdrop-blur-[3px]`
>   - `CommandPalette` overlay (global rule) → `blur(3px)`
>   - `<PageShell>` app bar (frosted glass) → `backdrop-blur-[3px]`
> - **Segmented control radius matched to Button (8 px outer / 5 px inner pill).** Previous version used `rounded-pill` (999 px), which felt out of place next to other 8-px controls. The outer container now uses `rounded-md` (8 px / `--radius-md`), and the inner sliding pill uses `rounded-sm` (5 px / `--radius-sm`) so it nests cleanly inside the 4-px container padding (8-4=4 px gap × concentric 5 px = visually correct). Linear uses the same nesting math.
> - **§1c Known Gotchas updated** — added "react-day-picker `nav-layout` defaults to `inset-end`" so future contributors don't fight it again. Also "buttons + segmented control should share radius tokens" so the radius consistency shows up at review time.
>
> **Changelog v3.18 — Overlay/sticky/calendar polish**
>
> - **Toaster doubled at top-right + top-center.** Both `apps/playground/src/App.tsx` AND `apps/playground/src/routes/components/toast.tsx` were mounting `<Toaster>`. Toast position is global — `<Toaster>` should be mounted once at the app root only. Removed the duplicate. Now the toast lives at top-center as intended.
> - **Date picker range edges had sharp corners.** When I removed the structural classNames in v3.17 to fix the layout collapse, the per-edge rounding for `range_start` and `range_end` went with it. Re-added as targeted `.ds-datepicker .rdp-range_start` / `.rdp-range_end` rules in `globals.css` — left edge rounds left, right edge rounds right, single-day range keeps all four corners. The middle days remain square.
> - **Command palette overlay had no blur.** `cmdk` portals `[cmdk-overlay]` as a sibling of the dialog content, not a descendant of the wrapper, so the Tailwind `[&_[cmdk-overlay]]` selectors I'd written never matched. Replaced with a global `[cmdk-overlay]` rule in `globals.css` that mirrors the unified `bg-black/25` + `backdrop-blur-sm` (4 px) tokens. Also dropped the now-redundant Tailwind selectors from `command-palette.tsx` so there's no double-blur.
> - **Sticky table cells lost positioning.** The `<StickyColumn>` had `"sticky relative z-[5]"` — `relative` overrides `sticky`, killing the pin entirely. The pseudo-element edge shadows then floated to nowhere. Removed `relative`; `sticky` already establishes a containing block for `::before` / `::after`.
>
> **§1c Known Gotchas updated** — added three entries:
> - "Toaster mounted twice" — global UI singletons (Toaster, GlobalCheatsheet, CommandPalette) belong at the app root only, never in component showcase pages.
> - "Tailwind `[&_*]` selectors don't match portaled siblings" — when a third-party library (cmdk, Radix in some configs) portals an overlay outside its wrapper, descendant selectors won't reach it. Use a global CSS rule.
> - "`sticky` and `relative` together" — `position: relative` overrides `position: sticky`. Use `sticky` alone; it already establishes a containing block.
>
> **Changelog v3.17 — Segmented Control + cross-component polish**
>
> **New: `<SegmentedControl>` (§5.2)**
> - Linear-style sliding-pill selector. The active pill is a single absolutely-positioned element that animates between cells via `transform: translateX(...) width:...`, instead of restyling each item — buttery-smooth, no layout flash.
> - Sizes: **22 px (sm)**, **30 px (md, default)**, **38 px (lg)** matching §5.2.
> - Container `bg-surface` `radius-pill` `p-1`; pill `bg-canvas` `radius-pill` `shadow-elev-1`; items text-only, hover `text-ink-2`, active `text-ink`.
> - Animation: 250 ms `ease-emphasis` on `[transform, width]`. **No animation on first paint** — only after first user interaction. Reduced motion: snap (no transform transition).
> - Accessibility: `role="radiogroup"` + `role="radio"` per item, full keyboard support (←/→, Home, End), focus ring on active item only, disabled items skipped during keyboard nav.
> - Composable cells: `icon`, `label`, `badge`, `disabled` per option. Generic over `value` type so the union narrows in your handlers.
>
> **Bug fixes**
> - **Calendar layout broken.** `<DatePicker>` was forcing `flex` on the day grid and stripping react-day-picker v10's default CSS variables, which collapsed every row into a single line of run-on numbers. Fixed by removing the structural classNames overrides (`root`, `month_grid`, `weekdays`, `week`, `day`) and letting the library's default grid layout handle structure. Visual tokens (selected, range edges, today, hover) now ride on top via the `--rdp-*` CSS variable rebinding in `globals.css` plus targeted `.ds-datepicker .rdp-*` overrides. Calendar now renders the canonical 7-column × 5–6-row grid with proper cell sizing.
> - **Sticky table columns clipping content during scroll.** The edge-shadow gradients were anchored to the scroll container's `left:0` / `right:0`, painting over the frozen group itself. Bug visible as a "Status" pill being sliced in half by an invisible band on top of the right-frozen Actions column. Fixed by anchoring the gradients to the **last left-frozen** and **first right-frozen** cells via `::after` / `::before` (with `data-sticky-edge-left` / `data-sticky-edge-right` data attributes set during the offset-compute pass). The shadow now travels with the frozen group and never overlaps it. Cells get `position: relative` so the pseudos anchor correctly.
> - **Toast position.** Default playground position changed from `top-right` to `top-center` per Notion / Linear convention (top-center reads as "global notice"; top-right is for less-urgent activity).
>
> **Unified overlay tint + blur**
> - All overlays (Modal, Drawer, CommandPalette, KeyboardCheatsheet via Modal) now use **`bg-black/25` + `backdrop-blur-sm` (4 px)** instead of the previous `bg-black/40` + `backdrop-blur-[1px]`. The lower tint keeps the page recognisable behind the overlay; 4 px blur is the Linear / Notion sweet spot — calm, not laggy.
> - The `<PageShell>` app bar dropped from `backdrop-blur-md` (12 px) to `backdrop-blur-sm` (4 px) to match.
>
> **§1c Known Gotchas updated** — added two entries:
> - "Library default CSS overridden by aggressive classNames" — when restyling a third-party component (react-day-picker), override visuals only and leave the library's structural classes alone.
> - "Sticky-column edge shadows on the scroller paint over the frozen cells" — anchor edge gradients to the cells themselves via pseudos with data-attribute selectors, never to `position: absolute; left/right: 0` on the scroller.
>
> **Changelog v3.16 — Unified `<PageShell>` (single page-header component)**
>
> Three near-identical components shipped over the past three rounds — `<PageShell>`, `<DocPageHeader>`, and the playground's `<PlaygroundTopBar>`. v3.16 folds them into one.
>
> - **`<PageShell>` extended.** Now renders **two stacked sticky bars + body** when used inside `<DocShell>`:
>   - **App bar** (sticky top, shell-level): built-in sidebar toggle on the left, `breadcrumb` slot in the middle, built-in width toggle, then consumer-supplied `appBarActions` cluster.
>   - **Banner** (non-sticky): scrolls away with the body, above the page header.
>   - **Page header** (sticky, page-level): title + subtitle + metadata + secondary/primary actions. When `tabs` are provided, the page header becomes non-sticky and the tabs row takes over the sticky slot (Notion pattern).
>   - **Tabs row** (sticky when present): pinned just below the app bar.
>   - **Body**: renders children. Use `<DocBody>` inside if you want centered ↔ full-width to track the shell.
> - **Outside `<DocShell>`** the app bar is omitted automatically (`useOptionalDocShell()` returns null) — only the page header renders. Lets the same component serve standalone forms, print pages, modals-as-pages.
> - **`<PageShellAction>`** — generic icon button for the `appBarActions` slot. Supports `href` (for external links), `dot` (notification indicator), built-in tooltip + aria-label.
> - **`<PageShellDivider>`** — vertical separator for splitting action clusters.
> - **`title` is now optional** — pass nothing to render only the app bar (useful when the body has its own header, e.g. doc-site routes).
> - **`useOptionalDocShell()`** — non-throwing variant of `useDocShell()` that returns `null` outside the shell. Use when a component should work both inside and outside `<DocShell>`.
> - **`<DocPageHeader>` deprecated** — keeps working but flagged for removal in v3.17. All call sites migrated.
> - **Playground `<PlaygroundTopBar>` deleted** — its responsibilities live in the unified `<PageShell>` now.
> - **Playground sidebar search uses `<DocSidebarSearch>`** — clicking opens the new `<PlaygroundCommandPalette>` (cmdk-based), keeping behaviour consistent with the `⌘K` hotkey. The old inline filter input is gone.
> - **`<PlaygroundCommandPalette>`** — populates groups from `nav.ts` (every section + category becomes a heading), plus an Actions group for theme toggle, cheatsheet, GitHub. Wired globally via `⌘K` / `Ctrl+K`.
> - **§4.4 in design.md** rewritten as the canonical PageShell spec; §4.5 (DocShell) now references §4.4 instead of describing a parallel header.
> - **§1c Known Gotchas** gains "two parallel page headers shipped at once" — when adding a sticky surface inside an existing sticky-aware shell, extend the existing one before forking.
>
> **Changelog v3.15 — Round 6: Date Picker (50 / 50 stable) + app-shell polish**
>
> **Date Picker (Round 6)**
> - **`<DatePicker>`** — token-styled wrapper around `react-day-picker` v10 (the v10 API uses `mode="single|range|multiple"` with `selected` / `onSelect` types narrowed per mode). All three modes share the same surface. Custom `Chevron` slot uses `ArrowLeft02Icon` / `ArrowRight02Icon` so navigation matches the rest of the system.
> - **`variant`** — `card` (default; bordered, `radius-md`, `shadow-elev-1`) or `bare` (no chrome) for embedding inside Popovers and Drawers.
> - **`<DateField>`** — input-shaped trigger that mirrors `<Input>` chrome (8px radius, hairline-strong border, focus ring, disabled state) and opens a `<DatePicker variant="bare">` inside a `<Popover>`. A discriminated union on `mode` keeps `value` / `onChange` correctly typed for single vs range. Range mode auto-closes once both edges land.
> - **Localised formatters:** `formatDate` and `formatRange` props let you swap the display (e.g. plug in `date-fns` `format`). Defaults use `Intl.DateTimeFormat`-equivalent options and collapse the year on same-year ranges.
> - **Disabled days:** all `react-day-picker` matchers pass through (`{ before: today }`, `{ from, to }`, `{ dayOfWeek: [0, 6] }`, etc.).
> - **Size parity:** `sm | md | lg` on `<DateField>` matches `<Input>` exactly so they line up in mixed-control rows.
> - **Re-exports:** `DateRange` is re-exported from `@cyanideui/ui` so consumers don't need a direct dep on `react-day-picker`.
> - **Base CSS:** `react-day-picker/style.css` is now imported from the library's `globals.css` for the calendar grid layout (animation keyframes, table structure). All visual tokens still come from our `classNames` overrides.
> - **All 50 `design.md` components are now stable.** No more `todo` pages in the playground.
>
> **App-shell polish (follow-up)**
> - **Playground top bar.** The playground now mounts a sticky `<PlaygroundTopBar>` inside `<DocContent>` with sidebar toggle, breadcrumb (auto-derived from `nav.ts`), width toggle, theme toggle, help (cheatsheet), and GitHub link — matching the original `layout-preview.html` mock.
> - **Single collapse affordance.** The floating button on the sidebar's right edge was removed; the top-bar toggle is now the only collapse control (less visual noise, single source of truth).
> - **Working `T` shortcut.** `T` now toggles the theme globally. Listener mounted at App root, skipped while typing, and ignores `Cmd/Ctrl+T` so it doesn't hijack browser shortcuts.
> - **Working width toggle.** `<DocBody>` listens to the shell's `bodyWidth` so the topbar's centered ↔ full toggle (and the `W` hotkey) actually moves the content. New `centeredMaxWidth` prop on `<DocBody>` lets consumers override the 720px default.
> - **Polished collapsed sidebar.** New `SidebarCollapseProvider` context drives `<SidebarNav>`, `<SidebarNavSection>`, `<SidebarNavItem>`, `<SidebarNavParent>` to icon-only, auto-tooltipped form when the surrounding shell is collapsed. Section titles, badges, and parent chevrons hide; an unread-badge becomes a tiny info dot. The playground's filter input is now hidden via a small `CollapseAware` helper.
> - **Cheatsheet wired through the help button.** Cheatsheet state lifted to App so the top-bar help button (`?`) opens the same modal as the `?` hotkey.
> - **§1c Known Gotchas updated** with two new entries: "advertised hotkey not wired" and "app-shell missing visible top bar" — both bug classes we just shipped.
>
> **Dark mode audit**
> - Tinted secondary buttons (critical / success / warning / info) now have explicit `.dark` overrides so they don't blow out into white-on-dark.
> - Tertiary default hover/active swapped from `rgba(0,0,0,…)` to `rgba(255,255,255,…)` under `.dark` so the ghost hover is visible on dark canvas.
> - Disabled button gradient given a dark counterpart (was light grey on dark canvas).
> - Chip ✕ button, ChipInput tag remove, and Toaster close button all picked up `dark:hover:bg-white/…` so the hover affordance reads on dark.
>
> **Performance**
> - **Code-block highlighter** rewritten on top of `shiki/core` + `@shikijs/langs` + `@shikijs/themes` with explicit lang imports (tsx, typescript, css, html, bash, json) and the JS regex engine. Drops the playground bundle from ~10 MB across 100+ chunks to ~1.6 MB across 10. The 622 KB Oniguruma WASM is gone.
>
> **Templates (new)**
> - First copy-paste starter page at `/templates/dashboard` — KPI tiles + sparklines + recent-orders table. Lives in `apps/playground/src/routes/templates/dashboard.tsx` so consumers can drop the file into their app, swap the data sources, and ship.
>
> **Changelog v3.14 — Doc Shell (Notion-style app layout)**
>
> - **`<DocShell>`** + family — a Notion-inspired app shell with a sidebar that merges into the page background and a content card on the right with a sticky header and centered/full-width body modes.
> - **Sub-components:** `<DocSidebar>`, `<DocSidebarBrand>`, `<DocSidebarSearch>`, `<DocSidebarNav>`, `<DocSidebarFooter>`, `<DocSidebarUser>`, `<DocSidebarFooterAction>` (+ `<DocSidebarBellAction>` and `<DocSidebarHelpAction>` presets), `<DocContent>`, `<DocPageHeader>`, `<DocBody>`.
> - **Extended `<SidebarNav>`** rather than forking: `<SidebarNavSection>` gains an `action` slot (hover-revealed `+` button), `<SidebarNavItem>` gains a `trailing` slot (hover-revealed star/unpin), new `<SidebarNavParent>` for collapsible groups with chevron + child indent rail. Active rail dropped — the surface-2 fill + bold text is the new active cue.
> - **Keyboard:** `B` toggles sidebar, `W` toggles body width. Both gate against typing.
> - **Tooltip-aware collapse:** when sidebar is collapsed, brand / search / user buttons render with tooltips automatically.
> - **5px radius** on the content card (matches the new sidebar item radius), **8px shell-gap** between sidebar and card.
> - Showcase: full-screen route at `/preview/doc-shell`, plus a docs-style page at `/components/doc-shell` describing the API.
>
> **Changelog v3.13 — Rounds 3 + 4 (data display, navigation, shell)**
>
> **Round 3 — tables & data display (5 components)**
> - `<InlineEdit>` — spreadsheet-style cell editor; click-to-edit, Enter commits, Esc cancels.
> - `<StickyTable>` + `<StickyColumn>` — freeze leftmost / rightmost columns during horizontal scroll, with edge-shadow indicators that fade in based on scroll position.
> - `<BulkActionsBar>` — table multi-select toolbar; non-destructive cluster + isolated destructive action with hairline divider.
> - `<SavedFilters>` — Polaris-style preset dropdown with optional "Save current..." footer.
> - `<Sparkline>` — inline SVG with smooth Catmull-Rom path, filled area at 8% opacity, color-aware (5 tones), optional end-dot.
>
> **Round 4 — navigation & shell (4 components)**
> - `<Stepper>` — horizontal numbered steps with auto-connector fill, ring on active step, check icon on complete.
> - `<PageShell>` — promoted from pattern to component (breadcrumb / title / subtitle / metadata / primary+secondary actions / banner / tabs slots).
> - `<SidebarNav>` + `<SidebarNavSection>` + `<SidebarNavItem>` — composable app-shell sidebar with active rail (2px left edge) and badge support.
> - `<AutoSaveStatus>` — Saved / Saving / Save failed pill, paired with page titles. Spin animation on saving, retry handler on error.
>
> **Sidebar progress in playground:** 50 done / 0 todo — all components from `design.md` §5 now ship as stable in `@cyanideui/ui`.
>
> **Changelog v3.12 — Round 1 + 2 components, radius unification, micro-tweaks**
>
> **Component additions (round 1 — primitives + feedback)**
> - `<Avatar>` — image / initials / icon fallback. 5 sizes, 8 tonal palettes, optional status dot.
> - `<AvatarGroup>` — overlapping circles with hover lift (translateY -2px, 250ms `ease-emphasis`).
> - `<Skeleton>` family expanded: base + `<SkeletonText>`, `<SkeletonAvatar>`, `<SkeletonButton>`, `<SkeletonTable>`, `<SkeletonList>`, `<SkeletonCard>`. Two animations: `shimmer` (default) and `pulse`.
> - `<EmptyState>` — centered card with icon + title + description + actions.
> - `<Keycap>` + `<KeycapGroup>` — inline keyboard hints, 8px radius, platform-aware modifier (⌘ on macOS, Ctrl elsewhere).
> - `<Progress>` + `<ProgressSegmented>` + `<ProgressCircle>` — three patterns, all tone-aware.
> - `<Pagination>` — auto-ellipsis windowing, prev/next chevrons, tinted active page.
> - `<Breadcrumbs>` — chevron separator with optional `renderLink` for router integration.
> - `<Tabs>` — underline indicator that scales in/out per tab, 200ms.
> - `<Tooltip>` (sugar) + composable primitives (`TooltipProvider`, `TooltipRoot`, `TooltipTrigger`, `TooltipContent`).
> - `<Popover>` — generic anchored overlay primitive, used by Tooltip, Dropdown, etc.
> - `<Accordion>` — borderless, height-animated open/close via Radix `--radix-accordion-content-height`.
> - `<Drawer>` — right or left side, slide-in 250ms `ease-emphasis`, full anatomy (Header/Title/Description/Body/Footer).
>
> **Component additions (round 2 — forms)**
> - `<Select>` — Radix-based, group labels, separators, three sizes, slide-from-trigger animation.
> - `<Textarea>` — bordered, optional character counter that turns warning at 90% and error at 100%.
> - `<ChoiceList>` — single (radio) or multiple (checkbox) modes with shared label, descriptions, disabled items.
> - `<NumberStepper>` — bordered group with **inset 60% dividers** between cells (pseudo-element pattern).
> - `<FloatingLabelInput>` — Material-style label with notched outline, three sizes, error + helper text.
> - `<Chip>` (static) + `<ClickableChip>` (interactive: pressed/removable).
> - `<ChipInput>` — multi-value input with `Enter`/`,` commit, `Backspace` to remove, `transform` validator.
> - `<FileUpload>` — dashed dropzone with drag-active state, file list, max-size enforcement.
>
> **Tweaks & polish**
> - **Radius unification:** all form controls now use **8px (`radius-md`)** to match Buttons. Was 6px/8px split in v3.11.
> - **Cursor rules:** global `cursor: pointer` on `[role=*]` interactive elements; disabled gets `not-allowed`; inputs keep I-beam.
> - **Modal animation:** dropped to **35ms** open/close — under the perception threshold for a true "snap" feel.
> - **Dropdown menu:** slide-in from trigger edge (8px), no zoom (avoids the open-state flicker). Shortcuts now sit on the row's right edge via `ml-auto` (no greedy span wrapper).
> - **Button press:** `:active` snaps in instantly (`transition-duration: 0ms`); release smoothly returns. Press translate bumped to 1px.
> - **Search Field:** suppressed the native `::-webkit-search-cancel-button` so only our custom × shows.
> - **Checkbox:** indicator scales 50% → 100% via `forceMount`, no snap-in.
> - **AvatarGroup:** hover lifts each avatar above neighbors (Polaris-style).
> - **Table:** rounded inner corners on first/last cells of first/last rows so a `bg-surface` header doesn't paint past the parent radius.
> - **Keycap:** radius bumped to 8px.
>
> **Changelog v3.11 — Cursors + quality guardrails**
>
> - **Global cursor rules** added to `globals.css`. Browsers default `<button>` to `cursor: default` and Tailwind's preflight doesn't override it; controls were rendering with the arrow cursor. Now: `cursor: pointer` on `button`, `[role=button|menuitem|tab|option|switch|checkbox|radio]`, `summary`, `a[href]`, and `label[for]`. Disabled controls get `cursor: not-allowed`. Inputs and textareas keep the I-beam.
> - **Dropdown menu items** changed from `cursor-default` to `cursor-pointer` (Radix's default mimics native menus, but Polaris/Notion/shadcn use pointer).
> - **§1b Component Readiness Checklist** added — a hard gate every component must pass before being marked `stable` (visual / layout / a11y / API / docs / verification).
> - **§1c Known Gotchas catalog** added — every bug class we've shipped, kept here so they don't recur (Tailwind v4 workspace scan, `rounded-pill` namespace, missing animation plugin, segmented border specificity, `title` HTML conflict, Windows file flush, etc.).

> **Changelog v3.10 — Polaris button visuals & microinteraction polish**
>
> - **Button** redesigned to Polaris-style: subtle vertical gradient, top inset highlight, bottom inset shadow, **8px radius**, **600 font-weight**, full pressed state with `translateY(0.5px)` and inverted highlight.
> - **Microinteraction system** formalized: hover (150ms standard), press (60–80ms fast), mount/unmount (200–250ms emphasis), all under `prefers-reduced-motion: reduce`.
> - **Search Field** native browser ✕ suppressed; we render a single fade-and-scale clear button instead.
> - **Checkbox** indicator now scales 50%→100% with `ease-emphasis` instead of snapping in.
> - **Banner** mounts with fade + 4px slide-in-from-top (200ms standard).
> - **Dropdown items, table rows, sidebar links** all use the snappier 80ms fast duration on hover (was 150ms — felt sluggish on dense lists).
> - **Tooling:** Tailwind v4 (`@theme inline` in `tokens.css`), `tw-animate-css` for `animate-in` / `slide-in-from-*` utilities.
>
> **Changelog v3.9 — Shopify Polaris alignment**
>
> - **Buttons** separate **shape** (`variant`) from **intent** (`tone`).
> - **Inputs** moved from borderless to bordered surface for clarity and Polaris alignment.
> - **Switch** renamed from `Toggle`.
> - **Avatar** documented as a standalone primitive, separate from Avatar Group.
> - **Badge** redesigned: rounded rectangle, leading status dot, sentence case; adds `attention` and `new` tones.
> - **Chip** split out as a standalone primitive (static + clickable), separate from Tag Input.
> - **Added components:** Button Group, Banner, Spinner, Popover, Page Shell, Search Field, Money Field, Choice List.
> - **Skipped:** Thumbnail (use Avatar / inline image).

---

## 1. Design Philosophy

The system is built on five tenets:

1. **Bordered, not borderless.** Inputs and surfaces use a 1px hairline with a subtle inset shadow. Forms read as crisp, scannable, Polaris-grade. (v3.8 was borderless on tinted backgrounds; v3.9+ corrected this.) Inline-edit cells in tables remain borderless on purpose — see §5.3.
2. **Compact density by default.** ERP users scan; we optimize for information per pixel without crowding. Tables, forms, and toolbars use Shopify-grade compactness.
3. **Calm, layered motion.** Three speeds — fast (60–80ms) for press feedback, base (150ms) for hover, slide (250ms) for mount/dismiss. Easings: `ease-standard` for chrome, `ease-emphasis` for elements that should feel "physical" (pressed buttons, sliding pills, dropping checkmarks). All animations collapse to 80ms opacity-only under `prefers-reduced-motion: reduce`.
4. **Keyboard-first.** Every workflow has a shortcut. ⌘+K is the universal entry point.
5. **Single accent, separated intent.** A pure dark primary (near-black) carries authority. Buttons separate **shape** (`variant`) from **intent** (`tone`) — same component, layered color treatment. Color is reserved for semantic meaning, never decoration.

---

## 1a. Visual Direction & Reference Library

When a component isn't yet specified or you need to make a judgement call, follow this hierarchy of references. Match visually first, then adapt to our token vocabulary.

### Reference order — pick by component family

| Component family | Primary reference | Secondary | Why |
|---|---|---|---|
| **Buttons, badges, banners, form controls, toolbars** | **Shopify Polaris** (admin) | shadcn/ui | Polaris is the authoritative example of compact business chrome. Subtle gradients, calm intent colors, 8px radius. |
| **Tables, inline edit, sticky columns, bulk actions** | **Shopify admin tables** | Notion databases | Polaris-grade compact density (44px rows, no vertical borders), but with Notion's keyboard fluidity. |
| **Sidebar, page shell, app chrome** | **Notion** | Linear | Calm warm-neutral surface, 240px sidebar, breadcrumbs, page header with metadata + actions. |
| **Command palette (⌘+K), keyboard cheatsheet, focus management** | **Linear** | Raycast | Linear is the gold standard for keyboard-first navigation. |
| **Segmented control (sliding pill), micro-animations, drag-to-select** | **Linear** | Notion | Linear's pill drag and 250ms emphasis curves are unmatched. |
| **Empty states, illustrations, onboarding nudges** | **Notion** | Linear | Notion's calm illustrations + light copy hit the right tone for ERP. |
| **Modals, popovers, dropdowns, overlays** | **shadcn/ui (Radix)** | Polaris | Use Radix primitives for behavior + a11y, restyle to match our tokens. |
| **Drawer, inspector pane** | **Linear's right-side detail** | Notion's database row peek | 480px right-side panel with auto-save status. |
| **Charts, sparklines, KPI tiles** | **Shopify analytics** | Linear's "current sprint" widgets | Tabular numerals, calm semantic color, no decoration. |
| **Iconography** | **hugeicons (Stroke Rounded)** | — | One library, one variant, one stroke width (1.75). No mixing. |

### Decision rules when a component is missing from `design.md`

1. **Identify the family** in the table above.
2. **Pull up the primary reference** (e.g. open the Shopify admin and find a similar control).
3. **Sketch the anatomy in our tokens.** Replace their colors with our `--canvas` / `--surface` / `--ink-*` / `--tone-*-bg|fg`. Replace their radius with ours (`6 / 8 / 12`).
4. **Check the motion budget** in §2.7. Anything new must respect `dur-fast` / `dur-base` / `dur-slide` and `prefers-reduced-motion`.
5. **Verify accessibility:** focus ring, ARIA role/label, contrast pair (≥ 4.5:1), keyboard interaction.
6. **Document the component** in `design.md` under §5 with anatomy, sizes, states, and tone matrix (if applicable).
7. **Build it in `packages/ui/src/components/`** following the patterns in `button.tsx` (variant + tone) or `badge.tsx` (tone-only) as templates.

### Aesthetic guardrails

Things we **do**:

- Subtle vertical gradients on solid buttons (top 5–10% lighter, bottom 5–10% darker).
- Inset top highlight (`rgba(255,255,255,0.20)`) and bottom shadow (`rgba(0,0,0,0.20)`) for depth.
- 1px borders matching the brightest gradient stop's underside.
- Hairline-strong (`#c8c4be`) borders on inputs, with a soft inset shadow underneath.
- Tabular numerals (`tnum`) on every metric, table cell, and currency display.
- 11px uppercase tracking-wider labels for section eyebrows and table headers.
- Sentence case for badge labels (Polaris convention) — not `UPPERCASE`.

Things we **avoid**:

- Hard drop shadows (`0 4px 6px black`) — always use the calm `--elev-*` tokens.
- Bouncy springs (overshoot > 5%) outside of intentionally playful interactions.
- Saturated decorative color (purple gradients, neon accents). All color must signal intent.
- Multiple icon styles. We use **only** hugeicons Stroke Rounded with `strokeWidth={1.75}`.
- Borderless inputs on tinted backgrounds (visually unclear) — always border on canvas.
- Underline on hover for buttons — only for `<Button variant="plain">` and inline `<a>`.

---

## 1b. Component Readiness Checklist

**Every new component must pass every item before being marked `stable`.** This list exists because we've shipped the same class of bugs more than once (cursor not changing, animations missing, segmented borders doubled, search field showing two ✕). Treat it as a hard gate, not a suggestion.

### Visual
- [ ] **Cursor** — interactive elements show `cursor: pointer`; disabled state shows `cursor: not-allowed`; text inputs show I-beam. Globally enforced in `globals.css` but verify the component overrides it correctly.
- [ ] **Focus ring** — visible 2px outline at 2px offset using `var(--ink)` (or tone color for tone-aware components). Never color-only focus.
- [ ] **Hover state** — distinct from default. Scale, color, or background must change.
- [ ] **Active / pressed state** — distinct from hover. Press feedback (`translateY(0.5px)` for buttons, `scale(0.95)` for icon buttons, etc.) must be present and time-bound (`dur-fast`).
- [ ] **Disabled state** — visually muted (50% opacity or `ink-4` text), `cursor: not-allowed`, `pointer-events-none` if interactive.
- [ ] **Dark mode** — checked under `<html class="dark">`. Borders, gradients, shadows, hover bgs must all swap to dark-mode tokens. Don't assume tokens cascade automatically — verify.
- [ ] **Reduced motion** — under `prefers-reduced-motion: reduce`, transforms collapse to opacity-only at 80ms.
- [ ] **Mount / unmount animation** — overlays fade + slide; inline elements fade + small translate. No snap-in.
- [ ] **No double affordances** — only one ✕ button (no native ✕ + custom ✕), only one focus ring, only one hover bg.

### Layout
- [ ] **Padding inside** — `gap-*` between children, `px-*` on the container. Not `space-x-*` (it breaks with flex-wrap).
- [ ] **Width behavior** — explicit on full-width buttons (`block` prop), explicit max-w on field labels.
- [ ] **Children clip / overflow** — `overflow-hidden` on rounded containers that hold gradients or images.
- [ ] **z-index** — uses the §2.6 scale, not arbitrary numbers.

### Accessibility
- [ ] **ARIA role** — correct semantic role (`button`, `switch`, `checkbox`, `dialog`, `menu`, `menuitem`, etc.).
- [ ] **ARIA label** — icon-only buttons have `aria-label`; decorative icons have `aria-hidden`.
- [ ] **Keyboard** — full keyboard support: Tab/Shift+Tab to focus, Enter/Space to activate, Esc to close, arrow keys for menu/list nav.
- [ ] **Contrast** — all text/background pairs meet WCAG AA (≥ 4.5:1 for body, 3:1 for UI).
- [ ] **Live regions** — toasts and banners use `role="status"` (info/success/warning) or `role="alert"` (critical).
- [ ] **Touch targets** — minimum 32×32 (24×24 for `micro` variants only when adjacent targets exist).

### API
- [ ] **`forwardRef`** — every component forwards refs to its primary DOM element.
- [ ] **`displayName`** — set on every forwardRef component so DevTools shows the right name.
- [ ] **`asChild` slot** — any "trigger" or "wrapper" component supports `asChild` via Radix `<Slot>`.
- [ ] **className override** — passed through `cn()` so consumers can extend.
- [ ] **Native attributes** — extends the right HTML element type (e.g. `ButtonHTMLAttributes<HTMLButtonElement>`); conflicting attributes (like `title` clashing with a `title?: ReactNode` prop) are `Omit`'d explicitly.
- [ ] **Variants** — exposed via `cva` with `defaultVariants`. No magic strings inside the component.
- [ ] **Tone** — for tone-aware components, all 5 tones (`default / critical / success / warning / info`) work in light + dark.

### Documentation
- [ ] **Section in `design.md`** — anatomy, sizes, states, variants, tones (if applicable), motion, ARIA notes.
- [ ] **Showcase page in playground** — every variant + tone + size + state demonstrated.
- [ ] **Code snippet** — every demo has a `<CodeBlock>` showing the exact JSX consumers need to write.
- [ ] **`status` flipped** — `apps/playground/src/nav.ts` entry changed from `"todo"` to `"done"`.

### Verification (run before declaring done)
- [ ] **`pnpm --filter @cyanideui/ui build`** passes with no TS errors.
- [ ] **`pnpm --filter @cyanideui/playground build`** passes with no TS errors.
- [ ] **Visual smoke test** — open the showcase page, click every interactive element, hover every clickable surface, press Tab through the page, toggle dark mode, then enable `prefers-reduced-motion` in DevTools and click through again.

---

## 1c. Known Gotchas — Tailwind v4 + Radix + Workspace Setup

Past bugs we've shipped, kept here so they don't recur.

### Tailwind v4 specific

| Symptom | Root cause | Fix |
|---|---|---|
| Components in `packages/ui/` render unstyled in the playground | Tailwind v4 only auto-scans descendants of the CSS file's directory. The library lives in a sibling workspace package reached through a symlink in `node_modules`, which Tailwind ignores. | Add `@source "../../../../packages/ui/src";` to the playground's `globals.css`. |
| `rounded-pill` (or any custom radius name) does nothing | v4 only generates `rounded-{name}` from `--radius-*` keys present inside `@theme inline`. Defining `--radius-pill` in plain `:root` is not enough. | Declare it inside the `@theme inline` block. |
| Modal / Dropdown / Tooltip snap in/out with no animation | Radix uses `data-[state=open]:animate-in fade-in-0 zoom-in-95 slide-in-from-*` — those classes require a plugin. The v3 `tailwindcss-animate` is replaced by `tw-animate-css` for v4. | `pnpm add -D tw-animate-css` then `@import "tw-animate-css";` in `globals.css`. |
| `focus-visible:ring-{tone}` doesn't render | Plain-text searching production CSS misses the colon escape (`focus-visible\:ring-error`). The class is usually present — verify with regex. | Confirm with regex matching the escaped colon before assuming a missing class. |
| Buttons don't show pointer cursor | Browsers default `<button>` to `cursor: default` and Tailwind's preflight doesn't override it. | Global rule in `globals.css` applies `cursor: pointer` to interactive roles. |

### Radix specific

| Symptom | Root cause | Fix |
|---|---|---|
| Component animates on enter but snaps on exit | Radix unmounts immediately unless `forceMount` is set on the indicator/content. | Set `forceMount` on the inner Indicator/Content and animate via `data-[state]` selectors. |
| Two ✕ buttons in a search field | Browser's native search clear (`::-webkit-search-cancel-button`) renders on top of our custom one when `type="search"`. | Suppress with `appearance: none` on the pseudo-element in `globals.css`. |
| Dropdown menu items show default cursor instead of pointer | Radix's default styling sets `cursor: default` to mimic native menus. shadcn keeps it; Polaris/Notion don't. | Override to `cursor-pointer` on `DropdownMenuItem`. |

### TypeScript specific

| Symptom | Root cause | Fix |
|---|---|---|
| `interface BannerProps extends HTMLAttributes<HTMLDivElement>` errors on `title?: ReactNode` | The native `title` attribute is `string \| undefined`; ReactNode includes `null`. | `extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">`. |
| Same pattern for `color`, `size`, `value`, **`name`** (when prop is ReactNode) | Native HTML attributes collide with our richer prop types. | Use `Omit<…, "name">` consistently when redefining a native attribute. Especially common on `<button name>` props because we typically use `name` for "User name" / "Workspace name" labels in shell components. |

### Visual / Layout specific

| Symptom | Root cause | Fix |
|---|---|---|
| Segmented buttons look like jammed individual pills, not a unified strip | Tailwind utility overrides like `[&>*]:rounded-none` lose specificity to the Button's own `data-variant` selectors. | Tag children with `data-segmented` via `React.cloneElement` and apply joined-cell rules in the same stylesheet that defines the variants. |
| First/last cell of segmented group has full radius | Need to round only the outer corners. | `:first-child { border-radius: 8px 0 0 8px }` + `:last-child { border-radius: 0 8px 8px 0 }`. |
| Adjacent borders look 2px thick | Borders are doubling up on shared edges. | `margin-left: -1px` on every cell except the first to overlap the borders. |
| Focus ring on a segmented cell gets clipped by neighbors | Cells stack in DOM order, so neighbors paint on top. | Lift focused/hovered/pressed cell with `position: relative; z-index: 1`. |
| Button click feels "broken" — no visible press feedback | The `:active` state has its background tied to the same 150ms transition as `:hover`, so a normal-speed click ends before the press background can render. | Snap into `:active` (`transition-duration: 0ms` on the active selector) and let the original 150ms transitions carry the button back to default on release. |
| Dropdown / Popover animation pops or flickers on open | Combining `slide-in-from-*-1` (4px) with `zoom-in-95` puts two transforms on the same element while Radix is still measuring its width. | Pick one transform: either pure scale-from-origin (good for tooltips), or pure slide-from-trigger-side (good for menus). Don't combine. Use `slide-in-from-top-2` (8px) for the slide direction matching the menu's `data-[side]`. |
| Divider in a stepper / segmented input runs edge-to-edge of the row | `border-l` / `border-r` is full-height by definition. | Use a pseudo-element (`::before` / `::after`) absolutely positioned with `top: 50%; height: 60%; transform: translateY(-50%)` so the divider stays inset. Default proportion: 60% — Polaris-ish, inset enough to read as a divider, not a separation. |
| Form control looks cramped against its label | Label and control are siblings without a wrapper, so the showcase's flex `gap-3` only works if you put them in the same flex container. | Always wrap label + control in a `flex items-center gap-3` (horizontal) or vertical column with `space-y-1.5`. Don't rely on the parent demo's gap. |

### Build / Tooling specific

| Symptom | Root cause | Fix |
|---|---|---|
| `pnpm install` fails with "Unexpected end of JSON input" | A `package.json` was written but didn't flush to disk. | Re-write via `[System.IO.File]::WriteAllText` on Windows; verify size > 0 with `Get-Item`. |
| Vite EACCES on port 5173 | Another process owns the port (often a Windows reserved range or a previous Node lockup). | Bump the port in `vite.config.ts`. |
| Production CSS is huge (~5MB) | Shiki includes every language by default. | At runtime only the requested `lang` is loaded; production size is acceptable. |
| Next.js consumer crashes with `(0, _.createContext) is not a function` on first server render | The published `dist/index.js` is a single ESM bundle and Next.js's React Server Components treats every imported module as a server module by default. The bundle internally calls `React.createContext(...)` at module top-level (Radix, our own DocShell context, etc.), which is illegal in a server component. | Prepend `"use client";` to `dist/index.js` as a postbuild step. tsup's `banner.js` option gets stripped by treeshaking, so use a `node scripts/add-use-client.mjs` step. With the directive in place, Next.js sets the client boundary at the import site automatically and pure-prop primitives (Badge, Sparkline, Avatar, Table) still server-render fine. |
| Next.js `tailwindcss` doesn't generate utilities used inside `@cyanideui/ui` | Tailwind v4 only auto-scans descendants of the entry CSS file. Workspace-symlinked `node_modules/@cyanideui/ui` is ignored, and so is the published `dist/index.js`. | Add `@source` to the consumer's globals.css. In a workspace consumer, point at `../../../packages/ui/src`. In a non-monorepo consumer, point at `node_modules/@cyanideui/ui/dist`. Mirror of the same gotcha as the playground (Tailwind v4 specific table above). |
| Advertised hotkey doesn't fire (`T` to toggle theme, `B` to toggle sidebar, etc.) | Cheatsheet mentions a key but no `keydown` listener is mounted, so the key has no effect. | Every advertised shortcut **must** be wired in code, not just listed in the cheatsheet. Mount listeners at the App root (or inside the relevant component context) with the standard "skip while typing" guard (`INPUT`/`TEXTAREA`/`isContentEditable`) and `e.preventDefault()`. Keep the cheatsheet, the code listener, and the visible UI affordance (toggle button) in sync. |
| App shell (DocShell) collapse button only appears on hover, leaving users without a visible affordance | The button was `opacity-0 group-hover/shell:opacity-100` to keep the chrome calm, but that hides the only collapse cue when the sidebar's tooltip is also hidden. | Show the floating collapse button at `opacity-70` at rest, `opacity-100` on hover. Keep a redundant top-bar toggle in the content card so the affordance is always visible regardless of which surface the user is hovering. |
| Top bar / page chrome missing inside the content card | A separate `<DocPageHeader>` exists but isn't always rendered by every showcase page. The standalone HTML preview had a sticky top bar with breadcrumb + actions; the React playground accidentally only used per-page eyebrows. | Always include a sticky top-bar inside the content card for app-shell-style apps — sidebar toggle on the left, breadcrumb in the middle, theme/help/GitHub on the right. The per-page header below it carries title/eyebrow only. |
| Two parallel page-header components shipped at once | Three near-identical components evolved separately — `<PageShell>` (generic), `<DocPageHeader>` (sticky inside DocContent), `<PlaygroundTopBar>` (shell-wide app bar). Each was built when the other wasn't quite right, instead of extending the existing one. | When a new chrome requirement comes up (sticky behaviour, scroll shadow, app-bar-level actions), extend the existing component with optional slots before forking. Folded all three into a single `<PageShell>` in v3.16 with `breadcrumb`, `appBarActions`, and built-in sidebar/width toggles in the app-bar slot, plus the existing title/subtitle/metadata/banner/tabs in the page-header slot. The component auto-detects whether it lives inside `<DocShell>` via `useOptionalDocShell()`. |
| Library default CSS gutted by aggressive `classNames` overrides | We told `<DayPicker>` (react-day-picker v10) to render its day grid with `flex`, stripping the library's default CSS-grid layout. Result: every row collapsed into one line of run-on numbers like `262728293012`. | When restyling a third-party component, override **visuals only** (colors, radii, hover, selected). Leave **structural** classes (root, month_grid, weekdays, week, day) alone. Prefer rebinding the library's CSS custom properties (e.g. `--rdp-day-height`) over re-writing layout classes. Verify the layout in dev before committing. |
| Sticky-column edge shadows paint over the frozen cells themselves | The edge-fade gradients were on the scroller's `::before` / `::after` anchored at `left:0` / `right:0`, but the frozen columns float at exactly those edges, so the gradient covered them and clipped cell content (badges, action buttons) during scroll. | Anchor edge gradients to the **last left-frozen** and **first right-frozen** cells via `::after` / `::before` pseudos. Tag those cells with `data-sticky-edge-left` / `data-sticky-edge-right` during the offset-compute pass and use Tailwind attribute selectors. Give every sticky cell `position: relative` so the pseudos pin to the cell, not the row. The shadow then travels with the frozen group and never overlaps it. |
| Toaster mounted twice → toasts split between top-center and top-right | A showcase page mounted its own `<Toaster position="top-right" />` while the App root had `<Toaster position="top-center" />`. Sonner stacks one container per `<Toaster>`, so each position rendered in its own region and incoming toasts went to whichever toaster handled them first. | Mount global UI singletons (Toaster, GlobalCheatsheet, CommandPalette) at the app root **only**. Showcase pages must never re-mount them — they should call `toast()` against the singleton. Same rule for Drawer/Modal "providers" if any are added later. |
| Tailwind `[&_*]` selectors don't match portaled siblings | `cmdk` portals `[cmdk-overlay]` as a **sibling** of the dialog content (not a descendant of the wrapper element), so descendant attribute selectors on the wrapper class never match — the overlay rendered with no blur. | When a third-party library (cmdk, certain Radix configs) portals an overlay element outside its visual wrapper, **don't** use Tailwind descendant selectors. Add a global CSS rule on the element's own class/data-attribute. Verify by inspecting the rendered DOM — if the target element is a sibling of the portal root, you need a global rule. |
| `position: sticky` + `position: relative` on the same element | A `<StickyColumn>` was given `"sticky relative z-[5]"`. `position: relative` later in the cascade overrides `position: sticky`, killing the pin. Cells went non-sticky and the edge-shadow pseudos floated to nowhere. | Use `sticky` alone — `position: sticky` already establishes a containing block for `::before` / `::after` pseudos and for descendants with `position: absolute`. Don't add `relative` alongside. The same gotcha applies to `position: fixed`. |
| react-day-picker `nav-layout` defaults to `inset-end` (chevrons stack over the month caption) | The library positions `.rdp-nav` absolutely at `top:0; right:0` by default — under the assumption your CSS will put the caption on the left. Customising `.rdp-nav` to fix this introduces brittle position math because the library re-applies its own layout on flag changes. | Pass `navLayout="around"` to `<DayPicker>`. The library re-positions `.rdp-button_previous` to `inset-inline-start: 0` and `.rdp-button_next` to `inset-inline-end: 0` and centers the caption between them — exactly what we want. Don't override `.rdp-nav` `position` directly. |
| Segmented control out of the radius family | Used `rounded-pill` (999 px) while every other 8-px-tall control around it sat at `rounded-md` (8 px). Looked transplanted from another design system. | Sliding-pill segmented controls need TWO radii — the outer container should match the radius family of nearby controls (we use 8 px), and the inner sliding pill should be smaller (we use 5 px) so it visually nests inside the container's 4-px padding. Linear / Notion both use this nesting. Avoid `rounded-pill` unless the control is a status pill. |
| Toaster mounted twice → toasts split between top-center and top-right | Both the App root AND a showcase page (`routes/components/toast.tsx`) were mounting `<Toaster>`. Sonner stacks one container per `<Toaster>`, so each rendered in its own region and incoming toasts went to whichever toaster handled them first. | Mount global UI singletons (Toaster, GlobalCheatsheet, CommandPalette) at the **App root only**. Showcase pages should call `toast()` against the singleton, never re-mount it. Same rule for any future Modal/Drawer providers. |
| Tailwind `[&_*]` selectors don't match portaled siblings | `cmdk` portals `[cmdk-overlay]` as a **sibling** of the dialog content (not a descendant of the wrapper element), so descendant attribute selectors on the wrapper class never match. Discovered when the command palette overlay rendered without the unified blur. | When a third-party library (cmdk, certain Radix configs) portals an overlay element **outside** its visual wrapper, don't use Tailwind descendant selectors — they'll silently miss. Add a global CSS rule on the element's own data-attribute or class. Verify by inspecting the rendered DOM: if the target is a sibling of the portal root, you need a global rule. |
| Unlayered CSS overrides Tailwind `@layer utilities` | A `.ds-radio { background: var(--canvas); }` rule in `globals.css` (outside any `@layer`) was beating the `data-[state=checked]:bg-{tone}` Tailwind utility because **unlayered rules win over layered ones regardless of specificity**. Result: the radio's filled-on-check tone color never showed. | **Resolved structurally in the consolidation round** — every `.ds-*` component class in `globals.css` now lives inside `@layer components`, so Tailwind's `@layer utilities` always wins on state. Adding a new component class? Drop it inside `@layer components`, not at the top level. Keyframes stay unlayered (they don't participate in cascade). |
| Date range row visually larger than other rows | The day_button was sized at `--rdp-day_button-{height,width}: 32px` (full cell), and the cell had `bg-surface-2` for range mode. Selected days became 32×32 painted blocks while unselected days only showed bare text glyphs, so the highlighted row appeared taller. | Keep the day_button **smaller than the cell** (we use 28×28 inside 32×32). Paint the **cell** with the range band (transparent for off-range, surface-2 for in-range, hard-edge half-gradient for start/end). The button sits centered as a pill; range pills float on a continuous band rather than filling the entire row. |
| Hook calling `useContext` runs in same component that mounts the provider — context is undefined / no-op | The classic "provider scope" bug. A component renders `<Provider>` in its JSX **but also calls `useContext(...)` (or a hook that does) at the top of its own body**. The hook runs DURING the parent render, before the provider exists in the tree, so it gets the fallback value — typically a no-op. Symptom we hit: `useDensityHotkey()` ran inside `App`, but `<DensityRoot>` was rendered by `App`. The `D` keypress called `cycle()` from the no-op fallback, doing nothing. | Split the component in two. The outer one mounts the provider; the inner one runs the hook. `function App() { return <DensityRoot><AppShell /></DensityRoot> }` plus `function AppShell() { useDensityHotkey(); ... }`. Same shape applies to any provider-and-consumer-in-one-component setup (theme, query client, command palette open state), and it's the same bug class as "Toaster mounted twice" — provider scope, not provider count. |
| Hook with `useState` creates per-call-site copies of "shared" state | A hook like `useTheme()` defined as `const [theme, setTheme] = useState(...)` looks shared because the side effect writes to `<html class="dark">`, but each call site has its own React state. Calling `toggle()` in one place doesn't notify other `useTheme()` consumers — they only "stay in sync" because their own `setTheme` is also called, OR because they re-render for unrelated reasons. New effects watching `theme` from another consumer never fire. We hit this when adding the shortcut-toast notifier: theme cycled in the DOM but no toast appeared. | When state is logically global (theme, density when not provider-driven, command-palette open, locale), back the hook with a module-level store + `React.useSyncExternalStore`. One module-level `current` value + `Set<listener>` + `subscribe`/`getSnapshot`. Every `useTheme()` instance reads the same value and gets re-rendered together when it changes. For tree-scoped state, prefer `<Provider>` + `useContext` instead. |
| Selected day inside `<DatePicker>` looks bigger than its neighbours | react-day-picker v10's upstream stylesheet ships `.rdp-selected { font-weight: bold; font-size: large; }` — both rules cascade to the cell AND apply to range_start / range_middle / range_end since they all carry `.rdp-selected`. Result: digits jump from 12.5 px / 400-weight to ~18 px / bold while neighbours stay normal, distorting the row. | Override BOTH at the cell level: `.rdp-selected, .rdp-selected .rdp-day_button { font-size: inherit; font-weight: inherit; }`. Then your component-specific rules can still set `font-weight` on the *button* where the actual visual pill lives, without the cell carrying inherited weight from the upstream rule. |

---

## 2. Foundations

### 2.1 Color Tokens

#### Surface palette (warm neutral, off-white)

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#ffffff` | Page + card background |
| `--surface` | `#f6f5f4` | Subtle background, hover fills, input backgrounds |
| `--surface-2` | `#efeeec` | Pressed/active fills, alternating rows |
| `--hairline` | `#e5e3df` | Borders, table dividers, sidebar separator |
| `--hairline-strong` | `#c8c4be` | Input outlines (when present), dividers in toolbars |

#### Ink palette (text)

| Token | Value | Use |
|---|---|---|
| `--ink` | `#1a1a1a` | Primary text, primary button bg |
| `--ink-2` | `#3d3d3d` | Secondary text, body |
| `--ink-3` | `#6b6b6b` | Tertiary text, captions, help |
| `--ink-4` | `#9a9a9a` | Disabled text, placeholders |

#### Semantic palette

| Token | Value | Tint (bg) | Use |
|---|---|---|---|
| `--success` | `#1aae39` | `#e9f7ec` | Paid, OK, confirmations |
| `--warning` | `#dd5b00` | `#fdeee2` | Watch, low stock, pending review |
| `--error` | `#e03131` | `#fbe6e6` | Failed, destructive, validation |
| `--info` | `#2563eb` | `#e6efff` | Informational, processing |

> All foreground/background pairs meet **WCAG AA (≥ 4.5:1)** for body text and **3:1** for large/UI.

#### Tone palette (for Badges & Banners)

Polaris-aligned soft surfaces with AA-contrast foregrounds. Distinct from the semantic palette so chrome (toasts, validation icons) stays vivid while inline status (badges, banners) stays calm.

| Tone | BG | FG |
|---|---|---|
| `default` | `--surface-2` | `--ink-2` |
| `success` | `#cdfee1` | `#0c5132` |
| `warning` | `#ffeacc` | `#5b3300` |
| `critical` | `#fee9e7` | `#8e1f0b` |
| `info` | `#d2efff` | `#00527c` |
| `attention` | `#fff1d6` | `#5b3300` |
| `new` | `#e3e0f8` | `#38298b` |
| `read-only` | `--surface-2` | `--ink-3` |

#### Tailwind config snippet

```ts
colors: {
  canvas: '#ffffff',
  surface: { DEFAULT: '#f6f5f4', 2: '#efeeec' },
  hairline: { DEFAULT: '#e5e3df', strong: '#c8c4be' },
  ink: { DEFAULT: '#1a1a1a', 2: '#3d3d3d', 3: '#6b6b6b', 4: '#9a9a9a' },
  success: { DEFAULT: '#1aae39', tint: '#e9f7ec' },
  warning: { DEFAULT: '#dd5b00', tint: '#fdeee2' },
  error:   { DEFAULT: '#e03131', tint: '#fbe6e6' },
  info:    { DEFAULT: '#2563eb', tint: '#e6efff' },
  tone: {
    success:   { bg: '#cdfee1', fg: '#0c5132' },
    warning:   { bg: '#ffeacc', fg: '#5b3300' },
    critical:  { bg: '#fee9e7', fg: '#8e1f0b' },
    info:      { bg: '#d2efff', fg: '#00527c' },
    attention: { bg: '#fff1d6', fg: '#5b3300' },
    new:       { bg: '#e3e0f8', fg: '#38298b' },
  },
}
```

### 2.2 Typography

Use a system geometric sans (Inter is the recommended primary).

| Token | Size / Line | Weight | Use |
|---|---|---|---|
| `display` | 36 / 44 | 600 | Hero numbers, KPI tiles |
| `h1` | 28 / 36 | 600 | Page titles |
| `h2` | 22 / 30 | 600 | Section headers |
| `h3` | 18 / 26 | 600 | Card titles |
| `body` | 14 / 22 | 400 | Default body, table cells |
| `body-sm` | 13 / 20 | 400 | Help text, captions |
| `mono` | 13 / 20 | 500 | Keycaps, SKU, IDs (`ui-monospace`) |

Font stack:
```css
font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
font-feature-settings: 'cv11', 'ss01', 'tnum';
```

`tnum` (tabular numbers) is mandatory in tables and metric tiles.

### 2.3 Spacing Scale

| Token | px | Tailwind |
|---|---|---|
| `xxs` | 4 | `1` |
| `xs`  | 8 | `2` |
| `sm`  | 12 | `3` |
| `md`  | 16 | `4` |
| `lg`  | 20 | `5` |
| `xl`  | 24 | `6` |
| `2xl` | 32 | `8` |
| `3xl` | 40 | `10` |
| `section-sm` | 48 | `12` |
| `section`    | 64 | `16` |
| `section-lg` | 96 | `24` |
| `hero`       | 120 | `30` |

### 2.4 Radius Scale

| Token | Value | Use |
|---|---|---|
| `radius-xs` | 4px | Badges (small), keycaps internals |
| `radius-sm` | 6px | Small chrome (avatar overflow indicator inner ring, dropdown items, badge corners) |
| `radius-md` | 8px | **Default for form controls and buttons** — Input, Textarea, Select, SearchField, MoneyField, NumberStepper, ChipInput, FloatingLabelInput, Button, Chip, Cards |
| `radius-lg` | 12px | Modals, drawers, command palette |
| `radius-xl` | 16px | Hero workspace mockups |
| `radius-pill` | 999px | Pills, status dots, avatars, segmented control items |

> **Form-control radius.** Form controls all share **8px (`radius-md`)** so they line up visually with Buttons in toolbars and form footers. v3.10 originally used 6px on inputs and 8px on buttons; v3.11 unified them at 8px for consistency.

### 2.5 Elevation

Soft, low-contrast shadows. No hard drop-shadows.

**Rule:** elevation is for **floating chrome**, not in-flow content. Pages, cards, tiles, sections, tables — anything that sits in the document flow — uses a hairline border (`border border-hairline bg-canvas`) and **no shadow**. Reserve shadows for surfaces that genuinely float above the page.

This keeps the Atrium feel calm. ERP screens are stared at for hours; shadow-everywhere reads as Material/Bootstrap-busy and erodes hierarchy. Notion and Linear both ship flat in-flow content for the same reason.

| Level | Shadow | Use |
|---|---|---|
| `elev-0` | none | **Default for in-flow content** — cards, tiles, table rows, sections, KPI tiles, settings panels |
| `elev-1` | `0 1px 2px rgba(0,0,0,0.04)` | Subtle floating-paper feel — DocBody scroll card, DatePicker card surface |
| `elev-2` | `0 2px 8px rgba(0,0,0,0.06)` | Small floating overlays — Tooltip, ShortcutHint chip |
| `elev-3` | `0 8px 24px rgba(0,0,0,0.08)` | Medium overlays — Popover, Select, DropdownMenu, Toaster |
| `elev-4` | `0 16px 48px rgba(0,0,0,0.12)` | Large overlays — Modal, Drawer, CommandPalette |

**Notes:**
- `elev-0` ("none") is the default and the rule — don't reach for `elev-1` on a tile just because it looks "more designed". A bordered canvas surface in a surface page is the right answer.
- The "Hover-elevated tiles" use case from earlier versions is **not** the rule — we no longer ship hover-elevated tiles in templates. Hover affordances use `bg-surface` or `border-ink-3`, not shadow.

### 2.6 Z-Index

| Layer | Z |
|---|---|
| Sticky headers | `10` |
| Sidebar | `20` |
| Dropdowns / popovers | `30` |
| Modals / drawers | `40` |
| Toasts | `50` |
| Command palette | `60` |

### 2.7 Motion & Microinteractions

Three speeds, two easings, one universal rule.

#### Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 80ms | Press feedback, snappier hovers (table rows, sidebar links, dropdown items) |
| `--dur-base` | 150ms | Default hover, focus, color transitions |
| `--dur-slide` | 250ms | Mount / dismiss (modal, drawer, dropdown), pill drag |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default for chrome — calm, no overshoot |
| `--ease-emphasis` | `cubic-bezier(0.32, 0.72, 0, 1)` | Physical feel — pressed buttons, sliding pills, dropping checkmarks, drawer open |

> Press feedback uses `--dur-fast` because slow press states feel mushy. Hover uses `--dur-base` because too-fast hovers feel jittery on dense lists. Mounts use `--dur-slide` because users need to perceive the entry direction.

#### Standard interaction matrix

This is the canonical behavior for every interactive element in the system.

| Surface | Hover | Focus-visible | Press / Active | Mount | Unmount | Disabled |
|---|---|---|---|---|---|---|
| **Button (primary, secondary)** | gradient stops shift down 5–8%, border-color matches new gradient bottom; `dur-base` | 2px outline, 2px offset, `var(--ink)`, instant | `translateY(0.5px)` + invert inset highlight to bottom + darken bg one stop; `dur-fast`, `ease-standard` | n/a | n/a | flat surface gradient, `ink-4` text, `hairline` border, no shadow |
| **Button (tertiary, plain)** | bg fills with `tone-bg` at 6% (default) or matching `--*-tint` (toned); `dur-base` | 2px outline | `translateY(0.5px)`; `dur-fast` | n/a | n/a | `ink-4` text only |
| **Search Field, Input, Textarea** | border `ink-3`; `dur-base` | border `ink` + 1px ring `ink`; instant | n/a | n/a | n/a | `bg-surface`, border `hairline`, text `ink-4` |
| **Search Field clear ✕** | n/a | inherits parent ring | scale 95%; `dur-fast` | scale 90% → 100% + opacity 0 → 1; `dur-base` `ease-standard` | reverse mount | hidden |
| **Checkbox** | n/a | 2px ring matching tone; instant | n/a | indicator scale 50% → 100% + opacity 0 → 1; `dur-base` `ease-emphasis` | indicator scale 100% → 50% + fade; `dur-base` | 50% opacity |
| **Switch** | n/a | 2px ring matching tone; instant | n/a | knob translates 0 → 16px; `dur-slide` `ease-emphasis` | knob translates back; `dur-slide` `ease-emphasis` | 50% opacity |
| **Segmented Control (sliding pill)** | inactive item text `ink-3` → `ink-2`; `dur-base` | n/a (focus is on the pill content) | hold to drag pill (cursor: grabbing) | pill `transform: translateX()` glide; `dur-slide` `ease-emphasis` | n/a | reduced motion = instant snap + 80ms text fade |
| **Tabs (underline)** | inactive text `ink-3` → `ink-2`; `dur-base` | inherits row | n/a | underline `transform: translateX()` between tabs; 200ms `ease-standard` | n/a | n/a |
| **Dropdown Menu items, Sidebar links, Table rows** | bg `surface/60` and text `ink-2` → `ink`; **`dur-fast`** | bg `surface` (Radix `data-[highlighted]`) | n/a | n/a | n/a | n/a |
| **Dropdown Menu container** | n/a | n/a | n/a | fade-in-0 + slide-in-from-top-1 (4px); `dur-base` `ease-standard` | reverse | n/a |
| **Modal** | n/a | trapped inside | n/a | overlay fade-in 35ms, content `scale 95% → 100%` + fade; 35ms `ease-emphasis` | overlay fade-out 35ms, content scale-out + fade; 35ms | n/a |
| **Modal close ✕** | bg `surface`, text `ink`; `dur-fast` | 2px ring `ink` | scale 95%; `dur-fast` | n/a | n/a | n/a |
| **Drawer** | n/a | trapped inside | n/a | slide-in-from-right `0 → 0`, overlay fade; `dur-slide` `ease-emphasis` | reverse | n/a |
| **Tooltip** | n/a | n/a | n/a | fade-in + 4px translate from anchor side; `dur-base` `ease-standard` | reverse | n/a |
| **Popover** | n/a | trapped inside if focusable | n/a | fade-in + 4px translate; `dur-base` `ease-standard` | reverse | n/a |
| **Banner** | dismiss ✕ goes 70% → 100% opacity + bg fade; `dur-fast` | dismiss has 2px ring | dismiss scale 95%; `dur-fast` | fade-in + slide-in-from-top-1 (4px); `dur-base` `ease-standard` | fade-out + 4px slide up; `dur-base` | n/a |
| **Toast** | n/a | n/a | n/a | slide-in from origin (top-right or top-center); `dur-slide` `ease-emphasis` | slide back + fade; `dur-base` | n/a |
| **Skeleton** | n/a | n/a | n/a | shimmer sweep 1.5s loop; `dur-slide` × n | replaced by content | static `bg-surface` block under reduced motion |
| **Auto-save status icon** | n/a | n/a | n/a | spin 700ms linear during save; rotate 0 → 360° | snap to "saved" dot | static |

#### Reduced motion

The global rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 80ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 80ms !important;
    scroll-behavior: auto !important;
  }
}
```

Every transform-based animation collapses to opacity-only. Sliding pills, knob bounces, modal scale-ins all become instant snap + 80ms cross-fade. Skeleton shimmer becomes a static block. Spinners stop animating and show as a 50%-opacity dotted ring.

#### Common antipatterns to avoid

- **Hover on touch devices.** Use `@media (hover: hover)` to gate non-essential hover states.
- **Animating layout properties** (`width`, `height`, `padding`, `margin`). Always animate `transform` and `opacity` — they're the only two properties that don't trigger layout.
- **Long hover delays.** Anything above 200ms on hover feels broken. Use 80–150ms.
- **Mount animations on table rows or list items.** Stagger looks impressive but kills perceived performance on long lists. Reserve for hero elements.
- **Chained animations.** A button press shouldn't trigger a cascade. Single property, single duration, done.
- **Easing without intent.** Use `ease-standard` unless you specifically want the element to feel physical — then use `ease-emphasis`.

### 2.8 Breakpoints

| Name | Width | Behavior |
|---|---|---|
| Mobile sm | `< 480px` | Single column, hero 36px, pricing 1-up |
| Mobile lg | `480–767px` | Feature cards 2-up, hero 48px |
| Tablet | `768–1023px` | 2-col grids, hero 56px |
| Desktop | `1024–1279px` | 4-tier card row, hero 72px |
| Wide | `≥ 1280px` | Full 80px hero, 3-pane layouts |

---

## 3. Iconography

**Library:** `hugeicons-react` — **Stroke Rounded** variant exclusively.  
This variant maps 1:1 to our Fluid Outline grammar: rounded linecaps, rounded joins, generous corner radii, single-color stroke via `currentColor`.

### Grammar (matches hugeicons Stroke Rounded)

- viewBox: `24 × 24`
- Stroke: `1.75px` (override hugeicons default of 1.5)
- `stroke-linecap: round`, `stroke-linejoin: round`
- Single color via `currentColor`
- No fills (outline only)
- Other hugeicons variants (Stroke Sharp, Solid, Twotone, Duotone, Bulk) **are not used** to keep the visual language consistent.

### Size scale

| Class | Size |
|---|---|
| `.icon-sm` | 14px |
| `.icon-md` | 18px |
| `.icon-lg` | 20px |
| `.icon-xl` | 24px |
| `.icon-2xl` | 32px |

### Usage

```tsx
import { HugeiconsIcon } from '@hugeicons/react'
import { DashboardSquare01Icon, ShoppingBag01Icon } from '@hugeicons/core-free-icons'

<HugeiconsIcon
  icon={DashboardSquare01Icon}
  size={18}
  strokeWidth={1.75}
  className="text-ink-2"
/>
```

Wrap in a thin `<Icon>` component that locks `variant="stroke-rounded"` and `strokeWidth={1.75}` so individual call sites cannot drift.

### Menu set (21 sidebar icons → hugeicons mapping)

Use these `hugeicons-react` Stroke Rounded icons. All names below are the canonical exports.

| Slot | hugeicons name |
|---|---|
| Dashboard | `DashboardSquare01Icon` |
| Search | `Search01Icon` |
| Notifications | `Notification03Icon` |
| Calendar | `Calendar03Icon` |
| Orders | `ShoppingBag01Icon` |
| Customers | `UserMultiple02Icon` |
| Products | `PackageIcon` |
| Inventory | `Inventory01Icon` |
| Warehouse | `Store01Icon` |
| Suppliers | `Truck01Icon` |
| Shipping | `DeliveryTruck01Icon` |
| Returns | `PackageReceiveIcon` |
| Invoices | `Invoice03Icon` |
| Payments | `CreditCardIcon` |
| Reports | `File02Icon` |
| Analytics | `Analytics01Icon` |
| Users / Team | `UserGroupIcon` |
| Settings | `Settings02Icon` |
| Help | `HelpCircleIcon` |
| Sign Out | `Logout03Icon` |
| Collapse | `SidebarLeft01Icon` |

> If a name above is not available in the installed hugeicons version, swap to the closest Stroke Rounded sibling (e.g. `Dashboard02Icon`, `Inventory02Icon`). Verify against `https://hugeicons.com/icons` at install time.

---

## 4. Layout

### 4.1 App Shell

```
┌─────────────────────────────────────────────────────────────────┐
│ Sidebar (240px)        │ Topbar (56px)                          │
│  • Logo + product name │  • Page title  • View switcher  • CTA  │
│  • Section: Overview   ├────────────────────────────────────────┤
│    – Dashboard         │                                        │
│    – Orders            │                                        │
│    – Customers         │                                        │
│    – Analytics         │   Content (max-w 1440px, px-8)         │
│  • Section: Inventory  │                                        │
│  • Section: Settings   │                                        │
│                        │                                        │
│  • User card (bottom)  │                                        │
└─────────────────────────────────────────────────────────────────┘
```

- **Sidebar:** 240px collapsed-to-64px. `bg-canvas`, right `1px solid hairline`. Section labels are 11px uppercase, `text-ink-3`, `tracking-wider`. Nav items: 32px row, 8px gap, icon 18px, text 13px. Active = `bg-surface`, text `ink`.
- **Topbar:** 56px. `bg-canvas`, bottom `1px solid hairline`. Page title left (h1, 22px), action cluster right.
- **User card:** anchored bottom of sidebar, shows avatar + name + email. Click → dropdown (Profile, Settings, Appearance, Log out).

### 4.2 Page composition

Every page follows: **Section header → Content blocks → (optional) Footer actions.**

Section header pattern:

```
[Eyebrow]    ← 12px uppercase, ink-3, tracking-wider
Title        ← h2, 22px, ink
Description  ← body, ink-2, max-w 720px
```

### 4.3 KPI tile row

4 tiles side-by-side, equal width, 16px gap.

```
┌─────────────┐
│ $124,592    │ ← display 36px, tnum
│ Total Revenue│ ← 13px, ink-3
│ ↑ 12.5%     │ ← 12px, success (or error if down)
└─────────────┘
```

`bg-canvas`, `1px solid hairline`, `radius-md`, `p-5`.

### 4.4 Page Shell (component)

Promoted from a pattern (v3.8) to a real component. `<PageShell>` wraps a page's title block, breadcrumbs, primary/secondary actions, and provides automatic spacing to the content below. Polaris-style.

**Slots:**
- `breadcrumb` (optional) — back-link or trail, rendered above title.
- `title` (required) — h1, 22px, `ink`, `font-weight: 600`.
- `subtitle` (optional) — 13px, `ink-3`, max-w 720px.
- `metadata` (optional) — inline status badges, auto-save status, last-edited timestamp; rendered to the right of title on desktop, below on mobile.
- `primaryAction` (optional) — single primary `<Button>` on the far right of the title row.
- `secondaryActions` (optional) — `<Button>` array, rendered as a `<ButtonGroup>` to the left of `primaryAction`.
- `tabs` (optional) — `<Tabs>` rendered below the header, sticky on scroll.
- `banner` (optional) — slot for one or more `<Banner>` instances above the title.

**Layout:**
- Outer padding: `px-8 pt-6 pb-4`.
- Title row: flex, `items-start`, `justify-between`, 16px gap.
- 1px `hairline` divider below header (skipped if `tabs` present — the tabs row carries the divider).

**Behavior:**
- Sticky on scroll past 56px topbar (configurable via `sticky` prop).
- Auto-collapses subtitle on small screens.
- `loading` prop dims the header and replaces actions with skeleton.

```tsx
<PageShell
  breadcrumb={<Breadcrumb items={[{ label: 'Inventory', href: '/inventory' }, { label: 'Products' }]} />}
  title="Edit SKU"
  subtitle="Update product details and stock levels"
  metadata={<AutoSaveStatus status="saved" />}
  secondaryActions={[<Button variant="secondary">Discard</Button>]}
  primaryAction={<Button variant="primary">Save</Button>}
  tabs={<Tabs items={…} />}
>
  {/* page content */}
</PageShell>
```

### 4.5 Doc Shell (Notion-style app layout)

The full app shell. Use this when you want a single layout primitive that:

- Owns the entire viewport (sidebar + content card).
- Lets the **sidebar merge with the page background** (Notion-style) so only the content card stands out.
- Includes a **collapsible sidebar** (260px ↔ 56px) with tooltip-on-hover for collapsed icons.
- Includes a **sticky page header** that gets a fading hairline + soft shadow once the body scrolls past 8px.
- Lets each page choose **centered (720px)** or **full-width** body layout, persisted at the shell level.

#### Composition

```
<DocShell>
  <DocSidebar>
    <DocSidebarBrand logo name meta />          ← workspace switcher trigger
    <DocSidebarSearch onClick={openCmdK} />     ← top of sidebar (no footer ⌘K)

    <DocSidebarNav>
      <SidebarNav>                              ← reuses the existing primitive
        <SidebarNavSection title="Pinned" action={<AddPinned/>}>
          <SidebarNavItem trailing={<PinAction/>}>...</SidebarNavItem>
        </SidebarNavSection>
        <SidebarNavSection title="Sales">
          <SidebarNavParent title="Sales" leading={<Icon/>} defaultOpen>
            <SidebarNavItem indent>...</SidebarNavItem>
          </SidebarNavParent>
        </SidebarNavSection>
      </SidebarNav>
    </DocSidebarNav>

    <DocSidebarFooter>
      <DocSidebarUser avatar name meta />       ← personal dropdown (profile/theme/sign-out)
      <DocSidebarBellAction dot />
      <DocSidebarHelpAction />
    </DocSidebarFooter>
  </DocSidebar>

  <DocContent>
    <DocPageHeader
      breadcrumb={<Breadcrumbs items={...} />}
      title="..."
      subtitle="..."
      metadata={<AutoSaveStatus state="saved" />}
      actions={<>...</>}
      showWidthToggle                           // default true
    />
    <DocBody>
      {/* page content; switches between centered / full via shell context */}
    </DocBody>
  </DocContent>
</DocShell>
```

#### Tokens & metrics

| Token | Value |
|---|---|
| Sidebar width (expanded) | `260px` |
| Sidebar width (collapsed) | `56px` |
| Shell gap (sidebar ↔ card) | `8px` |
| Content card radius | `5px` (matches sidebar item radius) |
| Content card border | `1px hairline` |
| Content card elevation | `elev-1` |
| Sidebar bg | `var(--surface)` (page bg) |
| Card bg | `var(--canvas)` |
| Body width — centered | `max-w-[720px]`, `pt-12` (48px) |
| Body width — full | edge-to-edge inside card padding |
| Sticky header padding | `px-8 pt-4 pb-3.5` |
| Body padding | `px-8 pt-8 pb-24` |

#### Behaviour

- **Collapse:** `B` key (skipped while typing); also via `<DocPageHeader>`'s built-in toggle button. Animates 250ms `ease-standard` via grid-template-columns transition.
- **Body width:** `W` key; also via `<DocPageHeader>`'s width toggle. Lifted to `<DocShell>` context so DocBody picks it up.
- **Tooltip on collapse:** `<DocSidebarBrand>`, `<DocSidebarSearch>`, `<DocSidebarUser>` auto-render `<Tooltip>` wrappers when `useDocShell().collapsed` is true.
- **Brand and User dropdowns:** wired through the existing `<Popover>` primitive (consumers pass their own `<PopoverContent>`).
- **Sticky shadow:** `<DocContent>` listens to scroll inside the card and provides scrolled state to `<DocPageHeader>` via context. Header fades a hairline + 1px shadow at scrollTop > 8px.

#### When to use

| | Use this layout |
|---|---|
| **DocShell** | Whole-app layouts: dashboards, knowledge bases, settings pages, admin tools. Anything where the user spends most of their session. |
| **PageShell (§4.4)** | Sub-pages embedded in a larger layout, modals, drawers — any context where the shell is already provided by a parent. |
| **Plain `<main>` + `<header>`** | Marketing pages, full-bleed media, signed-out experiences. No shell needed. |

#### Migration from v3.13's `<SidebarNav>` callers

Existing `<SidebarNav>` users continue to work — the API is additive. To adopt DocShell:

1. Wrap your existing app in `<DocShell>` + `<DocSidebar>` + `<DocContent>`.
2. Move your `<SidebarNav>` block inside `<DocSidebarNav>`.
3. Add `<DocSidebarBrand>` and `<DocSidebarFooter>` around it.
4. Replace your existing page header pattern with `<DocPageHeader>`.

The active-row visual changed: the 2px ink rail is gone in v3.14, replaced by `bg-surface-2 + font-medium`. If you depended on the rail, override via `className="before:absolute before:left-0 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-r-sm before:bg-ink"` on the active item.

---

## 5. Components

### 5.1 Buttons

Polaris-style chrome. Buttons separate **shape** (`variant`) from **intent** (`tone`) — same component, two orthogonal axes.

**Variants (shape):** `primary`, `secondary`, `tertiary`, `plain`.  
**Tones (intent):** `default`, `critical`, `success`, `warning`, `info`.  
**States:** Default, Hover, Active (pressed), Loading (spinner), Disabled, Focus-visible.  
**Sizes:** `micro` 24px, `sm` 28px, `md` 32px (default), `lg` 40px.

#### Visual chrome (matches Shopify Polaris)

- **Radius:** **8px** (`radius-md`).
- **Font weight:** **600**, letter-spacing `-0.005em`.
- **Border:** 1px, color matches the gradient bottom stop.
- **Gradient:** subtle 0–100% vertical (180deg). Top stop is 5–10% lighter than the brand color, bottom is 5–10% darker. Flat fills are explicitly avoided.
- **Inset highlight (top):** `inset 0 1px 0 0 rgba(255,255,255,0.20–0.25)` for primary tones, gives a glossy "key cap" feel.
- **Inset shadow (bottom):** `inset 0 -1px 0 0 rgba(0,0,0,0.20–0.30)` for primary tones, anchors the button.
- **Outer shadow:** `0 1px 0 0 rgba(0,0,0,0.05)` for default and primary; secondary uses `0 1px 0 0 rgba(0,0,0,0.04)`.
- **Press state:** `transform: translateY(0.5px)` + invert insets (top becomes the shadow, bottom becomes the highlight). Mimics a physical key press.
- **Padding:** `0 8px` (micro), `0 12px` (sm), `0 12px` (md), `0 16px` (lg).
- **Gap to icons:** 6px.

> Implementation note: gradients and inset shadows can't be expressed cleanly through Tailwind utilities. The actual styling lives in a CSS module-style stylesheet inside `button.tsx`, keyed by `data-variant` and `data-tone`. Tailwind handles only sizing, layout, and disabled state.

#### Variant matrix

| Variant | Default | Hover | Active (pressed) | Disabled |
|---|---|---|---|---|
| `primary` (`tone=default`) | `linear-gradient(180deg, #404040 → #1a1a1a)` border `#1a1a1a`, white text, full inset highlights | gradient shifts to `#2e2e2e → #0d0d0d`, border `#0d0d0d` | flat `#1a1a1a`, `transform: translateY(0.5px)`, inset top shadow | flat `#f1f1f2 → #ebebed`, `ink-4` text, `hairline` border |
| `secondary` (`tone=default`) | `linear-gradient(180deg, #ffffff → #f6f6f7)`, border `hairline-strong`, ink text, inset bottom shadow only | gradient `#f6f6f7 → #ebecee`, border `ink-3` | flat `#ebecee`, `translateY(0.5px)` + soft inset top shadow | same disabled as primary |
| `tertiary` | transparent, no border, `ink-2` text | bg `rgba(0,0,0,0.06)`, text `ink` | bg `rgba(0,0,0,0.10)`, `translateY(0.5px)` | text `ink-4` |
| `plain` | transparent, underlined, `ink` text, no padding | underline thickens to 2px | n/a (links don't translate) | text `ink-4`, no underline |

#### Tone overrides on top of variant

Tones shift the gradient + border to communicate intent. Below is the **bg gradient → border** for primary; secondary uses a soft tinted background with a colored 1px border + colored text.

| Tone | Primary gradient | Primary border | Secondary border / text | Tertiary text | Plain text |
|---|---|---|---|---|---|
| `default` | `#404040 → #1a1a1a` | `#1a1a1a` | `hairline-strong` / `ink` | `ink-2` (default) → `ink` (hover) | `ink` |
| `critical` | `#e51c00 → #cc1a00` | `#b81700` | `error` / `error`, hover bg `error-tint` | `error` | `error` |
| `success` | `#1aae39 → #0c8b29` | `#0c8b29` | `success` / `success`, hover bg `success-tint` | `success` | `success` |
| `warning` | `#dd5b00 → #b84a00` | `#b84a00` | `warning` / `warning`, hover bg `warning-tint` | `warning` | `warning` |
| `info` | `#2563eb → #1e4fc4` | `#1e4fc4` | `info` / `info`, hover bg `info-tint` | `info` | `info` |

Hover for primary tones darkens both gradient stops by ~10% and matches the new border. Active flattens the gradient to the bottom stop and inverts the inset highlight.

#### Loading state

Replace the leading slot with `<Spinner size="sm" />`. Maintain the button's width via `min-w` so the layout doesn't collapse. Spinner tone:
- Primary buttons → `tone="inverse"` (white spinner on dark bg).
- Tinted secondaries → spinner inherits the tone color.
- Default secondary, tertiary, plain → `tone="default"`.

#### Dark mode

- **Primary default** swaps to a light gradient: `linear-gradient(180deg, #f4f4f5 → #d4d4d6)`, dark ink text, lighter inset highlight (`rgba(255,255,255,0.40)`). Provides inverse contrast against the dark canvas.
- **Secondary default** uses `linear-gradient(180deg, #2a2a2e → #1f1f22)`, light ink text, darker insets.
- **Tertiary** hover bg becomes `rgba(255,255,255,0.06)`.
- **Tinted variants** (critical / success / warning / info) keep their saturated gradients but border + text use the dark-mode token values.

#### Migration from v3.8 / v3.9 flat-fills

| Old (v3.8) | New (v3.10) |
|---|---|
| `<Button variant="danger">` | `<Button variant="primary" tone="critical">` |
| `<Button variant="success">` (flat fill) | `<Button variant="primary" tone="success">` (gradient) |
| `<Button variant="warning">` (flat fill) | `<Button variant="primary" tone="warning">` (gradient) |
| `<Button variant="ghost">` | `<Button variant="tertiary">` |

```tsx
<Button variant="primary" tone="critical" size="md" loading>Delete</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary" tone="success">Mark as paid</Button>
<Button variant="plain">Learn more</Button>
```

### 5.1a Button Group

A container that arranges related buttons with consistent spacing. Two layouts.

**Layouts:**
- `spaced` (default) — buttons separated by 8px gap. For form footers and toolbars.
- `segmented` — buttons joined edge-to-edge, sharing borders, with a single **outer 8px radius**. For toggle/view switchers when a sliding pill (Segmented Control §5.2) is too heavy.

**Anatomy (spaced):**
```
[ Cancel ] [ Save ]      ← 8px gap, secondary + primary
```

**Anatomy (segmented):** Polaris-style.
- Outer radius: 8px on the group's left and right ends only.
- Each cell: `border-radius: 0` (overrides the Button's own 8px), except first child gets left-rounded and last child gets right-rounded.
- Adjacent cells overlap with `margin-left: -1px` so the 1px borders form a single shared divider rather than doubling up.
- Hover / focus / pressed cells get `position: relative; z-index: 1` so their border + focus ring sit above the neighbors.
- Variant: usually `secondary`. Mixing variants inside a segmented group is supported but discouraged.

**Selection state:** consumers wire selected via `aria-pressed="true"` on the active button. The Button stylesheet has a matching rule that inverts the variant's inset highlight (top becomes shadow, bottom becomes highlight), reproducing Polaris's "depressed key" look. No JS state lives in `<ButtonGroup>` itself — it's a pure layout primitive.

**Implementation note:** segmented behavior is opt-in per child via a `data-segmented` attribute. `<ButtonGroup layout="segmented">` clones each child element to add this attribute; the Button's CSS keys off it. Doing it this way (instead of through Tailwind utility overrides on `[&>*]`) keeps the cascade single-sourced inside `button.tsx` and avoids specificity wars with the variant gradients.

**When to use which:**
- `spaced` — form actions, toolbars with mixed intents (e.g., Cancel + Save).
- `segmented` — view switchers without animation, filter mode toggles, multi-state pickers.
- Sliding pill (§5.2 Segmented Control) — when the indicator should animate between selections.

```tsx
const [view, setView] = useState<"day" | "week" | "month">("week")

<ButtonGroup layout="segmented">
  <Button variant="secondary" aria-pressed={view === "day"}   onClick={() => setView("day")}>Day</Button>
  <Button variant="secondary" aria-pressed={view === "week"}  onClick={() => setView("week")}>Week</Button>
  <Button variant="secondary" aria-pressed={view === "month"} onClick={() => setView("month")}>Month</Button>
</ButtonGroup>
```

### 5.2 Segmented Control (sliding pill)

Three sizes — **22px (compact)**, **30px (default)**, **38px (large)**.

- Container: `bg-surface`, `radius-pill`, `p-1`.
- Pill: `bg-canvas`, `radius-pill`, `elev-1`, slides via `transform` over 250ms `ease-emphasis`.
- Hover (inactive item): text darkens from `ink-3` → `ink-2`.
- Click & hold the active pill → drag to adjacent option (cursor: grabbing).
- Reduced motion: instant snap + 80ms text fade.

```
[ Day | Week | Month ]   ← active pill slides between cells
```

### 5.3 Tables

Compact density. **No vertical borders.** Row separation via 1px bottom hairline only.

- Row height: 44px (compact 36px optional).
- Header: `bg-surface`, 12px uppercase, `text-ink-3`, `tracking-wide`, sticky on scroll.
- Cell: 13px, `tnum` for numerics, `px-4`.
- Hover row: `bg-surface/60`.
- Selected row: `bg-info-tint`, left 2px `info` accent.
- Checkbox column: 40px wide, leftmost.
- Action column: rightmost, kebab menu (⋯) appears on row hover.

#### Sticky columns
- Left: checkbox + name (frozen).
- Right: actions (frozen).
- Edge scroll shadow: `linear-gradient(90deg, rgba(0,0,0,0.06), transparent)` 16px wide.

#### Inline edit
- Every cell renders as a borderless input by default (rests as static text on the row's bg).
- Hover cell → 1px `hairline` outline.
- Focus → 1px `ink` outline + `bg-canvas`.
- `Tab` / `Shift+Tab` navigates cells; `Enter` commits + moves down.

> Inline edit intentionally drops the standard bordered input style (§5.4) for spreadsheet density. The bordered style is still used everywhere else.

### 5.4 Forms

#### Text input (default)
- **Bordered** style: `bg-canvas`, 1px `hairline-strong` border, `radius-sm`, 36px height, `px-3`.
- Subtle inset shadow: `inset 0 1px 0 rgba(0,0,0,0.02)` (Polaris-style).
- Focus: 1px `ink` border + `ring-1 ring-ink`, no shadow change.
- Hover: border `ink-3`.
- Disabled: `bg-surface`, `text-ink-4`, border `hairline`, `cursor-not-allowed`.
- Error: 1px `error` border + `ring-1 ring-error`.
- With leading icon: 18px icon, 8px gap. With trailing affix: 1px divider before suffix.

```
┌──────────────────────┐
│ Customer name        │  ← 36h, 1px hairline-strong, radius-sm
└──────────────────────┘
```

#### Floating label (notched outline)
Material-style. Three sizes: 40 / 48 / 56 px.

- 1px `hairline-strong` outline at rest.
- Label inside, vertically centered, `ink-3`, 14px.
- On focus or filled: label scales to 12px, translates to `-8px / 12px`, **cuts a notch in the outline** (border-top becomes 2 segments).
- Outline color on focus: `ink`.
- Error: outline `error`, label `error`, helper text `error` below.

#### Select
Same shape as Text input. Trailing chevron `▼` 14px `ink-3`. Opens shadcn dropdown.

#### Checkbox
- Sizes: 14 / 16 / 18 px. Default 16px.
- Unchecked: `bg-canvas`, 1.25px `hairline-strong`, `radius-xs`.
- Checked: `bg-ink` (or tone variant), white check icon, no border.
- Indeterminate: `bg-ink`, white minus icon.
- Disabled: 50% opacity.
- Tone variants: `default` (ink), `success`, `warning`, `critical`, `info`.
- **Indicator animation:** the check (or minus) icon scales from 50% → 100% with opacity fade-in over `dur-base` `ease-emphasis` when checked. Reverse on uncheck. Under reduced motion the indicator snaps in. Implemented via `<Checkbox.Indicator forceMount>` so the icon DOM stays mounted and we animate `data-[state]` transitions.

#### Switch (renamed from Toggle)
- Track: 32×18, `bg-surface-2` off / `bg-ink` on.
- Knob: 14×14, `bg-canvas`, `elev-1`. Bounce: 250ms `ease-emphasis`.
- Locked: 🔒 icon overlay, opacity 60%, no interaction.
- Tone variants apply to the on-state track color.

> **Migration:** `<Toggle>` is renamed to `<Switch>`. Old export remains as a deprecated alias for one minor version.

#### Choice List

A grouped set of radios or checkboxes with a shared label and optional description. Polaris-style.

- **Modes:** `single` (radio), `multiple` (checkbox).
- Group label: 13px, `ink`, `font-weight: 500`, `mb-2`.
- Group help text: 12px, `ink-3`, `mb-2`, below label.
- Item row: 32px, 8px gap between control + label, 4px row gap.
- Item label: 13px, `ink-2`. Optional 12px `ink-3` description below the label.
- Disabled item: 50% opacity, no interaction.
- Used heavily in filter sidebars, status pickers, multi-option forms.

```
Status filter
○ All orders
● Paid only
○ Pending review
   Awaiting customer payment confirmation
```

#### Search Field

Promoted to a first-class primitive (was a pattern in v3.8).

- 36px height, `bg-canvas`, 1px `hairline-strong`, `radius-sm`, `px-3`.
- Leading 16px search icon (`Search01Icon`), 8px gap to input. Icon darkens from `ink-3` → `ink` when the field gains focus.
- Clear button (×) appears on the right when input has value; click clears + refocuses. **Single ✕ only** — the native browser search clear button is suppressed via:
  ```css
  input[type="search"]::-webkit-search-cancel-button { display: none; }
  ```
- The clear ✕ animates in: scale 90% → 100% + opacity 0 → 1, `dur-base` `ease-standard`. Hidden under reduced motion.
- Optional trailing keycap `/` to indicate the global search shortcut.
- Debounced `onChange` event (default 250ms).
- Empty placeholder: `ink-4`.

```
┌────────────────────────────────┐
│ 🔍  Search orders…           × │
└────────────────────────────────┘
```

#### Money Field

Currency-formatted numeric input. ERP staple for prices, totals, fees.

- 36px height, `bg-canvas`, 1px `hairline-strong`, `radius-sm`.
- Leading currency prefix (e.g., `$`, `€`, `Rp`) in a 1px-divided cell, 12px `ink-3`.
- Input: right-aligned, `tnum`, auto-formats on blur (e.g., `1240` → `1,240.00`).
- Locale-aware decimals (default 2; configurable via `decimals` prop).
- `value` is a typed number (not string) — formatting is presentational.
- Negative values render in `error` color when `signed` prop is true.
- Trailing affix (optional) for currency code or `/unit`.

```
┌──────────────────────┐
│ $ │     1,240.00     │
└──────────────────────┘
```

#### Number field (bare)
For non-currency numerics where stepper buttons would clutter. Same surface as Text input, `tnum`, right-aligned by default. For +/- controls see §5.20 Number Stepper.

#### Textarea
- Same surface as Text input. Min height 88px.
- Bottom-right character counter: 12px `ink-3`. Turns `warning` at 90%, `error` at 100%.

#### Form validation
- **Valid:** trailing 18px check icon (`success`), animated draw-in 200ms. Border stays default.
- **Error:** 1px `error` border + `ring-1 ring-error`, trailing 18px alert icon (`error`), helper text below in `error`.
- Animation: icon scales from 0.6 → 1 with opacity fade.

#### Help text
- 12px, `ink-3`, `mt-1.5` below input. No icon.

#### Required field
- Red asterisk `*` after label, `text-error`, no extra space.

### 5.5 Tabs

- Underline style. 38px tall row.
- Inactive: `text-ink-3`, no underline.
- Active: `text-ink`, 2px `ink` underline, animated slide between tabs (200ms).
- Hover (inactive): `text-ink-2`.

### 5.6 Tooltip (shadcn-style)

- `bg-ink`, `text-canvas`, 12px, `px-2 py-1.5`, `radius-sm`, `elev-2`.
- 6px arrow.
- Fade + 4px translate, 150ms.
- Optional keycap inline: `Bold ⌘B`.
- Directions: top / bottom / left / right.

> Tooltip is for passive **hover/focus hints only** (≤ 2 lines). For interactive content use Popover (§5.6a).

### 5.6a Popover

Generic anchored overlay primitive. Base layer that powers Tooltip, Dropdown Menu, Saved Filters dropdown, Date Picker, and any custom flyout.

**Anatomy:**
- Container: `bg-canvas`, 1px `hairline`, `radius-md`, `elev-3`, `p-3` (default).
- Anchored to a trigger element. Auto-flips on viewport edges.
- Optional 8px arrow pointing to trigger (toggle via `arrow` prop).
- Z-index: `30` (below modals, above sticky chrome).

**Behavior:**
- Opens on `click` (default) or `hover` (`trigger="hover"`).
- Closes on outside click, `Esc`, or by toggling the trigger.
- Focus trapped while open if it contains focusable elements.
- Animates: opacity + 4px translate from anchor side, 150ms.

**Composition:**
Built on Radix Popover via shadcn. Examples of components composed from this primitive:
- Tooltip (§5.6) → text-only, no padding
- Dropdown Menu (§5.15) → menu structure inside
- Saved Filters dropdown (§5.25) → checklist
- Date Picker calendar (§5.21) → grid inside
- Custom user flyouts → anything else

```tsx
<Popover>
  <PopoverTrigger asChild><Button variant="secondary">Filters</Button></PopoverTrigger>
  <PopoverContent>{/* any content */}</PopoverContent>
</Popover>
```

### 5.7 Badges

Polaris-style. Rounded rectangle, leading status dot, sentence case. Quieter than v3.8 pill badges so they don't compete with table content.

**Anatomy:**
- Shape: rounded rectangle, `radius-sm` (6px corners with subtle rounding — visually closer to 8px).
- Height: 20px (small) / 24px (default) / 28px (large).
- Padding: `px-2 py-0.5` (default).
- Font: 12px, `font-weight: 500`, **sentence case** (not uppercase).
- Leading dot: 6px circle, `currentColor`, 70% opacity, 4px gap to label.

**Tones:**

| Tone | Background | Text | Use |
|---|---|---|---|
| `default` | `surface-2` | `ink-2` | Generic state |
| `success` | `#cdfee1` | `#0c5132` | Paid, In stock, Synced |
| `warning` | `#ffeacc` | `#5b3300` | Pending, Low stock |
| `critical` | `#fee9e7` | `#8e1f0b` | Failed, Out of stock |
| `info` | `#d2efff` | `#00527c` | Processing |
| `attention` | `#fff1d6` | `#5b3300` | Watch, Action needed |
| `new` | `#e3e0f8` | `#38298b` | New / unread / recently added |
| `read-only` | `surface-2` | `ink-3` | Locked, Archived, Draft |

**Sample mapping (ERP):**

| Domain meaning | Tone |
|---|---|
| Paid | `success` |
| Pending | `warning` |
| Failed | `critical` |
| Processing | `info` |
| Draft | `read-only` |
| In stock | `success` |
| Low stock | `attention` |
| Critical / Out of stock | `critical` |
| New order | `new` |

**Sizing:**
- `small` 20px — inline within table cells
- `default` 24px — most contexts
- `large` 28px — hero status indicators, top of detail drawers

The leading dot can be hidden via `dotless` prop for purely typographic contexts.

### 5.7a Banner

Inline persistent alert. Stays on the page until resolved or dismissed. Used for things Toasts can't carry: trial expiry, sync failures, import errors, system status.

**Anatomy:**
- Container: full-width by default, `radius-md` (8px), `p-3 px-4`, no border.
- Layout: `[icon 18] [body (title + text + actions)] [× dismiss]`.
- Icon: 18px hugeicons, leading, top-aligned with title.
- Title: 13px, `font-weight: 600`, sentence case. Optional.
- Body text: 13px, 1.5 line-height, color matches tone foreground.
- Actions: trailing button row using `tertiary` variant scoped to the tone color, max 2 actions.
- Dismiss × : 16px icon button, top-right, `tertiary tone="default"` (or matching tone).

**Tones (background / foreground):**

| Tone | BG | Text | Icon |
|---|---|---|---|
| `info` | `#d2efff` | `#00527c` | `InformationCircleIcon` |
| `success` | `#cdfee1` | `#0c5132` | `CheckmarkCircle02Icon` |
| `warning` | `#fff1d6` | `#5b3300` | `Alert02Icon` |
| `critical` | `#fee9e7` | `#8e1f0b` | `AlertCircleIcon` |

**Variants:**
- `inline` (default) — sits in page flow above content.
- `section` — placed at the top of a Section (§4.2) without margins.
- `compact` — single-line variant without title; use for short status messages.

**Behavior:**
- Persistent. Does not auto-dismiss.
- `onDismiss` optional; when provided, shows × control. Dismiss control: 70% → 100% opacity on hover, scales to 95% on press, all `dur-fast`.
- Multiple banners stack with 8px gap.
- **Mount:** opacity 0 → 1 + slide-in-from-top-1 (4px), `dur-base` `ease-standard`. Powered by `tw-animate-css` (`animate-in fade-in-0 slide-in-from-top-1`).

**When to use Banner vs Toast:**

| Situation | Component |
|---|---|
| One-off success ("Order saved") | Toast |
| Persistent state ("Sync failed — retry") | Banner |
| Time-bound notice ("Trial ends in 3 days") | Banner |
| Background result ("Export completed") | Toast |
| Page-level error after submit ("3 fields invalid") | Banner |

```
┌────────────────────────────────────────────────────────────┐
│ ⚠  Trial ending                                          ×│
│    Your trial expires in 3 days.   [Upgrade]  [Learn more] │
└────────────────────────────────────────────────────────────┘
```

### 5.7b Spinner

Standalone loading indicator. Used inline for in-progress states, embedded in buttons (§5.1), or centered on empty regions during data fetch.

- **Sizes:** `small` 16px / `default` 20px / `large` 32px / `xl` 44px.
- **Stroke:** 2px (small/default), 2.5px (large), 3px (xl).
- **Track color:** `surface-2`. **Active arc:** `ink` (or current tone for inline use).
- **Animation:** rotate 360° in 700ms linear, infinite. Quarter-turn arc.
- **Reduced motion:** static dotted ring at 50% opacity, no animation.
- **A11y:** wrap with `role="status"` and accessible label (`aria-label="Loading"` or visually hidden text).

```tsx
<Spinner size="default" />
<Button loading>Saving…</Button>   // uses Spinner internally
<div className="flex items-center justify-center p-12"><Spinner size="large" /></div>
```

### 5.8 Modal

- Centered, max-w 480px (sm) / 560px (md) / 720px (lg) / 960px (xl).
- `bg-canvas`, `radius-lg`, `elev-4`.
- Backdrop: `rgba(0,0,0,0.4)` + 1px backdrop-blur.
- **Animation:** scale `95% → 100%` + opacity, **35ms** open + close, `ease-emphasis`. Snappier than the original 250ms; this duration is right at the perception threshold so the modal feels instantaneous without a true snap.
- Header: 16px h3 title + optional description, 24px close icon top-right with hover/active feedback.
- Body: `text-[13px]`, `text-ink-2`.
- Footer: right-aligned actions on `bg-surface` panel with top hairline divider.
- Confirm-action variant uses 14px copy + Cancel + critical primary.

### 5.9 Drawer

- Side panel, **480px default** (configurable via `width` prop — pass a number in px or any CSS string).
- `side`: `right` (default) or `left`.
- `bg-canvas`, side hairline border, `elev-4`.
- Slide-in 250ms `ease-emphasis`. Overlay fades 150ms.
- Anatomy: `<DrawerHeader>` (sticky, with `border-b`) → `<DrawerBody>` (scrolls) → `<DrawerFooter>` (sticky bottom on `bg-surface`).
- Title (`<DrawerTitle>`) and description (`<DrawerDescription>`) are required for a11y; Radix Dialog enforces this via `aria-labelledby` / `aria-describedby`.
- Same close-affordance pattern as Modal (top-right ✕, hover bg, active scale).

### 5.10 Toast

#### Top-center (single, transactional)
- Fixed width 360px, centered below topbar.
- Stacks downward 8px gap.
- Variants: Success, Warning, Error, Info — each with leading 18px icon, 14px text, dismiss × on right.
- Auto-dismiss 4s (errors persist).
- Slide down 200ms + opacity.

#### Top-right (notification stack)
- Stacks downward, slide in from right 250ms.
- Same content shape as top-center.
- Replaces top-center for non-modal notifications.

#### Undo toast
- Inline, text-only, light: "3 items archived. **Undo**".
- 13px `ink-2`, Undo link `ink` + underline-on-hover.
- No background, no shadow. Bottom-left of viewport.
- Persists 8s.

### 5.11 Empty State

Centered card.
- 56px emoji or illustrative icon.
- 16px h3 title.
- 14px `ink-3` description.
- Primary CTA below.
- `py-12 px-6`, max-w 360px, mx-auto.

### 5.12 Skeleton (family)

A loader family covering the most common ERP placeholder shapes. Two animations: `shimmer` (default — moving gradient sweep) and `pulse` (quieter, opacity-based).

**Base primitive — `<Skeleton>`**
- Default: `ds-skeleton-shimmer` — `linear-gradient` 200% wide, animated 1.5s linear infinite (`background-position`).
- Pulse: `ds-skeleton-pulse` — `opacity 1 → 0.55 → 1` over 1.6s ease-in-out infinite.
- `shape`: `rect` (default, `radius-sm`) / `circle` / `pill`.
- Reduced motion: animation removed, static `bg-surface`.

**Composed helpers**

| Helper | Output |
|---|---|
| `<SkeletonText lines={3} lastLineWidth="60%" />` | `n` rows of 12px-tall lines with the last shorter, gap 8px. |
| `<SkeletonAvatar size="md" />` | Circle matching Avatar token sizes (`xs` 20 / `sm` 24 / `md` 32 / `lg` 40 / `xl` 56). |
| `<SkeletonButton size="md" block />` | 8px-rounded rect matching Button height. `block` makes it full-width. |
| `<SkeletonTable rows={5} cols={4} />` | Bordered card with `bg-surface` header bar + body rows. Variable widths so rows don't look identical. |
| `<SkeletonList items={5} leading trailing />` | Repeating row: leading avatar + two text lines + trailing meta. |
| `<SkeletonCard />` | Avatar + title/subtitle + 3-line text + 2 small button stubs. |

**Usage pattern:**
```tsx
{loading ? <SkeletonTable rows={8} cols={5} /> : <Table>...</Table>}
```

CSS keyframes are injected once on first mount via a singleton `<style>` tag (no global preflight pollution).

### 5.13 Pagination

- Ghost buttons, 32px square, 13px.
- Active page: `bg-ink/8`, text `ink`.
- Hover: `bg-surface`.
- Prev/Next: chevron icons 16px.
- Ellipsis (`...`) for skipped ranges.

### 5.14 Breadcrumbs

- Chevron separator (`›`), 14px `ink-4`, 8px h-spacing.
- Links: `ink-3`, hover `ink`.
- Current page: `ink`, no underline.

### 5.15 Dropdown Menu (shadcn)

- `bg-canvas`, 1px `hairline`, `radius-md`, `elev-3`.
- Min-w 200px.
- Group label: 11px uppercase, `ink-3`, `px-2 py-1.5`.
- Item: 32px, `cursor-pointer`, leading 16px icon + 8px gap + 13px label.
- Hover: `bg-surface`, transition `dur-fast`.
- Divider: 1px `hairline`, `my-1`.
- Danger zone: separate group, item icon + label in `error` (hover bg `error-tint`).
- **Shortcut hints** (`<DropdownMenuShortcut>`): pulled to the row's right edge via `ml-auto`. Item children are flat flex siblings — no greedy `flex-1` span between label and shortcut.
- **Open animation:** fade-in + 8px slide from the trigger edge, `dur-base` `ease-standard`. Side-aware: `data-[side=bottom]` slides down from the trigger top, etc. No zoom (caused flicker on open while Radix was sizing the menu).
- `collisionPadding={8}` so the menu never butts up against the viewport edge mid-animation.

### 5.16 Stepper / Wizard

- Horizontal numbered steps with connector lines.
- Step circle: 28px, 1.5px border.
  - Inactive: `hairline-strong` border, `ink-3` number.
  - Active: `bg-ink`, white number.
  - Complete: `bg-ink`, white check icon.
- Connector: 1.5px line between circles.
  - Inactive: `hairline`.
  - Complete: `ink`.
- Label below: 13px, `ink-3` (inactive) / `ink` (active).

### 5.17 Progress

#### Segmented
- 5 cells, 6px tall, 4px gap, `radius-pill` per cell.
- Filled: `ink`. Empty: `surface-2`.
- Caption below: 12px `ink-3`.

#### Circular
- 64px ring, 6px stroke, `surface-2` track, `ink` filled arc.
- Centered % label, 16px, `tnum`.

### 5.18 Accordion

- Borderless. 1px `hairline` between items only.
- Trigger: 56px row, 14px label, trailing 18px chevron.
- Chevron rotates 180° on open, 200ms.
- Content: 14px `ink-2`, `pb-4`. Smooth height transition (200ms).

### 5.19 Chip

Standalone non-interactive label primitive. Used for displaying tags, categories, or attributes — distinct from chip *inputs* (§5.19a) and Badges (§5.7).

**When to use which:**
- **Badge** — communicates status (Paid, Pending, Failed). Has tonal meaning.
- **Chip** — communicates a label or category (Electronics, Wireless, On sale). Neutral by default.
- **Clickable Chip** (§5.19) — chip that triggers an action when clicked (filter toggle, suggestion).
- **Chip Input** (§5.19a) — multi-value form control for entering tags.

**Anatomy:**
- Shape: rounded rectangle, `radius-sm` (8px visual), 24px (sm) / 28px (default) / 32px (lg) tall.
- BG: `surface-2`, text `ink`, no border.
- Padding: `px-2.5`, 13px text.
- Optional leading icon (16px) or avatar (20px), 6px gap.

#### Clickable Chip
- Same shape, hover `surface` → border `hairline-strong`.
- Pressed: `bg-ink`, `text-canvas`.
- Removable variant: trailing 14px × icon, hover → `error`.
- A11y: rendered as `<button>` for clickable, `<span>` for static.

```tsx
<Chip>Electronics</Chip>
<Chip leading={<HugeiconsIcon icon={TagIcon} />}>Wireless</Chip>
<ClickableChip onRemove={() => …}>Active filter</ClickableChip>
<ClickableChip pressed>On sale</ClickableChip>
```

### 5.19a Tag / Chip Input

Multi-value form control. Built on top of Chip + Text Input.

- Outer container: matches Text input shape (§5.4) — `bg-canvas`, 1px `hairline-strong`, `radius-sm`, min-h 36px, padded `p-1.5`.
- Inside: rendered Chips (removable) + free-text input that flows after the last chip.
- Add chip on `Enter` or `,`; `Backspace` on empty input removes the last chip.
- Focus: 1px `ink` border + `ring-1 ring-ink`.
- Each chip: outlined variant, 24px height, 12px label, removable × on hover.

### 5.20 Number Stepper

- Bordered group, 1px `hairline-strong`, `radius-sm`, 32px height (default).
- Decrement / Increment buttons: square (matching the group height — 28 / 32 / 40 px).
- **Dividers between cells:** 1px `hairline`, **60% tall, vertically centered** (inset). Implemented via `::before` / `::after` pseudo-elements rather than `border-r` so the line breathes inside the row instead of running edge-to-edge. Inspired by Polaris segmented stepper.
- Center input: text-aligned center, `tnum`, no native spinner controls.
- Hover on a button: `bg-surface`, `text-ink`. Active: `bg-surface-2`.
- Auto-disables decrement at `min` and increment at `max`.

### 5.21 Date Picker

**Implementation:** wraps `react-day-picker` v10 (`<DayPicker>`) with token-driven `classNames` so the calendar matches the rest of the system. The library's `style.css` is imported once from `packages/ui/src/styles/globals.css` to provide the calendar grid layout and animation keyframes. All visual treatment comes from our `classNames`.

**Two components:**

- `<DatePicker>` — inline calendar. Use directly in pages, drawers, or settings panels.
  - `mode="single" | "range" | "multiple"` (passes through to `<DayPicker>`; `selected` / `onSelect` are narrowed per mode by react-day-picker's discriminated types).
  - `variant="card"` (default; bordered, `radius-md`, `shadow-elev-1`, `p-3`) or `variant="bare"` (no chrome — for embedding inside Popovers and Drawers).
  - All other react-day-picker props (`numberOfMonths`, `disabled`, `fromDate`, `toDate`, `weekStartsOn`, `locale`, etc.) pass through.
  - Custom `Chevron` component renders `ArrowLeft02Icon` / `ArrowRight02Icon` from hugeicons.

- `<DateField>` — input-shaped trigger that opens a `<DatePicker variant="bare">` inside a `<Popover>`. Use in form rows next to `<Input>` and `<Select>`.
  - **Discriminated union** on `mode`: when `mode="single"`, `value` is `Date | null` and `onChange` returns `Date | null`. When `mode="range"`, `value` is `DateRange | null` and `onChange` returns `DateRange | null`.
  - `size="sm" | "md" | "lg"` matches `<Input>` heights exactly.
  - `formatDate` / `formatRange` props for localised display (defaults collapse the year on same-year ranges).
  - `clearable` renders a small × inside the trigger when a value is set.
  - Range mode auto-closes the popover once both edges land.

**Visual rules (mapped onto react-day-picker v10 class names):**

| Slot | Treatment |
|---|---|
| `month_caption` | 13 px / 600 weight `--ink`, `h-7`. |
| `weekday` | 11 px uppercase tracking-wider `--ink-4`. |
| `day_button` | 32 × 32, `radius-sm`, tabular-nums, `--ink-2` default → `bg-surface` `--ink` on hover. Transitions on `[background-color, color]` at `--dur-fast`. |
| `selected` (single) | `bg-ink` `text-canvas`, sticks on hover. |
| `today` | 600 weight, `--ink`, 1 px inset ring at `--ink/20`. |
| `outside` | `--ink-4`. |
| `disabled` | 40 % opacity, `cursor-not-allowed`. |
| `range_start` | `bg-ink` `text-canvas`, left-rounded only. |
| `range_end` | `bg-ink` `text-canvas`, right-rounded only. |
| `range_middle` | `bg-surface-2` `--ink`, square corners. |
| `button_previous` / `button_next` | `h-7 w-7`, `radius-xs`, hover `bg-surface`, absolutely positioned at `top-1 inset-x-1`. |

**`<DateField>` chrome (matches `<Input>`):**

- `radius-md` (8 px), 1 px `hairline-strong` border, inset top highlight at `rgba(0,0,0,0.02)`.
- Hover: border → `--ink-3`. Focus / open: border → `--ink`, 1 px inset ring `--ink`.
- Disabled: `bg-surface`, `text-ink-4`, `cursor-not-allowed`.
- Leading 14 px `Calendar03Icon` at `--ink-3`. Display value at 13 px (md). Placeholder at `--ink-4`.

**Accessibility:**

- `<DateField>` is a `<button type="button">` with `aria-label` (defaults to "Open date picker"; pass `label` for context).
- Keyboard: opens on Enter/Space, closes on Esc. Inside the calendar, arrow keys move day-by-day, Page Up/Down move month-by-month, Home/End move to start/end of week (all native to react-day-picker).
- The clear × is a `role="button"` with `aria-label="Clear date"` and stops propagation so it doesn't open the popover.
- Disabled days announce as `aria-disabled` per react-day-picker.

**Don't:**

- Don't import `react-day-picker` directly in consumers — go through `<DatePicker>` so styles stay token-driven. Use the re-exported `DateRange` type from `@cyanideui/ui`.
- Don't combine `variant="card"` with embedding inside a `<Popover>` — the popover already provides chrome. Use `variant="bare"` (or just use `<DateField>`).

### 5.22 File Upload

- Dashed dropzone: 1.5px dashed `hairline-strong`, `radius-md`, `py-8 px-6`, centered text.
- Hover/drag: dashed `ink`, `bg-surface`.
- Below: file list — 40px row each, leading file icon, name, size, trailing × remove.

### 5.23 Bulk Actions Bar

- Appears above table when rows are selected.
- Sticky, `bg-surface`, `radius-md`, `p-2`, 1px `hairline`.
- Layout: `[N selected]  [Edit | Copy | Export]  | spacer | Delete`.
- Non-destructive actions grouped into a segmented set; **Delete** is isolated by a 1px divider and uses Danger styling.
- Trailing × dismisses (clears selection).

### 5.24 Workflow Timeline

- Vertical, dotted connector lines (`border-left: 1.5px dotted hairline-strong`).
- Status dot: 18px circle, left-aligned.
  - Complete: `bg-ink`, white inset check.
  - Active: `bg-info`, white pulse ring (1.5s pulse).
  - Pending: `bg-canvas`, 1.5px `hairline-strong`.
- Item header: 14px title + small badge (status pill) + caption (date / id).
- Item body: 13px `ink-2`, optional inline link button.
- Collapsible: trigger is the entire row.

### 5.25 Saved Filters

- Compact dropdown trigger button, 32px.
- Leading 14px filter icon, label = active preset, trailing chevron.
- Menu items: preset name + checkmark for active.
- Footer: `Save Current...` link in `info`.

### 5.26 Import Preview

- Top: 4-stat row — Total / Valid / Warnings / Errors. Each tile uses semantic color for value.
- Middle: full table preview, status column with pill badges per row.
- Bottom: primary CTA "Import N Products", disabled if errors > 0.

### 5.27 Sparklines

- Inline SVG, 80×24.
- Smooth line, 1.5px stroke, filled area underneath at 8% opacity.
- Color: `ink` for default, semantic for trending metrics.
- Sits inline with metric value + delta.

### 5.28 Auto-Save Status

- Status dot 8px + label 12px, paired with page title.
- Saved: `success` dot + "Saved".
- Saving: `warning` arrow icon (rotating) + "Saving...".
- Error: `error` dot + "Save failed" (clickable to retry).

### 5.29 Avatar

Single-user visual primitive. Renders an image, initials fallback, or icon fallback inside a circle.

- **Sizes:** `xs` 20px / `sm` 24px / `md` 32px (default) / `lg` 40px / `xl` 56px.
- **Background (initials fallback):** deterministic gradient derived from name hash. Default palette uses muted ink gradient `linear-gradient(135deg, #3d3d3d, #1a1a1a)` for monochrome systems; optional `tone` prop unlocks Polaris-style soft palettes (`new-bg`, `attention-bg`, etc.) when more variety is needed.
- **Initials:** up to 2 chars, uppercase, 12px (sm) / 13px (md) / 16px (lg) / 20px (xl), `font-weight: 600`, white text.
- **Image:** `object-fit: cover`, falls back to initials if `onError`.
- **Status indicator (optional):** 8px dot bottom-right, `tone` colored, 1.5px `canvas` ring.
- **A11y:** wraps in `<span role="img" aria-label={name}>`. Initials are `aria-hidden`.

```tsx
<Avatar name="John Doe" size="md" />
<Avatar src="/avatars/jd.jpg" name="John Doe" size="lg" status="success" />
<Avatar size="sm" /> {/* falls back to anonymous icon */}
```

### 5.29a Avatar Group

Overlapping avatars with a `+N` overflow counter.

- Default overlap: `-space-x-2` (8px). Overlap scales with avatar size: `xs` 4px / `sm` 6px / `md` 8px / `lg` 10px / `xl` 12px.
- Each avatar has a 1.5px–2px `canvas` ring so the overlap reads as a stack.
- `max` prop: limits visible avatars; the rest collapse into a `+N` counter rendered with `tone="readonly"`.
- `renderOverflow` prop: override the +N rendering (e.g. to make it interactive).
- **Hover affordance:** each avatar (and the +N counter) lifts with `translateY(-2px)` over `dur-base` `ease-emphasis`, and rises above neighbors via `z-10`. Polaris/Slack style, makes the group feel interactive without changing the layout grid.
- Children render in flex-row-reverse so the first child sits visually on top — preserves z-stacking without manual `z-index` math.

### 5.30 Sidebar Navigation

See §4.1 for shell. Item anatomy:

```
[icon 18]  Label                  [optional badge]
└── 32px row, 8px h-padding, radius-sm
```

Section label: 11px uppercase, `ink-3`, `tracking-wider`, `mt-4 mb-1 px-2`.

Active item: `bg-surface`, `text-ink`, optional 2px left `ink` accent.

### 5.31 Command Palette (⌘+K)

- Centered modal, 640px wide, top-offset 120px.
- `bg-canvas`, `radius-lg`, `elev-4`.
- Top: search input, 56px, borderless, leading 18px search icon, trailing keycap `esc`.
- Body: grouped results — `Recent`, `Pages`, `Actions`, `Settings`. Group label 11px uppercase.
- Result row: 48px, leading 18px icon + name + 12px `ink-3` description + trailing keycap `↵`.
- Hover/active: `bg-surface`.
- Footer bar: `bg-surface`, 32px, hint keycaps `↑↓ navigate`, `↵ select`, `esc close`, `⌘+↵ secondary action`.

### 5.32 Keyboard Cheatsheet (`?`)

- Centered modal, 720px wide.
- Sections: Global, Table, Modal & Drawer, Form.
- Each row: action label (left), context (`ink-3`, middle), keycaps (right).
- Footer: hint "Press `?` anytime to open this guide. Global shortcuts disabled while typing."

### 5.33 Keyboard Shortcuts (Keycaps)

`.keycap`:
- 22px height, 13px label, `radius-xs`.
- `bg-canvas`, **inset shadow**: `inset 0 -1px 0 hairline-strong, inset 0 0 0 1px hairline`.
- Mono font, `text-ink`.
- Combine with `.kbd-plus` (a thin `+` separator, `ink-4`, 12px, `mx-1`).
- Sizes: sm 18px, md 22px, lg 28px.
- Platform aware: render `⌘` on macOS, `Ctrl` elsewhere.

#### Hotkey reference

| Shortcut | Action | Context |
|---|---|---|
| ⌘+K | Open Command Palette | Global |
| / | Quick Search | Global |
| ? | Open Keyboard Cheatsheet | Global |
| T | Toggle Theme | Global |
| B | Toggle Sidebar | Global |
| D | Toggle Density | Global |
| ⌘+Shift+P | New (primary action) | Global |
| ⌘+S | Save | Global |
| Esc | Close / Cancel | Global |
| ↑↓ | Navigate Rows | Table |
| Space | Toggle Selection | Table |
| Enter | Open Detail / Edit | Table |
| ⌘+A | Select All Visible | Table |
| Enter | Confirm / Submit | Modal |
| Tab / Shift+Tab | Next / Prev Field | Form |
| ⌘+Enter | Submit Form | Form |

#### Collision strategy
1. **Global shortcuts disabled while typing.** Inside `input`, `textarea`, `[contenteditable]`, single-key shortcuts (`T`, `B`, `/`) do not fire. Modifier-based (`⌘+K`, `⌘+S`) still work.
2. **Table shortcuts are scope-gated.** `↑↓`, `Space`, `Enter` only trigger when a table row or container has focus.
3. **`Esc` is universal.** Closes the top-most overlay (cheatsheet → command palette → drawer → modal). If nothing open, clears selection or blurs active field.
4. **Always `preventDefault()`** on mapped shortcuts to override browser defaults.

---

## 6. Patterns

### 6.1 Page header with view switcher

Now built using `<PageShell>` (§4.4):

```tsx
<PageShell
  title="Dashboard"
  metadata={
    <ButtonGroup>
      <SegmentedControl items={['Day', 'Week', 'Month']} />
    </ButtonGroup>
  }
  primaryAction={<Button variant="primary">+ New Order</Button>}
/>
```

### 6.2 Filter toolbar (above tables)

```
[🔍 Search…]  [Status ▼]  [Date ▼]  [Saved Filters ▼]                [Export] [+ New]
```

- Each filter is a 32px ghost-button that opens a dropdown.
- Active filter: chip-style with × to clear.

### 6.3 Detail drawer pattern

When clicking a table row's primary cell, slide a drawer in from the right with the full record + edit form. Saves return user to the list with an optimistic update + auto-save status.

### 6.4 Two-column form

- Left: 240px label column, 14px `ink-2`, top-aligned.
- Right: input column, max-w 480px.
- 24px row gap, 1px `hairline` between rows.

---

## 7. Accessibility

- **Contrast:** WCAG AA enforced for every text/background pair. Run audits in CI.
- **Focus:** Every interactive element has a visible focus ring (2px outline, 2px offset, `var(--ink)` by default; tone-colored ring for tone-aware components like `<Button tone="critical">`). Never rely on color alone.
- **Reduced motion:** `prefers-reduced-motion: reduce` collapses **every** transition to 80ms opacity. No transforms, no shimmer, no pulse, no slide, no scale. The clear ✕ in Search Field becomes hidden instead of animated. Skeleton becomes a static block. Spinners stop animating and render as a 50% dotted ring.
- **ARIA:** Use shadcn primitives (Radix) for dialogs, popovers, tabs, accordion, dropdown — these provide correct roles, labels, and focus management out of the box.
- **Screen readers:** Icon-only buttons require `aria-label`. Decorative icons get `aria-hidden`.
- **Keyboard:** Every action reachable without a mouse. Visible focus order matches DOM order.
- **Live regions:** Toasts use `role="status"` (info/success/warning) and `role="alert"` (error). Banner uses the same convention.
- **Print styles:** Strip colors, shadows, sidebar, topbar; render tables with full borders and pure black text. `@media print` hides all chrome.
- **Hover-only states:** Gate non-essential hover styles with `@media (hover: hover)` so touch users don't see stuck hover states.

---

## 8. shadcn / Tailwind Implementation

### 8.1 Mapping shadcn → this system

| shadcn primitive | Adjustments |
|---|---|
| `Button` | `variant` (primary/secondary/tertiary/plain) + `tone` (default/critical/success/warning/info); loading state with `<Spinner>`; sizes micro / sm / md / lg |
| `ButtonGroup` | New. `layout` prop: `spaced` (default) or `segmented` |
| `Input` | **Bordered** by default: `bg-canvas`, 1px `hairline-strong`, focus `ink`. Floating Label is a separate variant |
| `Select` | Use Radix Select; chevron icon swapped for hugeicons 14px |
| `Checkbox` | `tone` prop: default (ink), success, warning, critical, info; supports `indeterminate` |
| `Switch` | (renamed from Toggle.) Track 32×18, knob 14, ink/surface palette |
| `ChoiceList` | New. Composes `Checkbox` (multi) or `RadioGroup` (single) under a shared label |
| `SearchField` | New. Composed from `Input` + leading icon + clear control + debounce |
| `MoneyField` | New. Composed from `Input` + currency prefix + auto-format on blur |
| `Dialog` | radius-lg, elev-4, scale-in 250ms |
| `Sheet` | Right side default, 480px (= our Drawer) |
| `Tabs` | Underline indicator with sliding animation |
| `Tooltip` | ink bg, 12px, 6px arrow, supports keycap children |
| `Popover` | Generic primitive: bg-canvas, radius-md, elev-3. Powers Tooltip / DropdownMenu / SavedFilters / DatePicker |
| `Command` | Composes Command Palette §5.31 |
| `Toast` (Sonner) | Top-right stack; top-center variant for transactional |
| `Banner` | New. 4 tones (info / success / warning / critical), persistent, dismissable |
| `Spinner` | New. Standalone, 4 sizes, used inside Button loading state |
| `Accordion` | Borderless, only inner hairline dividers |
| `Calendar` | Use `react-day-picker`, restyle per §5.21 |
| `DropdownMenu` | Group labels, divider, danger zone group |
| `Pagination` | Ghost buttons, tinted active |
| `Breadcrumb` | Chevron separator, ink-4 |
| `Badge` | 8 tones (default/success/warning/critical/info/attention/new/read-only); rounded rectangle with leading dot |
| `Chip` | New (split from Tag Input). Static + `ClickableChip` variant |
| `Avatar` | Single primitive (sizes xs–xl, image / initials / icon fallback) |
| `AvatarGroup` | -8px overlap, +N counter |
| `PageShell` | New. Title + subtitle + breadcrumb + actions + tabs + banner slots, sticky-on-scroll |

### 8.2 CSS custom properties

```css
:root {
  --canvas: #ffffff;
  --surface: #f6f5f4;
  --surface-2: #efeeec;
  --hairline: #e5e3df;
  --hairline-strong: #c8c4be;
  --ink: #1a1a1a;
  --ink-2: #3d3d3d;
  --ink-3: #6b6b6b;
  --ink-4: #9a9a9a;

  /* Semantic — original tints (used for inputs validation, sparklines, focus rings) */
  --success: #1aae39; --success-tint: #e9f7ec;
  --warning: #dd5b00; --warning-tint: #fdeee2;
  --error:   #e03131; --error-tint:   #fbe6e6;
  --info:    #2563eb; --info-tint:    #e6efff;

  /* Tone palette — for Badges & Banners (Polaris-aligned, AA contrast) */
  --tone-success-bg:    #cdfee1; --tone-success-fg:    #0c5132;
  --tone-warning-bg:    #ffeacc; --tone-warning-fg:    #5b3300;
  --tone-critical-bg:   #fee9e7; --tone-critical-fg:   #8e1f0b;
  --tone-info-bg:       #d2efff; --tone-info-fg:       #00527c;
  --tone-attention-bg:  #fff1d6; --tone-attention-fg:  #5b3300;
  --tone-new-bg:        #e3e0f8; --tone-new-fg:        #38298b;
  --tone-default-bg:    var(--surface-2); --tone-default-fg: var(--ink-2);
  --tone-readonly-bg:   var(--surface-2); --tone-readonly-fg: var(--ink-3);

  --radius-xs: 4px; --radius-sm: 6px; --radius-md: 8px; --radius-lg: 12px;
  --elev-1: 0 1px 2px rgba(0,0,0,.04);
  --elev-2: 0 2px 8px rgba(0,0,0,.06);
  --elev-3: 0 8px 24px rgba(0,0,0,.08);
  --elev-4: 0 16px 48px rgba(0,0,0,.12);
}
```

### 8.3 Recommended packages

- `tailwindcss` v4 + `@tailwindcss/vite`
- `tw-animate-css` — provides `animate-in`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*` utilities (Tailwind v4 successor to the v3 `tailwindcss-animate` plugin)
- `@hugeicons/react` + `@hugeicons/core-free-icons` (icons, locked to Stroke Rounded variant, `strokeWidth={1.75}`)
- `@radix-ui/*` via shadcn
- `cmdk` (command palette)
- `sonner` (toasts)
- `react-day-picker` (date picker)
- `framer-motion` (segmented pill drag, drawer)

### 8.4 Tailwind v4 setup notes

Three things bit us during initial setup; document them so they don't bite again.

1. **Tailwind v4 only scans descendants of the CSS file's directory by default.** In a monorepo, the playground's CSS lives in `apps/playground/src/styles/` and the library lives in `packages/ui/src/`. The library is reached via a pnpm workspace symlink that resolves into `node_modules`, which Tailwind ignores.  
   **Fix:** explicitly `@source "../../../../packages/ui/src";` in the playground's globals.css.

2. **`@theme inline` must declare every utility namespace you use.** Defining `--radius-pill: 999px` in `:root` alone is not enough — Tailwind v4 generates `rounded-{name}` only from `--radius-*` keys present inside `@theme`. Same applies to colors, fonts, shadows, and spacing.

3. **`animate-in` and friends require `tw-animate-css`.** Radix uses `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95` patterns extensively. Without `@import "tw-animate-css";` those classes are silently ignored and overlays snap in/out with no transition.

---

## 9. Component Inventory (50 total)

| # | Component | Section |
|---|---|---|
| 1 | Buttons (variant + tone) | 5.1 |
| 2 | Button Group (spaced + segmented) | 5.1a |
| 3 | Segmented Control (sliding pill) | 5.2 |
| 4 | Tables | 5.3 |
| 5 | Sticky Table Columns | 5.3 |
| 6 | Inline Edit | 5.3 |
| 7 | Text Input (bordered) | 5.4 |
| 8 | Floating Label Input | 5.4 |
| 9 | Select | 5.4 |
| 10 | Checkbox | 5.4 |
| 11 | Switch (renamed from Toggle) | 5.4 |
| 12 | Choice List | 5.4 |
| 13 | Search Field | 5.4 |
| 14 | Money Field | 5.4 |
| 15 | Number Field (bare) | 5.4 |
| 16 | Textarea | 5.4 |
| 17 | Form Validation | 5.4 |
| 18 | Help Text | 5.4 |
| 19 | Required Field | 5.4 |
| 20 | Tabs | 5.5 |
| 21 | Tooltip | 5.6 |
| 22 | Popover (generic primitive) | 5.6a |
| 23 | Badge (8 tones) | 5.7 |
| 24 | Banner | 5.7a |
| 25 | Spinner | 5.7b |
| 26 | Modal | 5.8 |
| 27 | Drawer | 5.9 |
| 28 | Toast (top-center) | 5.10 |
| 29 | Toast Stack (top-right) | 5.10 |
| 30 | Undo Toast | 5.10 |
| 31 | Empty State | 5.11 |
| 32 | Skeleton Loading | 5.12 |
| 33 | Pagination | 5.13 |
| 34 | Breadcrumbs | 5.14 |
| 35 | Dropdown Menu | 5.15 |
| 36 | Stepper / Wizard | 5.16 |
| 37 | Progress (segmented + circular) | 5.17 |
| 38 | Accordion | 5.18 |
| 39 | Chip (static + clickable) | 5.19 |
| 40 | Chip Input (Tag input) | 5.19a |
| 41 | Number Stepper | 5.20 |
| 42 | Date Picker (single + range) | 5.21 |
| 43 | File Upload | 5.22 |
| 44 | Bulk Actions Bar | 5.23 |
| 45 | Workflow Timeline | 5.24 |
| 46 | Saved Filters | 5.25 |

Plus utilities & shell: Import Preview (5.26), Sparklines (5.27), Auto-Save Status (5.28), Avatar (5.29), Avatar Group (5.29a), Sidebar Nav (5.30), Command Palette (5.31), Keyboard Cheatsheet (5.32), Keycaps (5.33), Page Shell (4.4).

---

## 10. Versioning & Governance

- **Version:** 1.0.0 (renamed from `@erp-ds/ui` v3.23 — see top-of-file changelog)
- **Status:** Production-ready, shadcn-compatible, Tailwind v4. **53 of 53 components stable.** Package: **`@cyanideui/ui`**.
- **Changelog convention:** SemVer. Breaking changes (renamed tokens, removed components) bump major.
- **Component status badges:** `Stable` / `Beta` / `Deprecated` shown in component docs.
- **Density modes:** Three levels — `Compact+`, `Compact` (default), `Comfortable` — cycled via `D` key. Heights, gaps, paddings, and type all scale; radii stay fixed. Public API: `<DensityRoot>` + `<DensityProvider>` + `useDensity()` + `useDensityHotkey()`. See §2.7 + showcase at `/foundations/density`.
- **Quality gate:** every new component must pass §1b Component Readiness Checklist before being marked `stable`.

### Component changelog (WorkflowTimeline density)

**Changed**
- `<WorkflowTimeline>` is now **density-aware**. The per-event vertical rhythm (`--density-timeline-pb`) and the dot-to-content gap (`--density-timeline-gap`) scale with the active density mode; the status-dot size stays fixed so the visual identity is constant. The original fixed spacing (24px / 12px) is preserved as the **comfortable** value; `compact` (default, 16/10px) and `compact-plus` (12/8px) tighten it. `block-audit-log` inherits this automatically (it's built on the timeline). New tokens added to all density scopes in `tokens.css`. Playground: added a side-by-side density-modes section on the timeline page.

### Registry changelog (Tier 5 — high-value blocks)

**Added — 6 blocks (copy-paste, `@/components/ui/*`):**
- `block-auth-card` — centered sign-in card: brand, SSO buttons, email/password form, remember-me + forgot-password, footer link.
- `block-toolbar` — compact action bar (title + count + action cluster + overflow menu); lighter than PageHeader.
- `block-notification-feed` — scrollable notifications grouped by recency, unread dots, mark-all-read.
- `block-form-section` — validated form scaffold with a `<Field>` helper (label + control + inline error) and submit/cancel footer with busy state.
- `block-pricing-cards` — tiered plan cards with feature checklists + CTA; one plan `featured`.
- `block-command-menu-trigger` — ⌘K trigger button + palette wiring for apps that don't use the full DocShell.

**Notes**
- Registry index now has **84 items** (was 78). Each ships a playground showcase page under `/blocks/*`, listed in the Blocks nav section + overview grid.
- Verified end-to-end: cold-start install (Next) of all 6 resolves the full transitive dep graph, transforms cleanly, and the generated output typechecks (exit 0). Playground builds.

### Fixes changelog (date picker + playground nav)

**Fixed**
- **Inline edit shifted its table column on edit.** Two causes: (1) the `<input>` carried the default `size=20` → ~20ch intrinsic width that widened flex/grid cells; fixed with `size={1}` + `min-w-0` + an inset focus ring (was `ring-1`, which paints outside the box). (2) In a `table-layout: auto` table, column widths are computed from cell content, so swapping text↔input re-measured the column. Added a **`fixed` prop to `<Table>`** (`table-layout: fixed`) — the spreadsheet pattern — and updated the inline-edit demo + docstring to use `<Table fixed>` with explicit column widths. Editing now changes only the border/bg, never the layout.
- **Detail card polish.** Switched from `justify-between` + `max-w-[60%] flex-1` to a fixed two-column grid (`140px | 1fr`) so the value column is stable; left-aligned values (right-aligned inline inputs read awkwardly); uniform row heights; added a `readOnly` field flag (demoed on "Customer since").
- **Date picker rendered as oversized blue circles.** `react-day-picker/style.css` was `@import`ed **unlayered**, so its defaults (`--rdp-accent-color: blue`, `100%` day radius, `42px` cells, `2px` selected border) beat all our `.ds-datepicker` overrides in `@layer components` (unlayered wins over every layer — the §1c gotcha). Fixed by importing it into `@layer base` via `@import "react-day-picker/style.css" layer(base)`. Days now use `--radius-sm` (squared), ink accent, 28/30px sizing.
- **Date range flow was unpredictable.** First attempt added a custom `onDayClick` that raced rdp's internal range selection. Replaced with rdp's built-in **`resetOnSelect`** (confirmed against its `useRange` source): 1st click sets `from`, 2nd sets `to` (auto-ordered), 3rd resets to a fresh `from`. `<DateField>` closes on the completed span.
- **"Today" looked like a selectable border.** Replaced the inset ring on today's cell with a small dot under the number.
- **Playground sidebar lit up two items at once.** `nav-link-item.tsx` matched routes with `end: false` (prefix), so `/blocks` stayed active on every `/blocks/*` child. Defaulted to exact matching (`end ?? true`), with an `end={false}` escape hatch.

**Also**
- Tightened the calendar: day cells 32→30px, months-gap 1.5→1rem, nav-height 36→34px.

### Registry changelog (Tier 4 — blocks + minimal shell)

**Added — `blocks` category (8 items, copy-paste, `@/components/ui/*` imports):**
- `block-stat-cards` — KPI tile row (value + trend + sparkline).
- `block-data-table` — full table experience: search + saved views + selection + bulk-actions bar + empty state + pagination.
- `block-page-header` — breadcrumbs + eyebrow + title/subtitle + actions + optional tab row (prop-driven).
- `block-empty-state` — full-section zero-data layout (dashed card around the EmptyState primitive).
- `block-settings-section` — labeled form section + FieldRow + RowToggle.
- `block-audit-log` — activity feed on the WorkflowTimeline primitive.
- `block-filter-bar` — horizontal filter row: search + saved views + chip filter + date-range.
- `block-detail-card` — key/value panel with header actions + inline-editable rows.

**Added — shells:**
- `shell-minimal` — sticky topbar (brand + horizontal nav + theme toggle) over a centered content container. No sidebar. Includes density + theme + toasts. The simpler sibling of `shell-doc`.

**Notes**
- Blocks live in `registry/blocks/<name>/{meta.json, files/*}` and install to `src/components/blocks/`. They're authored directly with `@/` aliases (pure copy-paste) and carry framework markers (`@atrium:if next`) for the `"use client"` directive where stateful.
- Registry index now has **78 items** (was 69). CLI prefix-resolution already supported `block-` (so `add data-table` → `block-data-table`).
- Verified end-to-end: cold-start install (Next + Vite) of `block-data-table` and `shell-minimal` resolves the full transitive dep graph, transforms cleanly (no marker/cross-framework leakage), and the generated output typechecks.
- **Playground showcase:** added a `Blocks` nav section + live demo pages for all 8 blocks (`/blocks` overview + one page each), each with a working interactive preview and the `npx cyanideui add <block>` install command. The command palette picks them up automatically (it derives pages from `nav.ts`).

### Infra changelog (distribution — publishing, CLI, registry, CI)

**Published**
- `cyanideui` (CLI, unscoped) → **public npmjs.com**. Live versions: `0.1.0`, `0.1.1` (no-op bump), `0.1.2`. Consumption is fully tokenless: `npx cyanideui add <item>` like `npx shadcn`.
- `@cyanideui/ui` (library, scoped) → GitHub Packages, `1.0.0`.

**Changed**
- CLI `--version` is now injected at build time from `package.json` via a tsup `define` (`__CLI_VERSION__`) — previously hardcoded `0.1.0`, so it drifted. Can't drift again.
- Registry is served **live** from the public raw-GitHub URL (`raw.githubusercontent.com/cyanideui/atrium/main/registry`); the npm-bundled `dist/registry/**` is now just an offline fallback. Component-only edits ship via `git push` — no CLI republish needed.
- Registry is full copy-paste (Path 2): 69 items (59 components, 4 templates, 1 shell, 3 hooks, 2 lib), all using `@/lib/utils` + `@/components/ui/*`, zero `@cyanideui/ui` imports. Prefix-fallback name resolution (`add button` → `component-button`).
- `.github/workflows/release.yml`: publishes both packages on a version-tag push; each publish step is **skip-if-exists** (npm versions are immutable); added `workflow_dispatch`. CLI publish authenticates via the `NPM_TOKEN` repo secret (granular write token, bypasses 2FA). Verified end-to-end with a real `v0.1.1`/`v0.1.2` release run.
- CI + Release workflows bumped to `actions/checkout@v6`, `actions/setup-node@v6`, `pnpm/action-setup@v6` (Node 24; clears the Node-20 deprecation warning). CI builds the registry index via `node scripts/build-registry-index.mjs` directly.

### v3.14 changelog (Doc Shell — Notion-style app layout)

**Added**
- `<DocShell>` + `<DocSidebar>` family + `<DocContent>` family — the full app shell. See §4.5 below.

**Changed**
- `<SidebarNav>`: dropped the 2px active rail in favor of `bg-surface-2` fill + bold text (matches Notion's active-row treatment which is what consumers expect alongside DocShell).
- `<SidebarNavSection>`: added `action` prop for hover-revealed section actions.
- `<SidebarNavItem>`: added `trailing` prop for hover-revealed item actions, and `indent` prop used by SidebarNavParent's children.
- New `<SidebarNavParent>`: collapsible group with chevron + child indent rail.

### v3.13 changelog (Rounds 3+4 — data display, navigation, shell)

**Added (round 3 — tables & data display)**
- InlineEdit, StickyTable + StickyColumn, BulkActionsBar, SavedFilters, Sparkline.

**Added (round 4 — navigation & shell)**
- Stepper, PageShell (promoted from pattern), SidebarNav + Section + Item, AutoSaveStatus.

**Sidebar progress in playground:** 43 done / 3 todo.

### v3.12 changelog (Rounds 1+2 — primitives, feedback, forms; radius unification)

**Added (round 1)**
- Avatar, AvatarGroup, Skeleton family (Text/Avatar/Button/Table/List/Card), EmptyState, Keycap + KeycapGroup, Progress + Segmented + Circle, Pagination, Breadcrumbs, Tabs, Tooltip + composable primitives, Popover, Accordion, Drawer.

**Added (round 2)**
- Select, Textarea, ChoiceList, NumberStepper, FloatingLabelInput, Chip + ClickableChip, ChipInput, FileUpload.

**Changed**
- All form controls unified to **8px radius** (`radius-md`) — Input, Textarea, Select, SearchField, MoneyField, NumberStepper, ChipInput, FloatingLabelInput.
- Modal animation duration: 35ms open + close (was 65ms).
- Dropdown Menu: slide from trigger edge, shortcuts on row's right edge, `cursor-pointer` on items.
- Button press feedback: `:active` snaps in (0ms), release smoothly returns; translate increased to 1px.
- Checkbox indicator: scale 50% → 100% with `forceMount` instead of snap-in.
- Search Field: native `::-webkit-search-cancel-button` suppressed.
- AvatarGroup: hover lift on each avatar.
- Number Stepper: 60%-tall inset dividers via pseudo-elements (no more full-height `border-l/r`).
- Table: rounded inner corners on first/last cells.
- Keycap: 8px radius.

**Sidebar progress in playground:** 34 done / 12 todo.

### v3.11 changelog (Cursors + quality guardrails)

**Changed**
- Global `cursor: pointer` rule in `globals.css` for all interactive roles. Disabled controls get `cursor: not-allowed`. Inputs / textareas keep the I-beam.
- `<DropdownMenuItem>` cursor switched from `default` to `pointer`.

**Added**
- §1b **Component Readiness Checklist** — hard gate before any component is marked `stable`.
- §1c **Known Gotchas catalog** — Tailwind v4 / Radix / TypeScript / visual / build pitfalls we've already hit, kept here so they don't recur.

### v3.10 changelog (Polaris button visuals & motion polish)

**Changed**
- `<Button>` rewritten to Polaris-style chrome: vertical gradient, top inset highlight, bottom inset shadow, **8px radius**, **600 font-weight**, full pressed state with `translateY(0.5px)` and inverted highlight.
- `<SearchField>` suppresses the native browser ✕; renders a single fade+scale clear button.
- `<Checkbox>` indicator scales 50% → 100% with `ease-emphasis` instead of snapping in.
- `<Banner>` mounts with fade + 4px slide-in-from-top.
- Hover transitions on dropdown items, table rows, sidebar links shortened from `dur-base` (150ms) to `dur-fast` (80ms) — felt sluggish on dense lists.

**Added**
- §1a Visual Direction & Reference Library — explicit Notion / Polaris / Linear / shadcn fallback matrix for components not yet in the system.
- §2.7 expanded into a **standard interaction matrix** covering hover / focus / press / mount / unmount / disabled for every interactive element.
- §8.4 Tailwind v4 setup notes — workspace `@source` requirement, `@theme inline` namespace gotcha, `tw-animate-css` requirement for Radix animations.

**Skipped (after evaluation)**
- Thumbnail — handled by Avatar primitive or inline `<img>`.

### v3.9 changelog (Shopify Polaris alignment)

**Added**
- `<ButtonGroup>` (§5.1a) — spaced + segmented layouts.
- `<Banner>` (§5.7a) — inline persistent alert with 4 tones.
- `<Spinner>` (§5.7b) — standalone loader, 4 sizes.
- `<Popover>` (§5.6a) — generic anchored overlay primitive.
- `<ChoiceList>` (§5.4) — radio/checkbox group.
- `<SearchField>` (§5.4) — promoted from pattern to component.
- `<MoneyField>` (§5.4) — currency-formatted input.
- `<NumberField>` (§5.4) — bare numeric input alongside Number Stepper.
- `<Avatar>` (§5.29) — single-user primitive separate from Avatar Group.
- `<Chip>` & `<ClickableChip>` (§5.19) — split out from Tag Input.
- `<PageShell>` (§4.4) — promoted from pattern to component.
- Badge tones `attention` and `new`.

**Changed**
- `<Button>` API: `variant` (shape) + `tone` (intent). Old `danger / success / warning / ghost` variants migrated.
- `<Switch>` renamed from `<Toggle>` (alias kept for one minor version).
- `<Input>` style: bordered (was borderless). Borderless reserved for Inline Edit cells (§5.3).
- `<Badge>` redesigned: rounded rectangle, leading dot, sentence case (was uppercase pill).
- `<Tag/Chip Input>` now built on top of new `<Chip>` primitive; renamed to `<ChipInput>`.

**Skipped (after evaluation)**
- Thumbnail — handled by Avatar primitive or inline `<img>`.

---

*Inspired by Notion (calm surfaces), Shopify Polaris (button chrome & compact tables), Linear (precision motion). Built for ERP density without the ERP ugliness.*
