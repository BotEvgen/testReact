import { useAppDispatch } from '@/store'

import { TransferPageStateActions } from '@/services/TransferPage/TransferPage.store'

const useTransferPageStateManager = () => {
   const dispatch = useAppDispatch()

   const initTransferPageState = (userSettings: TTransferPageStateEntity) =>
      dispatch(TransferPageStateActions.initTransferPageState(userSettings))

   const setGrade = (newGrade: number | null) =>
      dispatch(TransferPageStateActions.setGrade(newGrade))

   const addFilter = (filter: TTransferCustomFilterEntity) =>
      dispatch(TransferPageStateActions.addNewFilter(filter))

   const setActiveArticleId = (newId: string | null) =>
      dispatch(TransferPageStateActions.setActiveArticleId(newId))

   const setActiveFilter = (
      currentFilter: TTransferCustomFilterEntity | null
   ) => dispatch(TransferPageStateActions.setActiveFilter(currentFilter))

   const setNonSaveFilter = (filter: TTransferCustomFilterEntity | null) =>
      dispatch(TransferPageStateActions.setNonSaveFilter(filter))

   const overWriteFilter = (id: number, filter: TTransferCustomFilterEntity) =>
      dispatch(TransferPageStateActions.overWriteFilter({ id, filter }))

   const resetCursorFromFilter = (id: number) => {
      dispatch(TransferPageStateActions.resetCursorFromFilter(id))
   }

   const deleteFilter = (id: number) =>
      dispatch(TransferPageStateActions.deleteFilter(id))

   return {
      initTransferPageState,
      setGrade,
      addFilter,
      setActiveArticleId,
      setActiveFilter,
      setNonSaveFilter,
      overWriteFilter,
      resetCursorFromFilter,
      deleteFilter,
   }
}

export { useTransferPageStateManager }
