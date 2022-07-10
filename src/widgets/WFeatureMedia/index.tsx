import React, { FC, useEffect, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import { Input, Skeleton } from '@mui/material'

import WAction from '@widgets/WAction'

import { useModalsManager } from '@services/Modals/Modals.manager'

import useInput from '@hooks/useInput'

export type TWFeatureMediaProps = {
   src: string
   description: string
   copyright: string
}

export type TWFeatureMediaInstance = {
   src: {
      value: string
      setValue: React.Dispatch<React.SetStateAction<string>>
   }
   description: {
      value: string
      setValue: React.Dispatch<React.SetStateAction<string>>
   }
   copyright: {
      value: string
      setValue: React.Dispatch<React.SetStateAction<string>>
   }
}

export type TWFeatureMediaOnChange = {
   type: 'close' | 'edit'
   featureMediaInstance: TWFeatureMediaInstance
   editMode: boolean
}

type TWFeatureMedia = Partial<React.ComponentProps<typeof Box>> & {
   onChangeHandler?: ({
      type,
      featureMediaInstance,
   }: TWFeatureMediaOnChange) => void
   onFeatureMedia?: (featureMediaInstance: TWFeatureMediaInstance) => void
   featureMediaProps: TWFeatureMediaProps
   deps?: unknown[]
}

const WFeatureMedia: FC<TWFeatureMedia> = ({
   onChangeHandler,
   featureMediaProps,
   onFeatureMedia,
   deps = [],
   ...rest
}) => {
   const { src, description, copyright } = featureMediaProps

   const [editMode, setEditMode] = useState<boolean>(false)

   const [imageIsLoaded, setImageIsLoaded] = useState(false)

   const modalsManager = useModalsManager()

   const srcInput = useInput<string>(src)
   const descriptionInput = useInput<string>(description)
   const copyrightInput = useInput<string>(copyright)

   const featureMediaInstance = useMemo(
      () => ({
         src: {
            value: srcInput.value,
            setValue: srcInput.setValue,
         },
         description: {
            value: descriptionInput.value,
            setValue: descriptionInput.setValue,
         },
         copyright: {
            value: copyrightInput.value,
            setValue: copyrightInput.setValue,
         },
      }),
      [srcInput, descriptionInput, copyrightInput, ...deps]
   )

   useEffect(() => {
      if (onFeatureMedia) {
         onFeatureMedia(featureMediaInstance)
      }
   }, [srcInput, descriptionInput, copyrightInput, ...deps])

   const closeAttentionModal = () => {
      modalsManager.hideModal({ name: 'Warning' })
   }

   const onCloseHandler = () => {
      const featureMediaData: TWFeatureMediaOnChange = {
         type: 'close',
         featureMediaInstance,
         editMode,
      }
      if (onChangeHandler) {
         onChangeHandler(featureMediaData)
      }

      closeAttentionModal()
   }

   const onEditHandler = () => {
      setEditMode((prev) => !prev)

      const featureMediaData: TWFeatureMediaOnChange = {
         type: 'edit',
         featureMediaInstance,
         editMode,
      }
      if (onChangeHandler) {
         onChangeHandler(featureMediaData)
      }
   }

   const onLoadImage = () => {
      setImageIsLoaded(true)
   }

   const callAttentionCloseModal = () => {
      modalsManager.showModal({
         name: 'Warning',
         props: {
            warningText:
               'Вы уверены, что хотите безвозвратно удалить фотографию?',
            actions: [
               {
                  typeOfAction: 'destructive',
                  text: 'Удалить',
                  onClick: onCloseHandler,
               },
            ],
            withCancel: true,
         },
      })
   }

   return (
      <Box
         sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
         }}
         {...rest}
      >
         {srcInput.value ? (
            <Box
               sx={{
                  position: 'relative',
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                  }}
               >
                  <WAction
                     disable={!imageIsLoaded}
                     onCloseHandler={callAttentionCloseModal}
                     onEditHandler={onEditHandler}
                  >
                     <img
                        src={srcInput.value}
                        style={{
                           maxWidth: '100%',
                           height: '100%',
                           maxHeight: '500px',
                           objectFit: 'cover',
                        }}
                        onLoad={onLoadImage}
                        alt={descriptionInput.value}
                     />
                     {!imageIsLoaded && (
                        <Skeleton
                           variant="rectangular"
                           height={500}
                           sx={{
                              flexGrow: '2',
                           }}
                        />
                     )}
                  </WAction>
               </Box>
            </Box>
         ) : (
            <Skeleton variant="rectangular" height={400} />
         )}
         {srcInput.value && imageIsLoaded && (
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: '20px',
                  '& .MuiInput-root +.MuiInput-root': {
                     mt: '20px',
                  },
               }}
            >
               <Input
                  {...descriptionInput.bind}
                  placeholder="Описание"
                  disabled={!editMode}
                  multiline={editMode || !onChangeHandler}
               />
               <Input
                  {...copyrightInput.bind}
                  placeholder="Авторские права"
                  disabled={!editMode}
                  multiline={editMode || !onChangeHandler}
               />
            </Box>
         )}
      </Box>
   )
}

export default WFeatureMedia
