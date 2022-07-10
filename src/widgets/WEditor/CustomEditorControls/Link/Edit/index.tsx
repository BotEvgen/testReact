import React, { FC, useState, useRef, useEffect } from 'react'
import { EditorState, RichUtils } from 'draft-js'

import { Box, Button, Input, Popover } from '@mui/material'

import { getGeneralPropertiesFromEditorState } from '@widgets/WEditor/helpers'

import useInput from '@hooks/useInput'

import { prepareUrl } from '@utils/prepareUrl'

type TEImageEdit = {
   editorState: EditorState
   onChange: (editorState: EditorState) => void
}

const ELinkEdit: FC<TEImageEdit> = ({ editorState, onChange }) => {
   const [urlEditIsOpen, setUrlEditIsOpen] = useState<boolean>(false)

   const [linkIsSelected, setLinkIsSelected] = useState<boolean>(false)

   const buttonRef = useRef<HTMLDivElement | null>(null)

   const { setValue, value: inputUrl, bind } = useInput<string>('')

   const { contentState, selection } =
      getGeneralPropertiesFromEditorState(editorState)

   const startOffset = selection.getStartOffset()
   const block = contentState.getBlockForKey(selection.getStartKey())
   const entityBlockKey = block.getEntityAt(startOffset)

   const textIsChosen = selection.isCollapsed()

   useEffect(() => {
      if (
         entityBlockKey &&
         contentState.getEntity(entityBlockKey).getType() === 'LINK'
      ) {
         setLinkIsSelected(true)
      } else {
         setLinkIsSelected(false)
      }
   }, [editorState])

   const popoverHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault()

      setUrlEditIsOpen((prev) => !prev)
   }

   const addHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()

      const urlData = {
         url: prepareUrl(inputUrl),
      }

      const contentStateWithEntity = contentState.createEntity(
         'LINK',
         'MUTABLE',
         urlData
      )

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      const newEditorState = EditorState.set(editorState, {
         currentContent: contentStateWithEntity,
      })

      const stateToApply = RichUtils.toggleLink(
         newEditorState,
         newEditorState.getSelection(),
         entityKey
      )

      onChange(stateToApply)

      setValue('')
      setUrlEditIsOpen(false)
   }

   return (
      <>
         <Box
            className={`RichEditor-styleButton ${
               textIsChosen || linkIsSelected
                  ? 'RichEditor-styleButton-disabled'
                  : ''
            }`}
            onMouseDown={!linkIsSelected ? popoverHandler : undefined}
            ref={buttonRef}
         >
            <i className="RichEditor-icon icon-link" />
         </Box>
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
                  padding: '10px',
               }}
            >
               <Input {...bind} disableUnderline placeholder="Введите url" />
               <Button onMouseDown={addHandler}>Добавить</Button>
            </Box>
         </Popover>
      </>
   )
}

export default ELinkEdit
