import { AxiosResponse } from 'axios'
import { QueryKey, useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'

import { TMediaContactEntity } from '@services/MediaContactLocations/MediaContact.entity'
import { MediaContactLocationsApi } from '@services/MediaContactLocations/MediaContact.api'

import { mediaContactKeys } from '@/rquery/keys'

type TQueryOptionsType =
   | Omit<
        UseQueryOptions<
           AxiosResponse<TMediaContactEntity>,
           Error,
           AxiosResponse<TMediaContactEntity>,
           QueryKey
        >,
        'queryKey' | 'queryFn'
     >
   | undefined

const useMediaContact = (id: string, options?: TQueryOptionsType) =>
   useQuery(
      mediaContactKeys.detail(id),
      () => MediaContactLocationsApi.getPerson({ id }),
      options
   )

export { useMediaContact }
