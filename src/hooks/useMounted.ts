import { useEffect, useRef } from 'react'

const useMounted = <T = unknown>(value: T): T | undefined => {
   const ref = useRef<T>()

   useEffect(() => {
      ref.current = value
   })

   return ref.current
}

export { useMounted }
