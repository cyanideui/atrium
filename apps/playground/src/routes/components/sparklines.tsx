import { Sparkline } from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

const REVENUE = [12, 14, 13, 15, 17, 16, 19, 22, 21, 24, 27, 25, 28]
const ORDERS = [342, 320, 335, 360, 358, 380, 390]
const STOCK = [142, 138, 130, 122, 110, 96, 84]

export function SparklinesPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Sparklines"
        status="stable"
        description="Inline SVG. Smooth line, filled area at low opacity. Color-aware via tone prop. Sits inline with KPI tiles."
      />

      <Section title="Tones">
        <Demo
          code={`<Sparkline data={[…]} tone="success" />`}
          align="center"
        >
          <Sparkline data={REVENUE} tone="default" showEnd />
          <Sparkline data={REVENUE} tone="success" showEnd />
          <Sparkline data={REVENUE} tone="warning" showEnd />
          <Sparkline data={REVENUE} tone="critical" showEnd />
          <Sparkline data={REVENUE} tone="info" showEnd />
        </Demo>
      </Section>

      <Section title="KPI tile pattern">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-md border border-hairline bg-canvas p-4">
            <div className="text-[12px] text-ink-3">Total Revenue</div>
            <div className="mt-1 flex items-end gap-3">
              <div className="text-[28px] font-semibold tabular-nums text-ink leading-none">
                $124,592
              </div>
              <Sparkline data={REVENUE} tone="success" width={64} height={20} showEnd />
            </div>
            <div className="mt-1 text-[12px] text-success">↑ 12.5% vs last week</div>
          </div>
          <div className="rounded-md border border-hairline bg-canvas p-4">
            <div className="text-[12px] text-ink-3">Orders</div>
            <div className="mt-1 flex items-end gap-3">
              <div className="text-[28px] font-semibold tabular-nums text-ink leading-none">
                1,847
              </div>
              <Sparkline data={ORDERS} tone="info" width={64} height={20} showEnd />
            </div>
            <div className="mt-1 text-[12px] text-info">↑ 8.2%</div>
          </div>
          <div className="rounded-md border border-hairline bg-canvas p-4">
            <div className="text-[12px] text-ink-3">Stock at risk</div>
            <div className="mt-1 flex items-end gap-3">
              <div className="text-[28px] font-semibold tabular-nums text-ink leading-none">
                84
              </div>
              <Sparkline data={STOCK} tone="critical" width={64} height={20} showEnd />
            </div>
            <div className="mt-1 text-[12px] text-error">↓ 41%</div>
          </div>
        </div>
      </Section>

      <Section title="Sizes">
        <Demo code={`<Sparkline data={…} width={120} height={32} />`} align="center">
          <Sparkline data={REVENUE} width={48} height={16} />
          <Sparkline data={REVENUE} width={80} height={24} />
          <Sparkline data={REVENUE} width={120} height={32} />
        </Demo>
      </Section>
    </div>
  )
}
