import * as React from "react"
import {
  createHighlighterCore,
  type HighlighterCore,
} from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import { Icon, cn } from "@atrium/ui"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { useTheme } from "../hooks/use-theme"

interface CodeBlockProps {
  code: string
  language?: "tsx" | "ts" | "css" | "html" | "bash" | "json"
  className?: string
}

/**
 * Lazy, single-instance Shiki highlighter limited to the languages we ship in
 * the playground. Avoids pulling in 200+ language grammars (Wolfram, Cobol, …)
 * that the default `shiki` bundle ships, dropping the production bundle by
 * ~9 MB.
 */
let highlighterPromise: Promise<HighlighterCore> | null = null
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [
        import("@shikijs/themes/github-light"),
        import("@shikijs/themes/github-dark-dimmed"),
      ],
      langs: [
        import("@shikijs/langs/tsx"),
        import("@shikijs/langs/typescript"),
        import("@shikijs/langs/css"),
        import("@shikijs/langs/html"),
        import("@shikijs/langs/bash"),
        import("@shikijs/langs/json"),
      ],
      engine: createJavaScriptRegexEngine(),
    })
  }
  return highlighterPromise
}

const LANG_ALIAS: Record<string, string> = { ts: "typescript" }

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const { theme } = useTheme()
  const [html, setHtml] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    getHighlighter().then((hl) => {
      if (cancelled) return
      const lang = LANG_ALIAS[language] ?? language
      const out = hl.codeToHtml(code, {
        lang,
        theme: theme === "dark" ? "github-dark-dimmed" : "github-light",
        transformers: [
          {
            pre(node) {
              const props = node.properties as Record<string, unknown>
              const existing = (props["style"] as string | undefined) ?? ""
              props["style"] = `${existing}; background: transparent;`
            },
          },
        ],
      })
      if (!cancelled) setHtml(out)
    })
    return () => {
      cancelled = true
    }
  }, [code, language, theme])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={cn(
        "relative my-4 overflow-hidden rounded-md border border-hairline bg-surface",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-hairline px-3 py-1.5 text-[11px] uppercase tracking-wider text-ink-3">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className={cn(
            "flex h-6 items-center gap-1.5 rounded-sm px-1.5 text-[11px] text-ink-3",
            "transition-[background-color,color,transform] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
            "hover:bg-surface-2 hover:text-ink active:scale-95"
          )}
        >
          <Icon icon={copied ? Tick02Icon : Copy01Icon} size={12} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div
        className="overflow-x-auto p-4 text-[12.5px] leading-relaxed [&_pre]:m-0 [&_pre]:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
