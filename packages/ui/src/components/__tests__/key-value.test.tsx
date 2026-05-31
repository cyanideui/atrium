import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { KeyValueList, KeyValue } from "../key-value"

describe("<KeyValue>", () => {
  it("renders label + value pairs", () => {
    render(
      <KeyValueList>
        <KeyValue label="Customer since" value="Mar 2024" />
        <KeyValue label="Total spend" value="$48,210" />
      </KeyValueList>,
    )
    expect(screen.getByText("Customer since")).toBeInTheDocument()
    expect(screen.getByText("Mar 2024")).toBeInTheDocument()
    expect(screen.getByText("Total spend")).toBeInTheDocument()
    expect(screen.getByText("$48,210")).toBeInTheDocument()
  })

  it("uses dt/dd semantics", () => {
    const { container } = render(
      <KeyValueList>
        <KeyValue label="Method" value="Visa" />
      </KeyValueList>,
    )
    expect(container.querySelector("dl")).toBeTruthy()
    expect(container.querySelector("dt")?.textContent).toBe("Method")
    expect(container.querySelector("dd")?.textContent).toBe("Visa")
  })

  it("stacked layout drops the inline justify class", () => {
    const { container } = render(
      <KeyValueList layout="stacked">
        <KeyValue label="Bio" value="Long value here" />
      </KeyValueList>,
    )
    const row = container.querySelector("dl > div") as HTMLElement
    expect(row.className).toContain("flex-col")
  })
})
