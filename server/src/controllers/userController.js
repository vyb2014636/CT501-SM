import User from '~/models/user'
import { userService } from '~/services/userService'

const unFriend = async (req, res, next) => {
  const { targetId } = req.body
  const userId = req.user.id

  try {
    await User.findByIdAndUpdate(userId, { $pull: { friends: targetId } })
    await User.findByIdAndUpdate(targetId, { $pull: { friends: userId } })
    return res.status(200).json({
      success: true,
      message: 'Đã hủy kết bạn'
    })
  } catch (error) {
    next(error)
  }
}
const getSuggestions = async (req, res, next) => {
  try {
    const { id } = req.user
    const usersNoFriend = await userService.getListUserNoFriend(id)
    res.status(200).json({
      message: 'Danh sách những người bạn có thể biết',
      listUser: usersNoFriend
    })
  } catch (error) {
    next(error)
  }
}

const uploadAvatar = async (req, res, next) => {
  try {
    const myId = req.user.id
    const avatar = req.file.path
    const response = await userService.uploadAvatar(myId, avatar)
    res.status(200).json({ message: response ? 'Thay đổi thành công' : 'Thay đổi ảnh thất bại', user: response })
  } catch (error) {}
}

export const userController = {
  getSuggestions,
  unFriend,
  uploadAvatar
}
