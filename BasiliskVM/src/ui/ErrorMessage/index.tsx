import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { barlowCondensed } from '../../styles/fonts'

const ErrorMsg = () => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <img src="/icons/material-symbols_error.svg" alt="error" />
      <span
        css={css`
          font-weight: 400;
          font-size: 20px;
          margin-left: 6px;

          color: #c52323;
        `}
      >
        This field is required
      </span>
    </div>
  )
}

export default ErrorMsg
