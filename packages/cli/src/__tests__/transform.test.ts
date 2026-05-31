import { describe, it, expect } from "vitest"
import { applyTransform, hasUnresolvedMarkers } from "../lib/transform.js"

describe("applyTransform", () => {
  it("keeps the matching framework block, drops the other", () => {
    const src = [
      "import * as React from 'react'",
      "// @atrium:if next",
      "import Link from 'next/link'",
      "// @atrium:endif",
      "// @atrium:if vite-react-router",
      "import { Link } from 'react-router-dom'",
      "// @atrium:endif",
      "export const x = 1",
    ].join("\n")

    const next = applyTransform(src, "next")
    expect(next).toContain("next/link")
    expect(next).not.toContain("react-router-dom")
    expect(next).not.toContain("@atrium:if")

    const vite = applyTransform(src, "vite-react-router")
    expect(vite).toContain("react-router-dom")
    expect(vite).not.toContain("next/link")
  })

  it("handles JSX-comment markers", () => {
    const src = [
      "function C() {",
      "  return (",
      "    <>",
      "      {/* @atrium:if next */}",
      "      <Link href='/'>Home</Link>",
      "      {/* @atrium:endif */}",
      "      {/* @atrium:if vite-react-router */}",
      "      <Link to='/'>Home</Link>",
      "      {/* @atrium:endif */}",
      "    </>",
      "  )",
      "}",
    ].join("\n")

    const next = applyTransform(src, "next")
    expect(next).toContain("href='/'")
    expect(next).not.toContain("to='/'")
    expect(hasUnresolvedMarkers(next)).toBe(false)
  })

  it("passes through files with no markers untouched", () => {
    const src = "export const a = 1\nexport const b = 2\n"
    expect(applyTransform(src, "next")).toBe(src)
  })

  it("leaves no unresolved markers after transform", () => {
    const src = [
      "// @atrium:if next",
      "a",
      "// @atrium:endif",
      "// @atrium:if vite-react-router",
      "b",
      "// @atrium:endif",
    ].join("\n")
    expect(hasUnresolvedMarkers(applyTransform(src, "next"))).toBe(false)
    expect(hasUnresolvedMarkers(applyTransform(src, "vite-react-router"))).toBe(false)
  })

  it("throws on an unclosed block", () => {
    const src = "// @atrium:if next\nimport x\n"
    expect(() => applyTransform(src, "next")).toThrow(/Unclosed/)
  })

  it("throws on endif without if", () => {
    const src = "a\n// @atrium:endif\n"
    expect(() => applyTransform(src, "next")).toThrow(/without a matching/)
  })

  it("collapses excess blank lines left by stripped blocks", () => {
    const src = [
      "a",
      "// @atrium:if vite-react-router",
      "b",
      "// @atrium:endif",
      "c",
    ].join("\n")
    const out = applyTransform(src, "next")
    expect(out).not.toMatch(/\n{3,}/)
  })
})
