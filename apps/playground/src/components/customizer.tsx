import * as React from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  Collapsible,
  Button,
  Input,
  Label,
  Switch,
  Icon,
  cn,
} from "@cyanideui/ui"
import { ArrowDown01Icon, RefreshIcon, Tick02Icon, PlayIcon } from "@hugeicons/core-free-icons"
import { CodeBlock } from "./code-block"

/**
 * <Customizer> — a reusable "tweak it live" modal for the playground.
 *
 * Give it a `preview` render fn, a list of `controls`, the `defaults`, and a
 * `code` template. It owns the config state, renders the live preview + the
 * control widgets + a collapsible code snippet + reset/done footer, and
 * persists the last config to localStorage (per `id`).
 *
 * Designed to scale: bringing the customizer to another component is just a
 * new <Customizer> config — no bespoke modal each time.
 */

/* ---------- control descriptors ---------- */
type BaseControl = { key: string; label: string }
export type CustomizerControl =
  | (BaseControl & { type: "text"; placeholder?: string; presets?: string[] })
  | (BaseControl & { type: "slider"; min: number; max: number; step?: number; unit?: string })
  | (BaseControl & { type: "segmented"; options: { value: string; label: string }[] })
  | (BaseControl & { type: "toggle"; hint?: string })

export type CustomizerConfig = Record<string, string | number | boolean>

export interface CustomizerProps<C extends CustomizerConfig> {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Stable id used for localStorage persistence. */
  id: string
  title: string
  description?: string
  controls: CustomizerControl[]
  defaults: C
  /** Live preview, given the current config. */
  preview: (cfg: C) => React.ReactNode
  /** Code snippet template, given the current config. */
  code?: (cfg: C) => string
  codeLang?: "tsx" | "ts" | "css" | "html" | "bash" | "json"
  /** Fired whenever the config changes (so the trigger surface can mirror it). */
  onConfigChange?: (cfg: C) => void
  /** Show a Replay button that remounts the preview to re-fire its animation. */
  replayable?: boolean
}

function loadPersisted<C extends CustomizerConfig>(id: string, defaults: C): C {
  if (typeof window === "undefined") return defaults
  try {
    const raw = window.localStorage.getItem(`atrium.customizer.${id}`)
    if (!raw) return defaults
    const saved = JSON.parse(raw) as Partial<C>
    // Only adopt keys that exist in defaults (schema guard).
    const merged = { ...defaults }
    for (const k of Object.keys(defaults)) {
      if (k in saved && typeof saved[k] === typeof defaults[k]) {
        ;(merged as CustomizerConfig)[k] = saved[k] as string | number | boolean
      }
    }
    return merged
  } catch {
    return defaults
  }
}

