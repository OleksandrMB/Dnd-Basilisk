import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'
import { barlowCondensed } from '../../styles/fonts'
import Typography from '../Typography'

type TableRowProps = {
  id: string
  title: string
  source: string
  author: string
}

type TableProps = {
  data: TableRowProps[]
}

const TableHeader = () => {
  return (
    <thead
      css={css`
        border: none;
        padding: 0;
        margin: 0;
        height: 53px;
      `}
    >
      <tr
        css={css`
          th {
            border-bottom: 1px solid rgba(69, 69, 69, 0.5);
            text-align: left;
            font-weight: 500;
          }
          th:first-of-type {
            text-align: center !important;
          }
          th:last-of-type {
            width: 50px;
            color: #131313;
          }
        `}
      >
        <th>
          <Typography variant="h3" color="text">
            ID
          </Typography>
        </th>
        <th>
          <Typography variant="h3" color="text">
            Title
          </Typography>
        </th>
        <th>
          <Typography variant="h3" color="text">
            Source
          </Typography>
        </th>
        <th>
          <Typography variant="h3" color="text">
            Author
          </Typography>
        </th>
        <th className="dot">.</th>
      </tr>
    </thead>
  )
}

const TableCell = styled.td`
  height: 53px;
  border-bottom: 1px solid rgba(69, 69, 69, 0.5);
  :first-of-type,
  :last-of-type {
    text-align: center;
  }
`

const TableRow: FC<TableRowProps> = ({ id, title, source, author }) => {
  return (
    <tr>
      <TableCell>
        <Typography variant="h3" color="text">
          {id}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h3" color="text">
          {title}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h3" color="text">
          {source}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="h3" color="text">
          {author}
        </Typography>
      </TableCell>
      <TableCell>
        <img
          alt="sample text"
          src="/icons/more_vert_FILL0_wght700_GRAD0_opsz48 1.svg"
        />
      </TableCell>
    </tr>
  )
}

const ListTable = ({ data }: TableProps) => {
  return (
    <table
      cellSpacing={0}
      css={css`
        margin-top: 10px;
        color: #cecece;
        background-color: #141414;
        font-family: ${barlowCondensed.style.fontFamily};
        font-weight: 500;
        font-size: 20px;
        width: 100%;
        border-top: 1px solid rgba(69, 69, 69, 0.5);
      `}
    >
      <TableHeader />
      <tbody>
        {data.map(({ id, title, source, author }) => {
          return (
            <TableRow
              key={id}
              id={id}
              title={title}
              source={source}
              author={author}
            />
          )
        })}
      </tbody>
    </table>
  )
}

export default ListTable
