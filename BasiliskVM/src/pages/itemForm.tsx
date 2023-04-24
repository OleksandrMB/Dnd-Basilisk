/* eslint-disable react/jsx-props-no-spreading */

import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller
} from 'react-hook-form'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { fifthEditionSourceId } from '../validators/item'
import { trpc } from '../utils/trpc'
import AppLayout from '../layouts/AppLayout'
import Textarea from '../ui/TextArea'
import TextField from '../ui/TextField'
import FormFieldLabel from '../ui/FormFieldLabel'
import Button from '../ui/Button'
import Typography from '../ui/Typography'
import ErrorMessage from '../ui/ErrorMessage'
import Combobox from '../ui/Combobox'

type Inputs = {
  name: string
  sourceId: string
  itemTypeId: string
  attributes: string[]
  cost: number
  currency: string
  weight: number
  unitOfMass: string
  diceAmount: number
  damageDice: string
  damageType: string
  weaponProps: string[]
  ac: number
  stealthDisadvantage: string
  capacity: number
  unitOfVolume: string
  savingThrowCap: number
  poisonType: string
  poisonEffect: string
  description: string
}

const currencyOptions = [
  { label: 'cp', id: '1' },
  { label: 'sp', id: '2' },
  { label: 'gp', id: '3' },
  { label: 'ep', id: '4' },
  { label: 'pp', id: '5' }
]

const unitOfMassOptions = [
  { label: 'lb', id: '1' },
  { label: 'lbs', id: '2' }
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
  { label: 'bludgeoning', id: '3' }
]

const weaponPropsOptions = [
  { label: 'Ammunition', id: '1' },
  { label: 'Finesse', id: '2' },
  { label: 'Heavy', id: '3' },
  { label: 'Light', id: '4' },
  { label: 'Loading', id: '5' },
  { label: 'Range', id: '6' },
  { label: 'Reach', id: '7' },
  { label: 'Special', id: '8' },
  { label: 'Thrown', id: '9' },
  { label: 'Two-Handed', id: '10' },
  { label: 'Versatile', id: '11' }
]

const stealthDisadvantageOptions = [
  { label: 'Yes', id: '1' },
  { label: 'No', id: '2' }
]

const unitOfVolumeOptions = [
  { label: 'Cubic foot', id: '1' },
  { label: 'Gallon', id: '2' },
  { label: 'Pint', id: '3' },
  { label: 'Uncia', id: '4' }
]

const poisonTypeOptions = [
  { label: 'Inhaled', id: '1' },
  { label: 'Сombat', id: '2' },
  { label: 'Consumable', id: '3' },
  { label: 'Contact', id: '4' }
]

const poisonEffectOptions = [
  { label: 'Damage', id: '1' },
  { label: 'Сondition', id: '2' },
  { label: 'Both', id: '3' }
]

