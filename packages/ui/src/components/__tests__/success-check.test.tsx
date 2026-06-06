import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { SuccessCheck } from "../success-check"

describe("<SuccessCheck>", () => {
  it("renders an accessible success image with a checkmark path", () => {
    const { container, getByRole } = render(<SuccessCheck />)
    expect(getByRole("img", { name: "Success" })).toBeTruthy()
    expect(container.querySelector("path")).toBeTruthy()
  })

  it("carries the ds-check-disc class that drives the pop + draw", () => {
    const { getByRole } = render(<SuccessCheck />)
    expect(getByRole("img").getAttribute("class")).toContain("ds-check-disc")
  })

  it("applies tone + size", () => {
    const { getByRole } = render(<SuccessCheck tone="info" size="lg" />)
    const el = getByRole("img")
    expect(el.getAttribute("class")).toContain("bg-info")
    expect(el.getAttribute("style")).toContain("40px")
  })
})
