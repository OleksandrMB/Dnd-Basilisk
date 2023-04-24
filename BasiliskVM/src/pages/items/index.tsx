import { css } from '@emotion/react'
import { FC, useState } from 'react'
import AppLayout from '../../layouts/AppLayout'
import { barlowCondensed } from '../../styles/fonts'
import LinkTitle from '../../ui/LinkTitle'
import SearchBar from '../../ui/SearchBar'
import Typography from '../../ui/Typography'
import { trpc } from '../../utils/trpc'

type ItemsListProps = {
  onSelectItem: (id: string) => void
}

type ItemDescriptionProps = {
  id: string
}

const ItemsList: FC<ItemsListProps> = ({ onSelectItem }) => {
  const { data = [] } = trpc.item.getAll.useQuery()

  return (
    <div>
      <SearchBar />
      <div
        css={css`
          color: #9b9b9b;
          display: flex;
          flex-direction: column;
          gap: 2px;
        `}
      >
        {data.map((item) => {
          return (
            <div
              css={css`
                background-color: #141414;
                padding: 15px 10px;
              `}
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              aria-hidden="true"
            >
              <Typography variant="h3" color="text">
                {item.name}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ItemsDescription: FC<ItemDescriptionProps> = ({ id }) => {
  const { data, isLoading } = trpc.item.getItem.useQuery({ id })
  if (isLoading || !data) {
    return null
  }

  const attributeNames = data.attributes
    .map((attribute) => attribute.name)
    .join(', ')

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px 15px;
        `}
      >
        <LinkTitle title={data.name} />
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Typography variant="italic" color="text">
            Categories: {attributeNames}
          </Typography>
          <Typography variant="p" color="text">
            Source: {data.source.name}
          </Typography>
        </div>
      </div>
      <div>
        <div
          css={css`
            background-color: #141414;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-left: 22px;
            padding-bottom: 10px;
            padding-top: 10px;
          `}
        >
          <Typography variant="p" color="text">
            Cost: 15 gp
          </Typography>
        </div>
        <div
          css={css`
            background-color: #141414;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-left: 22px;
            padding-bottom: 10px;
            padding-top: 10px;
          `}
        >
          <Typography variant="p" color="text">
            Weight: 3 lbs
          </Typography>
        </div>
        <div
          css={css`
            background-color: #141414;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-left: 22px;
            padding-bottom: 10px;
            padding-top: 10px;
          `}
        >
          <Typography variant="p" color="text">
            Damage: 1d8 slashing
          </Typography>
        </div>
        <div
          css={css`
            background-color: #141414;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-left: 22px;
            font-weight: 500;
            padding-bottom: 10px;
            padding-top: 10px;
          `}
        >
          <Typography variant="p" color="text">
            Properties: Versatile (1d10)
          </Typography>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 25px;
          padding: 10px 15px;
        `}
      >
        A longsword, also written long sword, is a one-handed melee slashing
        weapon. It has a straight blade, and is typically around 3½ feet in
        length
      </div>
    </div>
  )
}

const Items = () => {
  const [id, setId] = useState('')

  const selectItemHandler = (itemId: string) => {
    setId(itemId)
  }

  return (
    <AppLayout>
      <div
        css={css`
          padding-top: calc(64px + 21px);
          margin-left: calc(33px + 326px);
          margin-right: 33px;
          color: #cecece;
          font-family: ${barlowCondensed.style.fontFamily};
          display: flex;
          gap: 10px;
          height: calc(100vh - 93px);
        `}
      >
        <div
          css={css`
            background-color: #232225;
            width: 100%;
            overflow-y: scroll;
            border-top-left-radius: 6px;
          `}
        >
          <ItemsList onSelectItem={selectItemHandler} />
        </div>
        <div
          css={css`
            background-color: #232225;
            width: 100%;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
          `}
        >
          <ItemsDescription id={id} />
        </div>
      </div>
    </AppLayout>
  )
}

export default Items
