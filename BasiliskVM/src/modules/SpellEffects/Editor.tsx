/* eslint-disable react/jsx-props-no-spreading */
import { css } from '@emotion/react'
import { FC } from 'react'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import styled from '@emotion/styled'
import {
  AttackType,
  Condition,
  CreateSpellInput,
  DamageScalingType,
  DamageType,
  DurationType,
  DurationUnit,
  EffectType,
  SavingThrowType
} from '../../validators/spell'

import Typography from '../../ui/Typography'
import FormFieldLabel from '../../ui/FormFieldLabel'
import Combobox from '../../ui/Combobox'
import TextField from '../../ui/TextField'
import ErrorMessage from '../../ui/ErrorMessage'
import Textarea from '../../ui/TextArea'
import Button from '../../ui/Button'

const effectTypeOptions = [
  { label: 'Attack', value: EffectType.Attack },
  { label: 'Saving Throw', value: EffectType.SavingThrow },
  { label: 'Condition change', value: EffectType.ConditionChange }
]

const savingThrowOptions = [
  { label: 'Strength', value: SavingThrowType.Strength },
  { label: 'Dexterity', value: SavingThrowType.Dexterity },
  { label: 'Constitution', value: SavingThrowType.Constitution },
  { label: 'Intelligence', value: SavingThrowType.Intelligence },
  { label: 'Wisdom', value: SavingThrowType.Wisdom },
  { label: 'Charisma', value: SavingThrowType.Charisma }
]

const damageDiceOptions = [
  { label: 'd4', value: 4 },
  { label: 'd6', value: 6 },
  { label: 'd8', value: 8 },
  { label: 'd10', value: 10 },
  { label: 'd12', value: 12 }
]

const durationTypeOptions = [
  { label: 'Instantaneous', value: DurationType.Instantaneus },
  { label: 'Time', value: DurationType.Time },
  { label: 'Concentration', value: DurationType.Concentration },
  { label: 'Until Dispelled', value: DurationType.UntilDispelled },
  {
    label: 'Until Dispelled or Triggered',
    value: DurationType.UntilDispelledOrTriggered
  },
  { label: 'Special', value: DurationType.Special }
]

const durationUnitOptions = [
  { label: 'Rounds', value: DurationUnit.Rounds },
  { label: 'Hours', value: DurationUnit.Hours },
  { label: 'Minutes', value: DurationUnit.Minutes },
  { label: 'Days', value: DurationUnit.Days },
  { label: 'Years', value: DurationUnit.Years }
]

const attackTypeOptions = [
  { label: 'Melee', value: AttackType.Melee },
  { label: 'Ranged', value: AttackType.Ranged },
  { label: 'Area', value: AttackType.Area },
  { label: 'Guaranteed', value: AttackType.Guaranteed }
]

const damageTypeOptions = [
  { label: 'Slashing', value: DamageType.Slashing },
  { label: 'Piercing', value: DamageType.Piercing },
  { label: 'Bludgeoning', value: DamageType.Bludgeoning },
  { label: 'Fire', value: DamageType.Fire },
  { label: 'Cold', value: DamageType.Cold },
  { label: 'Lightning', value: DamageType.Lightning },
  { label: 'Acid', value: DamageType.Acid },
  { label: 'Poison', value: DamageType.Poison },
  { label: 'Thunder', value: DamageType.Thunder },
  { label: 'Force', value: DamageType.Force },
  { label: 'Necrotic', value: DamageType.Necrotic },
  { label: 'Radiant', value: DamageType.Radiant },
  { label: 'Psychic', value: DamageType.Psychic }
]

const scalingTypeOptions = [
  { label: 'No scaling', value: DamageScalingType.None },
  { label: 'Character Level', value: DamageScalingType.PerCharacterLevel },
  { label: 'Spell level', value: DamageScalingType.PerResourceLevel }
]

const conditionToSetOptions = [
  { label: 'Blinded', value: Condition.Blinded },
  { label: 'Charmed', value: Condition.Charmed },
  { label: 'Deafened', value: Condition.Deafened },
  { label: 'Frightened', value: Condition.Frightened },
  { label: 'Grappled', value: Condition.Grappled },
  { label: 'Incapacitated', value: Condition.Incapacitated },
  { label: 'Invisible', value: Condition.Invisible },
  { label: 'Paralyzed', value: Condition.Paralyzed },
  { label: 'Petrified', value: Condition.Petrified },
  { label: 'Poisoned', value: Condition.Poisoned },
  { label: 'Prone', value: Condition.Prone },
  { label: 'Restrained', value: Condition.Restrained },
  { label: 'Stunned', value: Condition.Stunned },
  { label: 'Unconscious', value: Condition.Unconscious },
  { label: 'Exhaustion', value: Condition.Exhaustion }
]

