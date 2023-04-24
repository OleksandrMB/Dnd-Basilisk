/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { FC } from 'react'

import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import { css } from '@emotion/react'

import AddRoundedIcon from '@mui/icons-material/AddRounded'

import Typography from '../../ui/Typography'
import IconButton from '../../ui/IconButton'

import {
  type CreateSpellInput,
  EffectType,
  DurationType,
  DurationUnit,
  DamageScalingType,
  DamageType
} from '../../validators/spell'

const Row: FC<{ name: string; onClick(): void }> = ({ name, onClick }) => {
  return (
    <div
      css={css`
        background-color: #141414;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        border-radius: 6px;
        cursor: pointer;
        &:not(&:last-of-type) {
          margin-bottom: 5px;
        }
      `}
      key={name}
      onClick={onClick}
    >
      <Typography color="text" variant="subtitle">
        {name}
      </Typography>
    </div>
  )
}

const SpellEffectsOverview: FC<{
  setSpellEffectIndex(index: number): void
}> = ({ setSpellEffectIndex }) => {
  const { control } = useFormContext<CreateSpellInput>()
  const { append } = useFieldArray({
    control,
    name: 'effects'
  })
  const effects = useWatch({
    name: 'effects',
    control,
    defaultValue: []
  })

  const handleAdd = () => {
    const newIndex = effects.length

    append({
      data: {
        name: `Effect #${newIndex + 1}`,
        description: '',
        type: EffectType.None,
        duration: {
          type: DurationType.Time,
          unit: DurationUnit.Rounds,
          numericValue: 0
        },
        damage: {
          type: DamageType.None,
          default: {
            facets: 0,
            diceCount: 0
          },
          scaling: {
            type: DamageScalingType.None,
            values: []
          }
        }
      }
    })

    setSpellEffectIndex(newIndex)
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        `}
      >
        <Typography variant="subtitle" color="text">
          Effects
        </Typography>
        <IconButton onClick={handleAdd}>
          <AddRoundedIcon />
        </IconButton>
      </div>
      <div>
        {effects.map(({ data: { name } }, index) => {
          return <Row name={name} onClick={() => setSpellEffectIndex(index)} />
        })}
      </div>
    </>
  )
}

export default SpellEffectsOverview
