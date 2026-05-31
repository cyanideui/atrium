import { Command } from "commander"
import pc from "picocolors"
import { addCommand } from "./commands/add.js"
import { listCommand } from "./commands/list.js"
import { initCommand } from "./commands/init.js"
import type { Framework } from "./types.js"

const program = new Command()

program
  .name("atrium")
  .description("Scaffold Atrium-styled apps and copy starters from the registry.")
  .version("0.1.0")

program
  .command("init")
  .description("Bootstrap a new Atrium app (guides framework setup + adds the shell).")
  .action(async () => {
    try {
      await initCommand({ cwd: process.cwd() })
    } catch (err) {
      fail(err)
    }
  })

program
  .command("add")
  .argument("<item>", "registry item name, e.g. shell-doc")
  .description("Copy a registry item (and its deps) into the current project.")
  .option("--overwrite", "overwrite existing files without prompting")
  .option("--dry-run", "print what would happen, write nothing")
  .option("-y, --yes", "skip the apply confirmation prompt")
  .option("--framework <framework>", "force a framework: next | vite-react-router")
  .action(
    async (
      item: string,
      opts: { overwrite?: boolean; dryRun?: boolean; yes?: boolean; framework?: string },
    ) => {
      try {
        await addCommand(item, {
          cwd: process.cwd(),
          overwrite: opts.overwrite,
          dryRun: opts.dryRun,
          yes: opts.yes,
          framework: opts.framework as Framework | undefined,
        })
      } catch (err) {
        fail(err)
      }
    },
  )

program
  .command("list")
  .argument("[category]", "filter by category: shells | templates | blocks | hooks")
  .description("Browse available registry items.")
  .action(async (category?: string) => {
    try {
      await listCommand(category)
    } catch (err) {
      fail(err)
    }
  })

program.parseAsync()

function fail(err: unknown): never {
  const msg = err instanceof Error ? err.message : String(err)
  console.error(pc.red(`\nError: ${msg}\n`))
  process.exit(1)
}
