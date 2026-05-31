import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  CommandPalette,
  CommandPaletteGroup,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
} from "../command-palette"

describe("<CommandPalette>", () => {
  it("does not render when closed", () => {
    render(
      <CommandPalette open={false} onOpenChange={() => {}}>
        <CommandPaletteList>
          <CommandPaletteGroup heading="Actions">
            <CommandPaletteItem>Save</CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>,
    )
    expect(screen.queryByText("Save")).not.toBeInTheDocument()
  })

  it("renders content when open", () => {
    render(
      <CommandPalette open onOpenChange={() => {}}>
        <CommandPaletteInput placeholder="Search…" />
        <CommandPaletteList>
          <CommandPaletteGroup heading="Actions">
            <CommandPaletteItem>Save</CommandPaletteItem>
          </CommandPaletteGroup>
        </CommandPaletteList>
      </CommandPalette>,
    )
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument()
    expect(screen.getByText("Save")).toBeInTheDocument()
  })
})
