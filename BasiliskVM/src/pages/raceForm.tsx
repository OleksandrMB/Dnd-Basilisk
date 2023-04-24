/* eslint-disable react/jsx-props-no-spreading */
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext
} from 'react-hook-form'
import { css } from '@emotion/react'
import { useState, FC, ChangeEvent, PropsWithChildren } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import AppLayout from '../layouts/AppLayout'
import Textarea from '../ui/TextArea'
import TextField from '../ui/TextField'
import FormFieldLabel from '../ui/FormFieldLabel'
import Button from '../ui/Button'
import Typography from '../ui/Typography'
import ErrorMsg from '../ui/ErrorMessage'
import {
  createCharacterRaceSchema,
  CharacterRaceInput,
  fifthEditionSourceId
} from '../validators/characterRace'
import { trpc } from '../utils/trpc'
import { uploadImageToCloudinary } from '../utils/cloudinary'

const SectionItem: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      css={css`
        width: 100%;
        display: block;
        overflow: auto;
        background-color: #2b2930;
        border-radius: 6px;
        padding: 10px 16px;
        margin-bottom: 20px;
      `}
    >
      {children}
    </div>
  )
}

type SectionSubformProps = {
  onSubmit(): void
}

const SectionSubform: FC<SectionSubformProps> = ({ onSubmit }) => {
  const { register } = useFormContext()

  return (
    <div
      css={css`
        margin-top: 32px;
      `}
    >
      <FormFieldLabel htmlFor="section-name">
        Name
        <TextField
          type="text"
          id="section-name"
          {...register('currentInfoSection.name')}
        />
      </FormFieldLabel>
      <FormFieldLabel htmlFor="description">
        Description
        <Textarea
          minRows={2}
          variant="plain"
          {...register('currentInfoSection.description')}
        />
      </FormFieldLabel>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          padding-top: 20px;
        `}
      >
        <Button onClick={onSubmit}>Add Section</Button>
      </div>
    </div>
  )
}

const RaceForm = () => {
  const methods = useForm<CharacterRaceInput>({
    defaultValues: {
      name: '',
      sourceId: fifthEditionSourceId,
      coverImage: ''
    },
    resolver: zodResolver(createCharacterRaceSchema)
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = methods

  const roter = useRouter()
  const mutation = trpc.characterRace.create.useMutation({
    onSuccess: () => {
      roter.push('/raceList')
    }
  })
  // const { fields, append, remove, prepend } = useFieldArray({
  //   control
  //   name: 'infoSections'
  // })
  const onSubmit: SubmitHandler<CharacterRaceInput> = (data) =>
    mutation.mutate(data)
  const handleImageChoice = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    if (event.target.files[0] === undefined) return

    /* eslint-disable-next-line */
    const { secure_url } = await uploadImageToCloudinary(event.target.files[0])
    setValue('coverImage', secure_url)
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
          Add Race
        </Typography>
        <FormProvider {...methods}>
          <form
            css={css`
              display: flex;
              flex-direction: column;
              width: 100%;
              height: calc(100vh - 239px);
              min-height: 600px;
              min-width: 500px;
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
                {errors.name && <ErrorMsg />}
              </FormFieldLabel>
              <FormFieldLabel htmlFor="source">
                <Typography variant="subtitle" color="text">
                  Source
                </Typography>
                <TextField
                  {...register('sourceId', { required: true })}
                  type="text"
                  id="sourceId"
                />
                {errors.sourceId && <ErrorMsg />}
              </FormFieldLabel>
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
                overflow: none;
              `}
            >
              <FormFieldLabel>
                <Typography variant="subtitle" color="text">
                  Info Sections
                </Typography>
              </FormFieldLabel>
              {/* {fields.map((field, index) => {
                return (
                  <SectionItem key={field.id}>
                    <FormFieldLabel htmlFor="section-name">
                      <Typography variant="subtitle" color="text">
                        Name
                      </Typography>
                      
                      <TextField
                        // {...register(`infoSections.${index}.name` as const)}
                        type="text"
                      />
                    </FormFieldLabel>
                    <FormFieldLabel htmlFor="description">
                      <Typography variant="subtitle" color="text">
                        Description
                      </Typography>                      
                    <Textarea
                        // {...register(
                        //   `infoSections.${index}.description` as const
                        // )}
                        minRows={2}
                        variant="plain"
                      />
                    </FormFieldLabel>
                  </SectionItem>
                )
              })} */}
              {/* <SectionSubform
                // onSubmit={() =>
                //   append({
                //     name: getValues().currentInfoSection.name,
                //     description: getValues().currentInfoSection.description
                //   })
                // }
              /> */}
            </div>
            <div
              css={css`
                width: 50%;
                padding-top: 20px;
                padding-right: 30px;
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

export default RaceForm
