import { Kbd, KbdGroup } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

/**
 * Showcase route for `<Kbd>` / `<KbdGroup>` (formerly `<Keycap>` / `<KeycapGroup>`).
 * The legacy names are kept as deprecated aliases — they still work, but new
 * code should import `Kbd` / `KbdGroup`.
 */
export function KeycapPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Kbd"
        status="stable"
        description="Inline keyboard hints. Inset-shadow style mimics a real key. Use KbdGroup for combinations. The legacy <Keycap> / <KeycapGroup> names still work as deprecated aliases."
      />

      <Section title="Sizes">
        <Demo
          code={`<Kbd size="sm">⌘</Kbd>
<Kbd size="md">⌘</Kbd>
<Kbd size="lg">⌘</Kbd>`}
        >
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="md">⌘</Kbd>
          <Kbd size="lg">⌘</Kbd>
        </Demo>
      </Section>

      <Section title="Combinations">
        <Demo
          code={`<KbdGroup>
  <Kbd mod /><Kbd>K</Kbd>
</KbdGroup>
<KbdGroup>
  <Kbd mod /><Kbd>Shift</Kbd><Kbd>P</Kbd>
</KbdGroup>`}
        >
          <KbdGroup>
            <Kbd mod />
            <Kbd>K</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd mod />
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Esc</Kbd>
          </KbdGroup>
        </Demo>
      </Section>

      <Section
        title="Common shortcuts"
        description="Mod auto-renders ⌘ on macOS, Ctrl elsewhere."
      >
        <div className="grid w-full max-w-md gap-2 rounded-md border border-hairline bg-canvas p-4">
          {[
            ["Open command palette", ["mod", "K"]],
            ["Save", ["mod", "S"]],
            ["Toggle theme", ["T"]],
            ["Open shortcuts", ["?"]],
            ["Close", ["Esc"]],
          ].map(([action, keys]) => (
            <div
              key={action as string}
              className="flex items-center justify-between text-[13px]"
            >
              <span className="text-ink-2">{action}</span>
              <KbdGroup>
                {(keys as string[]).map((k, i) =>
                  k === "mod" ? <Kbd key={i} mod /> : <Kbd key={i}>{k}</Kbd>
                )}
              </KbdGroup>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Migration note">
        <p className="text-[13px] text-ink-3">
          Both <code>Keycap</code> / <code>KeycapGroup</code> and
          <code>Kbd</code> / <code>KbdGroup</code> reference the same
          implementation. Existing code keeps working. Prefer the new names
          for new work — they match the HTML <code>&lt;kbd&gt;</code> element.
        </p>
      </Section>
    </div>
  )
}
