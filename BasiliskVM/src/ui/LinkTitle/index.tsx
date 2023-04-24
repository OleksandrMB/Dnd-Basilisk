import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'
import Typography from '../Typography'

type LinkTitleProps = {
  title: string
}
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const LinkTitle: FC<LinkTitleProps> = ({ title }) => {
  return (
    <Container>
      <Typography variant="h2" color="text">
        {title}
      </Typography>
      <img
        css={css`
          height: 10px;
          margin-top: 3px;
        `}
        alt="link to a character"
        src="../../icons/link.svg"
      />
    </Container>
  )
}

export default LinkTitle
