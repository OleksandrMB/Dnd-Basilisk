import { css } from '@emotion/react'
import { FC, PropsWithChildren, useState } from 'react'
import { Header, LoginModal, Sidebar } from './components'

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openLoginHandler = () => {
    setModalIsOpen(true)
  }

  const closeLoginHandler = () => {
    setModalIsOpen(false)
  }

  return (
    <div
      css={css`
        width: 100%;
        height: 100vh;
        background: url('https://res.cloudinary.com/dio8wvboq/image/upload/v1670163387/Dungeons_And_Dragons_otpjai.png');
        background-size: cover;
        position: relative;
      `}
    >
      <Header onOpenLogin={openLoginHandler} />
      <LoginModal isOpen={modalIsOpen} onCloseLogin={closeLoginHandler} />
      <Sidebar />
      <div>{children}</div>
    </div>
  )
}

export default AppLayout
