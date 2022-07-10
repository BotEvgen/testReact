import React, { FC } from 'react'

import { TextField } from '@mui/material'

type TUTextField = React.ComponentProps<typeof TextField>

const UTextField: FC<TUTextField> = ({ ...rest }) => (
   <TextField
      sx={{
         '&>.MuiInputLabel-root': {
            fontWeight: '600',
            fontSize: '14px',
            color: '#797C7A',
         },
         '& .MuiOutlinedInput-root': {
            '& fieldset': {
               borderColor: '#E2E3EB',
               '& legend': {
                  color: '#797C7A',
               },
            },
            '& textarea': {
               fontWeight: '600',
               fontSize: '16px',
               color: '#797C7A',
            },
         },
      }}
      {...rest}
   />
)

export default UTextField
