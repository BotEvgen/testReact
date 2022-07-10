import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'

type TWTabPanel = React.ComponentProps<typeof Box> & {
   index: number
   value: number
   children: ReactNode
}

const WTabPanel: FC<TWTabPanel> = ({ children, value, index, ...rest }) => (
   <Box hidden={value !== index} {...rest}>
      {children}
   </Box>
)

export default WTabPanel
