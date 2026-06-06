import { RulerIcon, Album02Icon, Layers01Icon } from "@hugeicons/core-free-icons"
import { FoundationHero, FoundationGroup, ShowcaseCard } from "../../components/foundation-shell"

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
    <div>
      <FoundationHero
        eyebrow="Foundations"
        title="Spacing & radius"
        lead="Consistent rhythms underpin the whole system — a 4px base step for spacing, a fixed radius family, and a strict elevation ladder reserved for floating chrome only."
      />

      <FoundationGroup icon={RulerIcon} title="Spacing scale" hint="4px base step">
        <div className="rounded-xl border border-hairline bg-canvas p-5">
          <div className="flex flex-col gap-2">
            {SPACING.map((s) => (
              <div key={s.name} className="grid grid-cols-[90px_56px_1fr] items-center gap-3">
                <span className="font-mono text-[12px] text-ink-2">{s.name}</span>
                <span className="font-mono text-[12px] text-ink-4 tabular-nums">{s.px}px</span>
                <div className="h-2.5 rounded-pill bg-gradient-to-r from-ink to-ink-3" style={{ width: `${s.px}px` }} />
              </div>
            ))}
          </div>
        </div>
      </FoundationGroup>

      <FoundationGroup icon={Album02Icon} title="Radius" hint="fixed family — never scales with density">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {RADII.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-3 rounded-xl border border-hairline bg-canvas p-4">
              <div
                className="h-14 w-14 border border-hairline-strong bg-surface-2"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <div className="font-mono text-[12px] text-ink">{r.name}</div>
                <div className="font-mono text-[11px] text-ink-4">{r.px === 999 ? "999px" : `${r.px}px`}</div>
              </div>
            </div>
          ))}
        </div>
      </FoundationGroup>

      <FoundationGroup
        icon={Layers01Icon}
        title="Elevation"
        hint="floating chrome only — in-flow surfaces stay flat"
      >
        <p className="mb-3 max-w-[680px] text-[12.5px] leading-relaxed text-ink-3">
          Shadows are reserved for overlays, tooltips, and dropdowns. In-flow surfaces (cards, tiles,
          sections, table rows) stay flat with hairline borders — shadow-everywhere reads as
          Material/Bootstrap-busy and erodes hierarchy on dense ERP screens.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {ELEV.map((e) => (
            <div
              key={e.level}
              className="flex h-32 flex-col items-center justify-center gap-1.5 rounded-xl bg-canvas px-3 text-center"
              style={{
                boxShadow: e.var === "none" ? undefined : e.var,
                border: e.var === "none" ? "1px solid var(--hairline)" : "1px solid var(--hairline)",
              }}
            >
              <div className="text-[13px] font-semibold text-ink">elev-{e.level}</div>
              <div className="text-[10.5px] leading-tight text-ink-3">{e.use}</div>
            </div>
          ))}
        </div>
      </FoundationGroup>
    </div>
  )
}
