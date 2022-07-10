import React from 'react'

import {
   AtomicBlockUtils,
   ContentBlock,
   ContentState,
   DraftBlockType,
   Editor,
   EditorState,
   genKey,
   Modifier,
   SelectionState,
} from 'draft-js'

type TDefaultEditorProps = {
   editorState: EditorState
   block: ContentBlock
   contentState: ContentState
   onChange: (editorState: EditorState) => void
}

type TDeleteAtomicProps = TDefaultEditorProps & {
   focusEditorSetState: (
      newState: boolean,
      elementForRef?: HTMLElement | React.MutableRefObject<Editor | null>
   ) => void
}

type TAddBlockProps = Omit<TDefaultEditorProps, 'block'> & {
   type: DraftBlockType
}

const getBlockStyle = (block: ContentBlock) => {
   switch (block.getType()) {
      case 'blockquote':
         return 'RichEditor-blockquote'
      case 'header-two':
         return 'RichEditor-h2'
      case 'header-three':
         return 'RichEditor-h3'
      case 'unstyled':
         return 'RichEditor-p'
      case 'atomic':
         return 'RichEditor-atomic'
      default:
         return ''
   }
}

const insertAtomicBlock = (
   editorState: EditorState,
   entityType: string,
   data: Record<string, unknown>
) => {
   const contentState = editorState.getCurrentContent()
   const contentStateWithEntity = contentState.createEntity(
      entityType,
      'IMMUTABLE',
      data
   )

   const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

   return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
}

const deleteAtomicBlock = ({
   editorState,
   block,
   contentState,
   onChange,
   focusEditorSetState,
}: TDeleteAtomicProps) => {
   const blockKey = block.getKey()

   const afterKey = contentState.getKeyAfter(blockKey)

   const beforeKey = contentState.getKeyBefore(blockKey)

   const targetRange = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: afterKey || beforeKey,
      focusOffset: 0,
   })

   let newContentState = Modifier.setBlockType(
      contentState,
      targetRange,
      'unstyled'
   )

   newContentState = Modifier.removeRange(
      newContentState,
      targetRange,
      'backward'
   )

   const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'remove-range'
   )

   onChange(newEditorState)
   focusEditorSetState(true)
}

const addBlockToContentState = ({
   type,
   editorState,
   contentState,
   onChange,
}: TAddBlockProps) => {
   const newBlock = new ContentBlock({
      key: genKey(),
      type,
   })

   const entityMap = contentState.getEntityMap()

   const newBlockMap = contentState
      .getBlockMap()
      .set(genKey(), newBlock)
      .toArray()

   const newContentState = ContentState.createFromBlockArray(
      newBlockMap,
      entityMap
   )

   const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'change-block-data'
   )

   onChange(newEditorState)
}

const getGeneralPropertiesFromEditorState = (editorState: EditorState) => ({
   contentState: editorState.getCurrentContent(),
   selection: editorState.getSelection(),
})

const getSelectedBlock = (editorState: EditorState) => {
   const startKey = editorState.getSelection().getStartKey()
   const selectedBlock = editorState
      .getCurrentContent()
      .getBlockForKey(startKey)

   return selectedBlock
}

const getSelectedEntityKey = (editorState: EditorState) => {
   const offset = editorState.getSelection().getStartOffset()

   return getSelectedBlock(editorState).getEntityAt(offset)
}

const getSelectedEntityRange = (
   editorState: EditorState,
   fn: (start: number, end: number) => void
) => {
   const entityKey = getSelectedEntityKey(editorState)
   const selectedBlock = getSelectedBlock(editorState)

   selectedBlock.findEntityRanges((c) => c.getEntity() === entityKey, fn)
}

const getSelectedEntity = (editorState: EditorState) => {
   const entityKey = getSelectedEntityKey(editorState)
   const contentState = editorState.getCurrentContent()

   return entityKey !== null ? contentState.getEntity(entityKey) : null
}

const getSelectedEntityType = (editorState: EditorState) => {
   const e = getSelectedEntity(editorState)

   return e !== null ? e.getType() : null
}

const getSelectedEntityData = (editorState: EditorState) => {
   const e = getSelectedEntity(editorState)

   return e !== null ? e.getData() : {}
}

const replaceSelectedEntityData = (
   editorState: EditorState,
   data: Record<string, unknown>
) => {
   const entityKey = getSelectedEntityKey(editorState)
   const contentState = editorState.getCurrentContent()

   return EditorState.push(
      editorState,
      contentState.replaceEntityData(entityKey, data),
      'change-block-data'
   )
}

export {
   getBlockStyle,
   insertAtomicBlock,
   deleteAtomicBlock,
   addBlockToContentState,
   getGeneralPropertiesFromEditorState,
   getSelectedBlock,
   getSelectedEntityKey,
   getSelectedEntityRange,
   getSelectedEntityType,
   getSelectedEntity,
   getSelectedEntityData,
   replaceSelectedEntityData,
}
