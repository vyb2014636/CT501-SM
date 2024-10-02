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

const uploadInfo = async (req, res, next) => {
  try {
    const myId = req.user.id
    const response = await userService.uploadInfo(myId, req.body)
    res.status(200).json({ message: response ? 'Thay đổi thành công' : 'Thay đổi ảnh thất bại', user: response })
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

const uploadBackground = async (req, res, next) => {
  try {
    const myId = req.user.id
    const background = req.file.path
    const response = await userService.uploadBackground(myId, background)
    res.status(200).json({ message: response ? 'Thay đổi thành công' : 'Thay đổi ảnh thất bại', user: response })
  } catch (error) {}
}

const searchUser = async (req, res, next) => {
  const { query } = req.query
  try {
    const { users, posts, hasMoreUsers } = await userService.searchUser(query)

    res.status(200).json({ message: 'danh sách', users, posts, hasMoreUsers })
  } catch (error) {
    next(error)
  }
}
const getAllSearch = async (req, res, next) => {
  const { query } = req.query
  try {
    const users = await userService.getAllSearch(query)

    res.status(200).json({ message: 'danh sách tất cả người dùng bạn tìm', users })
  } catch (error) {
    next(error)
  }
}
export const userController = {
  getSuggestions,
  unFriend,
  uploadAvatar,
  uploadBackground,
  uploadInfo,
  searchUser,
  getAllSearch
}
