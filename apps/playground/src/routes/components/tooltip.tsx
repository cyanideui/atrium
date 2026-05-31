import {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  Button,
  Keycap,
  KeycapGroup,
} from "@cyanideui/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function TooltipPage() {
  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Tooltip"
        status="stable"
        description="Hover hint. Dark bg, 12px label, 6px arrow, fade + 4px slide from anchor side."
      />

      <Section title="Directions">
        <Demo
          code={`<Tooltip content="Appears above" side="top">
  <Button variant="secondary">Hover</Button>
</Tooltip>`}
          align="center"
        >
          <Tooltip content="Appears above" side="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Appears below" side="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Appears to the left" side="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content="Appears to the right" side="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
        </Demo>
      </Section>

      <Section title="With keyboard shortcut">
        <Demo
          code={`<Tooltip content={<span className="flex items-center gap-2">Bold <KeycapGroup><Keycap mod /><Keycap>B</Keycap></KeycapGroup></span>}>
  <Button>B</Button>
</Tooltip>`}
          align="center"
        >
          <Tooltip
            content={
              <span className="inline-flex items-center gap-2">
                Bold
                <KeycapGroup>
                  <Keycap size="sm" mod />
                  <Keycap size="sm">B</Keycap>
                </KeycapGroup>
              </span>
            }
          >
            <Button variant="secondary">B</Button>
          </Tooltip>
          <Tooltip
            content={
              <span className="inline-flex items-center gap-2">
                Italic
                <KeycapGroup>
                  <Keycap size="sm" mod />
                  <Keycap size="sm">I</Keycap>
                </KeycapGroup>
              </span>
            }
          >
            <Button variant="secondary">I</Button>
          </Tooltip>
        </Demo>
      </Section>

      <Section title="Composing primitives" description="Use TooltipProvider + Root + Trigger + Content for full control.">
        <Demo
          code={`<TooltipProvider delayDuration={100}>
  <TooltipRoot>
    <TooltipTrigger asChild><Button>Hover me</Button></TooltipTrigger>
    <TooltipContent>Tooltip content</TooltipContent>
  </TooltipRoot>
</TooltipProvider>`}
          align="center"
        >
          <TooltipProvider delayDuration={100}>
            <TooltipRoot>
              <TooltipTrigger asChild>
                <Button variant="secondary">Hover (100ms delay)</Button>
              </TooltipTrigger>
              <TooltipContent>Custom delay via Provider</TooltipContent>
            </TooltipRoot>
          </TooltipProvider>
        </Demo>
      </Section>
    </div>
  )
}
