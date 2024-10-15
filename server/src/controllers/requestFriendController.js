import ApiError from '~/middlewares/ApiError'
import { requestFriendService } from '~/services/requestFriendService'

const getRequests = async (req, res, next) => {
  try {
    const { id } = req.user
    const { sends, requests } = await requestFriendService.getRequests(id)
    res.status(200).json({
      message: 'Lấy danh sách request thành công',
      sends,
      requests
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
    if (!request) throw new ApiError(400, 'Xử lý thất bại!')
    res.status(200).json({
      message: 'Yêu cầu đã được gửi',
      request
    })
  } catch (error) {
    next(error)
  }
}
//Hủy lời mời khi người dùng hiện tại không muốn kết bạn
const cancelFriendRequest = async (req, res, next) => {
  try {
    const { to } = req.body
    const from = req.user.id

    const request = await requestFriendService.cancelFriendRequest(from, to)

    return res.status(200).json({
      message: 'Hủy kết bạn thành công.',
      request
    })
  } catch (error) {
    next(error)
  }
}

const rejectFriendRequest = async (req, res, next) => {
  try {
    const { from } = req.body
    const to = req.user.id

    // Tạo yêu cầu kết bạn mới
    const request = await requestFriendService.rejectFriendRequest(from, to)

    return res.status(200).json({
      request,
      message: 'Đã từ chối kết bạn .'
    })
  } catch (error) {
    next(error)
  }
}

const getRequestsToMe = async (req, res, next) => {
  try {
    const myId = req.user.id
    const requestToMe = await requestFriendService.getRequestsToMe(myId)

    return res.status(200).json({
      success: requests ? true : false,
      message: requests ? 'Danh sách yêu cầu kết bạn' : 'Không có yêu cầu',
      requestToMe
    })
  } catch (error) {
    next(error)
  }
}

const getRequestMySent = async (req, res, next) => {
  try {
    const myId = req.user.id
    const requestFromMe = await requestFriendService.getRequestMySent(myId)

    return res.status(200).json({
      success: requests ? true : false,
      message: requests ? 'Danh sách yêu cầu kết bạn' : 'Không có yêu cầu',
      requestFromMe
    })
  } catch (error) {
    next(error)
  }
}

const checkFriendshipStatus = async (req, res, next) => {
  try {
    const { checkUserId } = req.params
    const myId = req.user.id
    const { status } = await requestFriendService.checkFriendshipStatus(checkUserId, myId)
    res.status(200).json({ status })
  } catch (error) {
    next(error)
  }
}

const acceptFriendRequest = async (req, res, next) => {
  const { from } = req.body // ID của yêu cầu kết bạn
  const userId = req.user.id // ID của người dùng hiện tại
  try {
    const request = await requestFriendService.acceptFriendRequest(from, userId)
    return res.status(200).json({
      message: 'Giờ 2 bạn đã là bạn của nhau.',
      request
    })
  } catch (error) {
    next(error)
  }
}

const unFriend = async (req, res, next) => {
  const { to } = req.body
  const from = req.user.id

  try {
    const request = await requestFriendService.unFriend(from, to)
    return res.status(200).json({
      request,
      message: 'Đã hủy kết bạn'
    })
  } catch (error) {
    next(error)
  }
}

export const requestFriendControler = {
  getRequests,
  sendFriendRequest,
  cancelFriendRequest,
  checkFriendshipStatus,
  rejectFriendRequest,
  acceptFriendRequest,
  getRequestsToMe,
  getRequestMySent,
  unFriend
}
