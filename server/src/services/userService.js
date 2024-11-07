import ApiError from '~/middlewares/ApiError'
import requestModel from '~/models/requestModel'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'
import Log from '~/models/logModel'

const getListUserNoFriend = async (myId) => {
  const user = await userModel.findById(myId).populate('friends').select('-password')
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng')
  const sentRequests = await requestModel.find({ from: myId, status: 'pending' }).select('to')
  const userSending = await requestModel.find({ to: myId, status: 'pending' }).select('from')
  const excludedUserIds = [
    ...user.friends.map((friend) => friend._id), // Bạn bè hiện tại
    ...sentRequests.map((request) => request.to), // Người đã gửi yêu cầu
    ...userSending.map((request) => request.from) //Người đó đang gửi yêu cầu cho minh
  ]
  // Tìm những người dùng chưa kết bạn và chưa có yêu cầu kết bạn
  const suggestions = await userModel
    .find({
      _id: { $ne: myId, $nin: excludedUserIds },
      isAdmin: false // Loại bỏ bản thân và những người không phù hợp
    })
    .select('avatar lastname firstname background')
  return suggestions
}

const uploadAvatar = async (myId, avatar) => {
  if (!avatar) throw new ApiError(401, 'Bạn chưa chọn ảnh')
  const updatedUser = await userModel.findByIdAndUpdate(myId, { avatar: avatar }, { new: true })
  return await updatedUser.populate('friends', 'firstname lastname fullname avatar background')
}
const uploadBackground = async (myId, background) => {
  if (!background) throw new ApiError(401, 'Bạn chưa chọn ảnh')
  const updatedUser = await userModel.findByIdAndUpdate(myId, { background }, { new: true })
  return await updatedUser.populate('friends', 'firstname lastname fullname avatar background')
}
const uploadInfo = async (myId, reqBody) => {
  if (!reqBody || Object.keys(reqBody).length === 0) throw new ApiError(400, 'Dữ liệu gửi lên không được rỗng')
  const { firstname, lastname, address } = reqBody

  const updateData = {
    firstname,
    lastname,
    address
  }

  const updatedUser = await userModel.findByIdAndUpdate(myId, updateData, { new: true })

  if (!updatedUser) throw new ApiError(404, 'Không tìm thấy người dùng')

  updatedUser.save()

  return await updatedUser.populate('friends', 'firstname lastname fullname avatar background')
}

const searchUser = async (query) => {
  const searchTerms = query.toLowerCase().trim().split(' ')

  // Tạo regex cho từng từ khóa
  const regex = searchTerms.map((term) => `(${term})`).join('.*')

  // Đếm tổng số người dùng, bỏ qua admin
  const totalUsers = await userModel.countDocuments({
    $and: [
      { isAdmin: { $ne: true } }, // Bỏ qua người dùng là admin
      {
        $or: [{ fullname: { $regex: regex, $options: 'i' } }, { normalizedFullName: { $regex: regex, $options: 'i' } }]
      }
    ]
  })

  // Tìm người dùng, bỏ qua admin
  const users = await userModel
    .find({
      $and: [
        { isAdmin: { $ne: true } }, // Bỏ qua người dùng là admin
        {
          $or: [{ fullname: { $regex: regex, $options: 'i' } }, { normalizedFullName: { $regex: regex, $options: 'i' } }]
        }
      ]
    })
    .limit(3)

  const posts = await postModel.find({ describe: { $regex: query, $options: 'i' }, status: 'normal' }).limit(3)

  const limit = 3
  const hasMoreUsers = limit < totalUsers

  return { users, posts, hasMoreUsers }
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

const getUsers = async () => {
  try {
    const users = await userModel.find({ isAdmin: false }).select('fullname address avatar isAdmin isVerify status background').lean()
    return users
  } catch (error) {
    throw error
  }
}

const toggleUserStatus = async (userId, status) => {
  try {
    if (status === 'Active' || status === 'Banned') {
      const updatedUser = await userModel
        .findByIdAndUpdate(
          userId,
          { status: status }, // true nếu active, false nếu banned
          { new: true } // Trả về document sau khi đã cập nhật
        )
        .select('fullname address avatar isAdmin isVerify status background')

      if (!updatedUser) throw new ApiError(404, 'Không tìm thấy người dùng')

      return updatedUser
    } else throw new ApiError(400, 'Bạn chọn trạng thái không hợp lệ')
  } catch (error) {
    throw error
  }
}
const getHistoryByUser = async (userId) => {
  // Tìm theo ID nếu là ObjectId, hoặc tìm theo tên đầy đủ nếu không
  // const query = isObjectId ? { user: userIdentifier } : { 'user.fullname': { $regex: userIdentifier, $options: 'i' } }
  const historyLogs = await Log.find({ user: userId }).sort({ createdAt: -1 }).lean()

  return historyLogs
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
  getHistoryByUser
}
