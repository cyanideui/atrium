import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "../lib/cn"
import { Checkbox } from "./checkbox"

/**
 * <ChoiceList> — design.md §5.4
 *
 * Grouped radios (single-select) or checkboxes (multi-select) with shared
 * label and help text. Two visual variants:
 *
 *   - `plain` (default): minimal — control + label, hover lifts the row bg.
 *   - `card`: each row is a 1px-bordered card. Hover deepens the border;
 *     the selected row gets an `--ink` border, soft inset shadow, and a
 *     `--surface-2` wash so the choice reads as picked.
 *
 * Tone (single-select radios mirror Checkbox tones — default | success |
 * warning | critical | info) maps the indicator color and the card "active"
 * border / wash. Tone defaults to `default` (ink).
 *
 * The component preserves the v3.21 API — `type="single" | "multiple"`,
 * controlled and uncontrolled, descriptions, disabled at group + per-choice.
 */

export interface Choice {
  value: string
  label: React.ReactNode
  /** Optional description rendered below the label. */
  description?: React.ReactNode
  disabled?: boolean
}

export type ChoiceListVariant = "plain" | "card"
export type ChoiceListTone =
  | "default"
  | "success"
  | "warning"
  | "critical"
  | "info"

export interface ChoiceListBaseProps {
  /** Group label rendered above the items. */
  label?: React.ReactNode
  /** Help text rendered below the label. */
  helpText?: React.ReactNode
  choices: Choice[]
  disabled?: boolean
  /** Visual variant. `plain` — minimal row; `card` — bordered surface per row. */
  variant?: ChoiceListVariant
  /** Tone for the control + selected card highlight. Default `default` (ink). */
  tone?: ChoiceListTone
  className?: string
}

export interface ChoiceListSingleProps extends ChoiceListBaseProps {
  type?: "single"
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export interface ChoiceListMultipleProps extends ChoiceListBaseProps {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
}

export type ChoiceListProps = ChoiceListSingleProps | ChoiceListMultipleProps

const toneRingClasses: Record<ChoiceListTone, string> = {
  default: "focus-visible:ring-ink",
  success: "focus-visible:ring-success",
  warning: "focus-visible:ring-warning",
  critical: "focus-visible:ring-error",
  info: "focus-visible:ring-info",
}

/* Direction B (filled-on-checked) — the entire 18×18 fills with the tone
 * color when the radio is selected. The indicator becomes a 9px white dot
 * with a subtle gradient so it reads as raised, like the switch thumb. */
const toneFillClasses: Record<ChoiceListTone, string> = {
  default: "data-[state=checked]:bg-ink data-[state=checked]:border-ink",
  success: "data-[state=checked]:bg-success data-[state=checked]:border-success",
  warning: "data-[state=checked]:bg-warning data-[state=checked]:border-warning",
  critical: "data-[state=checked]:bg-error data-[state=checked]:border-error",
  info: "data-[state=checked]:bg-info data-[state=checked]:border-info",
}

/* ---------------- Row chrome ---------------- */

function ChoiceRow({
  control,
  label,
  description,
  disabled,
  htmlFor,
  variant,
  active,
  tone,
}: {
  control: React.ReactNode
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  htmlFor: string
  variant: ChoiceListVariant
  /** Whether this row is currently selected (controls the card highlight). */
  active?: boolean
  tone: ChoiceListTone
}) {
  // Tone-driven active classes for the card variant.
  const cardActiveByTone: Record<ChoiceListTone, string> = {
    default: "border-ink bg-surface-2/60",
    success: "border-success bg-tone-success-bg/40",
    warning: "border-warning bg-tone-warning-bg/40",
    critical: "border-error bg-tone-critical-bg/40",
    info: "border-info bg-tone-info-bg/40",
  }

  return (
    <label
      htmlFor={htmlFor}
      data-active={active || undefined}
      className={cn(
        "group/choice flex cursor-pointer items-start gap-3",
        "transition-[background-color,border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
        variant === "plain" && [
          "rounded-sm py-1.5 px-1",
          // Subtle full-row hover bg so the whole row is the affordance.
          "hover:bg-surface/60",
        ],
        variant === "card" && [
          "rounded-md border border-hairline bg-canvas py-2.5 px-3",
          "shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]",
          "hover:border-ink-3",
          // Active card — tone-driven border + soft tinted wash.
          active && cardActiveByTone[tone],
          active && "shadow-[inset_0_0_0_1px_currentColor,0_1px_0_0_rgba(0,0,0,0.02)]",
        ],
        disabled && "cursor-not-allowed opacity-50 hover:bg-transparent hover:border-hairline"
      )}
    >
      <span className="mt-px shrink-0">{control}</span>
      <span className="flex min-w-0 flex-col gap-0.5 leading-snug">
        <span className="text-[13px] font-medium text-ink">{label}</span>
        {description && (
          <span className="text-[12px] text-ink-3">{description}</span>
        )}
      </span>
    </label>
  )
}

/* ---------------- Public component ---------------- */

export const ChoiceList = (props: ChoiceListProps) => {
  const {
    label,
    helpText,
    choices,
    disabled,
    className,
    variant = "plain",
    tone = "default",
  } = props
  const id = React.useId()

  const gap = variant === "card" ? "gap-2" : "gap-0.5"

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <div className="mb-2 text-[13px] font-medium text-ink">{label}</div>
      )}
      {helpText && (
        <div className="mb-2 text-[12px] text-ink-3">{helpText}</div>
      )}

      {props.type === "multiple" ? (
        <ChoiceListMulti
          {...props}
          id={id}
          disabled={disabled}
          variant={variant}
          tone={tone}
          gap={gap}
        />
      ) : (
        <ChoiceListSingle
          {...(props as ChoiceListSingleProps)}
          id={id}
          disabled={disabled}
          variant={variant}
          tone={tone}
          gap={gap}
        />
      )}
    </div>
  )
}
ChoiceList.displayName = "ChoiceList"

