import React, { useEffect, useState } from 'react'

export interface ICustomEvent<T> {
   target: {
      value: T
      [key: string]: any
   }
   [key: string]: any
}

type TUseInput<T> = {
   value: T
   setValue: React.Dispatch<React.SetStateAction<T>>
   bind: {
      value: T
      onChange(e: ICustomEvent<T>): void
   }
}

const useInput = <T>(
   initVal: T,
   deps: unknown[] = [],
   onChange?: (event: ICustomEvent<T>) => void
): TUseInput<T> => {
   const [value, setValue] = useState<T>(initVal)

   const handlerChange = (e: ICustomEvent<T>): void => {
      setValue(e.target.value)

      if (onChange) {
         onChange(e)
      }
   }

   useEffect(() => {
      setValue(initVal)
   }, [initVal, ...deps])

   return {
      value,
      setValue,
      bind: {
         value,
         onChange: handlerChange,
      },
   }
}

export default useInput
