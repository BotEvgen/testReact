import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: TTransferPageStateEntity = {
   grade: null,
   activeArticleId: null,
   activeFilter: null,
   nonSaveFilter: null,
   customFilters: defaultFiltersOnTable,
}

const slice = createSlice({
   name: 'userSettings',
   initialState,
   reducers: {
      initTransferPageState: (
         state,
         action: PayloadAction<TTransferPageStateEntity>
      ) => action.payload,

      setGrade: (state, action: PayloadAction<number | null>) => {
         state.grade = action.payload
      },

      setActiveArticleId: (state, action: PayloadAction<string | null>) => {
         state.activeArticleId = action.payload
      },

      setActiveFilter: (
         state,
         action: PayloadAction<TTransferCustomFilterEntity | null>
      ) => {
         state.activeFilter = action.payload
      },
      setNonSaveFilter: (
         state,
         action: PayloadAction<TTransferCustomFilterEntity | null>
      ) => {
         state.nonSaveFilter = action.payload
      },
      addNewFilter: (
         state,
         action: PayloadAction<TTransferCustomFilterEntity>
      ) => {
         state.customFilters.push(action.payload)
      },
      overWriteFilter: (
         state,
         action: PayloadAction<TTransferOverWriteFilter>
      ) => {
         const findIndexOfOverWrite = state.customFilters.findIndex(
            (filter) => filter.id === action.payload.id
         )
         state.customFilters = [
            ...state.customFilters.slice(0, findIndexOfOverWrite),
            action.payload.filter,
            ...state.customFilters.slice(
               findIndexOfOverWrite + 1,
               state.customFilters.length
            ),
         ]
      },
      deleteFilter: (state, action: PayloadAction<number>) => {
         state.customFilters = state.customFilters.filter(
            (filter) => filter.id !== action.payload
         )
      },
      resetCursorFromFilter: (state, action: PayloadAction<number>) => {
         const indexOfCustomFilter = state.customFilters.findIndex(
            (filter) => filter.id === action.payload
         )

         if (indexOfCustomFilter !== -1) {
            const mutatedArrayOfCustom = [...state.customFilters]

            mutatedArrayOfCustom[
               indexOfCustomFilter
            ].userState.lastCursorTable = null

            state.customFilters = [...mutatedArrayOfCustom]
         } else if (state.nonSaveFilter?.id === action.payload) {
            state.nonSaveFilter = {
               ...state.nonSaveFilter,
               userState: {
                  ...state.nonSaveFilter.userState,
                  lastCursorTable: null,
               },
            }
         }
      },
   },
})

const TransferPageStateActions = { ...slice.actions }
const TransferPageInitialState = initialState

export default slice.reducer

export { TransferPageStateActions, TransferPageInitialState }
