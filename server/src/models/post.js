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

const Post = mongoose.model('Post', postSchema)

export default Post
