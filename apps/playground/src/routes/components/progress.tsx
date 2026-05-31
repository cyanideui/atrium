import { useEffect, useState } from "react"
import { Progress, ProgressSegmented, ProgressCircle } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function ProgressPage() {
  const [value, setValue] = useState(20)
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 8)), 700)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Progress"
        status="stable"
        description="Linear bar, segmented steps, and circular ring. All tone-aware."
      />

      <Section title="Linear">
        <Demo code={`<Progress value={42} />`}>
          <div className="w-full max-w-md space-y-3">
            <Progress value={value} />
            <Progress value={value} tone="success" />
            <Progress value={value} tone="warning" />
            <Progress value={value} tone="critical" />
            <Progress value={value} tone="info" />
          </div>
        </Demo>
      </Section>

      <Section title="Sizes">
        <Demo
          code={`<Progress value={50} size="sm" />
<Progress value={50} size="md" />
<Progress value={50} size="lg" />`}
        >
          <div className="w-full max-w-md space-y-3">
            <Progress value={50} size="sm" />
            <Progress value={50} size="md" />
            <Progress value={50} size="lg" />
          </div>
        </Demo>
      </Section>

      <Section title="Segmented">
        <Demo code={`<ProgressSegmented steps={5} current={3} />`}>
          <div className="w-full max-w-md space-y-2">
            <ProgressSegmented steps={5} current={3} />
            <p className="text-[12px] text-ink-3">Step 3 of 5 — Uploading files</p>
          </div>
        </Demo>
      </Section>

      <Section title="Circular">
        <Demo
          code={`<ProgressCircle value={75} label="75%" />`}
          align="center"
        >
          <ProgressCircle value={value} label={`${value}%`} />
          <ProgressCircle value={value} tone="success" label={`${value}%`} />
          <ProgressCircle value={value} tone="warning" label={`${value}%`} />
          <ProgressCircle value={value} tone="critical" label={`${value}%`} />
        </Demo>
      </Section>
    </div>
  )
}
