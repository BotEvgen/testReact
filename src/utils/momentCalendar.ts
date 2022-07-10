import moment from 'moment-ru'

export const momentCalendar = (date: moment.MomentInput) =>
   moment(date).locale('ru').calendar(undefined, {
      sameDay: '[Сегодня в] HH:mm',
      nextDay: 'D MMM YYYY, HH:mm',
      nextWeek: 'D MMM YYYY, HH:mm',
      lastDay: '[Вчера в] HH:mm',
      lastWeek: 'D MMM YYYY, HH:mm',
      sameElse: 'D MMM YYYY, HH:mm',
   })
