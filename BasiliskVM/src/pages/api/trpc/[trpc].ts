import { createNextApiHandler } from '@trpc/server/adapters/next'

import { createContext } from '../../../server/trpc/context'
import { appRouter } from '../../../server/trpc/router/_app'
import withHighlight from '../highlight'

const trpcHandler = createNextApiHandler({
  router: appRouter,
  createContext
})

export default withHighlight(trpcHandler)
