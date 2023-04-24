/* eslint-disable react/jsx-props-no-spreading */
import { IconButton } from '@mui/joy'
import { styled } from '@mui/joy/styles'

const StyledIconButton = styled(IconButton)(() => ({
  '&:hover': {
    backgroundColor: '#5865f227'
  },
  '& svg': {
    color: '#5865f2'
  }
}))

StyledIconButton.defaultProps = {
  variant: 'plain'
}
export default StyledIconButton
