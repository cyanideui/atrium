import { useState } from "react"
import {
  AnimatedNumber,
  NotificationBadge,
  SuccessCheck,
  Swap,
  Collapsible,
  ShimmerText,
  Reveal,
  Button,
  Input,
  Icon,
  Card,
  CardBody,
} from "@cyanideui/ui"
import {
  Sun02Icon,
  Moon02Icon,
  Notification03Icon,
  ArrowDown01Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function MotionPage() {
  const [kpi, setKpi] = useState(1025)
  const [count, setCount] = useState(0)
  const [saving, setSaving] = useState(false)
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [invalidKey, setInvalidKey] = useState(0)
  const [revealKey, setRevealKey] = useState(0)
  const [saveState, setSaveState] = useState<"idle" | "saving" | "done">("idle")
  const [savePlay, setSavePlay] = useState(0)

  async function runSave() {
    setSaveState("saving")
    await new Promise((r) => setTimeout(r, 700))
    setSavePlay((k) => k + 1)
    setSaveState("done")
    setTimeout(() => setSaveState("idle"), 1800)
  }

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        status="stable"
        description="Token-driven transitions adapted from transitions.dev. Every effect uses --dur-* / --ease-* tokens and collapses to an instant state under prefers-reduced-motion: reduce. Toggle reduced motion in your OS or DevTools to verify."
      />

      <Section title="Animated number" description="Count-up tween or per-digit pop on value change. Tabular-nums keeps width stable. Reduced motion jumps to the final value (no tween).">
        <Demo
          code={`<AnimatedNumber value={kpi} leading="$" />          // count up
<AnimatedNumber value={kpi} mode="pop" leading="$" />  // digit flip`}
        >
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wider text-ink-4">count</span>
              <AnimatedNumber value={kpi} leading="$" className="text-[30px] font-semibold" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wider text-ink-4">pop</span>
              <AnimatedNumber value={kpi} mode="pop" leading="$" className="text-[30px] font-semibold" />
            </div>
            <Button size="sm" variant="secondary" leading={<Icon icon={RefreshIcon} size="sm" />}
              onClick={() => setKpi(Math.floor(800 + Math.random() * 9000))}>
              Randomize
            </Button>
          </div>
        </Demo>
      </Section>

      <Section title="Notification badge" description="Diagonal slide + spring pop when the count appears or increases.">
        <Demo code={`<span className="relative">…<NotificationBadge count={count} /></span>`}>
          <div className="flex items-center gap-6">
            <span className="relative inline-grid h-10 w-10 place-items-center rounded-md bg-surface-2">
              <Icon icon={Notification03Icon} size={20} />
              <NotificationBadge count={count} />
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setCount((c) => c + 1)}>Add</Button>
              <Button size="sm" variant="tertiary" onClick={() => setCount(0)}>Reset</Button>
            </div>
          </div>
        </Demo>
      </Section>

      <Section title="Success check" description="Confirmation moment after a save/submit. Green disc pops in while the checkmark draws over it. Reduced motion → appears solid, no draw.">
        <Demo code={`<SuccessCheck playKey={successCount} />  // bump playKey to replay`}>
          <div className="flex items-center gap-4">
            <Button size="sm" onClick={runSave} disabled={saveState === "saving"}>
              {saveState === "saving" ? "Saving…" : "Save changes"}
            </Button>
            {saveState === "done" && (
              <span className="flex items-center gap-2 text-[13px] font-medium text-success">
                <SuccessCheck size="sm" playKey={savePlay} /> Saved
              </span>
            )}
            <span className="ml-4 flex items-center gap-3">
              <SuccessCheck size="sm" playKey={`sm-${savePlay}`} />
              <SuccessCheck size="md" playKey={`md-${savePlay}`} />
              <SuccessCheck size="lg" playKey={`lg-${savePlay}`} />
            </span>
          </div>
        </Demo>
      </Section>

      <Section title="Swap (text + icon)" description="Blur cross-fade between two states. Used by AutoSaveStatus; great for toggles.">
        <Demo code={`<Swap active={saving} variant="text">Saving…</Swap>
<Swap active={dark} variant="icon" alt={<SunIcon/>}><MoonIcon/></Swap>`}>
          <div className="flex items-center gap-8">
            <Swap active={saving} variant="text" alt={<span className="text-ink-3">All changes saved</span>}>
              <span className="text-warning">Saving…</span>
            </Swap>
            <Button size="sm" variant="secondary" onClick={() => setSaving((s) => !s)}>Toggle text</Button>

            <button
              onClick={() => setDark((d) => !d)}
              className="grid h-9 w-9 place-items-center rounded-md border border-hairline-strong bg-canvas text-ink hover:bg-surface"
              aria-label="Toggle theme"
            >
              <Swap active={dark} variant="icon" alt={<Icon icon={Sun02Icon} size={18} />}>
                <Icon icon={Moon02Icon} size={18} />
              </Swap>
            </button>
          </div>
        </Demo>
      </Section>

      <Section title="Collapsible panel" description="Reveals/hides content via grid-rows 0fr↔1fr — no fixed height needed.">
        <Demo code={`<Collapsible open={open}>…</Collapsible>`}>
          <div className="w-[260px]">
            <Button size="sm" variant="secondary" trailing={<Icon icon={ArrowDown01Icon} size="sm" />}
              onClick={() => setOpen((o) => !o)}>
              {open ? "Hide" : "Show"} filters
            </Button>
            <Collapsible open={open} className="mt-2">
              <Card><CardBody className="text-[13px] text-ink-2">
                Status, date range, amount… any panel content reveals smoothly here.
              </CardBody></Card>
            </Collapsible>
          </div>
        </Demo>
      </Section>

      <Section title="Error shake" description="One-shot shake on a false→true invalid transition. Reduced motion → red border only.">
        <Demo code={`<Input invalid={invalid} />  // re-trigger by toggling invalid true again`}>
          <div className="flex items-center gap-3">
            <Input
              key={invalidKey}
              defaultValue="invalid@"
              invalid={invalid}
              className="w-[220px]"
            />
            <Button size="sm" onClick={() => { setInvalid(true); setInvalidKey((k) => k + 1) }}>
              Submit
            </Button>
            <Button size="sm" variant="tertiary" onClick={() => setInvalid(false)}>Clear</Button>
          </div>
        </Demo>
      </Section>

      <Section title="Reveal (staggered)" description="Content rises + de-blurs into place. Stagger with increasing delay for lists / headers.">
        <Demo code={`<Reveal delay={0}>Line one</Reveal>
<Reveal delay={90}>Line two</Reveal>`}>
          <div className="flex items-center gap-4">
            <div key={revealKey} className="text-[13px]">
              <Reveal delay={0} className="font-semibold">Pull request opened</Reveal>
              <Reveal delay={90} className="text-ink-3">Review requested from 3 teammates</Reveal>
            </div>
            <Button size="sm" variant="secondary" onClick={() => setRevealKey((k) => k + 1)}>Replay</Button>
          </div>
        </Demo>
      </Section>

      <Section title="Shimmer text" description="Light streak sweeping across a soft-gray label, for transient 'processing' states. Loops — reduced motion falls back to a flat ink-3 fill.">
        <Demo code={`<ShimmerText>Planning next moves…</ShimmerText>`}>
          <ShimmerText className="text-[15px]">Planning next moves…</ShimmerText>
        </Demo>
      </Section>
    </div>
  )
}
