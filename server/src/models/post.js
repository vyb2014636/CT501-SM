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

    sharedBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date }
      }
    ],
    comment: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        content: String,
        like: Boolean
      }
    ],
    byLike: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' }
      }
    ],
    byDislike: [
      {
        user: { type: mongoose.Types.ObjectId, ref: 'User' }
      }
    ],
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
)

//Export the model
export default mongoose.model('Post', postSchema)
