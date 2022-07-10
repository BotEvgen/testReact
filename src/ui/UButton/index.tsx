import React, { CSSProperties, FC } from 'react'

import { Box, Button } from '@mui/material'
import UCheckBox from '@ui/UCheckBox'

type TUButton = React.ComponentProps<typeof Button> & {
   withBorder?: boolean
   withCheckbox?: {
      checked: boolean
      style?: CSSProperties
   }
   typeOfAction?: TEnumOfButtonAction
}

const mapOfColors: Record<
   TEnumOfButtonAction,
   { default: string; hover: string }
> = {
   destructive: {
      default: '#9D2121',
      hover: '#671616',
   },
   save: {
      default: '#659DBD',
      hover: '#447896',
   },
   publish: {
      default: '#548CD9',
      hover: '#33619F',
   },
}

type TEnumOfButtonAction = 'destructive' | 'save' | 'publish'

const UButton: FC<TUButton> = ({
   children,
   disabled,
   variant = 'contained',
   withBorder = false,
   withCheckbox,
   typeOfAction,
   ...rest
}) => {
   const isDefaultButton = variant === 'contained'
   const isTextButton = variant === 'text'

   return (
      <Button
         variant={variant}
         disabled={disabled}
         startIcon={
            withCheckbox ? (
               <Box>
                  <UCheckBox
                     disableRipple
                     checked={withCheckbox.checked}
                     style={withCheckbox.style}
                  />
               </Box>
            ) : undefined
         }
         {...rest}
         sx={[
            isTextButton && {
               color: disabled ? '#CAD1DB ' : 'green.default',
               '.MuiButton-endIcon , .MuiButton-startIcon': {
                  svg: {
                     fill: disabled ? '#CAD1DB' : '#43B02A',
                     path: {
                        fill: disabled ? '#CAD1DB' : '#43B02A',
                     },
                  },
               },
            },
            isDefaultButton && {
               backgroundColor: typeOfAction
                  ? mapOfColors[typeOfAction].default
                  : 'green.default',
               color: disabled ? '#CAD1DB ' : 'white.default',
               '&:hover': {
                  backgroundColor: typeOfAction
                     ? mapOfColors[typeOfAction].hover
                     : 'green.dark',
               },
            },
            withBorder && {
               border: '4px solid #B6EFA9',
               '&:hover': {
                  border: '4px solid #0FAA5B',
               },
            },
            {
               '.MuiButton-endIcon , .MuiButton-startIcon': {
                  svg: {
                     fill: '#CAD1DB',
                     height: withCheckbox ? '20' : '15',
                     width: withCheckbox ? '20' : '15',
                  },
               },
            },
         ]}
      >
         {children}
      </Button>
   )
}

export default UButton
