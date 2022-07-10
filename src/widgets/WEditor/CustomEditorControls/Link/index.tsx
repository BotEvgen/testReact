import ELinkEdit from '@widgets/WEditor/CustomEditorControls/Link/Edit'
import ELinkView from '@widgets/WEditor/CustomEditorControls/Link/View'
import ELinkToolBar from '@widgets/WEditor/CustomEditorControls/Link/LinkToolbar'

type TELink = {
   Edit: typeof ELinkEdit
   View: typeof ELinkView
   ToolBar: typeof ELinkToolBar
}
const ELink: TELink = () => null

ELink.Edit = ELinkEdit
ELink.View = ELinkView
ELink.ToolBar = ELinkToolBar

export default ELink
