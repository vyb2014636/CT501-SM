import { messagesService } from '~/services/messageService'

const sendMessage = async (req, res) => {
  const { chatID, content } = req.body
  try {
    const newMessage = await messagesService.sendMessage(chatID, req.user.id, content)
    res.status(200).json({ message: 'Tin nhắn đã được gửi', newMessage })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getMessages = async (req, res, next) => {
  const { chatId } = req.params
  try {
    const messages = await messagesService.getMessages(chatId)

    res.status(200).json({ message: 'Danh sách tin nhắn của đoạn chat', messages })
  } catch (error) {
    next(error)
  }
}

export const messageController = {
  sendMessage,
  getMessages
}
