import { useState } from 'react'
import { fetchListNotificationAPI, readNotificationAPI } from '@/apis/notification/notificationAPI'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [error, setError] = useState(null)

  const fetchNotifications = async () => {
    try {
      const response = await fetchListNotificationAPI()
      setNotifications(response.notifications)
    } catch (error) {
      setError(error)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      await readNotificationAPI(notificationId)
      setNotifications((prev) =>
        prev.map((notification) => (notification._id === notificationId ? { ...notification, status: 'read' } : notification))
      )
    } catch (error) {
      setError(error)
    }
  }

  const unreadCount = notifications.filter((notification) => notification.status === 'unread').length

  return { notifications, error, fetchNotifications, markAsRead, unreadCount }
}
