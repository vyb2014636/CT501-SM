import ApiError from '~/middlewares/ApiError'

const getWarnings = async (req, res, next) => {
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

export const warningController = { getWarnings }
