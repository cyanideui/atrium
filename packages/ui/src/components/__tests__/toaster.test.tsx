import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Toaster } from "../toaster"

describe("<Toaster>", () => {
  it("mounts without crashing", () => {
    const { container } = render(<Toaster />)
    expect(container).toBeInTheDocument()
  })

  it("accepts position prop", () => {
    const { container } = render(<Toaster position="top-center" />)
    expect(container).toBeInTheDocument()
  })
})
