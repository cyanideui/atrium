# Starting a new app with Atrium

You want a new app that looks like the playground — sidebar on the left, content card on the right, sticky topbar, command palette, keyboard shortcuts. Here's how.

## The fast path (CLI)

```bash
# 1. Scaffold a base app with your framework's tool
pnpm create next-app@latest my-app --ts --app --tailwind
cd my-app

# 2. Add Atrium + icons
pnpm add @cyanideui/ui @hugeicons/core-free-icons @hugeicons/react

# 3. Wire Tailwind — in src/app/globals.css:
#      @import "@cyanideui/ui/styles/globals.css";
#      @source "../node_modules/@cyanideui/ui/dist";

# 4. Add the shell
pnpm dlx @cyanideui/cli add shell-doc

# 5. Wire it into your root layout (see below), then:
pnpm dev
```

You now have the playground's chrome, empty and waiting for your content.

## What `atrium add shell-doc` gives you

```
src/
├── lib/nav.ts                        ← EDIT: your routes
├── components/
│   ├── app-shell.tsx                 ← EDIT: your brand (logo + name)
│   ├── shell-providers.tsx           ← mount once at root
│   ├── command-palette.tsx
│   └── nav-link-item.tsx
└── hooks/
    ├── use-theme.ts
    ├── use-shortcut-toasts.tsx
    └── use-global-cheatsheet.tsx
```

All transformed for your framework (Next.js `next/link` vs Vite `react-router-dom`). All yours to edit.

## Wiring the shell into your root

**Next.js** — `src/app/layout.tsx`:
```tsx
import { ShellProviders } from "@/components/shell-providers"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShellProviders>{children}</ShellProviders>
      </body>
    </html>
  )
}
```

**Vite + React Router** — `src/App.tsx`:
```tsx
import { ShellProviders } from "./components/shell-providers"
import { Routes, Route } from "react-router-dom"

export function App() {
  return (
    <ShellProviders>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </ShellProviders>
  )
}
```

## Your three edits

1. **`src/lib/nav.ts`** — replace the sample routes with yours. The shell reads this for the sidebar, breadcrumbs, and command palette.
2. **Brand** in `src/components/app-shell.tsx` — change `logo="A"` and `name="Your App"`.
3. **Build your pages.** The shell handles all the chrome.

## The reference implementation

`apps/example-next/` in this repo is a complete worked example — a Next.js 15 app consuming `@cyanideui/ui` with three pages. Read it side-by-side with this guide if anything's unclear.

## Browsing what else is available

```bash
atrium list
```

The registry ships **inside** the `@cyanideui/cli` package, so it works offline and with a private source repo — no registry server, no auth beyond installing the package.

| Item | What it is |
|---|---|
| `shell-doc` | The full chrome (sidebar + topbar + palette + shortcuts) |
| `template-dashboard` | KPI tiles + sparklines + recent orders |
| `template-crud-list` | Search + filters + bulk actions + pagination |
| `template-settings` | Tabbed sectioned form with autosave |
| `template-detail` | Record detail + workflow timeline + drawer |
| `hook-theme` / `hook-shortcut-toasts` / `hook-cheatsheet` | The hooks the shell uses |

Each is copy-paste, framework-aware, and yours once added. Templates land at `src/pages/<name>.tsx` — move them to your framework's routing location (Next.js `app/<route>/page.tsx`, or a Vite `<Route>`).
