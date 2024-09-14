import ApiError from '~/middlewares/ApiError'
import Post from '~/models/post'
import User from '~/models/user'

const getAllPosts = async (userId, limit, skip) => {
  const user = await User.findById(userId).populate('friends')
  const friendIds = user?.friends.map((friend) => friend._id)
  friendIds?.push(userId)
  const posts = await Post.find({
    $or: [{ byPost: userId }, { byPost: { $in: friendIds } }]
  })
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
  return posts
}
const getUserPosts = async (userId) => {
  const user = await User.findById(userId).select('-password')
  if (!user) throw new ApiError(404, 'không tìm không tìm thấy người dùng')
  const posts = await Post.find({ byPost: userId })
    .populate({
      path: 'sharedPost',
      populate: {
        path: 'byPost' // Populate trường byPost trong sharedPost để lấy thông tin người đăng gốc
      }
    })
    .populate('byPost sharesBy')
    .sort({ createdAt: -1 })
  const both = { user, posts }
  return both
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
  getAllPosts,
  getUserPosts,
  sharePost,
  likePost
}
