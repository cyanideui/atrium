// @atrium:if next
"use client"
// @atrium:endif

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as React from "react"
import { GoogleIcon, GithubIcon } from "@hugeicons/core-free-icons"

/**
 * AuthCard — a centered sign-in card: brand mark, title, SSO buttons, an
 * email + password form, a "remember me" + "forgot password" row, and a
 * footer link. Drop it on a full-height centered page.
 *
 * Wire `onSubmit` to your auth provider; swap the SSO handlers for real ones.
 */

export interface AuthCardProps {
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void
  onGoogle?: () => void
  onGithub?: () => void
}

export function AuthCard({ onSubmit, onGoogle, onGithub }: AuthCardProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [remember, setRemember] = React.useState(false)

  return (
    <div className="w-full max-w-[400px] rounded-lg border border-hairline bg-canvas p-6 shadow-elev-1 sm:p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-[16px] font-bold text-canvas">
          A
        </span>
        <div>
          <h1 className="m-0 text-[18px] font-semibold tracking-tight text-ink">Welcome back</h1>
          <p className="mt-1 text-[13px] text-ink-3">Sign in to your Atrium workspace.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Button variant="secondary" block leading={<Icon icon={GoogleIcon} size="sm" />} onClick={onGoogle}>
          Continue with Google
        </Button>
        <Button variant="secondary" block leading={<Icon icon={GithubIcon} size="sm" />} onClick={onGithub}>
          Continue with GitHub
        </Button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-hairline" />
        <span className="text-[11px] uppercase tracking-wider text-ink-4">or</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.({ email, password, remember })
        }}
      >
        <div className="grid gap-1.5">
          <Label htmlFor="auth-email">Email</Label>
          <Input
            id="auth-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="auth-password">Password</Label>
            <a href="#" className="text-[12px] font-medium text-ink-3 no-underline hover:text-ink">
              Forgot password?
            </a>
          </div>
          <Input
            id="auth-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-2">
          <Checkbox checked={remember} onCheckedChange={(v) => setRemember(v === true)} />
          Remember me for 30 days
        </label>
        <Button type="submit" block>Sign in</Button>
      </form>

      <p className="mt-5 text-center text-[13px] text-ink-3">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-medium text-ink no-underline hover:underline">
          Create one
        </a>
      </p>
    </div>
  )
}
