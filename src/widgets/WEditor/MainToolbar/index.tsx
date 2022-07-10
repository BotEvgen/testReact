import React, { FC } from 'react'
import { EditorState } from 'draft-js'

import { Box, Collapse } from '@mui/material'

import { getSelectedEntityType } from '@widgets/WEditor/helpers'
import ELink from '@widgets/WEditor/CustomEditorControls/Link'

type TMainToolbar = {
   editorState: EditorState
   onChange: (editorState: EditorState) => void
}

const MainToolbar: FC<TMainToolbar> = ({ editorState, onChange }) => {
   const isLink = getSelectedEntityType(editorState) === 'LINK'
   return (
      <Box>
         <Collapse in={isLink}>
            <ELink.ToolBar editorState={editorState} onChange={onChange} />
         </Collapse>
      </Box>
   )
}

export default MainToolbar
