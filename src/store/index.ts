import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import notifications from '@services/Notification/notification.store'
import drawers from '@services/Drawers/drawers.store'
import transferPageState from '@services/TransferPage/TransferPage.store'
import modals from '@services/Modals/Modals.store'
import user from '@services/User/user.store'
import mediaContactPageState from '@services/MediaContactPage/MediaContactPage.store'
import rightDrawerState from '@services/DrawersState/DrawersState.store'

const store = configureStore({
   reducer: {
      notifications,
      drawers,
      transferPageState,
      mediaContactPageState,
      rightDrawerState,
      modals,
      user,
   } as const,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
   devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
