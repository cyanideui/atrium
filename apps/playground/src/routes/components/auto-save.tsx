import { useState } from "react"
import { AutoSaveStatus, Button } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function AutoSavePage() {
  const [state, setState] = useState<"saved" | "saving" | "error">("saved")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Auto-Save Status"
        status="stable"
        description="Small status pill paired with a page title. Linear-inspired."
      />

      <Section title="States">
        <Demo
          code={`<AutoSaveStatus state="saved" savedAt="2m ago" />
<AutoSaveStatus state="saving" />
<AutoSaveStatus state="error" onRetry={...} />`}
        >
          <div className="flex flex-col gap-3">
            <AutoSaveStatus state="saved" savedAt="just now" />
            <AutoSaveStatus state="saving" />
            <AutoSaveStatus state="error" onRetry={() => alert("retry")} />
          </div>
        </Demo>
      </Section>

      <Section title="Live cycle" description="Click Save to simulate a save lifecycle.">
        <Demo
          code={`onClick={async () => {
  setState("saving")
  await sleep(800)
  setState("saved")
}}`}
        >
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={async () => {
                setState("saving")
                await new Promise((r) => setTimeout(r, 800))
                setState(Math.random() > 0.7 ? "error" : "saved")
              }}
            >
              Save
            </Button>
            <AutoSaveStatus
              state={state}
              savedAt={state === "saved" ? "just now" : undefined}
              onRetry={() => setState("saved")}
            />
          </div>
        </Demo>
      </Section>
    </div>
  )
}
