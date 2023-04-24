import { router, protectedProcedure } from '../trpc'
import {
  AttackType,
  Condition,
  createSpellSchema,
  DamageScalingType,
  DamageType,
  SavingThrowType
} from '../../../validators/spell'

const spellRouter = router({
  create: protectedProcedure
    .input(createSpellSchema)
    .mutation(async ({ ctx, input }) => {
      const classConnections = input.classes.map((classId) => {
        return { id: classId }
      })

      const spell = await ctx.prisma.spell.create({
        data: {
          name: input.name,
          sourceId: input.sourceId,
          illustration: input.illustration || '',
          icon: input.icon || '',
          description: '',
          level: input.level,
          school: input.spellSchool,
          isRitual: input.isRitual,
          requiresConcentration: input.requiresConcentration,
          distanceType: input.distance.type,
          distanceNumericValue: input.distance.numericValue,
          castingTimeType: input.castingTime.type,
          castingTimeNumericValue: input.castingTime.numericValue,

          classes: {
            connect: classConnections
          }
        }
      })

      input.components.forEach(async (c) => {
        await ctx.prisma.spellComponent.create({
          data: {
            name: c.name || '',
            type: c.type,
            spellId: spell.id
          }
        })
      })

      console.log(input.effects)

      input.effects.forEach(async ({ data }) => {
        const damageScaling = await ctx.prisma.spellEffectDamageScaling.create({
          data: {
            type: data.damage?.scaling.type || DamageScalingType.None
          }
        })

        data.damage?.scaling.values.forEach(async (scalingValue) => {
          await ctx.prisma.spellEffectDamageScalingValue.create({
            data: {
              spellEffectDamageScalingId: damageScaling.id,
              resourceValue: scalingValue.resourceValue,
              diceCount: scalingValue.diceCount,
              facets: scalingValue.facets,
              minDamage: scalingValue.minDamage
            }
          })
        })

        await ctx.prisma.spellEffect.create({
          data: {
            spellId: spell.id,
            name: data.name,
            type: data.type,

            durationType: data.duration.type,
            durationUnit: data.duration.unit,
            durationNumericValue: data.duration.numericValue,

            attackType: data.attack?.type || AttackType.None,
            damageType: data.damage?.type || DamageType.None,
            spellEffectDamageScalingId: damageScaling.id,

            savingThrowType: data.savingThrow?.type || SavingThrowType.None,
            conditionToSet:
              data.conditionChange?.conditionToSet || Condition.None,

            executeRule: data.executeRule
          }
        })
      })

      return spell
    })
})

export default spellRouter
