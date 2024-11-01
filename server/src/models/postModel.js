import mongoose from 'mongoose'

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now }
})

var postSchema = new mongoose.Schema(
  {
    byPost: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    describe: {
      type: String
    },
    images: {
      type: Array
    },
    videos: {
      type: Array
    },
    sharedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    sharesBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
    status: {
      type: String,
      enum: ['recycle', 'normal', 'hidden'],
      default: 'normal'
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)
postSchema.index({ createdAt: -1 })

postSchema.statics.findByIdPopulates = function (postId) {
  return this.findById(postId)
    .populate({
      path: 'sharedPost',
      populate: {
        path: 'byPost',
        select: 'firstname lastname email background avatar'
      }
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email background avatar'
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email background avatar'
    })
}

postSchema.statics.findByIdPopulateSharePost = function (postId) {
  return this.findById(postId).populate({
    path: 'sharedPost',
    populate: {
      path: 'byPost',
      select: 'firstname lastname email background avatar'
    }
  })
}
postSchema.pre(/(find|findOne|findById)/, function (next) {
  this.populate({
    path: 'sharedPost',
    populate: {
      path: 'byPost',
      select: 'firstname lastname email background avatar'
    }
  })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email background avatar'
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email background avatar'
    })

  next()
})
postSchema.statics.populateFields = function (query) {
  return query
    .populate({
      path: 'sharedPost',
      populate: {
        path: 'byPost',
        select: 'firstname lastname email background avatar'
      }
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname email background avatar'
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname email background avatar'
    })
}

postSchema.statics.findByIdWithComments = function (postID) {
  return this.findById(postID)
    .populate([
      { path: 'comments.user', select: 'firstname lastname avatar' },
      { path: 'comments.replies.user', select: 'firstname lastname avatar' },
      { path: 'comments.likes', select: 'firstname lastname avatar' }
    ])
    .lean() // Sử dụng lean() để tối ưu hiệu suất
}

postSchema.methods.addComment = async function (userId, content) {
  // Thêm comment vào bài post
  this.comments.push({ user: userId, content })

  // Lưu bài post
  const savedPost = await this.save()

  // Populate các trường cần thiết
  return savedPost.populate('comments.user comments.replies.user comments.likes')
}

const Post = mongoose.model('Post', postSchema)

export default Post
