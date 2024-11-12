import User from '~/models/userModel'
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
    res.status(200).json({ message: response ? 'Thay đổi thành công' : 'Thay đổi thông tin thất bại', user: response })
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
  const { query, isEnter } = req.query
  const { id } = req.user
  try {
    const { users, posts, hasMoreUsers, user } = await userService.searchUser(query, isEnter, id)

    res.status(200).json({ message: 'danh sách', users, posts, hasMoreUsers, user })
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

const getUsers = async (req, res, next) => {
  try {
    const { searchQuery, sortBy, sortOrder } = req.query
    const users = await userService.getUsers(searchQuery, sortBy, sortOrder)
    res.status(200).json({ message: 'danh sách tất cả người dùng bạn tìm', users })
  } catch (error) {
    next(error)
  }
}

const toggleUserStatus = async (req, res, next) => {
  try {
    const { userID, status } = req.body

    const updatedUser = await userService.toggleUserStatus(userID, status)

    res.status(200).json({
      updatedUser,
      message: 'Cập nhật thành công'
    })
  } catch (error) {
    next(error)
  }
}

const getHistoryByUser = async (req, res, next) => {
  try {
    const { userId } = req.query
    const { historyLogs, activities } = await userService.getLogHistoryByUser(userId)

    res.status(200).json({
      logs: historyLogs,
      activities,
      message: 'Lịch sử hoạt động của người dùng'
    })
  } catch (error) {
    next(error)
  }
}

const deleteHistorySearch = async (req, res, next) => {
  try {
    const { query } = req.query
    const { id } = req.user
    const deleteSearch = await userService.deleteHistorySearch(id, query)

    res.status(200).json({
      deleteSearch,
      message: 'Đã xóa tìm kiếm này'
    })
  } catch (error) {
    next(error)
  }
}

const getFavorites = async (req, res, next) => {
  try {
    const { id } = req.user
    const { limit, page } = req.query
    const { favorites, totalFavorites, hasMoreFavorites } = await userService.getFavorites(id, page, limit)

    res.status(200).json({
      favorites,
      totalFavorites,
      hasMoreFavorites,
      message: 'Danh sách yêu thích'
    })
  } catch (error) {
    next(error)
  }
}

const addFavorite = async (req, res, next) => {
  try {
    const { id } = req.user
    const { postId } = req.params
    const { user, post } = await userService.addFavorite(id, postId)

    res.status(200).json({
      user,
      post,
      message: 'Thêm thành công'
    })
  } catch (error) {
    next(error)
  }
}
const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.user
    const { postId } = req.params
    const { user, post } = await userService.removeFavorite(id, postId)
    res.status(200).json({
      user,
      post,
      message: 'Bỏ yêu thích thành công'
    })
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
  getAllSearch,
  getUsers,
  toggleUserStatus,
  getHistoryByUser,
  deleteHistorySearch,
  getFavorites,
  removeFavorite,
  addFavorite
}
