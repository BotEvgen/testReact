import React, { FC } from 'react'
import { EditorState } from 'draft-js'

import Box from '@mui/material/Box'

import EditorControlItem from '@widgets/WEditor/EditorControlItem'
import { TControlStyles } from '@widgets/WEditor/BlockEditorControls'

export type TInlineEditorControls = {
   editorState: EditorState
   onInlineToggle: (inlineStyle: string) => void
   inlineStyles: TControlStyles[]
}

const InlineEditorControls: FC<TInlineEditorControls> = ({
   editorState,
   onInlineToggle,
   inlineStyles,
}) => {
   const currentStyle = editorState.getCurrentInlineStyle()

   if (inlineStyles.length)
      return (
         <Box className="RichEditor-controls">
            {inlineStyles.map((type, index) => (
               <EditorControlItem
                  key={index}
                  isActive={currentStyle.has(type.style)}
                  onToggle={onInlineToggle}
                  style={type.style}
               >
                  {type.label}
               </EditorControlItem>
            ))}
         </Box>
      )

   return null
}

export default InlineEditorControls
