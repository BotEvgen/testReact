import { AxiosResponse } from 'axios'
import { QueryKey, useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'

import {
   AuthorApi,
   TAuthorsGetAllResponse,
   TAuthorApiGetRequest,
} from '@services/Author/Author.api'

import { authorKeys } from '@/rquery/keys'

type TQueryOptionsType =
   | Omit<
        UseQueryOptions<
           AxiosResponse<TAuthorsGetAllResponse>,
           Error,
           AxiosResponse<TAuthorsGetAllResponse>,
           QueryKey
        >,
        'queryKey' | 'queryFn'
     >
   | undefined

const useAuthors = (
   apiParams: TAuthorApiGetRequest,
   options?: TQueryOptionsType
) => {
   const { grade } = apiParams

   return useQuery(
      authorKeys.list(`?grade=${apiParams.grade}`),
      () => AuthorApi.getAll({ grade }),
      options
   )
}

export { useAuthors }
