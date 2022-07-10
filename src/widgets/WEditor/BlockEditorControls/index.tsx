import React, { FC, ReactElement } from 'react'

import { DraftBlockType, EditorState } from 'draft-js'

import { Box } from '@mui/material'

import EditorControlItem from '@widgets/WEditor/EditorControlItem'

export type TControlStyles = {
   label: string | ReactElement
   style: string
}

export type TBlockEditorControls = {
   editorState: EditorState
   onBlockToggle: (blockType: DraftBlockType) => void
   blockTypes: TControlStyles[]
}

const BlockEditorControls: FC<TBlockEditorControls> = ({
   editorState,
   onBlockToggle,
   blockTypes,
}) => {
   const selection = editorState.getSelection()
   const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

   if (blockTypes.length)
      return (
         <Box className="RichEditor-controls">
            {blockTypes.map((type, index) => (
               <EditorControlItem
                  key={index}
                  isActive={type.style === blockType}
                  onToggle={onBlockToggle}
                  style={type.style}
               >
                  {type.label}
               </EditorControlItem>
            ))}
         </Box>
      )
   return null
}

export default BlockEditorControls
