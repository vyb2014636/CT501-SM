import { userService } from '~/services/userService'

const unFriend = async (req, res, next) => {
  const { targetId } = req.body // ID của người mà muốn hủy kết bạn
  const userId = req.user.id // ID của người dùng hiện tại

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

export const userController = {
  getSuggestions,
  unFriend
}
