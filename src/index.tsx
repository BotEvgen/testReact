import 'es6-shim'

import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query'

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { SnackbarProvider } from 'notistack'

import InitReduxModals from '@widgets/WReduxModal'

import { CssBaseline, ThemeProvider } from '@mui/material'

import store from '@store/.'
import keycloak from '@/keycloak/keycloak'

import App from '@/App'
import reportWebVitals from '@/reportWebVitals'

import { theme } from '@/theme/theme'

import '@/index.css'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: 3,
         retryDelay: 5,
         staleTime: 30000,
         refetchOnWindowFocus: false,
      },
   },
})

const snackBarProviderDefaultProps = {
   autoHideDuration: 3000,
}

const keycloakProviderDefaultProps = {
   authClient: keycloak,
   initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
   },
}

const Main: FC = () => (
   <React.StrictMode>
      <ReactKeycloakProvider {...keycloakProviderDefaultProps}>
         <Provider store={store}>
            <QueryClientProvider client={queryClient}>
               <SnackbarProvider {...snackBarProviderDefaultProps}>
                  <ReactQueryDevtools initialIsOpen={false} />
                  <ThemeProvider theme={theme}>
                     <DndProvider backend={HTML5Backend}>
                        <CssBaseline />
                        <App />
                        <InitReduxModals />
                     </DndProvider>
                  </ThemeProvider>
               </SnackbarProvider>
            </QueryClientProvider>
         </Provider>
      </ReactKeycloakProvider>
   </React.StrictMode>
)

ReactDOM.render(<Main />, document.getElementById('root'))

reportWebVitals()
