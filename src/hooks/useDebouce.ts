import { useCallback, useRef } from 'react'

//! unknown не соотносится с конкретными типами

const useDebounce = (callback: (...args: any[]) => unknown, delay: number) => {
   const timer = useRef<NodeJS.Timeout>()

   const debouncedCallback = useCallback(
      (...args) => {
         if (timer.current) {
            clearTimeout(timer.current)
         }
         timer.current = setTimeout(() => {
            callback(...args)
         }, delay)
      },
      [callback, delay]
   )

   return debouncedCallback
}

export { useDebounce }
