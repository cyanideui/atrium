import type { Framework } from "../types.js"

const ALL_FRAMEWORKS: Framework[] = ["next", "vite-react-router"]

/**
 * Framework block markers.
 *
 * Registry source files wrap framework-specific lines in:
 *
 *   // @atrium:if next
 *   import Link from "next/link"
 *   // @atrium:endif
 *
 * (or the JSX-comment form `{/* @atrium:if next *​/}` inside JSX).
 *
 * `applyTransform` keeps the block matching the target framework and
 * deletes every other framework's blocks — marker lines included. Lines
 * outside any block pass through untouched.
 *
 * This is intentionally simple and line-based: no regex sweeping of
 * arbitrary code, no token interpolation inside string literals. A block
 * either survives whole or is removed whole.
 */

const IF_RE = /^\s*(?:\/\/|\{\/\*)\s*@atrium:if\s+([a-z-]+)\s*(?:\*\/\})?\s*$/
const ENDIF_RE = /^\s*(?:\/\/|\{\/\*)\s*@atrium:endif\s*(?:\*\/\})?\s*$/

export function applyTransform(source: string, framework: Framework): string {
  if (!ALL_FRAMEWORKS.includes(framework)) {
    throw new Error(`Unknown framework: ${framework}`)
  }

  const lines = source.split("\n")
  const out: string[] = []

  // Stack of { keep } for nested blocks (we don't nest today, but be safe).
  let blockFramework: string | null = null
  let depth = 0

  for (const line of lines) {
    const ifMatch = line.match(IF_RE)
    if (ifMatch) {
      if (depth > 0) {
        throw new Error("Nested @atrium:if blocks are not supported")
      }
      blockFramework = ifMatch[1] ?? null
      depth = 1
      continue // drop the marker line
    }

    if (ENDIF_RE.test(line)) {
      if (depth === 0) {
        throw new Error("@atrium:endif without a matching @atrium:if")
      }
      blockFramework = null
      depth = 0
      continue // drop the marker line
    }

    if (depth > 0) {
      // Inside a block — keep only if it targets our framework.
      if (blockFramework === framework) out.push(line)
      continue
    }

    out.push(line)
  }

  if (depth !== 0) {
    throw new Error("Unclosed @atrium:if block")
  }

  // Collapse 3+ consecutive blank lines (left behind by stripped blocks)
  // down to a single blank line for tidiness.
  return out.join("\n").replace(/\n{3,}/g, "\n\n")
}

/** Quick check: does the source still contain any unresolved markers? */
export function hasUnresolvedMarkers(source: string): boolean {
  return /@atrium:(if|endif)/.test(source)
}
