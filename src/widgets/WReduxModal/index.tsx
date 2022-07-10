import { FC } from 'react'

import BasicModal from '@widgets/WReduxModal/Basic'
import WarningModal from '@widgets/WReduxModal/SaveModal'

import {
   TModalAdapterProps,
   TModalMap,
   useModals,
} from '@services/Modals/Modals.entity'
import { useModalsManager } from '@services/Modals/Modals.manager'

const modalsMap: TModalMap = {
   Basic: BasicModal,
   Warning: WarningModal,
}

const WReduxModal: FC<TModalAdapterProps> = ({ name, props }) => {
   const modalsManager = useModalsManager()
   const modals = useModals()

   const currentModalInState = modals[name]

   const Modal = modalsMap[name]

   const onCloseHandler = () => {
      modalsManager.hideModal({ name })

      if (currentModalInState?.props?.onClose) {
         return currentModalInState?.props?.onClose
      }
   }

   return (
      currentModalInState && (
         <Modal
            {...props}
            {...currentModalInState.props}
            onClose={onCloseHandler}
         />
      )
   )
}

const InitReduxModals = () => (
   <>
      <WReduxModal name="Basic" />
      <WReduxModal name="Warning" />
   </>
)

export default InitReduxModals
