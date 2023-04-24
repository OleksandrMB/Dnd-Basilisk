/* eslint-disable no-param-reassign */
import NextAuth, { type NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { log } from 'next-axiom'
import env from '../../../env/server.mjs'
import prisma from '../../../server/db/client'
import withHighlight from '../highlight'

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    })
  ],

  debug: true,
  logger: {
    error(code, metadata) {
      if (process.env.NODE_ENV === 'production') {
        log.error(code, metadata)
      }
    },
    warn(code) {
      if (process.env.NODE_ENV === 'production') {
        log.warn(code)
      }
    }
  }
}

export default withHighlight(NextAuth(authOptions))
