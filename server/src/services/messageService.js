import ApiError from '~/middlewares/ApiError'
import Chat from '~/models/chat'
import Message from '~/models/message'

const sendMessage = async (chatId, senderId, content) => {
  if (!chatId || !senderId || !content) throw new ApiError(400, 'Nội dung và chatId không được để trống')

  const newMessage = await Message.create({
    sender: senderId,
    content,
    chat: chatId
  })
  await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage })

  const fullMessage = await Message.findById(newMessage._id).populate('sender', 'fullname avatar').populate('chat')

  return fullMessage
}

export const getMessages = async (chatId) => {
  const messages = await Message.find({ chat: chatId }).populate('sender', 'fullname avatar').populate('chat')
  if (!messages) throw new ApiError(404, 'Không tìm thấy đoạn chat')
  return messages
}

export const messagesService = {
  sendMessage,
  getMessages
}
