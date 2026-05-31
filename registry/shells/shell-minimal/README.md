# shell-minimal

A lightweight app shell — a sticky topbar over a centered content area, no sidebar. The simpler sibling of `shell-doc`.

## What you get

- **Topbar** — brand, horizontal nav (from `nav.ts`, active route highlighted), theme toggle.
- **Content area** — centered, max-width container with comfortable padding.
- **Theme** — light/dark with a `T` hotkey, persisted to localStorage.
- **Density** — `D` hotkey cycles density modes.
- **Toasts** — top-center toast singleton.

## Files

| File | What it is |
|---|---|
| `src/lib/nav.ts` | **Edit this** — your routes |
| `src/components/app-shell.tsx` | The topbar + content layout. **Edit the brand here** (the `<Brand>` component). |
| `src/components/shell-providers.tsx` | Mount once at your root. Owns DensityRoot + Toaster + the theme hotkey. |

Plus the `use-theme` hook (pulled in automatically).

## Wiring it up

**Next.js** (`src/app/layout.tsx`):
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

**Vite** (`src/App.tsx`):
```tsx
import { ShellProviders } from "./components/shell-providers"
import { Routes, Route } from "react-router-dom"

export function App() {
  return (
    <ShellProviders>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* … */}
      </Routes>
    </ShellProviders>
  )
}
```

## When to use which shell

- **shell-minimal** — topbar only. Fewer routes, simpler apps, no deep nav hierarchy.
- **shell-doc** — full sidebar + command palette + cheatsheet. Dense ERP-style apps with many sections.
