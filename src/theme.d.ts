import React from 'react'
import {
   Palette,
   PaletteOptions,
   ThemeOptions,
   TypographyVariant,
   TypographyVariantsOptions,
} from '@mui/material'

declare module '@mui/material/styles' {
   interface CustomPalette extends Palette {
      white: {
         default: string
      }
      green: {
         default: string
         light: string
         dark: string
      }
      grey: {
         default: string
         light: string
         dark: string
      }
      blue: {
         default: string
      }
      red: {
         dark: string
      }
   }

   interface CustomPaletteOptions extends PaletteOptions {
      white: {
         default: string
      }
      green: {
         default: string
         light: string
         dark: string
      }
      grey: {
         default: string
         light: string
         dark: string
      }
      blue: {
         default: string
      }
      red: {
         dark: string
      }
   }

   interface CustomTypographyVariants extends TypographyVariant {
      '14_text': React.CSSProperties
      '18_semiBold': React.CSSProperties
   }
   interface CustomTypographyVariantsOptions extends TypographyVariantsOptions {
      '14_text'?: React.CSSProperties
      '18_semiBold'?: React.CSSProperties
   }

   interface CustomThemeOptions extends ThemeOptions {
      palette: CustomPaletteOptions
      typography: CustomTypographyVariantsOptions
   }

   export function createTheme(options?: CustomThemeOptions): CustomTheme
}

declare module '@mui/material/Typography' {
   interface TypographyPropsVariantOverrides {
      '14_text': true
      '18_semiBold': true
   }
}
