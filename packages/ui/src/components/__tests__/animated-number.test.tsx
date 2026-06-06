import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { AnimatedNumber } from "../animated-number"

/**
 * AnimatedNumber smoke + reduced-motion behavior. matchMedia is mocked to
 * `matches: false` in vitest.setup, so these run on the animated path; the
 * key guarantees are: final value renders, and pop-mode emits per-digit spans.
 */
describe("<AnimatedNumber>", () => {
  it("renders the value on first paint (count mode, no tween on mount)", () => {
    const { container } = render(<AnimatedNumber value={1234} />)
    expect(container.textContent).toContain("1,234")
  })

  it("renders leading/trailing affixes", () => {
    const { container } = render(<AnimatedNumber value={50} leading="$" trailing="%" />)
    expect(container.textContent).toContain("$")
    expect(container.textContent).toContain("%")
  })

  it("pop mode splits the formatted value into per-digit spans", () => {
    const { container } = render(<AnimatedNumber value={1025} mode="pop" />)
    // "1,025" → 5 glyph spans inside the overflow wrapper.
    const wrap = container.querySelector(".inline-flex.overflow-hidden")
    expect(wrap).toBeTruthy()
    expect(wrap?.children.length).toBe("1,025".length)
  })

  it("respects decimals", () => {
    const { container } = render(<AnimatedNumber value={3.14159} decimals={2} />)
    expect(container.textContent).toContain("3.14")
  })
})
