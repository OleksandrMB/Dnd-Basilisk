import { z } from 'zod'

export const fifthEditionSourceId = 'cldf2hu58000012rsqwnvrlu4'

export const createCharacterRaceSchema = z
  .object({
    name: z.string(),
    coverImage: z.string().url(),
    sourceId: z.string()
  })
  .strict()

export type CharacterRaceInput = z.infer<typeof createCharacterRaceSchema>
