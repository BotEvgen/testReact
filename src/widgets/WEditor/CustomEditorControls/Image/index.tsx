import EImageEdit from '@widgets/WEditor/CustomEditorControls/Image/Edit'
import EImageView from '@widgets/WEditor/CustomEditorControls/Image/View'

type TEImage = {
   Edit: typeof EImageEdit
   View: typeof EImageView
}
const EImage:TEImage = () => null

EImage.Edit = EImageEdit
EImage.View = EImageView

export default EImage
