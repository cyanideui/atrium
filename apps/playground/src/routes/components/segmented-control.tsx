import { useState } from "react"
import {
  SegmentedControl,
  Badge,
  Icon,
} from "@atrium/ui"
import {
  CalendarBlock01Icon,
  ChartLineData01Icon,
  ListViewIcon,
  Layers01Icon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SegmentedControlPage() {
  const [period, setPeriod] = useState<string>("week")
  const [view, setView] = useState<string>("list")
  const [tab, setTab] = useState<string>("overview")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Segmented Control"
        status="stable"
        description="Linear-style sliding-pill selector. The active pill is a single absolutely-positioned element that animates between cells via transform — no item restyle, no layout flash."
      />

      <Section title="Default (md)" description="Drop-in replacement for any 2–5 option toggle. The pill slides 250 ms with ease-emphasis.">
        <Demo
          code={`const [period, setPeriod] = useState("week")

<SegmentedControl
  value={period}
  onChange={setPeriod}
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ]}
/>`}
        >
          <div className="w-[420px]">
            <SegmentedControl
              value={period}
              onChange={setPeriod}
              options={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "year", label: "Year" },
              ]}
            />
          </div>
        </Demo>
      </Section>

      <Section title="With icons" description="Leading icons — useful for view switchers.">
        <Demo>
          <div className="w-[360px]">
            <SegmentedControl
              value={view}
              onChange={setView}
              options={[
                { value: "list", label: "List", icon: <Icon icon={ListViewIcon} size={14} /> },
                { value: "board", label: "Board", icon: <Icon icon={Layers01Icon} size={14} /> },
                { value: "calendar", label: "Calendar", icon: <Icon icon={CalendarBlock01Icon} size={14} /> },
                { value: "chart", label: "Chart", icon: <Icon icon={ChartLineData01Icon} size={14} /> },
              ]}
            />
          </div>
        </Demo>
      </Section>

      <Section title="With badge" description="Pair with a small Badge to show counts per segment.">
        <Demo>
          <div className="w-[420px]">
            <SegmentedControl
              value={tab}
              onChange={setTab}
              options={[
                { value: "overview", label: "Overview" },
                {
                  value: "issues",
                  label: "Issues",
                  badge: <Badge tone="warning" size="sm" dotless>12</Badge>,
                },
                {
                  value: "members",
                  label: "Members",
                  badge: <Badge tone="info" size="sm" dotless>8</Badge>,
                },
              ]}
            />
          </div>
        </Demo>
      </Section>

      <Section title="Sizes" description="22px (sm) for toolbars, 30px (md) default, 38px (lg) for prominence.">
        <Demo>
          <div className="flex flex-col gap-3 w-[320px]">
            <SegmentedControl
              size="sm"
              defaultValue="left"
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
            <SegmentedControl
              size="md"
              defaultValue="left"
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
            <SegmentedControl
              size="lg"
              defaultValue="left"
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
          </div>
        </Demo>
      </Section>

      <Section title="Disabled item" description="Disabled options are skipped during keyboard navigation.">
        <Demo>
          <div className="w-[420px]">
            <SegmentedControl
              defaultValue="basic"
              options={[
                { value: "basic", label: "Basic" },
                { value: "pro", label: "Pro" },
                { value: "enterprise", label: "Enterprise", disabled: true },
              ]}
            />
          </div>
        </Demo>
      </Section>

      <Section title="Inline (auto width)" description="Pass block={false} for an inline control sized to its content.">
        <Demo>
          <SegmentedControl
            block={false}
            defaultValue="px"
            options={[
              { value: "px", label: "px" },
              { value: "rem", label: "rem" },
              { value: "%", label: "%" },
            ]}
          />
        </Demo>
      </Section>
    </div>
  )
}
