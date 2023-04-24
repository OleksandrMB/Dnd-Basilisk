import { css } from '@emotion/react'
import { useState } from 'react'
import { GetStaticPropsContext, NextPage } from 'next'
import { CharacterRace } from '@prisma/client'
import AppLayout from '../../layouts/AppLayout'
import { barlowCondensed } from '../../styles/fonts'
import Typography from '../../ui/Typography'
import prisma from '../../server/db/client'

const RACES_DETAILS_DATA = {
  name: 'Dwarf',
  attributes: [
    { attribute: 'TYPE', value: 'humanoid' },
    { attribute: 'ATTRIBUTE', value: 'CON +2' },
    { attribute: 'SIZE', value: 'Medium' },
    { attribute: 'SPEED', value: '25 ft' },
    { attribute: 'DARKVISION', value: '60 ft' }
  ],
  quote:
    '“Yer late, elf!” came the rough edge of a familiar voice. Bruenor Battlehammer walked up the back of his dead foe, disregarding the fact that the heavy monster lay on top of his elven friend. In spite of the added discomfort, the dwarf’s long, pointed, often-broken nose and gray-streaked though still-fiery red beard came as a welcome sight to Drizzt. “Knew I’d find ye in trouble if I came out an’ looked for ye!”'
}

const Attributes = () => {
  return (
    <div
      css={css`
        color: #cecece;
        font-weight: 500;
        display: flex;
        gap: 20px;
        font-size: 20px;
      `}
    >
      {RACES_DETAILS_DATA.attributes.map((item) => {
        return (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 5px 50px;
              width: 100%;
              background-color: #141414;
              border-radius: 6px;
            `}
          >
            <Typography variant="h2" color="text">
              {item.attribute}
            </Typography>
            <Typography variant="h2" color="secondary">
              {item.value}{' '}
            </Typography>
          </div>
        )
      })}
    </div>
  )
}

const DropdownBtn = () => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsClicked(!isClicked)}
        css={css`
          background-color: ${isClicked ? '#232225' : '#141414'};
          color: #cecece;
          font-family: ${barlowCondensed.style.fontFamily};
          border: 0;
          border-radius: 6px;
          width: 100%;
          font-size: 20px;
          font-weight: 600;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 10px;
          padding-bottom: 10px;
          display: flex;
          justify-content: space-between;
          white-space: nowrap;

          :hover {
            cursor: pointer;
          }
        `}
      >
        <Typography variant="h3" color="text">
          Description
        </Typography>
        {isClicked ? (
          <div
            css={css`
              width: 100%;
              margin-top: 12px;
              border-bottom: 1px solid #363636;
              line-height: 0.1em;
              margin-left: 3px;
              margin-right: 7px;
            `}
          />
        ) : null}
        <div>
          <img
            css={css`
              width: 24px;
              height: 14px;
              transform: ${isClicked ? 'rotate(180deg)' : ''};
            `}
            alt="dropdown btn"
            src="../../icons/dropdown.svg"
          />
        </div>
      </button>

      {isClicked ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 25px;
            padding: 0 10px;
          `}
        >
          <Typography variant="p" color="text">
            Kingdoms rich in ancient grandeur, halls carved into the roots of
            mountains, the echoing of picks and hammers in deep mines and
            blazing forges, a commitment to clan and tradition, and a burning
            hatred of goblins and orcs—these common threads unite all dwarves.{' '}
          </Typography>
          <Typography variant="p" color="text">
            Short and Stout. Bold and hardy, dwarves are known as skilled
            warriors, miners, and workers of stone and metal. Though they stand
            well under 5 feet tall, dwarves are so broad and compact that they
            can weigh as much as a human standing nearly two feet taller. Their
            courage and endurance are also easily a match for any of the larger
            folk.
          </Typography>
          <Typography variant="p" color="text">
            Dwarven skin ranges from deep brown to a paler hue tinged with red,
            but the most common shades are light brown or deep tan, like certain
            tones of earth. Their hair, worn long but in simple styles, is
            usually black, gray, or brown, though paler dwarves often have red
            hair. Male dwarves value their beards highly and groom them
            carefully.
          </Typography>
        </div>
      ) : null}
    </>
  )
}

interface Props {
  characterRace: CharacterRace
}

const RacesDetails: NextPage<Props> = ({ characterRace }: Props) => {
  return (
    <AppLayout>
      <div
        css={css`
          margin-left: calc(30px + 326px);
          padding-top: calc(64px + 21px);
          margin-right: 30px;
          color: #cecece;
          font-family: ${barlowCondensed.style.fontFamily};
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 15px;
            align-items: center;
            margin-bottom: 15px;
          `}
        >
          <Typography variant="h1" color="primary">
            {characterRace.name}
          </Typography>
          <img
            css={css`
              padding-top: 6px;
            `}
            alt="link to a character"
            src="../../icons/link.svg"
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
            height: calc(100vh - 181px);
            overflow-y: scroll;
            background-color: #232225;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            padding: 10px 30px;
          `}
        >
          <Attributes />

          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 25px;
              background-color: #141414;
              border-radius: 6px;
              padding: 10px;
            `}
          >
            <Typography variant="italic" color="text">
              {RACES_DETAILS_DATA.quote}
            </Typography>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
              `}
            >
              <Typography variant="p" color="text">
                — R. A. Salvatore, The Crystal Shard
              </Typography>
            </div>
          </div>
          <DropdownBtn />
          <DropdownBtn />
          <DropdownBtn />
          <DropdownBtn />
          <DropdownBtn />
        </div>
      </div>
    </AppLayout>
  )
}

export default RacesDetails

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const characterRace = await prisma.characterRace.findFirst({
    where: {
      id: context.params?.id
    }
  })

  return {
    props: {
      characterRace
    },

    revalidate: 10
  }
}

export const getStaticPaths = async () => {
  const characterRaces = await prisma.characterRace.findMany({
    select: {
      id: true
    }
  })

  const paths = characterRaces.map(({ id }) => {
    return { params: { id } }
  })

  return { paths, fallback: 'blocking' }
}
