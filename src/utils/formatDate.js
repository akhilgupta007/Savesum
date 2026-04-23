import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate        = (date) => dayjs(date).format('DD MMM YYYY')
export const formatDateTime    = (date) => dayjs(date).format('DD MMM YYYY, hh:mm A')
export const formatRelativeTime = (date) => dayjs(date).fromNow()
