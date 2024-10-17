import ApiError from '~/middlewares/ApiError'
import { chatService } from '~/services/chatService'

const accessChat = async (req, res, next) => {
  const myID = req.user.id
  const { users, chatName, isGroupChat, userID } = req.body
  // if (!users || !Array.isArray(users) || users.length === 0) throw new ApiError(400, 'Đoạn chat này rỗng')

  try {
    const chat = await chatService.accessChat(myID, { users, chatName, isGroupChat }, userID)
    res.status(200).json({
      message: 'Đoạn chat bạn truy cập',
      chat
    })
  } catch (error) {
    next(error)
  }
}

const createGroupChat = async (req, res, next) => {
  const { users, chatName } = req.body
  try {
    const groupChat = await chatService.createGroupChat(req.user.id, users, chatName)
    res.status(200).json({
      message: 'Đã tạo nhóm chat',
      groupChat
    })
  } catch (error) {
    next(error)
  }
}
const getChats = async (req, res, next) => {
  try {
    const chats = await chatService.getChats(req.user.id)
    res.status(200).json({
      message: 'Danh sách các đoạn chat của bạn',
      chats
    })
  } catch (error) {
    next(error)
  }
}

export const chatController = { accessChat, createGroupChat, getChats }
