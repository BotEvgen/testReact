import { Action, PayloadAction, SerializedError } from '@reduxjs/toolkit'

export type TAwaitState = {
   loading: boolean
   error: string
}

export type TAwait<T extends TAwaitState> = {
   isPending(action: Action<string>): boolean
   isRejected(action: Action<string>): boolean
   isFulfilled(action: Action<string>): boolean
   pending(state: T, action: PayloadAction): void
   rejected(
      error?: string
   ): (
      state: T,
      action: PayloadAction<unknown, string, unknown, SerializedError>
   ) => void
   fulfilled(
      state: T,
      action: PayloadAction<unknown, string, unknown, SerializedError>
   ): void
   getAwaitState(): TAwaitState
}

const createAwaitState = (): TAwaitState => ({
   loading: false,
   error: '',
})

const createAwaitAdapter = <T extends TAwaitState>(
   name: string
): TAwait<T> => ({
   getAwaitState: () => ({
      loading: false,
      error: '',
   }),
   isPending: ({ type }) =>
      type.startsWith(`${name}/`) && type.endsWith('pending'),
   isRejected: ({ type }) =>
      type.startsWith(`${name}/`) && type.endsWith('rejected'),
   isFulfilled: ({ type }) =>
      type.startsWith(`${name}/`) && type.endsWith('fulfilled'),
   pending: (state) => {
      state.loading = true
      state.error = ''
   },
   rejected:
      (error: string) =>
      (state, { error: { message } }) => {
         state.loading = false
         state.error =
            message || error || 'Ошибка отправки или получения данных'
      },
   fulfilled: (state) => {
      state.loading = false
      state.error = ''
   },
})

export { createAwaitState, createAwaitAdapter }
