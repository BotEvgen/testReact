import React, { useState } from 'react'

const useCheckboxes = (initialValue: Record<string, boolean>) => {
   const [stateOfCheckboxes, setStateOfCheckboxes] =
      useState<Record<string, boolean>>(initialValue)

   const onChangeHandler = (
      event: React.ChangeEvent<HTMLInputElement>,
      type: string
   ) => {
      const newState = {
         ...stateOfCheckboxes,
         [type]: event.currentTarget.checked,
      }
      setStateOfCheckboxes(newState)
   }
   return {
      stateOfCheckboxes,
      setStateOfCheckboxes,
      onChangeHandler,
   }
}

export { useCheckboxes }
