import { PageHeader, Section } from "../../components/page-shell"

const SPACING = [
  { name: "xxs", px: 4 },
  { name: "xs", px: 8 },
  { name: "sm", px: 12 },
  { name: "md", px: 16 },
  { name: "lg", px: 20 },
  { name: "xl", px: 24 },
  { name: "2xl", px: 32 },
  { name: "3xl", px: 40 },
  { name: "section-sm", px: 48 },
  { name: "section", px: 64 },
  { name: "section-lg", px: 96 },
  { name: "hero", px: 120 },
]

const RADII = [
  { name: "xs", value: "var(--radius-xs)", px: 4 },
  { name: "sm", value: "var(--radius-sm)", px: 6 },
  { name: "md", value: "var(--radius-md)", px: 8 },
  { name: "lg", value: "var(--radius-lg)", px: 12 },
  { name: "xl", value: "var(--radius-xl)", px: 16 },
  { name: "pill", value: "999px", px: 999 },
]

const ELEV = [
  { level: 0, var: "none", use: "In-flow content (default)" },
  { level: 1, var: "var(--elev-1)", use: "Subtle floating paper" },
  { level: 2, var: "var(--elev-2)", use: "Tooltip, ShortcutHint" },
  { level: 3, var: "var(--elev-3)", use: "Popover, Select, Toaster" },
  { level: 4, var: "var(--elev-4)", use: "Modal, Drawer, Palette" },
]

export function SpacingPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Foundations"
        title="Spacing & radius"
        description="Consistent rhythms underpin the entire system."
      />

      <Section title="Spacing scale">
        <div className="space-y-1.5 rounded-md border border-hairline bg-canvas p-4">
          {SPACING.map((s) => (
            <div key={s.name} className="grid grid-cols-[80px_60px_1fr] items-center gap-3">
              <span className="font-mono text-[12px] text-ink-2">{s.name}</span>
              <span className="font-mono text-[12px] text-ink-4 tabular-nums">{s.px}px</span>
              <div className="h-2 rounded-pill bg-ink" style={{ width: `${s.px}px` }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {RADII.map((r) => (
            <div
              key={r.name}
              className="flex items-center gap-3 rounded-md border border-hairline bg-canvas p-3"
            >
              <div
                className="h-12 w-12 shrink-0 bg-surface-2"
                style={{ borderRadius: r.value }}
              />
              <div>
                <div className="font-mono text-[12px] text-ink">radius-{r.name}</div>
                <div className="font-mono text-[12px] text-ink-4">
                  {r.px === 999 ? "999px" : `${r.px}px`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Elevation"
        description="Reserved for floating chrome only — overlays, tooltips, dropdowns. In-flow surfaces (cards, tiles, sections, table rows) stay flat with hairline borders. Shadow-everywhere reads as Material/Bootstrap-busy and erodes hierarchy on dense ERP screens."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {ELEV.map((e) => (
            <div
              key={e.level}
              className="flex h-28 flex-col items-center justify-center gap-1 rounded-md bg-canvas px-3 text-center text-[12px] text-ink-2"
              style={{ boxShadow: e.var === "none" ? undefined : e.var, border: e.var === "none" ? "1px solid var(--hairline)" : undefined }}
            >
              <div className="font-semibold text-ink">elev-{e.level}</div>
              <div className="text-[10.5px] text-ink-3">{e.use}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
