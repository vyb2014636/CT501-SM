import ApiError from '~/middlewares/ApiError'
import Post from '~/models/post'
import User from '~/models/user'

const getListUserNoFriend = async (myId) => {
  const user = await User.findById(myId).populate('friends').select('-password')
  if (!user) throw new ApiError(404, 'Không tìm thấy người dùng')
  const friendIds = user?.friends.map((friend) => friend._id)
  const excludeIds = [myId, ...friendIds]
  const usersNoFriend = await User.find({ _id: { $nin: excludeIds } }).select('avatar lastname firstname background')

  return usersNoFriend
}

export const userService = {
  getListUserNoFriend
}
