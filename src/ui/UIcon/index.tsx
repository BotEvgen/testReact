import { FC } from 'react'

import UIconDelete from '@ui/UIcon/Delete'

type TUIcon = FC & {
   Delete: typeof UIconDelete
}

const UIcon: TUIcon = () => null

UIcon.Delete = UIconDelete

export default UIcon
