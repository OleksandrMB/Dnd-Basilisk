import { FC, PropsWithChildren } from 'react'
import { css } from '@emotion/react'

const CommonGrid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        grid-gap: 22px;
        margin-top: 21px;
      `}
    >
      {children}
    </div>
  )
}

export default CommonGrid
