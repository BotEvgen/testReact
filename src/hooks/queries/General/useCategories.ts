import { AxiosResponse } from 'axios'
import { QueryKey, useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'

import {
   CategoryApi,
   TCategoryGetAllResponse,
   TCategoryApiGetRequest,
} from '@services/Category/Category.api'

import { categoryKeys } from '@/rquery/keys'

type TQueryOptionsType =
   | Omit<
        UseQueryOptions<
           AxiosResponse<TCategoryGetAllResponse>,
           Error,
           AxiosResponse<TCategoryGetAllResponse>,
           QueryKey
        >,
        'queryKey' | 'queryFn'
     >
   | undefined

const useCategories = (
   apiParams: TCategoryApiGetRequest,
   options?: TQueryOptionsType
) => {
   const { grade } = apiParams

   return useQuery(
      categoryKeys.list(`?grade=${apiParams.grade}`),
      () => CategoryApi.getAll({ grade }),
      options
   )
}

export { useCategories }
