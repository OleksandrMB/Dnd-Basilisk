import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { FC, useState } from 'react'
import { GetStaticPropsContext, NextPage } from 'next'
import { CharacterClass } from '@prisma/client'
import { barlowCondensed } from '../../styles/fonts'
import AppLayout from '../../layouts/AppLayout'
import ClassLevelDetails from '../../types/api/characterClass'
import { classLevelDetailsData } from '../../../mocks/classDetails'
import prisma from '../../server/db/client'
import Typography from '../../ui/Typography'
import SearchBar from '../../ui/SearchBar'

const columnWidthInPx = {
  level: 52,
  proficiencyBonus: 82,
  features: 266,
  cantrips: 68,
  spells: 56,
  spellSlotsParent: 534,
  spellSlot: 58
}

const pluralize = (number: number): string => {
  if (number > 2) {
    return `${number}rd`
  }

  if (number === 2) {
    return '2nd'
  }

  return '1st'
}

const TableCell = styled.td`
  font-size: 14px;
  height: 30px;
  background-color: #242424;
  border: 1px solid #363636;
`

const TableHeadingCell = styled.th`
  background-color: #141414;
  font-size: 16px;
  min-height: 120px;
  border: 1px solid #363636;
  font-weight: 500;
`

const TableRow: FC<ClassLevelDetails> = ({ details }) => {
  let cellBackgroundColor = '#242424'
  if (details.level % 2 === 0) {
    cellBackgroundColor = '#141414'
  }

  return (
    <tr
      css={css`
        td {
          background-color: ${cellBackgroundColor};
        }
      `}
    >
      <TableCell
        css={css`
          width: ${columnWidthInPx.level}px;
          text-align: center;
        `}
      >
        <Typography variant="subtitle" color="text">
          {details.level}
        </Typography>
      </TableCell>
      <TableCell
        css={css`
          width: ${columnWidthInPx.proficiencyBonus}px;
          text-align: center;
        `}
      >
        <Typography variant="subtitle" color="text">
          {details.proficiencyBonus}
        </Typography>
      </TableCell>
      <TableCell
        css={css`
          width: ${columnWidthInPx.features}px;
          padding-left: 36px;
          padding-right: 36px;
        `}
      >
        {details.features.map((f) => (
          <Typography key={f.text} variant="subtitle" color="text">
            {f.text}
          </Typography>
        ))}
      </TableCell>
      <TableCell
        css={css`
          width: ${columnWidthInPx.cantrips}px;
          text-align: center;
        `}
      >
        <Typography variant="subtitle" color="text">
          {details.cantrips}
        </Typography>
      </TableCell>
      <TableCell
        css={css`
          width: ${columnWidthInPx.spells}px;
          text-align: center;
        `}
      >
        <Typography variant="subtitle" color="text">
          {details.spells}
        </Typography>
      </TableCell>
      {details.spellSlots.map((slotQuantity) => {
        return (
          <TableCell
            key={details.level}
            css={css`
              width: ${columnWidthInPx.spells}px;
              text-align: center;
            `}
          >
            <Typography variant="subtitle" color="text">
              {slotQuantity}
            </Typography>
          </TableCell>
        )
      })}
    </tr>
  )
}

