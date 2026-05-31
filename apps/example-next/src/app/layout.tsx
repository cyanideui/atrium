import type { Metadata } from "next"
import "./globals.css"

import { ShellProviders } from "../components/shell-providers"
import { AppShell } from "../components/app-shell"

export const metadata: Metadata = {
  title: "Atrium UI — Next.js example",
  description: "Reference Next.js 15 consumer for @cyanideui/ui",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ShellProviders>
          <AppShell>{children}</AppShell>
        </ShellProviders>
      </body>
    </html>
  )
}
