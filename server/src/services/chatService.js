import ApiError from '~/middlewares/ApiError'
import chatModel from '~/models/chatModel'
import messageModel from '~/models/messageModel'
import { sendMessage, sendNotification } from '~/sockets/'

const accessChat = async (chatID, myID, userID = null) => {
  try {
    let chat

    if (chatID) {
      chat = await chatModel.findAndPopulateChat({ _id: chatID, users: { $in: [myID] } })

      if (!chat) throw new ApiError(404, 'Cuộc trò chuyện không tồn tại hoặc bạn không có quyền truy cập')

      // await messageModel.updateMany({ chat: chatID, readBy: { $ne: myID } }, { $addToSet: { readBy: myID } })
    } else if (!chatID && userID) {
      chat = await chatModel.findAndPopulateChat({ isGroupChat: false, users: { $all: [myID, userID] } })

      if (!chat) {
        chat = await chatModel.create({ chatName: null, isGroupChat: false, users: [myID, userID] })
        chat = await chatModel.findAndPopulateChat({ _id: chat._id })
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

export const chatService = {
  accessChat,
  createGroupChat,
  getChats
}
