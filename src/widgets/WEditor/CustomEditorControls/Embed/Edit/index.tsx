import React, { FC, useState, useRef } from 'react'
import { EditorState } from 'draft-js'

import { Box, Button, Popover, TextareaAutosize } from '@mui/material'

import { insertAtomicBlock } from '@widgets/WEditor/helpers'

import useInput from '@hooks/useInput'

type TEEmbedEdit = {
   editorState: EditorState
   onChange: (editorState: EditorState) => void
}

const EEmbedEdit: FC<TEEmbedEdit> = ({ editorState, onChange }) => {
   const [embedEditIsOpen, setEmbedIsOpen] = useState<boolean>(false)

   const buttonRef = useRef(null)

   const { setValue, value, bind } = useInput<string>('')

   const popoverHandler = () => {
      setEmbedIsOpen((prev) => !prev)
   }

   const addHandler = () => {
      const embedData = {
         html: value,
      }

      const newEditorState = insertAtomicBlock(editorState, 'EMBED', embedData)

      onChange(newEditorState)
      setValue('')
      popoverHandler()
   }

   return (
      <>
         <Box
            className="RichEditor-styleButton"
            onClick={popoverHandler}
            ref={buttonRef}
         >
            <i className="RichEditor-icon icon-embed" />
         </Box>
         <Popover
            open={embedEditIsOpen}
            sx={[
               {
                  '& .MuiPaper-root': {
                     display: 'flex',
                  },
               },
            ]}
            anchorEl={buttonRef.current}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            onClose={popoverHandler}
         >
            <TextareaAutosize
               placeholder="Вставьте embed код"
               style={{
                  height: '150px',
               }}
               {...bind}
            />
            <Button onClick={addHandler}>Добавить</Button>
         </Popover>
      </>
   )
}

export default EEmbedEdit
