import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'

type TEditorControlItem = {
   isActive: boolean
   onToggle: (style: string) => void
   style: string
   children: ReactNode
}

const EditorControlItem: FC<TEditorControlItem> = ({ isActive, onToggle, children, style }) => {

   const onToggleHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault()
      onToggle(style)
   }

   const currentClassName = `RichEditor-styleButton ${isActive ? ' RichEditor-activeButton' : ''}`

   return (
      <Box component='span' className={currentClassName} onMouseDown={onToggleHandler}>
            {children}
      </Box>
   )
}

export default EditorControlItem
