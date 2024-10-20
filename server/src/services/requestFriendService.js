import ApiError from '~/middlewares/ApiError'
import requestModel from '~/models/requestModel'
import notificationModel from '~/models/notificationModel'
import userModel from '~/models/userModel'
import { sendNotification } from '~/sockets'

const notifyFriendsAboutRequest = async (userId, toId, type) => {
  try {
    const notification = new notificationModel({
      sender: toId,
      receiver: userId,
      type: type
    })
    await notification.save()
    await notification.populate('sender', 'firstname lastname fullname avatar')
    return notification
  } catch (error) {
    throw error
  }
}

const getRequests = async (to) => {
  try {
    const requests = await requestModel.find({ to, status: 'pending' }).populate('from to', 'firstname fullname avatar background').lean()
    const sends = await requestModel.find({ from: to, status: 'pending' }).populate('from to', 'firstname fullname avatar background').lean()

    if (!requests) throw new ApiError(404, 'Không tìm thấy lời mời nào')

    return { sends, requests }
  } catch (error) {
    throw error
  }
}

const sendFriendRequest = async (from, to) => {
  try {
    const existingFriendship = await requestModel.findOne({
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

      await existingFriendship.populateFromToFrienship()

      sendNotification(to, 'sendAddFriend', { request: existingFriendship })

      return existingFriendship
    }

    const newFriendship = new requestModel({ from, to })

    await newFriendship.save()
    await newFriendship.populateFromToFrienship()

    sendNotification(to, 'sendAddFriend', { request: newFriendship })

    return newFriendship
  } catch (error) {
    throw error
  }
}

const cancelFriendRequest = async (from, to) => {
  try {
    let friendship = await requestModel.findOne({ from, to })
    if (friendship && friendship.status === 'pending') {
      friendship.status = 'cancelled'
      await friendship.save()
      return await friendship.populateFromToFrienship()
    } else {
      throw new ApiError(400, 'Không có yêu cầu nào như vậy')
    }
  } catch (error) {
    throw error
  }
}

const acceptFriendRequest = async (from, to) => {
  try {
    let request = await requestModel.findOne({ from, to, status: 'pending' })

    if (!request) throw new ApiError(404, 'Yêu cầu kết bạn không tồn tại.')
    request.status = 'accepted'
    await request.save()

    const [userFrom, userTo] = await Promise.all([userModel.findById(request.from), userModel.findById(request.to)])

    if (!userFrom || !userTo) throw new ApiError(404, 'Một hoặc cả hai người dùng không tồn tại.')

    userFrom.friends.push(request.to)
    userTo.friends.push(request.from)

    await Promise.all([userFrom.save(), userTo.save()])

    await request.populateFromToFrienship()

    const notification = await notifyFriendsAboutRequest(from, to, 'friendRequestAccepted')

    sendNotification(from, 'friendRequestAccepted', { userName: request.to.fullname, friend: request.to, notification: notification })

    return request
  } catch (error) {
    throw error
  }
}

const rejectFriendRequest = async (from, to) => {
  try {
    let request = await requestModel.findOne({ from, to })

    await request.populateFromToFrienship()

    if (request && request.status === 'pending') {
      request.status = 'declined'
      await request.save()

      const notification = await notifyFriendsAboutRequest(from, to, 'friendRequestReject')

      sendNotification(from, 'friendRequestReject', { userName: request.to.fullname, notification: notification, requestID: request._id })

      return request
    } else {
      throw new ApiError(404, 'Không có yêu cầu nào như vậy')
    }
  } catch (error) {
    throw error
  }
}

const unFriend = async (from, to) => {
  try {
    const existingFriendship = await requestModel.findOne({
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
      await userModel.findByIdAndUpdate(from, { $pull: { friends: to } })
      await userModel.findByIdAndUpdate(to, { $pull: { friends: from } })
      await existingFriendship.save()
      await existingFriendship.populateFromToFrienship()

      sendNotification(to, 'unFriend', { unFriend: existingFriendship.from })

      return existingFriendship
    } else {
      throw new ApiError(404, 'Không tìm thấy yêu cầu')
    }
  } catch (error) {
    throw error
  }
}

const checkFriendshipStatus = async (targetUserId, myId) => {
  try {
    const friendship = await requestModel.findOne({
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
  } catch (error) {
    throw error
  }
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
