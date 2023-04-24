import { Checkbox } from '@mui/joy'
import { styled } from '@mui/joy/styles'
import { barlowCondensed } from '../../styles/fonts'

const StyledCheckbox = styled(Checkbox)(() => ({
  color: '#CECECE',
  fontFamily: barlowCondensed.style.fontFamily,
  fontSize: '14px',
  fontWeight: 500,
  '& > span:hover': {
    backgroundColor: '#5865f29c'
  },
  '&.Joy-checked > span, &.Joy-checked > span:hover': {
    backgroundColor: '#5865f2'
  }
}))

export default StyledCheckbox
