import { ReactElement, FC } from 'react'
import { ConnectDragSource, useDrag } from 'react-dnd'

// type берётся из глобального объекта DragAndDropAccess
type TWDrag = {
   type: string
   dragObject: unknown
   children: (
      collectedProps: { isDragging: boolean },
      dragRef: ConnectDragSource
   ) => ReactElement
   deps?: unknown[]
}

const WDrag: FC<TWDrag> = ({ type, dragObject, children, deps = [] }) => {
   const [collectedProps, dragRef] = useDrag(
      () => ({
         type,
         item: dragObject,
         collect: (monitor) => ({
            isDragging: monitor.isDragging(),
         }),
      }),
      [...deps]
   )

   return children(collectedProps, dragRef)
}

export default WDrag
