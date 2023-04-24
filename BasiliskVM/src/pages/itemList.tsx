import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import AppLayout from '../layouts/AppLayout'
import ListTable from '../ui/ListTable'
import Button from '../ui/Button'
import Typography from '../ui/Typography'

const ITEMS = [
  {
    id: '1',
    title: 'Longsword',
    source: 'Players Handbook',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '2',
    title: 'Longsword',
    source: 'Players Handbook',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '3',
    title: 'Longsword',
    source: 'Players Handbook',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '4',
    title: 'Longsword',
    source: 'Tashas Cauldron of Everything',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '5',
    title: 'Longsword',
    source: 'Tashas Cauldron of Everything',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  }
]

const AddButton = () => {
  const router = useRouter()

  return (
    <Button onClick={() => router.push('/itemForm')}>
      <Typography variant="subtitle" color="primary">
        Add Item
      </Typography>
    </Button>
  )
}

const ItemList = () => {
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
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <Typography variant="h1" color="primary">
              Items
            </Typography>
            <AddButton />
          </div>
          <ListTable data={ITEMS} />
        </div>
      </div>
    </AppLayout>
  )
}

export default ItemList
