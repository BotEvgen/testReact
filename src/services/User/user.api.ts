import keycloak from '@/keycloak/keycloak'

const UserApi = {
   getUserProfile: () => keycloak.loadUserProfile(),
}

export { UserApi }
