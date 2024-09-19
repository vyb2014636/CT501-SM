import ApiError from '~/middlewares/ApiError'
import FriendRequest from '~/models/friendRequest'
import User from '~/models/user'

const getListUserNoFriend = async (myId) => {
  const user = await User.findById(myId).populate('friends').select('-password')
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng')
  const sentRequests = await FriendRequest.find({ from: myId, status: 'pending' }).select('to')
  const userSending = await FriendRequest.find({ to: myId, status: 'pending' }).select('from')
  console.log(userSending)
  const excludedUserIds = [
    ...user.friends.map((friend) => friend._id), // Bạn bè hiện tại
    ...sentRequests.map((request) => request.to), // Người đã gửi yêu cầu
    ...userSending.map((request) => request.from) //Người đó đang gửi yêu cầu cho minh
  ]
  // Tìm những người dùng chưa kết bạn và chưa có yêu cầu kết bạn
  const suggestions = await User.find({
    _id: { $ne: myId, $nin: excludedUserIds } // Loại bỏ bản thân và những người không phù hợp
  }).select('avatar lastname firstname background')
  return suggestions
}

const acceptFriendRequest = async (userId, requestId) => {
  // Tìm và cập nhật yêu cầu kết bạn
  const request = await FriendRequest.findById(requestId)
  console.log(requestId)
  console.log(request)
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
  const response = await FriendRequest.findByIdAndDelete(requestId)
  return response
}

export const userService = {
  getListUserNoFriend,
  acceptFriendRequest
}
