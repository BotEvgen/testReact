import { createTheme, CustomPaletteOptions } from '@mui/material/styles'

const customPalette: CustomPaletteOptions = {
   primary: {
      main: '#43B02A',
   },
   secondary: {
      main: '#000000',
   },
   white: {
      default: '#FFFFFF',
   },
   green: {
      default: '#43B02A',
      light: '#B6EFA9',
      dark: '#007F3E',
   },
   grey: {
      default: '#F7F8FC',
      light: '#EFF2FA',
      dark: '#A3ABC3',
   },
   blue: {
      default: '#5172F6',
   },
   red: {
      dark: '#A53131',
   },
}

const theme = createTheme({
   palette: customPalette,
   typography: {
      fontFamily: 'Open Sans, sans-serif',
      '14_text': {
         fontStyle: 'normal',
         fontWeight: 400,
         fontSize: '14px',
         lineHeight: '140%',
      },
      '18_semiBold': {
         fontStyle: 'normal',
         fontWeight: '600',
         fontSize: '18px',
         lineHeight: '140%',
      },
   },
   components: {
      MuiTypography: {
         defaultProps: {
            variantMapping: {
               h1: 'h2',
               h2: 'h2',
               h3: 'h2',
               h4: 'h2',
               h5: 'h2',
               h6: 'h2',
               subtitle1: 'h2',
               subtitle2: 'h2',
               body1: 'span',
               body2: 'span',
               '14_text': 'span',
            },
         },
      },
      MuiLinearProgress: {
         styleOverrides: {
            bar: {
               backgroundColor: '#43B02A',
            },
         },
      },
   },
})

export { theme }
