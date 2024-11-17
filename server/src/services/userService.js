import ApiError from '~/middlewares/ApiError'
import requestModel from '~/models/requestModel'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import Log from '~/models/logModel'
import mongoose from 'mongoose'

// Một hàm tiện ích để populate friends
const populateUserFriends = async (user) => {
  return await user.populate('friends', 'avatar fullname lastname firstname background isAdmin')
}
const updateHistorySearch = async (myId, query) => {
  try {
    const updatedUser = await userModel
      .findOneAndUpdate(
        { _id: myId },
        [
          {
            $set: {
              historySearch: {
                $cond: {
                  if: {
                    $in: [query, '$historySearch.content'] // Kiểm tra xem query đã tồn tại chưa
                  },
                  then: {
                    // Nếu có, đưa nó lên đầu mảng
                    $concatArrays: [
                      [{ content: query }], // Đưa query vào đầu mảng
                      {
                        $filter: {
                          input: '$historySearch',
                          as: 'item',
                          cond: { $ne: ['$$item.content', query] } // Loại bỏ phần tử đã tồn tại
                        }
                      }
                    ]
                  },
                  else: {
                    // Nếu chưa có, thêm mới vào đầu mảng
                    $concatArrays: [[{ content: query }], '$historySearch']
                  }
                }
              }
            }
          }
        ],
        { new: true, upsert: true } // Cập nhật và trả về user mới
      )
      .select('-password -refreshToken')
    return await updatedUser.populate('friends', '-password -refreshToken')
  } catch (err) {
    throw err
  }
}

const getListUserNoFriend = async (myId) => {
  const user = await userModel.findById(myId).populate('friends', 'avatar fullname lastname firstname background isAdmin')
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng')

  const sentRequests = await requestModel.find({ from: myId, status: 'pending' }).select('to')
  const userSending = await requestModel.find({ to: myId, status: 'pending' }).select('from')

  const excludedUserIds = [
    ...user.friends.map((friend) => friend._id),
    ...sentRequests.map((request) => request.to),
    ...userSending.map((request) => request.from)
  ]

  const suggestions = await userModel
    .find({
      _id: { $ne: myId, $nin: excludedUserIds },
      isAdmin: false
    })
    .select('avatar lastname firstname fullname isAdmin background')

  return suggestions
}

const uploadAvatar = async (myId, avatar) => {
  if (!avatar) throw new ApiError(401, 'Bạn chưa chọn ảnh')
  const updatedUser = await userModel.findByIdAndUpdate(myId, { avatar: avatar }, { new: true })
  return populateUserFriends(updatedUser)
}

const uploadBackground = async (myId, background) => {
  if (!background) throw new ApiError(401, 'Bạn chưa chọn ảnh')
  const updatedUser = await userModel.findByIdAndUpdate(myId, { background }, { new: true })
  return populateUserFriends(updatedUser)
}
const uploadInfo = async (myId, reqBody) => {
  if (!reqBody || Object.keys(reqBody).length === 0) {
    throw new ApiError(400, 'Dữ liệu gửi lên không được rỗng')
  }

  const user = await userModel.findById(myId)
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng')

  if (reqBody.firstname || reqBody.lastname) {
    const currentDate = new Date()
    const lastChangeDate = user.lastInfoChange ? new Date(user.lastInfoChange) : null

    if (lastChangeDate) {
      const timeDiff = currentDate - lastChangeDate
      const daysDiff = timeDiff / (1000 * 3600 * 24)

      if (daysDiff < 60) {
        throw new ApiError(400, 'Bạn không thể thay đổi tên trong vòng 60 ngày')
      }
    }

    reqBody.lastInfoChange = currentDate
  }

  const updatedUser = await userModel.findByIdAndUpdate(myId, reqBody, { new: true })
  if (!updatedUser) throw new ApiError(404, 'Không tìm thấy người dùng')

  await updatedUser.save()

  return populateUserFriends(updatedUser)
}

const searchUser = async (query, isEnter, myId) => {
  const searchTerms = query.toLowerCase().trim().split(' ')
  const regex = searchTerms.map((term) => `(${term})`).join('.*')

  const userQueryCondition = {
    isAdmin: { $ne: true },
    $or: [{ fullname: { $regex: regex, $options: 'i' } }, { normalizedFullName: { $regex: regex, $options: 'i' } }]
  }

  const totalUsers = await userModel.countDocuments(userQueryCondition)

  const users = await userModel.find(userQueryCondition).limit(3)

  const posts = await postModel
    .find({
      describe: { $regex: query, $options: 'i' },
      status: 'normal'
    })
    .limit(3)

  const hasMoreUsers = totalUsers > 3

  let user
  if (isEnter === 'saveHistory') user = await updateHistorySearch(myId, query)

  return { users, posts, hasMoreUsers, user: user || undefined }
}

const getAllSearch = async (query) => {
  const searchTerms = query.toLowerCase().trim().split(' ')

  const regex = searchTerms.map((term) => `(${term})`).join('.*')

  const users = await userModel.find({
    $or: [
      {
        fullname: { $regex: regex, $options: 'i' }
      },
      {
        normalizedFullName: { $regex: regex, $options: 'i' }
      }
    ]
  })

  return users
}

