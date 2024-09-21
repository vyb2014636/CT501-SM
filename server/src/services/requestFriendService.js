import ApiError from '~/middlewares/ApiError'
import FriendRequest from '~/models/friendRequest'
import User from '~/models/user'

const getRequests = async (to) => {
  const requests = await FriendRequest.find({ to, status: 'pending' }).populate('from', 'firstname lastname avatar') // Lấy thông tin người gửi
  if (!requests) throw new ApiError(404, 'Không tìm thấy lời mời nào')

  return requests
}
const sendFriendRequest = async (from, to) => {
  const existingRequest = await FriendRequest.findOne({ from, to, status: 'pending' })

  if (existingRequest) throw new ApiError(400, 'Yêu cầu kết bạn đang được xử lý')

  const request = await FriendRequest.create({ from, to })
  return request
}
const cancelFriendRequest = async (from, to) => {
  const request = await FriendRequest.findOneAndDelete({ from, to, status: 'pending' })

  if (!request) return res.status(404).json({ message: 'Không tìm thấy yêu cầu kết bạn này' })

  return request
}

const acceptFriendRequest = async (myId, requestId) => {
  const request = await FriendRequest.findById(requestId)
  if (!request) throw new ApiError(404, 'Yêu cầu kết bạn không tồn tại.')

  if (request.to.toString() !== myId.toString()) throw new ApiError(403, 'Bạn không có quyền chấp nhận yêu cầu này.')

  request.status = 'accepted'
  await request.save()

  const [userFrom, userTo] = await Promise.all([User.findById(request.from), User.findById(request.to)])

  if (!userFrom || !userTo) throw new ApiError(404, 'Một hoặc cả hai người dùng không tồn tại.')

  userFrom.friends.push(request.to)
  await userFrom.save()

  userTo.friends.push(request.from)
  await userTo.save()
  const response = await FriendRequest.findByIdAndDelete(requestId)
  return response
}

const rejectFriendRequest = async (myId, requestId) => {
  if (!requestId) throw new ApiError(404, 'Lời mời không tồn tại')

  const response = await FriendRequest.findOneAndDelete({ _id: requestId, to: myId, status: 'pending' })

  if (!response) return res.status(404).json({ message: 'Không tìm từ chối được' })

  return response
}

const checkFriendshipStatus = async (targetUserId, myId) => {
  if (!targetUserId) throw new ApiError(404, 'Không tìm thấy người dùng')
  let status = ''
  let request = null
  if (targetUserId === myId) {
    status = 'isMe'
    return { status, request }
  }

  const [myUser, checkUser] = await Promise.all([User.findById(myId).select('friends'), User.findById(targetUserId).select('friends')])

  if (!checkUser) throw new ApiError(404, 'Không tìm thấy người dùng được kiểm tra')

  const isFriend = myUser.friends.includes(targetUserId)
  const hasRequestToMe = await FriendRequest.findOne({ from: targetUserId, to: myId })
  const hasRequestFromMe = await FriendRequest.findOne({ from: myId, to: targetUserId })
  if (isFriend) {
    status = 'friends'
  } else if (hasRequestToMe) {
    status = 'waitMe'
    request = hasRequestToMe._id
  } else if (hasRequestFromMe) {
    status = 'waitAccept'
    request = hasRequestFromMe
  } else {
    status = 'noRelationship'
  }
  return { status, request }
}

const getRequestsToMe = async (myId) => {
  const requests = await FriendRequest.find({ to: myId }).populate('from')
  return
}
const getRequestMySent = async (myId) => {
  const requests = await FriendRequest.find({ from: myId }).populate('to')
  return
}

export const requestFriendService = {
  getRequests,
  sendFriendRequest,
  cancelFriendRequest,
  checkFriendshipStatus,
  rejectFriendRequest,
  acceptFriendRequest,
  getRequestsToMe,
  getRequestMySent
}
