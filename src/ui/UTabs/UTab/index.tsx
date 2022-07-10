import React, { FC } from 'react'

import { Tab } from '@mui/material'

type TUTab = React.ComponentProps<typeof Tab>

const UTab: FC<TUTab> = ({ children, ...rest }) => (
   <Tab
      {...rest}
      sx={{
         fontWeight: '700',
         fontSize: '14px',
         letterSpacing: '0.12em',
         textTransform: 'uppercase',
         padding: '0',
      }}
   >
      {children}
   </Tab>
)

export default UTab
