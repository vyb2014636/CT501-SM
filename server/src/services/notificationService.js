import ApiError from '~/middlewares/ApiError'
import Notification from '~/models/notificationModel'

const getListNotification = async (myId, page, limit) => {
  const notifications = await Notification.find({ receiver: myId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('sender', 'firstname lastname fullname avatar isAdmin')
    .populate('postId', 'describe')
  const total = await Notification.find({ receiver: myId }).countDocuments()
  const totalUnread = await Notification.find({ receiver: myId, status: 'unread' }).countDocuments()

  const hasMoreNotifications = limit * page < total
  return { hasMoreNotifications, notifications, totalUnread }
}

const interactNotification = async (notificationId) => {
  const notification = await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true })
    .populate('sender', 'firstname lastname fullname avatar isAdmin')
    .populate('postId', 'describe')

  if (!notification) throw new ApiError(404, 'Không tìm thấy thông báo này')

  return notification
}
export const notificationService = {
  getListNotification,
  interactNotification
}
