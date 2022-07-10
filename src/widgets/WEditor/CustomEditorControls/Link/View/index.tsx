import React, { FC, ReactNode } from 'react'
import { ContentState } from 'draft-js'

import { Link } from '@mui/material'

type TELinkView = {
   start: number
   end: number
   contentState: ContentState
   decoratedText: string
   entityKey: string
   offsetKey: string
   children: ReactNode
}

const ELinkView: FC<TELinkView> = ({ contentState, entityKey, children }) => {
   const { url } = contentState.getEntity(entityKey).getData()

   return (
      <Link
         href={url}
         sx={{
            fontSize: '18px',
            margin: 0,
            padding: 0,
            borderBottom: '1px solid #007f3e',
            color: '#007f3e',
            textDecoration: 'unset',
         }}
      >
         {children}
      </Link>
   )
}

export default ELinkView
