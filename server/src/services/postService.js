import mongoose from 'mongoose'
import ApiError from '~/middlewares/ApiError'
import Post from '~/models/post'
import User from '~/models/user'

const getPosts = async (loggedInId, userId, limit, skip) => {
  let filter = { byPost: loggedInId }
  let user = null
  if (!userId) {
    user = await User.findById(loggedInId).populate('friends').select('-password')
    const friendIds = user?.friends.map((friend) => friend._id)
    filter = { byPost: { $in: [loggedInId, ...friendIds] } }
  } else {
    user = await User.findById(userId).populate('friends').select('-password')
    filter = { byPost: userId }
    if (!user) throw new ApiError(404, 'Không tìm thấy')
  }
  const totalPosts = await Post.find(filter).countDocuments()

  const posts = await Post.find(filter)
    .populate({
      path: 'sharedPost',
      populate: {
        path: 'byPost',
        select: 'firstname lastname email background'
      }
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email background' // Chỉ lấy các trường cần thiết
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email background' // Chỉ lấy các trường cần thiết
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  return { posts, totalPosts, user }
}

const likePost = async (userId, postId) => {
  const post = await Post.findById(postId)
    .populate({
      path: 'sharedPost',
      populate: {
        path: 'byPost',
        select: 'firstname lastname email background'
      }
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email background' // Chỉ lấy các trường cần thiết
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email background' // Chỉ lấy các trường cần thiết
    })

  if (!post) throw new ApiError(404, 'Không tìm thấy bài post')

  const isLiked = post.likes.includes(userId)
  let message = ''
  if (isLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId)
    message = 'Bỏ like thành công'
  } else {
    post.likes.push(userId)
    message = 'Like thành công'
  }

  const quantity = post.likes.length
  await post.save()

  return { message, post, quantity }
}

const sharePost = async (postId, userId, describe) => {
  // Lấy bài viết gốc nếu bài viết này là một bài chia sẻ
  const post = await Post.findById(postId).populate('sharedPost')

  if (!post) throw new Error('Bài đăng bạn muốn chia sẻ không tồn tại')

  const originalPost = post.sharedPost ? post.sharedPost : post

  // Kiểm tra nếu người dùng đã chia sẻ bài viết này rồi
  if (originalPost.byPost === userId) {
    throw new Error('Bạn không thể tự chia sẻ bài viết của chính mình')
  }

  // Tạo một bài chia sẻ mới
  const sharedPost = new Post({
    byPost: userId,
    describe,
    sharedPost: originalPost._id
  })

  await sharedPost.save()

  // Thêm người dùng vào danh sách người đã chia sẻ
  originalPost.sharesBy.push(userId)
  await originalPost.save()

  return sharedPost
}

export const postService = {
  getPosts,
  sharePost,
  likePost
}
