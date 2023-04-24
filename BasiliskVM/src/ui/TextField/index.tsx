import styled from '@emotion/styled'
import { barlowCondensed } from '../../styles/fonts'

type TextFieldProps = {
  isError?: boolean
}

const TextField = styled.input<TextFieldProps>`
  box-sizing: border-box;
  margin-top: 10px;
  padding-left: 8px;
  height: 42px;
  width: 100%;
  min-width: 165px;
  background-color: #141414;
  color: #cecece;
  border-style: solid;
  border-width: ${(props) => (props.isError ? '2px' : '1px')};
  border-color: ${(props) => (props.isError ? '#A40000' : '#3d3d3d')};
  border-radius: 6px;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 400;
  font-size: 14px;

  &:focus,
  &:focus-visible {
    border: 2px solid #5865f2;
    outline: none;
  }

  &::file-selector-button {
    all: unset;
    display: none;
  }
`

export default TextField
