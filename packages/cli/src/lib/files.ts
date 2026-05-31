import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import prompts from "prompts"
import pc from "picocolors"

export type WriteDecision = "written" | "skipped" | "overwritten"

interface WriteOptions {
  /** Overwrite existing files without prompting. */
  overwrite?: boolean
  /** Print actions but write nothing. */
  dryRun?: boolean
}

/**
 * Write a file into the consumer's project, prompting on conflict.
 * Returns what happened so the caller can summarize + record.
 */
export async function writeFileSafe(
  cwd: string,
  relTo: string,
  contents: string,
  opts: WriteOptions = {},
): Promise<WriteDecision> {
  const target = join(cwd, relTo)
  const exists = existsSync(target)

  if (exists && !opts.overwrite) {
    if (opts.dryRun) {
      console.log(pc.yellow(`  would prompt (exists): ${relTo}`))
      return "skipped"
    }
    const { action } = await prompts({
      type: "select",
      name: "action",
      message: `${relTo} exists. Overwrite?`,
      choices: [
        { title: "Skip", value: "skip" },
        { title: "Overwrite", value: "overwrite" },
      ],
      initial: 0,
    })
    if (action !== "overwrite") {
      console.log(pc.dim(`  skipped: ${relTo}`))
      return "skipped"
    }
  }

  if (opts.dryRun) {
    console.log(pc.dim(`  would write: ${relTo}`))
    return exists ? "overwritten" : "written"
  }

  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, contents, "utf8")
  console.log(pc.green(`  ${exists ? "overwrote" : "wrote"}: ${relTo}`))
  return exists ? "overwritten" : "written"
}
