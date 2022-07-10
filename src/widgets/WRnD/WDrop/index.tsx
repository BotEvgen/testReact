import { FC, ReactElement } from 'react'
import { ConnectDropTarget, useDrop } from 'react-dnd'
import { DropTargetMonitor } from 'react-dnd/dist/types'

import { TPictureEntity } from '@services/Picture'

type TWDrop = {
   accept: string | string[]
   onDropHandler: (
      item: TPictureEntity,
      monitor: DropTargetMonitor<TPictureEntity, null>
   ) => null
   children: (
      collectedProps: { isOver: boolean; canDrop: boolean },
      dropRef: ConnectDropTarget
   ) => ReactElement
   deps?: unknown[]
}

const WDrop: FC<TWDrop> = ({ accept, onDropHandler, children, deps = [] }) => {
   const [collectedProps, dropRef] = useDrop(
      () => ({
         accept,
         drop: onDropHandler,
         collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
         }),
      }),
      [...deps]
   )

   return children(collectedProps, dropRef)
}

export default WDrop
