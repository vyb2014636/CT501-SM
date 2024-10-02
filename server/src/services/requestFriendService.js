import ApiError from '~/middlewares/ApiError'
import FriendRequest from '~/models/friendRequest'
import Notification from '~/models/notification'
import User from '~/models/user'

const notifyFriendsAboutRequest = async (userId, toId, type) => {
  const notification = new Notification({
    sender: userId,
    receiver: toId,
    type: type
  })

  await notification.save()
}

const getRequests = async (to) => {
  const requests = await FriendRequest.find({ to, status: 'pending' }).populate('from', 'firstname lastname avatar').lean()
  if (!requests) throw new ApiError(404, 'Không tìm thấy lời mời nào')

  return requests
}
const sendFriendRequest = async (from, to) => {
  const existingRequest = await FriendRequest.findOne({ from, to, status: 'pending' }).lean()

  if (existingRequest) throw new ApiError(400, 'Yêu cầu kết bạn đang được xử lý')

  const request = await FriendRequest.create({ from, to })

  return request
}
const cancelFriendRequest = async (from, to) => {
  const request = await FriendRequest.findOneAndDelete({ from, to, status: 'pending' }).lean()

  if (!request) return res.status(404).json({ message: 'Không tìm thấy yêu cầu kết bạn này' })

  return request
}

const acceptFriendRequest = async (myId, requestId) => {
  const request = await FriendRequest.findById(requestId).lean()

  if (!request) throw new ApiError(404, 'Yêu cầu kết bạn không tồn tại.')

  if (request.to.toString() !== myId.toString()) throw new ApiError(403, 'Bạn không có quyền chấp nhận yêu cầu này.')

  const [userFrom, userTo] = await Promise.all([User.findById(request.from), User.findById(request.to)])

  if (!userFrom || !userTo) throw new ApiError(404, 'Một hoặc cả hai người dùng không tồn tại.')

  userFrom.friends.push(request.to)
  userTo.friends.push(request.from)

  await Promise.all([userFrom.save(), userTo.save()])

  const response = await FriendRequest.findByIdAndDelete(requestId)

  await notifyFriendsAboutRequest(myId, request.from, 'friendRequestAccepted')

  return response
}

const rejectFriendRequest = async (myId, requestId) => {
  const request = await FriendRequest.findOneAndDelete({ _id: requestId, to: myId, status: 'pending' }).lean()

  if (!request) throw new ApiError(404, 'Lời mời không tồn tại')

  await notifyFriendsAboutRequest(myId, request.from, 'friendRequestReject')

  return request
}

const checkFriendshipStatus = async (targetUserId, myId) => {
  if (!targetUserId) throw new ApiError(404, 'Không tìm thấy người dùng')

  const [myUser, checkUser] = await Promise.all([User.findById(myId).select('friends'), User.findById(targetUserId).select('friends')])

  if (!checkUser) throw new ApiError(404, 'Không tìm thấy người dùng được kiểm tra')

  const isFriend = myUser.friends.includes(targetUserId)
  const hasRequestToMe = await FriendRequest.findOne({ from: targetUserId, to: myId }).lean()
  const hasRequestFromMe = await FriendRequest.findOne({ from: myId, to: targetUserId }).lean()

  let status = 'noRelationship'
  let requestId = null

  if (isFriend) {
    status = 'friends'
  } else if (hasRequestToMe) {
    status = 'waitMe'
    requestId = hasRequestToMe._id
  } else if (hasRequestFromMe) {
    status = 'waitAccept'
    requestId = hasRequestFromMe._id
  }

  return { status, requestId }
}

export const requestFriendService = {
  getRequests,
  sendFriendRequest,
  cancelFriendRequest,
  checkFriendshipStatus,
  rejectFriendRequest,
  acceptFriendRequest
}
