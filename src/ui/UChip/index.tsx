import React, { FC } from 'react'

import { Chip } from '@mui/material'

import { ReactComponent as CloseIcon } from '@assets/icons/CloseIcon.svg'
import UChipSelect from '@ui/UChip/Select'

type TUChip = FC<React.ComponentProps<typeof Chip>> & {
   Select: typeof UChipSelect
}

const UChip: TUChip = ({ children, ...rest }) => (
   <Chip
      sx={{
         color: 'white.default',
         backgroundColor: 'green.default',

         padding: '4px',

         borderRadius: '4px',

         fontStyle: 'normal',
         fontWeight: '400',
         fontSize: '13px',
         lineHeight: '14px',
         '&:hover': {
            backgroundColor: 'green.dark',
         },
         '& .MuiChip-deleteIcon': {
            width: '9px',
            fill: '#FFFFFF',

            path: {
               stroke: '#FFFFFF',
            },
         },
      }}
      {...rest}
      deleteIcon={<CloseIcon />}
   />
)

UChip.Select = UChipSelect

export default UChip
