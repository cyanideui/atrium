import * as React from "react"
import { Button, ButtonGroup } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ButtonGroupPage() {
  const [view, setView] = React.useState<"day" | "week" | "month">("week")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Button Group"
        status="stable"
        description="Arranges related buttons. spaced (gap) for form footers, segmented (joined) for static view switchers."
      />

      <Section title="Spaced (default)" description="For form actions and toolbars with mixed intents.">
        <Demo
          code={`<ButtonGroup>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save</Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
          </ButtonGroup>
        </Demo>
      </Section>

      <Section
        title="Segmented"
        description="Buttons join edge-to-edge, share a single 8px outer radius, and overlap their 1px borders."
      >
        <Demo
          code={`const [view, setView] = useState("week")

<ButtonGroup layout="segmented">
  <Button variant="secondary" aria-pressed={view === "day"}  onClick={() => setView("day")}>Day</Button>
  <Button variant="secondary" aria-pressed={view === "week"} onClick={() => setView("week")}>Week</Button>
  <Button variant="secondary" aria-pressed={view === "month"} onClick={() => setView("month")}>Month</Button>
</ButtonGroup>`}
        >
          <ButtonGroup layout="segmented">
            <Button
              variant="secondary"
              aria-pressed={view === "day"}
              onClick={() => setView("day")}
            >
              Day
            </Button>
            <Button
              variant="secondary"
              aria-pressed={view === "week"}
              onClick={() => setView("week")}
            >
              Week
            </Button>
            <Button
              variant="secondary"
              aria-pressed={view === "month"}
              onClick={() => setView("month")}
            >
              Month
            </Button>
          </ButtonGroup>
        </Demo>
        <p className="mt-2 text-[12px] text-ink-3">
          Click a cell — <code>aria-pressed=&quot;true&quot;</code> applies the inset
          highlight reversal (looks like a key-press), matching Polaris's selected
          state.
        </p>
      </Section>

      <Section title="Without selection (static labels)">
        <Demo code={`<ButtonGroup layout="segmented">
  <Button variant="secondary">List</Button>
  <Button variant="secondary">Grid</Button>
  <Button variant="secondary">Board</Button>
</ButtonGroup>`}>
          <ButtonGroup layout="segmented">
            <Button variant="secondary">List</Button>
            <Button variant="secondary">Grid</Button>
            <Button variant="secondary">Board</Button>
          </ButtonGroup>
        </Demo>
      </Section>

      <Section title="When to use which">
        <p className="text-[13px] text-ink-2">
          Use <code>spaced</code> for form footers and toolbars with mixed intents.
          Use <code>segmented</code> for static view switchers without animation.
          For animated view switchers (sliding pill), reach for{" "}
          <code>SegmentedControl</code> instead.
        </p>
      </Section>
    </div>
  )
}

