import React, { FC } from 'react'

import Box from '@mui/material/Box'

import IconButton from '@mui/material/IconButton'

import UDrawer from '@ui/UDrawer'

import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'

import { useDrawersManager } from '@services/Drawers/drawers.manager'

type TWDrawer = {
   withClose?: boolean
}

const WDrawer: FC<TWDrawer> = ({ children, withClose }) => {
   const drawerManager = useDrawersManager()

   const onCloseHandler = () => {
      drawerManager.toggleRightDrawer()
   }
   return (
      <UDrawer>
         {withClose && (
            <Box
               sx={{
                  position: 'absolute',
                  right: '3px',
                  top: 0,
               }}
            >
               <IconButton onClick={onCloseHandler}>
                  <CloseIcon />
               </IconButton>
            </Box>
         )}
         <Box
            sx={{
               marginTop: withClose ? '50px' : '0',
            }}
         >
            {children}
         </Box>
      </UDrawer>
   )
}

export default WDrawer
