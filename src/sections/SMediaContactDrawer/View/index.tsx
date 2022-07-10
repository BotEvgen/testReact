import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Box, Container, LinearProgress, Typography } from '@mui/material'

import UTabs from '@ui/UTabs'
import UTextField from '@ui/UTextField'
import UButton from '@ui/UButton'

import WDrawer from '@widgets/WDrawer'
import WTabPanel from '@widgets/WTabPanel'



import { useMediaContact } from '@hooks/queries/MediaContact/useMediaContact'
import { useMutateMediaContact } from '@hooks/queries/MediaContact/useMutateMediaContact'
import { useMediaContactFilter } from '@hooks/useMediaContactFilter'
import useInput from '@hooks/useInput'
import useNotifier from '@hooks/useNotifier'

import { mediaContactKeys } from '@/rquery/keys'

const SMediaContactDrawerView = () => {
   const notifier = useNotifier()

   const { subSetOfFilters, filters, queryUtils, flagsQuery } =
      useMediaContactFilter()

   const rightDrawerState = useRightDrawerState()

   const modalsManager = useModalsManager()
   const rightDrawerStateManager = useRightDrawerStateManager()
   const drawerManager = useDrawersManager()
   const mediaContactPageStateManager = useMediaContactPageManager()

   const currentContactId = queryUtils.getQuery('contactId') || ''
   const currentOrdering = queryUtils.getQuery('ordering') || ''

   const [currentTab, setCurrentTab] = useState<number>(0)

   const emailEntity = useRef<string[] | null>(null)
   const phonesEntity = useRef<TMediaContactPhoneEntity[] | null>(null)
   const organisationsEntity = useRef<TMediaContactOrganisationEntity[] | null>(
      null
   )

   const idOfSnapshot = useRef<string | null>(null)

   const bindSnapshotEntity = (newIdOfSnapshot: string) => {
      idOfSnapshot.current = newIdOfSnapshot
   }

   const bindEmailEntity = (newEmailEntity: string[]) => {
      emailEntity.current = newEmailEntity
   }

   const bindPhoneEntity = (newPhones: TMediaContactPhoneEntity[]) => {
      phonesEntity.current = newPhones
   }

   const bindOrganisationEntity = (
      newOrganisations: TMediaContactOrganisationEntity[]
   ) => {
      organisationsEntity.current = newOrganisations
   }

   const currentPage = useMemo(
      () => (subSetOfFilters.page ? +subSetOfFilters.page : 1),
      [subSetOfFilters.page]
   )
   const currentLimit = useMemo(
      () => (subSetOfFilters.limit ? +subSetOfFilters.limit : 100),
      [subSetOfFilters.limit]
   )

   const contactIdIsEmpty = Boolean(currentContactId)

   useEffect(() => {
      if (currentContactId && currentContactId !== 'new') {
         drawerManager.setRightDrawer(true)
      } else if (currentContactId !== 'new') {
         drawerManager.setRightDrawer(false)
         rightDrawerStateManager.resetTMediaContactPageRightDrawerEntity()
      }
   }, [currentContactId])

   const {
      data: response,
      isLoading,
      isRefetching,
      refetch,
   } = useMediaContact(currentContactId, {
      enabled: contactIdIsEmpty,
   })

   const currentContact = useMemo(
      () => response?.data,
      [response, isRefetching]
   )

   const contactFlagStates: TMediaContactFlagsEntity | undefined =
      currentContact && {
         is_active: currentContact?.is_active,
         public: currentContact?.public,
      }

   const { query: mutateQuery, queryClient: mutateQueryClient } =
      useMutateMediaContact({
         page: currentPage,
         limit: currentLimit,
         search: filters.search.value || '',
         searchOptions: filters.search_only.value || '',
         ordering: currentOrdering,
         flags: flagsQuery,
      })

   const isPrevContact = Boolean(rightDrawerState.transferPage.currentIndex)
   const isNextContact = Boolean(rightDrawerState.transferPage.nextId)

   const firstNameInput = useInput(currentContact?.first_name || '', [
      isRefetching,
   ])
   const lastNameInput = useInput(currentContact?.last_name || '', [
      isRefetching,
   ])
   const notesInput = useInput(currentContact?.notes || '', [isRefetching])
   const honorificInput = useInput(currentContact?.honorific || '', [
      isRefetching,
   ])

   const onChangeTabHandler = (event: React.SyntheticEvent, newTab: number) => {
      setCurrentTab(newTab)
   }

   const onFlagStatesClickHandler = (
      valueToPatch: Partial<TMediaContactFlagsEntity>
   ) => {
      mutateQuery.mutate(
         { id: currentContactId, body: valueToPatch },
         {
            onSuccess: (newArticle) => {
               mutateQueryClient.setQueryData(
                  mediaContactKeys.detail(newArticle.data.guid),
                  newArticle
               )
            },
         }
      )
   }

   const closeSaveModal = () => {
      modalsManager.hideModal({ name: 'Warning' })
   }

   const refetchCurrentContact = () => refetch()

   const onDeleteMediaContact = () => {
      MediaContactLocationsApi.deletePerson(currentContactId)
         .then(() => {
            closeSaveModal()
            notifier.addNotification({
               id: String(Date.now()),
               props: {
                  message: 'Контакт успешно удалён',
                  variant: 'success',
               },
            })

            mutateQueryClient.invalidateQueries(mediaContactKeys.all)
            queryUtils.removeQuery('contactId')
         })
         .catch(() => {
            notifier.addNotification({
               id: String(Date.now()),
               props: {
                  message: 'Ошибка удаления. Повторите попытку.',
                  variant: 'error',
               },
            })
         })
   }

   const callDeleteModal = () => {
      modalsManager.showModal({
         name: 'Warning',
         props: {
            warningText: 'Вы действительно хотите удалить контакт?',
            actions: [
               {
                  text: 'Удалить',
                  onClick: onDeleteMediaContact,
                  typeOfAction: 'destructive',
               },
            ],
            withCancel: true,
         },
      })
   }

   const onRefetchCurrentContact = () => {
      const onLoadModalClick = () => {
         refetchCurrentContact()
         closeSaveModal()
      }

      modalsManager.showModal({
         name: 'Warning',
         props: {
            warningText:
               'Вся несохраненная информация будет потеряна. Загрузить последнее сохраненное состояние контакта?',
            actions: [
               { text: 'Загрузить', onClick: onLoadModalClick },
               { text: 'Отмена', onClick: closeSaveModal },
            ],
         },
      })
   }

   const closeRightDrawerWithReset = () => {
      queryUtils.removeQuery('contactId')

      drawerManager.setRightDrawer(false)
      rightDrawerStateManager.resetTMediaContactPageRightDrawerEntity()

      mediaContactPageStateManager.setActivePersonId(null)
   }

   const changeArticleDecorator = (
      callback: (
         isChanged: boolean,
         changedFields: Record<
            keyof Pick<TMediaContactEntity, 'first_name' | 'last_name'>,
            { name: string; isChanged: boolean }
         >,
         editChangedFieldsToString: string,
         ...args: unknown[]
      ) => unknown
   ) => {
      const mapOfFields: Record<
         string,
         {
            name: string
            isChanged: boolean
            original: string | boolean
            editing: string | boolean
         }
      > = {
         first_name: {
            name: 'Имя',
            isChanged: false,
            original: currentContact?.first_name || '',
            editing: firstNameInput.value || '',
         },
         last_name: {
            name: 'Имя',
            isChanged: false,
            original: currentContact?.last_name || '',
            editing: lastNameInput.value || '',
         },
      }

      let someStateInChanged = false

      Object.entries(mapOfFields).forEach(([key, fieldInfo]) => {
         if (fieldInfo.original !== fieldInfo.editing) {
            someStateInChanged = true
            mapOfFields[key].isChanged = true
         } else if (fieldInfo.isChanged) {
            someStateInChanged = true
         }
      })

      const changedFieldsInString = Object.entries(mapOfFields).reduce(
         (prevString, [, fieldInfo]) => {
            if (fieldInfo.isChanged) {
               return `${prevString}${prevString ? ', ' : ''}${fieldInfo.name}`
            }
            return prevString
         },
         ''
      )

      return () =>
         callback(someStateInChanged, mapOfFields, changedFieldsInString)
   }

   const patchHandler = () => {
      const contactEmailToPatch = emailEntity.current
         ? emailEntity.current
         : undefined

      const phonesEntityToPatch = phonesEntity.current
         ? phonesEntity.current
         : undefined

      const organisationsToPatch = organisationsEntity.current
         ? organisationsEntity.current
         : undefined

      const newDataToPatch: TMediaContactPatchBody = {
         first_name: firstNameInput.value,
         last_name: lastNameInput.value,
         notes: notesInput.value,
         honorific: honorificInput.value,

         contact_email: contactEmailToPatch,
         contact_phone: phonesEntityToPatch,
         organisations: organisationsToPatch,
      }

      mutateQuery.mutate(
         {
            id: currentContactId,
            body: newDataToPatch,
         },
         {
            onSuccess: (newArticle) => {
               mutateQueryClient.setQueryData(
                  mediaContactKeys.detail(newArticle.data.guid),
                  newArticle
               )
            },
         }
      )
   }

   const decoratedCloseHandler = () =>
      changeArticleDecorator(
         (isChanged, changedFields, editChangedFieldsToString) => {
            if (!isChanged) {
               closeRightDrawerWithReset()
            } else {
               const closeRightDrawerWithSave = () => {
                  patchHandler()

                  closeSaveModal()
                  closeRightDrawerWithReset()
               }

               const closeRightDrawerWithOutSave = () => {
                  closeRightDrawerWithReset()
                  closeSaveModal()
               }

               modalsManager.showModal({
                  name: 'Warning',
                  props: {
                     warningText: `Не сохранённые поля : ${editChangedFieldsToString}`,
                     actions: [
                        {
                           text: 'Продолжить с сохранением',
                           size: 'small',
                           onClick: closeRightDrawerWithSave,
                        },
                        {
                           text: 'Продолжить без сохранения',
                           size: 'small',
                           onClick: closeRightDrawerWithOutSave,
                        },
                        {
                           text: 'Отменить',
                           size: 'small',
                           onClick: closeSaveModal,
                        },
                     ],
                  },
               })
            }
         }
      )

   const onCloseDrawerHandler = () => {
      decoratedCloseHandler()()
   }

   const onChangeArticleInDrawer = (
      newEntityForDrawer: TMediaContactRightDrawerEntity
   ) =>
      changeArticleDecorator(
         (isChanged, changedFields, editChangedFieldsToString) => {
            if (!isChanged) {
               rightDrawerStateManager.changeMediaContactPageRightDrawerEntity(
                  newEntityForDrawer
               )

               queryUtils.addQuery('contactId', newEntityForDrawer.currentId)
            } else {
               const changeArticleWithSave = () => {
                  queryUtils.addQuery('contactId', newEntityForDrawer.currentId)

                  patchHandler()

                  rightDrawerStateManager.changeMediaContactPageRightDrawerEntity(
                     newEntityForDrawer
                  )

                  closeSaveModal()
               }

               const changeArticleWithOutSave = () => {
                  queryUtils.addQuery('contactId', newEntityForDrawer.currentId)

                  rightDrawerStateManager.changeMediaContactPageRightDrawerEntity(
                     newEntityForDrawer
                  )

                  closeSaveModal()
               }

               modalsManager.showModal({
                  name: 'Warning',
                  props: {
                     warningText: `Не сохранённые поля : ${editChangedFieldsToString}`,
                     actions: [
                        {
                           text: 'Продолжить с сохранением',
                           size: 'small',
                           onClick: changeArticleWithSave,
                        },
                        {
                           text: 'Продолжить без сохранения',
                           size: 'small',
                           onClick: changeArticleWithOutSave,
                        },
                        {
                           text: 'Отменить',
                           size: 'small',
                           onClick: closeSaveModal,
                        },
                     ],
                  },
               })
            }
         }
      )

   const onPrevArticleClickHandler = () => {
      const index = rightDrawerState.mediaContactPage.currentIndex - 1

      const newEntityForDrawer = {
         ...rightDrawerState.mediaContactPage,
         currentIndex: index,
         prevId: '',
         currentId: rightDrawerState.mediaContactPage.prevId,
         nextId: '',
         needUpdate: true,
      }

      onChangeArticleInDrawer(newEntityForDrawer)()
   }

   const onNextArticleClickHandler = () => {
      const index = rightDrawerState.mediaContactPage.currentIndex + 1

      const newEntityForDrawer = {
         ...rightDrawerState.mediaContactPage,
         currentIndex: index,
         prevId: '',
         currentId: rightDrawerState.mediaContactPage.nextId,
         nextId: '',
         needUpdate: true,
      }

      onChangeArticleInDrawer(newEntityForDrawer)()
   }

   const onApplySnapshotHandler = () => {
      if (idOfSnapshot.current) {
         MediaContactLocationsApi.revertPersonSnapshot({
            idOfPerson: currentContactId,
            idOfSnapshot: idOfSnapshot.current,
         })
            .then(() => {
               notifier.addNotification({
                  id: String(Date.now()),
                  props: {
                     message: 'Данные успешно восстановлены',
                     variant: 'success',
                  },
               })

               mutateQueryClient.invalidateQueries(mediaContactKeys.all)

               closeSaveModal()

               idOfSnapshot.current = null
            })
            .catch(() => {
               notifier.addNotification({
                  id: String(Date.now()),
                  props: {
                     message: 'Ошибка восстановления. Повторите попытку.',
                     variant: 'error',
                  },
               })
            })
      }
   }

   const callApplySnapshotModal = () => {
      modalsManager.showModal({
         name: 'Warning',
         props: {
            warningText: 'Вы действительно хотите восстановить изменения?',
            actions: [
               {
                  text: 'Восстановить',
                  onClick: onApplySnapshotHandler,
                  typeOfAction: 'destructive',
               },
            ],
            withCancel: true,
         },
      })
   }

   return (
      <WDrawer>
         {(isLoading || isRefetching) && <LinearProgress />}
         <Box>
            <MCDrawer.DrawerControl
               onPrevClickHandler={onPrevArticleClickHandler}
               onNextClickHandler={onNextArticleClickHandler}
               onCloseHandler={onCloseDrawerHandler}
               stateOfButtons={{
                  enabled: true,
                  state: {
                     prevButton: isPrevContact,
                     nextButton: isNextContact,
                  },
               }}
            />
            <Container
               sx={{
                  paddingBottom: '40px',
               }}
            >
               <UTabs
                  value={currentTab}
                  onChange={onChangeTabHandler}
                  style={{
                     position: 'sticky',
                     top: '111px',
                     backgroundColor: '#fff',
                     zIndex: 100,
                  }}
               >
                  <UTabs.Tab label="Редактирование" />
                  <UTabs.Tab label="Changelog" />
               </UTabs>

               <WTabPanel index={0} value={currentTab}>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',

                        pt: '20px',

                        position: 'sticky',
                        top: '160px',

                        backgroundColor: 'white.default',
                        zIndex: 100,

                        '.MuiButton-root + .MuiButton-root': {
                           ml: '5px',
                        },
                        '&>.MuiButton-root': {
                           mb: '10px',
                        },
                     }}
                  >
                     <MCDrawer.MainActions
                        onRefetch={onRefetchCurrentContact}
                        onDelete={callDeleteModal}
                        onPatch={() => {
                           patchHandler()
                        }}
                        isLoading={mutateQuery.isLoading}
                     />
                  </Box>

                  <Box
                     sx={{
                        mt: '24px',
                     }}
                  >
                     {contactFlagStates && (
                        <MCDrawer.FlagActionBar
                           flags={contactFlagStates}
                           onActionClick={onFlagStatesClickHandler}
                           disabled={mutateQuery.isLoading}
                        />
                     )}
                  </Box>

                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',

                        mt: '40px',

                        '& .MuiFormControl-root + .MuiFormControl-root': {
                           mt: '20px',
                        },
                     }}
                  >
                     <UTextField
                        variant="outlined"
                        label="Фамилия"
                        fullWidth
                        {...lastNameInput.bind}
                     />
                     <UTextField
                        variant="outlined"
                        label="Имя"
                        fullWidth
                        {...firstNameInput.bind}
                     />
                     <UTextField
                        variant="outlined"
                        label="Обращение"
                        fullWidth
                        {...honorificInput.bind}
                     />
                     <UTextField
                        variant="outlined"
                        label="Записка"
                        fullWidth
                        {...notesInput.bind}
                     />
                  </Box>
                  {currentContact && (
                     <>
                        <Box sx={{ mt: '20px' }}>
                           <Typography variant="h5">Email</Typography>
                           <VMCEmail
                              style={{
                                 marginTop: '20px',
                              }}
                              emailEntity={currentContact?.contact_email}
                              onEmailEntity={bindEmailEntity}
                           />
                        </Box>
                        <Box sx={{ mt: '20px' }}>
                           <Typography variant="h5">Телефон</Typography>
                           <VMCContactPhone
                              style={{
                                 marginTop: '20px',
                              }}
                              onPhoneEntity={bindPhoneEntity}
                              phonesEntity={currentContact.contact_phone}
                           />
                        </Box>

                        <Box sx={{ mt: '20px' }}>
                           <Typography variant="h5">Организации</Typography>
                           <VMCOrganisation
                              style={{
                                 marginTop: '20px',
                              }}
                              onOrganizationEntity={bindOrganisationEntity}
                              organisationsEntity={currentContact.organisations}
                           />
                        </Box>
                     </>
                  )}
               </WTabPanel>
               {!!currentContact?.change_log?.length && (
                  <WTabPanel index={1} value={currentTab}>
                     <Box
                        sx={{
                           mt: '20px',
                        }}
                     >
                        <UButton
                           typeOfAction="destructive"
                           onClick={callApplySnapshotModal}
                        >
                           Восстановить изменения
                        </UButton>
                        <MCDrawer.Changelog
                           changelog={currentContact?.change_log}
                           onApplySnapshot={bindSnapshotEntity}
                        />
                     </Box>
                  </WTabPanel>
               )}
            </Container>
         </Box>
      </WDrawer>
   )
}

export default SMediaContactDrawerView
