import pc from "picocolors"
import prompts from "prompts"
import { frameworkLabel } from "../lib/framework.js"
import { addCommand } from "./add.js"
import type { Framework } from "../types.js"

export interface InitOptions {
  cwd: string
}

/**
 * Bootstrap helper. Rather than re-implement create-next-app / create-vite,
 * `init` walks the user through the canonical setup and then runs
 * `atrium add shell-doc` against the chosen framework.
 *
 * It assumes the user has already (or will) scaffold the base app with the
 * framework's official tool — we print those commands. Then we layer the
 * shell on top. This keeps us out of the business of maintaining scaffolders.
 */
export async function initCommand(opts: InitOptions): Promise<void> {
  console.log(pc.bold("\nAtrium — new app setup\n"))

  const { framework } = await prompts({
    type: "select",
    name: "framework",
    message: "Framework",
    choices: [
      { title: frameworkLabel("next"), value: "next" },
      { title: frameworkLabel("vite-react-router"), value: "vite-react-router" },
    ],
    initial: 0,
  })

  if (!framework) {
    console.log(pc.dim("Aborted."))
    return
  }

  const fw = framework as Framework

  console.log(pc.bold("\n1. Scaffold the base app (if you haven't):\n"))
  if (fw === "next") {
    console.log(pc.dim("    pnpm create next-app@latest my-app --ts --app --tailwind"))
  } else {
    console.log(pc.dim("    pnpm create vite@latest my-app -- --template react-ts"))
    console.log(pc.dim("    pnpm add react-router-dom"))
  }

  console.log(pc.bold("\n2. Add @atrium/ui + Tailwind wiring:\n"))
  console.log(pc.dim("    pnpm add @atrium/ui @hugeicons/core-free-icons @hugeicons/react"))
  console.log(pc.dim('    # In your Tailwind entry CSS:'))
  console.log(pc.dim('    @import "@atrium/ui/styles/globals.css";'))
  console.log(pc.dim('    @source "../node_modules/@atrium/ui/dist";'))

  const { addShell } = await prompts({
    type: "confirm",
    name: "addShell",
    message: "Add the doc-shell starter to the current directory now?",
    initial: true,
  })

  if (addShell) {
    console.log(pc.bold("\n3. Adding shell-doc…\n"))
    await addCommand("shell-doc", { cwd: opts.cwd, framework: fw, yes: true })
  } else {
    console.log(pc.dim("\n  Run `atrium add shell-doc` when you're ready.\n"))
  }

  console.log(pc.bold("\nNext steps:"))
  console.log(pc.dim("    • Wire <ShellProviders>{children}</ShellProviders> into your root."))
  console.log(pc.dim("    • Edit src/lib/nav.ts to set your routes."))
  console.log(pc.dim("    • Edit the brand in src/components/app-shell.tsx."))
  console.log("")
}
