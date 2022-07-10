import { useAppSelector } from '@/store'

export type TTransferPageRightDrawerEntity = {
   drawerCursorFilterId: number | null
   currentIndex: number
   prevId: string
   currentId: string
   nextId: string
   needUpdate: boolean
}

export type TMediaContactRightDrawerEntity = Omit<
   TTransferPageRightDrawerEntity,
   'drawerCursorFilterId'
>

export type TRightDrawerInitialState = {
   transferPage: TTransferPageRightDrawerEntity
   mediaContactPage: TMediaContactRightDrawerEntity
}

const useRightDrawerState = () => {
   const rightDrawerState = useAppSelector((state) => state.rightDrawerState)

   return rightDrawerState
}

export { useRightDrawerState }
