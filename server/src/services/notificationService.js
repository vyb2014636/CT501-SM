import ApiError from '~/middlewares/ApiError'
import Notification from '~/models/notification'

const getListNotification = async (myId, page, limit) => {
  const notifications = await Notification.find({ receiver: myId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('sender', 'firstname lastname fullname avatar')
    .populate('postId', 'describe')

  return notifications
}

const interactNotification = async (notificationId) => {
  const notification = await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true })
    .populate('sender', 'firstname lastname fullname avatar')
    .populate('postId', 'describe')

  if (!notification) throw new ApiError(404, 'Không tìm thấy thông báo này')

  return notification
}
export const notificationService = {
  getListNotification,
  interactNotification
}
