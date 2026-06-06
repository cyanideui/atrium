import { TextIcon, Tag01Icon } from "@hugeicons/core-free-icons"
import { FoundationHero, FoundationGroup, ShowcaseCard } from "../../components/foundation-shell"

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
    <div>
      <FoundationHero
        eyebrow="Foundations"
        title="Typography"
        lead="Geometric sans (Inter) with tabular numbers enabled by default. Mono is reserved for IDs, keycaps, and code. The scale steps in deliberate jumps so hierarchy reads at a glance on dense screens."
      />

      <FoundationGroup icon={TextIcon} title="Type scale" hint="token · size / line-height · weight">
        <div className="overflow-hidden rounded-xl border border-hairline bg-canvas">
          {TYPE.map((t, i) => (
            <div
              key={t.token}
              className={cnRow(i)}
            >
              <span className="font-mono text-[12px] text-ink-2">{t.token}</span>
              <span className="font-mono text-[11.5px] text-ink-4 tabular-nums">
                {t.size}/{t.line} · {t.weight}
              </span>
              <span
                className="truncate"
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
      </FoundationGroup>

      <FoundationGroup icon={Tag01Icon} title="Tabular numbers" hint="font-feature-settings: 'tnum' — columns align">
        <ShowcaseCard stage={false}>
          <table className="w-full max-w-[440px] text-[13px]">
            <thead>
              <tr className="border-b border-hairline">
                <th className="pb-2 text-left font-medium text-ink-3">Order</th>
                <th className="pb-2 text-right font-medium text-ink-3">Amount</th>
                <th className="pb-2 text-right font-medium text-ink-3">Tax</th>
                <th className="pb-2 text-right font-medium text-ink-3">Total</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {[
                ["#1234", "1,240.00", "99.20", "1,339.20"],
                ["#1235", "850.00", "68.00", "918.00"],
                ["#1236", "2,100.00", "168.00", "2,268.00"],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-hairline last:border-0">
                  <td className="py-1.5 font-mono text-ink-2">{r[0]}</td>
                  <td className="py-1.5 text-right">{r[1]}</td>
                  <td className="py-1.5 text-right">{r[2]}</td>
                  <td className="py-1.5 text-right font-medium text-ink">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ShowcaseCard>
      </FoundationGroup>
    </div>
  )
}

/** Shared row layout for the type-scale list (alternating subtle stripe). */
function cnRow(i: number) {
  return [
    "grid grid-cols-[110px_120px_1fr] items-baseline gap-4 px-4 py-3.5 border-b border-hairline last:border-0",
    i % 2 === 1 ? "bg-surface/40" : "",
  ].join(" ")
}
