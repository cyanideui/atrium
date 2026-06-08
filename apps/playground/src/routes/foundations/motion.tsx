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
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  Label,
  cn,
} from "@cyanideui/ui"
import {
  Sun02Icon,
  Moon02Icon,
  Notification03Icon,
  ArrowDown01Icon,
  RefreshIcon,
  CursorMagicSelection01Icon,
  FlashIcon,
  ArrowLeftRightIcon,
  Edit02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { FoundationHero, FoundationGroup, ShowcaseCard, MetaChip } from "../../components/foundation-shell"
import { CodeBlock } from "../../components/code-block"

const TOKENS = [
  { name: "--dur-fast", value: "80ms", tone: "info" as const },
  { name: "--dur-base", value: "150ms", tone: "info" as const },
  { name: "--dur-slide", value: "250ms", tone: "info" as const },
  { name: "--ease-standard", value: "cubic-bezier(.2,0,0,1)", tone: "attention" as const },
  { name: "--ease-emphasis", value: "cubic-bezier(.32,.72,0,1)", tone: "attention" as const },
]

function ReducedDot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="inline-block h-1.5 w-1.5 rounded-pill bg-tone-success-fg/70" />
      {children}
    </>
  )
}

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
  const [shimmerText, setShimmerText] = useState("Planning next moves…")

  // Shimmer customizer modal state
  const [shimmerOpen, setShimmerOpen] = useState(false)
  const [shimmerSize, setShimmerSize] = useState(16)
  const [shimmerSpeed, setShimmerSpeed] = useState(2.4)
  const [shimmerAdvanced, setShimmerAdvanced] = useState(false)

  const shimmerDefault = shimmerText === "Planning next moves…" && shimmerSize === 16 && shimmerSpeed === 2.4
  const resetShimmer = () => {
    setShimmerText("Planning next moves…")
    setShimmerSize(16)
    setShimmerSpeed(2.4)
  }

  const SHIMMER_PRESETS = [
    "Planning next moves…",
    "Thinking…",
    "Generating report",
    "Syncing 1,248 records",
  ]

  async function runSave() {
    setSaveState("saving")
    await new Promise((r) => setTimeout(r, 700))
    setSavePlay((k) => k + 1)
    setSaveState("done")
    setTimeout(() => setSaveState("idle"), 1800)
  }

  return (
    <div>
      <FoundationHero
        eyebrow="Foundations"
        title="Motion"
        lead={
          <>
            Token-driven transitions adapted from{" "}
            <span className="font-medium text-ink">transitions.dev</span>. Every effect is built on
            the same five motion tokens and collapses to an instant state under{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[12px]">
              prefers-reduced-motion: reduce
            </code>
            . Flip that on in your OS or DevTools and watch everything below snap.
          </>
        }
      >
        <div className="flex flex-wrap gap-2">
          {TOKENS.map((t) => (
            <MetaChip key={t.name} label={t.name} value={t.value} tone={t.tone} />
          ))}
        </div>
      </FoundationHero>

      <FoundationGroup icon={FlashIcon} title="Feedback & values" hint="motion that confirms an action or a change">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ShowcaseCard
            title="Animated number"
            desc="Count-up tween or per-digit pop on value change."
            tag="AnimatedNumber"
            footer={<ReducedDot>Jumps to final value (no tween)</ReducedDot>}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-end gap-8">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-ink-4">count</span>
                  <AnimatedNumber value={kpi} leading="$" className="text-[28px] font-semibold text-ink" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-ink-4">pop</span>
                  <AnimatedNumber value={kpi} mode="pop" leading="$" className="text-[28px] font-semibold text-ink" />
                </div>
              </div>
              <Button size="sm" variant="secondary" leading={<Icon icon={RefreshIcon} size="sm" />} onClick={() => setKpi(Math.floor(800 + Math.random() * 9000))}>
                Randomize
              </Button>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Success check"
            desc="Disc pops in while the checkmark draws over it."
            tag="SuccessCheck"
            footer={<ReducedDot>Appears solid, no draw</ReducedDot>}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <SuccessCheck size="sm" playKey={`sm-${savePlay}`} />
                <SuccessCheck size="md" playKey={`md-${savePlay}`} />
                <SuccessCheck size="lg" playKey={`lg-${savePlay}`} />
              </div>
              <div className="flex h-8 items-center">
                {saveState === "done" ? (
                  <span className="flex items-center gap-1.5 text-[13px] font-medium text-success">
                    <SuccessCheck size="sm" playKey={savePlay} /> Saved
                  </span>
                ) : (
                  <Button size="sm" onClick={runSave} disabled={saveState === "saving"}>
                    {saveState === "saving" ? "Saving…" : "Save changes"}
                  </Button>
                )}
              </div>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Notification badge"
            desc="Diagonal slide + spring pop when the count appears or grows."
            tag="NotificationBadge"
            footer={<ReducedDot>Appears in place (no pop)</ReducedDot>}
          >
            <div className="flex flex-col items-center gap-4">
              <span className="relative inline-grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-ink-2">
                <Icon icon={Notification03Icon} size={20} />
                <NotificationBadge count={count} />
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setCount((c) => c + 1)}>Add</Button>
                <Button size="sm" variant="tertiary" onClick={() => setCount(0)}>Reset</Button>
              </div>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Error shake"
            desc="One-shot shake on a false→true invalid transition."
            tag="Input invalid"
            footer={<ReducedDot>Red border only, no shake</ReducedDot>}
          >
            <div className="flex flex-col items-center gap-3">
              <Input key={invalidKey} defaultValue="invalid@" invalid={invalid} className="w-[200px]" />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { setInvalid(true); setInvalidKey((k) => k + 1) }}>Submit</Button>
                <Button size="sm" variant="tertiary" onClick={() => setInvalid(false)}>Clear</Button>
              </div>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Shimmer text"
            desc="Light streak sweeping a label for transient processing states. Click the card to customize."
            tag="ShimmerText"
            footer={<ReducedDot>Flat ink-3 fill (no sweep)</ReducedDot>}
            onClick={() => setShimmerOpen(true)}
          >
            <div className="flex flex-col items-center gap-2">
              <ShimmerText style={{ fontSize: shimmerSize, ["--ds-shimmer-dur" as string]: `${shimmerSpeed}s` }}>
                {shimmerText || "Type something…"}
              </ShimmerText>
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-4 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100">
                <Icon icon={Edit02Icon} size={11} /> Click to customize
              </span>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Reveal (staggered)"
            desc="Content rises + de-blurs into place; stagger for lists."
            tag="Reveal"
            footer={<ReducedDot>Appears instantly</ReducedDot>}
          >
            <div className="flex flex-col items-center gap-4">
              <div key={revealKey} className="text-center text-[13px]">
                <Reveal delay={0} className="font-semibold text-ink">Pull request opened</Reveal>
                <Reveal delay={90} className="text-ink-3">Review requested from 3 teammates</Reveal>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setRevealKey((k) => k + 1)}>Replay</Button>
            </div>
          </ShowcaseCard>
        </div>
      </FoundationGroup>

      <FoundationGroup icon={CursorMagicSelection01Icon} title="State & layout" hint="transitions between two states or sizes">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ShowcaseCard
            title="Swap — text"
            desc="Blur cross-fade between two text states. Powers AutoSaveStatus."
            tag="Swap"
            footer={<ReducedDot>Instant text change</ReducedDot>}
          >
            <div className="flex flex-col items-center gap-4">
              <Swap active={saving} variant="text" alt={<span className="text-ink-3">All changes saved</span>} className="text-[14px]">
                <span className="text-warning">Saving…</span>
              </Swap>
              <Button size="sm" variant="secondary" onClick={() => setSaving((s) => !s)}>Toggle</Button>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Swap — icon"
            desc="Scale + rotate + blur swap. Ideal for theme / show-hide toggles."
            tag="Swap"
            footer={<ReducedDot>Instant icon change</ReducedDot>}
          >
            <button
              onClick={() => setDark((d) => !d)}
              className="grid h-12 w-12 place-items-center rounded-xl border border-hairline-strong bg-canvas text-ink transition-colors duration-[var(--dur-base)] hover:bg-surface"
              aria-label="Toggle theme"
            >
              <Swap active={dark} variant="icon" alt={<Icon icon={Sun02Icon} size={22} />}>
                <Icon icon={Moon02Icon} size={22} />
              </Swap>
            </button>
          </ShowcaseCard>

          <ShowcaseCard
            title="Collapsible panel"
            desc="Open / close via grid-rows 0fr↔1fr — no fixed height needed."
            tag="Collapsible"
            footer={<ReducedDot>Snaps open / closed</ReducedDot>}
          >
            <div className="w-full max-w-[240px]">
              <Button
                size="sm"
                variant="secondary"
                className="w-full justify-between"
                trailing={<Icon icon={ArrowDown01Icon} size="sm" className={cn("transition-transform duration-[var(--dur-base)]", open && "rotate-180")} />}
                onClick={() => setOpen((o) => !o)}
              >
                {open ? "Hide filters" : "Show filters"}
              </Button>
              <Collapsible open={open} className="mt-2">
                <Card>
                  <CardBody className="text-[12.5px] text-ink-2">
                    Status, date range, amount… any panel content reveals smoothly here.
                  </CardBody>
                </Card>
              </Collapsible>
            </div>
          </ShowcaseCard>
        </div>
      </FoundationGroup>

      <FoundationGroup
        icon={ArrowLeftRightIcon}
        title="Page transitions"
        hint="route forward / back — a consumer pattern, not a primitive"
      >
        <ShowcaseCard stage={false}>
          <div className="flex w-full flex-col gap-3">
            <p className="m-0 text-[13px] leading-relaxed text-ink-2">
              Page-to-page slides are a <span className="font-medium text-ink">routing</span> concern, so Atrium
              doesn't ship a route-transition component (that belongs to your router). Instead, use the native{" "}
              <a href="https://developer.mozilla.org/docs/Web/API/View_Transitions_API" target="_blank" rel="noreferrer" className="text-info">View Transitions API</a>{" "}
              with Atrium's motion tokens. It respects <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11.5px]">prefers-reduced-motion</code> automatically and degrades to an instant cut where unsupported.
            </p>

            <div className="w-full">
              <p className="m-0 mb-1.5 text-[12px] font-semibold text-ink">1. Token-driven CSS (global)</p>
              <CodeBlock
                language="css"
                code={`/* Slide the old page out left, the new page in from the right.
   Durations/easings reuse Atrium's motion tokens. */
::view-transition-old(root) {
  animation: 250ms var(--ease-emphasis) both vt-out;
}
::view-transition-new(root) {
  animation: 250ms var(--ease-emphasis) both vt-in;
}
@keyframes vt-out { to { transform: translateX(-30px); opacity: 0; } }
@keyframes vt-in  { from { transform: translateX(30px); opacity: 0; } }

/* Reduced motion → no slide (API also disables automatically). */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation: none; }
}`}
              />
            </div>

            <div className="w-full">
              <p className="m-0 mb-1.5 text-[12px] font-semibold text-ink">2. Wrap navigation</p>
              <CodeBlock
                language="tsx"
                code={`// React Router — wrap navigate() in a view transition.
const navigate = useNavigate()
function go(to: string) {
  if (!document.startViewTransition) return navigate(to)
  document.startViewTransition(() => navigate(to))
}

// Next.js App Router — opt in globally:
//   next.config.js → experimental: { viewTransition: true }
// then router.push() animates with the CSS above.`}
              />
            </div>
          </div>
        </ShowcaseCard>
      </FoundationGroup>

      <div className="flex items-start gap-2.5 rounded-lg border border-hairline bg-surface px-4 py-3">
        <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-pill bg-tone-info-bg text-tone-info-fg">
          <Icon icon={FlashIcon} size={12} />
        </span>
        <p className="m-0 text-[12.5px] leading-relaxed text-ink-3">
          These primitives are <span className="font-medium text-ink-2">opt-in</span> — reach for them where they fit.
          Motion already <span className="font-medium text-ink-2">built into components</span> (Modal, Tooltip,
          Dropdown, AutoSaveStatus, AvatarGroup, SearchField, ImportPreview…) applies automatically. Copy any
          primitive with{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11.5px]">npx cyanideui add animated-number</code>.
        </p>
      </div>

      {/* ---------- Shimmer customizer modal (card-resize via Collapsible) ---------- */}
      <Modal open={shimmerOpen} onOpenChange={setShimmerOpen}>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Customize shimmer</ModalTitle>
            <ModalDescription>Tune the label, size, and speed — everything previews live.</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              {/* live preview on a dotted stage */}
              <div className="flex min-h-[72px] items-center justify-center rounded-lg border border-dashed border-hairline bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] [background-size:14px_14px] px-4 py-4">
                <ShimmerText style={{ fontSize: shimmerSize, ["--ds-shimmer-dur" as string]: `${shimmerSpeed}s` }}>
                  {shimmerText || "Type something…"}
                </ShimmerText>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="sh-text">Text</Label>
                <Input
                  id="sh-text"
                  value={shimmerText}
                  onChange={(e) => setShimmerText(e.target.value)}
                  placeholder="Type a label…"
                />
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {SHIMMER_PRESETS.map((p) => {
                    const active = shimmerText === p
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setShimmerText(p)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-pill border px-2.5 py-1 text-[11px] transition-colors duration-[var(--dur-fast)]",
                          active
                            ? "border-ink bg-ink text-canvas"
                            : "border-hairline bg-canvas text-ink-3 hover:border-hairline-strong hover:text-ink",
                        )}
                      >
                        {active && <Icon icon={Tick02Icon} size={10} />}
                        {p.replace("…", "")}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Size + speed sliders — always visible */}
              <div className="grid gap-3 rounded-lg border border-hairline bg-surface/50 p-3">
                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sh-size">Font size</Label>
                    <span className="font-mono text-[11px] tabular-nums text-ink-4">{shimmerSize}px</span>
                  </div>
                  <input id="sh-size" type="range" min={13} max={40} value={shimmerSize}
                    onChange={(e) => setShimmerSize(Number(e.target.value))} className="w-full cursor-pointer accent-ink" />
                </div>
                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sh-speed">Sweep speed</Label>
                    <span className="font-mono text-[11px] tabular-nums text-ink-4">{shimmerSpeed.toFixed(1)}s</span>
                  </div>
                  <input id="sh-speed" type="range" min={1} max={5} step={0.1} value={shimmerSpeed}
                    onChange={(e) => setShimmerSpeed(Number(e.target.value))} className="w-full cursor-pointer accent-ink" />
                  <div className="flex justify-between text-[10px] text-ink-4"><span>faster</span><span>slower</span></div>
                </div>
              </div>

              {/* Advanced — the code snippet reveals via Collapsible; the modal
                  resizes to fit (card-resize feel) since it has no fixed height. */}
              <button
                type="button"
                onClick={() => setShimmerAdvanced((a) => !a)}
                aria-expanded={shimmerAdvanced}
                className="flex items-center gap-1.5 self-start text-[12.5px] font-medium text-ink-2 hover:text-ink"
              >
                <Icon icon={ArrowDown01Icon} size={14}
                  className={cn("transition-transform duration-[var(--dur-base)]", shimmerAdvanced && "rotate-180")} />
                {shimmerAdvanced ? "Hide code" : "Show code"}
              </button>
              <Collapsible open={shimmerAdvanced}>
                <div className="border-t border-hairline pt-3">
                  <CodeBlock
                    language="tsx"
                    code={`<ShimmerText\n  style={{ fontSize: ${shimmerSize}, "--ds-shimmer-dur": "${shimmerSpeed.toFixed(1)}s" }}\n>\n  ${shimmerText || "…"}\n</ShimmerText>`}
                  />
                </div>
              </Collapsible>
            </div>
          </ModalBody>
          <ModalFooter className="justify-between">
            <Button variant="tertiary" size="sm" disabled={shimmerDefault} onClick={resetShimmer}
              leading={<Icon icon={RefreshIcon} size="sm" />}>
              Reset
            </Button>
            <ModalClose asChild>
              <Button>Done</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
