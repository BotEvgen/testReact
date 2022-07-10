import React, { CSSProperties, FC, useRef, useState } from 'react'
import {
   Editor,
   DraftEditorCommand,
   EditorState,
   RichUtils,
   getDefaultKeyBinding,
   DraftBlockType,
   DraftHandleValue,
   ContentBlock,
} from 'draft-js'

import { Box } from '@mui/material'

import BlockEditorControls, {
   TControlStyles,
} from '@widgets/WEditor/BlockEditorControls'
import InlineEditorControls from '@widgets/WEditor/InlineEditorControls'
import { BLOCK_TYPES, INLINE_STYLES } from '@widgets/WEditor/settings'
import { getBlockStyle } from '@widgets/WEditor/helpers'
import CustomEditorControls from '@widgets/WEditor/CustomEditorControls'

import EImage from '@widgets/WEditor/CustomEditorControls/Image'
import EEmbed from '@widgets/WEditor/CustomEditorControls/Embed'
import MainToolbar from '@widgets/WEditor/MainToolbar'

import 'draft-js/dist/Draft.css'
import './style.css'

type TWEditor = {
   editorProps: React.ComponentProps<typeof Editor>
   controlStyles?: {
      toolbar?: CSSProperties
      header?: CSSProperties
   }
   blockControlTypes?: TControlStyles[] | 'default' | null
   inlineControlTypes?: TControlStyles[] | 'default' | null
}

const WEditor: FC<TWEditor> = ({
   editorProps,
   controlStyles,
   blockControlTypes = 'default',
   inlineControlTypes = 'default',
}) => {
   const { editorState, onChange } = editorProps

   const [editorIsFocus, setEditorisFocus] = useState<boolean>(true)

   const editorRef = useRef<Editor | null>(null)

   const focusEditor = () => {
      editorRef?.current?.focus()
   }

   const setEditorFocus = (newState: boolean, ref = editorRef.current) => {
      setEditorisFocus(newState)
   }

   const blockRendererFn = (block: ContentBlock) => {
      const content = editorState.getCurrentContent()

      if (block.getType() === 'atomic') {
         const entity = block.getEntityAt(0)

         if (!entity) return null

         const currentEntity = content.getEntity(entity)

         const entityType = currentEntity.getType()

         if (entityType === 'IMAGE') {
            return {
               component: EImage.View,
               editable: true,
               props: {
                  editorState,
                  onChange,
                  setEditorFocus,
               },
            }
         }
         if (entityType === 'EMBED') {
            return {
               component: EEmbed.View,
               editable: true,
               props: {
                  editorState,
                  onChange,
                  setEditorFocus,
               },
            }
         }
      }
   }

   const handleKeyCommand = (
      command: DraftEditorCommand | string,
      editorStateInstance: EditorState
   ): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(editorStateInstance, command)
      if (newState) {
         onChange(newState)
         return 'handled'
      }
      return 'not-handled'
   }

   const mapKeyToEditorCommand = (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' /* TAB */) {
         const newEditorState = RichUtils.onTab(e, editorState, 4)
         if (newEditorState !== editorState) {
            onChange(newEditorState)
         }
         return null
      }
      return getDefaultKeyBinding(e)
   }

   const toggleBlockType = (blockType: DraftBlockType) => {
      onChange(RichUtils.toggleBlockType(editorState, blockType))
   }

   const toggleInlineType = (inlineType: string) => {
      onChange(RichUtils.toggleInlineStyle(editorState, inlineType))
   }

   let editorClassName = 'RichEditor-editor'
   const contentState = editorState.getCurrentContent()
   if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
         editorClassName += ' RichEditor-hidePlaceholder'
      }
   }

   const blockTypes =
      !editorProps.readOnly &&
      (blockControlTypes === 'default' ? BLOCK_TYPES : blockControlTypes)

   const inlineTypes =
      !editorProps.readOnly &&
      (inlineControlTypes === 'default' ? INLINE_STYLES : inlineControlTypes)

   return (
      <Box className="RichEditor-root">
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               padding: '15px',
               position: 'sticky',
               top: '226px',
               backgroundColor: 'grey.light',
               zIndex: 100,
               boxShadow: ' 0px 1px 5px rgb(0 0 0 / 40%)',
               ...controlStyles?.header,
            }}
         >
            {blockTypes && (
               <BlockEditorControls
                  blockTypes={blockTypes}
                  editorState={editorState}
                  onBlockToggle={toggleBlockType}
               />
            )}

            {inlineTypes && (
               <InlineEditorControls
                  inlineStyles={inlineTypes}
                  editorState={editorState}
                  onInlineToggle={toggleInlineType}
               />
            )}

            {!editorProps.readOnly && (
               <CustomEditorControls
                  editorState={editorState}
                  onChange={onChange}
               />
            )}
         </Box>
         <Box
            sx={{
               position: 'sticky',
               top: '281px',
               backgroundColor: 'grey.light',
               zIndex: 100,
               boxShadow: '0px 1px 3px rgb(0 0 0 / 40%)',
               ...controlStyles?.toolbar,
            }}
         >
            <MainToolbar editorState={editorState} onChange={onChange} />
         </Box>

         <Box className={editorClassName} onFocus={focusEditor}>
            <Editor
               ref={editorRef}
               blockStyleFn={getBlockStyle}
               blockRendererFn={blockRendererFn}
               handleKeyCommand={handleKeyCommand}
               keyBindingFn={mapKeyToEditorCommand}
               readOnly={!editorIsFocus}
               spellCheck
               {...editorProps}
            />
         </Box>
      </Box>
   )
}

export default WEditor
