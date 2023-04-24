import { z } from 'zod'
import { router, protectedProcedure, publicProcedure } from '../trpc'
import { createItemSchema } from '../../../validators/item'

const itemRouter = router({
  create: protectedProcedure
    .input(createItemSchema)
    .mutation(async ({ ctx, input }) => {
      const attributesConnections = input.attributes.map((attribute) => {
        return { id: attribute }
      })

      return ctx.prisma.item.create({
        data: {
          name: input.name,
          sourceId: input.sourceId,
          itemTypeId: input.itemTypeId,
          attributes: {
            connect: attributesConnections
          }
        }
      })
    }),

  getItemTypes: publicProcedure.query(({ ctx }) =>
    ctx.prisma.itemType.findMany({
      select: {
        id: true,
        name: true
      }
    })
  ),

  getItemAttributes: publicProcedure.query(({ ctx }) =>
    ctx.prisma.attributes.findMany({
      select: {
        id: true,
        name: true
      }
    })
  ),

  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.item.findMany({
      select: {
        id: true,
        name: true
      }
    })
  ),

  getItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.item.findFirst({
        where: {
          id: input.id
        },
        select: {
          name: true,
          source: {
            select: {
              name: true
            }
          },
          attributes: {
            select: {
              name: true
            }
          }
        }
      })
    })
})
export default itemRouter
