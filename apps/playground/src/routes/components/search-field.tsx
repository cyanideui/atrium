import { useState } from "react"
import { SearchField } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SearchFieldPage() {
  const [value, setValue] = useState("")
  const [debounced, setDebounced] = useState("")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Search Field"
        status="stable"
        description="Bordered input with leading search icon, clear button when filled, and optional debounced onChange."
      />

      <Section title="Default">
        <Demo
          code={`<SearchField placeholder="Search orders…" onChange={(v) => console.log(v)} />`}
        >
          <SearchField
            className="max-w-md"
            placeholder="Search orders…"
            onChange={(v) => setDebounced(v)}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          />
        </Demo>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
          <div className="rounded-sm border border-hairline bg-canvas px-3 py-2">
            <div className="font-mono text-[11px] text-ink-3">live value</div>
            <div className="text-ink">{value || "—"}</div>
          </div>
          <div className="rounded-sm border border-hairline bg-canvas px-3 py-2">
            <div className="font-mono text-[11px] text-ink-3">debounced (250ms)</div>
            <div className="text-ink">{debounced || "—"}</div>
          </div>
        </div>
      </Section>

      <Section title="Sizes">
        <Demo
          code={`<SearchField size="sm" placeholder="Small" />
<SearchField size="md" placeholder="Medium — default" />
<SearchField size="lg" placeholder="Large" />`}
        >
          <div className="flex w-full flex-col gap-3">
            <SearchField size="sm" placeholder="Small" />
            <SearchField size="md" placeholder="Medium — default" />
            <SearchField size="lg" placeholder="Large" />
          </div>
        </Demo>
      </Section>

      <Section title="With shortcut hint">
        <Demo
          code={`<SearchField placeholder="Search…" showShortcut />`}
        >
          <SearchField className="max-w-md" placeholder="Search…" showShortcut />
        </Demo>
      </Section>

      <Section title="Disabled">
        <Demo code={`<SearchField placeholder="Search…" disabled />`}>
          <SearchField className="max-w-md" placeholder="Search…" disabled />
        </Demo>
      </Section>
    </div>
  )
}
