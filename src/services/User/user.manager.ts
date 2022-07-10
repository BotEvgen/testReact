import { userActions } from '@/services/User/user.store'

import { useAppDispatch } from '@/store'

const useUserManager = () => {
   const dispatch = useAppDispatch()

   const loadAndSetUserProfile = () =>
      dispatch(userActions.async.getUserProfile())

   const resetUser = () => dispatch(userActions.resetUser())

   return {
      loadAndSetUserProfile,
      resetUser,
   }
}

export { useUserManager }
