import { AxiosResponse } from 'axios'
import { QueryKey, useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'

import {
   MediaContactLocationsApi,
   TMediaContactLocationsResponse,
   TMediaContactLocationsRequest,
} from '@services/MediaContactLocations/MediaContact.api'
import { mediaContactKeys } from '@/rquery/keys'

type TQueryOptionsType =
   | Omit<
        UseQueryOptions<
           AxiosResponse<TMediaContactLocationsResponse>,
           Error,
           AxiosResponse<TMediaContactLocationsResponse>,
           QueryKey
        >,
        'queryKey' | 'queryFn'
     >
   | undefined

const useMediaContacts = (
   pageProps: TMediaContactLocationsRequest,
   options?: TQueryOptionsType
) =>
   useQuery(
      mediaContactKeys.list(`&page=${pageProps.page}&limit=${pageProps.limit}
         &ordering=${pageProps.ordering}&search=${pageProps.search}
         &search_only=${pageProps.searchOptions}&isActive=${pageProps.flags?.is_active}&public=${pageProps.flags?.public}`),
      () =>
         MediaContactLocationsApi.getAllPerson({
            page: pageProps.page || undefined,
            limit: pageProps.limit || undefined,
            ordering: pageProps.ordering || undefined,
            search: pageProps.search || undefined,
            searchOptions: pageProps.searchOptions || undefined,
            flags: pageProps.flags,
         }),
      options
   )

export { useMediaContacts }
