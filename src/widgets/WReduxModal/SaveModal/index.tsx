import React, { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { ModalProps } from '@mui/material/Modal'

import UButton from '@ui/UButton'

import BasicModal from '@widgets/WReduxModal/Basic'

export type TWarningModal = Pick<ModalProps, 'onClose' | 'open'> & {
   warningText: string
   withCancel?: boolean
   actions?: TWarningAction[]
}

type TWarningAction = Omit<
   React.ComponentProps<typeof UButton>,
   'sx' | 'children '
> & {
   text: string
}

const WarningModal: FC<TWarningModal> = ({
   warningText,
   actions,
   withCancel,
   onClose,
   ...rest
}) => (
   <BasicModal {...rest}>
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '564px',
            height: '250px',
            padding: '30px ',
            'button+button ': {
               ml: '10px',
            },
         }}
      >
         <Typography
            sx={{
               fontWeight: 700,
               fontSize: '17px',
               lineHeight: '140%',
            }}
         >
            {warningText}
         </Typography>
         {actions && (
            <Box
               sx={{
                  display: 'flex',
                  mt: '20px',
               }}
            >
               {actions.map(({ text, ...actionRest }, index) => (
                  <UButton {...actionRest} key={index}>
                     {text}
                  </UButton>
               ))}
               {withCancel && (
                  <UButton
                     onClick={() => onClose && onClose({}, 'escapeKeyDown')}
                  >
                     Отменить
                  </UButton>
               )}
            </Box>
         )}
      </Box>
   </BasicModal>
)

export default WarningModal
