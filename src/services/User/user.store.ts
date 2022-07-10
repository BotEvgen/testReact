import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { createAwaitAdapter, TAwaitState } from '@store/common/awaitAdapter'

import { TUserProfileEntity } from '@/services/User/user.entity'
import { UserApi } from '@/services/User/user.api'

const NAME = 'user'

const getUserProfile = createAsyncThunk(`${NAME}/get`, async () => {
   const userProfile = await UserApi.getUserProfile()

   return userProfile
})

const UserAwaitAdapter = createAwaitAdapter(NAME)

export interface IUserInitialState extends TAwaitState {
   userInfo: TUserProfileEntity | null
}

const initialState: IUserInitialState = {
   userInfo: null,
   ...UserAwaitAdapter.getAwaitState(),
}

const slice = createSlice({
   name: NAME,
   initialState,
   reducers: {
      resetUser: (state) => {
         state.userInfo = null
         state.loading = false
         state.error = ''
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getUserProfile.fulfilled, (state, { payload }) => {
            state.userInfo = payload
         })
         .addMatcher(UserAwaitAdapter.isFulfilled, UserAwaitAdapter.fulfilled)
         .addMatcher(UserAwaitAdapter.isPending, UserAwaitAdapter.pending)
         .addMatcher(UserAwaitAdapter.isRejected, UserAwaitAdapter.rejected())
   },
})

export default slice.reducer

const userActions = {
   ...slice.actions,
   async: {
      getUserProfile,
   },
}

export { userActions }
