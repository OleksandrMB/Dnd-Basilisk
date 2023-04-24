import { css } from '@emotion/react'
import AppLayout from '../layouts/AppLayout'
import SearchBar from '../ui/SearchBar'
import Typography from '../ui/Typography'

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
    </div>
  )
}

const SpellNameLink = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 10px;
      `}
    >
      <Typography variant="h2" color="text">
        Mage Hand
      </Typography>
      <img
        css={css`
          height: 10px;
          margin-top: 3px;
        `}
        alt="link to a character"
        src="../../icons/link.svg"
      />
    </div>
  )
}

const SpellsDescription = () => {
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
        <SpellNameLink />
        <Typography variant="italic" color="text">
          cantrip, conjuration
        </Typography>
      </div>
      <div>
        <div
          css={css`
            border-bottom: 1px solid #454545;
            display: flex;
          `}
        >
          <div
            css={css`
              background-color: #141414;
              display: flex;
              flex-direction: column;
              width: 100%;
              padding-left: 15px;
              padding-right: 15px;
              font-weight: 500;
              padding-bottom: 10px;
              padding-top: 5px;
            `}
          >
            <Typography variant="p" color="text">
              Casting Time
            </Typography>
            <Typography variant="p" color="secondary">
              1 action
            </Typography>
          </div>
          <div
            css={css`
              background-color: #141414;
              display: flex;
              flex-direction: column;
              width: 100%;
              padding-left: 15px;
              padding-right: 15px;
              font-weight: 500;
              padding-bottom: 10px;
              padding-top: 5px;
              border-left: 1px solid #454545;
              border-right: 1px solid #454545;
            `}
          >
            <Typography variant="p" color="text">
              Range/Area
            </Typography>
            <Typography variant="p" color="secondary">
              30 ft
            </Typography>
          </div>
          <div
            css={css`
              background-color: #141414;
              display: flex;
              flex-direction: column;
              width: 100%;
              padding-left: 15px;
              padding-right: 15px;
              font-weight: 500;
              padding-bottom: 10px;
              padding-top: 5px;
            `}
          >
            <Typography variant="p" color="text">
              Duration
            </Typography>
            <Typography variant="p" color="secondary">
              1 minute
            </Typography>
          </div>
        </div>
        <div
          css={css`
            background-color: #141414;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding-left: 15px;
            padding-right: 15px;
            font-weight: 500;
            padding-bottom: 10px;
            padding-top: 5px;
          `}
        >
          <Typography variant="p" color="text">
            Components
          </Typography>
          <Typography variant="p" color="secondary">
            V, S
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
        <Typography variant="p" color="text">
          A spectral, floating hand appears at a point you choose within range.
          The hand lasts for the duration or until you dismiss it as an action.
          The hand vanishes if it is ever more than 30 feet away from you or if
          you cast this spell again.
        </Typography>
        <Typography variant="p" color="text">
          You can use your action to control the hand. You can use the hand to
          manipulate an object, open an unlocked door or container, stow or
          retrieve an item from an open container, or pour the contents out of a
          vial. You can move the hand up to 30 feet each time you use it.
        </Typography>
        <Typography variant="p" color="text">
          The hand cant attack, activate magic items, or carry more than 10
          pounds.
        </Typography>
      </div>
    </div>
  )
}

const Spells = () => {
  return (
    <AppLayout>
      <div
        css={css`
          padding-top: calc(64px + 21px);
          margin-left: calc(33px + 326px);
          margin-right: 33px;
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
          <ClassSpells />
        </div>
        <div
          css={css`
            background-color: #232225;
            width: 100%;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
          `}
        >
          <SpellsDescription />
        </div>
      </div>
    </AppLayout>
  )
}

export default Spells
