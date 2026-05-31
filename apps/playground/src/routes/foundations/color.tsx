import { PageHeader, Section } from "../../components/page-shell"

interface Swatch {
  name: string
  cssVar: string
  hex?: string
  description?: string
}

const surface: Swatch[] = [
  { name: "canvas", cssVar: "--canvas", description: "Page + card background" },
  { name: "surface", cssVar: "--surface", description: "Subtle background" },
  { name: "surface-2", cssVar: "--surface-2", description: "Pressed/active fills" },
  { name: "hairline", cssVar: "--hairline", description: "Borders, table dividers" },
  { name: "hairline-strong", cssVar: "--hairline-strong", description: "Input borders" },
]

const ink: Swatch[] = [
  { name: "ink", cssVar: "--ink", description: "Primary text" },
  { name: "ink-2", cssVar: "--ink-2", description: "Secondary text, body" },
  { name: "ink-3", cssVar: "--ink-3", description: "Tertiary, captions" },
  { name: "ink-4", cssVar: "--ink-4", description: "Disabled, placeholders" },
]

const semantic: Swatch[] = [
  { name: "success", cssVar: "--success" },
  { name: "warning", cssVar: "--warning" },
  { name: "error", cssVar: "--error" },
  { name: "info", cssVar: "--info" },
]

const tones = [
  { name: "default",   bg: "--tone-default-bg",   fg: "--tone-default-fg" },
  { name: "success",   bg: "--tone-success-bg",   fg: "--tone-success-fg" },
  { name: "warning",   bg: "--tone-warning-bg",   fg: "--tone-warning-fg" },
  { name: "critical",  bg: "--tone-critical-bg",  fg: "--tone-critical-fg" },
  { name: "info",      bg: "--tone-info-bg",      fg: "--tone-info-fg" },
  { name: "attention", bg: "--tone-attention-bg", fg: "--tone-attention-fg" },
  { name: "new",       bg: "--tone-new-bg",       fg: "--tone-new-fg" },
  { name: "readonly",  bg: "--tone-readonly-bg",  fg: "--tone-readonly-fg" },
]

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {items.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-3 rounded-md border border-hairline bg-canvas p-3"
        >
          <div
            className="h-10 w-10 shrink-0 rounded-sm border border-hairline"
            style={{ background: `var(${s.cssVar})` }}
          />
          <div className="min-w-0">
            <div className="font-mono text-[12px] text-ink">{s.cssVar}</div>
            <div className="text-[12px] text-ink-3">{s.description ?? s.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ColorPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Foundations"
        title="Color tokens"
        description="Semantic + tonal palettes, light and dark modes. Toggle the theme in the sidebar to see dark variants live."
      />

      <Section title="Surface">
        <SwatchGrid items={surface} />
      </Section>

      <Section title="Ink (text)">
        <SwatchGrid items={ink} />
      </Section>

      <Section title="Semantic" description="Used for vivid intent: validation, focus rings, sparklines.">
        <SwatchGrid items={semantic} />
      </Section>

      <Section title="Tone palette" description="Calm, low-saturation surfaces for badges and banners.">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {tones.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-3 rounded-md border border-hairline p-3"
              style={{
                background: `var(${t.bg})`,
                color: `var(${t.fg})`,
              }}
            >
              <div className="font-mono text-[12px]">tone/{t.name}</div>
              <div className="ml-auto font-mono text-[11px] opacity-70">
                {t.bg} / {t.fg}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
