import { z } from 'zod'

export enum Level {
  Cantrip,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine
}

export enum SpellSchool {
  Evocation = 'Evocation',
  Abjuration = 'Abjuration',
  Conjuration = 'Conjuration',
  Transmutation = 'Transmutation',
  Divination = 'Divination',
  Enchantment = 'Enchantment',
  Necromancy = 'Necromancy'
}

export enum DistanceType {
  Self = 'self',
  Sight = 'sight',
  Unlimited = 'unlimited',
  Touch = 'touch',
  Feets = 'feets',
  Miles = 'miles'
}

export enum CastingTimeType {
  BonusAction = 'bonusAction',
  Reaction = 'reaction',
  Action = 'action',
  Rounds = 'rounds',
  Minutes = 'minutes',
  Hours = 'hours'
}

export enum ComponentType {
  Verbal = 'verbal',
  Somatic = 'somatic',
  Material = 'material'
}

export enum DurationUnit {
  Rounds = 'rounds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
  Years = 'years'
}

export enum DurationType {
  None = 'none',
  Instantaneus = 'instantaneous',
  Time = 'time',
  Concentration = 'concentration',
  UntilDispelled = 'untilDispelled',
  UntilDispelledOrTriggered = 'untilDispelledOrTriggered',
  Special = 'special'
}

export enum EffectType {
  None = 'none',
  Attack = 'attack',
  SavingThrow = 'savingThrow',
  ConditionChange = 'conditionChange'
}

export enum AttackType {
  None = 'none',
  Melee = 'melee',
  Ranged = 'ranged',
  Area = 'area',
  Guaranteed = 'guaranteed'
}

export enum DamageType {
  None = 'none',
  Piercing = 'piercing',
  Bludgeoning = 'bludgeoning',
  Acid = 'acid',
  Cold = 'cold',
  Fire = 'fire',
  Force = 'force',
  Lightning = 'lightning',
  Necrotic = 'necrotic',
  Poison = 'poison',
  Psychic = 'psychic',
  Radiant = 'radiant',
  Thunder = 'thunder',
  Slashing = 'slashing'
}

export enum Condition {
  None = 'none',
  Blinded = 'blinded',
  Charmed = 'charmed',
  Deafened = 'deafened',
  Frightened = 'frightened',
  Grappled = 'grappled',
  Incapacitated = 'incapacitated',
  Invisible = 'invisible',
  Paralyzed = 'paralyzed',
  Petrified = 'petrified',
  Poisoned = 'poisoned',
  Prone = 'prone',
  Restrained = 'restrained',
  Stunned = 'stunned',
  Unconscious = 'unconscious',
  Exhaustion = 'exhaustion'
}

export enum DamageScalingType {
  None = 'none',
  PerCharacterLevel = 'perCharacterLevel',
  PerResourceLevel = 'perResourceLevel'
}

export enum SavingThrowType {
  None = 'none',
  Strength = 'strength',
  Dexterity = 'dexterity',
  Constitution = 'constitution',
  Intelligence = 'intelligence',
  Wisdom = 'wisdom',
  Charisma = 'charisma'
}

const spellEffectSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),

  type: z.nativeEnum(EffectType),

  duration: z.object({
    type: z.nativeEnum(DurationType),
    unit: z.nativeEnum(DurationUnit),
    numericValue: z.number().min(0)
  }),

  attack: z
    .object({
      type: z.nativeEnum(AttackType)
    })
    .optional(),

  savingThrow: z
    .object({
      type: z.nativeEnum(SavingThrowType)
    })
    .optional(),

  damage: z
    .object({
      type: z.nativeEnum(DamageType),
      default: z.object({
        diceCount: z.number().min(0),
        facets: z.number().min(0)
      }),

      scaling: z.object({
        type: z.nativeEnum(DamageScalingType),
        values: z.array(
          z.object({
            resourceValue: z.number().min(0),
            diceCount: z.number().min(0),
            facets: z.number().min(0),
            minDamage: z.number().optional()
          })
        )
      })
    })
    .optional(),

  conditionChange: z
    .object({
      conditionToSet: z.nativeEnum(Condition)
    })
    .optional(),

  executeRule: z.any()
})

export const createSpellSchema = z.object({
  name: z.string().min(5),
  illustration: z.string().url().optional(),
  icon: z.string().url().optional(),
  sourceId: z.string().cuid(),
  spellSchool: z.nativeEnum(SpellSchool),
  level: z.nativeEnum(Level),

  isRitual: z.boolean(),
  requiresConcentration: z.boolean(),

  distance: z.object({
    type: z.nativeEnum(DistanceType),
    numericValue: z.number().min(0)
  }),

  castingTime: z.object({
    type: z.nativeEnum(CastingTimeType),
    numericValue: z.number().min(0)
  }),

  components: z.array(
    z.object({
      type: z.nativeEnum(ComponentType),
      name: z.string().optional()
    })
  ),

  classes: z.array(z.string().cuid()),

  // TODO: make sure later, that at least one effect is being created, or think about alternative approaches
  effects: z
    .array(
      z.object({
        data: spellEffectSchema,
        children: z.array(spellEffectSchema).optional()
      })
    )
    .min(0)
})

export type CreateSpellInput = z.infer<typeof createSpellSchema>
