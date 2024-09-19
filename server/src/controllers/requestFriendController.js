import FriendRequest from '~/models/friendRequest'
import { requestFriendService } from '~/services/requestFriendService'

const getRequests = async (req, res, next) => {
  try {
    const { id } = req.user
    const response = await requestFriendService.getRequests(id)
    res.status(200).json({
      message: 'Lấy danh sách request thành công',
      listRequest: response
    })
  } catch (error) {
    next(error)
  }
}

const sendFriendRequest = async (req, res, next) => {
  const { to } = req.body // ID của người nhận yêu cầu kết bạn
  const from = req.user.id // ID của người gửi yêu cầu kết bạn

  try {
    const request = await requestFriendService.sendFriendRequest(from, to)

    res.status(200).json({
      message: 'Yêu cầu kết bạn đã được gửi thành công.',
      request
    })
  } catch (error) {
    next(error)
  }
}

const cancelFriendRequest = async (req, res, next) => {
  try {
    const { to } = req.body
    const from = req.user.id

    // Tạo yêu cầu kết bạn mới
    const request = await requestFriendService.cancelFriendRequest(from, to)

    return res.status(200).json({
      message: 'Yêu cầu hủy kết bạn thành công.'
    })
  } catch (error) {
    next(error)
  }
}

export const requestFriendControler = {
  getRequests,
  sendFriendRequest,
  cancelFriendRequest
}
