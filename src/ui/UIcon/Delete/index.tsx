import React, { FC } from 'react'

import { IconButton } from '@mui/material'

import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'

type TUIconDelete = React.ComponentProps<typeof IconButton>

const UIconDelete: FC<TUIconDelete> = ({ children, ...rest }) => (
   <IconButton
      {...rest}
      sx={{
         display: 'flex',
         justifyContent: 'center',

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
   >
      <CloseIcon />
   </IconButton>
)

export default UIconDelete
