import ApiError from '~/middlewares/ApiError'
import FriendRequest from '~/models/friendRequest'
import Notification from '~/models/notification'
import User from '~/models/user'

const notifyFriendsAboutRequest = async (userId, toId, type) => {
  const notification = new Notification({
    sender: toId,
    receiver: userId,
    type: type
  })

  await notification.save()
}

const getRequests = async (to) => {
  const requests = await FriendRequest.find({ to, status: 'pending' }).populate('from to', 'firstname fullname avatar background').lean()
  const sends = await FriendRequest.find({ from: to, status: 'pending' }).populate('from to', 'firstname fullname avatar background').lean()

  if (!requests) throw new ApiError(404, 'Không tìm thấy lời mời nào')

  return { sends, requests }
}

const sendFriendRequest = async (from, to) => {
  const existingFriendship = await FriendRequest.findOne({
    $or: [
      { from, to },
      { from: to, to: from }
    ]
  })

  if (existingFriendship) {
    if (existingFriendship.from.toString() === to && ['declined', 'cancelled', 'unfriended'].includes(existingFriendship.status)) {
      existingFriendship.from = from
      existingFriendship.to = to
    }
    existingFriendship.status = 'pending'
    await existingFriendship.save()
    return await existingFriendship.populateFromToFrienship()
  }

  const newFriendship = new FriendRequest({ from, to })
  await newFriendship.save()
  return await newFriendship.populateFromToFrienship()
}

const cancelFriendRequest = async (from, to) => {
  let friendship = await FriendRequest.findOne({ from, to })
  if (friendship && friendship.status === 'pending') {
    friendship.status = 'cancelled'
    await friendship.save()
    return await friendship.populateFromToFrienship()
  } else {
    throw new ApiError(400, 'Không có yêu cầu nào như vậy')
  }
}

const acceptFriendRequest = async (from, to) => {
  let request = await FriendRequest.findOne({ from, to, status: 'pending' })

  if (!request) throw new ApiError(404, 'Yêu cầu kết bạn không tồn tại.')
  request.status = 'accepted'
  await request.save()

  const [userFrom, userTo] = await Promise.all([User.findById(request.from), User.findById(request.to)])

  if (!userFrom || !userTo) throw new ApiError(404, 'Một hoặc cả hai người dùng không tồn tại.')

  userFrom.friends.push(request.to)
  userTo.friends.push(request.from)

  await Promise.all([userFrom.save(), userTo.save()])

  await notifyFriendsAboutRequest(from, to, 'friendRequestAccepted')

  return await request.populateFromToFrienship()
}

const rejectFriendRequest = async (from, to) => {
  let request = await FriendRequest.findOne({ from, to })

  if (request && request.status === 'pending') {
    request.status = 'declined'
    await request.save()
    await notifyFriendsAboutRequest(to, from, 'friendRequestReject')
    return request
  } else {
    throw new ApiError(400, 'Không có yêu cầu nào như vậy')
  }
}

const unFriend = async (from, to) => {
  const existingFriendship = await FriendRequest.findOne({
    $or: [
      { from: from, to: to },
      { from: to, to: from }
    ]
  })

  if (existingFriendship) {
    if (existingFriendship.from.toString() === to && existingFriendship.status === 'accepted') {
      existingFriendship.from = from
      existingFriendship.to = to
    }
    existingFriendship.status = 'unfriended'
    await User.findByIdAndUpdate(from, { $pull: { friends: to } })
    await User.findByIdAndUpdate(to, { $pull: { friends: from } })
    await existingFriendship.save()

    return await existingFriendship.populateFromToFrienship()
  } else {
    throw new ApiError(404, 'Không tìm thấy yêu cầu')
  }
}

const checkFriendshipStatus = async (targetUserId, myId) => {
  const friendship = await FriendRequest.findOne({
    $or: [
      { from: myId, to: targetUserId },
      { from: targetUserId, to: myId }
    ]
  })

  if (!friendship) {
    return { status: null } // Không có mối quan hệ
  }

  // Nếu người dùng hiện tại là người gửi yêu cầu
  if (friendship.from.toString() === myId) {
    if (friendship.status === 'pending') {
      return { status: 'pending' } // Đang gửi yêu cầu
    } else if (friendship.status === 'accepted') {
      return { status: 'accepted' } // Đã là bạn bè
    }
  }

  // Nếu người dùng hiện tại là người nhận yêu cầu
  if (friendship.to.toString() === myId) {
    if (friendship.status === 'pending') {
      return { status: 'incoming' } // Có yêu cầu đến
    } else if (friendship.status === 'accepted') {
      return { status: 'accepted' } // Đã là bạn bè
    }
  }

  return { status: friendship.status }
}

export const requestFriendService = {
  getRequests,
  sendFriendRequest,
  cancelFriendRequest,
  checkFriendshipStatus,
  rejectFriendRequest,
  acceptFriendRequest,
  unFriend
}