const getDamageScaleValues = (
  scalingType: DamageScalingType,
  defaultDiceCount: number,
  defaultFacets: number
) => {
  const upperBound =
    scalingType === DamageScalingType.PerCharacterLevel ? 20 : 9

  const values = []

  for (let i = 0; i < upperBound; i += 1) {
    values.push({
      resourceValue: i + 1,
      diceCount: defaultDiceCount,
      facets: defaultFacets
    })
  }

  return values
}

const GapRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-end;
`

const Head: FC<{ effects: string[] }> = ({ effects }) => {
  return (
    <div
      css={css`
        height: 60px;
        background-color: #141414;
        display: flex;
        align-items: center;
        padding-right: 30px;
        padding-left: 30px;
      `}
    >
      {effects.length === 0 && (
        <Typography variant="h3" color="text">
          Effects Editor
        </Typography>
      )}

      {effects.map((e) => (
        <Typography variant="h3" color="text">
          {e}
        </Typography>
      ))}
    </div>
  )
}

const DamageScaleValue: FC<{ index: number; valueIndex: number }> = ({
  index,
  valueIndex
}) => {
  const { control } = useFormContext<CreateSpellInput>()

  const effects = useWatch({
    name: 'effects',
    control,
    defaultValue: []
  })

  const title =
    effects[index]?.data.damage?.scaling.type ===
    DamageScalingType.PerCharacterLevel
      ? 'Character Level'
      : 'Spell Cell Level'

  const resourceValue =
    effects[index]?.data.damage?.scaling.values[valueIndex]?.resourceValue

  const id = `${title.replaceAll(' ', '')}-${resourceValue}`

  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 10px;
        padding-left: 60px;
      `}
    >
      <FormFieldLabel
        css={css`
          width: 45px;
        `}
        htmlFor={id}
      >
        <Typography variant="subtitle" color="text">
          Level
        </Typography>
        <TextField
          defaultValue={resourceValue}
          id={id}
          name={id}
          disabled
          css={css`
            width: 42px;
            min-width: 42px;
          `}
        />
      </FormFieldLabel>

      <FormFieldLabel
        css={css`
          width: 45px;
        `}
        htmlFor={`effects.${index}.data.damage.scaling.values.${valueIndex}.diceCount`}
      >
        <Typography variant="subtitle" color="text">
          Count
        </Typography>
        <Controller
          name={
            `effects.${index}.data.damage.scaling.values.${valueIndex}.diceCount` as const
          }
          control={control}
          render={({ field: { onChange, onBlur, name } }) => (
            <TextField
              id={name}
              type="number"
              name={name}
              onChange={(e) => onChange(e.target.valueAsNumber)}
              onBlur={onBlur}
              css={css`
                width: 42px;
                min-width: 42px;
              `}
            />
          )}
        />
      </FormFieldLabel>

      <FormFieldLabel
        htmlFor={`effects.${index}.data.damage.scaling.values.${valueIndex}.facets`}
      >
        <Typography variant="subtitle" color="text">
          Damage Dice
        </Typography>
        <Controller
          name={`effects.${index}.data.damage.scaling.values.${valueIndex}.facets`}
          control={control}
          render={({ field: { onChange, onBlur, name } }) => (
            <Combobox
              id={name}
              name={name}
              onChange={(e, option) => {
                onChange(option.value)
              }}
              onBlur={onBlur}
              placeholder="Select damage dice"
              options={damageDiceOptions}
              forcePopupIcon={false}
            />
          )}
        />
      </FormFieldLabel>
    </div>
  )
}

