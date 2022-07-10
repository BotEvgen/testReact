import { ContentBlock, ContentState } from 'draft-js'

const findLinkEntities = (contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) =>{
   contentBlock.findEntityRanges(
      (character) => {
         const entityKey = character.getEntity()
         return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
         )
      },
      callback,
   )
}

export {findLinkEntities}