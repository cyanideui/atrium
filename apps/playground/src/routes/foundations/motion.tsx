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
  cn,
} from "@cyanideui/ui"
import {
  Sun02Icon,
  Moon02Icon,
  Notification03Icon,
  ArrowDown01Icon,
  CursorMagicSelection01Icon,
  FlashIcon,
  ArrowLeftRightIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons"
import { FoundationHero, FoundationGroup, ShowcaseCard, MetaChip } from "../../components/foundation-shell"
import { CodeBlock } from "../../components/code-block"
import { Customizer } from "../../components/customizer"

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

/** Small inline "Play" pill that replays a card's animation without opening
 *  the customizer (stops click propagation so the card's onClick won't fire). */
function PlayButton({ onPlay }: { onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onPlay()
      }}
      className="inline-flex items-center gap-1 rounded-pill border border-hairline bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-2 transition-colors duration-[var(--dur-fast)] hover:border-hairline-strong hover:text-ink"
    >
      <Icon icon={PlayIcon} size={11} /> Play
    </button>
  )
}

export function MotionPage() {
  const [saving, setSaving] = useState(false)
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [invalidKey, setInvalidKey] = useState(0)
  const [revealKey, setRevealKey] = useState(0)

  // Shimmer customizer
  const [shimmerOpen, setShimmerOpen] = useState(false)
  const [shimmerCfg, setShimmerCfg] = useState({ text: "Planning next moves…", size: 16, speed: 2.4 })

  // AnimatedNumber customizer
  const [numOpen, setNumOpen] = useState(false)
  const [numCfg, setNumCfg] = useState({ value: 1025, mode: "count", decimals: 0 })
  const [numPlay, setNumPlay] = useState(0)

  // SuccessCheck customizer
  const [checkOpen, setCheckOpen] = useState(false)
  const [checkCfg, setCheckCfg] = useState({ size: "md", tone: "success" })
  const [checkPlay, setCheckPlay] = useState(0)

  // NotificationBadge customizer
  const [badgeOpen, setBadgeOpen] = useState(false)
  const [badgeCfg, setBadgeCfg] = useState({ count: 3, tone: "critical", dot: false })
  const [badgePlay, setBadgePlay] = useState(0)

  const SHIMMER_PRESETS = [
    "Planning next moves…",
    "Thinking…",
    "Generating report",
    "Syncing 1,248 records",
  ]

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
            desc="Count-up tween or per-digit pop on value change. Click to customize."
            tag="AnimatedNumber"
            footer={<ReducedDot>Jumps to final value (no tween)</ReducedDot>}
            onClick={() => setNumOpen(true)}
          >
            <div className="flex flex-col items-center gap-4">
              <AnimatedNumber
                key={numPlay}
                value={Number(numCfg.value)}
                mode={numCfg.mode as "count" | "pop"}
                decimals={Number(numCfg.decimals)}
                animateOnMount
                leading="$"
                className="text-[30px] font-semibold text-ink"
              />
              <div className="flex justify-center">
                <PlayButton onPlay={() => setNumPlay((k) => k + 1)} />
              </div>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Success check"
            desc="Disc pops in while the checkmark draws over it. Click to customize."
            tag="SuccessCheck"
            footer={<ReducedDot>Appears solid, no draw</ReducedDot>}
            onClick={() => setCheckOpen(true)}
          >
            <div className="flex flex-col items-center gap-3">
              <SuccessCheck
                size={checkCfg.size as "sm" | "md" | "lg"}
                tone={checkCfg.tone as "success" | "info"}
                playKey={`card-${checkPlay}`}
              />
              <div className="flex justify-center">
                <PlayButton onPlay={() => setCheckPlay((k) => k + 1)} />
              </div>
            </div>
          </ShowcaseCard>

          <ShowcaseCard
            title="Notification badge"
            desc="Diagonal slide + spring pop when the count appears or grows. Click to customize."
            tag="NotificationBadge"
            footer={<ReducedDot>Appears in place (no pop)</ReducedDot>}
            onClick={() => setBadgeOpen(true)}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="relative inline-grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-ink-2">
                <Icon icon={Notification03Icon} size={20} />
                <NotificationBadge
                  key={badgePlay}
                  count={Number(badgeCfg.count)}
                  dot={Boolean(badgeCfg.dot)}
                  tone={badgeCfg.tone as "critical" | "info" | "success" | "warning"}
                />
              </span>
              <div className="flex justify-center">
                <PlayButton onPlay={() => setBadgePlay((k) => k + 1)} />
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
            <ShimmerText style={{ fontSize: shimmerCfg.size, ["--ds-shimmer-dur" as string]: `${shimmerCfg.speed}s` }}>
              {shimmerCfg.text || "Type something…"}
            </ShimmerText>
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

      {/* ---------- Shimmer customizer (reusable shell) ---------- */}
      <Customizer
        open={shimmerOpen}
        onOpenChange={setShimmerOpen}
        id="shimmer-text"
        title="Customize shimmer"
        description="Tune the label, size, and speed — everything previews live."
        defaults={{ text: "Planning next moves…", size: 16, speed: 2.4 }}
        onConfigChange={setShimmerCfg}
        controls={[
          { type: "text", key: "text", label: "Text", placeholder: "Type a label…", presets: SHIMMER_PRESETS },
          { type: "slider", key: "size", label: "Font size", min: 13, max: 40, unit: "px" },
          { type: "slider", key: "speed", label: "Sweep speed", min: 1, max: 5, step: 0.1, unit: "s" },
        ]}
        preview={(c) => (
          <ShimmerText style={{ fontSize: Number(c.size), ["--ds-shimmer-dur" as string]: `${c.speed}s` }}>
            {String(c.text) || "Type something…"}
          </ShimmerText>
        )}
        code={(c) =>
          `<ShimmerText\n  style={{ fontSize: ${c.size}, "--ds-shimmer-dur": "${Number(c.speed).toFixed(1)}s" }}\n>\n  ${c.text || "…"}\n</ShimmerText>`
        }
      />

      {/* ---------- AnimatedNumber customizer ---------- */}
      <Customizer
        open={numOpen}
        onOpenChange={setNumOpen}
        id="animated-number"
        title="Customize animated number"
        description="Set the value, mode, and decimals. The number re-animates on change."
        defaults={{ value: 1025, mode: "count", decimals: 0 }}
        onConfigChange={setNumCfg}
        replayable
        controls={[
          { type: "slider", key: "value", label: "Value", min: 0, max: 9999 },
          { type: "segmented", key: "mode", label: "Mode", options: [{ value: "count", label: "Count up" }, { value: "pop", label: "Digit pop" }] },
          { type: "slider", key: "decimals", label: "Decimals", min: 0, max: 2 },
        ]}
        preview={(c) => (
          <AnimatedNumber
            value={Number(c.value)}
            mode={c.mode as "count" | "pop"}
            decimals={Number(c.decimals)}
            leading="$"
            className="text-[30px] font-semibold text-ink"
          />
        )}
        code={(c) =>
          `<AnimatedNumber\n  value={${c.value}}\n  mode="${c.mode}"\n  decimals={${c.decimals}}\n  leading="$"\n/>`
        }
      />

      {/* ---------- SuccessCheck customizer ---------- */}
      <Customizer
        open={checkOpen}
        onOpenChange={setCheckOpen}
        id="success-check"
        title="Customize success check"
        description="Set the size and tone. Replays each time you tweak."
        defaults={{ size: "md", tone: "success" }}
        onConfigChange={(c) => {
          setCheckCfg(c)
          setCheckPlay((k) => k + 1)
        }}
        replayable
        controls={[
          { type: "segmented", key: "size", label: "Size", options: [{ value: "sm", label: "sm" }, { value: "md", label: "md" }, { value: "lg", label: "lg" }] },
          { type: "segmented", key: "tone", label: "Tone", options: [{ value: "success", label: "Success" }, { value: "info", label: "Info" }] },
        ]}
        preview={(c) => (
          <SuccessCheck
            size={c.size as "sm" | "md" | "lg"}
            tone={c.tone as "success" | "info"}
            playKey={`modal-${String(c.size)}-${String(c.tone)}`}
          />
        )}
        code={(c) => `<SuccessCheck size="${c.size}" tone="${c.tone}" playKey={successCount} />`}
      />

      {/* ---------- NotificationBadge customizer ---------- */}
      <Customizer
        open={badgeOpen}
        onOpenChange={setBadgeOpen}
        id="notification-badge"
        title="Customize notification badge"
        description="Set the count, tone, and dot mode. Pops when the count grows."
        defaults={{ count: 3, tone: "critical", dot: false }}
        onConfigChange={setBadgeCfg}
        replayable
        controls={[
          { type: "slider", key: "count", label: "Count", min: 0, max: 150 },
          { type: "segmented", key: "tone", label: "Tone", options: [{ value: "critical", label: "Critical" }, { value: "info", label: "Info" }, { value: "success", label: "Success" }, { value: "warning", label: "Warning" }] },
          { type: "toggle", key: "dot", label: "Dot only", hint: "Bare dot, no number" },
        ]}
        preview={(c) => (
          <span className="relative inline-grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-ink-2">
            <Icon icon={Notification03Icon} size={20} />
            <NotificationBadge
              count={Number(c.count)}
              dot={Boolean(c.dot)}
              tone={c.tone as "critical" | "info" | "success" | "warning"}
            />
          </span>
        )}
        code={(c) =>
          `<NotificationBadge count={${c.count}} tone="${c.tone}"${c.dot ? " dot" : ""} />`
        }
      />
    </div>
  )
}
