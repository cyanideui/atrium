import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardBody,
  CardFooter,
} from "../card"

describe("<Card>", () => {
  it("renders the full anatomy", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
          <CardAction>
            <button>menu</button>
          </CardAction>
        </CardHeader>
        <CardBody>
          <CardDescription>Acme Corporation</CardDescription>
        </CardBody>
        <CardFooter>
          <button>Save</button>
        </CardFooter>
      </Card>,
    )
    expect(screen.getByText("Customer")).toBeInTheDocument()
    expect(screen.getByText("menu")).toBeInTheDocument()
    expect(screen.getByText("Acme Corporation")).toBeInTheDocument()
    expect(screen.getByText("Save")).toBeInTheDocument()
  })

  it("CardTitle renders as a heading", () => {
    render(<CardTitle>Panel</CardTitle>)
    expect(screen.getByRole("heading", { name: "Panel" })).toBeInTheDocument()
  })

  it("forwards className", () => {
    render(<Card data-testid="c" className="custom-x">x</Card>)
    expect(screen.getByTestId("c").className).toContain("custom-x")
  })
})
