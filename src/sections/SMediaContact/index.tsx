import React from 'react'

import { Box } from '@mui/material'

import SMediaContactDrawer from '@sections/SMediaContactDrawer'
import SMediaContactFilters from '@sections/SMediaContactFilters'

import { useQueryManager } from '@hooks/useQueryManager'

const SMediaContact = () => {
   const { queryUtils } = useQueryManager()

   const contactId = queryUtils.getQuery('contactId')

   const isEditDrawer = contactId === 'new'

   return (
      <Box
         sx={{
            position: 'relative',
            height: '100%',

            backgroundColor: '#EFF2FA',
         }}
      >
         <SMediaContactFilters />


         {isEditDrawer && <SMediaContactDrawer.Create />}
         {!isEditDrawer && <SMediaContactDrawer.View />}
      </Box>
   )
}

export default SMediaContact
