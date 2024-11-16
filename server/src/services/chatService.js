import ApiError from '~/middlewares/ApiError'
import chatModel from '~/models/chatModel'
import messageModel from '~/models/messageModel'
import userModel from '~/models/userModel'
import { sendMessage, sendNotification } from '~/sockets/'

const accessChat = async (chatID, myID, userID = null) => {
  try {
    let chat

    if (chatID) {
      chat = await chatModel.findOneAndPopulateChat({ _id: chatID, users: { $in: [myID] } })

      if (!chat) throw new ApiError(404, 'Cuộc trò chuyện không tồn tại hoặc bạn không có quyền truy cập')

      // await messageModel.updateMany({ chat: chatID, readBy: { $ne: myID } }, { $addToSet: { readBy: myID } })
    } else if (!chatID && userID) {
      chat = await chatModel.findOneAndPopulateChat({ isGroupChat: false, users: { $all: [myID, userID] } })

      if (!chat) {
        chat = await chatModel.create({ chatName: null, isGroupChat: false, users: [myID, userID] })
        chat = await chatModel.findOneAndPopulateChat({ _id: chat._id })
      }
    }

    if (!chat) {
      throw new ApiError(400, 'Vui lòng cung cấp chatID hoặc userID')
    }

    if (chat.latestMessage && !chat.latestMessage.readBy.includes(myID)) {
      chat.latestMessage.readBy.push(myID)
      await chat.latestMessage.save()
    }

    return chat
  } catch (error) {
    throw error
  }
}

const createGroupChat = async (myID, users, chatName, avatarGroup) => {
  if (!users || users.length < 1) throw new ApiError(400, 'Nhóm phải có ít nhất 2 người')

  users.push(myID)

  const limitGroup = await chatModel.findOne({ groupAdmin: myID }).countDocuments()

  if (limitGroup >= 10) throw new ApiError(400, 'Bạn chỉ được tạo tối đa 10 nhóm')

  const groupChat = await chatModel.create({ chatName, isGroupChat: true, users: users, groupAdmin: myID, avatar: avatarGroup })

  const fullGroupChat = await chatModel.findById(groupChat._id).populate('users', '-password').populate('groupAdmin', 'fullname avatar')

  fullGroupChat.users.forEach((user) => {
    if (user._id.toString() !== myID) sendNotification(user._id, 'created_group', { groupChat: fullGroupChat })
  })

  return fullGroupChat
}

const getChats = async (myID) => {
  const chats = await chatModel
    .find({
      users: { $elemMatch: { $eq: myID } }
    })
    .populate('users', '-password')
    .populate({
      path: 'latestMessage',
      populate: {
        path: 'sender',
        select: 'fullname avatar'
      }
    })
    .populate('groupAdmin', '-password')
    .sort({ updatedAt: -1 })

  return chats
}
const removeMemberFromGroup = async (chatID, userID, myId) => {
  const chat = await chatModel.findOneAndPopulateChat({ _id: chatID, groupAdmin: myId })

  if (!chat) throw new ApiError(403, 'Bạn không có quyền xóa thành viên này')

  const member = chat.users.find((user) => user._id.toString() === userID.toString())
  if (!member) throw new ApiError(404, 'Thành viên không có trong nhóm')

  chat.users = chat.users.filter((user) => user._id.toString() !== userID.toString())
  await chat.save()

  sendMessage(userID, 'isRemoveGroup', { chat: chat })
  const notificationMessage = new messageModel({
    sender: myId,
    content: `Thành viên ${member.fullname} đã bị xóa khỏi nhóm`,
    chat: chatID,
    type: 'notify'
  })
  await chatModel.findByIdAndUpdate(chatID, { latestMessage: notificationMessage })

  await notificationMessage.save()

  chat.latestMessage = notificationMessage._id
  await chat.save()
  await notificationMessage.populate('sender', 'fullname avatar')

  chat.users.forEach((user) => sendMessage(user._id.toString(), 'receive_message', { newMessage: notificationMessage, chatID: chatID }))

  return chat
}

