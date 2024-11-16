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
      enum: ['trash', 'normal', 'hidden', 'delete'],
      default: 'normal'
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    trashDate: {
      type: Date
    },
    deleteDate: {
      type: Date
    },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)
postSchema.index({ createdAt: -1 })

// postSchema.index({ trashDate: 1 }, { expireAfterSeconds: 60 }) // TTL 60 giây
postSchema.methods.populatePost = async function () {
  await this.populate({
    path: 'sharedPost',
    populate: [
      {
        path: 'byPost',
        select: 'firstname lastname fullname email background avatar'
      },
      {
        path: 'likes',
        select: 'firstname lastname fullname email background avatar'
      },
      {
        path: 'comments',
        populate: [
          {
            path: 'user',
            select: 'firstname lastname fullname email background avatar'
          },
          {
            path: 'replies',
            populate: [
              {
                path: 'user',
                select: 'firstname lastname fullname email avatar'
              },
              {
                path: 'likes',
                select: 'firstname lastname fullname email background avatar'
              }
            ]
          }
        ]
      }
    ]
  })

  await this.populate({
    path: 'byPost',
    select: 'firstname lastname fullname email background avatar friends'
  })

  await this.populate({
    path: 'sharesBy',
    select: 'firstname lastname fullname email background avatar'
  })

  await this.populate({
    path: 'likes',
    select: 'firstname lastname fullname email avatar'
  })

  await this.populate({
    path: 'comments',
    populate: [
      {
        path: 'user',
        select: 'firstname lastname fullname email background avatar'
      },
      {
        path: 'replies',
        populate: [
          {
            path: 'user',
            select: 'firstname lastname fullname email avatar'
          },
          {
            path: 'likes',
            select: 'firstname lastname fullname email background avatar'
          }
        ]
      }
    ]
  })

  return this
}

postSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'trash') {
      this.trashDate = Date.now()
    }
    if (this.status === 'normal') {
      this.trashDate = undefined
    }
  }
  next()
})
postSchema.statics.findByIdPopulateSharePost = function (postId) {
  return this.findById(postId).populate({
    path: 'sharedPost',
    populate: {
      path: 'byPost',
      select: 'firstname lastname fullname email background avatar'
    }
  })
}
postSchema.pre(/(find|findOne|findById)/, function (next) {
  this.populate({
    path: 'sharedPost',
    populate: [
      {
        path: 'byPost',
        select: 'firstname lastname fullname email background avatar'
      },
      {
        path: 'likes',
        select: 'firstname lastname fullname email background avatar'
      },
      {
        path: 'comments',
        populate: [
          {
            path: 'user',
            select: 'firstname lastname fullname email background avatar'
          },
          {
            path: 'replies',
            populate: [
              {
                path: 'user',
                select: 'firstname lastname fullname email avatar'
              },
              {
                path: 'likes',
                select: 'firstname lastname fullname email background avatar'
              }
            ]
          }
        ]
      }
    ]
  })
    .populate({
      path: 'byPost',
      select: 'firstname lastname fullname email background avatar friends'
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname fullname email background avatar'
    })
    .populate({
      path: 'likes',
      select: 'firstname lastname fullname email avatar' // Chọn trường dữ liệu cho likes
    })
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          select: 'firstname lastname fullname email background avatar'
        },
        {
          path: 'replies',
          populate: [
            {
              path: 'user',
              select: 'firstname lastname fullname email avatar' // Chọn các trường cần thiết cho người phản hồi
            },
            {
              path: 'likes',
              select: 'firstname lastname fullname email background avatar' // Chọn các trường cần thiết cho likes trong phản hồi
            }
          ]
        }
      ]
    })

  next()
})

postSchema.statics.findByIdWithComments = function (postID) {
  return this.findById(postID)
    .populate([
      { path: 'comments.user', select: 'firstname lastname avatar' },
      { path: 'comments.replies.user', select: 'firstname lastname avatar' },
      { path: 'comments.likes', select: 'firstname lastname avatar' }
    ])
    .lean()
}

postSchema.methods.addComment = async function (userId, content) {
  // Thêm comment vào bài post
  this.comments.push({ user: userId, content })

  // Lưu bài post
  const savedPost = await this.save()

  // Populate các trường cần thiết
  return savedPost.populate('comments.user comments.replies.user comments.likes')
}

postSchema.statics.findByIdAndPopulate = function (postId) {
  return this.findById(postId)
    .populate({
      path: 'sharedPost',
      populate: [
        {
          path: 'byPost',
          select: 'firstname lastname fullname email background avatar'
        },
        {
          path: 'likes',
          select: 'firstname lastname fullname email background avatar' // Chọn các trường cần thiết cho likes
        },
        {
          path: 'comments',
          populate: [
            {
              path: 'user',
              select: 'firstname lastname fullname email background avatar'
            },
            {
              path: 'replies',
              populate: [
                {
                  path: 'user',
                  select: 'firstname lastname fullname email avatar' // Chọn các trường cần thiết cho người phản hồi
                },
                {
                  path: 'likes',
                  select: 'firstname lastname fullname email background avatar' // Chọn các trường cần thiết cho likes trong phản hồi
                }
              ]
            }
          ]
        }
      ]
    })
    .populate({
      path: 'byPost',
      select: 'firstname lastname fullname email background avatar friends'
    })
    .populate({
      path: 'sharesBy',
      select: 'firstname lastname fullname email background avatar'
    })
    .populate({
      path: 'likes',
      select: 'firstname lastname fullname email avatar' // Chọn trường dữ liệu cho likes
    })
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          select: 'firstname lastname fullname email background avatar'
        },
        {
          path: 'replies',
          populate: [
            {
              path: 'user',
              select: 'firstname lastname fullname email avatar' // Chọn các trường cần thiết cho người phản hồi
            },
            {
              path: 'likes',
              select: 'firstname lastname fullname email background avatar' // Chọn các trường cần thiết cho likes trong phản hồi
            }
          ]
        }
      ]
    })
    .lean()
}

const Post = mongoose.model('Post', postSchema)

export default Post
