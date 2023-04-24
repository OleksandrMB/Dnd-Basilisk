/* eslint-disable react/jsx-props-no-spreading */

import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller
} from 'react-hook-form'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import AppLayout from '../layouts/AppLayout'
import Textarea from '../ui/TextArea'
import TextField from '../ui/TextField'
import FormFieldLabel from '../ui/FormFieldLabel'
import Button from '../ui/Button'
import Typography from '../ui/Typography'
import ErrorMessage from '../ui/ErrorMessage'
import Combobox from '../ui/Combobox'
import { trpc } from '../utils/trpc'

type Inputs = {
  title: string
  source: string
  spellLevel: string
  spellSchool: string
  castingType: string
  castingTime: string
  components: string[]
  materialComponents: string
  rangeType: string
  range: string
  durationType: string
  duration: string
  timeUnit: string
}

const spellLevelOptions = [
  { label: 'Cantrip', id: '0' },
  { label: '1st', id: '1' },
  { label: '2nd', id: '2' },
  { label: '3rd', id: '3' },
  { label: '4th', id: '4' },
  { label: '5th', id: '5' },
  { label: '6th', id: '6' },
  { label: '7th', id: '7' },
  { label: '8th', id: '8' },
  { label: '9th', id: '9' }
]

const spellSchoolOptions = [
  { label: 'Evocation', id: '1' },
  { label: 'Abjuration', id: '2' },
  { label: 'Conjuration', id: '3' },
  { label: 'Transmutation', id: '4' },
  { label: 'Divination', id: '5' },
  { label: 'Enchantment', id: '6' },
  { label: 'Necromancy', id: '7' }
]

const castingTypeOptions = [
  { label: 'Action', id: '1' },
  { label: 'Bonus Action', id: '2' },
  { label: 'Reaction', id: '3' },
  { label: 'Round', id: '4' },
  { label: 'Minute', id: '5' },
  { label: 'Hour', id: '6' }
]

const componentsOptions = [
  { label: 'V', id: '1' },
  { label: 'S', id: '2' },
  { label: 'M', id: '3' }
]

const rangeTypeOptions = [
  { label: 'Self', id: '1' },
  { label: 'Touch', id: '2' },
  { label: 'Ranged', id: '3' },
  { label: 'Sight', id: '4' },
  { label: 'Unlimited', id: '5' }
]

const durationTypeOptions = [
  { label: 'Instantaneous', id: '1' },
  { label: 'Time', id: '2' },
  { label: 'Concentration', id: '3' },
  { label: 'Until Dispelled', id: '4' },
  { label: 'Until Dispelled or Triggered', id: '5' },
  { label: 'Special', id: '6' }
]

const savingThrowOptions = [
  { label: 'Strength', id: '1' },
  { label: 'Dexterity', id: '2' },
  { label: 'Constitution', id: '3' },
  { label: 'Intelligence', id: '4' },
  { label: 'Wisdom', id: '5' },
  { label: 'Charisma', id: '6' }
]

const damageDiceOptions = [
  { label: 'd4', id: '1' },
  { label: 'd6', id: '2' },
  { label: 'd8', id: '3' },
  { label: 'd10', id: '4' },
  { label: 'd12', id: '5' }
]

const damageTypeOptions = [
  { label: 'slashing', id: '1' },
  { label: 'piercing', id: '2' },
  { label: 'bludgeoning', id: '3' },
  { label: 'fire', id: '4' },
  { label: 'cold', id: '5' },
  { label: 'lightning', id: '6' },
  { label: 'acid', id: '7' },
  { label: 'poison', id: '9' },
  { label: 'thunder', id: '10' },
  { label: 'force', id: '11' },
  { label: 'necrotic', id: '12' },
  { label: 'radiant', id: '13' },
  { label: 'psychic', id: '14' }
]

const scalingTypeOptions = [
  { label: 'Character Level', id: '1' },
  { label: 'Spell level', id: '2' }
]

