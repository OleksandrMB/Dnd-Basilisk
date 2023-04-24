import { css } from '@emotion/react'
import { FC } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '../../layouts/AppLayout'
import CommonGrid from '../../layouts/CommonGrid'
import SearchBar from '../../ui/SearchBar'
import Typography from '../../ui/Typography'
import { trpc } from '../../utils/trpc'

type RacesCardProps = {
  id: string
  name: string
  source: string
  imgPath: string
}

const RaceCard: FC<RacesCardProps> = ({ name, source, imgPath, id }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/races/${id}`)}
      aria-hidden="true"
      css={css`
        display: flex;
        align-items: center;
        width: 100%;
        height: 123px;
        background: url('${imgPath}');
        background-size: cover;
        width: 100%;
        padding: 4px 10px;
        border-radius: 6px;
        position: relative;
        :hover {
          cursor: pointer;
        }
      `}
    >
      <div
        css={css`
          padding-bottom: 10px;
        `}
      >
        <Typography variant="h1" color="primary">
          {name}
        </Typography>
      </div>

      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 35px;
          height: 22px;
          background-color: #871445;
          top: 4px;
          right: 4px;
          border-radius: 6px;
        `}
      >
        <Typography variant="subtitle" color="primary">
          {source}
        </Typography>
      </div>
    </div>
  )
}

function Races() {
  const { data = [] } = trpc.characterRace.getAll.useQuery()

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
          {data.map((race) => (
            <RaceCard
              key={race.id}
              id={race.id}
              name={race.name}
              source={race.source.name}
              imgPath={race.coverImage}
            />
          ))}
        </CommonGrid>
      </div>
    </AppLayout>
  )
}

export default Races
