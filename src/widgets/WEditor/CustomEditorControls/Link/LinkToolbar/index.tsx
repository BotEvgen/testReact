import React, { FC, useRef, useState } from 'react'
import { Box, Button, Input, Popover } from '@mui/material'
import { EditorState, RichUtils } from 'draft-js'

import {
   getSelectedEntityData,
   getSelectedEntityRange,
   replaceSelectedEntityData,
} from '@widgets/WEditor/helpers'

import useInput from '@hooks/useInput'

type TELinkToolBar = {
   editorState: EditorState
   onChange: (editorState: EditorState) => void
}

const ELinkToolBar: FC<TELinkToolBar> = ({ editorState, onChange }) => {
   const buttonRef = useRef<HTMLButtonElement | null>(null)

   const [urlEditIsOpen, setUrlEditIsOpen] = useState<boolean>(false)

   const { url } = getSelectedEntityData(editorState)

   const { value, bind } = useInput<string>(url)

   const selection = editorState.getSelection()

   const onEditLinkHandler = () => {
      const data = {
         url: value,
      }
      const editorStateAfterChange = replaceSelectedEntityData(
         editorState,
         data
      )
      onChange(editorStateAfterChange)

      setUrlEditIsOpen(false)
   }

   const onRemoveLinkHandler = () => {
      let stateAfterChange: EditorState = Object.assign(editorState)

      getSelectedEntityRange(editorState, (start, end) => {
         const entitySelection = selection.merge({
            anchorOffset: start,
            focusOffset: end,
            isBackward: false,
         })
         stateAfterChange = RichUtils.toggleLink(
            editorState,
            entitySelection,
            null
         )
      })
      onChange(stateAfterChange)
   }

   const popoverHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault()

      setUrlEditIsOpen((prev) => !prev)
   }

   const openEditUrl = () => {
      setUrlEditIsOpen(true)
   }

   return (
      <Box>
         <Button href={url} target="_blank" rel="noopener">
            Открыть ссылку
         </Button>
         <Button onClick={openEditUrl} ref={buttonRef}>
            Редактировать ссылку
         </Button>
         <Button onClick={onRemoveLinkHandler}>Удалить ссылку</Button>
         <Popover
            open={urlEditIsOpen}
            sx={{ display: 'flex' }}
            anchorEl={buttonRef.current}
            onClose={popoverHandler}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
         >
            <Box
               sx={{
                  display: 'flex',
                  padding: '10px',
               }}
            >
               <Input
                  {...bind}
                  disableUnderline
                  placeholder="Введите url"
                  multiline
               />
               <Button onMouseDown={onEditLinkHandler}>Изменить</Button>
            </Box>
         </Popover>
      </Box>
   )
}

export default ELinkToolBar
