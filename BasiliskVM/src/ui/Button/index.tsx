import styled from '@emotion/styled'
import { barlowCondensed } from '../../styles/fonts'

const Button = styled.button`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 60px;
  padding-right: 60px;
  border-radius: 6px;
  background-color: #5865f2;
  color: white;
  text-align: center;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #737efb;
  }
`

export default Button
