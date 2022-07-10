import React, { ReactNode } from 'react'
import { Checkbox, Typography } from '@mui/material'

type TUCheckBox = React.ComponentProps<typeof Checkbox> & {
   children?: ReactNode
}

const UCheckBox = React.forwardRef(
   ({ children, checked, ...rest }: TUCheckBox, ref) => (
      <>
         <Checkbox
            {...rest}
            checked={checked}
            sx={{
               color: '#C6CADD',
               '&.Mui-checked': {
                  color: '#43B02A',
               },
               '&:hover': {
                  color: '#A3ABC3',
                  '&.Mui-checked': {
                     color: '#007F3E',
                  },
               },
            }}
         />
         {children && (
            <Typography
               sx={[
                  {
                     fontStyle: 'normal',
                     fontWeight: '600',
                     fontSize: '14px',
                     lineHeight: '140%',
                     color: '#797C7A',
                  },
                  !!checked && {
                     color: '#000000',
                  },
               ]}
            >
               {children}
            </Typography>
         )}
      </>
   )
)

export default UCheckBox
