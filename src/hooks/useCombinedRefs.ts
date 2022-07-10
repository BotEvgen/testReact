import React, { useRef, useEffect } from 'react'

// TODO: Убрать any,ts ignore, разобраться в целом с типизацией ReactTable

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const useCombinedRefs = (...refs): React.MutableRefObject<any> => {
   const targetRef = useRef()

   useEffect(() => {
      refs.forEach((ref) => {
         if (!ref) return

         if (typeof ref === 'function') {
            ref(targetRef.current)
         } else {
            ref.current = targetRef.current
         }
      })
   }, [refs])

   return targetRef
}

export { useCombinedRefs }
