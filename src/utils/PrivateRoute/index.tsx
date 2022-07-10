import React from 'react'

import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

const PrivateRoute = () => {
   const location = useLocation()

   const { keycloak } = useKeycloak()

   return keycloak.authenticated ? (
      <Outlet />
   ) : (
      <Navigate to="/login" state={{ from: location }} replace />
   )
}

export default PrivateRoute
