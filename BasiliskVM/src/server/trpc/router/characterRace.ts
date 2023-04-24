import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { createCharacterRaceSchema } from '../../../validators/characterRace'

const characterRaceRouter = router({
  create: protectedProcedure
    .input(createCharacterRaceSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.characterRace.create({
        data: {
          name: input.name,
          sourceId: input.sourceId,
          coverImage: input.coverImage
        }
      })
    }),

  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.characterRace.findMany({
      select: {
        id: true,
        name: true,
        coverImage: true,
        source: {
          select: {
            name: true
          }
        }
      }
    })
  ),

  getDetails: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.characterRace.findFirst({
        where: {
          id: input.id
        }
      })
    })
})

export default characterRaceRouter
