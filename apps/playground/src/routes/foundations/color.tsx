import * as React from "react"
import { cn } from "@cyanideui/ui"
import { PaintBoardIcon, TextIcon, FlashIcon, Album02Icon } from "@hugeicons/core-free-icons"
import { FoundationHero, FoundationGroup } from "../../components/foundation-shell"

interface Swatch {
  cssVar: string
  description?: string
}

const surface: Swatch[] = [
  { cssVar: "--canvas", description: "Page + card background" },
  { cssVar: "--surface", description: "Subtle background" },
  { cssVar: "--surface-2", description: "Pressed / active fills" },
  { cssVar: "--hairline", description: "Borders, table dividers" },
  { cssVar: "--hairline-strong", description: "Input borders" },
]

const ink: Swatch[] = [
  { cssVar: "--ink", description: "Primary text" },
  { cssVar: "--ink-2", description: "Secondary text, body" },
  { cssVar: "--ink-3", description: "Tertiary, captions" },
  { cssVar: "--ink-4", description: "Disabled, placeholders" },
]

const semantic: Swatch[] = [
  { cssVar: "--success" },
  { cssVar: "--warning" },
  { cssVar: "--error" },
  { cssVar: "--info" },
]

const tones = [
  { name: "default", bg: "--tone-default-bg", fg: "--tone-default-fg" },
  { name: "success", bg: "--tone-success-bg", fg: "--tone-success-fg" },
  { name: "warning", bg: "--tone-warning-bg", fg: "--tone-warning-fg" },
  { name: "critical", bg: "--tone-critical-bg", fg: "--tone-critical-fg" },
  { name: "info", bg: "--tone-info-bg", fg: "--tone-info-fg" },
  { name: "attention", bg: "--tone-attention-bg", fg: "--tone-attention-fg" },
  { name: "new", bg: "--tone-new-bg", fg: "--tone-new-fg" },
  { name: "readonly", bg: "--tone-readonly-bg", fg: "--tone-readonly-fg" },
]

/** Reads the resolved color of a CSS var so each swatch can show its value. */
function useResolvedColor(cssVar: string) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [hex, setHex] = React.useState("")
  React.useEffect(() => {
    if (!ref.current) return
    setHex(getComputedStyle(ref.current).backgroundColor)
  }, [cssVar])
  return { ref, hex }
}

function ColorSwatch({ s }: { s: Swatch }) {
  const { ref, hex } = useResolvedColor(s.cssVar)
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-hairline bg-canvas p-3 transition-[border-color] duration-[var(--dur-base)] hover:border-hairline-strong">
      <div
        ref={ref}
        className="h-11 w-11 shrink-0 rounded-lg border border-hairline shadow-elev-1"
        style={{ background: `var(${s.cssVar})` }}
      />
      <div className="min-w-0">
        <div className="font-mono text-[12px] text-ink">{s.cssVar}</div>
        <div className="truncate text-[12px] text-ink-3">{s.description ?? s.cssVar.replace("--", "")}</div>
        {hex && <div className="mt-0.5 font-mono text-[10.5px] text-ink-4">{hex}</div>}
      </div>
    </div>
  )
}

export function ColorPage() {
  return (
    <div>
      <FoundationHero
        eyebrow="Foundations"
        title="Color tokens"
        lead="Semantic + tonal palettes, light and dark modes. Every value is a CSS variable exposed to Tailwind via @theme — toggle the theme (T) in the sidebar to see the dark variants resolve live."
      />

      <FoundationGroup icon={PaintBoardIcon} title="Surface" hint="backgrounds, fills, borders">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {surface.map((s) => <ColorSwatch key={s.cssVar} s={s} />)}
        </div>
      </FoundationGroup>

      <FoundationGroup icon={TextIcon} title="Ink (text)" hint="four-step text hierarchy">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ink.map((s) => <ColorSwatch key={s.cssVar} s={s} />)}
        </div>
      </FoundationGroup>

      <FoundationGroup icon={FlashIcon} title="Semantic" hint="vivid intent — validation, focus, sparklines">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {semantic.map((s) => <ColorSwatch key={s.cssVar} s={s} />)}
        </div>
      </FoundationGroup>

      <FoundationGroup icon={Album02Icon} title="Tone palette" hint="calm, low-saturation surfaces for badges + banners">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {tones.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-3 rounded-xl border border-hairline p-3.5"
              style={{ background: `var(${t.bg})`, color: `var(${t.fg})` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold">tone/{t.name}</span>
                <span
                  className="rounded-pill border px-2 py-0.5 text-[10.5px] font-medium"
                  style={{ borderColor: "currentColor" }}
                >
                  Badge
                </span>
              </div>
              <div className="font-mono text-[10px] opacity-70">
                {t.bg}
                <br />
                {t.fg}
              </div>
            </div>
          ))}
        </div>
      </FoundationGroup>
    </div>
  )
}
