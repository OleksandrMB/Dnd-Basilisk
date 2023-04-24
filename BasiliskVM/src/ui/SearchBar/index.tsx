import { css } from '@emotion/react'
import React from 'react'
import { barlowCondensed } from '../../styles/fonts'
import Typography from '../Typography'

const FilterButton = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 10px;
        border-left: 1px #454545 solid;
        padding-left: 10px;
        width: 103px;
        height: 46px;
      `}
    >
      <img
        css={css`
          height: 36px;
          width: 36px;
        `}
        alt="filter button"
        src="/icons/filter_alt_FILL0_wght400_GRAD-25_opsz48 1.svg"
      />
      <Typography variant="h3" color="text">
        Filters
      </Typography>
    </div>
  )
}

interface SearchBarProps {
  hasBorderRadius?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ hasBorderRadius = false }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 10px;
        height: 46px;
        border-radius: ${hasBorderRadius ? '6px' : ''};
        border: 1px solid rgba(69, 69, 69, 0.5);
        background-color: #232225;
      `}
    >
      <img
        css={css`
          height: 36px;
          width: 36px;
        `}
        alt="search button"
        src="/icons/search_FILL0_wght400_GRAD0_opsz48 1.svg"
      />
      <input
        css={css`
          all: unset;
          width: 95%;
          font-family: ${barlowCondensed.style.fontFamily};
          font-size: 20px;
          font-weight: 500;
          background-color: transparent;
          border: none;
          color: #cecece;
        `}
        type="search"
        placeholder="Search..."
        aria-label="Search..."
      />
      <FilterButton />
    </div>
  )
}

export default SearchBar
