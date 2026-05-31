import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "../input"

describe("<Input>", () => {
  it("renders as a text input by default", () => {
    render(<Input placeholder="Email" />)
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "text")
  })

  it("forwards value + onChange", async () => {
    const onChange = vi.fn()
    render(<Input defaultValue="" onChange={onChange} />)
    const input = screen.getByRole("textbox")
    await userEvent.type(input, "x")
    expect(onChange).toHaveBeenCalled()
  })

  it("disables when disabled prop is set", () => {
    render(<Input disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  it("density-driven height via inline style — md by default", () => {
    render(<Input data-testid="i" />)
    const i = screen.getByTestId("i") as HTMLInputElement
    expect(i.style.height).toContain("var(--density-form-h-md)")
  })

  it("respects size prop in inline style", () => {
    render(<Input size="lg" data-testid="i" />)
    const i = screen.getByTestId("i") as HTMLInputElement
    expect(i.style.height).toContain("var(--density-form-h-lg)")
  })
})
