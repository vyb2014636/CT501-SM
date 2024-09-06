import Post from '~/models/post'
import ApiError from '~/middlewares/ApiError'

const createPost = async (req, res, next) => {
  const { describe } = req.body
  const id = req.user.id
  console.log(id)
  // const { picture, video } = req.file
  try {
    const createPost = await Post.create({ describe, byPost: id })
    return res.status(200).json({
      mes: createPost ? 'Đăng thành công' : 'Post thất bại',
      post: createPost ? createPost : 'Post thất bại'
    })
  } catch (error) {
    next(error)
  }
}
const getPostsUser = async (req, res, next) => {
  const id = req.user.id
  try {
    // const listPost = await Post.find({ byPost: id }).populate('byPost').sort({ createdAt: -1 })
    const listPost = await Post.find({
      $or: [{ byPost: id }, { 'sharedBy.user': id }]
    })
      .populate('sharedBy.user byPost')
      .sort({ createdAt: -1 })
    return res.status(200).json({
      mes: listPost ? 'Danh sách bài đăng' : 'Không có bài đăng nào',
      post: listPost ? listPost : 'Không có bài đăng'
    })
  } catch (error) {
    next(error)
  }
}
const getAllPosts = async (req, res, next) => {
  try {
    const listPost = await Post.find()
      .populate('byPost')
      .populate({
        path: 'sharedBy.user'
      })
      .sort({ createdAt: -1 })
    return res.status(200).json({
      mes: listPost ? 'Danh sách bài đăng' : 'Không có bài đăng nào',
      post: listPost ? listPost : 'Không có bài đăng'
    })
  } catch (error) {
    next(error)
  }
}
export const postController = {
  createPost,
  getPostsUser,
  getAllPosts
}
