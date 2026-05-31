import { PageHeader, Section } from "../../components/page-shell"

const TYPE = [
  { token: "display", size: 36, line: 44, weight: 600, sample: "$124,592" },
  { token: "h1", size: 28, line: 36, weight: 600, sample: "Page title" },
  { token: "h2", size: 22, line: 30, weight: 600, sample: "Section header" },
  { token: "h3", size: 18, line: 26, weight: 600, sample: "Card title" },
  { token: "body", size: 14, line: 22, weight: 400, sample: "The quick brown fox jumps over the lazy dog." },
  { token: "body-sm", size: 13, line: 20, weight: 400, sample: "The quick brown fox jumps over the lazy dog." },
  { token: "caption", size: 12, line: 18, weight: 400, sample: "Meta · 2 minutes ago · INV-001" },
  { token: "mono", size: 13, line: 20, weight: 500, sample: "INV-7842 / SKU-001 / $1,240.00", mono: true },
]

export function TypographyPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Geometric sans (Inter) with tabular numbers enabled by default. Mono used for IDs, keycaps, and code."
      />

      <Section title="Scale">
        <div className="overflow-hidden rounded-md border border-hairline bg-canvas">
          {TYPE.map((t) => (
            <div
              key={t.token}
              className="grid grid-cols-[120px_120px_1fr] items-baseline gap-4 border-b border-hairline px-4 py-3 last:border-0"
            >
              <span className="font-mono text-[12px] text-ink-3">{t.token}</span>
              <span className="font-mono text-[12px] text-ink-4 tabular-nums">
                {t.size}/{t.line} · {t.weight}
              </span>
              <span
                style={{
                  fontSize: t.size,
                  lineHeight: `${t.line}px`,
                  fontWeight: t.weight,
                  fontFamily: t.mono ? "var(--font-mono)" : "var(--font-sans)",
                }}
              >
                {t.sample}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tabular numbers" description="Enabled globally via font-feature-settings: 'tnum'. All metric values align column-by-column.">
        <div className="rounded-md border border-hairline bg-canvas p-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                <th className="text-left font-medium text-ink-3">Order</th>
                <th className="text-right font-medium text-ink-3">Amount</th>
                <th className="text-right font-medium text-ink-3">Tax</th>
                <th className="text-right font-medium text-ink-3">Total</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              <tr><td>#1234</td><td className="text-right">1,240.00</td><td className="text-right">99.20</td><td className="text-right">1,339.20</td></tr>
              <tr><td>#1235</td><td className="text-right">850.00</td><td className="text-right">68.00</td><td className="text-right">918.00</td></tr>
              <tr><td>#1236</td><td className="text-right">2,100.00</td><td className="text-right">168.00</td><td className="text-right">2,268.00</td></tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
