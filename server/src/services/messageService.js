import ApiError from '~/middlewares/ApiError'
import chatModel from '~/models/chatModel'
import messageModel from '~/models/messageModel'
import { sendNotification } from '~/sockets/'

const sendMessage = async (chatId, senderId, content) => {
  if (!chatId || !senderId || !content) throw new ApiError(400, 'Nội dung và chatId không được để trống')

  const newMessage = await messageModel.create({
    sender: senderId,
    content,
    chat: chatId,
    type: 'text'
  })

  const chat = await chatModel.findByIdAndUpdate(chatId, { latestMessage: newMessage })

  const fullMessage = await messageModel.findById(newMessage._id).populate('sender', 'fullname avatar')
  chat.users.forEach((user) => {
    if (user.toString() !== senderId) {
      sendNotification(user.toString(), 'receive_message', { newMessage: fullMessage, chatID: chatId })
    }
  })

  return { newMessage: fullMessage, chatId: chat._id }
}

export const getMessages = async (chatId) => {
  const messages = await messageModel.find({ chat: chatId }).populate('sender', 'fullname avatar').populate('chat')
  if (!messages) throw new ApiError(404, 'Không tìm thấy đoạn chat')
  return messages
}

export const messagesService = {
  sendMessage,
  getMessages
}
