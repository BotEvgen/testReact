import React, { FC } from 'react'

import { Tabs } from '@mui/material'

import UTab from '@ui/UTabs/UTab'

type TUTabs = FC<React.ComponentProps<typeof Tabs>> & {
   Tab: typeof UTab
}

const UTabs: TUTabs = ({ children, ...rest }) => (
   <Tabs
      {...rest}
      sx={{
         borderBottom: '1px solid #CAD1DB',
         '&>.MuiTabs-scroller': {
            '&>.MuiTabs-flexContainer': {
               '&> .MuiButtonBase-root + .MuiButtonBase-root': {
                  ml: '32px',
               },
               '[aria-selected=false]': {
                  color: '#CAD1DB',
               },
            },
         },
      }}
   >
      {children}
   </Tabs>
)

UTabs.Tab = UTab

export default UTabs