const Form: FC<{ index: number; setIndex(index: number | null): void }> = ({
  index,
  setIndex
}) => {
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext<CreateSpellInput>()

  const effects = useWatch({
    name: 'effects',
    control,
    defaultValue: []
  })

  const isSavingThrow = effects[index]?.data.type === EffectType.SavingThrow
  const isAttack = effects[index]?.data.type === EffectType.Attack
  const isConditionChange =
    effects[index]?.data.type === EffectType.ConditionChange

  const handleDamageScalingChoice = (scalingType: DamageScalingType) => {
    const diceCount = effects[index]?.data.damage?.default.diceCount || 0
    const facets = effects[index]?.data.damage?.default.facets || 0
    const values = getDamageScaleValues(scalingType, diceCount, facets)

    setValue(`effects.${index}.data.damage.scaling.values`, values)
  }

  return (
    <>
      <FormFieldLabel htmlFor={`effects.${index}.data.name`}>
        <Typography variant="subtitle" color="text">
          Effect name
        </Typography>

        <Controller
          name={`effects.${index}.data.name` as const}
          control={control}
          render={({ field: { onChange, onBlur, name } }) => (
            <TextField
              id="name"
              name={name}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </FormFieldLabel>

      <FormFieldLabel htmlFor={`effects.${index}.data.description`}>
        <Typography variant="subtitle" color="text">
          Effect description
        </Typography>

        <Controller
          name={`effects.${index}.data.description` as const}
          control={control}
          render={({ field: { onChange, onBlur, name } }) => (
            <Textarea
              name={name}
              minRows={2}
              variant="plain"
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </FormFieldLabel>

      <FormFieldLabel>
        <Typography variant="subtitle" color="text">
          Effect type
        </Typography>
        <Controller
          name={`effects.${index}.data.type`}
          control={control}
          render={({ field: { onChange, onBlur, name } }) => (
            <Combobox
              name={name}
              onChange={(e, option) => {
                onChange(option.value)
              }}
              onBlur={onBlur}
              placeholder="Select spell level"
              options={effectTypeOptions}
              forcePopupIcon={false}
              id="effectType"
            />
          )}
        />
      </FormFieldLabel>

      {isSavingThrow && (
        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <FormFieldLabel htmlFor="saving_throw">
            <Typography variant="subtitle" color="text">
              Saving Throw
            </Typography>
            <Controller
              name={`effects.${index}.data.savingThrow.type`}
              control={control}
              render={({ field: { onChange, onBlur, name } }) => (
                <Combobox
                  name={name}
                  onChange={(e, option) => {
                    onChange(option.value)
                  }}
                  onBlur={onBlur}
                  placeholder="Select saving throw"
                  options={savingThrowOptions}
                  forcePopupIcon={false}
                  id="savingThrow"
                />
              )}
            />
          </FormFieldLabel>
        </div>
      )}

      {isAttack && (
        <>
          <FormFieldLabel htmlFor={`effects.${index}.data.attack.type`}>
            <Typography variant="subtitle" color="text">
              Attack type
            </Typography>
            <Controller
              name={`effects.${index}.data.attack.type` as const}
              control={control}
              render={({ field: { onChange, onBlur, name } }) => (
                <Combobox
                  id={name}
                  name={name}
                  onChange={(e, option) => {
                    onChange(option.value)
                  }}
                  onBlur={onBlur}
                  placeholder="Select attack type"
                  options={attackTypeOptions}
                  forcePopupIcon={false}
                />
              )}
            />
          </FormFieldLabel>

          <GapRow>
            <GapRow>
              <FormFieldLabel
                css={css`
                  width: 45px;
                `}
                htmlFor={`effects.${index}.data.damage.default.diceCount`}
              >
                <Controller
                  name={
                    `effects.${index}.data.damage.default.diceCount` as const
                  }
                  control={control}
                  render={({ field: { onChange, onBlur, name } }) => (
                    <TextField
                      id={name}
                      type="number"
                      name={name}
                      onChange={(e) => onChange(e.target.valueAsNumber)}
                      onBlur={onBlur}
                      css={css`
                        width: 42px;
                        min-width: 42px;
                      `}
                    />
                  )}
                />
              </FormFieldLabel>

              <FormFieldLabel
                htmlFor={`effects.${index}.data.damage.default.facets`}
              >
                <Typography variant="subtitle" color="text">
                  Damage Dice
                </Typography>
                <Controller
                  name={`effects.${index}.data.damage.default.facets` as const}
                  control={control}
                  render={({ field: { onChange, onBlur, name } }) => (
                    <Combobox
                      id={name}
                      name={name}
                      onChange={(e, option) => {
                        onChange(option.value)
                      }}
                      onBlur={onBlur}
                      placeholder="Select damage dice"
                      options={damageDiceOptions}
                      forcePopupIcon={false}
                    />
                  )}
                />
              </FormFieldLabel>
            </GapRow>

            <FormFieldLabel htmlFor={`effects.${index}.data.damage.type`}>
              <Typography variant="subtitle" color="text">
                Damage Type
              </Typography>
              <Controller
                name={`effects.${index}.data.damage.type` as const}
                control={control}
                render={({ field: { onChange, onBlur, name } }) => (
                  <Combobox
                    id={name}
                    name={name}
                    onChange={(e, option) => {
                      onChange(option.value)
                    }}
                    onBlur={onBlur}
                    placeholder="Select damage type"
                    options={damageTypeOptions}
                    forcePopupIcon={false}
                  />
                )}
              />
            </FormFieldLabel>
          </GapRow>

          <FormFieldLabel htmlFor={`effects.${index}.data.damage.scaling.type`}>
            <Typography variant="subtitle" color="text">
              Higher Level Scaling
            </Typography>
            <Controller
              name={`effects.${index}.data.damage.scaling.type` as const}
              control={control}
              render={({ field: { onChange, onBlur, name } }) => (
                <Combobox
                  id={name}
                  name={name}
                  onChange={(e, option) => {
                    onChange(option.value)
                    handleDamageScalingChoice(option.value)
                  }}
                  onBlur={onBlur}
                  placeholder="Select scaling type"
                  options={scalingTypeOptions}
                  forcePopupIcon={false}
                />
              )}
            />
          </FormFieldLabel>

          <div
            css={css`
              display: flex;
              flex-direction: column;
              max-height: 500px;
              overflow-y: auto;
              margin-top: 10px;
            `}
          >
            {effects[index]?.data.damage?.scaling.values.map(
              (scalingValue, valueIndex) => (
                <DamageScaleValue index={index} valueIndex={valueIndex} />
              )
            )}
          </div>
        </>
      )}

      {isConditionChange && (
        <>
          <FormFieldLabel>
            <Typography variant="subtitle" color="text">
              Condition to set
            </Typography>
            <Controller
              name={`effects.${index}.data.conditionChange.conditionToSet`}
              control={control}
              render={({ field: { onChange, onBlur, name } }) => (
                <Combobox
                  name={name}
                  onChange={(e, option) => {
                    onChange(option.value)
                  }}
                  onBlur={onBlur}
                  placeholder="Select condition"
                  options={conditionToSetOptions}
                  forcePopupIcon={false}
                  id="conditionType"
                />
              )}
            />
          </FormFieldLabel>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 10px;
            `}
          >
            <FormFieldLabel htmlFor="durationType">
              <Typography variant="subtitle" color="text">
                Duration Type
              </Typography>
              <Controller
                name={`effects.${index}.data.duration.type`}
                control={control}
                render={({ field: { onChange, onBlur, name } }) => (
                  <Combobox
                    name={name}
                    onChange={(e, option) => {
                      onChange(option.value)
                    }}
                    onBlur={onBlur}
                    placeholder="Select duration type"
                    options={durationTypeOptions}
                    forcePopupIcon={false}
                    id="durationType"
                  />
                )}
              />
              {errors.effects?.[0]?.data?.duration?.type && <ErrorMessage />}
            </FormFieldLabel>
            <div
              css={css`
                display: flex;
                gap: 10px;
                width: 100%;
              `}
            >
              <FormFieldLabel
                css={css`
                  width: 45px;
                `}
                htmlFor={`effects.${index}.data.duration.numericValue`}
              >
                <Typography variant="subtitle" color="text">
                  Duration
                </Typography>
                <Controller
                  name={`effects.${index}.data.duration.numericValue` as const}
                  control={control}
                  render={({ field: { onChange, onBlur, name } }) => (
                    <TextField
                      id="duration"
                      name={name}
                      type="number"
                      onChange={onChange}
                      onBlur={onBlur}
                      css={css`
                        width: 42px;
                        min-width: 42px;
                      `}
                    />
                  )}
                />
              </FormFieldLabel>
              <FormFieldLabel htmlFor="durationUnit">
                &nbsp;
                <Controller
                  name={`effects.${index}.data.duration.unit`}
                  control={control}
                  render={({ field: { onChange, onBlur, name } }) => (
                    <Combobox
                      name={name}
                      onChange={(e, option) => {
                        onChange(option.value)
                      }}
                      onBlur={onBlur}
                      placeholder="Select duration unit"
                      options={durationUnitOptions}
                      forcePopupIcon={false}
                      id="durationUnit"
                    />
                  )}
                />
              </FormFieldLabel>
            </div>
          </div>
        </>
      )}

      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        `}
      >
        <Button onClick={() => setIndex(null)}>Save</Button>
      </div>
    </>
  )
}

const SpellEffectsEditor: FC<{
  index: number
  setIndex(index: number | null): void
}> = ({ index, setIndex }) => {
  return (
    <div>
      <Head effects={[]} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding-top: 22px;
          padding-right: 30px;
          padding-left: 30px;
          padding-bottom: 22px;
        `}
      >
        <Form index={index} setIndex={setIndex} />
      </div>
    </div>
  )
}

export default SpellEffectsEditor
