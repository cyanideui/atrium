import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Switch } from "../switch"

describe("<Switch>", () => {
  it("renders with role=switch", () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("toggles via click", async () => {
    const onCheckedChange = vi.fn()
    render(<Switch onCheckedChange={onCheckedChange} />)
    await userEvent.click(screen.getByRole("switch"))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("forwards data-tone for tone-driven track gradients", () => {
    render(<Switch tone="success" />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-tone", "success")
  })

  it("respects controlled checked state", () => {
    render(<Switch checked aria-label="Notifications" onCheckedChange={() => {}} />)
    const sw = screen.getByRole("switch")
    expect(sw).toHaveAttribute("data-state", "checked")
  })

  it("density-driven track sizing in inline style", () => {
    render(<Switch />)
    const sw = screen.getByRole("switch") as HTMLElement
    expect(sw.style.width).toContain("var(--density-switch-track-w)")
    expect(sw.style.height).toContain("var(--density-switch-track-h)")
  })
})
