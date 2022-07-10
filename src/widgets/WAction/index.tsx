import React, { CSSProperties, FC, useState } from 'react'

import { Box, IconButton } from '@mui/material'

import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'
import { ReactComponent as EditIcon } from '@assets/icons/AuthorsIcon.svg'
import { ReactComponent as SaveIcon } from '@assets/icons/SaveIcon.svg'

type TWAction = {
   disable?: boolean
   onEditHandler?: () => void
   onCloseHandler?: () => void
}

const actionCircleProperties: CSSProperties = {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '50px',
   width: '50px',
   backgroundColor: 'white.default',
   borderRadius: '100%',
   cursor: 'pointer',
}

const WAction: FC<TWAction> = ({
   children,
   disable,
   onCloseHandler,
   onEditHandler,
}) => {
   const [isEdited, setEdited] = useState<boolean>(false)

   const onEditActionHandler = () => {
      setEdited((prev) => !prev)

      if (onEditHandler) {
         onEditHandler()
      }
   }

   if (disable) {
      return <Box>{children}</Box>
   }

   return (
      <Box sx={{ position: 'relative' }}>
         <Box
            sx={{
               position: 'absolute',
               right: '20px',
               top: '20px',
               display: 'flex',
               '&>.MuiIconButton-root+.MuiIconButton-root': {
                  ml: '8px',
               },
               svg: {
                  height: '28px',
                  width: '28px',
               },
            }}
         >
            <IconButton
               sx={{
                  ...actionCircleProperties,
                  '&:hover': {
                     backgroundColor: '#CAD1DB',
                  },
               }}
               onClick={onEditActionHandler}
            >
               {isEdited ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton
               sx={{
                  ...actionCircleProperties,
                  svg: {
                     height: '28px',
                     width: '28px',
                  },
                  '&:hover': {
                     backgroundColor: '#CAD1DB',
                  },
               }}
               onClick={onCloseHandler}
            >
               <CloseIcon />
            </IconButton>
         </Box>
         {children}
      </Box>
   )
}
export default WAction
