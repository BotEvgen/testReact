import React, { FC } from 'react'
import { EditorState } from 'draft-js'

import { Box } from '@mui/material'

import EImage from '@widgets/WEditor/CustomEditorControls/Image'
import ELink from '@widgets/WEditor/CustomEditorControls/Link'
import EEmbed from '@widgets/WEditor/CustomEditorControls/Embed'

type TCustomEditorControls = {
   editorState: EditorState
   onChange: (editorState: EditorState) => void
}

const CustomEditorControls: FC<TCustomEditorControls> = ({
   editorState,
   onChange,
}) => (
   <Box sx={{ position: 'relative' }}>
      <EImage.Edit editorState={editorState} onChange={onChange} />
      <ELink.Edit editorState={editorState} onChange={onChange} />
      <EEmbed.Edit editorState={editorState} onChange={onChange} />
   </Box>
)

export default CustomEditorControls
