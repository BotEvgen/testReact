import { FC } from 'react'

import { ModalProps } from '@mui/material/Modal'
import { Box } from '@mui/material'

import UModal from '@ui/UModal'

const BasicModal: FC<ModalProps> = ({ children, ...rest }) => (
   <UModal {...rest}>
      <Box
         sx={{
            backgroundColor: 'white.default',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
         }}
      >
         {children}
      </Box>
   </UModal>
)

export default BasicModal
