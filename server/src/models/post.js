import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  replies: [
    {
      user: { type: mongoose.Types.ObjectId, ref: 'User' },
      content: String,
      likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
      createdAt: { type: Date, default: Date.now }
    }
  ],
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
    sharedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    sharesBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
)
postSchema.index({ createdAt: -1 }) // Thêm index trên trường createdAt

//Export the model
export default mongoose.model('Post', postSchema)
