import ApiError from '~/middlewares/ApiError'
import { chatService } from '~/services/chatService'

const accessChat = async (req, res, next) => {
  const myID = req.user.id
  const { userID, chatID } = req.body
  // if (!users || !Array.isArray(users) || users.length === 0) throw new ApiError(400, 'Đoạn chat này rỗng')

  try {
    const chat = await chatService.accessChat(chatID, myID, userID)
    res.status(200).json({
      message: 'Đoạn chat bạn truy cập',
      chat
    })
  } catch (error) {
    next(error)
  }
}

const createGroupChat = async (req, res, next) => {
  const { chatName } = req.body
  const users = JSON.parse(req.body.users)
  const avatarGroup = req.file ? req.file.path : null
  try {
    const groupChat = await chatService.createGroupChat(req.user.id, users, chatName, avatarGroup)
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
const removeMemberFromGroup = async (req, res, next) => {
  const { chatId, userId } = req.body
  const myId = req.user.id
  try {
    const chat = await chatService.removeMemberFromGroup(chatId, userId, myId)
    res.status(200).json({
      message: 'Danh sách các đoạn chat của bạn',
      chat
    })
  } catch (error) {
    next(error)
  }
}
const addMemberToGroup = async (req, res, next) => {
  const { chatId, userIds } = req.body // Nhận danh sách userIds từ body
  const myId = req.user.id

  try {
    const chat = await chatService.addMemberToGroup(chatId, userIds, myId) // Gọi hàm service mới
    res.status(200).json({
      message: 'Thêm thành viên vào nhóm thành công',
      chat
    })
  } catch (error) {
    next(error)
  }
}

const dissolveGroup = async (req, res, next) => {
  const { chatId } = req.query
  const myId = req.user.id
  try {
    const chatID = await chatService.dissolveGroup(chatId, myId)
    res.status(200).json({
      message: 'Danh sách các đoạn chat của bạn',
      chat: { _id: chatID }
    })
  } catch (error) {
    next(error)
  }
}
const leaveGroup = async (req, res, next) => {
  const { chatId } = req.body
  const myId = req.user.id
  try {
    const chat = await chatService.leaveGroup(chatId, myId)
    res.status(200).json({
      message: 'Danh sách các đoạn chat của bạn',
      chat
    })
  } catch (error) {
    next(error)
  }
}
const updateGroupAdmin = async (req, res, next) => {
  try {
    const { chatID, newAdminID, currentAdminID } = req.body
    const chat = await chatService.updateGroupAdmin(chatID, newAdminID, currentAdminID)
    res.status(200).json({
      chat
    })
  } catch (error) {
    throw error
  }
}

export const chatController = {
  accessChat,
  createGroupChat,
  getChats,
  leaveGroup,
  dissolveGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  updateGroupAdmin,
  updateGroupAdmin
}
