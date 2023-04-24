import { router } from '../trpc'
import authRouter from './auth'
import characterClassRouter from './characterClass'
import itemRouter from './item'
import characterRaceRouter from './characterRace'
import spellRouter from './spell'
import sourceRouter from './source'

export const appRouter = router({
  auth: authRouter,
  source: sourceRouter,
  characterClass: characterClassRouter,
  item: itemRouter,
  characterRace: characterRaceRouter,
  spell: spellRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
