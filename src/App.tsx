import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import { CircularProgress } from '@mui/material'

import { useUserManager } from '@services/User/user.manager'
import { TransferPageService } from '@services/TransferPage/TrasferPage.service'
import { MediaContactPageService } from '@services/MediaContactPage/MediaContactPage.service'

import useNotifier from '@hooks/useNotifier'

import PrivateRoute from '@utils/PrivateRoute'

import routes from '@/routes'

const App = () => {

   useNotifier()
   const { keycloak, initialized } = useKeycloak()
   const userManager = useUserManager()

   const {
      initTransferPageLocalStorageState,
      getTransferPageLocalStorageState,
   } = TransferPageService

   const {
      initMediaContactPageLocalStorageState,
      getMediaContactPageLocalStorageState,
   } = MediaContactPageService

   useEffect(() => {
      const lcTransferPageState = getTransferPageLocalStorageState()
      const lcMediaContactPageState = getMediaContactPageLocalStorageState()

      if (!lcTransferPageState) {
         initTransferPageLocalStorageState()
      }

      if (!lcMediaContactPageState) {
         initMediaContactPageLocalStorageState()
      }
   }, [])

   useEffect(() => {
      if (keycloak.token && keycloak.authenticated) {
         userManager.loadAndSetUserProfile()
      } else {
         userManager.resetUser()
      }
   }, [keycloak.token])

   if (!initialized) {
      return (
         <CircularProgress
            color="success"
            sx={{
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
            }}
         />
      )
   }

   return (
      <Router>
         <Routes>
            <Route {...routes.login.routeProps} />
            <Route path="/" element={<PrivateRoute />}>
               <Route {...routes.redirectToHomeFromInitial.routeProps} />
               <Route {...routes.redirectToHomeFromNotFound.routeProps} />
               <Route {...routes.main.routeProps} />
               <Route {...routes.articlesLocations.routeProps} />
               <Route {...routes.authorLocations.routeProps} />
               <Route {...routes.sluglineLocations.routeProps} />
               <Route {...routes.tagsLocations.routeProps} />
               <Route {...routes.categoriesLocations.routeProps} />
               <Route {...routes.mediaContact.routeProps} />
               <Route {...routes.metroNewsTransferGradeA.routeProps} />
               <Route {...routes.metroNewsTransferGradeB.routeProps} />
               <Route {...routes.metroNewsTransferGradeC.routeProps} />
            </Route>
         </Routes>
      </Router>
   )
}

export default App
