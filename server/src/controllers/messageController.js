import { messagesService } from '~/services/messageService'

const sendMessage = async (req, res) => {
  const { chatID, content } = req.body
  const image = req.file ? req.file.path : null

  try {
    const { newMessage, chatId } = await messagesService.sendMessage(chatID, req.user.id, content, image)
    res.status(200).json({ message: 'Tin nhắn đã được gửi', newMessage, chatId })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getMessages = async (req, res, next) => {
  const { chatId } = req.params
  try {
    const messages = await messagesService.getMessages(chatId)

    res.status(200).json({ message: 'Danh sách tin nhắn của đoạn chat', messages, chatId })
  } catch (error) {
    next(error)
  }
}

export const messageController = {
  sendMessage,
  getMessages
}
