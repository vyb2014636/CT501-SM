import ApiError from '~/middlewares/ApiError'
import Notification from '~/models/notification'
import Post from '~/models/post'
import User from '~/models/user'

const notifyFriendsAboutPost = async (userId, postId, type) => {
  const user = await User.findById(userId).populate('friends')

  const notifications = user.friends.map((friend) => ({
    type: type,
    sender: userId,
    receiver: friend._id,
    postId
  }))

  await Notification.insertMany(notifications)
}

const createPost = async (describe, myId, images, videos) => {
  // try {
  // } catch (error) {
  //   throw
  // }
  if (videos?.length > 2) throw new ApiError(400, 'Không thể upload quá 2 video')

  const newPost = await Post.create({
    describe,
    byPost: myId,
    images,
    videos
  })

  await notifyFriendsAboutPost(myId, newPost._id, 'newPost')

  return newPost
}

const getPost = async (postId) => {
  let postQuery = Post.findById(postId)

  postQuery = Post.populateFields(postQuery)
  const post = await postQuery.lean()
  if (!post) throw new ApiError(404, 'Bài viết không tồn tại')

  return post
}

const getPosts = async (loggedInId, userId, limit, skip) => {
  let filter = { byPost: loggedInId }
  let user = null

  if (!userId) {
    user = await User.findByIdPopulateAddress(loggedInId)
    const friendIds = user?.friends.map((friend) => friend._id)
    filter = { byPost: { $in: [loggedInId, ...friendIds] } }
  } else {
    user = await User.findByIdPopulateAddress(userId)
    filter = { byPost: userId }
    if (!user) throw new ApiError(404, 'Không tìm thấy')
  }

  const totalPosts = await Post.find(filter).countDocuments()

  let postsQuery = Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)

  postsQuery = Post.populateFields(postsQuery)

  const posts = await postsQuery.lean()

  return { posts, totalPosts, user }
}

const likePost = async (userId, postId) => {
  const post = await Post.findByIdPopulates(postId)
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

const sharePost = async (postId, myId, describe) => {
  const post = await Post.findByIdPopulateSharePost(postId)

  if (!post) throw new Error('Bài đăng bạn muốn chia sẻ không tồn tại')

  const originalPost = post.sharedPost ? post.sharedPost : post

  // Kiểm tra nếu người dùng đã chia sẻ bài viết này rồi
  if (originalPost.byPost === myId) {
    throw new Error('Bạn không thể tự chia sẻ bài viết của chính mình')
  }

  // Tạo một bài chia sẻ mới
  const sharedPost = new Post({
    byPost: myId,
    describe,
    sharedPost: originalPost._id
  })

  await sharedPost.save()

  originalPost.sharesBy.push(myId)

  await originalPost.save()

  await notifyFriendsAboutPost(myId, sharedPost._id, 'sharedPost')

  return sharedPost
}

const getComments = async (postID, page, limit) => {
  const post = await Post.findByIdPopulates(postID)

  const totalComments = post.comments.length
  const slicedComments = post.comments.slice((page - 1) * limit, page * limit)
  await Post.populate(slicedComments, {
    path: 'user replies.user likes',
    select: 'firstname lastname avatar '
  })

  const hasMoreComments = page * limit < totalComments
  return {
    ...post.toObject(),
    comments: slicedComments,
    hasMoreComments
  }
}

const addComment = async (postID, content, myId) => {
  const post = await Post.findById(postID)

  if (!post) throw new ApiError(404, 'Không tìm thấy bài post')

  post.comments.push({
    user: myId,
    content
  })

  await post.save()

  const populatedPost = await post.populate('comments.user comments.replies.user comments.likes')

  return populatedPost
}

const getReplies = async (postId, commentId, page, limit) => {
  const post = await Post.findById(postId).populate('comments.user comments.replies.user comments.likes')
  const comment = post.comments.id(commentId)

  const startIndex = (page - 1) * limit
  const replies = comment.replies.slice(startIndex, startIndex + limit)

  const hasMoreReplies = comment.replies.length > startIndex + limit

  return { replies, hasMoreReplies }
}

const addReply = async (postId, commentId, content, myId) => {
  const post = await Post.findById(postId)
  if (!post) throw new ApiError(404, 'Không tìm thấy')

  const comment = post.comments.id(commentId)

  if (!comment) throw new ApiError(404, 'Không tìm thấy')

  comment.replies.push({
    user: myId,
    content,
    createdAt: new Date()
  })

  await post.save()

  comment.replies.sort((a, b) => b.createdAt - a.createdAt)

  const populatedPost = await post.populate({
    path: 'comments.replies.user',
    select: 'firstname lastname avatar'
  })
  return populatedPost.comments.id(commentId)
}

const likeComment = async (postId, commentId, userId) => {
  const post = await Post.findById(postId)
  if (!post) throw new ApiError(404, 'Post not found')

  const comment = post.comments.id(commentId)
  if (!comment) throw new ApiError(404, 'Comment not found')

  const isLiked = comment.likes.includes(userId)
  if (isLiked) {
    comment.likes = comment.likes.filter((id) => id.toString() !== userId)
  } else {
    comment.likes.push(userId)
  }

  await post.save()

  await post.populate({
    path: 'comments.user',
    select: 'firstname lastname avatar'
  })
  await post.populate({
    path: 'comments.likes',
    select: 'firstname lastname avatar'
  })
  return {
    message: isLiked ? 'Bỏ like thành công' : 'Like thành công',
    comment: post.comments.id(commentId)
  }
}

const likeReply = async (postId, commentId, replyId, userId) => {
  const post = await Post.findById(postId)
  if (!post) throw new ApiError(404, 'Post not found')

  const comment = post.comments.id(commentId)
  if (!comment) throw new ApiError(404, 'Comment not found')

  const reply = comment.replies.id(replyId)
  if (!reply) throw new ApiError(404, 'Reply not found')

  const isLiked = reply.likes.includes(userId)
  if (isLiked) {
    reply.likes = reply.likes.filter((id) => id.toString() !== userId)
  } else {
    reply.likes.push(userId)
  }

  await post.save()

  const populatedPost = await post.populate({
    path: 'comments.replies.user',
    select: 'firstname lastname avatar'
  })

  return {
    message: isLiked ? 'Bỏ like phản hồi thành công' : 'Like phản hồi thành công',
    comment: populatedPost.comments.id(commentId),
    reply: populatedPost.comments.id(commentId).replies.id(replyId)
  }
}

export const postService = {
  createPost,
  getPosts,
  sharePost,
  likePost,
  getComments,
  addComment,
  getReplies,
  addReply,
  likeComment,
  likeReply,
  getPost
}
