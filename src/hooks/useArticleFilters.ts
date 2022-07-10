import { useMemo } from 'react'

import {
   TTransferCustomFilterEntity,
   TTransferFiltersEntity,
   TTransferFilterUserState,
} from '@services/TransferFilter/filter.entity'

import { useQueryManager } from '@hooks/useQueryManager'

const useArticleFilters = () => {
   const { searchParams, setSearchParams, queryUtils } = useQueryManager()

   const filterDependencies = [
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
   ]

   const flagsDependencies = [
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
      queryUtils.getQuery('test'),
   ]

   const subsetFilterDependencies = [
      queryUtils.getQuery('page'),
      queryUtils.getQuery('limit'),
      queryUtils.getQuery('ordering'),
      queryUtils.getQuery('lastCursorTable'),
   ]




   const subSetOfFilters = useMemo(
      () => ({
         page: queryUtils.getQuery('page'),
         limit: queryUtils.getQuery('limit'),
         ordering: queryUtils.getQuery('ordering'),
         lastCursorTable: queryUtils.getQuery('lastCursorTable'),
      }),
      [...subsetFilterDependencies]
   )

   const filtersAreEmpty = useMemo(
      () => Object.values(filters).every((item) => !item.value),
      [filters]
   )

   const applyFilter = (filterStateToApply: TTransferCustomFilterEntity) => {
      const mutatedUserState = {
         ...filterStateToApply.userState,
         lastCursorTable:
            filterStateToApply.userState.lastCursorTable &&
            filterStateToApply.userState.lastCursorTable.indexOfRow,
      }

      const filterToAddQuery = {
         ...filterStateToApply.filters,
         ...mutatedUserState,
      }

      Object.entries(filterToAddQuery).forEach(([key, value]) => {
         if (value) {
            searchParams.set(key, String(value))
         }
      })
      setSearchParams(searchParams)
   }

   const applyUserState = (
      userStateOfFilter: Partial<TTransferFilterUserState>
   ) => {
      const mutatedUserState = {
         ...userStateOfFilter,
         lastCursorTable:
            userStateOfFilter.lastCursorTable &&
            userStateOfFilter.lastCursorTable.indexOfRow,
      }

      Object.entries(mutatedUserState).forEach(([key, value]) => {
         if (value !== null) {
            searchParams.set(key, String(value))
         }
      })

      setSearchParams(searchParams)
   }

   const resetSubsetOfFilter = () => {
      searchParams.set('page', '1')
      searchParams.set('limit', '100')
      searchParams.delete('ordering')

      setSearchParams(searchParams)
   }

   const resetScroll = () => {
      queryUtils.addQuery('scrollTable', '0')
   }

   return {
      filters,
      flagsQuery,
      subSetOfFilters,
      queryUtils,
      searchParams,
      setSearchParams,
      options: {
         filtersAreEmpty,
      },
      actions: {
         applyFilter,
         applyUserState,
         resetSubsetOfFilter,
         resetScroll,
      },
      dependencies: {
         flagsDependencies,
         filterDependencies,
         subsetFilterDependencies,
      },
   }
}

export { useArticleFilters }
