import ApiError from '~/middlewares/ApiError'
import Post from '~/models/post'
import User from '~/models/user'

const getPosts = async (loggedInId, userId, limit, skip) => {
  let filter = { byPost: loggedInId }
  let user = null
  if (!userId) {
    user = await User.findById(loggedInId).populate('friends address.province address.district address.ward').select('-password')
    const friendIds = user?.friends.map((friend) => friend._id)
    filter = { byPost: { $in: [loggedInId, ...friendIds] } }
  } else {
    user = await User.findById(userId).populate('friends address.province address.district address.ward').select('-password')
    filter = { byPost: userId }
    if (!user) throw new ApiError(404, 'Không tìm thấy')
  }
  const totalPosts = await Post.find(filter).countDocuments()

  const posts = await Post.find(filter)
    .populate({
      path: 'sharedPost',
      populate: {
        path: 'byPost',
        select: 'firstname lastname email avatar background'
      }
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email avatar background' // Chỉ lấy các trường cần thiết
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email avatar background' // Chỉ lấy các trường cần thiết
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
        select: 'firstname lastname email background avatar'
      }
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email background avatar' // Chỉ lấy các trường cần thiết
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email background avatar' // Chỉ lấy các trường cần thiết
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

const getComments = async (postID, page, limit) => {
  // 1. Tìm bài post
  const post = await Post.findById(postID)
    .populate({
      path: 'sharedPost',
      populate: {
        path: 'byPost',
        select: 'firstname lastname email background'
      }
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email background avatar' // Chỉ lấy các trường cần thiết
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email background avatar' // Chỉ lấy các trường cần thiết
    })

  const slicedComments = post.comments.slice((page - 1) * limit, page * limit)

  await Post.populate(slicedComments, {
    path: 'user replies.user',
    select: 'firstname lastname avatar'
  })

  return {
    ...post.toObject(),
    comments: slicedComments
  }
}

const addComment = async (postID, content, myId) => {
  const post = await Post.findById(postID)
  if (!post) {
    throw new ApiError(404, 'Không tìm thấy bài post')
  }

  post.comments.push({
    user: myId,
    content
  })

  await post.save()

  const populatedPost = await post.populate('comments.user comments.replies.user comments.likes')

  return populatedPost
}

export const getReplies = async (postId, commentId, page, limit) => {
  const post = await Post.findById(postId).populate('comments.user comments.replies.user comments.likes')
  const comment = post.comments.id(commentId)

  const startIndex = (page - 1) * limit
  const replies = comment.replies.slice(startIndex, startIndex + limit)

  const hasMoreReplies = comment.replies.length > startIndex + limit

  return { replies, hasMoreReplies }
}

const addReply = async (postId, commentId, content, myId) => {
  const post = await Post.findById(postId)
  if (!post) {
    throw new Error('Post not found')
  }

  const comment = post.comments.id(commentId)
  if (!comment) {
    throw new Error('Comment not found')
  }

  // Thêm phản hồi mới với thời gian tạo
  comment.replies.push({
    user: myId,
    content,
    createdAt: new Date() // Gán thời gian hiện tại
  })

  await post.save()

  // Sắp xếp các phản hồi theo thời gian mới nhất
  comment.replies.sort((a, b) => b.createdAt - a.createdAt) // Sắp xếp theo thời gian giảm dần

  // Tìm và trả về bình luận đã được populate
  const populatedPost = await post.populate({
    path: 'comments.replies.user',
    select: 'firstname lastname avatar'
  })
  return populatedPost.comments.id(commentId)
}

export const postService = {
  getPosts,
  sharePost,
  likePost,
  getComments,
  addComment,
  getReplies,
  addReply
}
