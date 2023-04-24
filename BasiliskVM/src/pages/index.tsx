import { type NextPage } from 'next'
import { css } from '@emotion/react'
import { FC } from 'react'
import AppLayout from '../layouts/AppLayout'
import CommonGrid from '../layouts/CommonGrid'
import { barlowCondensed } from '../styles/fonts'
import SearchBar from '../ui/SearchBar'
import Button from '../ui/Button'
import Typography from '../ui/Typography'

const CAMPAIGNS = [
  {
    id: '1',
    title: 'Prite',
    date: 'Friday: 16:30 - 19:30',
    img_path:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671111633/Rectangle_22_ilbpnd.png'
  },
  {
    id: '2',
    title: 'Prite',
    date: 'Friday: 16:30 - 19:30',
    img_path:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671111633/Rectangle_22_ilbpnd.png'
  },
  {
    id: '3',
    title: 'Prite',
    date: 'Friday: 16:30 - 19:30',
    img_path:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671111633/Rectangle_22_ilbpnd.png'
  },
  {
    id: '4',
    title: 'Prite',
    date: 'Friday: 16:30 - 19:30',
    img_path:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671111633/Rectangle_22_ilbpnd.png'
  },
  {
    id: '5',
    title: 'Prite',
    date: 'Friday: 16:30 - 19:30',
    img_path:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671111633/Rectangle_22_ilbpnd.png'
  },
  {
    id: '6',
    title: 'Prite',
    date: 'Friday: 16:30 - 19:30',
    img_path:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671111633/Rectangle_22_ilbpnd.png'
  },
  {
    id: '7',
    title: 'Prite',
    date: 'Friday: 16:30 - 19:30',
    img_path:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671111633/Rectangle_22_ilbpnd.png'
  }
]

type CampaignCardProps = { title: string; date: string; img_path: string }

const CampaignCard: FC<CampaignCardProps> = ({ img_path, title, date }) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 123px;
        border-radius: 6px;
        position: relative;
        background-color: #232225;
      `}
    >
      <img
        css={css`
          height: 123px;
        `}
        src={img_path}
        alt=""
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: calc(100% - 136px);
          padding-top: 10px;
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 5px;
        `}
      >
        <Typography variant="h2" color="text">
          {title}
        </Typography>

        <Typography variant="p" color="text">
          {date}
        </Typography>
        <button
          type="button"
          css={css`
            height: 24px;
            width: 100%;
            margin-top: 21px;
            border-radius: 6px;
            background-color: #5865f2;
            border: none;
          `}
        >
          <Typography variant="p" color="primary">
            START
          </Typography>
        </button>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div
        css={css`
          width: calc(100%-326px);
          height: 100vh;
          padding-top: 83px;
          padding-left: 359px;
          padding-right: 33px;
        `}
      >
        <SearchBar hasBorderRadius />
        <CommonGrid>
          {CAMPAIGNS.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              title={campaign.title}
              date={campaign.date}
              img_path={campaign.img_path}
            />
          ))}
        </CommonGrid>
      </div>
    </AppLayout>
  )
}

export default Home
