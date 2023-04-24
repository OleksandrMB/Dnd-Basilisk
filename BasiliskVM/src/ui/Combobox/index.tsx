/* eslint-disable react/jsx-props-no-spreading */

import Autocomplete, { AutocompleteProps } from '@mui/joy/Autocomplete'
import { styled } from '@mui/joy/styles'
import AutocompleteListbox from '@mui/joy/AutocompleteListbox'
import AutocompleteOption from '@mui/joy/AutocompleteOption'
import ListItemContent from '@mui/joy/ListItemContent'
import { FC, forwardRef } from 'react'
import { barlowCondensed } from '../../styles/fonts'
import Typography from '../Typography'

const Listbox = forwardRef<HTMLUListElement, any>((props, ref) => {
  if (!props.open) {
    return null
  }

  return (
    <AutocompleteListbox
      ref={ref}
      {...props}
      variant="plain"
      size="sm"
      sx={{
        '--List-padding': '0px',
        '--List-radius': '0px',
        '--List-item-paddingX': '8px',
        '--List-item-paddingY': '8px',
        backgroundColor: '#141414',
        borderColor: '#454545',
        minWidth: '100%',
        boxShadow: 'none'
      }}
    />
  )
})

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: '#cecece',
  marginTop: '10px',
  width: '100%',
  height: '42px',
  border: '1px solid #3d3d3d',
  backgroundColor: '#141414',
  '--Input-focusedHighlight': '#5865f2',
  transition: 'none',
  fontFamily: `${barlowCondensed.style.fontFamily}`,
  fontWeight: '500',
  fontSize: '14px',
  ':hover': {
    border: '1px solid #3d3d3d !important',
    color: '#cecece !important'
  }
}))

const Combobox: FC<AutocompleteProps<any, any, any, any>> = (props) => {
  const { getOptionLabel } = props

  return (
    <StyledAutocomplete
      {...props}
      forcePopupIcon={false}
      openOnFocus
      slots={{ listbox: Listbox }}
      renderOption={(renderProps, option: any) => (
        <AutocompleteOption
          sx={{
            WebkitTransition: 'none',
            backgroundColor: '#141414 !important',
            ':hover': {
              backgroundColor: '#242424 !important'
            }
          }}
          {...renderProps}
        >
          <ListItemContent>
            <Typography variant="subtitle" color="text">
              {getOptionLabel ? getOptionLabel(option) : option.label}
            </Typography>
          </ListItemContent>
        </AutocompleteOption>
      )}
    />
  )
}

export default Combobox
