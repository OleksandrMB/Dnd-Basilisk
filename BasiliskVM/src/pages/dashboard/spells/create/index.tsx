/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react'

import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
  useFormContext
} from 'react-hook-form'
import { css } from '@emotion/react'

import styled from '@emotion/styled'

import AppLayout from '../../../../layouts/AppLayout'
import SpellEffectsEditor from '../../../../modules/SpellEffects/Editor'
import SpellEffectsOverview from '../../../../modules/SpellEffects/Overview'

import TextField from '../../../../ui/TextField'
import FormFieldLabel from '../../../../ui/FormFieldLabel'
import Button from '../../../../ui/Button'
import Typography from '../../../../ui/Typography'
import ErrorMessage from '../../../../ui/ErrorMessage'
import Combobox from '../../../../ui/Combobox'
import Checkbox from '../../../../ui/Checkbox'

import {
  type CreateSpellInput,
  Level,
  CastingTimeType,
  ComponentType,
  DistanceType,
  SpellSchool
} from '../../../../validators/spell'
import { trpc } from '../../../../utils/trpc'

const spellLevelOptions = [
  { label: 'Cantrip', value: Level.Cantrip },
  { label: '1st', value: Level.One },
  { label: '2nd', value: Level.Two },
  { label: '3rd', value: Level.Three },
  { label: '4th', value: Level.Four },
  { label: '5th', value: Level.Five },
  { label: '6th', value: Level.Six },
  { label: '7th', value: Level.Seven },
  { label: '8th', value: Level.Eight },
  { label: '9th', value: Level.Nine }
]

const spellSchoolOptions = [
  { label: 'Evocation', value: SpellSchool.Evocation },
  { label: 'Abjuration', value: SpellSchool.Abjuration },
  { label: 'Conjuration', value: SpellSchool.Conjuration },
  { label: 'Transmutation', value: SpellSchool.Transmutation },
  { label: 'Divination', value: SpellSchool.Divination },
  { label: 'Enchantment', value: SpellSchool.Enchantment },
  { label: 'Necromancy', value: SpellSchool.Necromancy }
]

const castingTypeOptions = [
  { label: 'Action', value: CastingTimeType.Action },
  { label: 'Bonus Action', value: CastingTimeType.BonusAction },
  { label: 'Reaction', value: CastingTimeType.Reaction },
  { label: 'Rounds', value: CastingTimeType.Rounds },
  { label: 'Minutes', value: CastingTimeType.Minutes },
  { label: 'Hours', value: CastingTimeType.Hours }
]

const componentsOptions = [
  { label: 'V', value: ComponentType.Verbal },
  { label: 'S', value: ComponentType.Somatic },
  { label: 'M', value: ComponentType.Material }
]

const rangeTypeOptions = [
  { label: 'Self', value: DistanceType.Self },
  { label: 'Touch', value: DistanceType.Touch },
  { label: 'Feets', value: DistanceType.Feets },
  { label: 'Miles', value: DistanceType.Miles },
  { label: 'Sight', value: DistanceType.Sight },
  { label: 'Unlimited', value: DistanceType.Unlimited }
]

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: calc(100vh - 239px);
  min-height: 600px;
  min-width: 800px;
  margin-top: 18px;
  background-color: #232225;
  border-radius: 6px;
  overflow-y: scroll;
  position: relative;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:first-of-type {
    border-right: 1px solid #454545;
  }
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 22px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 22px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #454545;
  }
