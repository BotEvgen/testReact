import React, { FC } from 'react'
import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'

import { Box, IconButton } from '@mui/material'

type TUDelete = React.ComponentProps<typeof IconButton> & {
   visible?: boolean
}

const UDelete: FC<TUDelete> = ({ children, visible = true, ...rest }) => (
   <Box
      sx={{
         position: 'relative',
      }}
   >
      {visible && (
         <IconButton
            sx={{
               display: 'flex',
               justifyContent: 'center',
               position: 'absolute',
               right: '-11px',
               top: '-10px',
               width: '30px',

               backgroundColor: 'white.default',

               boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',

               borderRadius: '100%',
               svg: {
                  height: '15px',
                  width: '15px',
               },

               '&:hover': {
                  backgroundColor: '#9B9B9B',
               },
            }}
            {...rest}
         >
            <CloseIcon />
         </IconButton>
      )}
      {children}
   </Box>
)

export default UDelete
