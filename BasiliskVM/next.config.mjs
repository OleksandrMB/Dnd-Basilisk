// @ts-check
import { withHighlightConfig } from '@highlight-run/next'
import { withAxiom } from 'next-axiom'

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
/* eslint-disable @typescript-eslint/no-unused-expressions */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  compiler: {
    emotion: true
  }
}

const axiomConfig = withAxiom({ ...config })
const highlightConfig = withHighlightConfig(axiomConfig)

export default highlightConfig
