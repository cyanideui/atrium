import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DatePicker } from "../date-picker"
import { DateField } from "../date-field"

describe("<DatePicker>", () => {
  it("renders a calendar grid", () => {
    render(<DatePicker mode="single" />)
    // react-day-picker renders the month caption — just make sure the
    // grid mounts without throwing.
    const grid = document.querySelector(".rdp-month_grid")
    expect(grid).not.toBeNull()
  })

  it("card variant gets bordered chrome class", () => {
    const { container } = render(<DatePicker mode="single" variant="card" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).toMatch(/border/)
  })

  it("bare variant skips the bordered chrome class", () => {
    const { container } = render(<DatePicker mode="single" variant="bare" />)
    const root = container.firstChild as HTMLElement
    expect(root.className).not.toMatch(/shadow-elev-1/)
  })
})

describe("<DateField>", () => {
  it("renders a button trigger", () => {
    render(<DateField mode="single" placeholder="Pick a date" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByText("Pick a date")).toBeInTheDocument()
  })

  it("trigger uses ds-trigger gradient class", () => {
    render(<DateField mode="single" />)
    expect(screen.getByRole("button").className).toMatch(/ds-trigger/)
  })

  it("trigger has density-driven height inline style", () => {
    render(<DateField mode="single" size="sm" />)
    const trigger = screen.getByRole("button") as HTMLElement
    expect(trigger.style.height).toContain("var(--density-form-h-sm)")
  })
})