/* ---------------- Single (radio) ---------------- */

function ChoiceListSingle({
  choices,
  value: controlled,
  defaultValue,
  onChange,
  disabled,
  id,
  variant,
  tone,
  gap,
}: ChoiceListSingleProps & {
  id: string
  variant: ChoiceListVariant
  tone: ChoiceListTone
  gap: string
}) {
  const [internal, setInternal] = React.useState<string | undefined>(defaultValue)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : internal

  return (
    <RadioGroupPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => {
        if (!isControlled) setInternal(v)
        onChange?.(v)
      }}
      disabled={disabled}
      className={cn("flex flex-col", gap)}
    >
      {choices.map((choice) => {
        const itemId = `${id}-${choice.value}`
        const isActive = value === choice.value
        return (
          <ChoiceRow
            key={choice.value}
            htmlFor={itemId}
            label={choice.label}
            description={choice.description}
            disabled={disabled || choice.disabled}
            variant={variant}
            tone={tone}
            active={isActive}
            control={
              <RadioGroupPrimitive.Item
                id={itemId}
                value={choice.value}
                disabled={choice.disabled}
                className={cn(
                  // Flex-centering on the Item itself so the indicator (and
                  // its dot) always lands at the geometric center, no matter
                  // the border width or sub-pixel rounding.
                  "ds-radio peer relative inline-flex h-[18px] w-[18px] shrink-0 cursor-pointer items-center justify-center rounded-pill",
                  "border-[1.5px] border-hairline-strong bg-canvas",
                  "transition-[background,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
                  "hover:border-ink-3",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                  toneRingClasses[tone],
                  toneFillClasses[tone],
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                <RadioGroupPrimitive.Indicator
                  forceMount
                  className={cn(
                    "flex items-center justify-center",
                    "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-emphasis)]",
                    "data-[state=unchecked]:scale-50 data-[state=unchecked]:opacity-0",
                    "data-[state=checked]:scale-100 data-[state=checked]:opacity-100"
                  )}
                >
                  <span className="ds-radio-dot block h-[10px] w-[10px] rounded-pill" />
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>
            }
          />
        )
      })}
    </RadioGroupPrimitive.Root>
  )
}

/* ---------------- Multiple (checkbox) ---------------- */

function ChoiceListMulti({
  choices,
  value: controlled,
  defaultValue,
  onChange,
  disabled,
  id,
  variant,
  tone,
  gap,
}: ChoiceListMultipleProps & {
  id: string
  variant: ChoiceListVariant
  tone: ChoiceListTone
  gap: string
}) {
  const [internal, setInternal] = React.useState<string[]>(defaultValue ?? [])
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : internal

  const toggle = (v: string, checked: boolean | "indeterminate") => {
    const next = checked === true ? [...value, v] : value.filter((x) => x !== v)
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div className={cn("flex flex-col", gap)}>
      {choices.map((choice) => {
        const itemId = `${id}-${choice.value}`
        const isActive = value.includes(choice.value)
        return (
          <ChoiceRow
            key={choice.value}
            htmlFor={itemId}
            label={choice.label}
            description={choice.description}
            disabled={disabled || choice.disabled}
            variant={variant}
            tone={tone}
            active={isActive}
            control={
              <Checkbox
                id={itemId}
                tone={tone}
                disabled={disabled || choice.disabled}
                checked={isActive}
                onCheckedChange={(checked) => toggle(choice.value, checked)}
              />
            }
          />
        )
      })}
    </div>
  )
}
