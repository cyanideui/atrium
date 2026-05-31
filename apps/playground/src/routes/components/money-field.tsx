import { useState } from "react"
import { MoneyField, Label } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function MoneyFieldPage() {
  const [usd, setUsd] = useState<number | null>(1240.0)
  const [eur, setEur] = useState<number | null>(null)
  const [idr, setIdr] = useState<number | null>(0)

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Money Field"
        status="stable"
        description="Currency-formatted input. Auto-formats on blur with Intl.NumberFormat. Locale-aware decimals."
      />

      <Section title="Default (USD)">
        <Demo
          code={`<MoneyField currency="$" value={usd} onChange={setUsd} />`}
        >
          <div className="w-full max-w-sm space-y-1.5">
            <Label htmlFor="amount">Amount</Label>
            <MoneyField id="amount" value={usd} onChange={setUsd} />
            <div className="font-mono text-[12px] text-ink-3">
              numeric value: <span className="text-ink">{usd ?? "null"}</span>
            </div>
          </div>
        </Demo>
      </Section>

      <Section title="Other currencies & locales">
        <Demo
          code={`<MoneyField currency="€" locale="de-DE" value={eur} onChange={setEur} />
<MoneyField currency="Rp" locale="id-ID" decimals={0} value={idr} onChange={setIdr} />`}
        >
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <Label className="mb-1.5">EUR (de-DE)</Label>
              <MoneyField currency="€" locale="de-DE" value={eur} onChange={setEur} />
            </div>
            <div>
              <Label className="mb-1.5">IDR (id-ID, no decimals)</Label>
              <MoneyField
                currency="Rp"
                locale="id-ID"
                decimals={0}
                value={idr}
                onChange={setIdr}
              />
            </div>
          </div>
        </Demo>
      </Section>

      <Section title="Signed (negatives in red)">
        <Demo code={`<MoneyField signed value={-450.5} />`}>
          <MoneyField className="max-w-sm" signed defaultValue={-450.5} />
        </Demo>
      </Section>
    </div>
  )
}
