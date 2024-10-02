import axiosIntercept from '@/apis/axiosIntercept'

export const fetchListNotificationAPI = async () => {
  const response = await axiosIntercept.get('notification/')
  return response
}
export const readNotificationAPI = async (notificationId) => {
  const response = await axiosIntercept.put('notification/', { notificationId: notificationId })
  return response
}
