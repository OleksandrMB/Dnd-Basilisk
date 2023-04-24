import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { createCharacterClassSchema } from '../../../validators/characterClass'

const characterClassRouter = router({
  create: protectedProcedure
    .input(createCharacterClassSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.characterClass.create({
        data: {
          name: input.name,
          hitDice: input.hitDice,
          sourceId: input.sourceId,
          coverImage: input.coverImage
        }
      })
    }),

  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.characterClass.findMany({
      select: {
        id: true,
        name: true,
        hitDice: true,
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
      return ctx.prisma.characterClass.findFirst({
        where: {
          id: input.id
        }
      })
    })
})

export default characterClassRouter
