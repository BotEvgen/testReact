import React, { forwardRef, useEffect, useRef } from 'react'

import UCheckBox from '@ui/UCheckBox'

import { useCombinedRefs } from '@/hooks/useCombinedRefs'

type TWTableCheckBox = {
   indeterminate?: boolean
   name?: string
}

const WTableCheckbox = forwardRef<HTMLInputElement, TWTableCheckBox>(
   ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
      const defaultRef = useRef(null)
      const combinedRef = useCombinedRefs(ref, defaultRef)

      useEffect(() => {
         if (combinedRef?.current) {
            combinedRef.current.indeterminate = indeterminate ?? false
         }
      }, [combinedRef, indeterminate])

      return <UCheckBox ref={combinedRef} {...rest} size="small" />
   }
)

export default WTableCheckbox
