import React, { FC, useEffect, useState } from 'react'
import { ContentBlock, ContentState, Editor, EditorState } from 'draft-js'

import Box from '@mui/material/Box'
import { TextareaAutosize } from '@mui/material'

import WAction from '@widgets/WAction'

import {
   addBlockToContentState,
   deleteAtomicBlock,
} from '@widgets/WEditor/helpers'

import useInput from '@hooks/useInput'

type TEmbedView = {
   blockProps: {
      setEditorFocus: (
         newState: boolean,
         elementForRef?: HTMLElement | React.MutableRefObject<Editor | null>
      ) => void
      editorState: EditorState
      onChange: (editorState: EditorState) => void
   }
   contentState: ContentState
   block: ContentBlock
}

type TEmbedData = {
   html: string
}

const EEmbedView: FC<TEmbedView> = ({ contentState, block, blockProps }) => {
   const entity = contentState.getEntity(block.getEntityAt(0))

   const data: TEmbedData = entity.getData()

   const [editMode, setEditMode] = useState<boolean>(false)

   const htmlInput = useInput<string>(data.html)

   const { editorState, onChange, setEditorFocus } = blockProps

   useEffect(() => {
      if (!contentState.getBlockAfter(block.getKey())) {
         const propsToAddBlock = {
            type: 'unstyled',
            editorState,
            contentState,
            onChange,
         }
         addBlockToContentState(propsToAddBlock)
      }
   }, [])

   const deleteClickHandler = () => {
      const deleteHandlerProps = {
         editorState,
         block,
         contentState,
         onChange,
         focusEditorSetState: setEditorFocus,
      }

      deleteAtomicBlock(deleteHandlerProps)
   }

   const onFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
      e.stopPropagation()
      setEditorFocus(false, e.currentTarget)
   }

   const onBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
      e.stopPropagation()
      setEditorFocus(true)
   }

   const editClickHandler = () => {
      setEditMode((prev) => !prev)
      if (editMode) {
         data.html = htmlInput.value
      }
   }

   return (
      <Box
         sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
         }}
         tabIndex={-1}
         onFocus={onFocus}
         onBlur={onBlur}
      >
         <WAction
            onCloseHandler={deleteClickHandler}
            onEditHandler={editClickHandler}
         >
            <Box
               sx={{
                  width: '100%',
                  height: '100%',
                  '&> div': {
                     '& > iframe': {
                        width: '100%',
                     },
                  },
               }}
            >
               <div dangerouslySetInnerHTML={{ __html: data.html }} />
            </Box>
         </WAction>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               mt: '20px',
            }}
         >
            <TextareaAutosize
               {...htmlInput.bind}
               placeholder="HTML"
               maxRows={10}
               disabled={!editMode}
            />
         </Box>
      </Box>
   )
}

export default EEmbedView
