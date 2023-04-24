import Textarea from '@mui/joy/Textarea'
import { styled } from '@mui/joy/styles'
import { barlowCondensed } from '../../styles/fonts'

const CustomTextarea = styled(Textarea)(() => ({
  width: '100%',
  marginTop: '10px',
  color: '#cecece',
  backgroundColor: '#141414',
  border: '1px solid #3d3d3d',
  fontFamily: `${barlowCondensed.style.fontFamily}`,
  fontWeight: '400',
  fontSize: '14px',
  '--Textarea-focusedHighlight': '#5865f2'
}))

export default CustomTextarea