const TableHeader = () => {
  return (
    <thead>
      <TableHeadingCell
        css={css`
          width: ${columnWidthInPx.level}px;
        `}
        colSpan={1}
      >
        <Typography variant="p" color="text">
          Level
        </Typography>
      </TableHeadingCell>
      <TableHeadingCell
        css={css`
          width: ${columnWidthInPx.proficiencyBonus}px;
        `}
        colSpan={1}
      >
        <Typography variant="p" color="text">
          Proficiency bonus
        </Typography>
      </TableHeadingCell>
      <TableHeadingCell
        css={css`
          width: ${columnWidthInPx.features}px;
        `}
        colSpan={1}
      >
        <Typography variant="p" color="text">
          Features
        </Typography>
      </TableHeadingCell>
      <TableHeadingCell
        css={css`
          width: ${columnWidthInPx.cantrips}px;
        `}
        colSpan={1}
      >
        <Typography variant="p" color="text">
          Cantrips known
        </Typography>
      </TableHeadingCell>
      <TableHeadingCell
        css={css`
          width: ${columnWidthInPx.spells}px;
        `}
        colSpan={1}
      >
        <Typography variant="p" color="text">
          Spells known
        </Typography>
      </TableHeadingCell>
      <TableHeadingCell
        colSpan={9}
        css={css`
          width: 534px;
        `}
      >
        <table
          css={css`
            width: calc(100% + 4px);
            border-collapse: collapse;
            margin-left: -2px;
            margin-bottom: -1px;
            table-layout: fixed;
          `}
        >
          <thead>
            <th
              colSpan={9}
              css={css`
                height: 62px;
              `}
            >
              <Typography variant="p" color="text">
                Spells per level
              </Typography>
            </th>
          </thead>
          <tbody>
            <tr>
              {classLevelDetailsData.map(({ details }) => {
                if (details.level > 9) {
                  return false
                }

                return (
                  <TableCell
                    key={details.level}
                    css={css`
                      height: 60px;
                      border-left: none;
                      border-bottom: none;
                      background-color: #141414;
                      &:last-of-type {
                        border-right: none;
                      }
                    `}
                  >
                    {pluralize(details.level)}
                  </TableCell>
                )
              })}
            </tr>
          </tbody>
        </table>
      </TableHeadingCell>
    </thead>
  )
}

