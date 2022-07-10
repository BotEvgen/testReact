import { useEffect } from 'react'
import { useSnackbar } from 'notistack'

import { useNotifications } from '@services/Notification/notification.entity'
import { useNotificationsManager } from '@services/Notification/notification.manager'

import { useAppDispatch } from '@/store'

let displayed: Array<string | number> = []

const useNotifier = () => {
   const dispatch = useAppDispatch()
   const { enqueueSnackbar, closeSnackbar } = useSnackbar()

   const { list } = useNotifications()
   const actions = useNotificationsManager()

   const storeDisplayed = (id: string | number) => {
      displayed = [...displayed, id]
   }

   const removeDisplayed = (id: string | number) => {
      displayed = [...displayed.filter((key) => id !== key)]
   }

   useEffect(() => {
      list.forEach(({ id, props }) => {
         if (props.dismissed) {
            closeSnackbar(id)
            return
         }

         if (displayed.includes(id)) return

         enqueueSnackbar(props.message, {
            ...props,
            key: id,
            onClose: (event, reason, myKey) => {
               if (props.onClose) {
                  props.onClose(event, reason, myKey)
               }
            },
            onExited: (event, myKey) => {
               actions.removeNotification(myKey)
               removeDisplayed(myKey)
            },
         })

         storeDisplayed(id)
      })
   }, [list, closeSnackbar, enqueueSnackbar, dispatch])

   return {
      ...actions,
   }
}

export default useNotifier
