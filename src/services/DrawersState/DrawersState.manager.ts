import { RightDrawerActions } from '@services/DrawersState/DrawersState.store'
import {
   TMediaContactRightDrawerEntity,
   TTransferPageRightDrawerEntity,
} from '@services/DrawersState/DrawersState.entity'

import { useAppDispatch } from '@/store'

const useRightDrawerStateManager = () => {
   const dispatch = useAppDispatch()

   const changeTransferPageRightDrawerEntity = (
      newEntity: TTransferPageRightDrawerEntity
   ) =>
      dispatch(
         RightDrawerActions.changeTransferPageRightDrawerEntity(newEntity)
      )

   const resetTransferPageRightDrawerEntity = () =>
      dispatch(RightDrawerActions.resetTransferPageRightDrawerEntity())

   const changeMediaContactPageRightDrawerEntity = (
      newEntity: TMediaContactRightDrawerEntity
   ) =>
      dispatch(
         RightDrawerActions.changeMediaContactPageRightDrawerEntity(newEntity)
      )

   const resetTMediaContactPageRightDrawerEntity = () =>
      dispatch(RightDrawerActions.resetMediaContactPageRightDrawerEntity())

   return {
      changeTransferPageRightDrawerEntity,
      resetTransferPageRightDrawerEntity,

      changeMediaContactPageRightDrawerEntity,
      resetTMediaContactPageRightDrawerEntity,
   }
}

export { useRightDrawerStateManager }
