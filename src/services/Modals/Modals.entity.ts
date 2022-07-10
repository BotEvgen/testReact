import { FC } from 'react'

import { TWarningModal } from '@widgets/WReduxModal/SaveModal'

import { ModalProps } from '@mui/material/Modal'
import { useAppSelector } from '@/store'

export type TSupportedModals = 'Basic' | 'Warning'

export interface IModalAdapter<
   TName extends TSupportedModals,
   TProps extends Pick<ModalProps, 'onClose' | 'open'>
> {
   name: TName
   props?: Omit<TProps, 'open'>
}

export type TModalAdapterProps =
   | IModalAdapter<
        TSupportedModals,
        Pick<ModalProps, 'onClose' | 'children' | 'open'>
     >
   | IModalAdapter<'Warning', TWarningModal>

export type TModalMap = {
   [key in TSupportedModals]: FC<any>
}

export type TModalsState = {
   [key in TSupportedModals]: TModalAdapterProps | null
}

const useModals = () => {
   const modals = useAppSelector((state) => state.modals)
   return modals
}

export { useModals }
