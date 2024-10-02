import { notificationService } from '~/services/notificationService'

const getListNotification = async (req, res, next) => {
  try {
    const myId = req.user.id
    const { page = 1, limit = 10 } = req.query

    const response = await notificationService.getListNotification(myId, page, limit)
    res.status(200).json({
      message: 'Danh sách thông báo mới nhất',
      notifications: response
    })
  } catch (error) {
    next(error)
  }
}
const interactNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.body
    const notification = await notificationService.interactNotification(notificationId)

    res.status(200).json({
      message: 'Đã xem',
      notification: notification
    })
  } catch (error) {
    next(error)
  }
}

export const notificationController = {
  getListNotification,
  interactNotification
}
