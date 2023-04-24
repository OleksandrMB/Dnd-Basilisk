import { z } from 'zod'

export const fifthEditionSourceId = 'cldf2hu58000012rsqwnvrlu4'

export const createItemSchema = z
  .object({
    name: z.string(),
    sourceId: z.string(),
    itemTypeId: z.string(),
    attributes: z.array(z.string())
  })
  .strict()

export type ItemInput = z.infer<typeof createItemSchema>
