import styled from '@emotion/styled'
import { barlowCondensed } from '../../styles/fonts'

const FormFieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  color: #cecece;
  white-space: nowrap;
  font-family: ${barlowCondensed.style.fontFamily};
  font-weight: 500;
  font-size: 14px;
  padding-top: 10px;
  width: 100%;
`

export default FormFieldLabel
