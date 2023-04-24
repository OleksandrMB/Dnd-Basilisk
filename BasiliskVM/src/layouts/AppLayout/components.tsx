/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import { css } from '@emotion/react'
import { FC } from 'react'
import { useRouter } from 'next/router'
import ReactModal from 'react-modal'
import { signIn, signOut, useSession } from 'next-auth/react'
import { staatliches } from '../../styles/fonts'
import Typography from '../../ui/Typography'

const PAGES = [
  {
    title: 'Home',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1671109279/Rectangle_1_4_sqkkbu.png',
    route: '/'
  },
  {
    title: 'Classes',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163386/sidebar-items/Rectangle_1_qppkt1.png',
    route: '/classes'
  },
  {
    title: 'Races',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/sidebar-items/Rectangle_1_1_hje3ad.png',
    route: '/races'
  },
  {
    title: 'Feats',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/sidebar-items/Rectangle_1_2_l6mfjj.png',
    route: ''
  },
  {
    title: 'Items',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/sidebar-items/Rectangle_1_2_l6mfjj.png',
    route: '/items'
  },
  {
    title: 'Class Dashboard',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/sidebar-items/Rectangle_1_2_l6mfjj.png',
    route: '/classList'
  },
  {
    title: 'Races Dashboard',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/sidebar-items/Rectangle_1_2_l6mfjj.png',
    route: '/raceList'
  },
  {
    title: 'Spell Dashboard',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/sidebar-items/Rectangle_1_2_l6mfjj.png',
    route: '/spellList'
  },
  {
    title: 'Item Dashboard',
    image:
      'https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/sidebar-items/Rectangle_1_2_l6mfjj.png',
    route: '/itemList'
  }
]

type SidebarItemProps = { title: string; path: string; route: string }
type LoginModalProps = { isOpen: boolean; onCloseLogin: () => void }
type HeaderProps = { onOpenLogin: () => void }

const SidebarItem: FC<SidebarItemProps> = ({ route, path, title }) => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push(route)}
      css={css`
        display: flex;
        align-items: center;
        color: white;
        flex: 0 0 auto;
        width: 292px;
        height: 45px;
        padding-left: 17px;
        background: url('${path}');
        border-radius: 6px;
        border: none;
      `}
    >
      <Typography variant="h3" color="primary">
        {title}
      </Typography>
    </button>
  )
}

export function Sidebar() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: absolute;
        width: 326px;
        top: 64px;
        height: calc(100vh - 64px);
        background: #141414;
        align-items: center;
        padding: 21px 17px;
      `}
    >
      {PAGES.map((page) => (
        <SidebarItem
          key={page.route}
          title={page.title}
          path={page.image}
          route={page.route}
        />
      ))}
    </div>
  )
}

function Logo() {
  return (
    <h1
      css={css`
        font-size: 30px;
        font-weight: 400;
        line-height: 37px;
        color: #cecece;
        margin: 0;
        margin-top: 5px;
        margin-left: 20px;
        font-family: ${staatliches.style.fontFamily};
      `}
    >
      Dungeons & Dragons
    </h1>
  )
}

const HeaderControls: FC<HeaderProps> = ({ onOpenLogin }) => {
  const { status } = useSession()

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          vertical-align: middle;
          margin-left: 20px;
          height: 36px;
        }
      `}
    >
      <img
        css={css`
          margin-top: 4px;
        `}
        src="/icons/bookmark_FILL0_wght400_GRAD0_opsz48 1 (2).svg"
        alt=""
      />
      {status === 'unauthenticated' && (
        <img
          onClick={onOpenLogin}
          src="/icons/account_circle_FILL0_wght400_GRAD0_opsz48 1.svg"
          alt=""
        />
      )}
      {status === 'authenticated' && (
        <img
          onClick={() => signOut()}
          src="/icons/logout_FILL0_wght400_GRAD0_opsz48 1.svg"
          alt=""
        />
      )}
    </div>
  )
}

export const Header: FC<HeaderProps> = ({ onOpenLogin }) => (
  <div
    css={css`
      display: flex;
      height: 64px;
      width: 100%;
      background: #141414;
      border-bottom: 2px solid #000000;
      position: absolute;
      left: 0px;
      top: 0px;
      justify-content: space-between;
      padding: 0 30px;
    `}
  >
    <div
      css={css`
        display: flex;
        align-items: center;
        margin: 16px 0;
      `}
    >
      <img src="/icons/Menu.svg" alt="" />
      <Logo />
    </div>
    <HeaderControls onOpenLogin={onOpenLogin} />
  </div>
)

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onCloseLogin }) => (
  <ReactModal
    style={{
      content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '693px',
        height: '409px',
        transform: 'translate(-50%, -50%)',
        background: '#272727',
        border: 'none',
        borderRadius: '6px',
        padding: '0',
        display: 'flex'
      },
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)'
      }
    }}
    isOpen={isOpen}
    onRequestClose={onCloseLogin}
    shouldCloseOnOverlayClick
  >
    <div
      css={css`
        height: 409px;
        width: 251px;
        background: url('https://res.cloudinary.com/dio8wvboq/image/upload/v1670280005/Rectangle_5_ee4wee.png');
      `}
    />
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 30px;
        height: 409px;
        width: 442px;
        position: relative;
      `}
    >
      <img
        css={css`
          position: absolute;
          right: 10px;
          top: 10px;
        `}
        onClick={onCloseLogin}
        src="/icons/close_FILL0_wght400_GRAD0_opsz48 (1) 1.svg"
        alt=""
      />
      <Typography variant="h1" color="primary">
        Authorization
      </Typography>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <button
          type="button"
          css={css`
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            background: #5865f2;
            border-radius: 6px;
          `}
          onClick={() => signIn('discord')}
        >
          <Typography variant="h3" color="primary">
            Log-in using Discord
          </Typography>
        </button>
        <button
          type="button"
          css={css`
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            background: #ffffff;
            border-radius: 6px;
          `}
        >
          <Typography variant="h3" color="secondary">
            Log-in using Gmail
          </Typography>
        </button>
      </div>
    </div>
  </ReactModal>
)
