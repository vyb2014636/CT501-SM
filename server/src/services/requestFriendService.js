import ApiError from '~/middlewares/ApiError'
import FriendRequest from '~/models/friendRequest'

const getRequests = async (to) => {
  const requests = await FriendRequest.find({ to, status: 'pending' }).populate('from', 'firstname lastname avatar') // Lấy thông tin người gửi
  if (!requests) throw new ApiError(404, 'Không tìm thấy lời mời nào')

  return requests
}
const sendFriendRequest = async (from, to) => {
  // Kiểm tra xem yêu cầu đã tồn tại chưa
  const existingRequest = await FriendRequest.findOne({ from, to, status: 'pending' })

  if (existingRequest) throw new ApiError(400, 'Yêu cầu kết bạn đang được xử lý')

  // Tạo yêu cầu kết bạn mới
  const request = await FriendRequest.create({ from, to })
  return request
}
const cancelFriendRequest = async (from, to) => {
  // Kiểm tra xem yêu cầu đã tồn tại chưa
  const request = await FriendRequest.findOneAndDelete({ from, to, status: 'pending' })

  if (!request) return res.status(404).json({ message: 'Không tìm thấy yêu cầu kết bạn này' })

  return request
}

export const requestFriendService = {
  getRequests,
  sendFriendRequest,
  cancelFriendRequest
}
