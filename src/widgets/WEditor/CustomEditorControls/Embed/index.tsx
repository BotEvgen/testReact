import EEmbedEdit from '@widgets/WEditor/CustomEditorControls/Embed/Edit'
import EEmbedView from '@widgets/WEditor/CustomEditorControls/Embed/View'


type TEEmbed = {
   Edit: typeof EEmbedEdit
   View: typeof EEmbedView
}
const EEmbed:TEEmbed = () => null

EEmbed.Edit = EEmbedEdit
EEmbed.View = EEmbedView

export default EEmbed
