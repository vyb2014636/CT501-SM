import ApiError from '~/middlewares/ApiError'
import chatModel from '~/models/chatModel'
import messageModel from '~/models/messageModel'
import { sendMessage, sendNotification } from '~/sockets'

const accessChat = async (chatID, myID, userID = null) => {
  try {
    if (chatID) {
      let chat = await chatModel
        .findOne({
          _id: chatID,
          users: { $in: [myID] } // Chỉ cho phép truy cập nếu người dùng là thành viên của chat
        })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender', // Populate sender trong latestMessage
            select: 'fullname avatar' // Chỉ lấy fullname và avatar
          }
        })
      if (!chat) throw new ApiError(404, 'Cuộc trò chuyện không tồn tại hoặc bạn không có quyền truy cập')

      // Cập nhật trạng thái tin nhắn là đã đọc
      await messageModel.updateMany(
        { chat: chatID, readBy: { $ne: myID } }, // Tìm các tin nhắn chưa được đánh dấu là đã đọc
        { $addToSet: { readBy: myID } } // Thêm myID vào mảng readBy
      )
      // Cập nhật danh sách người đọc cho tin nhắn mới nhất
      if (chat.latestMessage) {
        // Kiểm tra xem myID đã có trong mảng readBy chưa
        if (!chat.latestMessage.readBy.includes(myID)) {
          chat.latestMessage.readBy.push(myID)
          await chat.latestMessage.save() // Lưu thay đổi vào latestMessage
        }
      }
      return chat // Trả về nhóm chat hoặc đoạn chat 1-1
    }

    // Nếu không có `chatID` nhưng có `userID`, tìm hoặc tạo mới cuộc trò chuyện 1-1
    if (userID) {
      let chat = await chatModel
        .findOne({
          isGroupChat: false,
          users: { $all: [myID, userID] } // Tìm kiếm cuộc trò chuyện 1-1 giữa hai người
        })
        .populate('users', 'fullname avatar')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender', // Populate sender trong latestMessage
            select: 'fullname avatar' // Chỉ lấy fullname và avatar
          }
        })

      // Nếu không có, tạo cuộc trò chuyện mới
      if (!chat) {
        chat = await chatModel.create({
          chatName: null,
          isGroupChat: false,
          users: [myID, userID]
        })

        // Sau khi tạo, populate để lấy thông tin đầy đủ
        chat = await chat.populate('users', 'fullname avatar').populate({
          path: 'latestMessage',
          populate: {
            path: 'sender', // Populate sender trong latestMessage
            select: 'fullname avatar' // Chỉ lấy fullname và avatar
          }
        })
      }

      // Cập nhật danh sách người đọc cho tin nhắn mới nhất
      if (chat.latestMessage) {
        chat.latestMessage.readBy.push(myID)
        await chat.latestMessage.save() // Lưu thay đổi vào latestMessage
      }
      return chat // Trả về cuộc trò chuyện 1-1
    }
  } catch (error) {
    throw error
  }
}

const createGroupChat = async (myID, users, chatName, avatarGroup) => {
  if (!users || users.length < 1) throw new ApiError(400, 'Nhóm phải có ít nhất 2 người')

  users.push(myID)

  const groupChat = await chatModel.create({
    chatName,
    isGroupChat: true, // Đây là cuộc trò chuyện nhóm
    users: users,
    groupAdmin: myID,
    avatar: avatarGroup
  })

  const fullGroupChat = await chatModel.findById(groupChat._id).populate('users', '-password').populate('groupAdmin', '-password')
  fullGroupChat.users.forEach((user) => {
    if (user._id.toString() !== myID) {
      sendNotification(user._id, 'created_group', { groupChat: fullGroupChat })
    }
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
        path: 'sender', // Populate sender trong latestMessage
        select: 'fullname avatar' // Chỉ lấy fullname và avatar
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
