# @cyanideui/ui

## 1.0.0 — Initial public release

First stable release under the **Atrium UI** name (renamed from `@erp-ds/ui`).

### Highlights
- **53 components** stable across actions, forms, feedback, overlays, navigation, app shell, data display, and power-user surfaces.
- **Density mode** — three levels (compact-plus / compact / comfortable) with `<DensityRoot>` + `<DensityProvider>` + `useDensity()` + `useDensityHotkey()` public API. Tokens scale on four axes: heights, gaps, paddings, and type. Radii stay fixed.
- **Polaris-style gradient chrome** propagated to `<Button variant="secondary">`, `<Switch>`, `<SegmentedControl>`, `<DocSidebarSearch>`, `<Checkbox>`, `<Radio>`, and the `.ds-trigger` class on `<SavedFilters>` / `<DateField>` / `<SelectTrigger>`.
- **`<ShortcutHint>` + `shortcutToast()`** for compact pill chips that confirm keyboard shortcuts. Five tones, optional keycap, Sonner integration.
- **Subpath entries** — `@cyanideui/ui/command-palette` (cmdk) and `@cyanideui/ui/date-picker` (react-day-picker) for bundle-size-conscious consumers.
- **Next.js / RSC ready** — postbuild script prepends `"use client"` to every emitted chunk, so the library drops into the App Router without per-page boilerplate.
- **Tailwind v4** styling. Both light and dark are first-class.
- **Tested** — Vitest + React Testing Library smoke tests for every critical component and hook.

### Breaking changes
- Package renamed from `@erp-ds/ui` to `@cyanideui/ui`. Update imports.
- localStorage keys `erp-ds.theme` / `erp-ds.density` → `atrium.theme` / `atrium.density`.
- Version reset from 3.x → 1.0.0 to mark the first stable release under the new name.

### Migration from `@erp-ds/ui`
1. Update `package.json`:
   ```diff
   - "@erp-ds/ui": "^3.x"
   + "@cyanideui/ui": "^1.0.0"
   ```
2. Find-replace `from "@erp-ds/ui"` → `from "@cyanideui/ui"`.
3. (Optional) Migrate localStorage keys if you persist theme/density:
   ```js
   const oldKeys = ["erp-ds.theme", "erp-ds.density"]
   const newKeys = ["atrium.theme", "atrium.density"]
   oldKeys.forEach((k, i) => {
     const v = localStorage.getItem(k)
     if (v) {
       localStorage.setItem(newKeys[i], v)
       localStorage.removeItem(k)
     }
   })
   ```
4. CSS class prefix stays `ds-*` — no internal selector renames needed.

For the full version history, see [`design.md`](../../design.md).
