import Keycloak from 'keycloak-js'

import { appConfig } from '@/appConfig'

const keycloakConfig = {
   url: appConfig.keycloakApiUrl || '',
   realm: appConfig.keycloakRealm || '',
   clientId: appConfig.keycloakClientId || '',
}

const keycloak = Keycloak(keycloakConfig)

export default keycloak
