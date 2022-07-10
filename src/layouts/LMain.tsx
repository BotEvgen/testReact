import React, { FC } from 'react'

import Box from '@mui/material/Box'

import SHeader from '@/sections/SHeader'

const LMain: FC = ({ children }) => (
   <>
      <SHeader>
         <Box
            sx={{
               height: 'calc(100% - 64px)',
               position: 'relative',
            }}
         >
            {children}
         </Box>
      </SHeader>
      <Box
         id="LMain__portal"
         sx={{
            height: '100vh',
         }}
      />
   </>
)

export default LMain
