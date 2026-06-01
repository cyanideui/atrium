import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Spinner } from "../spinner"
import { AutoSaveStatus } from "../auto-save-status"
import { WorkflowTimeline, WorkflowTimelineItem } from "../workflow-timeline"
import { Skeleton } from "../skeleton"

/**
 * Reduced-motion guards. jsdom can't evaluate `@media (prefers-reduced-motion)`,
 * so we assert the *mechanism*: every looping animation carries an explicit
 * `motion-reduce:*` utility (or a `@media` block in its injected CSS) so it
 * stops cleanly instead of freezing mid-cycle. Backed by the global rule in
 * globals.css that hard-stops .animate-{spin,ping,pulse,bounce}.
 */
describe("reduced-motion guards", () => {
  it("Spinner disables its spin + dims under reduced motion", () => {
    const { container } = render(<Spinner />)
    const el = container.querySelector(".animate-spin")
    expect(el).toBeTruthy()
    const cls = el?.getAttribute("class") ?? ""
    expect(cls).toContain("motion-reduce:animate-none")
    expect(cls).toContain("motion-reduce:opacity-50")
  })

  it("AutoSaveStatus stops the saving spinner under reduced motion", () => {
    const { container } = render(<AutoSaveStatus state="saving" />)
    const spinning = container.querySelector(".animate-spin")
    expect(spinning).toBeTruthy()
    // The spinner is an <svg> (Icon); SVG.className isn't a plain string, so
    // read the class attribute directly.
    expect(spinning?.getAttribute("class")).toContain("motion-reduce:animate-none")
  })

  it("WorkflowTimeline active ping is hidden under reduced motion", () => {
    const { container } = render(
      <WorkflowTimeline>
        <WorkflowTimelineItem status="active" title="Shipping" isLast />
      </WorkflowTimeline>,
    )
    const ping = container.querySelector(".animate-ping")
    expect(ping).toBeTruthy()
    expect(ping?.getAttribute("class")).toContain("motion-reduce:hidden")
  })

  it("Skeleton injects a prefers-reduced-motion rule that disables its loop", () => {
    render(<Skeleton className="h-4 w-20" />)
    const styleTag = document.getElementById("erp-ds-skeleton-styles")
    expect(styleTag).toBeTruthy()
    expect(styleTag?.textContent).toContain("prefers-reduced-motion: reduce")
    expect(styleTag?.textContent).toContain("animation: none")
  })
})
