import { KeycloakProfile } from 'keycloak-js'
import { useAppSelector } from '@/store'

export type TUserProfileEntity = KeycloakProfile

const useUser = () => {
   const user = useAppSelector((state) => state.user)
   return user
}

export { useUser }
