import React, { FC, useEffect, useMemo } from 'react'
import { ContentBlock, ContentState, Editor, EditorState } from 'draft-js'

import {
   addBlockToContentState,
   deleteAtomicBlock,
} from '@widgets/WEditor/helpers'

import WFeatureMedia, { TWFeatureMediaOnChange } from '@widgets/WFeatureMedia'

type TEImageView = {
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

type TImageData = {
   src: string
   copyright: string
   description: string
}

const EImageView: FC<TEImageView> = ({ contentState, block, blockProps }) => {
   const entity = contentState.getEntity(block.getEntityAt(0))

   const data: TImageData = entity.getData()

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

   const imageProps = useMemo(
      () => ({
         src: data.src,
         description: data.description,
         copyright: data.copyright,
      }),
      [data]
   )

   const onFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
      e.stopPropagation()
      setEditorFocus(false, e.currentTarget)
   }

   const onBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
      e.stopPropagation()
      setEditorFocus(true)
   }

   const onChangeHandler = ({
      type,
      featureMediaInstance,
      editMode,
   }: TWFeatureMediaOnChange) => {
      if (type === 'close') {
         const deleteHandlerProps = {
            editorState,
            block,
            contentState,
            onChange,
            focusEditorSetState: setEditorFocus,
         }
         deleteAtomicBlock(deleteHandlerProps)
      } else if (type === 'edit' && editMode) {
         data.src = featureMediaInstance.src.value
         data.description = featureMediaInstance.description.value
         data.copyright = featureMediaInstance.copyright.value
      }
   }

   return (
      <WFeatureMedia
         onChangeHandler={onChangeHandler}
         featureMediaProps={imageProps}
         onFocus={onFocus}
         onBlur={onBlur}
      />
   )
}

export default EImageView
