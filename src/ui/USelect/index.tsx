import React, { FC } from 'react'

import { Select } from '@mui/material'

type TUSelect = React.ComponentProps<typeof Select>

const USelect: FC<TUSelect> = ({ children, ...rest }) => (
   <Select
      {...rest}
      sx={{
         fontWeight: '400',
         fontSize: '14px',
         lineHeight: '140%',
         '& .MuiSelect-select': {
            backgroundColor: 'white.default',
         },
         '&>fieldset': {
            borderColor: '#DFE0EB',
            '&:focus': {
               borderColor: '#324FC2',
            },
         },
      }}
   >
      {children}
   </Select>
)

export default USelect
