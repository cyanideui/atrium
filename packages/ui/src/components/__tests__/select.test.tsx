import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select"

describe("<Select>", () => {
  it("renders the trigger with the placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    )
    expect(screen.getByText("Pick one")).toBeInTheDocument()
  })

  it("trigger uses ds-trigger gradient class", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="X" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    )
    expect(screen.getByRole("combobox").className).toMatch(/ds-trigger/)
  })

  it("trigger has density-driven height inline style", () => {
    render(
      <Select>
        <SelectTrigger size="lg">
          <SelectValue placeholder="X" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    )
    const trigger = screen.getByRole("combobox") as HTMLElement
    expect(trigger.style.height).toContain("var(--density-form-h-lg)")
  })
})
