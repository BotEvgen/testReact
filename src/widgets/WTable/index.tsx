import React, { FC } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'

import WTableCheckbox from '@widgets/WTable/CheckBox'

type TWTableProps = {
   visibleColumns: ColumnInstance<object>[]
   selectedRows: Row<object>[]
   chooseRow: (row: Row<object>, indexOfRow: number) => void
   chooseHeader?: (header: HeaderGroup<object>) => void
   tableInstance: TableInstance<object>
   currentIndexOfRow?: number | false | null
   currentOrder?: string
   isLoading: boolean
}

export type TWTable = FC<TWTableProps> & {
   Checkbox: typeof WTableCheckbox
}

// TODO: Убрать selectedRows и visibleColumns,  memo сделать на сравнение tableInstance. При изменении встроенного выделения, сам инстанс таблицы не изменяется
const WTable: TWTable = ({
   visibleColumns,
   selectedRows,
   chooseHeader,
   chooseRow,
   tableInstance,
   currentIndexOfRow,
   currentOrder,
   isLoading,
}) => {
   const chooseRowHandlerWithSelection =
      (row: Row<object>, indexOfRow: number, indexOfCell: number) =>
      (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
         e.stopPropagation()
         if (indexOfCell) {
            chooseRow(row, indexOfRow)
         }
      }

   const chooseHeaderHandler =
      (header: HeaderGroup<object>, index: number) =>
      (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) =>
         chooseHeader && index && chooseHeader(header)

   return (
      <Table
         {...tableInstance.getTableProps()}
         stickyHeader
         sx={{
            height: isLoading ? '100%' : 'initial',
         }}
      >
         <TableHead
            sx={{
               border: '1px solid #CFD0DC',
            }}
         >
            {tableInstance.headerGroups.map((headerGroup) => (
               <TableRow
                  sx={{
                     '&> .MuiTableCell-root,.MuiTableCell-root:first-child': {
                        padding: '10px 11px',
                     },
                  }}
                  {...headerGroup.getHeaderGroupProps()}
               >
                  {headerGroup.headers.map((column, index) => {
                     const orderIsDesc = currentOrder === column.id
                     const orderIsAsc = currentOrder === `-${column.id}`

                     const columnIsOrder = orderIsAsc || orderIsDesc

                     return (
                        <TableCell
                           {...column.getHeaderProps()}
                           sx={{
                              letterSpacing: '0.04em',
                              textTransform: 'uppercase',

                              fontWeight: '700',
                              fontSize: '13px',
                              lineHeight: '140%',

                              background: '#F4F7FD',

                              cursor: 'pointer',

                              '&:first-child': {
                                 padding: '23px 12px',
                              },
                              '&:not(:last-child):after': {
                                 content: '""',
                                 position: 'absolute',
                                 backgroundColor: '#EBEBEB',
                                 right: 0,
                                 top: 5,
                                 width: '1px',
                                 height: 'calc(100% - 11px)',
                              },
                           }}
                           onClick={chooseHeaderHandler(column, index)}
                        >
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              {column.render('Header')}
                              {!!index && columnIsOrder && (
                                 <Box
                                    sx={[
                                       {
                                          ml: '5px',
                                          mt: '5px',
                                       },
                                       orderIsDesc && {
                                          transform: 'rotate(180deg)',
                                       },
                                    ]}
                                 >
                                    <ChevronUpIcon />
                                 </Box>
                              )}
                           </Box>
                        </TableCell>
                     )
                  })}
               </TableRow>
            ))}
         </TableHead>
         <TableBody
            sx={{
               position: 'relative',
               height: '100%',
            }}
         >
            {tableInstance.page.map((row, indexOfRow) => {
               tableInstance.prepareRow(row)

               const rowIsSelected = row.isSelected
               const rowProps = row.getRowProps()
               return (
                  <TableRow
                     {...rowProps}
                     sx={{
                        cursor: 'pointer',
                        backgroundColor:
                           rowIsSelected || currentIndexOfRow === indexOfRow
                              ? '#E6F9E2'
                              : 'white.default',
                        ':hover': {
                           backgroundColor: rowIsSelected
                              ? '#B6EFA9'
                              : '#E6F9E2',
                        },
                     }}
                  >
                     {row.cells.map((cell, indexOfCell) => (
                        <TableCell
                           {...cell.getCellProps()}
                           sx={{
                              borderBottom: '1px solid #CFD0DC',
                              position: 'relative',

                              '&:first-child': {
                                 padding: '23px 12px',
                              },
                              '&:not(:last-child):after': {
                                 content: '""',
                                 position: 'absolute',
                                 backgroundColor: '#CFD0DC',
                                 right: 0,
                                 top: 5,
                                 width: '1px',
                                 height: 'calc(100% - 11px)',
                              },
                           }}
                           onClick={chooseRowHandlerWithSelection(
                              row,
                              indexOfRow,
                              indexOfCell
                           )}
                        >
                           {cell.render('Cell')}
                        </TableCell>
                     ))}
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   )
}

WTable.Checkbox = WTableCheckbox

export default WTable
