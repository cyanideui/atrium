import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { mkdtempSync, writeFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { detectFramework } from "../lib/framework.js"

let dir: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "atrium-fw-"))
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function pkg(deps: Record<string, string>) {
  writeFileSync(join(dir, "package.json"), JSON.stringify({ dependencies: deps }))
}

describe("detectFramework", () => {
  it("detects Next.js from the next dependency", () => {
    pkg({ next: "15.0.0", react: "18.3.1" })
    expect(detectFramework(dir)).toBe("next")
  })

  it("detects Next.js from next.config.js even without the dep", () => {
    pkg({ react: "18.3.1" })
    writeFileSync(join(dir, "next.config.js"), "module.exports = {}")
    expect(detectFramework(dir)).toBe("next")
  })

  it("detects Vite + React Router", () => {
    pkg({ vite: "5.0.0", "react-router-dom": "6.0.0", react: "18.3.1" })
    expect(detectFramework(dir)).toBe("vite-react-router")
  })

  it("treats bare Vite as the vite path", () => {
    pkg({ vite: "5.0.0", react: "18.3.1" })
    expect(detectFramework(dir)).toBe("vite-react-router")
  })

  it("returns null when undetectable", () => {
    pkg({ react: "18.3.1" })
    expect(detectFramework(dir)).toBeNull()
  })

  it("prefers Next over Vite when both are present", () => {
    pkg({ next: "15.0.0", vite: "5.0.0", "react-router-dom": "6.0.0" })
    expect(detectFramework(dir)).toBe("next")
  })
})
