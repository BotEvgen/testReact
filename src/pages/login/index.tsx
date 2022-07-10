import React, { useCallback } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

import { Box } from '@mui/material'

import UButton from '@/ui/UButton'

interface CustomizedState {
   from: Location
}

const LoginPage = () => {
   const location = useLocation()
   const { keycloak } = useKeycloak()

   const locationState = location.state as CustomizedState

   const currentLocationState = locationState || {
      from: { pathname: '/home' },
   }

   const onLoginClickHandler = useCallback(() => {
      keycloak.redirectUri = `${window.location.origin}${locationState.from.pathname}${locationState.from.search}`
      keycloak.login()
   }, [keycloak])

   const onLogOutClickHandler = useCallback(() => {
      keycloak.logout()
   }, [keycloak])

   if (keycloak?.authenticated)
      return <Navigate to={currentLocationState.from} replace />

   return (
      <Box
         sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '.MuiButton-root + .MuiButton-root': {
               mt: '20px',
            },
         }}
      >
         <UButton fullWidth onClick={onLoginClickHandler}>
            Войти
         </UButton>
         <UButton fullWidth onClick={onLogOutClickHandler}>
            Выйти
         </UButton>
      </Box>
   )
}

export default LoginPage
