import { useState } from "react"
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonTable,
  SkeletonList,
  SkeletonCard,
  Button,
  type SkeletonAnimation,
} from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function SkeletonPage() {
  const [anim, setAnim] = useState<SkeletonAnimation>("shimmer")

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="Skeleton"
        status="stable"
        description="Loader family. Base block + composed helpers (Text, Avatar, Button, Table, List, Card). Two animations: shimmer (default) and pulse."
      />

      <Section title="Animation">
        <div className="mb-3 flex gap-2">
          <Button
            variant={anim === "shimmer" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setAnim("shimmer")}
          >
            Shimmer
          </Button>
          <Button
            variant={anim === "pulse" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setAnim("pulse")}
          >
            Pulse
          </Button>
          <span className="ml-2 self-center text-[12px] text-ink-3">
            All examples below use this animation.
          </span>
        </div>
      </Section>

      <Section title="Base">
        <Demo
          code={`<Skeleton className="h-4 w-40" />
<Skeleton shape="pill" className="h-6 w-20" />
<Skeleton shape="circle" className="h-10 w-10" />`}
        >
          <Skeleton animation={anim} className="h-4 w-40" />
          <Skeleton animation={anim} shape="pill" className="h-6 w-24" />
          <Skeleton animation={anim} shape="circle" className="h-10 w-10" />
        </Demo>
      </Section>

      <Section title="SkeletonText">
        <Demo
          code={`<SkeletonText lines={4} />`}
        >
          <div className="w-full max-w-md">
            <SkeletonText animation={anim} lines={4} />
          </div>
        </Demo>
      </Section>

      <Section title="SkeletonAvatar">
        <Demo
          code={`<SkeletonAvatar size="md" />`}
        >
          <SkeletonAvatar animation={anim} size="xs" />
          <SkeletonAvatar animation={anim} size="sm" />
          <SkeletonAvatar animation={anim} size="md" />
          <SkeletonAvatar animation={anim} size="lg" />
          <SkeletonAvatar animation={anim} size="xl" />
        </Demo>
      </Section>

      <Section title="SkeletonButton">
        <Demo code={`<SkeletonButton size="md" />`}>
          <SkeletonButton animation={anim} size="micro" />
          <SkeletonButton animation={anim} size="sm" />
          <SkeletonButton animation={anim} size="md" />
          <SkeletonButton animation={anim} size="lg" />
        </Demo>
      </Section>

      <Section title="SkeletonTable" description="Drop into any data table while loading.">
        <Demo code={`<SkeletonTable rows={5} cols={4} />`}>
          <SkeletonTable animation={anim} rows={5} cols={5} />
        </Demo>
      </Section>

      <Section title="SkeletonList">
        <Demo code={`<SkeletonList items={5} leading trailing />`}>
          <div className="w-full max-w-md rounded-md border border-hairline bg-canvas">
            <SkeletonList animation={anim} items={5} leading trailing />
          </div>
        </Demo>
      </Section>

      <Section title="SkeletonCard">
        <Demo code={`<SkeletonCard />`}>
          <SkeletonCard animation={anim} />
        </Demo>
      </Section>
    </div>
  )
}
