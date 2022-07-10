import SMediaContactDrawerView from '@sections/SMediaContactDrawer/View'
import SMediaContactDrawerCreate from '@sections/SMediaContactDrawer/Create'

type TSMediaTransferDrawer = {
   View: typeof SMediaContactDrawerView
   Create: typeof SMediaContactDrawerCreate
}

const SMediaTransferDrawer: TSMediaTransferDrawer = (): null => null

SMediaTransferDrawer.View = SMediaContactDrawerView
SMediaTransferDrawer.Create = SMediaContactDrawerCreate

export default SMediaTransferDrawer
