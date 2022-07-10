import React, { FC } from 'react'

import { Chip } from '@mui/material'

type TUChipSelect = React.ComponentProps<typeof Chip> & {
   selected: boolean
}

const UChipSelect: FC<TUChipSelect> = ({ children, selected, ...rest }) => (
   <Chip
      sx={{
         color: selected ? '#797C7A' : 'grey.dark',

         padding: '8px 10px',

         borderRadius: '4px',

         fontWeight: selected ? '700' : '600',
         fontSize: '12px',

         width: '260px',

         backgroundColor: selected ? 'green.light' : '#F0F2F5',

         textTransform: 'uppercase',

         ':hover': {
            backgroundColor: selected ? 'green.default' : '',
         },
      }}
      {...rest}
   />
)

export default UChipSelect
