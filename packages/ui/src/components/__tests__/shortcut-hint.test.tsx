import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Sun02Icon } from "@hugeicons/core-free-icons"
import { ShortcutHint } from "../shortcut-hint"

describe("<ShortcutHint>", () => {
  it("renders icon, label, and shortcut", () => {
    render(<ShortcutHint icon={Sun02Icon} label="Light mode" shortcut="T" />)
    expect(screen.getByText("Light mode")).toBeInTheDocument()
    expect(screen.getByText("T")).toBeInTheDocument()
  })

  it("hides shortcut when hideShortcut is true", () => {
    render(<ShortcutHint label="Saved" shortcut="S" hideShortcut />)
    expect(screen.getByText("Saved")).toBeInTheDocument()
    expect(screen.queryByText("S")).not.toBeInTheDocument()
  })

  it("applies tone class for color variants", () => {
    const { container } = render(
      <ShortcutHint label="Saved" tone="success" hideShortcut />,
    )
    const chip = container.firstChild as HTMLElement
    expect(chip.className).toMatch(/tone-success-bg/)
  })

  it("has role=status for assistive tech", () => {
    render(<ShortcutHint label="Hi" shortcut="X" />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })
})