const addMemberToGroup = async (chatID, userIDs, myId) => {
  // Tìm chat và kiểm tra quyền admin
  const chat = await chatModel.findOneAndPopulateChat({ _id: chatID, groupAdmin: myId })

  if (!chat) throw new ApiError(403, 'Bạn không có quyền thêm thành viên vào nhóm')

  // Lọc những user chưa có trong nhóm
  const existingUserIDs = chat.users.map((user) => user._id.toString())
  const newUserIDs = userIDs.filter((userID) => !existingUserIDs.includes(userID.toString()))

  if (newUserIDs.length === 0) throw new ApiError(400, 'Tất cả thành viên đã có trong nhóm')

  chat.users.push(...newUserIDs)
  await chat.save()

  const newUsers = await userModel.find({ _id: { $in: newUserIDs } })

  const newUserNames = newUsers.map((user) => user.fullname).join(', ')
  const notificationMessage = new messageModel({
    sender: myId,
    content: `Thành viên ${newUserNames} đã gia nhập nhóm`,
    chat: chatID,
    type: 'notify'
  })
  await chatModel.findByIdAndUpdate(chatID, { latestMessage: notificationMessage })
  await notificationMessage.save()

  await chatModel.findByIdAndUpdate(chatID, { latestMessage: notificationMessage })
  await chat.save()
  await notificationMessage.populate('sender', 'fullname avatar')

  // Gửi thông báo đến các thành viên trong nhóm
  chat.users.forEach((user) => {
    sendMessage(user._id.toString(), 'receive_message', { newMessage: notificationMessage, chatID: chatID })
  })

  userIDs.forEach((user) => {
    sendMessage(user.toString(), 'add_group', { chat: chat })
  })

  return chat
}

const dissolveGroup = async (chatID, myId) => {
  const chat = await chatModel.findOneAndPopulateChat({ _id: chatID, groupAdmin: myId })

  if (!chat) throw new ApiError(403, 'Bạn không có quyền giải tán nhóm này')
  await chat.save()
  chat.users.forEach((user) => {
    sendMessage(user._id, 'dissolveGroup', {})
  })

  await messageModel.deleteMany({ chat: chatID })

  await chatModel.deleteOne({ _id: chatID })

  return chatID
}

const leaveGroup = async (chatID, myId) => {
  const chat = await chatModel.findOneAndPopulateChat({ _id: chatID })

  if (!chat) throw new ApiError(404, 'Không tìm thấy nhóm này')
  const existingUser = chat.users.find((user) => user._id.toString() === myId.toString())

  if (!existingUser) throw new ApiError(400, 'Bạn không phải là thành viên của nhóm')

  const member = chat.users.find((user) => user._id.toString() === myId.toString())

  chat.users = chat.users.filter((user) => user._id.toString() !== myId.toString())
  await chat.save()

  const notificationMessage = new messageModel({
    sender: myId,
    content: `Thành viên ${member.fullname} đã rời nhóm`,
    chat: chatID,
    type: 'notify'
  })
  await chatModel.findByIdAndUpdate(chatID, { latestMessage: notificationMessage })

  await notificationMessage.save()
  await notificationMessage.populate('sender', 'fullname avatar')

  chat.users.forEach((user) => {
    sendMessage(user._id.toString(), 'receive_message', { newMessage: notificationMessage, chatID: chatID })
  })

  return chat
}

const updateGroupAdmin = async (chatID, newAdminID, currentAdminID) => {
  try {
    const chat = await chatModel.findOne({ _id: chatID, groupAdmin: currentAdminID })

    if (!chat) throw new ApiError(403, 'Bạn không có quyền chuyển quyền trưởng nhóm')

    chat.groupAdmin = newAdminID
    await chat.save()
    await chat.populate('groupAdmin', '-password -refreshToken -twoFactorSecret')

    const notificationMessage = new messageModel({
      sender: currentAdminID,
      content: `Trưởng nhóm đã được chuyển quyền cho ${chat.groupAdmin.fullname}`,
      chat: chatID,
      type: 'notify'
    })
    await chatModel.findByIdAndUpdate(chatID, { latestMessage: notificationMessage })

    await notificationMessage.save()
    await notificationMessage.populate('sender', 'fullname avatar')

    chat.users.forEach((user) => sendNotification(user.toString(), 'receive_message', { newMessage: notificationMessage, chatID: chatID }))

    return chat
  } catch (error) {
    throw error
  }
}

export const chatService = {
  accessChat,
  createGroupChat,
  getChats,
  removeMemberFromGroup,
  addMemberToGroup,
  dissolveGroup,
  leaveGroup,
  updateGroupAdmin
}
