import { FC } from 'react'

import WTransferFilter from '@widgets/WFilter/Transfer'
import WMediaContactFilter from '@widgets/WFilter/MediaContact'

type TWFilter = FC & {
   MediaContact: typeof WMediaContactFilter
   Transfer: typeof WTransferFilter
}

const WFilter: TWFilter = () => null

WFilter.MediaContact = WMediaContactFilter
WFilter.Transfer = WTransferFilter

export default WFilter
