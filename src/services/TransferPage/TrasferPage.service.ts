import { TransferPageInitialState } from '@/services/TransferPage/TransferPage.store'

const TransferPageService = {
   initTransferPageLocalStorageState: () => {
      const gradeState = {
         ...TransferPageInitialState,
         activeFilter: TransferPageInitialState.customFilters[0],
      }

      const initialState = {
         grade_1: { ...gradeState, grade: 1 },
         grade_2: { ...gradeState, grade: 2 },
         grade_3: { ...gradeState, grade: 3 },
      }
      localStorage.setItem('transferPageState', JSON.stringify(initialState))
   },
   getTransferPageLocalStorageState: () => {
      const lcTransferPageState = localStorage.getItem('transferPageState')
      if (lcTransferPageState) {
         return JSON.parse(lcTransferPageState)
      }
      return null
   },
   updateTransferPageStateInLocalStorage: (
      userSettings
   ) => {
      const getPrevStateOfUserSettings = localStorage.getItem(
         'transferPageState'
      )
         ? JSON.parse(localStorage.getItem('transferPageState') || '')
         : {}

      const objToSet = {
         ...getPrevStateOfUserSettings,
         [`grade_${userSettings.grade}`]: userSettings,
      }
      localStorage.setItem('transferPageState', JSON.stringify(objToSet))
   },
}

export { TransferPageService }
