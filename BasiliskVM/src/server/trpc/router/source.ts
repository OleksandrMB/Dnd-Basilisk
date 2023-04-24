import { router, publicProcedure } from '../trpc'

const sourceRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.source.findMany())
})

export default sourceRouter
