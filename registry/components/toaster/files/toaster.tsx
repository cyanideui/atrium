import * as React from "react"
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner"
import {
  CheckmarkCircle02Icon,
  Alert02Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  MultiplicationSignIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

/**
 * <Toaster> — design.md §5.10
 * Wraps Sonner with our token-based styling. Mount once at the app root.
 * Trigger via the `toast` re-export below.
 */

export interface ToasterProps {
  /** Default position. design.md prefers top-right. */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
  /** Stack offset between toasts in px. */
  offset?: number
  /** Max simultaneous toasts. */
  visibleToasts?: number
  /** Auto-dismiss duration in ms (default: 4000). Errors persist by default. */
  duration?: number
  /** Show close button on every toast. */
  closeButton?: boolean
}

export function Toaster({
  position = "top-right",
  offset = 16,
  visibleToasts = 4,
  duration = 4000,
  closeButton = false,
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      offset={offset}
      visibleToasts={visibleToasts}
      duration={duration}
      closeButton={closeButton}
      icons={{
        success: <Icon icon={CheckmarkCircle02Icon} size={16} className="text-tone-success-fg" />,
        info: <Icon icon={InformationCircleIcon} size={16} className="text-tone-info-fg" />,
        warning: <Icon icon={Alert02Icon} size={16} className="text-tone-attention-fg" />,
        error: <Icon icon={AlertCircleIcon} size={16} className="text-tone-critical-fg" />,
        close: <Icon icon={MultiplicationSignIcon} size={14} />,
      }}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: cn(
            "flex w-[360px] gap-3 rounded-md border border-hairline bg-canvas p-3 text-[13px] text-ink shadow-elev-3",
            "data-[type=success]:bg-tone-success-bg data-[type=success]:border-transparent data-[type=success]:text-tone-success-fg",
            "data-[type=info]:bg-tone-info-bg data-[type=info]:border-transparent data-[type=info]:text-tone-info-fg",
            "data-[type=warning]:bg-tone-attention-bg data-[type=warning]:border-transparent data-[type=warning]:text-tone-attention-fg",
            "data-[type=error]:bg-tone-critical-bg data-[type=error]:border-transparent data-[type=error]:text-tone-critical-fg"
          ),
          title: "font-medium",
          description: "text-[12px] opacity-80 mt-0.5",
          actionButton:
            "rounded-sm bg-ink px-2 py-1 text-[12px] font-medium text-canvas hover:opacity-90 transition-opacity",
          cancelButton:
            "rounded-sm bg-transparent px-2 py-1 text-[12px] font-medium text-ink-2 hover:bg-surface transition-colors",
          closeButton:
            "absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-sm text-ink-3 hover:bg-black/5 hover:text-ink dark:hover:bg-white/5 transition-colors",
          icon: "shrink-0 mt-0.5",
        },
      }}
    />
  )
}

export const toast: typeof sonnerToast = sonnerToast
