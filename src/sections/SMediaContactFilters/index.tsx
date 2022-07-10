import { useEffect } from 'react'


import { useMounted } from '@hooks/useMounted'
import { useMediaContactFilter } from '@hooks/useMediaContactFilter'

const SMediaContactFilters = (): null => {
   const {
      queryUtils,
      filters,
      subSetOfFilters,
      actions,
      options,
      dependencies,
   } = useMediaContactFilter()

   const { activeFilter, activePersonId } = useMediaContactPageState()

   const { prepareNewCustomFilter } = MediaContactFilterService
   const { updateMediaContactPageStateInLocalStorage } = MediaContactPageService

   const mediaContactManager = useMediaContactPageManager()

   const isMounted = useMounted(true)

   useEffect(() => {
      if (options.filtersAreEmpty) {
         if (activePersonId) {
            queryUtils.addQuery('contactId', activePersonId)
         }

         if (activeFilter) {
            actions.applyFilter(activeFilter)
         }
      } else {
         const lastCursorTable =
            typeof subSetOfFilters.lastCursorTable === 'string'
               ? Number(subSetOfFilters.lastCursorTable)
               : subSetOfFilters.lastCursorTable

         const currentFilterFromQuery = prepareNewCustomFilter(filters, '', {
            page: Number(subSetOfFilters.page) || 1,
            limit: Number(subSetOfFilters.limit) || 100,
            scrollTable: Number(queryUtils.getQuery('scrollTable')) || 0,
            ordering: subSetOfFilters.ordering,
            lastCursorTable: lastCursorTable !== null && {
               indexOfRow: lastCursorTable,
               page: Number(subSetOfFilters.page) || 1,
               limit: Number(subSetOfFilters.limit) || 100,
               scrollTable: Number(queryUtils.getQuery('scrollTable')),
            },
         })
         actions.applyFilter(currentFilterFromQuery)
      }
   }, [])

   useEffect(() => {
      if (isMounted) {
         const newStateOfPageEntity = { activePersonId, activeFilter }

         updateMediaContactPageStateInLocalStorage(newStateOfPageEntity)
      }
   }, [activeFilter, activePersonId])

   useEffect(() => {
      if (isMounted) {
         if (options.filtersAreEmpty) {
            mediaContactManager.setActiveFilter(null)
         } else {
            const currentFilterFromQuery = prepareNewCustomFilter(filters, '', {
               page: 1,
               limit: 100,
               scrollTable: 0,
               ordering: null,
               lastCursorTable: null,
            })

            mediaContactManager.setActiveFilter(currentFilterFromQuery)
         }
      }
   }, [...dependencies.filterDependencies, ...dependencies.flagsDependencies])

   useEffect(() => {
      if (isMounted) {
         const scrollIsUpdated =
            activeFilter?.userState.scrollTable !==
            Number(queryUtils.getQuery('scrollTable'))

         const lastCursorTable =
            typeof subSetOfFilters.lastCursorTable === 'string'
               ? Number(subSetOfFilters.lastCursorTable)
               : subSetOfFilters.lastCursorTable

         const indexOfCursorRowIsUpdate =
            lastCursorTable !==
            (activeFilter?.userState.lastCursorTable &&
               activeFilter?.userState.lastCursorTable.indexOfRow)

         const prevCursorState = {
            indexOfRow: lastCursorTable,
            page: Number(subSetOfFilters.page) || 1,
            limit: Number(subSetOfFilters.limit) || 100,
         }

         const currentCursor = {
            ...activeFilter?.userState.lastCursorTable,
            scrollTable: undefined,
         }

         const cursorIsUpdated =
            JSON.stringify(currentCursor) !== JSON.stringify(prevCursorState)

         if (scrollIsUpdated || cursorIsUpdated) {
            const userState = {
               page: Number(subSetOfFilters.page),
               limit: Number(subSetOfFilters.limit),
               ordering: subSetOfFilters.ordering,
               scrollTable: Number(queryUtils.getQuery('scrollTable')),
               lastCursorTable: lastCursorTable !== null && {
                  indexOfRow: lastCursorTable,
                  page:
                     cursorIsUpdated &&
                     !scrollIsUpdated &&
                     Number(queryUtils.getQuery('scrollTable')) !== 0
                        ? Number(subSetOfFilters.page) || 1
                        : (activeFilter?.userState.lastCursorTable &&
                             activeFilter?.userState.lastCursorTable.page) ||
                          1,
                  limit:
                     cursorIsUpdated &&
                     !scrollIsUpdated &&
                     Number(queryUtils.getQuery('scrollTable')) !== 0
                        ? Number(subSetOfFilters.limit) || 100
                        : (activeFilter?.userState.lastCursorTable &&
                             activeFilter?.userState.lastCursorTable.limit) ||
                          100,
                  scrollTable:
                     indexOfCursorRowIsUpdate &&
                     Number(queryUtils.getQuery('scrollTable')) !== 0
                        ? Number(queryUtils.getQuery('scrollTable'))
                        : (activeFilter?.userState.lastCursorTable &&
                             activeFilter?.userState.lastCursorTable
                                .scrollTable) ||
                          0,
               },
            }

            if (activeFilter) {
               const filterToOverWrite = {
                  ...activeFilter,
                  userState,
               }

               mediaContactManager.setActiveFilter(filterToOverWrite)
            }
         }
      }
   }, [
      queryUtils.getQuery('scrollTable'),
      queryUtils.getQuery('lastCursorTable'),
   ])

   return null
}

export default SMediaContactFilters