const SpellForm = () => {
  const methods = useForm<Inputs>({
    defaultValues: {
      title: '',
      source: '',
      spellLevel: '',
      spellSchool: '',
      castingType: '',
      castingTime: '',
      components: [],
      materialComponents: '',
      rangeType: '',
      range: '',
      durationType: '',
      duration: '',
      timeUnit: ''
    }
  })

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors }
  } = methods

  const onSubmit = () => {
    console.log('whattahelll')
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
          <form
            css={css`
              display: flex;
              flex-direction: column;
              width: 100%;
              height: calc(100vh - 239px);
              min-height: 600px;
              min-width: 800px;
              margin-top: 18px;
              background-color: #232225;
              border-radius: 6px;
              overflow-y: scroll;
            `}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                width: 50%;
                padding-top: 45px;
                padding-right: 30px;
                padding-left: 30px;
                padding-bottom: 22px;
                border-right: 1px solid #454545;
                border-bottom: 1px solid #454545;
              `}
            >
              <FormFieldLabel htmlFor="name">
                <Typography variant="subtitle" color="text">
                  Name
                </Typography>
                <TextField
                  {...register('title', { required: true })}
                  type="text"
                  id="title"
                />
                {errors.title && <ErrorMessage />}
              </FormFieldLabel>
              <FormFieldLabel htmlFor="source">
                <Typography variant="subtitle" color="text">
                  Source
                </Typography>
                <TextField
                  {...register('source', { required: true })}
                  type="text"
                  id="source"
                />
                {errors.source && <ErrorMessage />}
              </FormFieldLabel>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                width: 50%;
                padding-top: 20px;
                padding-right: 30px;
                padding-left: 30px;
                padding-bottom: 20px;
                border-right: 1px solid #454545;
                border-bottom: 1px solid #454545;
              `}
            >
              <FormFieldLabel htmlFor="spellLevel">
                <Typography variant="subtitle" color="text">
                  Spell Level
                </Typography>
                <Controller
                  name="spellLevel"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref }
                  }) => (
                    <Combobox
                      name={name}
                      onChange={(e, option) => {
                        onChange(option.label)
                      }}
                      onBlur={onBlur}
                      placeholder="Select spell level"
                      options={spellLevelOptions}
                      forcePopupIcon={false}
                      id="spellLevel"
                    />
                  )}
                />
                {errors.spellLevel && <ErrorMessage />}
              </FormFieldLabel>

              <FormFieldLabel htmlFor="spellSchool">
                <Typography variant="subtitle" color="text">
                  Spell School
                </Typography>
                <Controller
                  name="spellSchool"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref }
                  }) => (
                    <Combobox
                      name={name}
                      onChange={(e, option) => {
                        onChange(option.label)
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
                    Casting Type
                  </Typography>
                  <Controller
                    name="castingType"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref }
                    }) => (
                      <Combobox
                        name={name}
                        onChange={(e, option) => {
                          onChange(option.label)
                        }}
                        onBlur={onBlur}
                        placeholder="Select casting type"
                        options={castingTypeOptions}
                        forcePopupIcon={false}
                        id="castingType"
                      />
                    )}
                  />
                  {errors.castingType && <ErrorMessage />}
                </FormFieldLabel>
                <FormFieldLabel htmlFor="castingTime">
                  <Typography variant="subtitle" color="text">
                    Casting Time
                  </Typography>
                  <TextField {...register('castingTime')} id="castingTime" />
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
                    render={({
                      field: { onChange, onBlur, value, name, ref }
                    }) => (
                      <Combobox
                        name={name}
                        multiple
                        onChange={(e, options) =>
                          setValue('components', options)
                        }
                        limitTags={2}
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
                <FormFieldLabel htmlFor="materialComponents">
                  <Typography variant="subtitle" color="text">
                    Material Components
                  </Typography>
                  <TextField
                    {...register('materialComponents')}
                    id="materialComponents"
                  />
                </FormFieldLabel>
              </div>
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
                    name="durationType"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref }
                    }) => (
                      <Combobox
                        name={name}
                        onChange={(e, option) => {
                          onChange(option.label)
                        }}
                        onBlur={onBlur}
                        placeholder="Select duration type"
                        options={durationTypeOptions}
                        forcePopupIcon={false}
                        id="durationType"
                      />
                    )}
                  />
                  {errors.durationType && <ErrorMessage />}
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
                    htmlFor="duration"
                  >
                    <Typography variant="subtitle" color="text">
                      Duration
                    </Typography>
                    <TextField
                      {...register('duration')}
                      css={css`
                        width: 42px;
                        min-width: 42px;
                      `}
                      id="duration"
                    />
                  </FormFieldLabel>
                  <FormFieldLabel htmlFor="timeUnit">
                    &nbsp;
                    <TextField {...register('timeUnit')} id="timeUnit" />
                  </FormFieldLabel>
                </div>
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
                    Range Type
                  </Typography>
                  <Controller
                    name="rangeType"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref }
                    }) => (
                      <Combobox
                        name={name}
                        onChange={(e, option) => {
                          onChange(option.label)
                        }}
                        onBlur={onBlur}
                        placeholder="Select range type"
                        options={rangeTypeOptions}
                        forcePopupIcon={false}
                        id="rangeType"
                      />
                    )}
                  />
                  {errors.rangeType && <ErrorMessage />}
                </FormFieldLabel>
                <FormFieldLabel htmlFor="range">
                  <Typography variant="subtitle" color="text">
                    Range
                  </Typography>
                  <TextField {...register('range')} id="range" />
                </FormFieldLabel>
              </div>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                width: 50%;
                padding-top: 20px;
                padding-right: 30px;
                padding-left: 30px;
                padding-bottom: 20px;
                border-right: 1px solid #454545;
                border-bottom: 1px solid #454545;
              `}
            >
              <FormFieldLabel htmlFor="effects">
                <Typography variant="subtitle" color="text">
                  Effects
                </Typography>
                <Combobox
                  placeholder="Select spell effect"
                  options={['some effects']}
                  id="effects"
                />
              </FormFieldLabel>
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
                  <Combobox
                    placeholder="Select saving_throw"
                    options={savingThrowOptions}
                    id="saving_throw"
                  />
                </FormFieldLabel>
                <FormFieldLabel htmlFor="saving_throw_effects">
                  <Typography variant="subtitle" color="text">
                    Saving Throw Effects
                  </Typography>
                  <Combobox
                    multiple
                    limitTags={2}
                    disableCloseOnSelect
                    filterSelectedOptions
                    placeholder="Select effect"
                    options={['some options']}
                    id="saving_throw_effects"
                  />
                </FormFieldLabel>
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  gap: 10px;
                `}
              >
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
                    htmlFor="diceAmount"
                  >
                    &nbsp;
                    <TextField
                      css={css`
                        width: 42px;
                        min-width: 42px;
                      `}
                      id="diceAmount"
                    />
                  </FormFieldLabel>
                  <FormFieldLabel htmlFor="damage_dice">
                    <Typography variant="subtitle" color="text">
                      Damage Dice
                    </Typography>
                    <Combobox
                      placeholder="Select dice"
                      options={damageDiceOptions}
                      id="damage_dice"
                    />
                  </FormFieldLabel>
                </div>
                <FormFieldLabel htmlFor="damage_type">
                  <Typography variant="subtitle" color="text">
                    Damage Type
                  </Typography>
                  <Combobox
                    placeholder="Select damage type"
                    options={damageTypeOptions}
                    id="damage_type"
                  />
                </FormFieldLabel>
              </div>
              <div
                css={css`
                  display: flex;
                  gap: 10px;
                `}
              >
                <FormFieldLabel htmlFor="level_scaling">
                  <Typography variant="subtitle" color="text">
                    Higher Level Scaling
                  </Typography>
                  <Combobox
                    placeholder="Select scaling type"
                    options={scalingTypeOptions}
                    id="level_scaling"
                  />
                </FormFieldLabel>
              </div>
              <div
                css={css`
                  display: flex;
                  gap: 10px;
                `}
              >
                <FormFieldLabel htmlFor="description">
                  <Typography variant="subtitle" color="text">
                    Description
                  </Typography>
                  <Textarea minRows={2} variant="plain" />
                </FormFieldLabel>
              </div>
            </div>
            <div
              css={css`
                width: 50%;
                padding-top: 30px;
                padding-left: 30px;
                padding-bottom: 20px;
                border-right: 1px solid #454545;
                height: 100%;
                overflow: none;
              `}
            >
              <Button type="submit" onClick={() => console.log(getValues())}>
                <Typography variant="subtitle" color="primary">
                  Create
                </Typography>
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </AppLayout>
  )
}

export default SpellForm
