import mongoose from 'mongoose'
// Declare the Schema of the Mongo model
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
    }, // Array để chứa các đường dẫn hình ảnh
    videos: {
      type: Array
    }, // URLs of images stored on Cloudinary
    sharedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }, //bài post này chia sẻ từ bài nào nếu không có thì không có ai chia sẻ
    sharesBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comment: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        content: String,
        like: Boolean
      }
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      }
    ],
    // byDislike: [
    //   {
    //     user: { type: mongoose.Types.ObjectId, ref: 'User' }
    //   }
    // ],
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
)

//Export the model
export default mongoose.model('Post', postSchema)
