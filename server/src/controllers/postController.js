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
const getPosts = async (req, res, next) => {
  const id = req.user.id
  // const { picture, video } = req.file
  try {
    const listPost = await Post.find({ byPost: id })
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
  getPosts
}
