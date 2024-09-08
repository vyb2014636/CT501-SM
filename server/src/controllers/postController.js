import Post from '~/models/post'
import ApiError from '~/middlewares/ApiError'
import User from '~/models/user'

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

const getPostsUser = async (req, res, next) => {
  const id = req.user.id
  try {
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
    const userId = req.user.id.toString() // Lấy ID của người dùng hiện tại

    // Tìm bạn bè của người dùng hiện tại
    const currentUser = await User.findById(userId).populate('friends')

    // Lấy danh sách ID của bạn bè
    let friendIds = currentUser?.friends?.map((friend) => friend._id.toString())
    // Thêm ID của người dùng hiện tại vào danh sách (để hiển thị cả bài của chính họ)
    friendIds?.push(userId)
    const listPost = await Post.find({
      byPost: { $in: friendIds }
    })
      .populate('byPost')
      .populate({
        path: 'sharedBy.user'
      })
      .sort({ createdAt: -1 })

    let allPosts = []

    // Xử lý từng bài post và các bài chia sẻ của nó
    listPost.forEach((post) => {
      // Thêm bài post gốc vào danh sách
      allPosts.push({
        ...post._doc,
        type: 'original',
        postDate: post.createdAt
      })

      // Thêm các bài chia sẻ vào danh sách
      post.sharedBy.forEach((shared) => {
        allPosts.push({
          ...post._doc,
          type: 'shared',
          postDate: shared.createdAt,
          sharedByUser: shared.user
        })
      })
    })

    // Sắp xếp tất cả các bài post và chia sẻ theo ngày
    allPosts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate))

    return res.status(200).json({
      mes: allPosts.length > 0 ? 'Danh sách bài đăng' : 'Không có bài đăng nào',
      post: allPosts
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
