import { useMutation, useQueryClient } from 'react-query'

import { useNotificationsManager } from '@services/Notification/notification.manager'
import {
   MediaContactLocationsApi,
   TMediaContactLocationsPatchRequest,
   TMediaContactLocationsRequest,
} from '@services/MediaContactLocations/MediaContact.api'

import { mediaContactKeys } from '@/rquery/keys'

const useMutateMediaContact = (pageProps: TMediaContactLocationsRequest) => {
   const queryClient = useQueryClient()
   const notifier = useNotificationsManager()

   return {
      queryClient,
      query: useMutation(
         ({ id, body }: TMediaContactLocationsPatchRequest) =>
            MediaContactLocationsApi.patchPerson({ id, body }),
         {
            onSuccess: () => {
               notifier.addNotification({
                  id: String(Date.now()),
                  props: {
                     message: 'Ваши изменения сохранены',
                     variant: 'success',
                  },
               })
            },
            onError: () => {
               notifier.addNotification({
                  id: String(Date.now()),
                  props: {
                     message: 'Ошибка сохранения',
                     variant: 'error',
                  },
               })
            },
            onSettled: () => {
               queryClient.invalidateQueries(
                  mediaContactKeys.list(`&page=${pageProps.page}&limit=${pageProps.limit}
         &ordering=${pageProps.ordering}&search=${pageProps.search}
         &search_only=${pageProps.searchOptions}&isActive=${pageProps.flags?.is_active}&public=${pageProps.flags?.public}`)
               )
            },
         }
      ),
   }
}

export { useMutateMediaContact }
