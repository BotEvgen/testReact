import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
   TModalAdapterProps,
   TModalsState,
} from '@/services/Modals/Modals.entity'

const initialState: TModalsState = {
   Basic: null,
   Warning: null,
}

const slice = createSlice({
   name: 'Modals',
   initialState,
   reducers: {
      showModal: (state, action: PayloadAction<TModalAdapterProps>) => {
         const modalName = action.payload?.name
         const currentModal = state[action.payload?.name]

         return {
            ...state,
            [modalName]: {
               name: modalName,
               props: {
                  ...currentModal?.props,
                  ...action.payload.props,
                  open: true,
               },
            },
         }
      },
      hideModal: (
         state,
         action: PayloadAction<Omit<TModalAdapterProps, 'props'>>
      ) => ({
         ...state,
         [action.payload.name]: null,
      }),
   },
})

const ModalsActions = {
   ...slice.actions,
}

export default slice.reducer

export { ModalsActions }
