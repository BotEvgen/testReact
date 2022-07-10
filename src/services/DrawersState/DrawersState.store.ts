import {
   TMediaContactRightDrawerEntity,
   TRightDrawerInitialState,
   TTransferPageRightDrawerEntity,
} from '@services/DrawersState/DrawersState.entity'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TRightDrawerInitialState = {
   transferPage: {
      drawerCursorFilterId: null,
      prevId: '',
      currentId: '',
      nextId: '',
      needUpdate: true,
      currentIndex: 0,
   },
   mediaContactPage: {
      prevId: '',
      currentId: '',
      nextId: '',
      needUpdate: true,
      currentIndex: 0,
   },
}

const slice = createSlice({
   name: 'rightDrawerState',
   initialState,
   reducers: {
      changeTransferPageRightDrawerEntity: (
         state,
         action: PayloadAction<TTransferPageRightDrawerEntity>
      ) => {
         state.transferPage = action.payload
      },
      resetTransferPageRightDrawerEntity: (state) => {
         state.transferPage = {
            ...initialState.transferPage,
            needUpdate: false,
         }
      },

      changeMediaContactPageRightDrawerEntity: (
         state,
         action: PayloadAction<TMediaContactRightDrawerEntity>
      ) => {
         state.mediaContactPage = action.payload
      },
      resetMediaContactPageRightDrawerEntity: (state) => {
         state.mediaContactPage = {
            ...initialState.mediaContactPage,
            needUpdate: false,
         }
      },
   },
})

const RightDrawerActions = { ...slice.actions }

export default slice.reducer

export { RightDrawerActions }
