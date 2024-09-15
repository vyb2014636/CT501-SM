import Post from '~/models/post'
import ApiError from '~/middlewares/ApiError'
import { postService } from '~/services/postService'

const createPost = async (req, res, next) => {
  const { describe } = req.body
  const id = req.user.id

  try {
    // Lấy các URL hình ảnh và video
    const images = req?.files?.images ? req?.files?.images?.map((file) => file.path) : []
    const videos = req?.files?.videos ? req?.files?.videos?.map((file) => file.path) : []
    // Kiểm tra số lượng video
    if (videos?.length > 2) throw new ApiError(400, 'Không thể upload quá 2 video')

    // Tạo bài post mới
    const newPost = await Post.create({
      describe,
      byPost: id,
      images,
      videos
    })

    // Trả về kết quả
    return res.status(201).json({
      message: newPost ? 'Đăng thành công' : 'Post thất bại',
      post: newPost || 'Post thất bại'
    })
  } catch (error) {
    // Chuyển lỗi cho middleware xử lý lỗi
    next(error)
  }
}

const getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { page } = req.query
    const limit = 2
    const skip = (page - 1) * limit
    const { user, posts } = await postService.getUserPosts(userId, limit, skip)
    const totalPosts = await Post.find({ byPost: userId }).countDocuments()

    return res.status(200).json({
      message: posts.length > 0 ? 'Danh sách bài đăng của bạn' : 'Bạn chưa có bài đăng nào',
      posts: posts,
      user: user,
      totalPosts: totalPosts
    })
  } catch (error) {
    next(error)
  }
}

const getAllPosts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { page } = req.query
    const limit = 2
    const skip = (page - 1) * limit
    const posts = await postService.getAllPosts(userId, limit, skip)
    const totalPosts = await Post.countDocuments()
    return res.status(200).json({
      message: posts.length > 0 ? 'Danh sách bài đăng' : 'Không có bài đăng nào',
      posts: posts,
      totalPosts: totalPosts
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
    const userId = req.user.id.toString() // Lấy ID của người dùng hiện tại
    const { postId, describe } = req.body
    const post = await postService.sharePost(postId, userId, describe)
    return res.status(200).json({
      message: post ? 'Bài đăng đã được chia sẻ' : 'Chia sẻ thất bại',
      post: post
    })
  } catch (error) {
    next(error)
  }
}

export const postController = {
  createPost,
  getUserPosts,
  getAllPosts,
  sharePost,
  likePost
}
