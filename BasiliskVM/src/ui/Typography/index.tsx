import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { FC, PropsWithChildren } from 'react'
import { barlowCondensed } from '../../styles/fonts'

const H1 = styled.h1`
  margin: 0;
  color: white;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 500;
  font-size: 48px;
`
const H2 = styled.h2`
  margin: 0;
  color: white;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 500;
  font-size: 24px;
`

const H3 = styled.h3`
  margin: 0;
  color: white;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 500;
  font-size: 20px;
`

const Paragraph = styled.p`
  margin: 0;
  color: #cecece;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
`

const Italic = styled.p`
  margin: 0;
  color: #cecece;
  font-family: ${barlowCondensed.style.fontFamily};
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
`

const Subtitle = styled.p`
  margin: 0;
  color: #cecece;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 500;
  font-size: 14px;
`

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'p' | 'italic' | 'subtitle'
  color: 'text' | 'primary' | 'secondary' | 'link'
}

const colorToCodeMap = {
  primary: '#FFFFFF',
  text: '#CECECE',
  secondary: '#9B9B9B',
  link: '#6169AF'
}

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  variant,
  color,
  children
}) => {
  const colorCode = colorToCodeMap[color]

  return (
    <>
      {variant === 'h1' && (
        <H1
          css={css`
            color: ${colorCode};
          `}
        >
          {children}
        </H1>
      )}
      {variant === 'h2' && (
        <H2
          css={css`
            color: ${colorCode};
          `}
        >
          {children}
        </H2>
      )}
      {variant === 'h3' && (
        <H3
          css={css`
            color: ${colorCode};
          `}
        >
          {children}
        </H3>
      )}
      {variant === 'p' && (
        <Paragraph
          css={css`
            color: ${colorCode};
          `}
        >
          {children}
        </Paragraph>
      )}
      {variant === 'italic' && (
        <Italic
          css={css`
            color: ${colorCode};
          `}
        >
          {children}
        </Italic>
      )}
      {variant === 'subtitle' && (
        <Subtitle
          css={css`
            color: ${colorCode};
          `}
        >
          {children}
        </Subtitle>
      )}
    </>
  )
}

export default Typography
