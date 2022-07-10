import React, { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'

import Box from '@mui/material/Box'

type TUDrawerType = React.ComponentProps<typeof Box> & {
   children?: ReactNode
}

const UDrawer: FC<TUDrawerType> = ({ children, ...rest }) =>
   ReactDOM.createPortal(
      <Box
         {...rest}
         sx={{
            height: '100%',
         }}
      >
         {children}
      </Box>,
      document.getElementById('SHeader__drawer') || document.body
   )

export default UDrawer