export function Customizer<C extends CustomizerConfig>({
  open,
  onOpenChange,
  id,
  title,
  description,
  controls,
  defaults,
  preview,
  code,
  codeLang = "tsx",
  onConfigChange,
  replayable,
}: CustomizerProps<C>) {
  const [cfg, setCfg] = React.useState<C>(() => loadPersisted(id, defaults))
  const [showCode, setShowCode] = React.useState(false)
  const [replayKey, setReplayKey] = React.useState(0)

  // Mirror config out to the trigger surface (and on mount, so a persisted
  // config is reflected before the modal is ever opened).
  const onConfigChangeRef = React.useRef(onConfigChange)
  React.useEffect(() => {
    onConfigChangeRef.current = onConfigChange
  })
  React.useEffect(() => {
    onConfigChangeRef.current?.(cfg)
  }, [cfg])

  // Persist on change (debounced via rAF to avoid thrashing on slider drags).
  const persistRef = React.useRef<number | null>(null)
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (persistRef.current) cancelAnimationFrame(persistRef.current)
    persistRef.current = requestAnimationFrame(() => {
      try {
        window.localStorage.setItem(`atrium.customizer.${id}`, JSON.stringify(cfg))
      } catch {
        /* ignore quota / private-mode errors */
      }
    })
  }, [cfg, id])

  const set = <K extends keyof C>(key: K, value: C[K]) => setCfg((p) => ({ ...p, [key]: value }))
  const isDefault = React.useMemo(
    () => Object.keys(defaults).every((k) => cfg[k] === defaults[k]),
    [cfg, defaults],
  )
  const reset = () => setCfg(defaults)

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            {/* Live preview on a dotted stage. `replayKey` remounts it so an
                animation-on-mount primitive re-fires when Replay is pressed. */}
            <div className="flex min-h-[72px] items-center justify-center rounded-lg border border-dashed border-hairline bg-[radial-gradient(var(--hairline)_1px,transparent_1px)] [background-size:14px_14px] px-4 py-4">
              <span key={replayKey}>{preview(cfg)}</span>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3.5">
              {controls.map((ctrl) => (
                <ControlField
                  key={ctrl.key}
                  ctrl={ctrl}
                  value={cfg[ctrl.key] ?? ""}
                  onChange={(v) => set(ctrl.key as keyof C, v as C[keyof C])}
                />
              ))}
            </div>

            {/* Collapsible code — modal resizes to fit (card-resize feel) */}
            {code && (
              <>
                <button
                  type="button"
                  onClick={() => setShowCode((s) => !s)}
                  aria-expanded={showCode}
                  className="flex items-center gap-1.5 self-start text-[12.5px] font-medium text-ink-2 hover:text-ink"
                >
                  <Icon
                    icon={ArrowDown01Icon}
                    size={14}
                    className={cn("transition-transform duration-[var(--dur-base)]", showCode && "rotate-180")}
                  />
                  {showCode ? "Hide code" : "Show code"}
                </button>
                <Collapsible open={showCode}>
                  <div className="border-t border-hairline pt-3">
                    <CodeBlock language={codeLang} code={code(cfg)} />
                  </div>
                </Collapsible>
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="tertiary"
              size="sm"
              disabled={isDefault}
              onClick={reset}
              leading={<Icon icon={RefreshIcon} size="sm" />}
            >
              Reset
            </Button>
            {replayable && (
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setReplayKey((k) => k + 1)}
                leading={<Icon icon={PlayIcon} size="sm" />}
              >
                Replay
              </Button>
            )}
          </div>
          <ModalClose asChild>
            <Button>Done</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

/* ---------- single control renderer ---------- */
function ControlField({
  ctrl,
  value,
  onChange,
}: {
  ctrl: CustomizerControl
  value: string | number | boolean
  onChange: (v: string | number | boolean) => void
}) {
  const fieldId = `cz-${ctrl.key}`

  if (ctrl.type === "text") {
    return (
      <div className="grid gap-1.5">
        <Label htmlFor={fieldId}>{ctrl.label}</Label>
        <Input
          id={fieldId}
          value={String(value)}
          placeholder={ctrl.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {ctrl.presets && ctrl.presets.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {ctrl.presets.map((p) => {
              const active = value === p
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onChange(p)}
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
        )}
      </div>
    )
  }

  if (ctrl.type === "slider") {
    const num = typeof value === "number" ? value : Number(value)
    return (
      <div className="grid gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor={fieldId}>{ctrl.label}</Label>
          <span className="font-mono text-[11px] tabular-nums text-ink-4">
            {num}
            {ctrl.unit ?? ""}
          </span>
        </div>
        <input
          id={fieldId}
          type="range"
          min={ctrl.min}
          max={ctrl.max}
          step={ctrl.step ?? 1}
          value={num}
          aria-valuetext={`${num}${ctrl.unit ?? ""}`}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full cursor-pointer accent-ink"
        />
      </div>
    )
  }

  if (ctrl.type === "segmented") {
    return (
      <div className="grid gap-1.5">
        <Label>{ctrl.label}</Label>
        <div className="inline-flex w-fit rounded-lg border border-hairline bg-surface p-0.5">
          {ctrl.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={value === o.value}
              className={cn(
                "rounded-md px-3 py-1 text-[12.5px] font-medium transition-colors duration-[var(--dur-fast)]",
                value === o.value ? "bg-canvas text-ink shadow-elev-1" : "text-ink-3 hover:text-ink",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // toggle
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <Label htmlFor={fieldId}>{ctrl.label}</Label>
        {ctrl.hint && <p className="m-0 mt-0.5 text-[11.5px] text-ink-4">{ctrl.hint}</p>}
      </div>
      <Switch id={fieldId} checked={Boolean(value)} onCheckedChange={(v) => onChange(v)} />
    </div>
  )
}
