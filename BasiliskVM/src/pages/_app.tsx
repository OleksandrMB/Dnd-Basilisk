/* eslint-disable react/prop-types, react/jsx-props-no-spreading */

import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { H } from 'highlight.run'
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles'
import { barlowCondensed } from '../styles/fonts'
import { trpc } from '../utils/trpc'

import { env } from '../env/client.mjs'
import '../styles/globals.css'

export { reportWebVitals } from 'next-axiom'

if (process.env.NODE_ENV === 'production') {
  H.init(env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID, {
    tracingOrigins: true,
    networkRecording: {
      enabled: true,
      recordHeadersAndBody: true
    }
  })
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => (
  <>
    <style jsx global>
      {`
        html {
          font-family: ${barlowCondensed.style.fontFamily};
        }
      `}
    </style>
    <SessionProvider session={session}>
      <StyledEngineProvider>
        <CssVarsProvider>
          <Component {...pageProps} />
        </CssVarsProvider>
      </StyledEngineProvider>
    </SessionProvider>
  </>
)

export default trpc.withTRPC(MyApp)
