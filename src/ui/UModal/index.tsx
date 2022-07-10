import React, { FC } from 'react'
import ReactDOM from 'react-dom'

import Modal, { ModalProps } from '@mui/material/Modal'

const UModal: FC<ModalProps> = ({ children, ...rest }) =>
   ReactDOM.createPortal(
      <Modal {...rest} disablePortal>
         {children}
      </Modal>,
      document.getElementById('LMain__portal') || document.body
   )

export default UModal
