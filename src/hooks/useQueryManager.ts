import { useSearchParams } from 'react-router-dom'

const useQueryManager = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const getQuery = (name: string) => searchParams.get(name)

   const addQuery = (name: string, value: string) => {
      searchParams.set(name, value)
      setSearchParams(searchParams)
   }

   const addObjQuery = (objOfParams: Record<string, string>) => {
      Object.entries(objOfParams).forEach(([queryName, queryValue]) => {
         if (queryValue) {
            searchParams.set(queryName, queryValue)
         } else {
            searchParams.delete(queryName)
         }
      })
      setSearchParams(searchParams)
   }

   const removeArrayOfQuery = (objParams: string[]) => {
      objParams.forEach((queryToDelete) => {
         searchParams.delete(queryToDelete)
      })
      setSearchParams(searchParams)
   }

   const removeQuery = (name: string) => {
      searchParams.delete(name)
      setSearchParams(searchParams)
   }

   const clearAll = (exceptions?: string[]) => {
      Array.from(searchParams).forEach((params) => {
         const [value, key] = params
         if (exceptions?.every((exception) => exception !== value)) {
            searchParams.delete(value)
         }
      })
      setSearchParams(searchParams)
   }

   const clearAllAndAddNewQuery = (
      objOfAddParams: Record<string, string>,
      exceptionsOfDeleteParams?: string[]
   ) => {
      Array.from(searchParams).forEach((params) => {
         const [value] = params
         if (
            exceptionsOfDeleteParams?.every((exception) => exception !== value)
         ) {
            searchParams.delete(value)
         }
      })
      addObjQuery(objOfAddParams)
   }

   return {
      searchParams,
      setSearchParams,
      queryUtils: {
         getQuery,
         addQuery,
         addObjQuery,
         removeArrayOfQuery,
         removeQuery,
         clearAll,
         clearAllAndAddNewQuery,
      },
   }
}

export { useQueryManager }
