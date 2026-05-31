import * as React from "react"
import {
  DatePicker,
  DateField,
  Label,
  Button,
} from "@atrium/ui"
import type { DateRange } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function DatePickerPage() {
  // Single inline calendar
  const [single, setSingle] = React.useState<Date | undefined>(new Date())

  // Range inline calendar
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const from = new Date()
    const to = new Date()
    to.setDate(to.getDate() + 6)
    return { from, to }
  })

  // <DateField> single
  const [fieldSingle, setFieldSingle] = React.useState<Date | null>(null)

  // <DateField> range
  const [fieldRange, setFieldRange] = React.useState<DateRange | null>(null)

  // Disabled-days demo (no past dates)
  const today = React.useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const [future, setFuture] = React.useState<Date | undefined>()

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Date Picker"
        status="stable"
        description="Token-styled wrapper around react-day-picker v10. Use <DatePicker> for inline calendars and <DateField> for input-shaped triggers in forms. Single, range, and multiple modes share the same surface."
      />

      <Section
        title="Inline — single"
        description="Drop a calendar straight into the page. Same chrome as our card surfaces."
      >
        <Demo
          align="center"
          code={`const [date, setDate] = React.useState<Date | undefined>(new Date())

<DatePicker mode="single" selected={date} onSelect={setDate} />`}
        >
          <DatePicker mode="single" selected={single} onSelect={setSingle} />
        </Demo>
      </Section>

      <Section
        title="Inline — range (two months)"
        description="Pass numberOfMonths={2} for the classic side-by-side range picker. The middle days highlight with surface-2 between the start/end edges."
      >
        <Demo
          align="center"
          code={`const [range, setRange] = React.useState<DateRange | undefined>()

<DatePicker mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />`}
        >
          <DatePicker
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
          />
        </Demo>
      </Section>

      <Section
        title="Inline — bare (for embedding)"
        description="The bare variant strips the bordered card chrome. Used internally by <DateField> inside a popover. Reach for it when wrapping the calendar in your own panel."
      >
        <Demo
          align="center"
          code={`<DatePicker variant="bare" mode="single" />`}
        >
          <DatePicker variant="bare" mode="single" />
        </Demo>
      </Section>

      <Section
        title="DateField — single (form input)"
        description="Input-shaped trigger that opens a calendar in a Popover. Sits naturally next to other form controls and keeps the same 8 px radius, focus ring, and disabled state."
      >
        <Demo
          code={`const [date, setDate] = React.useState<Date | null>(null)

<DateField mode="single" value={date} onChange={setDate} clearable />`}
        >
          <div className="grid w-full max-w-[320px] gap-2">
            <Label htmlFor="df-single">Ship date</Label>
            <DateField
              id="df-single"
              mode="single"
              value={fieldSingle}
              onChange={setFieldSingle}
              clearable
            />
          </div>
        </Demo>
      </Section>

      <Section
        title="DateField — range"
        description="Range mode opens a two-month picker. The popover stays open until both edges are picked, then snaps closed."
      >
        <Demo
          code={`const [range, setRange] = React.useState<DateRange | null>(null)

<DateField mode="range" value={range} onChange={setRange} clearable />`}
        >
          <div className="grid w-full max-w-[360px] gap-2">
            <Label htmlFor="df-range">Reporting period</Label>
            <DateField
              id="df-range"
              mode="range"
              value={fieldRange}
              onChange={setFieldRange}
              clearable
              placeholder="Pick a date range"
            />
          </div>
        </Demo>
      </Section>

      <Section
        title="Disabled days"
        description="Forward any react-day-picker matcher to disable specific dates. Past dates, weekends, holidays, capacity-full days — all use the same shape."
      >
        <Demo
          align="center"
          code={`<DatePicker
  mode="single"
  selected={future}
  onSelect={setFuture}
  disabled={[{ before: new Date() }]}
/>`}
        >
          <DatePicker
            mode="single"
            selected={future}
            onSelect={setFuture}
            disabled={[{ before: today }]}
          />
        </Demo>
      </Section>

      <Section
        title="Sizes"
        description="DateField follows the same sm/md/lg sizing as <Input> so it lines up in mixed-control rows."
      >
        <Demo>
          <div className="grid w-full max-w-[360px] gap-3">
            <DateField size="sm" mode="single" placeholder="Small" />
            <DateField size="md" mode="single" placeholder="Medium" />
            <DateField size="lg" mode="single" placeholder="Large" />
            <DateField size="md" mode="single" placeholder="Disabled" disabled />
          </div>
        </Demo>
      </Section>

      <Section
        title="Inline form composition"
        description="Pair with <Label> + <Button> the same as any other input. Submit handlers receive native Date values."
      >
        <Demo
          code={`<form onSubmit={(e) => { e.preventDefault(); ... }}>
  <Label htmlFor="due">Due date</Label>
  <DateField id="due" mode="single" value={due} onChange={setDue} />
  <Button type="submit">Save</Button>
</form>`}
        >
          <form
            className="grid w-full max-w-[360px] gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              alert(
                fieldSingle
                  ? `Saved: ${fieldSingle.toDateString()}`
                  : "No date picked"
              )
            }}
          >
            <Label htmlFor="due">Due date</Label>
            <DateField
              id="due"
              mode="single"
              value={fieldSingle}
              onChange={setFieldSingle}
              clearable
            />
            <div className="flex justify-end pt-1">
              <Button type="submit" size="sm">
                Save
              </Button>
            </div>
          </form>
        </Demo>
      </Section>
    </div>
  )
}
