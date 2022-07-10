import React, { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

import { Box, Container, FormControlLabel, Typography } from '@mui/material'

import UButton from '@ui/UButton'
import UTextField from '@ui/UTextField'
import UCheckBox from '@ui/UCheckBox'

import WDrawer from '@widgets/WDrawer'

import { useQueryManager } from '@hooks/useQueryManager'


import { mediaContactKeys } from '@/rquery/keys'

const SMediaContactDrawerCreate = () => {
   const { queryUtils } = useQueryManager()

   const drawerManager = useDrawersManager()

   const queryClient = useQueryClient()

   const notifier = useNotificationsManager()

   const currentContactId = queryUtils.getQuery('contactId') || ''

   const firstNameInput = useInput('')
   const lastNameInput = useInput('')
   const notesInput = useInput('')
   const honorificInput = useInput('')

   const [publicCheckbox, setPublicCheckbox] = useState<boolean>(true)
   const [activeCheckbox, setActiveCheckbox] = useState<boolean>(true)

   const onPublicCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setPublicCheckbox(event.target.checked)
   }

   const onActiveCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setActiveCheckbox(event.target.checked)
   }

   useEffect(() => {
      if (currentContactId === 'new') {
         drawerManager.setRightDrawer(true)
      }
   }, [currentContactId])

   const onCloseDrawerHandler = () => {
      queryUtils.removeQuery('contactId')
      drawerManager.setRightDrawer(false)
   }

   const emailEntity = useRef<string[] | null>(null)
   const phonesEntity = useRef<TMediaContactPhoneEntity[] | null>(null)
   const organisationsEntity = useRef<TMediaContactOrganisationEntity[] | null>(
      null
   )

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

   const onPatchHandler = () => {
      const contactEmailToPatch = emailEntity.current ? emailEntity.current : []

      const phonesEntityToPatch = phonesEntity.current
         ? phonesEntity.current
         : []

      const organisationsToPatch = organisationsEntity.current
         ? organisationsEntity.current
         : []

      const newDataToPatch: TMediaContactPostRequest = {
         first_name: firstNameInput.value || '',
         last_name: lastNameInput.value || '',
         contact_email: contactEmailToPatch,
         contact_phone: phonesEntityToPatch,
         organisations: organisationsToPatch,
         public: publicCheckbox,
         is_active: activeCheckbox,
         notes: notesInput.value || '',
         honorific: honorificInput.value || '',
      }

      MediaContactLocationsApi.createPerson(newDataToPatch)
         .then(() => {
            notifier.addNotification({
               id: String(Date.now()),
               props: {
                  message: 'Новый контакт успешно создан',
                  variant: 'success',
               },
            })

            queryClient.invalidateQueries(mediaContactKeys.all)
            queryUtils.removeQuery('contactId')
         })
         .catch(() => {
            notifier.addNotification({
               id: String(Date.now()),
               props: {
                  message: 'Ошибка создания. Повторите попытку.',
                  variant: 'error',
               },
            })
         })
   }

   return (
      <WDrawer>
         <Box>
            <MCDrawer.DrawerControl
               onCloseHandler={onCloseDrawerHandler}
               stateOfButtons={{
                  enabled: false,
               }}
            />

            <Container
               sx={{
                  paddingBottom: '40px',
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'flex-end',

                     pt: '20px',

                     position: 'sticky',
                     top: '100px',

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
                  <UButton onClick={onPatchHandler} typeOfAction="save">
                     Создать контакт
                  </UButton>
               </Box>

               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',

                     mt: '20px',
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                     }}
                  >
                     <Typography variant="h5">Данные контакта</Typography>

                     <Box>
                        <FormControlLabel
                           control={
                              <UCheckBox
                                 checked={activeCheckbox}
                                 onChange={onActiveCheckboxChange}
                              />
                           }
                           label="Активный"
                        />
                        <FormControlLabel
                           control={
                              <UCheckBox
                                 checked={publicCheckbox}
                                 onChange={onPublicCheckboxChange}
                              />
                           }
                           label="Общедоступный"
                        />
                     </Box>
                  </Box>
                  <Box
                     sx={{
                        mt: '20px',
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
                        multiline
                        rows={2}
                        {...notesInput.bind}
                     />
                  </Box>
               </Box>
               <>
                  <Box sx={{ mt: '20px' }}>
                     <Typography variant="h5">Email</Typography>
                     <VMCEmail
                        style={{
                           marginTop: '20px',
                        }}
                        emailEntity={[]}
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
                        phonesEntity={[]}
                     />
                  </Box>

                  <Box sx={{ mt: '20px' }}>
                     <Typography variant="h5">Организации</Typography>
                     <VMCOrganisation
                        style={{
                           marginTop: '20px',
                        }}
                        onOrganizationEntity={bindOrganisationEntity}
                        organisationsEntity={[]}
                     />
                  </Box>
               </>
            </Container>
         </Box>
      </WDrawer>
   )
}

export default SMediaContactDrawerCreate