const getUsers = async (searchQuery = '', sortBy = '', sortOrder = '') => {
  try {
    const searchCondition = searchQuery
      ? {
          fullname: { $regex: searchQuery, $options: 'i' }
        }
      : {}

    let sortCondition = {}
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1
    }

    const users = await userModel
      .find({ isAdmin: false, ...searchCondition })
      .select('fullname address avatar isAdmin isVerify status background createdAt province')
      .sort(sortCondition)
      .lean()

    return users
  } catch (error) {
    throw error
  }
}

const toggleUserStatus = async (userId, status) => {
  try {
    if (status === 'Active' || status === 'Banned') {
      const updatedUser = await userModel
        .findByIdAndUpdate(userId, { status: status }, { new: true })
        .select('fullname address avatar isAdmin isVerify status background')

      if (!updatedUser) throw new ApiError(404, 'Không tìm thấy người dùng')

      if ((updatedUser.status = 'Banned')) {
        updatedUser.blockDate = new Date()
      } else {
        updatedUser.blockDate = null
      }
      updatedUser.save()
      return updatedUser
    } else throw new ApiError(400, 'Bạn chọn trạng thái không hợp lệ')
  } catch (error) {
    throw error
  }
}

const deleteHistorySearch = async (myId, query) => {
  try {
    const updatedUser = await userModel
      .findByIdAndUpdate(myId, { $pull: { historySearch: { content: query } } }, { new: true })
      .select('-password -refreshToken')

    if (!updatedUser) throw new ApiError(404, 'Không tìm thấy user')

    return updatedUser
  } catch (error) {
    throw error
  }
}

const getLogHistoryByUser = async (userId) => {
  try {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const activities = await Log.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          activities: { $push: '$$ROOT' }
        }
      },
      { $sort: { _id: -1 } } // Ngày giảm dần
      // { $skip: skip },
      // { $limit: limit }
    ])

    const historyLogs = await Log.find({ user: userId }).sort({ createdAt: -1 }).lean()

    for (let group of activities) {
      group.activities = await Log.populate(group.activities, [
        { path: 'user', select: '-password -refreshToken' },
        {
          path: 'post',
          populate: [
            { path: 'byPost', select: 'firstname lastname fullname email background avatar province' }, // Thông tin người tạo bài viết
            { path: 'sharesBy', select: 'firstname lastname fullname email background avatar province' }, // Người chia sẻ bài viết
            {
              path: 'sharedPost', // Bài viết được chia sẻ
              populate: {
                path: 'byPost',
                select: 'firstname lastname fullname email background avatar province' // Thông tin người tạo bài viết được chia sẻ
              }
            }
          ]
        }
      ])
    }

    return { historyLogs, activities }
  } catch (error) {
    throw error
  }
}
const addFavorite = async (userId, postId) => {
  try {
    const post = await postModel.findById(postId)
    if (!post) throw new ApiError(404, 'Bài đăng không tồn tại')

    const user = await userModel.findById(userId).select('-password -refreshToken')

    if (!user) throw new ApiError(404, 'Người dùng không tồn tại')

    if (user.favorites.includes(postId)) throw new ApiError(400, 'Bài đăng đã có trong danh sách yêu thích')

    user.favorites.push(postId)

    await user.save()

    return { user, post }
  } catch (error) {
    throw error
  }
}

const removeFavorite = async (userId, postId) => {
  try {
    const post = await postModel.findById(postId)
    if (!post) throw new ApiError(404, 'Bài đăng không tồn tại')

    const user = await userModel.findById(userId).select('-password -refreshToken')

    if (!user) throw new ApiError(404, 'Người dùng không tồn tại')

    if (!user.favorites.includes(postId)) throw new ApiError(400, 'Bài đăng không có trong danh sách yêu thích')

    user.favorites = user.favorites.filter((id) => id.toString() !== postId)

    await user.save()

    return { user, post }
  } catch (error) {
    throw error
  }
}

const getFavorites = async (userId, page = 1, limit = 5) => {
  try {
    const user = await userModel.findById(userId)
    if (!user) throw new ApiError(404, 'Người dùng không tồn tại')

    const favorites = await userModel
      .findById(userId)
      .populate({
        path: 'favorites',
        options: {
          skip: (page - 1) * limit,
          limit: limit
        }
      })
      .select('favorites')
      .lean()

    const total = user?.favorites?.length
    return {
      favorites: favorites?.favorites,
      totalFavorites: total,
      hasMoreFavorites: page * limit < total
    }
  } catch (error) {
    throw error
  }
}

export const userService = {
  getListUserNoFriend,
  uploadAvatar,
  uploadBackground,
  uploadInfo,
  searchUser,
  getAllSearch,
  getUsers,
  toggleUserStatus,
  getLogHistoryByUser,
  deleteHistorySearch,
  addFavorite,
  removeFavorite,
  getFavorites
}
