import { useEffect, useState } from 'react'
import { ContentState, EditorState } from 'draft-js'

import { decorators } from '@widgets/WEditor/settings'

const useEditor = (initialContentState?: ContentState | null) => {
   const [editorState, setEditorState] = useState<EditorState>(()=>EditorState.createEmpty(decorators))

   useEffect(() => {
      let newState: EditorState | null = null
      if (initialContentState) {
         newState = EditorState.createWithContent(
            initialContentState,
            decorators
         )
      } else {
         newState = EditorState.createEmpty(decorators)
      }
      setEditorState(newState)
   }, [initialContentState])

   const onChange = (newEditorState: EditorState) => {
      setEditorState(newEditorState)
   }

   return {
      editorState,
      setEditorState,
      bind: {
         editorState,
         onChange,
      },
   }
}

export { useEditor }
