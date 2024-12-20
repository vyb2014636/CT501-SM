import { postService } from '~/services/postService'

const createPost = async (req, res, next) => {
  const { describe } = req.body
  const my = req.user
  const images = req?.files?.images ? req?.files?.images?.map((file) => file.path) : []
  const videos = req?.files?.videos ? req?.files?.videos?.map((file) => file.path) : []

  try {
    const newPost = await postService.createPost(describe, my, images, videos)

    return res.status(201).json({
      message: newPost ? 'Đăng thành công' : 'Post thất bại',
      post: newPost || 'Post thất bại'
    })
  } catch (error) {
    next(error)
  }
}

const getPosts = async (req, res, next) => {
  const { id } = req.user
  const { page, userId, limit = 3 } = req.query
  const skip = (page - 1) * limit
  try {
    const { posts, totalPosts, user } = await postService.getPosts(id, userId, limit, skip)
    const hasMorePosts = page * limit < totalPosts

    return res.status(200).json({
      message: posts.length > 0 ? 'Danh sách bài đăng' : 'Không có bài đăng nào',
      posts,
      totalPosts,
      user,
      hasMorePosts
    })
  } catch (error) {
    next(error)
  }
}
const getPost = async (req, res, next) => {
  const { postId } = req.params

  try {
    const post = await postService.getPost(postId)

    return res.status(200).json({
      message: 'Bài đăng bạn tìm',
      post
    })
  } catch (error) {
    next(error)
  }
}
const likePost = async (req, res, next) => {
  const { postId } = req.body
  const { id } = req.user

  try {
    const { message, post, quantity } = await postService.likePost(id, postId)
    res.status(200).json({
      success: true,
      message,
      updatePost: post,
      quantity
    })
  } catch (error) {
    next(error)
  }
}

const sharePost = async (req, res, next) => {
  try {
    const my = req.user
    const { postId, describe } = req.body
    const post = await postService.sharePost(postId, my, describe)
    return res.status(200).json({
      message: post ? 'Bài đăng đã được chia sẻ' : 'Chia sẻ thất bại',
      post: post
    })
  } catch (error) {
    next(error)
  }
}

const getComments = async (req, res, next) => {
  const { postId, limit = 5, page = 1 } = req.query
  try {
    const { comments, hasMoreComments } = await postService.getComments(postId, page, limit)

    return res.status(200).json({
      message: 'Danh sách comment',
      comments,
      hasMoreComments
    })
  } catch (error) {
    next(error)
  }
}

const addComment = async (req, res, next) => {
  try {
    const { postId, content } = req.body
    const myId = req.user.id
    const post = await postService.addComment(postId, content, myId)

    res.status(201).json({ message: 'Đăng bình luận thành công', post })
  } catch (error) {
    next(error)
  }
}

const getReplies = async (req, res, next) => {
  const { postId, commentId, page = 1, limit = 3 } = req.query

  try {
    const { replies, hasMoreReplies } = await postService.getReplies(postId, commentId, page, limit)
    res.status(200).json({ replies, hasMoreReplies })
  } catch (error) {
    next(error)
  }
}

const addReply = async (req, res, next) => {
  try {
    const myId = req.user.id
    const { postId, commentId, content } = req.body
    const { post, comment } = await postService.addReply(postId, commentId, content, myId)
    res.status(200).json({ post, comment })
  } catch (error) {
    next(error)
  }
}

const likeComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.body
    const userId = req.user.id

    const { message, comment } = await postService.likeComment(postId, commentId, userId)

    res.status(200).json({ success: true, message, updatedComment: comment })
  } catch (error) {
    next(error)
  }
}

const likeReply = async (req, res, next) => {
  try {
    const { postId, commentId, replyId } = req.body
    const userId = req.user.id

    const { message, comment, reply } = await postService.likeReply(postId, commentId, replyId, userId)

    res.status(200).json({ success: true, message, updatedComment: comment, updatedReply: reply })
  } catch (error) {
    next(error)
  }
}

const putInTrashPost = async (req, res, next) => {
  try {
    const { postId } = req.body
    const userId = req.user.id

    const post = await postService.putInTrashPost(postId, userId)

    res.status(200).json({ post, message: post ? 'Đã chuyển bài đăng vào thùng rác' : 'Không chuyển bài đăng vào thùng rác được' })
  } catch (error) {
    next(error)
  }
}
const restorePostFromTrash = async (req, res, next) => {
  try {
    const { postId } = req.body
    const userId = req.user.id

    const post = await postService.restorePostFromTrash(postId, userId)

    res.status(200).json({ post, message: post ? 'Đã phục hồi bài đăng ' : 'Không phục hồi bài đăng được' })
  } catch (error) {
    next(error)
  }
}
const getPostsTrash = async (req, res, next) => {
  try {
    const userId = req.user.id

    const posts = await postService.getPostsTrash(userId)

    res.status(200).json({ posts, message: posts?.length > 0 ? 'Danh sách các bài đăng trong thùng rác ' : 'Không có bài đăng nào trong thùng rác' })
  } catch (error) {
    next(error)
  }
}

const deleteFromTrashPost = async (req, res, next) => {
  try {
    const { postId } = req.body
    const userId = req.user.id

    const post = await postService.deleteFromTrashPost(postId, userId)

    res.status(200).json({ post, message: post ? 'Đã xóa bài đăng' : 'Không xóa được bài đăng ' })
  } catch (error) {
    next(error)
  }
}

export const postController = {
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
  getPost,
  putInTrashPost,
  restorePostFromTrash,
  getPostsTrash,
  deleteFromTrashPost
}
