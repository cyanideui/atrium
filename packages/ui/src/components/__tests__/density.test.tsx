import { describe, it, expect, beforeEach } from "vitest"
import { render, renderHook, screen, act } from "@testing-library/react"
import {
  DensityProvider,
  DensityRoot,
  useDensity,
  DENSITIES,
} from "../density"

describe("<DensityProvider>", () => {
  it("publishes density via context", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DensityProvider density="comfortable">{children}</DensityProvider>
    )
    const { result } = renderHook(() => useDensity(), { wrapper })
    expect(result.current.density).toBe("comfortable")
  })

  it("applies ds-density-* class to its wrapper", () => {
    render(
      <DensityProvider density="compact-plus">
        <span data-testid="child">x</span>
      </DensityProvider>,
    )
    const child = screen.getByTestId("child")
    expect(child.parentElement?.className).toMatch(/ds-density-compact-plus/)
  })
})

describe("<DensityRoot> + useDensity", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute("data-density")
  })

  it("defaults to compact when no localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DensityRoot>{children}</DensityRoot>
    )
    const { result } = renderHook(() => useDensity(), { wrapper })
    expect(result.current.density).toBe("compact")
  })

  it("cycle() walks compact-plus → compact → comfortable → compact-plus", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DensityRoot defaultDensity="compact-plus">{children}</DensityRoot>
    )
    const { result } = renderHook(() => useDensity(), { wrapper })

    expect(result.current.density).toBe("compact-plus")
    act(() => result.current.cycle())
    expect(result.current.density).toBe("compact")
    act(() => result.current.cycle())
    expect(result.current.density).toBe("comfortable")
    act(() => result.current.cycle())
    expect(result.current.density).toBe("compact-plus")
  })

  it("setDensity persists to localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DensityRoot>{children}</DensityRoot>
    )
    const { result } = renderHook(() => useDensity(), { wrapper })
    act(() => result.current.setDensity("comfortable"))
    expect(window.localStorage.getItem("atrium.density")).toBe("comfortable")
  })

  it("setDensity sets data-density on <html>", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DensityRoot>{children}</DensityRoot>
    )
    const { result } = renderHook(() => useDensity(), { wrapper })
    act(() => result.current.setDensity("compact-plus"))
    expect(document.documentElement.getAttribute("data-density")).toBe("compact-plus")
  })

  it("DENSITIES exposes the canonical mode list in cycle order", () => {
    expect(DENSITIES).toEqual(["compact-plus", "compact", "comfortable"])
  })
})

describe("useDensity outside a provider", () => {
  it("returns the compact fallback with no-op setters", () => {
    const { result } = renderHook(() => useDensity())
    expect(result.current.density).toBe("compact")
    // shouldn't throw
    act(() => result.current.setDensity("comfortable"))
    expect(result.current.density).toBe("compact")
  })
})
