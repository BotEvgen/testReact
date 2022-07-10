import { AxiosResponse } from 'axios'
import { QueryKey, useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'

import {
   SluglineApi,
   TSluglineGetAllResponse,
   TSluglineApiGetRequest,
} from '@services/Slugline/Slugline.api'

import { sluglineKeys } from '@/rquery/keys'

type TQueryOptionsType =
   | Omit<
        UseQueryOptions<
           AxiosResponse<TSluglineGetAllResponse>,
           Error,
           AxiosResponse<TSluglineGetAllResponse>,
           QueryKey
        >,
        'queryKey' | 'queryFn'
     >
   | undefined

const useSluglines = (
   apiParams: TSluglineApiGetRequest,
   options?: TQueryOptionsType
) => {
   const { grade } = apiParams

   return useQuery(
      sluglineKeys.list(`?grade=${apiParams.grade}`),
      () => SluglineApi.getAll({ grade }),
      options
   )
}

export { useSluglines }
