import React, { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

export type TUProportionalBox = React.ComponentProps<typeof Box> & {
   children: ReactNode
   width: number
   height: number
}

const UProportionalBox: FC<TUProportionalBox> = ({
   children,
   width,
   height,
   ...rest
}) => (
   <Box
      {...rest}
      sx={{
         position: 'relative',
         width: '100%',
      }}
   >
      <Box
         sx={{
            paddingBottom: `${(height * 100) / width}%`,
            '& > *': {
               position: 'absolute',
               top: 0,
               left: 0,
               bottom: 0,
               right: 0,
            },
         }}
      >
         {children}
      </Box>
   </Box>
)

export default UProportionalBox
