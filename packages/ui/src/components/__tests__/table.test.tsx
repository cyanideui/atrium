import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from "../table"

describe("<Table>", () => {
  it("renders rows + cells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Alice")).toBeInTheDocument()
  })

  it("row + head pick up density CSS variables for height", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-testid="th">H</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell data-testid="td">C</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    const th = screen.getByTestId("th") as HTMLElement
    const td = screen.getByTestId("td") as HTMLElement
    expect(th.style.height).toContain("var(--density-head-h)")
    expect(td.style.height).toContain("var(--density-row-h)")
  })

  it("<TableEmpty> renders title + description", () => {
    render(
      <Table>
        <TableBody>
          <TableEmpty colSpan={3} title="Nothing yet" description="Try again." />
        </TableBody>
      </Table>,
    )
    expect(screen.getByText("Nothing yet")).toBeInTheDocument()
    expect(screen.getByText("Try again.")).toBeInTheDocument()
  })
})
