import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "../button"

describe("<Button>", () => {
  it("renders children", () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("forwards data-variant + data-tone for CSS hooks", () => {
    render(
      <Button variant="secondary" tone="critical">
        Delete
      </Button>,
    )
    const btn = screen.getByRole("button", { name: "Delete" })
    expect(btn).toHaveAttribute("data-variant", "secondary")
    expect(btn).toHaveAttribute("data-tone", "critical")
  })

  it("fires onClick", async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("disables click + sets aria-busy when loading", () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    )
    const btn = screen.getByRole("button")
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute("aria-busy", "true")
  })

  it("respects density-driven height via inline style", () => {
    render(<Button size="sm">Sm</Button>)
    const btn = screen.getByRole("button")
    expect(btn.style.height).toContain("var(--density-btn-h-sm)")
  })

  it("plain variant skips the inline density height", () => {
    render(<Button variant="plain">Learn more</Button>)
    const btn = screen.getByRole("button")
    expect(btn.style.height).toBe("")
  })

  it("type defaults to button (not submit)", () => {
    render(<Button>X</Button>)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")
  })
})
