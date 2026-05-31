import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "../checkbox"

describe("<Checkbox>", () => {
  it("renders with role=checkbox", () => {
    render(<Checkbox aria-label="Accept" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("fires onCheckedChange on click", async () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="Subscribe" onCheckedChange={onCheckedChange} />)
    await userEvent.click(screen.getByRole("checkbox"))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("supports indeterminate state", () => {
    render(<Checkbox aria-label="All" checked="indeterminate" />)
    const cb = screen.getByRole("checkbox")
    expect(cb).toHaveAttribute("data-state", "indeterminate")
  })
})