const Table = () => {
  return (
    <div
      css={css`
        font-size: 16px;
        padding: 0;
        margin: 0;
      `}
    >
      <table
        cellSpacing={0}
        cellPadding={0}
        css={css`
          border-collapse: collapse;
          margin: 0;
          width: calc(100vw - 402px);
          height: 100vh;
          tr,
          td {
            margin: 0px;
          }
        `}
      >
        <TableHeader />
        <tbody>
          {classLevelDetailsData.map((level) => {
            return (
              <TableRow key={level.details.level} details={level.details} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const PAGES_BUTTON_TEXT = [
  { title: 'Features' },
  { title: 'Description' },
  { title: 'Spells' }
]

const PageBtnList: React.FC<{ onPageBtnClick: (btnValue: string) => void }> = (
  props
) => {
  const [active, setActive] = useState('Features')
  const { onPageBtnClick } = props
  return (
    <div
      css={css`
        display: flex;

        button:first-child {
          border-radius: 6px 0px 0px 0px;
        }

        button:last-child {
          border-radius: 0px 6px 0px 0px;
        }

        button:not(:first-child):not(:last-child) {
          border-left: 1px solid #2d2d2d;
          border-right: 1px solid #2d2d2d;
        }
      `}
    >
      {PAGES_BUTTON_TEXT.map((item) => {
        return (
          <button
            type="button"
            key={item.title}
            onClick={() => {
              setActive(item.title)
              onPageBtnClick(item.title)
            }}
            css={css`
              width: 100%;
              height: 58px;
              border: none;
              padding: 0;
              cursor: pointer;
            `}
            style={{
              backgroundColor: item.title === active ? '#5865F2' : '#282E77'
            }}
          >
            <Typography variant="h2" color="primary">
              {item.title}
            </Typography>
          </button>
        )
      })}
    </div>
  )
}

const HIT_POINTS_DATA = {
  dice: '1d8 per bard level',
  hpAtLvlOne: '8 + your Constitution modifier',
  hpAfterLvlOne:
    '1d8 (or 5) + your Constitution modifier per bard level after 1st'
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
          margin-top: 10px;
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
          Hit Points
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
            gap: 7px;
            padding: 0 10px;
          `}
        >
          <Typography variant="p" color="text">
            Hit Dice: {HIT_POINTS_DATA.dice}
          </Typography>
          <Typography variant="p" color="text">
            Hit Points at 1st Level: {HIT_POINTS_DATA.hpAtLvlOne}
          </Typography>
          <Typography variant="p" color="text">
            Hit Points at Higher Levels: {HIT_POINTS_DATA.hpAfterLvlOne}{' '}
          </Typography>
        </div>
      ) : null}
    </>
  )
}

const ClassFeatures = () => {
  return (
    <>
      <Table />

      <div
        css={css`
          font-size: 16px;
          padding-top: 10px;
          padding-left: 30px;
          padding-right: 30px;
          padding-bottom: 100px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 17px;
            padding-left: 6px;
          `}
        >
          <Typography variant="p" color="text">
            As a bard, you gain the following class features.
          </Typography>
        </div>
        <div
          css={css`
            margin-left: 10px;
            margin-right: 10px;
          `}
        >
          <DropdownBtn />
          <DropdownBtn />
          <DropdownBtn />
          <DropdownBtn />
          <DropdownBtn />
          <DropdownBtn />
        </div>
      </div>
    </>
  )
}

const descriptionPageData = {
  stories: [
    {
      story:
        'Humming as she traces her fingers over an ancient monument in a long-forgotten ruin, a half-elf in rugged leathers finds knowledge springing into her mind, conjured forth by the magic of her song—knowledge of the people who constructed the monument and the mythic saga it depicts.'
    },
    {
      story:
        'A stern human warrior bangs his sword rhythmically against his scale mail, setting the tempo for his war chant and exhorting his companions to bravery and heroism. The magic of his song fortifies and emboldens them.'
    },
    {
      story:
        'Laughing as she tunes her cittern, a gnome weaves her subtle magic over the assembled nobles, ensuring that her companions’ words will be well received.'
    }
  ],
  addition:
    'Whether scholar, skald, or scoundrel, a bard weaves magic through words and music to inspire allies, demoralize foes, manipulate minds, create illusions, and even heal wounds.',
  classAbilitiesDescription: [
    {
      abilitie: {
        title: 'Music and Magic',
        texts: [
          {
            text: 'In the worlds of D&D, words and music are not just vibrations of air, but vocalizations with power all their own. The bard is a master of song, speech, and the magic they contain. Bards say that the multiverse was spoken into existence, that the words of the gods gave it shape, and that echoes of these primordial Words of Creation still resound throughout the cosmos. The music of bards is an attempt to snatch and harness those echoes, subtly woven into their spells and powers.'
          },
          {
            text: 'The greatest strength of bards is their sheer versatility. Many bards prefer to stick to the sidelines in combat, using their magic to inspire their allies and hinder their foes from a distance. But bards are capable of defending themselves in melee if necessary, using their magic to bolster their swords and armor. Their spells lean toward charms and illusions rather than blatantly destructive spells. They have a wide-ranging knowledge of many subjects and a natural aptitude that lets them do almost anything well. Bards become masters of the talents they set their minds to perfecting, from musical performance to esoteric knowledge.'
          }
        ]
      }
    },
    {
      abilitie: {
        title: 'Learning from Experience',
        texts: [
          {
            text: 'True bards are not common in the world. Not every minstrel singing in a tavern or jester cavorting in a royal court is a bard. Discovering the magic hidden in music requires hard study and some measure of natural talent that most troubadours and jongleurs lack. It can be hard to spot the difference between these performers and true bards, though. A bard’s life is spent wandering across the land gathering lore, telling stories, and living on the gratitude of audiences, much like any other entertainer. But a depth of knowledge, a level of musical skill, and a touch of magic set bards apart from their fellows.'
          },
          {
            text: 'Only rarely do bards settle in one place for long, and their natural desire to travel—to find new tales to tell, new skills to learn, and new discoveries beyond the horizon—makes an adventuring career a natural calling. Every adventure is an opportunity to learn, practice a variety of skills, enter long-forgotten tombs, discover lost works of magic, decipher old tomes, travel to strange places, or encounter exotic creatures. Bards love to accompany heroes to witness their deeds firsthand. A bard who can tell an awe-inspiring story from personal experience earns renown among other bards. Indeed, after telling so many stories about heroes accomplishing mighty deeds, many bards take these themes to heart and assume heroic roles themselves.'
          }
        ]
      }
    }
  ]
}

const ClassDescription = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 10px;
        padding-left: 30px;
        padding-right: 30px;
      `}
    >
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
        {descriptionPageData.stories.map((story) => {
          return (
            <Typography
              variant="italic"
              color="text"
              key={descriptionPageData.stories.indexOf(story)}
            >
              {story.story}
            </Typography>
          )
        })}
      </div>
      <Typography variant="p" color="text">
        {descriptionPageData.addition}
      </Typography>

      <div>
        {descriptionPageData.classAbilitiesDescription.map((abilitie) => {
          return (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 10px;
              `}
              key={abilitie.abilitie.title}
            >
              <Typography variant="h3" color="text">
                {abilitie.abilitie.title}
              </Typography>
              <hr
                css={css`
                  border: 1px solid #454545;
                  margin: 0;
                `}
              />
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 25px;
                `}
              >
                {abilitie.abilitie.texts.map((text) => {
                  return (
                    <Typography
                      variant="p"
                      color="text"
                      key={abilitie.abilitie.texts.indexOf(text)}
                    >
                      {text.text}
                    </Typography>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SPELLS_DATA = [
  {
    spellProperty: 'Cantrip',
    spellName: 'Mage Hand',
    spellType: 'Conjuration',
    requiredComponents: [
      { component: 'V', req: true },
      { component: 'S', req: true },
      { component: 'M', req: false }
    ]
  },
  {
    spellProperty: 'Cantrip',
    spellName: 'Mage Hand',
    spellType: 'Conjuration',
    requiredComponents: [
      { component: 'V', req: true },
      { component: 'S', req: true },
      { component: 'M', req: false }
    ]
  },
  {
    spellProperty: 'Cantrip',
    spellName: 'Mage Hand',
    spellType: 'Conjuration',
    requiredComponents: [
      { component: 'V', req: true },
      { component: 'S', req: true },
      { component: 'M', req: false }
    ]
  },
  {
    spellProperty: 'Cantrip',
    spellName: 'Mage Hand',
    spellType: 'Conjuration',
    requiredComponents: [
      { component: 'V', req: true },
      { component: 'S', req: true },
      { component: 'M', req: false }
    ]
  }
]

const ClassSpells = () => {
  return (
    <>
      <SearchBar hasBorderRadius={false} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 2px;
        `}
      >
        {SPELLS_DATA.map((spell) => {
          return (
            <div
              css={css`
                display: flex;
                background-color: #141414;
              `}
              key={spell.spellName}
            >
              <div
                css={css`
                  display: flex;
                  padding: 0 10px;
                  align-items: center;
                  border-right: 1px solid #454545;
                `}
              >
                <Typography variant="p" color="secondary">
                  {spell.spellProperty}
                </Typography>
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                `}
              >
                <div
                  css={css`
                    padding-left: 12px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                  `}
                >
                  <Typography variant="p" color="text">
                    {spell.spellName}
                  </Typography>
                  <Typography variant="p" color="secondary">
                    {spell.spellType}
                  </Typography>
                </div>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    gap: 5px;
                  `}
                >
                  {spell.requiredComponents.map((component) => {
                    if (component.req === true) {
                      return (
                        <Typography
                          variant="p"
                          color="secondary"
                          key={component.component}
                        >
                          {component.component}
                        </Typography>
                      )
                    }
                    return false
                  })}
                  <span
                    css={css`
                      text-align: center;
                    `}
                  >
                    &#183;
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

type Props = {
  characterClass: CharacterClass
}

const ClassDetails: NextPage<Props> = ({ characterClass }: Props) => {
  const [pageState, setPageState] = useState('Features')
  const onPageBtnClick = (btnValue: string) => {
    setPageState(btnValue)
  }

  return (
    <AppLayout>
      <div
        css={css`
          padding-top: calc(64px + 21px);
          margin-left: calc(30px + 326px);
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
            {characterClass.name}
          </Typography>
          <img
            css={css`
              padding-top: 6px;
            `}
            alt="link to a character"
            src="../../icons/link.svg"
          />
        </div>

        <PageBtnList onPageBtnClick={onPageBtnClick} />

        <div
          css={css`
            height: calc(100vh - 239px);
            overflow-y: scroll;
            background-color: #232225;
          `}
        >
          {pageState === 'Features' ? <ClassFeatures /> : null}
          {pageState === 'Description' ? <ClassDescription /> : null}
          {pageState === 'Spells' ? <ClassSpells /> : null}
        </div>
      </div>
    </AppLayout>
  )
}

export default ClassDetails

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const characterClass = await prisma.characterClass.findFirst({
    where: {
      id: context.params?.id
    }
  })

  return {
    props: {
      characterClass
    },

    revalidate: 10
  }
}

export const getStaticPaths = async () => {
  const classes = await prisma.characterClass.findMany({
    select: {
      id: true
    }
  })

  const paths = classes.map(({ id }) => {
    return { params: { id } }
  })

  return { paths, fallback: 'blocking' }
}
