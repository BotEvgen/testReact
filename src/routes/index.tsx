import React from 'react'
import { Navigate } from 'react-router-dom'

import MainPage from '@pages/main'
import LoginPage from '@pages/login'



const routes = {
   redirectToHomeFromNotFound: {
      routeProps: {
         path: '*',
         element: <Navigate to="/home" />,
      },
      childrenRoutes: null,
   },
   redirectToHomeFromInitial: {
      routeProps: {
         path: '/',
         element: <Navigate to="/home" />,
      },
      childrenRoutes: null,
   },
   main: {
      routeProps: {
         path: '/home',
         element: <MainPage />,
         exact: true,
      },
      childrenRoutes: null,
   },
   login: {
      routeProps: {
         path: '/login',
         element: <LoginPage />,
      },
      childrenRoutes: null,
   },
} as const

export default routes
