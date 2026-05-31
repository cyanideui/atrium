import * as React from "react"
import { Button, Checkbox, Icon, Input, Label } from "@cyanideui/ui"
import { GoogleIcon, GithubIcon } from "@hugeicons/core-free-icons"
import { PageHeader, Section } from "../../components/page-shell"
import { CodeBlock } from "../../components/code-block"

export function AuthCardBlock() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [remember, setRemember] = React.useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Blocks"
        title="Auth card"
        status="stable"
        description="Centered sign-in card — brand mark, SSO buttons, email + password form, remember-me + forgot-password row, and a footer link. Drop on a full-height centered page."
      />

      <Section title="Preview">
        <div className="flex justify-center rounded-md border border-hairline bg-surface p-8">
          <div className="w-full max-w-[400px] rounded-lg border border-hairline bg-canvas p-6 shadow-elev-1 sm:p-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-[16px] font-bold text-canvas">A</span>
              <div>
                <h1 className="m-0 text-[18px] font-semibold tracking-tight text-ink">Welcome back</h1>
                <p className="mt-1 text-[13px] text-ink-3">Sign in to your Atrium workspace.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button variant="secondary" block leading={<Icon icon={GoogleIcon} size="sm" />}>Continue with Google</Button>
              <Button variant="secondary" block leading={<Icon icon={GithubIcon} size="sm" />}>Continue with GitHub</Button>
            </div>
            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-hairline" />
              <span className="text-[11px] uppercase tracking-wider text-ink-4">or</span>
              <span className="h-px flex-1 bg-hairline" />
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-1.5">
                <Label htmlFor="demo-email">Email</Label>
                <Input id="demo-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="demo-pw">Password</Label>
                  <a href="#" className="text-[12px] font-medium text-ink-3 no-underline hover:text-ink">Forgot password?</a>
                </div>
                <Input id="demo-pw" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-2">
                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(v === true)} />
                Remember me for 30 days
              </label>
              <Button type="submit" block>Sign in</Button>
            </form>
            <p className="mt-5 text-center text-[13px] text-ink-3">
              Don&apos;t have an account?{" "}
              <a href="#" className="font-medium text-ink no-underline hover:underline">Create one</a>
            </p>
          </div>
        </div>
      </Section>

      <Section title="Install">
        <CodeBlock language="bash" code={`npx cyanideui add auth-card`} />
      </Section>
    </>
  )
}
