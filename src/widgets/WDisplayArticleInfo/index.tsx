import React, { FC, ReactNode } from 'react'

import { Box, Typography } from '@mui/material'

type TPropertyRender = Partial<React.ComponentProps<typeof Box>> & {
   name: string
   dataToDefaultRender?: string | number | null
   render: 'text' | ReactNode
   breakpoints: {
      xs?: number
      sm?: number
      md?: number
      lg?: number
      xl?: number
   }
}

type TWDisplayArticleInfo = {
   propertiesForRender: Record<string, TPropertyRender>
}

const WDisplayArticleInfo: FC<TWDisplayArticleInfo> = ({
   propertiesForRender,
   ...rest
}) => (
   <Box
      sx={{
         '&>div': {
            mt: '18px',
         },
      }}
   >
      {Object.entries(propertiesForRender).map(([key, obj], index) => {
         if (obj.render === 'text')
            return (
               <Box
                  key={index}
                  sx={{
                     display: 'flex',
                  }}
               >
                  <Typography
                     sx={{
                        flexBasis: '40%',
                        flexShrink: 0,
                        textTransform: 'uppercase',
                     }}
                     variant="14_text"
                  >
                     {obj.name}
                  </Typography>

                  <Typography
                     sx={{
                        fontWeight: '700',
                        flexBasis: '60%',
                        wordBreak: 'break-all',
                     }}
                  >
                     {obj.dataToDefaultRender}
                  </Typography>
               </Box>
            )

         return (
            <Box
               key={index}
               sx={{
                  '&> .MuiTypography-root+.MuiPaper-root, &>.MuiBox-root': {
                     mt: '10px',
                  },
               }}
               {...rest}
            >
               {obj.render}
            </Box>
         )
      })}
   </Box>
)

export default WDisplayArticleInfo