const ItemForm = () => {
  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      sourceId: fifthEditionSourceId,
      itemTypeId: '',
      attributes: [],
      cost: 0,
      currency: '',
      weight: 0,
      unitOfMass: '',
      diceAmount: 1,
      damageDice: '',
      damageType: '',
      weaponProps: [],
      ac: 0,
      stealthDisadvantage: '',
      capacity: 0,
      unitOfVolume: '',
      savingThrowCap: 0,
      poisonType: '',
      poisonEffect: '',
      description: ''
    }
  })

  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = methods

  const router = useRouter()
  const mutation = trpc.item.create.useMutation({
    onSuccess: () => {
      router.push('/itemList')
    }
  })

  const { data: itemAttributes, isLoading: isAttributeLoading } =
    trpc.item.getItemAttributes.useQuery()

  const { data: itemTypes, isLoading: isItemTypeLoading } =
    trpc.item.getItemTypes.useQuery()

  if (isAttributeLoading || !itemAttributes) {
    return null
  }

  if (isItemTypeLoading || !itemTypes) {
    return null
  }

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    mutation.mutate({
      name: data.name,
      sourceId: data.sourceId,
      itemTypeId: data.itemTypeId,
      attributes: data.attributes
    })

  const watchItemType = watch('itemTypeId')

  const checkWatchItemType = (ItemType: string, name: string): boolean => {
    const item = itemTypes.find((i) => i.name === name)

    return item !== undefined && item.id === ItemType
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
          Add an Item
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
                  {...register('name', { required: true })}
                  type="text"
                  id="name"
                />
                {errors.name && <ErrorMessage />}
              </FormFieldLabel>
              <FormFieldLabel htmlFor="source">
                <Typography variant="subtitle" color="text">
                  Source
                </Typography>
                <TextField
                  {...register('sourceId', { required: true })}
                  type="text"
                  id="source"
                />
                {errors.sourceId && <ErrorMessage />}
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
              <FormFieldLabel htmlFor="itemTypeId">
                <Typography variant="subtitle" color="text">
                  Item Type
                </Typography>
                <Controller
                  name="itemTypeId"
                  control={control}
                  render={({ field: { onChange, onBlur, name } }) => (
                    <Combobox
                      name={name}
                      onChange={(e, option) => {
                        onChange(option.id)
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.name}
                      onBlur={onBlur}
                      placeholder="Select item type"
                      options={itemTypes}
                      forcePopupIcon={false}
                      id="itemTypeId"
                    />
                  )}
                />
                {errors.itemTypeId && <ErrorMessage />}
              </FormFieldLabel>

              <FormFieldLabel htmlFor="attributes">
                <Typography variant="subtitle" color="text">
                  Attributes
                </Typography>
                <Controller
                  name="attributes"
                  control={control}
                  render={({ field: { name } }) => (
                    <Combobox
                      name={name}
                      multiple
                      onChange={(e, options: typeof itemAttributes) => {
                        setValue(
                          'attributes',
                          options.map((option) => option.id)
                        )
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.name}
                      limitTags={2}
                      disableCloseOnSelect
                      filterSelectedOptions
                      placeholder="Select attributes"
                      options={itemAttributes}
                      id="attributes"
                    />
                  )}
                />
                {errors.attributes && <ErrorMessage />}
              </FormFieldLabel>
              <div
                css={css`
                  display: flex;
                  gap: 10px;
                `}
              >
                <FormFieldLabel htmlFor="cost">
                  <Typography variant="subtitle" color="text">
                    Cost
                  </Typography>
                  <TextField {...register('cost')} id="cost" />
                </FormFieldLabel>
                <FormFieldLabel htmlFor="currency">
                  <Typography variant="subtitle" color="text">
                    Currency
                  </Typography>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field: { onChange, onBlur, name } }) => (
                      <Combobox
                        name={name}
                        onChange={(e, option) => {
                          onChange(option.id)
                        }}
                        onBlur={onBlur}
                        placeholder="Select currency"
                        options={currencyOptions}
                        forcePopupIcon={false}
                        id="currency"
                      />
                    )}
                  />
                  {errors.currency && <ErrorMessage />}
                </FormFieldLabel>
              </div>
              <div
                css={css`
                  display: flex;
                  gap: 10px;
                `}
              >
                <FormFieldLabel htmlFor="weight">
                  <Typography variant="subtitle" color="text">
                    Weight
                  </Typography>
                  <TextField {...register('weight')} id="weight" />
                </FormFieldLabel>
                <FormFieldLabel htmlFor="unitOfMass">
                  <Typography variant="subtitle" color="text">
                    Unit of Mass
                  </Typography>
                  <Controller
                    name="unitOfMass"
                    control={control}
                    render={({ field: { onChange, onBlur, name } }) => (
                      <Combobox
                        name={name}
                        onChange={(e, option) => {
                          onChange(option.id)
                        }}
                        onBlur={onBlur}
                        placeholder="Select unit"
                        options={unitOfMassOptions}
                        forcePopupIcon={false}
                        id="unitOfMass"
                      />
                    )}
                  />
                  {errors.unitOfMass && <ErrorMessage />}
                </FormFieldLabel>
              </div>
              {checkWatchItemType(watchItemType, 'Weapons') && (
                <>
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
                          type="text"
                          {...register('diceAmount', { required: true })}
                        />
                      </FormFieldLabel>
                      <FormFieldLabel htmlFor="damageDice">
                        <Typography variant="subtitle" color="text">
                          Damage Dice
                        </Typography>
                        <Controller
                          name="damageDice"
                          control={control}
                          render={({ field: { onChange, onBlur, name } }) => (
                            <Combobox
                              name={name}
                              onChange={(e, option) => {
                                onChange(option.id)
                              }}
                              onBlur={onBlur}
                              placeholder="Select dice"
                              options={damageDiceOptions}
                              forcePopupIcon={false}
                              id="damageDice"
                            />
                          )}
                        />
                        {errors.damageDice && <ErrorMessage />}
                      </FormFieldLabel>
                    </div>
                    <FormFieldLabel htmlFor="damageType">
                      <Typography variant="subtitle" color="text">
                        Damage Type
                      </Typography>
                      <Controller
                        name="damageType"
                        control={control}
                        render={({ field: { onChange, onBlur, name } }) => (
                          <Combobox
                            name={name}
                            onChange={(e, option) => {
                              onChange(option.id)
                            }}
                            onBlur={onBlur}
                            placeholder="Select type"
                            options={damageTypeOptions}
                            forcePopupIcon={false}
                            id="damageType"
                          />
                        )}
                      />
                      {errors.damageType && <ErrorMessage />}
                    </FormFieldLabel>
                  </div>

                  <FormFieldLabel htmlFor="weaponProps">
                    <Typography variant="subtitle" color="text">
                      Weapon Properties
                    </Typography>
                    <Controller
                      name="weaponProps"
                      control={control}
                      render={({ field: { name } }) => (
                        <Combobox
                          name={name}
                          multiple
                          onChange={(e, options) =>
                            setValue('weaponProps', options)
                          }
                          limitTags={2}
                          disableCloseOnSelect
                          filterSelectedOptions
                          placeholder="Select properties"
                          options={weaponPropsOptions}
                          id="weaponProps"
                        />
                      )}
                    />
                    {errors.weaponProps && <ErrorMessage />}
                  </FormFieldLabel>
                </>
              )}
              {checkWatchItemType(watchItemType, 'Armor') && (
                <div
                  css={css`
                    display: flex;
                    gap: 10px;
                  `}
                >
                  <FormFieldLabel htmlFor="ac">
                    <Typography variant="subtitle" color="text">
                      AC
                    </Typography>
                    <TextField {...register('ac')} id="ac" />
                  </FormFieldLabel>
                  <FormFieldLabel htmlFor="stealthDisadvantage">
                    <Typography variant="subtitle" color="text">
                      Disadvantage on Stealth
                    </Typography>
                    <Controller
                      name="stealthDisadvantage"
                      control={control}
                      render={({ field: { onChange, onBlur, name } }) => (
                        <Combobox
                          name={name}
                          onChange={(e, option) => {
                            onChange(option.id)
                          }}
                          onBlur={onBlur}
                          placeholder="Select mode"
                          options={stealthDisadvantageOptions}
                          forcePopupIcon={false}
                          id="stealthDisadvantage"
                        />
                      )}
                    />
                    {errors.stealthDisadvantage && <ErrorMessage />}
                  </FormFieldLabel>
                </div>
              )}
              {checkWatchItemType(watchItemType, 'Container') && (
                <div
                  css={css`
                    display: flex;
                    gap: 10px;
                  `}
                >
                  <FormFieldLabel htmlFor="capacity">
                    <Typography variant="subtitle" color="text">
                      Capacity
                    </Typography>
                    <TextField {...register('capacity')} id="capacity" />
                  </FormFieldLabel>
                  <FormFieldLabel htmlFor="unitOfVolume">
                    <Typography variant="subtitle" color="text">
                      Unit of Volume
                    </Typography>
                    <Controller
                      name="unitOfVolume"
                      control={control}
                      render={({ field: { onChange, onBlur, name } }) => (
                        <Combobox
                          name={name}
                          onChange={(e, option) => {
                            onChange(option.id)
                          }}
                          onBlur={onBlur}
                          placeholder="Select unit"
                          options={unitOfVolumeOptions}
                          forcePopupIcon={false}
                          id="unitOfVolume"
                        />
                      )}
                    />
                    {errors.unitOfVolume && <ErrorMessage />}
                  </FormFieldLabel>
                </div>
              )}
              {checkWatchItemType(watchItemType, 'Poison') && (
                <>
                  <div
                    css={css`
                      display: flex;
                      gap: 10px;
                    `}
                  >
                    <FormFieldLabel htmlFor="savingThrowCap">
                      <Typography variant="subtitle" color="text">
                        Saving Throw Difficulty
                      </Typography>
                      <TextField
                        {...register('savingThrowCap')}
                        id="savingThrowCap"
                      />
                    </FormFieldLabel>
                    <FormFieldLabel htmlFor="poisonType">
                      <Typography variant="subtitle" color="text">
                        Poison Type
                      </Typography>
                      <Controller
                        name="poisonType"
                        control={control}
                        render={({ field: { onChange, onBlur, name } }) => (
                          <Combobox
                            name={name}
                            onChange={(e, option) => {
                              onChange(option.id)
                            }}
                            onBlur={onBlur}
                            placeholder="Select type"
                            options={poisonTypeOptions}
                            forcePopupIcon={false}
                            id="poisonType"
                          />
                        )}
                      />
                      {errors.poisonType && <ErrorMessage />}
                    </FormFieldLabel>
                  </div>
                  <FormFieldLabel htmlFor="poisonEffect">
                    <Typography variant="subtitle" color="text">
                      Effect on Fail
                    </Typography>
                    <Controller
                      name="poisonEffect"
                      control={control}
                      render={({ field: { onChange, onBlur, name } }) => (
                        <Combobox
                          name={name}
                          onChange={(e, option) => {
                            onChange(option.id)
                          }}
                          onBlur={onBlur}
                          placeholder="Select effect"
                          options={poisonEffectOptions}
                          forcePopupIcon={false}
                          id="poisonEffect"
                        />
                      )}
                    />
                    {errors.poisonEffect && <ErrorMessage />}
                  </FormFieldLabel>
                </>
              )}
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
                  <Textarea
                    minRows={2}
                    variant="plain"
                    {...register('description')}
                  />
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
              <Button type="submit">
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

export default ItemForm
