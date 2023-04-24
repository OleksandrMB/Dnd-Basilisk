import { css } from '@emotion/react'
import { FC } from 'react'
import { useRouter } from 'next/router'
import AppLayout from '../../layouts/AppLayout'
import Typography from '../../ui/Typography'
import CommonGrid from '../../layouts/CommonGrid'
import { trpc } from '../../utils/trpc'

type ClassCardProps = {
  id: string
  name: string
  dice: number
  source: string
  imgPath: string
}

const ClassCard: FC<ClassCardProps> = ({ id, name, dice, source, imgPath }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/classes/${id}`)}
      aria-hidden="true"
      css={css`
        display: flex;
        align-items: center;
        width: 100%;
        height: 123px;
        border-radius: 6px;
        padding: 4px 10px;
        background: url('${imgPath}');
        background-size: cover;
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
          position: absolute;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 33px;
          left: 10px;
          bottom: 5px;
          background: url('/icons/Polygon 1.png');
          background-size: contain;
          background-repeat: no-repeat;
        `}
      >
        <Typography variant="subtitle" color="primary">
          {`D${dice}`}
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

function Classes() {
  const { data = [] } = trpc.characterClass.getAll.useQuery()

  return (
    <AppLayout>
      <div
        css={css`
          height: 100vh;
          padding-top: 63px;
          padding-left: 359px;
          padding-right: 33px;
        `}
      >
        <CommonGrid>
          {data.map((characterClass) => {
            return (
              <ClassCard
                id={characterClass.id}
                key={characterClass.id}
                name={characterClass.name}
                dice={characterClass.hitDice}
                source={characterClass.source.name}
                imgPath={characterClass.coverImage}
              />
            )
          })}
        </CommonGrid>
      </div>
    </AppLayout>
  )
}

export default Classes
