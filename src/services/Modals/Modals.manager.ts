import { useAppDispatch } from '@/store'
import { ModalsActions } from '@/services/Modals/Modals.store'
import { TModalAdapterProps } from '@/services/Modals/Modals.entity'

const useModalsManager = () => {
   const dispatch = useAppDispatch()

   const showModal = (modalProps: TModalAdapterProps) =>
      dispatch(ModalsActions.showModal(modalProps))

   const hideModal = (nameOfModal: Omit<TModalAdapterProps, 'props'>) =>
      dispatch(ModalsActions.hideModal(nameOfModal))

   return {
      showModal,
      hideModal,
   }
}

export { useModalsManager }
