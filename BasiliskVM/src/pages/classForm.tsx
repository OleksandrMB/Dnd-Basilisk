/* eslint-disable react/jsx-props-no-spreading */

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { css } from '@emotion/react'
import { ChangeEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import {
  createCharacterClassSchema,
  CharacterClassInput,
  fifthEditionSourceId
} from '../validators/characterClass'
import { barlowCondensed } from '../styles/fonts'
import AppLayout from '../layouts/AppLayout'
import Button from '../ui/Button'
import { trpc } from '../utils/trpc'
import { uploadImageToCloudinary } from '../utils/cloudinary'
import TextField from '../ui/TextField'
import FormFieldLabel from '../ui/FormFieldLabel'
import Combobox from '../ui/Combobox'
import ErrorMsg from '../ui/ErrorMessage'
import Typography from '../ui/Typography'

const FormHeader = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Typography variant="h1" color="primary">
        Add a Class
      </Typography>
    </div>
  )
}

const ClassForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control
  } = useForm<CharacterClassInput>({
    defaultValues: {
      name: '',
      sourceId: fifthEditionSourceId,
      hitDice: 6,
      coverImage: ''
    },
    resolver: zodResolver(createCharacterClassSchema)
  })

  const router = useRouter()
  const mutation = trpc.characterClass.create.useMutation({
    onSuccess: () => {
      router.push('/classList')
    }
  })

  const handleImageChoice = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    if (event.target.files[0] === undefined) return

    /* eslint-disable-next-line */
    const { secure_url } = await uploadImageToCloudinary(event.target.files[0])
    setValue('coverImage', secure_url)
  }

  const onSubmit: SubmitHandler<CharacterClassInput> = (data) =>
    mutation.mutate(data)

  return (
    <AppLayout>
      <div
        css={css`
          padding-top: 85px;
          margin-left: 359px;
          margin-right: 33px;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: calc(100vh - 128px);
          `}
        >
          <FormHeader />
          <form
            css={css`
              padding: 45px 30px;
              width: 100%;
              height: 587px;
              margin-top: 18px;
              background-color: #232225;
              border-radius: 6px;
            `}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormFieldLabel htmlFor="name">
              <Typography variant="subtitle" color="text">
                Name
              </Typography>
            </FormFieldLabel>
            <TextField
              type="text"
              id="title"
              {...register('name', { required: true })}
            />
            {errors.name && <ErrorMsg />}

            <FormFieldLabel htmlFor="source">
              <Typography variant="subtitle" color="text">
                Source
              </Typography>
            </FormFieldLabel>
            <TextField
              type="text"
              id="source"
              {...register('sourceId', { required: true })}
            />
            {errors.sourceId && <ErrorMsg />}

            <FormFieldLabel
              css={css`
                margin-bottom: 10px;
              `}
            >
              <Typography variant="subtitle" color="text">
                Dice
              </Typography>
            </FormFieldLabel>
            <Controller
              name="hitDice"
              control={control}
              render={({ field: { onChange, onBlur, name } }) => (
                <Combobox
                  id="hitDice"
                  name={name}
                  onChange={(e, option) => {
                    onChange(option.value)
                  }}
                  onBlur={onBlur}
                  options={[
                    { value: 6, label: 'D6' },
                    { value: 8, label: 'D8' },
                    { value: 10, label: 'D10' },
                    { value: 12, label: 'D12' }
                  ]}
                />
              )}
            />

            <FormFieldLabel htmlFor="img_upload">
              <Typography variant="subtitle" color="text">
                Image
              </Typography>
              <div
                css={css`
                  width: 100%;
                  position: relative;
                `}
              >
                <TextField
                  type="file"
                  id="img_upload"
                  required
                  onChange={handleImageChoice}
                  css={css`
                    &::file-selector-button {
                      all: unset;
                      display: none;
                    }
                  `}
                />
                <img
                  css={css`
                    position: absolute;
                    top: 18px;
                    right: 13px;
                    pointer-events: none;
                  `}
                  src="/icons/material-symbols_attach-file.svg"
                  alt="sample text"
                />
              </div>
            </FormFieldLabel>
            <Button
              type="submit"
              css={css`
                margin-top: 24px;
              `}
            >
              <Typography variant="subtitle" color="primary">
                Create
              </Typography>
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

export default ClassForm
