import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { Tick02Icon } from "@hugeicons/core-free-icons"

/**
 * PricingCards — a responsive row of plan cards. Each has a name, price,
 * description, a feature checklist, and a CTA. One plan can be `featured`
 * (highlighted border + badge). Swap PLANS for your tiers.
 */

interface Plan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For individuals trying things out.",
    features: ["1 workspace", "Up to 3 projects", "Community support", "1 GB storage"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    description: "For growing teams that need more.",
    features: ["Unlimited projects", "Priority support", "Advanced analytics", "50 GB storage", "Custom roles"],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with scale + compliance needs.",
    features: ["SSO / SAML", "Audit logs", "Dedicated manager", "Unlimited storage", "SLA"],
    cta: "Contact sales",
  },
]

export function PricingCards() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "flex flex-col rounded-lg border bg-canvas p-5",
            plan.featured
              ? "border-ink shadow-elev-2"
              : "border-hairline",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="m-0 text-[15px] font-semibold text-ink">{plan.name}</h3>
            {plan.featured && <Badge tone="info" size="sm">Most popular</Badge>}
          </div>
          <p className="mt-1 text-[12.5px] text-ink-3">{plan.description}</p>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-[28px] font-semibold tracking-tight text-ink">{plan.price}</span>
            {plan.period && <span className="text-[13px] text-ink-3">{plan.period}</span>}
          </div>

          <Button
            variant={plan.featured ? "primary" : "secondary"}
            block
            className="mt-4"
          >
            {plan.cta}
          </Button>

          <ul className="mt-5 flex flex-col gap-2.5 border-t border-hairline pt-5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-ink-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-pill bg-tone-success-bg text-tone-success-fg">
                  <Icon icon={Tick02Icon} size={10} strokeWidth={2.5} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
