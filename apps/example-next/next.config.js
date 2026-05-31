/**
 * Next.js needs to transpile workspace packages that ship as raw TS / TSX.
 * `@atrium/ui` ships pre-built (dist/index.js + dist/index.d.ts), so this
 * isn't strictly required — but it's the safe default for monorepo
 * consumers and lets Next.js tree-shake unused exports more aggressively.
 *
 * @type {import('next').NextConfig}
 */
const config = {
  transpilePackages: ["@atrium/ui"],
  reactStrictMode: true,
}

module.exports = config
