import ApiError from '~/middlewares/ApiError'
import requestModel from '~/models/requestModel'
import postModel from '~/models/postModel'
import userModel from '~/models/userModel'

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
      _id: { $ne: myId, $nin: excludedUserIds } // Loại bỏ bản thân và những người không phù hợp
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

  const regex = searchTerms.map((term) => `(${term})`).join('.*')

  const totalUsers = await userModel.countDocuments({
    $or: [{ fullname: { $regex: regex, $options: 'i' } }, { normalizedFullName: { $regex: regex, $options: 'i' } }]
  })

  const users = await userModel
    .find({
      $or: [
        {
          fullname: { $regex: regex, $options: 'i' }
        },
        {
          normalizedFullName: { $regex: regex, $options: 'i' }
        }
      ]
    })
    .limit(3)

  let postsQuery = postModel
    .find({
      describe: { $regex: query, $options: 'i' }
    })
    .limit(3)

  postsQuery = postModel.populateFields(postsQuery)

  const posts = await postsQuery.lean()

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

export const userService = {
  getListUserNoFriend,
  uploadAvatar,
  uploadBackground,
  uploadInfo,
  searchUser,
  getAllSearch
}
