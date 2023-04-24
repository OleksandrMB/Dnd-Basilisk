import { z } from 'zod'

export const fifthEditionSourceId = 'cldf2hu58000012rsqwnvrlu4'

export const createCharacterClassSchema = z
  .object({
    name: z.string(),
    hitDice: z.literal(6).or(z.literal(8)).or(z.literal(10)).or(z.literal(12)),
    coverImage: z.string().url(),
    sourceId: z.string()
  })
  .strict()

export type CharacterClassInput = z.infer<typeof createCharacterClassSchema>
