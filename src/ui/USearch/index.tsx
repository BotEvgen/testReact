import React, { FC } from 'react'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { ReactComponent as SearchIcon } from '@assets/icons/SearchIcon.svg'

type TUSearch = Partial<React.ComponentProps<typeof Input>>

const USearch: FC<TUSearch> = ({ ...rest }) => (
   <Input
      startAdornment={
         <InputAdornment
            position="start"
            sx={{
               '& svg': {
                  '& path': {
                     stroke: '#797C7A',
                  },
               },
            }}
         >
            <SearchIcon />
         </InputAdornment>
      }
      {...rest}
      sx={{
         width: '400px',
         pl: '10px',

         backgroundColor: 'grey.light',
         fontSize: '14px',

         lineHeight: '140%',
         borderRadius: '100px',

         '&:before': {
            display: 'none',
         },
         '&:after': {
            display: 'none',
         },
         '& .MuiInput-input': {
            ml: '10px',

            '&::placeholder': {
               fontWeight: 400,
               fontSize: '12px',
               lineHeight: '140%',
            },
         },
      }}
   />
)

export default USearch
