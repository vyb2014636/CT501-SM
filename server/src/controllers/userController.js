import ApiError from '~/middlewares/ApiError'
import FriendRequest from '~/models/friendRequest'
import User from '~/models/user'
import { userService } from '~/services/userService'

const getRequest = async (req, res, next) => {
  try {
    const from = req.user.id
    const { to } = req.body
    const response = await FriendRequest.findOne({ from, to })
    if (!response) throw new ApiError(404, 'Không tìm thấy lời mời nào')
    res.status(200).json({
      message: 'Bạn đã gửi lời mời rồi',
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
    // Kiểm tra xem yêu cầu đã tồn tại chưa
    const existingRequest = await FriendRequest.findOne({ from, to })

    if (existingRequest) throw new ApiError(400, 'Yêu cầu kết bạn đang được xử lý')

    // Tạo yêu cầu kết bạn mới
    const request = await FriendRequest.create({ from, to })

    return res.status(200).json({
      mes: 'Yêu cầu kết bạn đã được gửi thành công.',
      request
    })
  } catch (error) {
    next(error)
  }
}

const acceptFriendRequest = async (req, res, next) => {
  const { requestId } = req.body // ID của yêu cầu kết bạn
  const userId = req.user.id // ID của người dùng hiện tại

  try {
    // Tìm và cập nhật yêu cầu kết bạn
    const request = await FriendRequest.findById(requestId)

    if (!request) throw new ApiError(404, 'Yêu cầu kết bạn không tồn tại.')

    if (request.to.toString() !== userId.toString()) throw new ApiError(403, 'Bạn không có quyền chấp nhận yêu cầu này.')

    request.status = 'accepted'
    await request.save()

    // Cập nhật danh sách bạn bè của cả hai người dùng
    const [userFrom, userTo] = await Promise.all([User.findById(request.from), User.findById(request.to)])

    if (!userFrom || !userTo) throw new ApiError(404, 'Một hoặc cả hai người dùng không tồn tại.')

    // Thêm người nhận vào danh sách bạn bè của người gửi
    userFrom.friends.push(request.to)
    await userFrom.save()

    // Thêm người gửi vào danh sách bạn bè của người nhận
    userTo.friends.push(request.from)
    await userTo.save()

    // Xóa yêu cầu kết bạn sau khi chấp nhận
    const response = await FriendRequest.findByIdAndDelete(requestId)

    return res.status(200).json({
      success: response ? true : false,
      message: response ? 'Yêu cầu kết bạn đã được chấp nhận.' : 'Yêu cầu kết bạn thất bại'
    })
  } catch (error) {
    next(error)
  }
}

const getListUserNoFriend = async (req, res, next) => {
  try {
    const { id } = req.user
    const usersNoFriend = await userService.getListUserNoFriend(id)
    res.status(200).json({
      message: 'Danh sách những người bạn có thể biết',
      listUser: usersNoFriend
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  sendFriendRequest,
  acceptFriendRequest,
  getListUserNoFriend,
  getRequest
}
