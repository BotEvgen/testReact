import React, { FC, useState, useRef } from 'react'
import { EditorState } from 'draft-js'

import { Box, Button, Input, Popover } from '@mui/material'

import { insertAtomicBlock } from '@widgets/WEditor/helpers'

import useInput from '@hooks/useInput'

type TEImageEdit = {
   editorState: EditorState
   onChange: (editorState: EditorState) => void
}

const EImageEdit: FC<TEImageEdit> = ({ editorState, onChange }) => {
   const [imageEditIsOpen, setImageEditIsOpen] = useState<boolean>(false)

   const buttonRef = useRef<HTMLDivElement | null>(null)

   const { setValue, value, bind } = useInput<string>('')

   const popoverHandler = () => {
      setImageEditIsOpen((prev) => !prev)
   }

   const addHandler = () => {
      const imageData = {
         src: value,
         description: '',
         copyright: '',
      }
      const newEditorState = insertAtomicBlock(editorState, 'IMAGE', imageData)

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
            <i className="RichEditor-icon icon-image" />
         </Box>
         <Popover
            open={imageEditIsOpen}
            sx={{ display: 'flex' }}
            anchorEl={buttonRef.current}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            onClose={popoverHandler}
         >
            <Box
               sx={{
                  padding: '0 5px',
               }}
            >
               <Input {...bind} placeholder="Введите url" disableUnderline />
               <Button onClick={addHandler}>Добавить изображение</Button>
            </Box>
         </Popover>
      </>
   )
}

export default EImageEdit
