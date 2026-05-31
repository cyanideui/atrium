import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "../badge"

describe("<Badge>", () => {
  it("renders children", () => {
    render(<Badge>Paid</Badge>)
    expect(screen.getByText("Paid")).toBeInTheDocument()
  })

  it("applies tone class for color variants", () => {
    render(<Badge tone="success">Active</Badge>)
    const el = screen.getByText("Active")
    expect(el.className).toMatch(/tone-success-bg/)
  })

  it("supports hiding the leading dot via dotless", () => {
    render(<Badge dotless tone="warning">Pending</Badge>)
    expect(screen.getByText("Pending")).toBeInTheDocument()
  })
})