`

const ClassesCombobox = () => {
  const { data = [] } = trpc.characterClass.getAll.useQuery()
  const { control, setValue } = useFormContext<CreateSpellInput>()

  type ClassOption = typeof data[0]

  return (
    <Controller
      name="classes"
      control={control}
      render={({ field: { onBlur, name } }) => (
        <Combobox
          name={name}
          multiple
          onChange={(e, options: ClassOption[]) => {
            setValue(
              'classes',
              options.map((characterClass) => characterClass.id)
            )
          }}
          getOptionLabel={(option: ClassOption) => option.name}
          onBlur={onBlur}
          disableCloseOnSelect
          filterSelectedOptions
          placeholder="Select classes"
          options={data}
          forcePopupIcon={false}
          id="classes"
        />
      )}
    />
  )
}

const SourceCombobox = () => {
  const { data = [] } = trpc.source.getAll.useQuery()
  const { control, setValue } = useFormContext<CreateSpellInput>()

  type SourceOption = typeof data[0]

  return (
    <Controller
      name="sourceId"
      control={control}
      render={({ field: { onBlur, name } }) => (
        <Combobox
          name={name}
          onChange={(e, option: SourceOption) => {
            setValue('sourceId', option.id)
          }}
          getOptionLabel={(option: SourceOption) => option.name}
          onBlur={onBlur}
          disableCloseOnSelect
          filterSelectedOptions
          placeholder="Select source"
          options={data}
          forcePopupIcon={false}
          id="source"
        />
      )}
    />
  )
}

const SpellForm = () => {
  const { mutateAsync, isLoading } = trpc.spell.create.useMutation()

  const methods = useForm<CreateSpellInput>({
    defaultValues: {
      name: '',
      sourceId: '',
      level: 0,
      spellSchool: SpellSchool.Abjuration,
      castingTime: {},
      components: [],
      effects: []
    }
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = methods

  const [spellEffectIndex, setSpellEffectIndex] = useState<number | null>(null)

  const onSubmit: SubmitHandler<CreateSpellInput> = (data) => {
    mutateAsync({ ...data })
  }

  return (
    <AppLayout>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          overflow-x: none;
          width: calc(100% - 392px);
          padding-top: 85px;
          margin-left: 359px;
          height: calc(100vh - 128px);
        `}
      >
        <Typography variant="h1" color="primary">
          Add a Spell
        </Typography>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Column>
              <Section>
                <FormFieldLabel htmlFor="name">
                  <Typography variant="subtitle" color="text">
                    Name
                  </Typography>
                  <TextField
                    {...register('name', { required: true })}
                    type="text"
                    id="title"
                  />
                  {errors.name && <ErrorMessage />}
                </FormFieldLabel>
                <FormFieldLabel htmlFor="source">
                  <Typography variant="subtitle" color="text">
                    Source
                  </Typography>
                  <SourceCombobox />
                  {errors.sourceId && <ErrorMessage />}
                </FormFieldLabel>

                <FormFieldLabel htmlFor="classes">
                  <Typography variant="subtitle" color="text">
                    Classes
                  </Typography>
                  <ClassesCombobox />
                  {errors.classes && <ErrorMessage />}
                </FormFieldLabel>
              </Section>

              <Section>
                <div
                  css={css`
                    display: flex;
                    gap: 10px;
                  `}
                >
                  <Checkbox label="Ritual" {...register('isRitual')} />
                  <Checkbox
                    label="Concentration"
                    {...register('requiresConcentration')}
                  />
                </div>
              </Section>

              <Section>
                <FormFieldLabel htmlFor="spellLevel">
                  <Typography variant="subtitle" color="text">
                    Spell Level
                  </Typography>
                  <Controller
                    name="level"
                    control={control}
                    render={({ field: { onChange, onBlur, name } }) => (
                      <Combobox
                        name={name}
                        onChange={(e, option) => {
                          onChange(option.value)
                        }}
                        onBlur={onBlur}
                        placeholder="Select spell level"
                        options={spellLevelOptions}
                        forcePopupIcon={false}
                        id="spellLevel"
                      />
                    )}
                  />
                  {errors.level && <ErrorMessage />}
                </FormFieldLabel>

                <FormFieldLabel htmlFor="spellSchool">
                  <Typography variant="subtitle" color="text">
                    Spell School
                  </Typography>
                  <Controller
                    name="spellSchool"
                    control={control}
                    render={({ field: { onChange, onBlur, name } }) => (
                      <Combobox
                        name={name}
                        onChange={(e, option) => {
                          onChange(option.value)
                        }}
                        onBlur={onBlur}
                        placeholder="Select spell school"
                        options={spellSchoolOptions}
                        forcePopupIcon={false}
                        id="spellSchool"
                      />
                    )}
                  />
                  {errors.spellSchool && <ErrorMessage />}
                </FormFieldLabel>

                <div
                  css={css`
                    display: flex;
                    gap: 10px;
                  `}
                >
                  <FormFieldLabel htmlFor="castingType">
                    <Typography variant="subtitle" color="text">
                      Casting Time Type
                    </Typography>
                    <Controller
                      name="castingTime.type"
                      control={control}
                      render={({ field: { onChange, onBlur, name } }) => (
                        <Combobox
                          name={name}
                          onChange={(e, option) => {
                            onChange(option.value)
                          }}
                          onBlur={onBlur}
                          placeholder="Select casting type"
                          options={castingTypeOptions}
                          forcePopupIcon={false}
                          id="castingType"
                        />
                      )}
                    />
                    {errors.castingTime?.type && <ErrorMessage />}
                  </FormFieldLabel>
                  <FormFieldLabel htmlFor="castingTime">
                    <Typography variant="subtitle" color="text">
                      Casting Time Value
                    </Typography>
                    <TextField
                      type="number"
                      {...register('castingTime.numericValue', {
                        valueAsNumber: true
                      })}
                      id="castingTime"
                    />
                  </FormFieldLabel>
                </div>

                <div
                  css={css`
                    display: flex;
                    gap: 10px;
                  `}
                >
                  <FormFieldLabel htmlFor="components">
                    <Typography variant="subtitle" color="text">
                      Components
                    </Typography>
                    <Controller
                      name="components"
                      control={control}
                      render={({ field: { name } }) => (
                        <Combobox
                          name={name}
                          multiple
                          onChange={(e, options: typeof componentsOptions) =>
                            setValue(
                              'components',
                              options.map((option) => {
                                return { type: option.value }
                              })
                            )
                          }
                          limitTags={3}
                          disableCloseOnSelect
                          filterSelectedOptions
                          placeholder="Select components"
                          options={componentsOptions}
                          id="components"
                        />
                      )}
                    />
                    {errors.components && <ErrorMessage />}
                  </FormFieldLabel>
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                  `}
                >
                  <FormFieldLabel htmlFor="rangeType">
                    <Typography variant="subtitle" color="text">
                      Distance Type
                    </Typography>
                    <Controller
                      name="distance.type"
                      control={control}
                      render={({ field: { onChange, onBlur, name } }) => (
                        <Combobox
                          name={name}
                          onChange={(e, option) => {
                            onChange(option.value)
                          }}
                          onBlur={onBlur}
                          placeholder="Select range type"
                          options={rangeTypeOptions}
                          forcePopupIcon={false}
                          id="rangeType"
                        />
                      )}
                    />
                    {errors.distance?.type && <ErrorMessage />}
                  </FormFieldLabel>
                  <FormFieldLabel htmlFor="range">
                    <Typography variant="subtitle" color="text">
                      Distance Value
                    </Typography>
                    <TextField
                      {...register('distance.numericValue', {
                        valueAsNumber: true
                      })}
                      id="range"
                    />
                  </FormFieldLabel>
                </div>
              </Section>

              <Section>
                <SpellEffectsOverview
                  setSpellEffectIndex={setSpellEffectIndex}
                />
              </Section>

              <div
                css={css`
                  width: 50%;
                  padding-top: 30px;
                  padding-left: 30px;
                  padding-bottom: 20px;
                  height: 100%;
                  overflow: none;
                `}
              >
                <Button type="submit" disabled={isLoading}>
                  <Typography variant="subtitle" color="primary">
                    Create
                  </Typography>
                </Button>
              </div>
            </Column>

            <Column>
              {spellEffectIndex !== null ? (
                <SpellEffectsEditor
                  index={spellEffectIndex}
                  setIndex={setSpellEffectIndex}
                />
              ) : null}
            </Column>
          </Form>
        </FormProvider>
      </div>
    </AppLayout>
  )
}

export default SpellForm
