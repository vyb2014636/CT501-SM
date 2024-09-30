import ApiError from '~/middlewares/ApiError'
import FriendRequest from '~/models/friendRequest'
import Post from '~/models/post'
import User from '~/models/user'

const getListUserNoFriend = async (myId) => {
  const user = await User.findById(myId).populate('friends').select('-password')
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng')
  const sentRequests = await FriendRequest.find({ from: myId, status: 'pending' }).select('to')
  const userSending = await FriendRequest.find({ to: myId, status: 'pending' }).select('from')
  const excludedUserIds = [
    ...user.friends.map((friend) => friend._id), // Bạn bè hiện tại
    ...sentRequests.map((request) => request.to), // Người đã gửi yêu cầu
    ...userSending.map((request) => request.from) //Người đó đang gửi yêu cầu cho minh
  ]
  // Tìm những người dùng chưa kết bạn và chưa có yêu cầu kết bạn
  const suggestions = await User.find({
    _id: { $ne: myId, $nin: excludedUserIds } // Loại bỏ bản thân và những người không phù hợp
  }).select('avatar lastname firstname background')
  return suggestions
}

const uploadAvatar = async (myId, avatar) => {
  if (!avatar) throw new ApiError(401, 'Bạn chưa chọn ảnh')
  const updatedUser = await User.findByIdAndUpdate(myId, { avatar: avatar }, { new: true })
  return updatedUser
}
const uploadBackground = async (myId, background) => {
  if (!background) throw new ApiError(401, 'Bạn chưa chọn ảnh')
  const updatedUser = await User.findByIdAndUpdate(myId, { background }, { new: true })
  return updatedUser
}
const uploadInfo = async (myId, reqBody) => {
  if (!reqBody || Object.keys(reqBody).length === 0) throw new ApiError(400, 'Dữ liệu gửi lên không được rỗng')
  const { firstname, lastname, address } = reqBody

  const updateData = {
    firstname,
    lastname,
    address
  }

  const updatedUser = await User.findByIdAndUpdate(myId, updateData, { new: true })

  updatedUser.save()

  if (!updatedUser) {
    throw new ApiError(404, 'Không tìm thấy người dùng')
  }

  return updatedUser
}

const searchUser = async (query) => {
  // Chuyển đổi query thành lowercase và tách các từ
  const searchTerms = query.toLowerCase().trim().split(' ')

  const regex = searchTerms.map((term) => `(${term})`).join('.*') // Kết hợp các từ với .* ở giữa

  const users = await User.find({
    $or: [
      {
        fullname: { $regex: regex, $options: 'i' }
      },
      {
        normalizedFullName: { $regex: regex, $options: 'i' }
      }
    ]
  }).limit(5)

  const posts = await Post.find({
    describe: { $regex: query, $options: 'i' }
  }).limit(3)

  return { users, posts }
}

export const userService = {
  getListUserNoFriend,
  uploadAvatar,
  uploadBackground,
  uploadInfo,
  searchUser
}
