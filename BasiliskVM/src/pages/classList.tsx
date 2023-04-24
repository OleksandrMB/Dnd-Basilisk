import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import AppLayout from '../layouts/AppLayout'
import ListTable from '../ui/ListTable'
import Button from '../ui/Button'
import Typography from '../ui/Typography'

const CLASSES = [
  {
    id: '1',
    title: 'Bard',
    source: 'Players Handbook',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '2',
    title: 'Barbarian',
    source: 'Players Handbook',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '3',
    title: 'Fighter',
    source: 'Players Handbook',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '4',
    title: 'Artificer',
    source: 'Tashas Cauldron of Everything',
    author: 'Reformed Orthodox Rabbi Bill Clinton'
  },
  {
    id: '5',
    title: 'Bloodhunter',
    source: 'Critical Roll',
    author: 'shakshuka'
  }
]

const AddButton = () => {
  const router = useRouter()

  return (
    <Button onClick={() => router.push('/classForm')}>
      <Typography variant="subtitle" color="primary">
        Add Item
      </Typography>
    </Button>
  )
}

const ClassList = () => {
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
              Classes
            </Typography>
            <AddButton />
          </div>
          <ListTable data={CLASSES} />
        </div>
      </div>
    </AppLayout>
  )
}

export default ClassList
